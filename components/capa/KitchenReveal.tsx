/* eslint-disable @next/next/no-img-element -- Static, pre-sized posters remain visible until native video playback. */
"use client";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import AmbientFilm from "./AmbientFilm";

export default function KitchenReveal({asset,reduced}:{asset:(path:string)=>string,reduced:boolean}){
 return <section id="cozinha" className={`kitchen-reveal kitchen-assembly kitchen-reveal--film ${reduced?"is-reduced":""}`} data-header="light" aria-labelledby="kitchen-reveal-title">
  <div className="kitchen-reveal-stage">
   <img width="1280" height="720" className="kitchen-reveal-ambient" src={asset("/media/assembly-after.webp")} alt="" loading="lazy" decoding="async"/>
   <div className="kitchen-reveal-shade" aria-hidden="true"/>
   <div className="kitchen-reveal-content">
    <div className="kitchen-reveal-copy">
     <p className="eyebrow"><span/> COZINHAS · TUDO NO SEU LUGAR</p>
     <h2 id="kitchen-reveal-title"><span>Cada cozinha</span><span>tem um <em className="kitchen-word-before">antes.</em></span><span>Nós criamos{" "}</span><span>o <em className="kitchen-word-after">depois.</em></span></h2>
     <p className="kitchen-reveal-description">Móveis, materiais e luz.<br/>Tudo encontra o seu lugar.</p>
     <Link className="kitchen-reveal-cta" href="/#hero-form">Vamos imaginar a sua <ArrowUpRight size={17}/></Link>
    </div>
    <figure className="kitchen-portal">
     <div className="kitchen-portal-shell">
      <div className="kitchen-portal-frame">
       <div className="kitchen-portal-window">
        <img className="kitchen-portal-poster" src={asset(`/media/assembly-${reduced?"after":"before"}.webp`)} width="1280" height="720" alt="Visualização conceptual da montagem de uma cozinha com móveis verde-azeitona e armários em nogueira" loading="lazy" decoding="async"/>
        <AmbientFilm desktop={asset("/media/films-v1/kitchen-assembly.mp4")} enabled={!reduced} loop={false} label="Montagem de uma cozinha, do espaço vazio aos móveis e acabamentos completos"/>
       </div>
      </div>
      <span className="kitchen-portal-reflection" aria-hidden="true"/>
     </div>
     <figcaption>VISUALIZAÇÃO CONCEPTUAL <span>Uma possibilidade para a sua cozinha.</span></figcaption>
    </figure>
   </div>
  </div>
 </section>;
}
