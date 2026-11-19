const MAX_RATE = 3;
type Clock = {now:()=>number; request:(callback:(time:number)=>void)=>number; cancel:(id:number)=>void};

export function wheelDistance(delta:number, mode:number, viewportHeight:number):number {
 return delta * (mode === 1 ? 16 : mode === 2 ? viewportHeight : 1);
}

// Adjust native playbackRate only. No seeks, frame loading, or work while idle.
export function createFilmSpeed(write:(rate:number)=>void, clock:Clock) {
 let rate=1, target=1, lastWrite=1, lastInput=0, lastTick=0, frame=0, disposed=false;
 const apply = (value:number) => {
  if(value === 1 || Math.abs(value-lastWrite)>=.025) { lastWrite=value; write(value); }
 };
 const reset = () => {
  if(frame) clock.cancel(frame);
  frame=0; rate=1; target=1;
  if(lastWrite!==1) apply(1);
 };
 const tick = (now:number) => {
  frame=0;
  if(disposed)return;
  const elapsed=Math.max(0,Math.min(100,now-lastTick));
  const decay=Math.max(0,now-Math.max(lastTick,lastInput+350));
  target=1+(target-1)*Math.exp(-decay/380);
  rate+=(target-rate)*(1-Math.exp(-elapsed/(target>rate?100:220)));
  lastTick=now;
  if(rate<1.01&&target<1.01) { reset(); return; }
  apply(Math.max(1,Math.min(MAX_RATE,rate)));
  frame=clock.request(tick);
 };
 return {
  push(distance:number) {
   if(disposed||!Number.isFinite(distance)||distance<=0)return;
   const now=clock.now(); lastInput=now;
   target=Math.min(MAX_RATE,Math.max(target,rate)+Math.min(distance,400)/200);
   if(!frame) {lastTick=now;frame=clock.request(tick);}
  },
  reset,
  dispose() { reset(); disposed=true; },
 };
}
