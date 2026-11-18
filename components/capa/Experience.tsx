"use client";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import BathroomCutaway from "./BathroomCutaway";
import KitchenReveal from "./KitchenReveal";
import ProjectShowcase from "./ProjectShowcase";
import {drawSpatialCopy, type CameraProjection} from "./SpatialCopy";
import {ATLAS, createMobileFrames, type View} from "./MobileFrames";
import {advanceMobileProgress} from "./MobileMotion";

const media = "/capa-media/4083ece1d08f/";
const asset=(path:string):string => path.replace(/^\/media\//,"/capa-media/4083ece1d08f/");
const clamp = (v:number, a=0, b=1) => Math.max(a,Math.min(b,v));
const cinematicEase = (v:number) => { const x=clamp(v); return x*x*x*(x*(x*6-15)+10); };
const segment = (v:number,a:number,b:number) => clamp((v-a)/(b-a));
const stages = ["A sua casa", "A transformação da ilha", "Precisão em cada corte", "A nova ilha", "Uma nova cozinha", "De uma divisão à outra", "Uma nova possibilidade", "A preparação", "Preparar a parede", "Assentar e alinhar", "O último acabamento", "Continuar a descobrir"];
const sequenceNames=["kitchen","passage","bathroom","ceramic-cut","ceramic-lay"];
const portraitFolders=["mobile-native-v1","mobile-portrait-v1","mobile-native-v1","mobile-portrait-v1","mobile-portrait-v1"];
const phoneLayout=()=>window.matchMedia("(max-width:700px), (max-width:1000px) and (max-height:500px) and (orientation:landscape)").matches;
const portraitLayout=()=>window.matchMedia("(max-width:700px) and (orientation:portrait)").matches;
const phoneCaptions=[[[0,.065]],[[.065,.12],[.285,.395]],[[.395,.445]],[[.445,.66]],[[.66,.70]],[[.70,.765]],[[.14,.27]],[[.795,.835]],[[.85,.914]],[[.94,.98]],[[.985,1]]];
const desktopCaptions=[[[0,.05]],[[.065,.11],[.31,.38]],[[.405,.435]],[[.46,.64]],[[.67,.695]],[[.71,.755]],[[.15,.26]],[[.797,.833]],[[.855,.91]],[[.944,.978]],[[.988,1]]];
// Both craft inserts scrub frame by frame; the wall sequence holds the completed fit before returning to the room.
const journeyShots=[
 {end:.14,room:0,from:.022,to:.12,first:1,last:60},
 {end:.285,room:3,from:.14,to:.27,first:1,last:192},
 {end:.445,room:0,from:.285,to:.395,first:72,last:192},
 {end:.66,room:1,from:.445,to:.66,first:1,last:192},
 {end:.795,room:2,from:.70,to:.765,first:1,last:52},
 {end:.83,room:4,from:.795,to:.83,first:16,last:72},
 {end:.855,room:4,from:.83,to:.855,first:72,last:96},
 {end:.94,room:4,from:.855,to:.90,first:120,last:192},
 {end:1.01,room:2,from:.94,to:.985,first:77,last:192}
];
type BlendLayer={room:number,frame:number,zoom:number,focal:number};
function wallTransition(p:number,mobile:boolean):{name:string,amount:number,reveal?:boolean,layers:[BlendLayer,BlendLayer]}|undefined {
 if(p>=.765&&p<.795){
  const u=segment(p,.765,.795),t=cinematicEase(u);
  return {name:"bathroom-to-mortar",amount:t,layers:[
   {room:2,frame:52+Math.round(u*12),zoom:1+.12*t,focal:mobile?.55:.5},
   {room:4,frame:1+Math.round(u*15),zoom:1+.04*(1-t),focal:.5}
  ]};
 }
 if(p>=.83&&p<.855){
  const u=segment(p,.83,.855),t=cinematicEase(u);
  return {name:"mortar-to-tile",amount:t,layers:[
   {room:4,frame:72+Math.round(u*24),zoom:1+.025*t,focal:.5},
   {room:4,frame:97+Math.round(u*23),zoom:1+.025*(1-t),focal:.5}
  ]};
 }
 if(p>=.91&&p<.94){
  const u=segment(p,.91,.94),t=cinematicEase(u);
  return {name:"fitted-tile-to-bathroom",amount:t,layers:[
   {room:4,frame:192,zoom:1+.025*t,focal:.5},
   {room:2,frame:65+Math.round(u*12),zoom:1+.12*(1-t),focal:mobile?.55:.5}
  ]};
 }
}
function roomTransition(p:number,mobile:boolean):ReturnType<typeof wallTransition> {
 if(p>=.42&&p<.445){
  const t=cinematicEase(segment(p,.42,.445));
  return {name:"kitchen-to-journey",amount:t,reveal:true,layers:[
   {room:0,frame:192,zoom:1.07+.045*t,focal:mobile?.53:.5},
   {room:1,frame:1,zoom:1+.07*(1-t),focal:mobile?.53:.5}
  ]};
 }
 if(p>=.64&&p<.68){
  const u=segment(p,.64,.68),t=cinematicEase(u);
  return {name:"journey-to-bathroom",amount:t,reveal:true,layers:[
   {room:1,frame:174+Math.round(u*18),zoom:1+.06*t,focal:mobile?.55:.5},
   {room:2,frame:1,zoom:1+.06*(1-t),focal:mobile?.55:.5}
  ]};
 }
}

function SceneTitle({lead,accent,opening=false}:{lead:string,accent:string,opening?:boolean}) {
 const Tag=opening?"h1":"h2";
 return <Tag className="scene-title" aria-label={`${lead} ${accent}`}><span className="copy-line" aria-hidden="true"><span>{lead}</span></span><span className="copy-line accent" aria-hidden="true"><em>{accent}</em></span></Tag>;
}

function Hero({reduced}:{reduced:boolean}) {
 const root=useRef<HTMLElement>(null), canvas=useRef<HTMLCanvasElement>(null), progress=useRef<HTMLSpanElement>(null), captionWrap=useRef<HTMLDivElement>(null), spatial=useRef<HTMLCanvasElement>(null);
 const [stage,setStage]=useState(0), [ready,setReady]=useState(false);
 useEffect(()=>{
  if(reduced)return;
  const section=root.current,cn=canvas.current;
  if(!section||!cn)return;
  const ctx=cn.getContext("2d");if(!ctx)return;
  const revealCanvas=document.createElement("canvas"),revealContext=revealCanvas.getContext("2d");
  const depthCanvas=spatial.current,depthContext=depthCanvas?.getContext("2d");
  let camera:CameraProjection|null=null,depthW=0,depthH=0,depthDpr=1,fontReady=false;
  const fontFamily=getComputedStyle(section).getPropertyValue("--hero-serif").trim()||"Georgia,serif";

  let dead=false,raf=0,target=0,w=0,h=0,lastKey="",oldStage=-1,canvasReady=false,sectionTop=0,travel=1,inView=true,mobile=phoneLayout(),portrait=portraitLayout();
  let rendered=0,lastTick=0,snapMotion=true;
  const captions=Array.from(captionWrap.current?.querySelectorAll<HTMLElement>(".scene-copy")||[]);
  const captionOpacity=captions.map(()=>-1),captionPhase=captions.map(()=>-1);
  const caches=sequenceNames.map(()=>new Map<number,HTMLImageElement>());
  // Preserve the original 720p footage on every screen; memory is bounded separately.
  const folders=sequenceNames.map(name=>name+"-hd");
  const counts=[192,192,192,192,192];
  const pending=new Set<string>(),failed=new Set<string>(),anchors=new Set<string>();
  const recent=new Map<string,number>();let access=0;
  const anchorsAt=(p:number)=>p<.14?["0:60","3:1"]:p<.285?["3:192","0:72"]:p<.445?["0:192","1:1"]:p<.68?["1:192","2:1"]:p<.795?["2:64","4:1","4:16"]:p<.855?["4:96","4:97","4:120"]:p<.94?["4:192","2:65"]:["2:192"];
  let activated=false;
  let wantedViews:[number,number][]=[[0,1]],wantedKey="",active=0,queue:[number,number][]=[];
  const mobileFrames=createMobileFrames({
   source:(room,sheet)=>asset(`${media}${portraitFolders[room]}/${sequenceNames[room]}/${String(sheet).padStart(2,"0")}.webp`),
   canLoad:()=>activated&&portrait&&inView&&!document.hidden,
   onReady:()=>{lastKey="";request();}
  });
  // Keep recently decoded frames through quick swipes and reversals. Discarding
  // an in-flight result just because the scroll moved starves the renderer.
  const trim=()=>{
   const limit=mobile?32:48;
   for(const [key] of [...recent].sort((a,b)=>a[1]-b[1])){
    if(recent.size<=limit)break;
    const [room,num]=key.split(":").map(Number);
    if(anchors.has(key)||wantedViews.some(([r,n])=>r===room&&n===num))continue;
    caches[room].delete(num);recent.delete(key);
   }
  };
  const pump=()=>{
   if(portrait){mobileFrames.resume();return;}
   while(activated&&active<3&&queue.length&&!dead&&inView&&!document.hidden){
    const [room,num]=queue.shift()!,key=`${room}:${num}`;
    if(caches[room].has(num)||pending.has(key)||failed.has(key))continue;
    active++;pending.add(key);
    void load(room,num).then(()=>{active--;pending.delete(key);pump();});
   }
  };
  const around=(views:[number,number][])=>{
   wantedViews=views;
   if(portrait){mobileFrames.setViews(views,[...anchors].map(key=>key.split(":").map(Number) as View));return;}
   queue=[...views];
   for(let d=1;d<=8;d++)for(const [room,index] of views){if(index+d<=counts[room])queue.push([room,index+d]);if(index-d>=1)queue.push([room,index-d]);}
   for(const key of anchors){const [r,n]=key.split(":").map(Number);queue.push([r,n]);}
   trim();
   pump();
  };
  const load=(room:number,num:number)=>new Promise<void>(resolve=>{
   const im=new Image();im.decoding="async";
   im.onload=async()=>{try{await im.decode();}catch{}if(!dead){caches[room].set(num,im);recent.set(`${room}:${num}`,++access);trim();lastKey="";request();}resolve();};
   im.onerror=()=>{failed.add(`${room}:${num}`);resolve();};
   im.src=asset(`${media}${folders[room]}/${String(num).padStart(3,"0")}.webp`);
  });
  const paint=(room:number,index:number,zoom=1,focalX?:number,focalY=.5,alpha=1,surface=ctx)=>{
   if(portrait){
    const frame=mobileFrames.get(room,index);if(!frame)return;
    // These frames have already been composed for 9:16. Only accommodate
    // the small difference between the phone screen and the portrait master.
    surface.globalAlpha=alpha;
    const fit=Math.max(w/ATLAS.width,h/ATLAS.height),fw=ATLAS.width*fit,fh=ATLAS.height*fit;
    if(alpha===1){surface.fillStyle="#171614";surface.fillRect(0,0,w,h);}
    surface.drawImage(frame.image,frame.x,frame.y,ATLAS.width,ATLAS.height,(w-fw)/2,(h-fh)/2,fw,fh);
    surface.globalAlpha=1;
    if(surface===ctx){cn.dataset.sourceSize=`${ATLAS.width}x${ATLAS.height}`;cn.dataset.profile="portrait-9x16";}
    return frame.frame;
   }
   const cache=caches[room];if(!cache.size)return;
   const actual=cache.has(index)?index:[...cache.keys()].reduce((a,b)=>Math.abs(a-index)<Math.abs(b-index)?a:b);
   // Hold the current image instead of flashing an unrelated anchor frame.
   if(Math.abs(actual-index)>8)return;
   recent.set(`${room}:${actual}`,++access);
   const im=cache.get(actual)!;
   if(surface===ctx){cn.dataset.sourceSize=`${im.naturalWidth}x${im.naturalHeight}`;cn.dataset.profile="hd";}
   const ratio=Math.max(w/im.naturalWidth,h/im.naturalHeight)*zoom;
   const focal=focalX??(mobile?(room===0?.53:room===1?.53+.02*(index-1)/191:room===3?.6:room===4?.5:.55):.5);
   const scaledWidth=im.naturalWidth*ratio,scaledHeight=im.naturalHeight*ratio;
   surface.globalAlpha=alpha;
   const dx=clamp(w/2-scaledWidth*focal,w-scaledWidth,0),dy=clamp(h/2-scaledHeight*focalY,h-scaledHeight,0);
   surface.drawImage(im,dx,dy,scaledWidth,scaledHeight);
   if(surface===ctx&&alpha===1)camera={room,frame:actual,x:dx*depthW/w,y:dy*depthH/h,scale:scaledWidth/1280*depthW/w};
   surface.globalAlpha=1;
   return actual;
  };
  const hasFrame=(room:number,index:number)=>portrait?mobileFrames.has(room,index):caches[room].has(index);
  const draw=(room:number,index:number,p:number,blend:ReturnType<typeof wallTransition>)=>{
   const intoCut=p>=.12&&p<.14,fromCut=p>=.27&&p<.285;
   let actual:number|undefined;
   cn.dataset.transition="";cn.dataset.blend="0";cn.dataset.transitionStyle="";
   if(intoCut&&hasFrame(0,60)&&hasFrame(3,1)){
    const t=cinematicEase(segment(p,.12,.14));
    actual=paint(0,60,1+.5*t,(mobile?.53:.5)+.07*t,.5+.13*t);
    paint(3,1,1+.12*(1-t),mobile?.6:.5,.5,t);
    cn.dataset.transition="island-to-cut";cn.dataset.blend=t.toFixed(3);
   }else if(fromCut&&hasFrame(3,192)&&hasFrame(0,72)){
    const t=cinematicEase(segment(p,.27,.285));
    actual=paint(3,192,1+.12*t,mobile?.6:.5);
    paint(0,72,1+.45*(1-t),(mobile?.53:.5)+.07*(1-t),.5+.13*(1-t),t);
    cn.dataset.transition="cut-to-new-island";cn.dataset.blend=t.toFixed(3);
   }else if(blend){
    const [outgoing,incoming]=blend.layers;
    actual=paint(outgoing.room,outgoing.frame,outgoing.zoom,outgoing.focal);
    let next:number|undefined;
    if(blend.reveal&&revealContext&&actual!==undefined){
     if(revealCanvas.width!==w||revealCanvas.height!==h){revealCanvas.width=w;revealCanvas.height=h;revealContext.imageSmoothingEnabled=true;revealContext.imageSmoothingQuality="high";}
     revealContext.clearRect(0,0,w,h);
     next=paint(incoming.room,incoming.frame,incoming.zoom,incoming.focal,.5,1,revealContext);
     const feather=w*.07,edge=w+feather-(w+2*feather)*blend.amount;
     const mask=revealContext.createLinearGradient(edge-feather,0,edge+feather,0);
     mask.addColorStop(0,"rgba(0,0,0,0)");mask.addColorStop(1,"rgba(0,0,0,1)");
     revealContext.globalCompositeOperation="destination-in";revealContext.fillStyle=mask;revealContext.fillRect(0,0,w,h);revealContext.globalCompositeOperation="source-over";
     ctx.drawImage(revealCanvas,0,0);
    }else next=paint(incoming.room,incoming.frame,incoming.zoom,incoming.focal,.5,actual===undefined?1:blend.amount);
    actual??=next;
    cn.dataset.transition=blend.name;cn.dataset.blend=blend.amount.toFixed(3);
    cn.dataset.transitionStyle=blend.reveal?"directional-reveal":"dissolve";
   }else{
    const shot=journeyShots.find(shot=>p<shot.end)!;
    const phase=segment(p,shot.from,room===1?.64:shot.to);
    const depth=room===4?.012:room===3?.025:.018;
    const zoom=p>=.395&&p<.42?1+.07*cinematicEase(segment(p,.395,.42)):1+depth*Math.sin(Math.PI*phase);
    actual=paint(room,index,zoom);
   }
   if(actual===undefined)return;
   cn.dataset.frame=String(actual);cn.dataset.room=sequenceNames[blend?.layers[0].room??room];
   cn.dataset.nextRoom=blend?sequenceNames[blend.layers[1].room]:"";
   cn.dataset.cached=String(portrait?mobileFrames.size:caches.reduce((total,cache)=>total+cache.size,0));
   if(!canvasReady){canvasReady=true;setReady(true);if(fontReady&&!mobile)section.dataset.depth="ready";}
  };
  const update=(now:number)=>{
   raf=0;
   // The page follows the finger natively. Only the portrait film and its copy
   // share this short damped playhead, without a long catch-up after a swipe.
   const elapsed=lastTick&&now-lastTick<80?now-lastTick:1000/60;
   rendered=portrait&&!snapMotion&&canvasReady?advanceMobileProgress(rendered,target,elapsed):target;
   lastTick=now;snapMotion=false;
   const p=rendered;section.dataset.progress=p.toFixed(4);
   const shot=journeyShots.find(shot=>p<shot.end)!;
   const room=shot.room;
   const index=shot.first+Math.round(segment(p,shot.from,shot.to)*(shot.last-shot.first));
   const blend=wallTransition(p,mobile)||roomTransition(p,mobile);
   const views:[number,number][]=blend?blend.layers.map(layer=>[layer.room,layer.frame]):[[room,index]];
   const nextAnchors=anchorsAt(p);
   const viewKey=views.map(([r,n])=>`${r}:${n}`).join("|")+";"+nextAnchors.join("|");
   if(viewKey!==wantedKey){wantedKey=viewKey;anchors.clear();nextAnchors.forEach(key=>anchors.add(key));around(views);}
   const key=`${room}:${index}:${p.toFixed(4)}`;
   if(key!==lastKey){draw(room,index,p,blend);lastKey=key;}
   if(depthContext&&depthCanvas&&fontReady&&!mobile){
    const subject=drawSpatialCopy(depthContext,depthW,depthH,depthDpr,p,camera,mobile,fontFamily);
    depthCanvas.dataset.subject=subject;depthCanvas.dataset.frame=String(camera?.frame||0);
   }
   if(progress.current)progress.current.style.transform=`scaleX(${p})`;
   const times=mobile?phoneCaptions:desktopCaptions;
   captions.forEach((el,i)=>{
    const interval=times[i].find(([start,end])=>p>=start&&p<=end)||times[i][0];
    const phase=Math.round(segment(p,interval[0],interval[1])*1000);
    const opacity=Math.max(...times[i].map(([start,end])=>{
     const fade=Math.min(.008,(end-start)*.2);
     const fadeIn=i===0?1:cinematicEase(segment(p,start+.001,start+fade));
     const fadeOut=i===times.length-1?1:1-cinematicEase(segment(p,end-fade,end-.001));
     return fadeIn*fadeOut;
    }));
    if(opacity>.005&&captionPhase[i]!==phase){
     captionPhase[i]=phase;el.style.setProperty("--copy-progress",String(phase/1000));
     el.style.setProperty("--copy-drift",`${((phase/1000-.5)*(mobile?3:12)).toFixed(2)}px`);
    }
    const rounded=Math.round(opacity*1000);if(captionOpacity[i]===rounded)return;captionOpacity[i]=rounded;
    el.style.opacity=String(opacity);el.style.setProperty("--copy-reveal",String(opacity));
    el.style.visibility=opacity>.005?"visible":"hidden";el.style.pointerEvents=opacity>.9?"auto":"none";el.inert=opacity<.9;
    if(opacity>.5)section.dataset.copy=el.dataset.composition||"opening";
   });
   const current=[.022,.14,.285,.395,.445,.66,.70,.765,.845,.94,.985,1.01].findIndex(end=>p<end);
   if(current!==oldStage){setStage(current);oldStage=current;}
   if(portrait&&rendered!==target)request();
  };
  const request=()=>{if(!raf&&!dead&&inView&&!document.hidden)raf=requestAnimationFrame(update);};
  const onScroll=()=>{target=clamp((window.scrollY-sectionTop)/travel);if(target>.0001){activated=true;pump();}request();};
  const resize=()=>{
   const nextMobile=phoneLayout(),nextPortrait=portraitLayout();
   if(nextMobile!==mobile||nextPortrait!==portrait){mobile=nextMobile;portrait=nextPortrait;wantedKey="";lastKey="";snapMotion=true;}
   if(mobile)delete section.dataset.depth;else if(canvasReady&&fontReady)section.dataset.depth="ready";
   sectionTop=section.getBoundingClientRect().top+window.scrollY;
   travel=Math.max(1,section.offsetHeight-(section.querySelector<HTMLElement>(".stage")?.offsetHeight||window.innerHeight));
   // Never render below the CSS display size; retain detail on high-density screens.
   const ratio=Math.max(1,Math.min(window.devicePixelRatio||1,2,1920/Math.max(cn.clientWidth,1),1080/Math.max(cn.clientHeight,1)));
   const nextW=Math.round(cn.clientWidth*ratio),nextH=Math.round(cn.clientHeight*ratio);
   if(nextW!==w||nextH!==h){w=nextW;h=nextH;cn.width=w;cn.height=h;lastKey="";}
   ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";
   if(depthCanvas){
    depthW=depthCanvas.clientWidth;depthH=depthCanvas.clientHeight;depthDpr=Math.min(window.devicePixelRatio||1,2);
    const dw=Math.round(depthW*depthDpr),dh=Math.round(depthH*depthDpr);
    if(depthCanvas.width!==dw||depthCanvas.height!==dh){depthCanvas.width=dw;depthCanvas.height=dh;lastKey="";}
   }
   onScroll();
  };
  const pause=()=>{cancelAnimationFrame(raf);raf=0;snapMotion=true;lastTick=0;};
  const visibility=()=>{if(document.hidden)pause();else{onScroll();pump();}};
  // Canvas text must use the same loaded roman and italic faces as the HTML captions.
  const enableDepth=()=>{if(!dead&&depthContext){fontReady=true;if(canvasReady&&!mobile)section.dataset.depth="ready";lastKey="";resize();}};
  void document.fonts.ready.then(enableDepth,enableDepth);
  resize();
  const intersection=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(inView){resize();pump();}else pause();},{rootMargin:"120px 0px"});intersection.observe(section);
  const sizing=new ResizeObserver(resize);sizing.observe(cn);sizing.observe(section);
  // Warm a small bounded window after the poster paints, before the first swipe.
  const warmup=window.setTimeout(()=>{activated=true;wantedKey="";request();pump();},180);
  window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",resize);
  document.addEventListener("visibilitychange",visibility);
  return()=>{dead=true;clearTimeout(warmup);delete section.dataset.depth;pause();intersection.disconnect();sizing.disconnect();window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",resize);document.removeEventListener("visibilitychange",visibility);caches.forEach(cache=>cache.clear());recent.clear();mobileFrames.dispose();};
 },[reduced]);
 const jump=(p:number)=>{if(root.current)window.scrollTo({top:root.current.getBoundingClientRect().top+window.scrollY+(root.current.offsetHeight-(root.current.querySelector<HTMLElement>(".stage")?.offsetHeight||window.innerHeight))*p,behavior:reduced?"instant":"smooth"});};
 if(reduced)return <section className="still-hero scroll-still" id="inicio" data-header="light"><span id="experiencia" className="journey-anchor"/><picture className="still-picture"><source media="(max-width:700px) and (orientation:portrait)" srcSet={asset(`${media}mobile-native-v1/after.webp`)}/><img src={asset(`${media}kitchen-after.webp`)} width="1672" height="941" fetchPriority="high" alt="Visualização conceptual da cozinha renovada com ilha de travertino"/></picture><div className="shade"/><div className="opening-copy"><p className="eyebrow"><span/> OBRAS E REMODELAÇÕES EM AVEIRO</p><SceneTitle opening lead="Uma nova vida" accent="para a sua casa."/><p className="opening-description">Chave na mão, com orçamento fechado,<br className="desktop"/> prazo em contrato e garantia escrita.</p><Link href="/#hero-form" className="pill cream">Pedir orçamento <ArrowUpRight size={16}/></Link><a className="opening-secondary" href="#remodelacao">Descobrir a remodelação <ArrowDown size={13}/></a></div></section>;
 return <section ref={root} className="journey scroll-hero" id="inicio" data-header="light" aria-label="Uma viagem pela renovação da sua casa">
  <span id="experiencia" className="journey-anchor"/>
  <div className="stage">
   <div className="room room-kitchen"><picture><source media="(max-width:700px) and (orientation:portrait)" srcSet={asset(`${media}mobile-native-v1/poster.webp`)}/><source media="(max-width:700px), (max-width:1000px) and (max-height:500px) and (orientation:landscape)" srcSet={asset(`${media}mobile-frames-v1/poster.webp`)}/><img className="poster" src={asset(`${media}kitchen-before.webp`)} width="1672" height="941" alt="Visualização de uma cozinha antes da remodelação em Aveiro" fetchPriority="high" decoding="async"/></picture><canvas ref={canvas} aria-label="Percurso pela mesma casa: cozinha, passagem, remodelação da casa de banho e destaques do corte e assentamento da cerâmica, controlados pelo scroll" style={{opacity:ready?1:0}}/></div>
   <div className="shade"/>
   <canvas ref={spatial} className="spatial-copy-layer" aria-hidden="true"/>
   <div className="scene-captions" ref={captionWrap}>
    <div className="scene-copy first opening-copy" data-composition="opening"><p className="eyebrow">OBRAS E REMODELAÇÕES EM AVEIRO</p><SceneTitle opening lead="Uma nova vida" accent="para a sua casa."/><p className="opening-description">Chave na mão. Orçamento fechado. <br/>Prazo em contrato e garantia escrita.</p><Link href="/#hero-form" className="pill cream">Pedir orçamento <ArrowUpRight size={16}/></Link><button className="opening-secondary" onClick={()=>jump(.10)}>Entre. A transformação começa aqui. <ArrowDown size={13}/></button></div>
    <div className="scene-copy" data-composition="build"><p className="eyebrow">01 / COZINHA — A TRANSFORMAÇÃO</p><SceneTitle lead="A sua ideia." accent="Ganha forma."/><p>Da primeira medida ao último acabamento.</p></div>
    <div className="scene-copy" data-composition="reveal"><p className="eyebrow">01 / COZINHA — UMA NOVA VIDA</p><SceneTitle lead="Outra luz." accent="Mais vida."/><p>O mesmo lugar. Uma nova forma de o viver.</p></div>
    <div className="scene-copy passage-copy" data-composition="passage"><p className="eyebrow">A CASA CONTINUA</p><SceneTitle lead="De espaço" accent="em espaço."/><p>O cuidado acompanha-nos.</p></div>
    <div className="scene-copy" data-composition="before"><p className="eyebrow">02 / CASA DE BANHO — O COMEÇO</p><SceneTitle lead="Aqui começa" accent="a mudança."/><p>Veja o que este espaço pode ser.</p></div>
    <div className="scene-copy" data-composition="build"><p className="eyebrow">02 / CASA DE BANHO — A TRANSFORMAÇÃO</p><SceneTitle lead="Por dentro." accent="Ao pormenor."/><p>Preparar bem. Para durar.</p></div>
    <div className="scene-copy detail-copy" data-composition="cut"><p className="eyebrow">O GESTO / 01 — CORTAR</p><SceneTitle lead="Precisão." accent="À sua medida."/><p>O corte certo dá forma ao seu espaço.</p></div>
    <div className="scene-copy detail-copy" data-composition="mortar"><p className="eyebrow">O GESTO / 02 — PREPARAR</p><SceneTitle lead="Uma boa base." accent="Em cada gesto."/><p>A massa. Os sulcos. O cuidado antes da peça.</p></div>
    <div className="scene-copy detail-copy" data-composition="tile"><p className="eyebrow">O GESTO / 03 — ASSENTAR</p><SceneTitle lead="Cada peça." accent="No seu lugar."/><p>Encaixar. Alinhar. Completar.</p></div>
    <div className="scene-copy" data-composition="finish"><p className="eyebrow">02 / CASA DE BANHO — ACABAR</p><SceneTitle lead="O detalhe" accent="faz a diferença."/><p>Até estar tudo no seu lugar.</p></div>
    <div className="scene-copy" data-composition="closing"><p className="eyebrow">02 / CASA DE BANHO — DEPOIS</p><SceneTitle lead="O seu refúgio." accent="Todos os dias."/><p>Conforto que se sente. Cuidado que se vê.</p><Link className="pill cream" href="/#hero-form">Vamos transformar a sua casa <ArrowUpRight size={16}/></Link></div>
   </div>
   <div className="journey-bottom"><button className="scroll-cue" onClick={()=>stage===stages.length-1?document.getElementById('remodelacao')?.scrollIntoView({behavior:'smooth'}):jump([.09,.20,.34,.42,.55,.68,.735,.815,.905,.965,.995][stage])}><span className="scroll-icon"><ArrowDown size={14}/></span><span>{stage===0?"FAÇA SCROLL. VEJA A MUDANÇA.":stages[stage].toUpperCase()}</span></button><div className="room-nav"><button onClick={()=>jump(0)} aria-current={stage<5?"step":undefined}>01 <span>Cozinha</span></button><i/><button onClick={()=>jump(.68)} aria-current={stage>=6?"step":undefined}>02 <span>Casa de banho</span></button></div><a href="#remodelacao" className="skip">Saltar experiência <ArrowDown size={13}/></a></div>
   <span className="journey-concept">VISUALIZAÇÃO CONCEPTUAL</span>
   <div className="journey-progress"><span ref={progress}/></div>
  </div>
 </section>;
}


