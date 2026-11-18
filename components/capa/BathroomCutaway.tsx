"use client";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

const phases=[
 {title:"Antes da obra",body:"O espaço de partida, com as marcas do tempo e novas possibilidades por descobrir.",x:27,y:60,alt:"Casa de banho antiga com lavatório de coluna, azulejos pequenos e loiças gastas"},
 {title:"Demolição e preparação",body:"Retiramos os revestimentos e as loiças antigas. Protegemos o acesso e encaminhamos o entulho.",x:55,y:77,alt:"Remoção dos revestimentos e loiças, com tijolo exposto e fragmentos de cerâmica no chão"},
 {title:"A divisão em bruto",body:"Com o espaço desimpedido, avaliamos as bases e preparamos a próxima fase da remodelação.",x:53,y:53,alt:"Divisão vazia com alvenaria e pavimento em bruto, limpa após a demolição"},
 {title:"As novas instalações",body:"Canalização, esgotos, eletricidade e isolamento. O cuidado começa no que vai ficar por dentro.",x:65,y:59,alt:"Novas tubagens de água e esgoto, condutas elétricas, estrutura de autoclismo e isolamento visíveis"},
 {title:"Proteger antes de revestir",body:"Regularizamos as superfícies e impermeabilizamos as zonas de água, incluindo cantos e ligações.",x:65,y:72,alt:"Placas de suporte e impermeabilização na área do duche, com juntas protegidas"},
 {title:"Assentar, peça a peça",body:"Cerâmica alinhada, peças niveladas e cortes ajustados. Cada junta faz parte do resultado.",x:82,y:43,alt:"Assentamento parcial de cerâmica com cola penteada, niveladores e peças alinhadas"},
 {title:"O acabamento ganha forma",body:"Revestimentos concluídos, juntas tratadas e pontos preparados para receber os equipamentos.",x:72,y:39,alt:"Revestimentos de pedra clara concluídos, nicho iluminado e ligações prontas para as loiças"},
 {title:"Pronta para viver",body:"Loiças, móvel, vidro e iluminação no lugar. Verificação final, limpeza e entrega da obra.",x:35,y:64,alt:"Casa de banho concluída com móvel de carvalho, espelho iluminado, duche em vidro e sanita suspensa"}
];
const clamp=(n:number)=>Math.max(0,Math.min(1,n));

