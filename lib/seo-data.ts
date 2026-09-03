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
    title: `${service.title} em Aveiro — Preço Justo | Freitas Renovações LDA`,
    description: `${service.title} em Aveiro com preços justos e orçamento gratuito. Empresa licenciada IMPIC. Empreiteiro Jorge Freitas. Resposta até 12h. ☎ ${CONTRACTOR_INFO.phoneDisplay}. ⭐ 4.9/5 Google.`,
    h1: `${service.title} em Aveiro — Preços Justos, Empresa Licenciada`,
    intro: `A Freitas Renovações LDA oferece serviços profissionais de ${service.title.toLowerCase()} em Aveiro e toda a região. ${service.longDescription} Empresa licenciada IMPIC com +100 obras concluídas, preços justos e garantia em todos os trabalhos.`,
    faq: [
      {
        question: `Quanto custa ${service.title.toLowerCase()} em Aveiro?`,
        answer: `O custo varia consoante a dimensão, tipo de materiais e especificidades de cada trabalho. A Freitas Renovações LDA apresenta orçamentos transparentes com preços justos e sem compromisso, discriminados por materiais e mão de obra. Contacte-nos pelo ${CONTRACTOR_INFO.phoneDisplay} ou preencha o formulário para receber um orçamento gratuito.`,
      },
      {
        question: `Qual o prazo para ${service.title.toLowerCase()} em Aveiro?`,
        answer: `Após aprovação do orçamento, apresentamos um plano de trabalho com prazos acordados e cumpridos rigorosamente. O empreiteiro Jorge Freitas garante resposta ao pedido de orçamento no prazo máximo de 12 horas.`,
      },
      {
        question: `A Freitas Renovações tem seguro e alvará para ${service.title.toLowerCase()}?`,
        answer: `Sim. A Freitas Renovações LDA possui Alvará de Construção válido emitido pelo IMPIC e seguro de responsabilidade civil. Todos os trabalhos de ${service.title.toLowerCase()} em Aveiro são executados com total transparência e com garantia formalizada por escrito.`,
      },
      {
        question: `A Freitas Renovações trabalha em urgências de ${service.title.toLowerCase()}?`,
        answer: `${service.emergencyAvailable ? `Sim! Para situações urgentes de ${service.title.toLowerCase()} em Aveiro, a equipa do Jorge Freitas garante atendimento prioritário. Ligue já para ${CONTRACTOR_INFO.phoneDisplay}.` : `Para trabalhos de ${service.title.toLowerCase()} planeados, contacte-nos pelo ${CONTRACTOR_INFO.phoneDisplay} para agendar uma visita e orçamento gratuito.`}`,
      },
      {
        question: `A Freitas Renovações faz ${service.title.toLowerCase()} em todas as freguesias de Aveiro?`,
        answer: `Sim, cobrimos todo o município de Aveiro, incluindo Glória e Vera Cruz, Esgueira, Aradas, Cácia, São Bernardo, Santa Joana, Oliveirinha e todas as freguesias circundantes. Contacte-nos para confirmar disponibilidade na sua área.`,
      },
    ],
  };
}

export function generateParishSEO(parish: Parish, service?: Service): PageSEO {
  const serviceName = service ? service.title.toLowerCase() : "obras e remodelações";
  const serviceTitle = service ? service.title : "Obras e Remodelações";

  return {
    title: `${serviceTitle} em ${parish.name}, Aveiro — Preço Justo | Freitas Renovações LDA`,
    description: `Serviço profissional de ${serviceName} em ${parish.name}, Aveiro. Empresa licenciada IMPIC, preços justos, resposta até 12h. Empreiteiro Jorge Freitas. Orçamento grátis. ☎ ${CONTRACTOR_INFO.phoneDisplay}`,
    h1: `${serviceTitle} em ${parish.name}, Aveiro — Empresa Licenciada, Preços Justos`,
    intro: `A Freitas Renovações LDA presta serviços de ${serviceName} em ${parish.fullName}, Aveiro. ${parish.description}. A nossa equipa local, liderada pelo Empreiteiro Jorge Freitas, oferece um serviço personalizado, rápido, com orçamentos transparentes e preços justos. Empresa licenciada IMPIC com +100 obras concluídas em Aveiro.`,
    faq: [
      {
        question: `Existe serviço de ${serviceName} em ${parish.name} (Aveiro)?`,
        answer: `Sim! A Freitas Renovações LDA atua regularmente em ${parish.name} e em todo o município de Aveiro. Garantimos resposta rápida até 12h e orçamento gratuito para qualquer trabalho de ${serviceName}.`,
      },
      {
        question: `Como obter orçamento para ${serviceName} em ${parish.name}?`,
        answer: `Basta ligar para o ${CONTRACTOR_INFO.phoneDisplay} ou preencher o formulário de orçamento nesta página. Apresentamos um orçamento gratuito, detalhado, com preços justos e transparentes, sem compromisso.`,
      },
      {
        question: `A Freitas Renovações é uma empresa licenciada a trabalhar em ${parish.name}?`,
        answer: `Sim. A Freitas Renovações LDA possui Alvará de Construção válido emitido pelo IMPIC e seguro de responsabilidade civil. Cobrimos toda a área de ${parish.fullName}. ${parish.description}. Já realizamos diversas obras nesta freguesia com elevado nível de satisfação dos clientes.`,
      },
      {
        question: `Qual o prazo de resposta para obras em ${parish.name}?`,
        answer: `Garantimos resposta em até 12 horas a todos os pedidos de orçamento em ${parish.name} e restantes freguesias do município de Aveiro. O empreiteiro Jorge Freitas acompanha pessoalmente todos os trabalhos.`,
      },
    ],
  };
}