export default function CapaExperience(){
 const [reduced,setReduced]=useState(false);
 useEffect(()=>{
  const query=window.matchMedia("(prefers-reduced-motion: reduce)");
  const update=()=>setReduced(query.matches);
  const frame=requestAnimationFrame(update);
  query.addEventListener("change",update);
  return()=>{cancelAnimationFrame(frame);query.removeEventListener("change",update);};
 },[]);
 return <div className="capa-experience" data-motion={reduced?"reduced":"full"}>
  <a href="#remodelacao" className="skip-link">Saltar experiência animada</a>
  <Hero reduced={reduced}/>
  <BathroomCutaway asset={asset} reduced={reduced}/>
  <KitchenReveal asset={asset} reduced={reduced}/>
  <ProjectShowcase asset={asset} reduced={reduced}/>
  <section className="capa-end" aria-label="Continuar a conhecer a Freitas">
   <p className="eyebrow">AVEIRO E CONCELHOS VIZINHOS</p>
   <h2>Da inspiração<br/><em>à sua obra.</em></h2>
   <div><Link href="/#hero-form" className="pill forest">Pedir orçamento <ArrowUpRight size={16}/></Link><Link href="/" className="pill cream">Ver serviços e obras <ArrowUpRight size={16}/></Link></div>
   <button type="button" onClick={()=>setReduced(!reduced)}>{reduced?"Ativar animações":"Reduzir movimento"}</button>
  </section>
 </div>;
}
