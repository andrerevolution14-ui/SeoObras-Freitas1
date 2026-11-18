import { pageMetadata } from "@/lib/metadata";
import CapaExperience from "@/components/capa/Experience";
import "./capa.css";

export const metadata = pageMetadata({
 title: "A Empresa: Remodelações em Aveiro | Freitas Renovações",
 description: "Conheça a Freitas Renovações em Aveiro. Explore cozinhas, casas de banho e cada fase de uma remodelação. Peça o seu orçamento gratuito.",
 path: "/capa", image: "/og/capa.jpg",
});

export default function CapaPage(){
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
   "@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[
    {"@type":"ListItem",position:1,name:"Início",item:"https://www.grupofreitasrenovacoes.pt/"},
    {"@type":"ListItem",position:2,name:"A Empresa",item:"https://www.grupofreitasrenovacoes.pt/capa"}
   ]
  })}}/>
  <CapaExperience/>
  <noscript><style>{`.capa-experience .scroll-hero{height:100svh}.capa-experience .scroll-cue,.capa-experience .journey-chapters{display:none}.capa-experience .projects-journey{height:auto}.capa-experience .projects-stage{position:relative;height:auto}.capa-experience .projects-track{display:block;transform:none}.capa-experience .project-panel{position:relative;min-height:70svh;opacity:1;visibility:visible}.capa-experience .projects-controls{display:none}`}</style></noscript>
 </>;
}
