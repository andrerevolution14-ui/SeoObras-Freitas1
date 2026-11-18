// Eight adjacent frames share one download and decode. This keeps a swipe from
// outrunning one network request per frame while bounding decoded image memory.
export const ATLAS = { frames: 8, columns: 4, width: 540, height: 960, count: 192, limit: 6 };
export type View = [room: number, frame: number];
type FrameImage = HTMLImageElement | ImageBitmap;
type Frame = { image: FrameImage; frame: number; x: number; y: number };

export function createMobileFrames(options: {
  source: (room: number, sheet: number) => string;
  canLoad: () => boolean;
  onReady: () => void;
  image?: () => HTMLImageElement;
}) {
  const cache = new Map<string, FrameImage>();
  const pending = new Set<string>(), failed = new Set<string>();
  let queue: string[] = [], wantedKeys = new Set<string>(), disposed = false;
  let previous: View | undefined, direction = 1;
  const key = (room: number, frame: number) => `${room}:${Math.floor((frame - 1) / ATLAS.frames)}`;
  const release = (image: FrameImage) => { if ("close" in image) image.close(); };
  const trim = () => {
    for (const k of cache.keys()) {
      if (cache.size <= ATLAS.limit) break;
      if (!wantedKeys.has(k)) { release(cache.get(k)!); cache.delete(k); }
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
        let decoded: FrameImage = image;
        if (typeof createImageBitmap === "function") {
          try { decoded = await createImageBitmap(image); } catch { /* retain the HTML image fallback */ }
        }
        image.onload = null; image.onerror = null;
        if (decoded !== image) image.removeAttribute("src");
        // A swipe can change the window while a request is in flight. A late
        // sheet must not evict the neighbors needed by the current gesture.
        if (!disposed && wantedKeys.has(k)) { cache.set(k, decoded); trim(); options.onReady(); }
        else release(decoded);
        done();
      };
      image.onerror = () => { failed.add(k); done(); };
      image.src = options.source(room, sheet);
    }
  };
  return {
    setViews(views: View[], anchors: View[]) {
      const first = views[0];
      if (first && previous?.[0] === first[0] && previous[1] !== first[1]) direction = Math.sign(first[1] - previous[1]);
      if (first) previous = first;
      const next = [...views, ...anchors].map(([r, n]) => key(r, n));
      // Keep scene boundaries ready, then look ahead in the gesture's direction.
      const neighbors = (distance: number) => {
        for (const delta of [distance * direction, -distance * direction]) for (const [room, frame] of views) {
          const n = frame + delta * ATLAS.frames;
          if (n >= 1 && n <= ATLAS.count) next.push(key(room, n));
        }
      };
      neighbors(1);
      neighbors(2);
      // The prefetch window must fit in decoded memory. A larger queue used to
      // evict its own prefetched sheets and decode them again on every frame.
      queue = [...new Set(next)].slice(0, ATLAS.limit);
      wantedKeys = new Set(queue);
      trim(); pump();
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
    dispose() { disposed = true; queue = []; cache.forEach(release); cache.clear(); }
  };
}
