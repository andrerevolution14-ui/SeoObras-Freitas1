export type HeroPhase = "idle" | "starting" | "playing" | "paused" | "complete" | "released";

type Driver = {
 play: () => Promise<void>;
 pause: () => void;
 hold: () => () => void;
 change: (phase: HeroPhase) => void;
};

// The gesture starts native playback once. Subsequent gestures never seek the video.
export function createHeroPlayback(driver: Driver) {
 let phase: HeroPhase = "idle", unlock: (() => void) | undefined;
 let attempt = 0, disposed = false, interrupted = false;
 const change = (next: HeroPhase) => { phase = next; driver.change(next); };
 const release = () => { unlock?.(); unlock = undefined; };
 const start = () => {
  if (disposed || phase === "starting" || phase === "playing") return;
  interrupted = false;
  const current = ++attempt;
  unlock ??= driver.hold();
  change("starting");
  void driver.play().then(() => {
   if (!disposed && current === attempt) change("playing");
  }).catch(() => {
   if (!disposed && current === attempt) fail();
  });
 };
 const pause = () => {
  if (phase !== "playing" && phase !== "starting") return;
  ++attempt; interrupted = false; driver.pause(); change("paused");
 };
 const finish = () => {
  if (disposed) return;
  ++attempt; interrupted = false; release(); change("complete");
 };
 const skip = () => { driver.pause(); finish(); };
 const fail = () => {
  if (disposed) return;
  ++attempt; interrupted = false; driver.pause(); release(); change("released");
 };
 return {
  get phase() { return phase; },
  start, pause, finish, skip, fail,
  suspend() {
   if (phase === "playing" || phase === "starting") { pause(); interrupted = true; }
  },
  resume() { if (interrupted) start(); },
  dispose() { disposed = true; ++attempt; interrupted = false; driver.pause(); release(); },
 };
}

export function holdHeroPage(hero: HTMLElement): () => void {
 const html = document.documentElement, body = document.body;
 const top = Math.max(0, hero.getBoundingClientRect().top + window.scrollY);
 window.scrollTo({top, behavior:"instant"});
 const previous = {overflow:html.style.overflow, overscroll:html.style.overscrollBehavior, position:body.style.position, top:body.style.top,
  left:body.style.left, right:body.style.right, paddingRight:body.style.paddingRight};
 const gutter = window.innerWidth - html.clientWidth;
 html.style.overflow = "hidden"; html.style.overscrollBehavior = "none";
 body.style.position = "fixed"; body.style.top = `${-top}px`; body.style.left = "0"; body.style.right = "0";
 if (gutter > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + gutter}px`;
 let released = false;
 return () => {
  if (released) return; released = true;
  html.style.overflow = previous.overflow; html.style.overscrollBehavior = previous.overscroll;
  body.style.position = previous.position; body.style.top = previous.top;
  body.style.left = previous.left; body.style.right = previous.right; body.style.paddingRight = previous.paddingRight;
  window.scrollTo({top, behavior:"instant"});
 };
}