export default function BathroomCutaway({asset,reduced}:{asset:(path:string)=>string,reduced:boolean}){
 const root=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null),selectPhase=useRef<(n:number)=>void>(()=>{});
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const el=root.current,frame=stage.current;if(!el||!frame)return;
  let top=0,travel=0,visible=false,raf=0,dead=false,chosen=reduced?7:0,manual=false,lastY=window.scrollY;
  const apply=(n:number)=>{const next=Math.max(0,Math.min(7,n));chosen=next;el.dataset.phase=String(next+1);el.style.setProperty("--build-progress",String(next/7));setActive(next);};
  const update=()=>{
   raf=0;if(dead||!visible||document.hidden||reduced||travel<20)return;
   // Layout anchoring can move the page when a caption changes. Only genuine
   // scroll input (or a substantial scrollbar move) releases a selected phase.
   if(manual&&Math.abs(window.scrollY-lastY)<80)return;
   manual=false;const p=clamp((window.scrollY-top)/travel);const next=Math.min(7,Math.floor(p*8));if(next!==chosen)apply(next);
  };
  const request=()=>{if(!raf&&!dead&&visible&&!document.hidden)raf=requestAnimationFrame(update);};
  const resume=()=>{manual=false;request();};
  const keyScroll=(event:KeyboardEvent)=>{if((event.target as HTMLElement)?.closest('input,select,textarea,button'))return;if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))resume();};
  const resize=()=>{top=el.getBoundingClientRect().top+window.scrollY-Math.min(0,parseFloat(getComputedStyle(frame).top)||0);travel=Math.max(0,el.offsetHeight-frame.offsetHeight);request();};
  selectPhase.current=(n:number)=>{manual=true;lastY=window.scrollY;apply(n);};
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else request();};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)resize();else{cancelAnimationFrame(raf);raf=0;}},{rootMargin:"100px"});observer.observe(el);
  const sizing=new ResizeObserver(resize);sizing.observe(el);sizing.observe(frame);
  apply(chosen);resize();window.addEventListener("scroll",request,{passive:true});window.addEventListener("wheel",resume,{passive:true});window.addEventListener("touchmove",resume,{passive:true});window.addEventListener("keydown",keyScroll);window.addEventListener("resize",resize);document.addEventListener("visibilitychange",visibility);
  return()=>{dead=true;cancelAnimationFrame(raf);observer.disconnect();sizing.disconnect();window.removeEventListener("scroll",request);window.removeEventListener("wheel",resume);window.removeEventListener("touchmove",resume);window.removeEventListener("keydown",keyScroll);window.removeEventListener("resize",resize);document.removeEventListener("visibilitychange",visibility);selectPhase.current=()=>{};};
 },[reduced]);
 const phase=phases[active];
 const choose=(i:number)=>selectPhase.current(i);
 return <section ref={root} id="remodelacao" className={`bath-build ${reduced?"is-reduced":""}`} data-header="dark" aria-labelledby="cutaway-title">
  <div ref={stage} className="bath-build-stage"><div className="bath-build-inner">
   <div className="build-copy">
    <p className="eyebrow">REMODELAÇÃO CHAVE NA MÃO</p>
    <h2 id="cutaway-title">Tudo o que a sua<br/>remodelação<br/><em>precisa.</em></h2>
    <p className="build-intro">Do esgoto ao espelho — uma só equipa,<br className="build-desktop-break"/> um só responsável, fase a fase.</p>
    <div className="build-counter" aria-label={`Fase ${active+1} de 8`}><strong>{String(active+1).padStart(2,"0")}</strong><span>/ 08</span></div>
    <div className="build-phase-buttons" role="group" aria-label="Escolher uma fase da remodelação">{phases.map((p,i)=><button key={p.title} type="button" onClick={()=>choose(i)} aria-pressed={active===i} aria-label={`Fase ${i+1}: ${p.title}`} aria-controls="build-phase-description"><span>{String(i+1).padStart(2,"0")}</span></button>)}</div>
    <Link href="/#hero-form" className="build-cta">Pedir orçamento gratuito <ArrowUpRight size={17}/></Link>
    <p className="build-scroll-note">FAÇA SCROLL PARA ACOMPANHAR A OBRA</p>
   </div>
   <figure className="build-figure">
    <div className="build-model" role="img" aria-label={phase.alt}>
     {phases.map((p,i)=><picture key={p.title} className={`build-layer ${i===active?"is-active":""}`} aria-hidden="true"><source media="(max-width:700px)" srcSet={asset(`/media/bath-build-handset/${String(i).padStart(2,"0")}.webp`)}/><img src={asset(`/media/bath-build/${String(i).padStart(2,"0")}.webp`)} width="1159" height="1358" alt="" loading="lazy" decoding="async"/></picture>)}
     <span className={`build-pin ${active===7?"is-complete":""}`} style={{left:`${phase.x}%`,top:`${phase.y}%`}} aria-hidden="true"><i/></span>
    </div>
    <figcaption id="build-phase-description" className={`build-phase-card ${active===7?"is-complete":""}`}>
     <p className="build-phase-label">{active===7?"OBRA ENTREGUE":`FASE ${String(active+1).padStart(2,"0")} DE 08`}</p>
     <h3>{phase.title}</h3><p className="build-phase-body">{phase.body}</p>
    </figcaption>
    <div className="build-mobile-nav">
     <button type="button" onClick={()=>choose(active-1)} disabled={active===0} aria-label="Fase anterior"><ArrowLeft size={17}/></button>
     <label><span className="sr-only">Escolher fase da remodelação</span><select aria-label="Escolher fase da remodelação" value={active} onChange={e=>choose(Number(e.target.value))}>{phases.map((p,i)=><option key={p.title} value={i}>{String(i+1).padStart(2,"0")} / 08 · {p.title}</option>)}</select></label>
     <button type="button" onClick={()=>choose(active+1)} disabled={active===7} aria-label="Fase seguinte"><ArrowRight size={17}/></button>
    </div>
    <Link href="/#hero-form" className="build-mobile-cta">Pedir orçamento gratuito <ArrowUpRight size={15}/></Link>
    <p className="build-concept">VISUALIZAÇÃO CONCEPTUAL DA REMODELAÇÃO</p>
   </figure>
  </div></div>
 </section>;
}
