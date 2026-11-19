import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createHeroPlayback, holdHeroPage} from '../components/capa/HeroPlayback.ts';

const flush = () => new Promise(resolve => setImmediate(resolve));
function fixture(play = () => Promise.resolve()) {
 const calls = {play:0,pause:0,hold:0,release:0,states:[]};
 const controller = createHeroPlayback({
  play:() => { calls.play++; return play(); }, pause:() => { calls.pause++; },
  hold:() => { calls.hold++; return () => { calls.release++; }; },
  change:phase => calls.states.push(phase),
 });
 return {controller,calls};
}

test('waits for input; repeated gestures start one native playback and one hold', async () => {
 let resolve; const {controller,calls} = fixture(() => new Promise(r => {resolve=r;}));
 assert.equal(controller.phase,'idle'); assert.equal(calls.play,0); assert.equal(calls.hold,0);
 for(let i=0;i<20;i++) controller.start();
 assert.equal(calls.play,1); assert.equal(calls.hold,1); assert.equal(controller.phase,'starting');
 resolve(); await flush(); controller.start();
 assert.equal(controller.phase,'playing'); assert.equal(calls.play,1);
});

test('manual pause retains the scene, resume does not relock, and ending releases once', async () => {
 const {controller,calls}=fixture(); controller.start(); await flush(); controller.pause();
 assert.equal(controller.phase,'paused'); assert.equal(calls.release,0);
 controller.start(); await flush(); assert.equal(calls.hold,1);
 controller.finish(); controller.finish();
 assert.equal(controller.phase,'complete'); assert.equal(calls.release,1);
});

test('blocked autoplay restores normal navigation', async () => {
 const {controller,calls}=fixture(() => Promise.reject(new Error('NotAllowedError')));
 controller.start(); await flush();
 assert.equal(controller.phase,'released'); assert.equal(calls.release,1);
});

test('skip cancels an in-flight start and a late resolution cannot relock the page', async () => {
 let resolve; const {controller,calls}=fixture(() => new Promise(r=>{resolve=r;}));
 controller.start(); controller.skip(); resolve(); await flush();
 assert.equal(controller.phase,'complete'); assert.equal(calls.release,1); assert.equal(calls.hold,1);
});

test('visibility resumes interrupted playback but preserves a manual pause', async () => {
 const {controller,calls}=fixture(); controller.start(); await flush();
 controller.suspend(); controller.resume(); await flush(); assert.equal(calls.play,2);
 controller.pause(); controller.suspend(); controller.resume(); await flush();
 assert.equal(controller.phase,'paused'); assert.equal(calls.play,2);
});

test('media failure releases the page and a deliberate retry can start again', async () => {
 const {controller,calls}=fixture(); controller.start(); await flush(); controller.fail();
 assert.equal(controller.phase,'released'); assert.equal(calls.release,1);
 controller.start(); await flush(); assert.equal(controller.phase,'playing'); assert.equal(calls.hold,2);
 controller.dispose(); assert.equal(calls.release,2);
});

test('unmount restores scrolling even when playback has not started yet', async () => {
 let resolve; const {controller,calls}=fixture(() => new Promise(r=>{resolve=r;}));
 controller.start(); controller.dispose(); const count=calls.states.length;
 resolve(); await flush(); controller.start();
 assert.equal(calls.states.length,count); assert.equal(calls.release,1); assert.equal(calls.play,1);
});

test('page hold restores exact pre-existing styles and scroll position, only once', () => {
 const originals={window:globalThis.window,document:globalThis.document,getComputedStyle:globalThis.getComputedStyle};
 const body={style:{position:'relative',top:'4px',left:'',right:'',paddingRight:'8px'}};
 const html={style:{overflow:'auto',overscrollBehavior:'contain'},clientWidth:980}; const scrolls=[];
 globalThis.document={documentElement:html,body};
 globalThis.window={innerWidth:1000,scrollY:0,scrollTo:v=>scrolls.push(v)};
 globalThis.getComputedStyle=()=>({paddingRight:'8px'});
 try {
  const release=holdHeroPage({getBoundingClientRect:()=>({top:0})});
  assert.equal(body.style.position,'fixed'); assert.equal(html.style.overflow,'hidden');
  assert.equal(body.style.paddingRight,'28px'); release(); release();
  assert.deepEqual(body.style,{position:'relative',top:'4px',left:'',right:'',paddingRight:'8px'});
  assert.equal(html.style.overflow,'auto'); assert.equal(html.style.overscrollBehavior,'contain'); assert.equal(scrolls.length,2); assert.equal(scrolls[1].top,0);
 } finally { for(const [key,value] of Object.entries(originals)) { if(value===undefined) delete globalThis[key]; else globalThis[key]=value; } }
});
