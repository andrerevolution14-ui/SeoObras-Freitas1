// Smooth the visual playhead, never the page's native touch scrolling. Time-based
// damping gives 60 Hz and 120 Hz phones the same response, with bounded lag.
export function advanceMobileProgress(current: number, target: number, elapsed: number) {
  const distance = target - current;
  if (Math.abs(distance) > .12) return target; // navigation or a large jump
  const start = target - Math.max(-.014, Math.min(.014, distance));
  const next = start + (target - start) * -Math.expm1(-elapsed / 55);
  return Math.abs(target - next) < .00002 ? target : next;
}
