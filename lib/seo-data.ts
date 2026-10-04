// ============================================================
// lib/seo-data.ts — Advanced Programmatic SEO & AEO Templates
// Optimized for Google, Perplexity AI, ChatGPT, Gemini & SGE
// ============================================================

import { Service, Parish, CONTRACTOR_INFO } from "./constants";

export interface PageSEO {
  title: string;
  description: string;
  h1: string;
  intro: string;
  directAnswer: string;
  pricingGuide: string;
  durationGuide: string;
  faq: { question: string; answer: string }[];
}

export function generateServiceSEO(service: Service): PageSEO {
  // Service-specific AEO & Pricing Data
  const serviceSpecifics: Record<
    string,
    {
      pricing: string;
      duration: string;
      directAnswer: string;
      customFaqs: { question: string; answer: string }[];
    }
  > = {
    "remodelacao-geral": {
      pricing: "De 350€/m² (remodelação parcial) a 750€-1.200€/m² (reabilitação profunda chave na mão)",
      duration: "3 a 8 semanas, consoante a área e complexidade",
      directAnswer:
        "A Freitas Renovações LDA é uma empresa licenciada com Alvará IMPIC e liderada pelo Empreiteiro Jorge Freitas. Oferece serviços completos de obras e remodelações chave na mão em Aveiro, cobrindo demolições, alvenarias, redes técnicas, pladur e acabamentos com preços justos, orçamento discriminado e resposta em menos de 12 horas.",
      customFaqs: [
        {
          question: "Quanto custa uma remodelação geral em Aveiro por m²?",
          answer:
            "Em Aveiro, o custo médio de uma remodelação geral varia entre 350€ e 600€ por m² para intervenções parciais de acabamentos e entre 750€ e 1.200€ por m² para remodelações totais com substituição de redes de água, eletricidade, esgotos, pavimentos e caixilharias. A Freitas Renovações LDA apresenta orçamento detalhado sem custos ocultos.",
        },
        {
          question: "O que inclui o serviço de obras chave na mão em Aveiro?",
          answer:
            "O serviço chave na mão da Freitas Renovações LDA inclui planeamento completo, demolição e remoção de entulhos para vazadouro licenciado, renovação de canalizações e rede elétrica, montagem de pladur e tetos falsos, revestimentos cerâmicos ou vinílicos, carpintarias, pintura final e garantia contratual por escrito com acompanhamento direto do Jorge Freitas.",
        },
      ],
    },
    "remodelacao-casas-de-banho": {
      pricing: "Entre 2.800€ e 4.800€ para uma casa de banho standard completa",
      duration: "5 a 8 dias úteis",
      directAnswer:
        "A remodelação de casas de banho em Aveiro pela Freitas Renovações LDA custa tipicamente entre 2.800€ e 4.800€ e demora entre 5 e 8 dias úteis. Inclui substituição de banheira por duche plano antiderrapante, nova tubagem multicamada sem juntas, impermeabilização bicomponente, cerâmica retificada e loiças sanitárias modernas.",
      customFaqs: [
        {
          question: "Quanto custa remodelar uma casa de banho em Aveiro?",
          answer:
            "A remodelação completa de um WC em Aveiro custa em média entre 2.800€ e 4.800€. O valor inclui demolição da banheira antiga, canalização nova em multicamada, impermeabilização com tela líquida, assentamento de azulejos, colocação de base de duche plana, resguardo em vidro temperado e torneiras economizadoras.",
        },
        {
          question: "Quanto tempo demora a trocar banheira por base de duche em Aveiro?",
          answer:
            "A substituição simples de banheira por base de duche é executada em 2 a 3 dias úteis. Uma remodelação completa da casa de banho (chão, paredes, canalizações e louças) fica concluída em 5 a 8 dias úteis.",
        },
      ],
    },
    "remodelacao-cozinhas": {
      pricing: "Entre 4.200€ e 9.500€ para cozinhas completas com móveis e bancada",
      duration: "2 a 3 semanas",
      directAnswer:
        "A remodelação de cozinhas em Aveiro com a Freitas Renovações LDA tem um custo médio entre 4.200€ e 9.500€, dependendo dos metros lineares de móveis e do material da bancada (quartzo, Dekton ou granito). Inclui nova canalização, reforço elétrico para eletrodomésticos, layout em open space e acabamentos higiénicos.",
      customFaqs: [
        {
          question: "Quanto custa remodelar uma cozinha em Aveiro?",
          answer:
            "O valor de remodelação de cozinha em Aveiro situa-se geralmente entre 4.200€ e 9.500€. Fatores decisivos incluem a escolha de móveis termolaminados por medida, bancadas em quartzo compacto (Silestone) ou granito e a criação de open space com derrube de paredes divisórias.",
        },
        {
          question: "A Freitas Renovações faz abertura de cozinhas em open space?",
          answer:
            "Sim. Analisamos previamente se as paredes são divisórias ou mestras estruturais, procedendo à demolição com colocação de vigamento de reforço se necessário, e unindo a cozinha à sala com continuidade estética no pavimento e iluminação.",
        },
      ],
    },
    "remodelacao-apartamentos": {
      pricing: "De 18.000€ a 45.000€ consoante tipologia (T1, T2, T3) e estado do imóvel",
      duration: "4 a 8 semanas",
      directAnswer:
        "A remodelação de apartamentos em Aveiro pela Freitas Renovações LDA é orientada para valorização do património e conforto acústico. Garantimos gestão completa de licenças e avisos ao condomínio, proteção de elevadores e zonas comuns, e horários rigorosos de ruído.",
      customFaqs: [
        {
          question: "Quanto custa remodelar um apartamento T2 ou T3 em Aveiro?",
          answer:
            "Em Aveiro, a remodelação integral de um apartamento T2 custa tipicamente entre 18.000€ e 28.000€, enquanto um apartamento T3 situa-se entre 28.000€ e 45.000€, englobando casa de banho, cozinha, redes técnicas, pavimentos flutuantes ou vinílicos e pintura geral.",
        },
        {
          question: "É preciso autorização do condomínio para obras em apartamentos em Aveiro?",
          answer:
            "Não é necessária votação para obras no interior da fração privativa, mas é obrigatório por lei afixar aviso prévio na entrada do prédio com a duração prevista e horários de ruído (dias úteis das 08h00 às 20h00). A nossa equipa cumpre todos os requisitos legais.",
        },
      ],
    },
    "remodelacao-moradias": {
      pricing: "Entre 400€ e 850€ por m² de área de intervenção",
      duration: "6 a 16 semanas",
      directAnswer:
        "A remodelação de moradias em Aveiro exige tratamento integrado de coberturas, fachadas com capoto térmico e reorganização interior. A Freitas Renovações LDA oferece experiência comprovada em vivendas unifamiliares em Esgueira, Aradas, São Bernardo e concelhos limítrofes.",
      customFaqs: [
        {
          question: "Quanto custa remodelar uma moradia completa em Aveiro?",
          answer:
            "A remodelação de uma moradia de 120m² a 160m² em Aveiro varia entre 45.000€ e 95.000€ para intervenções completas que incluem cobertura, fachadas térmicas, caixilharia de corte térmico e renovação integral dos espaços interiores.",
        },
      ],
    },
    "recuperacao-casas-velhas": {
      pricing: "Sob orçamento prévio com diagnóstico estrutural in loco",
      duration: "8 a 20 semanas",
      directAnswer:
        "A recuperação de casas velhas e edifícios históricos em Aveiro requer respeito pelas alvenarias tradicionais e combate às humidades da ria. A Freitas Renovações LDA reforça lajes de madeira, impermeabiliza fundações e moderniza todas as infraestruturas com apoio a benefícios fiscais à reabilitação.",
      customFaqs: [
        {
          question: "Como funciona a reabilitação de casas antigas em Aveiro?",
          answer:
            "Iniciamos com vistoria técnica detalhada do Empreiteiro Jorge Freitas para avaliar a estabilidade de paredes mestras e madeiras de cobertura. Em seguida, tratamos patologias de humidade e térmitas, renovamos instalações técnicas e preservamos traços estéticos de valor histórico.",
        },
      ],
    },
    "pintura-capoto": {
      pricing: "Capoto ETICS: 38€ a 55€/m² | Pintura de fachadas: 14€ a 22€/m² | Pintura interior: 7€ a 13€/m²",
      duration: "1 a 3 semanas",
      directAnswer:
        "A aplicação de capoto ETICS em Aveiro pela Freitas Renovações LDA custa entre 38€ e 55€/m², permitindo poupanças energéticas imediatas de até 50%. Utilizamos placas de EPS grafitado homologadas e tintas acrílicas/siloxano de alta resistência à humidade e salinidade da Ria de Aveiro.",
      customFaqs: [
        {
          question: "Quanto custa aplicar capoto (ETICS) em Aveiro por m²?",
          answer:
            "O preço do capoto em Aveiro varia entre 38€ e 55€ por m², valor que já inclui andaimes certificados, placas de EPS (6cm a 8cm), rede de fibra de vidro armada, cola impermeável e acabamento com barramento texturado de cor à escolha.",
        },
      ],
    },
    "infiltracoes-telhados": {
      pricing: "Lavagem e impermeabilização: 14€ a 26€/m² | Reparações pontuais a partir de 250€",
      duration: "2 a 5 dias úteis",
      directAnswer:
        "A Freitas Renovações LDA elimina de forma definitiva infiltrações e humidades em telhados e terraços em Aveiro. Aplicamos telas elastoméricas e membranas poliuretânicas contínuas com garantia escrita e resposta rápida em situações de emergência de chuva.",
      customFaqs: [
        {
          question: "Como resolver infiltrações no telhado em Aveiro?",
          answer:
            "Fazemos inspeção detalhada da cobertura para identificar telhas rachadas, algerozes entupidos ou juntas de chaminés degradadas. Aplicamos tela impermeabilizante e membranas hidrófugas resistentes à condensação e ventos costeiros de Aveiro.",
        },
      ],
    },
    "pladur-tetos-falsos": {
      pricing: "Tetos falsos: 26€ a 38€/m² | Divisórias em pladur: 32€ a 48€/m²",
      duration: "3 a 7 dias úteis",
      directAnswer:
        "Instalação profissional de pladur e tetos falsos em Aveiro com isolamento térmico e acústico em lã mineral. Soluções limpas e rápidas para criar novos compartimentos, embutir iluminação LED e melhorar o conforto sonoro entre divisões.",
      customFaqs: [
        {
          question: "Quanto custa colocar tetos falsos em pladur em Aveiro?",
          answer:
            "O preço médio de tetos falsos em pladur em Aveiro oscila entre 26€ e 38€/m², incluindo estrutura metálica galvanizada, placas de gesso cartonado (hidrófugo em WCs e cozinhas), lã mineral e barramento de juntas pronto para pintura.",
        },
      ],
    },
    "caixilharia-janelas": {
      pricing: "Sob medida consoante dimensões e número de folhas (a partir de 380€ por vão)",
      duration: "1 a 2 semanas após fabrico",
      directAnswer:
        "Substituição de caixilharia e janelas em Aveiro com perfis PVC e alumínio com corte térmico Classe A+ e vidro duplo Low-E com gás árgon. Reduz em até 60% as perdas térmicas e isola totalmente o ruído exterior de tráfego e vizinhos.",
      customFaqs: [
        {
          question: "Compensa trocar janelas velhas por PVC com corte térmico em Aveiro?",
          answer:
            "Sim! O clima húmido e as amplitudes térmicas de Aveiro provocam grande condensação em janelas antigas de alumínio simples. A caixilharia em PVC com vidro duplo elimina a condensação nos vidros e permite poupar centenas de euros em aquecimento no inverno.",
        },
      ],
    },
    "canalizacao": {
      pricing: "A partir de 65€ para reparações pontuais | De 650€ a 1.250€ para rede completa WC em multicamada",
      duration: "24h a 48h para reparações urgentes | 2 a 4 dias úteis para renovação integral",
      directAnswer:
        "Serviço profissional de canalizador em Aveiro e concelhos limítrofes pela Freitas Renovações LDA. Deteção precisa de fugas, substituição de tubagens velhas de chumbo/ferro por sistemas multicamada prensada sem emendas no chão e desentupimentos urgentes com resposta em menos de 12 horas.",
      customFaqs: [
        {
          question: "Quanto custa um canalizador em Aveiro?",
          answer:
            "Em Aveiro, intervenções de canalizador variam entre 65€ e 120€ para reparação de pequenas fugas ou torneiras, e entre 650€ e 1.250€ para a renovação integral da rede de água quente, fria e esgotos de uma casa de banho com tubagem multicamada de alta resistência.",
        },
        {
          question: "Fazem deteção de fugas de água sem partir as paredes?",
          answer:
            "Sim, utilizamos testes de pressão e técnicas de localização pontual para identificar a exata origem da rutura, minimizando estragos em azulejos e pavimentos e poupando custos desnecessários ao cliente.",
        },
      ],
    },
    "eletricidade": {
      pricing: "Quadro elétrico novo: 350€ a 750€ | Instalação elétrica completa T2/T3: 1.800€ a 3.800€",
      duration: "1 a 2 dias para modernização de quadros | 1 a 2 semanas para remodelação completa",
      directAnswer:
        "Instalações elétricas residenciais e comerciais em Aveiro certificadas de acordo com as normas da DGEG e CERTIEL. A Freitas Renovações LDA executa novos quadros elétricos com disjuntores diferenciais de segurança, passagens de cabos anti-fogo, circuitos dedicados para placas de indução e iluminação LED económica.",
      customFaqs: [
        {
          question: "Quanto custa substituir um quadro elétrico em Aveiro?",
          answer:
            "A remodelação e certificação de um quadro elétrico em Aveiro custa tipicamente entre 350€ e 750€, incluindo disjuntores magnetotérmicos modernos, diferencial de 30mA para proteção humana e reorganização segura dos circuitos da casa.",
        },
        {
          question: "Quando é necessário renovar a rede elétrica de um apartamento ou moradia?",
          answer:
            "Se o imóvel tiver mais de 25 anos, fios rígidos antigos sem condutor de proteção (terra), tomadas a aquecer ou o quadro elétrico desarmar constantemente ao ligar fornos ou termoacumuladores, a renovação é fundamental para evitar curto-circuitos e riscos de incêndio.",
        },
      ],
    },
    "isolamentos": {
      pricing: "Isolamento de sótão/teto: 18€ a 28€/m² | Isolamento acústico de paredes: 32€ a 55€/m²",
      duration: "2 a 5 dias úteis",
      directAnswer:
        "Soluções completas de isolamento térmico e acústico em Aveiro para erradicar o frio húmido atlântico, condensações nas paredes e barulhos de vizinhos. Aplicamos lã de rocha de alta densidade, cortiça expandida e telas acústicas sob soalhos com garantia escrita de eficácia.",
      customFaqs: [
        {
          question: "Qual o melhor isolamento para combater a humidade e o frio em Aveiro?",
          answer:
            "A combinação de isolamento térmico de fachadas com capoto (ETICS) e aplicação de lã mineral hidrofugada de 80mm em tetos falsos ou sótãos é a solução mais comprovada para a zona de Aveiro, evitando condensações interiores e reduzindo em até 50% as despesas com aquecimento.",
        },
        {
          question: "É possível insonorizar paredes para não ouvir vizinhos?",
          answer:
            "Sim. Criamos contra-paredes desvinculadas acusticamente com estrutura em pladur duplo, lã de rocha e membrana acústica de alta densidade, amortecendo a transmissão de som aéreo e de impacto.",
        },
      ],
    },
  };

  const specifics = serviceSpecifics[service.slug] || {
    pricing: "Sob orçamento gratuito e transparente",
    duration: "Sob avaliação consoante dimensões do projeto",
    directAnswer: `A Freitas Renovações LDA presta serviços profissionais de ${service.title.toLowerCase()} em Aveiro e concelhos vizinhos, com alvará IMPIC, supervisão do Empreiteiro Jorge Freitas e resposta em menos de 12 horas.`,
    customFaqs: [],
  };

  const baseFaqs = [
    {
      question: `Quanto custa ${service.title.toLowerCase()} em Aveiro?`,
      answer: `O custo de ${service.title.toLowerCase()} em Aveiro é discriminado de forma clara no orçamento gratuito da Freitas Renovações LDA: ${specifics.pricing}. Ligue para ${CONTRACTOR_INFO.phoneDisplay} para agendar visita técnica sem compromisso.`,
    },
    {
      question: `Qual o prazo para ${service.title.toLowerCase()} em Aveiro?`,
      answer: `O prazo estimado é de ${specifics.duration}. Apresentamos cronograma rigoroso no contrato de empreitada e o Empreiteiro Jorge Freitas responde ao pedido de orçamento em menos de 12 horas.`,
    },
    {
      question: `A Freitas Renovações é uma empresa licenciada com alvará para ${service.title.toLowerCase()}?`,
      answer: `Sim. A Freitas Renovações LDA é titular de Alvará de Construção válido emitido pelo IMPIC e dispõe de seguro de responsabilidade civil obrigatório. Todas as obras têm garantia formal por escrito.`,
    },
    {
      question: `A Freitas Renovações faz obras de ${service.title.toLowerCase()} nos concelhos vizinhos de Aveiro?`,
      answer: `Sim! Além de cobrir todas as freguesias de Aveiro, atuamos com frequência em Ílhavo (Gafanhas), Águeda, Estarreja, Vagos e na zona costeira da Praia da Barra e Costa Nova sem cobrar taxas abusivas de deslocação.`,
    },
  ];

  return {
    title: `${service.title} em Aveiro — Preço Justo & Chave na Mão | Freitas Renovações`,
    description: `${service.title} em Aveiro e arredores com preços justos e orçamento gratuito. Empresa licenciada IMPIC. Empreiteiro Jorge Freitas. Resposta em <12h. ☎ ${CONTRACTOR_INFO.phoneDisplay}. ⭐ 4.9/5 Google.`,
    h1: `${service.title} em Aveiro — Empresa Licenciada, Preços Justos`,
    intro: `A Freitas Renovações LDA oferece serviços especializados de ${service.title.toLowerCase()} em Aveiro e concelhos limítrofes. ${service.longDescription} Empresa licenciada IMPIC com mais de 100 obras executadas com sucesso, garantia contratual e orçamentos transparentes.`,
    directAnswer: specifics.directAnswer,
    pricingGuide: specifics.pricing,
    durationGuide: specifics.duration,
    faq: [...specifics.customFaqs, ...baseFaqs],
  };
}

