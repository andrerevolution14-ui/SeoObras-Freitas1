"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {ArrowUpRight} from "lucide-react";
import VideoHero from "./VideoHero";
import BathroomCutaway from "./BathroomCutaway";
import KitchenReveal from "./KitchenReveal";
import ProjectShowcase from "./ProjectShowcase";

const asset=(path:string):string => path.replace(/^\/media\//,"/capa-media/4083ece1d08f/");

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
  <a href="#remodelacao" className="skip-link">Passar ao conteúdo</a>
  <VideoHero reduced={reduced}/>
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
