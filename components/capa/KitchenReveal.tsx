/* eslint-disable @next/next/no-img-element -- Pre-sized WebP sequence assets use picture sources and bounded canvas caches. */
"use client";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const FRAME_COUNT=192;
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const ease=(n:number)=>{const t=clamp(n);return t*t*(3-2*t);};

export default function KitchenReveal({asset,reduced}:{asset:(path:string)=>string,reduced:boolean}){
 const root=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null),canvas=useRef<HTMLCanvasElement>(null);
 const controller=useRef<(value:number)=>void>(()=>{});
 const [view,setView]=useState("before");
 useEffect(()=>{
  const el=root.current,frame=stage.current,cn=canvas.current;if(!el||!frame||!cn)return;
  const ctx=cn.getContext("2d");if(!ctx)return;
  const compact=window.matchMedia("(max-width:700px)").matches||(window as Window & {__FRAME_PROFILE__?:string}).__FRAME_PROFILE__==="phone";
  const folder=compact?"kitchen-assembly-handset":"kitchen-assembly";
  cn.width=compact?640:1280;cn.height=compact?360:720;
  let top=0,travel=1,sectionHeight=1,viewportHeight=1,visible=false,raf=0,dead=false;
  let position=reduced?1:0,target=position,manual:number|null=null,previousY=window.scrollY,lastTime=0,lastValue=-1,lastView="",wanted=1,painted=0,active=0;
  const cache=new Map<number,HTMLImageElement>(),pending=new Set<number>(),failed=new Set<number>();let queue:number[]=[];
  const retain=(n:number)=>n===1||n===FRAME_COUNT||Math.abs(n-wanted)<=10;
  const paint=()=>{
   if(dead||reduced||!visible||document.hidden||!cache.size)return;
   const closest=cache.has(wanted)?wanted:[...cache.keys()].reduce((a,b)=>Math.abs(a-wanted)<Math.abs(b-wanted)?a:b);
   // Keep the previous decoded frame during a fast jump until a nearby frame arrives.
   if(painted&&closest!==wanted&&Math.abs(closest-wanted)>8)return;
   if(closest!==painted){ctx.drawImage(cache.get(closest)!,0,0,cn.width,cn.height);painted=closest;}
   el.dataset.framesReady="true";el.dataset.frame=String(closest);el.dataset.cachedFrames=String(cache.size);
  };
  const pump=()=>{
   while(!dead&&!reduced&&visible&&!document.hidden&&active<3&&queue.length){
    const n=queue.shift()!;if(cache.has(n)||pending.has(n)||failed.has(n))continue;
    active++;pending.add(n);const im=new Image();im.decoding="async";
    const done=()=>{active--;pending.delete(n);pump();};
    im.onload=async()=>{try{await im.decode();}catch{}if(!dead&&retain(n)){cache.set(n,im);paint();}done();};
    im.onerror=()=>{failed.add(n);done();};
    im.src=asset(`/media/${folder}/${String(n).padStart(3,"0")}.webp`);
   }
  };
  const requestFrame=(n:number)=>{
   if(reduced)return;
   wanted=n;el.dataset.wantedFrame=String(n);
   cache.forEach((_,key)=>{if(!retain(key))cache.delete(key);});
   queue=[n];for(let d=1;d<=8;d++){if(n+d<=FRAME_COUNT)queue.push(n+d);if(n-d>=1)queue.push(n-d);}
   queue.push(1,FRAME_COUNT);pump();paint();
  };
  const apply=(value:number)=>{
   const n=Math.round(clamp(value)*1000);
   if(n!==lastValue){lastValue=n;el.style.setProperty("--kitchen-reveal",String(n/1000));el.dataset.reveal=(n/1000).toFixed(3);el.dataset.poster=n>=500?"after":"before";
    const next=n<20?"before":n>980?"after":"between";if(next!==lastView){lastView=next;setView(next);}
   }
   const index=1+Math.round(clamp(value)*(FRAME_COUNT-1));
   if(index!==wanted||!painted)requestFrame(index);
  };
  const read=()=>{
   if(reduced)return 1;
   if(travel>8)return ease((window.scrollY-top)/travel/.9);
   return ease((window.scrollY-top+viewportHeight*.66)/(sectionHeight*.55));
  };
  const update=(now:number)=>{
   raf=0;const dt=lastTime?Math.min(40,now-lastTime):16.7;lastTime=now;
   position+=(target-position)*(1-Math.exp(-dt/95));if(Math.abs(target-position)<.001)position=target;
   apply(position);if(position!==target)request();else lastTime=0;
  };
  const request=()=>{if(!dead&&!raf&&visible&&!document.hidden)raf=requestAnimationFrame(update);};
  const scroll=()=>{
   if(Math.abs(window.scrollY-previousY)>2){manual=null;previousY=window.scrollY;}
   target=manual??read();if(reduced){position=target;apply(target);}else request();
  };
  const resize=()=>{top=el.getBoundingClientRect().top+window.scrollY;sectionHeight=el.offsetHeight;viewportHeight=window.innerHeight;travel=Math.max(0,sectionHeight-frame.offsetHeight);scroll();};
  controller.current=(value:number)=>{
   manual=clamp(value);target=manual;position=target;previousY=window.scrollY;apply(target);
  };
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;lastTime=0;}else{scroll();pump();paint();}};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){scroll();requestFrame(wanted);}else{cancelAnimationFrame(raf);raf=0;lastTime=0;}},{rootMargin:"250px"});observer.observe(el);
  const sizing=new ResizeObserver(resize);sizing.observe(el);sizing.observe(frame);
  el.dataset.framesReady="false";resize();apply(position);
  window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("resize",resize);document.addEventListener("visibilitychange",visibility);
  return()=>{dead=true;cancelAnimationFrame(raf);observer.disconnect();sizing.disconnect();cache.clear();window.removeEventListener("scroll",scroll);window.removeEventListener("resize",resize);document.removeEventListener("visibilitychange",visibility);controller.current=()=>{};};
 },[asset,reduced]);
 return <section ref={root} id="cozinha" className={`kitchen-reveal kitchen-assembly ${reduced?"is-reduced":""}`} data-header="light" aria-labelledby="kitchen-reveal-title">
  <div ref={stage} className="kitchen-reveal-stage">
   <img width="1280" height="720" className="kitchen-reveal-ambient" src={asset("/media/assembly-after.webp")} alt="" loading="lazy" decoding="async"/>
   <div className="kitchen-reveal-shade" aria-hidden="true"/>
   <div className="kitchen-reveal-content">
    <div className="kitchen-reveal-copy">
     <p className="eyebrow"><span/> COZINHAS · TUDO NO SEU LUGAR</p>
     <h2 id="kitchen-reveal-title"><span>Cada cozinha</span><span>tem um <em className="kitchen-word-before">antes.</em></span><span>Nós criamos{" "}</span><span>o <em className="kitchen-word-after">depois.</em></span></h2>
     <p className="kitchen-reveal-description">Móveis, materiais e luz.<br/>Tudo encontra o seu lugar.</p>
     <Link className="kitchen-reveal-cta" href="/#hero-form">Vamos imaginar a sua <ArrowUpRight size={17}/></Link>
     <div className="kitchen-reveal-cue"><ArrowDown size={14}/><span>FAÇA SCROLL PARA CONSTRUIR</span></div>
    </div>
    <figure className="kitchen-portal">
     <div className="kitchen-portal-shell">
      <div className="kitchen-portal-frame">
       <div className="kitchen-portal-window">
        <img className="kitchen-portal-poster" src={asset("/media/assembly-before.webp")} width="1280" height="720" alt="Divisão vazia antes da instalação dos móveis da cozinha" loading="lazy" decoding="async"/>
        <img className="kitchen-portal-poster kitchen-portal-poster--after" src={asset("/media/assembly-after.webp")} width="1280" height="720" alt="Cozinha completa com móveis verde-azeitona, armários em nogueira e bancada clara" loading="lazy" decoding="async"/>
        <canvas ref={canvas} className="kitchen-assembly-canvas" width="1280" height="720" role="img" aria-label="Montagem da cozinha por etapas, controlada pelo scroll: do espaço vazio aos móveis e acabamentos completos"/>
        <div className="kitchen-portal-caption" aria-hidden="true"><span>DO ESPAÇO VAZIO.</span><span>À SUA NOVA COZINHA.</span></div>
       </div>
      </div>
      <span className="kitchen-portal-reflection" aria-hidden="true"/>
     </div>
     <div className="kitchen-portal-controls" role="group" aria-label="Ver a cozinha antes e depois da montagem">
      <button type="button" onClick={()=>controller.current(0)} aria-pressed={view==="before"}>01 <span>Antes</span></button>
      <span className="kitchen-portal-track" aria-hidden="true"><i/></span>
      <button type="button" onClick={()=>controller.current(1)} aria-pressed={view==="after"}><span>Depois</span> 02</button>
     </div>
     <figcaption>VISUALIZAÇÃO CONCEPTUAL <span>Uma possibilidade para a sua cozinha.</span></figcaption>
    </figure>
   </div>
  </div>
 </section>;
}