export function generateParishSEO(parish: Parish, service?: Service): PageSEO {
  const serviceName = service ? service.title.toLowerCase() : "obras e remodelações";
  const serviceTitle = service ? service.title : "Obras e Remodelações";
  const regionLabel = parish.isNeighboringCounty ? `Concelho de ${parish.name}` : `${parish.name}, Aveiro`;

  return {
    title: `${serviceTitle} em ${regionLabel} — Preço Justo | Freitas Renovações LDA`,
    description: `Empresa licenciada de ${serviceName} em ${regionLabel}. Empreiteiro Jorge Freitas. Orçamento gratuito, alvará IMPIC, resposta em <12h. ☎ ${CONTRACTOR_INFO.phoneDisplay}. ⭐ 4.9/5 Google.`,
    h1: `${serviceTitle} em ${regionLabel} — Empresa Licenciada, Preços Justos`,
    intro: `A Freitas Renovações LDA presta serviços profissionais de ${serviceName} em ${parish.fullName}. ${parish.description}. A nossa equipa, liderada pelo Empreiteiro Jorge Freitas, garante deslocação rápida, medições rigorosas no local e orçamento discriminado sem compromisso.`,
    directAnswer: `A Freitas Renovações LDA realiza serviços completos de ${serviceName} em ${parish.name}. Empresa com alvará IMPIC e classificação Google 4.9/5, disponibiliza resposta até 12 horas, preços justos por m² e garantia contratual em todas as obras.`,
    pricingGuide: "Orçamento gratuito e discriminado com base na área útil e materiais selecionados",
    durationGuide: "Prazos contratuais acordados e cumpridos escrupulosamente",
    faq: [
      {
        question: `A Freitas Renovações faz ${serviceName} em ${parish.name}?`,
        answer: `Sim! A Freitas Renovações LDA tem equipas ativas em ${parish.name} e presta todos os serviços de remodelações gerais, casas de banho, cozinhas, telhados, capoto e pintura com deslocação rápida e orçamento gratuito.`,
      },
      {
        question: `Como pedir um orçamento gratuito para obras em ${parish.name}?`,
        answer: `Basta ligar para o ${CONTRACTOR_INFO.phoneDisplay} ou preencher o formulário no nosso website. O Empreiteiro Jorge Freitas entra em contacto consigo no prazo máximo de 12 horas para agendar visita e apresentar o orçamento detalhado.`,
      },
      {
        question: `A Freitas Renovações é licenciada pelo IMPIC para trabalhar em ${parish.name}?`,
        answer: `Sim. A Freitas Renovações LDA é uma empresa de construção devidamente habilitada com Alvará do IMPIC e apólice de seguro de responsabilidade civil ativa, protegendo o seu património durante toda a obra.`,
      },
      {
        question: `Cobram deslocação para visitas e orçamentos em ${parish.name}?`,
        answer: `Não! As visitas técnicas para avaliação de obras e elaboração de orçamento em ${parish.name} e concelhos vizinhos são 100% gratuitas e sem qualquer compromisso.`,
      },
    ],
  };
}
