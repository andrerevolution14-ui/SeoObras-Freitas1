"use client";

import Link from "next/link";
import {ArrowDown, ArrowUpRight} from "lucide-react";
import AmbientFilm from "./AmbientFilm";

const media="/capa-media/4083ece1d08f/";

export default function VideoHero({reduced}:{reduced:boolean}) {
 return <section className="film-hero" id="inicio" data-header="light" aria-label="Uma nova vida para a sua casa">
  <span id="experiencia" className="journey-anchor"/>
  <picture className="film-poster">
   <source media="(max-width:700px) and (orientation:portrait)" srcSet={`${media}mobile-native-v1/${reduced?"after":"poster"}.webp`}/>
   <img src={`${media}kitchen-${reduced?"after":"before"}.webp`} width="1672" height="941" fetchPriority="high" alt="Visualização conceptual de uma cozinha antes e depois da remodelação"/>
  </picture>
  <AmbientFilm desktop={`${media}films-v1/hero-desktop.mp4`} mobile={`${media}films-v1/hero-mobile.mp4`} enabled={!reduced}
   label="Filme conceptual da remodelação de uma cozinha e casa de banho, com pormenores de corte e assentamento de cerâmica"/>
  <div className="film-shade" aria-hidden="true"/>
  <div className="film-hero-copy">
   <p className="eyebrow">OBRAS E REMODELAÇÕES EM AVEIRO</p>
   <h1><span>Uma nova vida</span><em>para a sua casa.</em></h1>
   <p className="film-description">Chave na mão. Orçamento fechado.<br/>Prazo em contrato e garantia escrita.</p>
   <Link href="/#hero-form" className="pill cream">Pedir orçamento <ArrowUpRight size={17}/></Link>
  </div>
  <a className="film-discover" href="#remodelacao"><ArrowDown size={16}/><span>Continuar a descobrir</span></a>
  <span className="film-concept">VISUALIZAÇÃO CONCEPTUAL</span>
 </section>;
}
