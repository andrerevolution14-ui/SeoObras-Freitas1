import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createFilmSpeed,wheelDistance} from '../components/capa/FilmSpeed.ts';

function fixture() {
 let now=0,id=0,rate=1; const pending=new Map(),writes=[];
 const speed=createFilmSpeed(value=>{rate=value;writes.push(value);},{
  now:()=>now,request:cb=>{pending.set(++id,cb);return id;},cancel:key=>pending.delete(key),
 });
 const step=ms=>{now+=ms;const callbacks=[...pending.values()];pending.clear();callbacks.forEach(cb=>cb(now));};
 const advance=(ms,stepMs=1000/60)=>{for(let elapsed=0;elapsed<ms;elapsed+=stepMs)step(Math.min(stepMs,ms-elapsed));};
 return {speed,writes,pending,step,advance,get rate(){return rate;}};
}

test('no animation work at rest, and a burst of wheel events uses a single loop',()=>{
 const f=fixture();assert.equal(f.pending.size,0);assert.equal(f.writes.length,0);
 for(let i=0;i<40;i++)f.speed.push(10);
 assert.equal(f.pending.size,1);f.advance(100);assert.ok(f.rate>1&&f.rate<3);
});

test('continued scrolling accelerates smoothly without exceeding 3x',()=>{
 const f=fixture();
 for(let i=0;i<30;i++){f.speed.push(120);f.advance(50);}
 assert.ok(f.rate>2.9);assert.ok(f.writes.every(rate=>rate>=1&&rate<=3));
 assert.ok(f.writes[0]<1.5,'the initial speed change is eased');
});

test('when gestures stop the rate returns to 1x and the loop shuts down',()=>{
 const f=fixture();f.speed.push(400);f.advance(300);const peak=f.rate;
 assert.ok(peak>2);f.advance(800);assert.ok(f.rate<peak&&f.rate>1);
 f.advance(2500);assert.equal(f.rate,1);assert.equal(f.pending.size,0);
});

test('pause, failure or unmount can reset the rate immediately and cancel pending work',()=>{
 const f=fixture();f.speed.push(400);f.advance(200);f.speed.reset();
 assert.equal(f.rate,1);assert.equal(f.pending.size,0);
 f.speed.push(400);f.advance(100);f.speed.dispose();f.speed.push(400);
 assert.equal(f.rate,1);assert.equal(f.pending.size,0);
});

test('negative, empty and invalid input never speeds up playback',()=>{
 const f=fixture();[-100,0,NaN,Infinity].forEach(value=>f.speed.push(value));
 assert.equal(f.rate,1);assert.equal(f.pending.size,0);
});

test('mouse wheel units are normalized to the same travel as touch and trackpad input',()=>{
 assert.equal(wheelDistance(160,0,800),160);
 assert.equal(wheelDistance(10,1,800),160);
 assert.equal(wheelDistance(.2,2,800),160);
});

test('60Hz and 120Hz displays accelerate and settle at comparable speeds',()=>{
 const run=hz=>{const f=fixture();f.speed.push(400);f.advance(800,1000/hz);return f.rate;};
 assert.ok(Math.abs(run(60)-run(120))<.03);
});
