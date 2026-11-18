// Eight adjacent frames share one download and decode. This keeps a swipe from
// outrunning one network request per frame while bounding decoded image memory.
export const ATLAS = { frames: 8, columns: 4, width: 800, height: 450, count: 192, limit: 6 };
export type View = [room: number, frame: number];
type Frame = { image: HTMLImageElement; frame: number; x: number; y: number };

export function createMobileFrames(options: {
  source: (room: number, sheet: number) => string;
  canLoad: () => boolean;
  onReady: () => void;
  image?: () => HTMLImageElement;
}) {
  const cache = new Map<string, HTMLImageElement>();
  const pending = new Set<string>(), failed = new Set<string>();
  let queue: string[] = [], protectedKeys = new Set<string>(), disposed = false;
  const key = (room: number, frame: number) => `${room}:${Math.floor((frame - 1) / ATLAS.frames)}`;
  const trim = () => {
    for (const k of cache.keys()) {
      if (cache.size <= ATLAS.limit) break;
      if (!protectedKeys.has(k)) cache.delete(k);
    }
  };
  const pump = () => {
    while (!disposed && options.canLoad() && pending.size < 3 && queue.length) {
      const k = queue.shift()!;
      if (cache.has(k) || pending.has(k) || failed.has(k)) continue;
      pending.add(k);
      const [room, sheet] = k.split(":").map(Number);
      const image = options.image?.() ?? new Image();
      image.decoding = "async";
      const done = () => { pending.delete(k); pump(); };
      image.onload = async () => {
        try { await image.decode(); } catch { /* onload still provides a usable image */ }
        if (!disposed) { cache.set(k, image); trim(); options.onReady(); }
        done();
      };
      image.onerror = () => { failed.add(k); done(); };
      image.src = options.source(room, sheet);
    }
  };
  return {
    setViews(views: View[], anchors: View[]) {
      protectedKeys = new Set([...views, ...anchors].map(([r, n]) => key(r, n)));
      const next = views.map(([r, n]) => key(r, n));
      // Prioritize the adjacent sheet, then scene boundaries, then a second
      // sheet in either direction. A reversal can use already decoded frames.
      const neighbors = (distance: number) => {
        for (const [room, frame] of views) for (const delta of [distance, -distance]) {
          const n = frame + delta * ATLAS.frames;
          if (n >= 1 && n <= ATLAS.count) next.push(key(room, n));
        }
      };
      neighbors(1);
      next.push(...anchors.map(([r, n]) => key(r, n)));
      neighbors(2);
      queue = [...new Set(next)]; trim(); pump();
    },
    has(room: number, frame: number) { return cache.has(key(room, frame)); },
    get(room: number, requested: number): Frame | undefined {
      let best: Frame | undefined, bestKey = "", distance = Infinity;
      for (const [k, image] of cache) {
        const [r, sheet] = k.split(":").map(Number);
        if (r !== room) continue;
        const first = sheet * ATLAS.frames + 1;
        const frame = Math.max(first, Math.min(first + ATLAS.frames - 1, requested));
        if (Math.abs(frame - requested) >= distance) continue;
        distance = Math.abs(frame - requested); bestKey = k;
        const cell = frame - first;
        best = { image, frame, x: cell % ATLAS.columns * ATLAS.width, y: Math.floor(cell / ATLAS.columns) * ATLAS.height };
      }
      if (!best || distance > ATLAS.frames) return;
      cache.delete(bestKey); cache.set(bestKey, best.image);
      return best;
    },
    resume: pump,
    get size() { return cache.size; },
    dispose() { disposed = true; queue = []; cache.clear(); }
  };
}
