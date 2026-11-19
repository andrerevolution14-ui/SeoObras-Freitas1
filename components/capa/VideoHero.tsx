"use client";

import Link from "next/link";
import {useState} from "react";
import {ArrowDown, ArrowUpRight} from "lucide-react";
import IntroFilm from "./IntroFilm";
import {filmCopy} from "./FilmCopy";

const media="/capa-media/4083ece1d08f/";

export default function VideoHero({reduced}:{reduced:boolean}) {
 const [chapter,setChapter] = useState(0);
 const active = reduced ? 0 : chapter;
 return <section className="film-hero" data-copy={filmCopy[active].id} id="inicio" data-header="light" aria-label="Uma nova vida para a sua casa">
  <span id="experiencia" className="journey-anchor"/>
  <picture className="film-poster">
   <source media="(max-width:700px) and (orientation:portrait)" srcSet={`${media}mobile-native-v1/${reduced?"after":"poster"}.webp`}/>
   <img src={`${media}kitchen-${reduced?"after":"before"}.webp`} width="1672" height="941" fetchPriority="high" alt="Visualização conceptual de uma cozinha antes e depois da remodelação"/>
  </picture>
  {!reduced&&<IntroFilm desktop={`${media}films-v2/hero-desktop.mp4`} mobile={`${media}films-v2/hero-mobile.mp4`} onChapterChange={setChapter}/>}
  <div className="film-shade" aria-hidden="true"/>
  <div className="film-hero-copy">
   <div className="film-copy-stack">
    {filmCopy.map((copy,index) => {
     const Heading = index === 0 ? "h1" : "h2";
     return <div key={copy.id} className="film-copy-panel" data-active={index === active} aria-hidden={index !== active}>
      <p className="eyebrow">{copy.eyebrow}</p>
      <Heading className="film-copy-title"><span>{copy.title}</span><em>{copy.accent}</em></Heading>
      <p className="film-description"><span>{copy.body[0]}</span><span>{copy.body[1]}</span></p>
     </div>;
    })}
   </div>
   <Link href="/#hero-form" className="pill cream">Pedir orçamento <ArrowUpRight size={17}/></Link>
  </div>
  {reduced&&<a className="film-discover" href="#remodelacao"><ArrowDown size={16}/><span>Continuar a descobrir</span></a>}
  <span className="film-concept">VISUALIZAÇÃO CONCEPTUAL</span>
 </section>;
}
