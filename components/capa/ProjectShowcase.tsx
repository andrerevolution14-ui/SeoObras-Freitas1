"use client";
import Link from "next/link";

import {useEffect,useRef,useState} from "react";
import {ArrowDown,ArrowUpRight,X} from "lucide-react";
import {projects} from "./ProjectsData";
import {projectVisuals} from "./ProjectVisuals";

const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const ease=(n:number)=>{const t=clamp(n);return t*t*(3-2*t);};

export default function ProjectShowcase({asset,reduced}:{asset:(path:string)=>string,reduced:boolean}){
 const journey=useRef<HTMLDivElement>(null),stage=useRef<HTMLDivElement>(null),select=useRef<(index:number)=>void>(()=>{});
 const [active,setActive]=useState(0),[short,setShort]=useState(false),[evidence,setEvidence]=useState<number|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(evidence!==null&&!dialog.current?.open)dialog.current?.showModal();},[evidence]);
 const staticMode=reduced||short;
 useEffect(()=>{const query=window.matchMedia("(max-height:700px)");const update=()=>setShort(query.matches);update();query.addEventListener("change",update);return()=>query.removeEventListener("change",update);},[]);
 useEffect(()=>{
  const el=journey.current,frame=stage.current;if(!el||!frame)return;
  let top=0,travel=0,raf=0,visible=false,dead=false,current=0,target=0,selected=0,lastTime=0;
  const render=(position:number)=>{
   el.style.setProperty("--project-position",String(position));
   frame.querySelectorAll<HTMLElement>(".project-panel").forEach((panel,i)=>panel.style.setProperty("--panel-distance",String(Math.min(1,Math.abs(position-i)))));
   const index=Math.max(0,Math.min(3,Math.round(position)));
   if(index!==selected){selected=index;setActive(index);}
   el.dataset.project=String(index+1);
  };
  const read=()=>{
   const step=clamp((window.scrollY-top)/Math.max(1,travel))*4;
   const index=Math.min(3,Math.floor(step));
   target=index+((index===3)?0:ease((step-index-.54)/.46));
  };
  const tick=(time:number)=>{
   raf=0;if(dead||!visible||document.hidden||staticMode)return;
   const dt=Math.min(50,lastTime?time-lastTime:16.67);lastTime=time;
   current+=(target-current)*(1-Math.exp(-dt/95));
   if(Math.abs(current-target)<.001)current=target;
   render(current);if(current!==target)raf=requestAnimationFrame(tick);
  };
  const request=()=>{if(!raf&&!dead&&visible&&!document.hidden&&!staticMode)raf=requestAnimationFrame(tick);};
  const onScroll=()=>{read();request();};
  const resize=()=>{top=el.getBoundingClientRect().top+window.scrollY;travel=Math.max(0,el.offsetHeight-frame.offsetHeight);read();request();};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){read();current=target;render(current);request();}else{cancelAnimationFrame(raf);raf=0;lastTime=0;}},{rootMargin:"100px"});
  observer.observe(el);const sizing=new ResizeObserver(resize);sizing.observe(el);sizing.observe(frame);
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else{lastTime=0;onScroll();}};
  select.current=(index:number)=>{if(!staticMode){window.scrollTo({top:top+travel*(index+.22)/4,behavior:"smooth"});}};
  current=0;render(0);setActive(0);resize();
  window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",resize);document.addEventListener("visibilitychange",visibility);
  return()=>{dead=true;cancelAnimationFrame(raf);observer.disconnect();sizing.disconnect();window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",resize);document.removeEventListener("visibilitychange",visibility);select.current=()=>{};};
 },[staticMode]);
 const proof=evidence===null?null:projects[evidence];
 return <section id="projetos" className={`project-showcase ${staticMode?"is-static":""}`} aria-label="Projetos de renovação">
  <div ref={journey} className="projects-journey" data-header="light" data-project="1">
   <div ref={stage} className="projects-stage">
    <div className="projects-topline"><span>FREITAS · EM CADA DETALHE</span><span>{String(active+1).padStart(2,"0")} / 04</span></div>
    <div className="projects-track">{projects.map((project,i)=>{const visual=projectVisuals[i];return <article key={project.number} className="project-panel" aria-label={`${project.number}: ${visual.category}`} aria-hidden={!staticMode&&active!==i} inert={!staticMode&&active!==i}>
     <picture className="project-photo"><source media="(max-width:700px)" srcSet={asset(visual.handset)}/><img src={asset(visual.image)} alt={visual.alt} width="1536" height="1024" loading="lazy" decoding="async"/></picture>
     <div className="project-shade" aria-hidden="true"/>
     <div className="project-caption"><span className="project-number" aria-hidden="true">{project.number}</span><p className="project-meta">{visual.category}</p><h2><span>{visual.lead}</span><span>{visual.accent}</span></h2><p className="project-description">{visual.description}</p><button type="button" className="project-cta" onClick={()=>setEvidence(i)}>Ver uma obra realizada <ArrowUpRight size={15}/></button></div>
     <span className="project-image-note">Imagem ilustrativa</span>
    </article>;})}</div>
    <div className="projects-controls"><span className="projects-scroll-cue"><ArrowDown size={14}/> CONTINUE A DESCOBRIR</span><div className="projects-nav" role="group" aria-label="Escolher capítulo">{projects.map((project,i)=><button key={project.number} type="button" aria-label={`Ver capítulo ${i+1}: ${project.label}`} aria-pressed={active===i} onClick={()=>select.current(i)}><span>{project.number}</span><small>{project.label}</small></button>)}</div><Link className="projects-skip" href="/#hero-form">Continuar <ArrowDown size={14}/></Link></div>
   </div>
  </div>
  <dialog ref={dialog} className="project-evidence" aria-labelledby="project-evidence-title" onClose={()=>setEvidence(null)} onClick={e=>{if(e.target===e.currentTarget)e.currentTarget.close();}}>
   {proof&&<div className="project-evidence-inner"><button className="project-evidence-close" type="button" aria-label="Fechar fotografias da obra" autoFocus onClick={()=>dialog.current?.close()}><X size={21}/></button><picture><source media="(max-width:700px)" srcSet={asset(proof.handset)}/><img src={asset(proof.image)} alt={proof.alt} width="1280" height="960" loading="lazy"/></picture><div className="project-evidence-copy"><p className="eyebrow">FOTOGRAFIAS DA OBRA · {proof.place} · {proof.year}</p><h3 id="project-evidence-title">{proof.title}</h3><p>{proof.description}</p><Link className="pill forest" href="/#hero-form" onClick={()=>dialog.current?.close()}>Pedir orçamento <ArrowUpRight size={16}/></Link><Link className="project-evidence-source" href="/projetos" target="_blank" rel="noopener noreferrer">Trabalho publicado pela Freitas Renovações <ArrowUpRight size={13}/></Link></div></div>}
  </dialog>
 </section>;
}
