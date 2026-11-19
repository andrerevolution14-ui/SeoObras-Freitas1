"use client";

import {useEffect, useRef, useState} from "react";
import {Pause, Play} from "lucide-react";

export default function AmbientFilm({desktop, mobile, label, enabled=true, loop=true, className=""}: {
 desktop:string; mobile?:string; label:string; enabled?:boolean; loop?:boolean; className?:string;
}) {
 const video=useRef<HTMLVideoElement>(null), manuallyPaused=useRef(false), visible=useRef(false);
 const [playing,setPlaying]=useState(false),[ready,setReady]=useState(false),[failed,setFailed]=useState(false);
 useEffect(()=>{
  const el=video.current;if(!enabled||!el)return;
  let dead=false;
  const portrait=window.matchMedia("(max-width:700px) and (orientation:portrait)");
  const resume=()=>{
   if(!visible.current||document.hidden||manuallyPaused.current){el.pause();return;}
   const src=portrait.matches&&mobile?mobile:desktop;
   // Attach only the selected film when visible. Never fetch both orientations.
   if(el.getAttribute("src")!==src){el.src=src;el.load();}
   el.muted=true;
   // A blocked autoplay remains a poster with an accessible play button.
   void el.play().catch(()=>{if(!dead)setPlaying(false);});
  };
  const observer=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting;resume();},{threshold:0.05});
  observer.observe(el);
  portrait.addEventListener("change",resume);
  document.addEventListener("visibilitychange",resume);
  return()=>{
   dead=true;observer.disconnect();portrait.removeEventListener("change",resume);document.removeEventListener("visibilitychange",resume);
   el.pause();el.removeAttribute("src");el.load();
  };
 },[desktop,mobile,enabled]);
 if(!enabled)return null;
 const toggle=()=>{
  const el=video.current;if(!el)return;
  if(el.paused){manuallyPaused.current=false;void el.play().catch(()=>setPlaying(false));}
  else{manuallyPaused.current=true;el.pause();}
 };
 return <>
  <video ref={video} className={`ambient-film ${className}`} muted playsInline loop={loop} preload="none" disablePictureInPicture
   aria-label={label} style={{opacity:ready?1:0}}
   onPlaying={()=>{setPlaying(true);setReady(true);setFailed(false);}}
   onPause={()=>setPlaying(false)} onError={()=>{setFailed(true);setReady(false);}}
   onEnded={()=>{manuallyPaused.current=true;setPlaying(false);}}/>
  {!failed&&<button className="film-toggle" type="button" onClick={toggle} aria-label={playing?"Pausar vídeo":"Reproduzir vídeo"} title={playing?"Pausar vídeo":"Reproduzir vídeo"}>
   {playing?<Pause size={17}/>:<Play size={17}/>}<span className="sr-only">{playing?"Pausar vídeo":"Reproduzir vídeo"}</span>
  </button>}
 </>;
}
