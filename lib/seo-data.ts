// ============================================================
// lib/seo-data.ts — Programmatic SEO templates
// ============================================================

import { Service, Parish, CONTRACTOR_INFO } from "./constants";

export interface PageSEO {
  title: string;
  description: string;
  h1: string;
  intro: string;
  faq: { question: string; answer: string }[];
}

export function generateServiceSEO(service: Service): PageSEO {
  return {
    title: `${service.title} em Aveiro | Freitas Renovações LDA`,
    description: `Serviço profissional de ${service.title.toLowerCase()} em Aveiro. Preços justos, orçamento gratuito e resposta até 12h. Empreiteiro Jorge Freitas. ☎ ${CONTRACTOR_INFO.phoneDisplay}`,
    h1: `${service.title} em Aveiro — Freitas Renovações`,
    intro: `A Freitas Renovações LDA oferece serviços profissionais de ${service.title.toLowerCase()} em Aveiro e toda a região. ${service.longDescription}`,
    faq: [
      {
        question: `Quanto custa ${service.title.toLowerCase()} em Aveiro?`,
        answer: `O custo varia consoante a dimensão e especificidades do trabalho. Apresentamos orçamentos transparentes com preços justos e sem compromisso. Contacte-nos pelo ${CONTRACTOR_INFO.phoneDisplay}.`,
      },
      {
        question: `Qual o prazo para ${service.title.toLowerCase()} em Aveiro?`,
        answer: `Após aprovação do orçamento, apresentamos um plano de trabalho com prazos acordados. Resposta ao pedido de orçamento até 12h.`,
      },
      {
        question: `A Freitas Renovações tem seguro e alvará para ${service.title.toLowerCase()}?`,
        answer: `Sim. A Freitas Renovações LDA possui Alvará de Construção válido e seguro de responsabilidade civil. Todos os trabalhos são executados com total transparência e garantia.`,
      },
    ],
  };
}

export function generateParishSEO(parish: Parish, service?: Service): PageSEO {
  const serviceName = service ? service.title.toLowerCase() : "obras e remodelações";
  const serviceTitle = service ? service.title : "Obras e Remodelações";

  return {
    title: `${serviceTitle} em ${parish.name} (Aveiro) | Freitas Renovações LDA`,
    description: `Serviço profissional de ${serviceName} em ${parish.name}, Aveiro. Preços justos, empresa licenciada e resposta até 12h. Orçamento grátis. ☎ ${CONTRACTOR_INFO.phoneDisplay}`,
    h1: `${serviceTitle} em ${parish.name}, Aveiro`,
    intro: `A Freitas Renovações LDA presta serviços de ${serviceName} em ${parish.fullName}, Aveiro. ${parish.description}. A nossa equipa local oferece um serviço personalizado, rápido, com preços justos e qualidade garantida.`,
    faq: [
      {
        question: `Existe serviço de obras / canalização em ${parish.name} (Aveiro)?`,
        answer: `Sim! A Freitas Renovações LDA atua em ${parish.name} e em todo o município de Aveiro. Garantimos resposta rápida até 12h.`,
      },
      {
        question: `Como obter orçamento para obras em ${parish.name}?`,
        answer: `Basta ligar para o ${CONTRACTOR_INFO.phoneDisplay} ou preencher o formulário nesta página. Apresentamos um orçamento gratuito com preços justos e transparentes.`,
      },
      {
        question: `A Freitas Renovações trabalha em ${parish.name}?`,
        answer: `Sim, cobrimos toda a área de ${parish.fullName} e arredores. ${parish.description}. Já realizámos diversas obras nesta freguesia com elevado nível de satisfação.`,
      },
    ],
  };
}
