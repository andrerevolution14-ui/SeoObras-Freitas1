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
      pricing: "De 350€ a 550€/m² (renovação parcial de acabamentos) | 700€ a 1.200€/m² (reabilitação integral chave na mão)",
      duration: "3 a 10 semanas, consoante a área e complexidade",
      directAnswer:
        "A Freitas Renovações LDA é titular de Alvará IMPIC e liderada pelo Empreiteiro Jorge Freitas. Realizamos obras chave na mão em Aveiro mediante um processo ágil em 2 passos: 1) Envio do pedido com fotografias e dimensões aproximadas (resposta em <12h); 2) Apresentação de proposta discriminada e orçamento detalhado com base nas soluções e materiais escolhidos.",
      customFaqs: [
        {
          question: "Quanto custa uma remodelação geral em Aveiro por m²?",
          answer:
            "O valor por m² divide-se em dois âmbitos: entre 350€ e 550€/m² para renovações de superfícies e acabamentos existentes, e entre 700€ e 1.200€/m² para obras integrais chave na mão com renovação total de redes técnicas (água, esgotos, eletricidade), caixilharia com corte térmico, climatização e acabamentos de gama média-alta.",
        },
        {
          question: "O que está incluído no serviço de obras chave na mão da Freitas Renovações?",
          answer:
            "Inclui planeamento e cronograma formal, demolição com remoção de entulho para vazadouro licenciado, proteção integral de zonas comuns, execução de todas as especialidades técnicas certificadas, instalação de pavimentos e revestimentos, pinturas e limpeza pós-obra com garantia contratual escrita.",
        },
      ],
    },
    "remodelacao-casas-de-banho": {
      pricing: "1.800€ a 2.600€ (troca de banheira por duche) | 3.200€ a 5.500€ (remodelação total standard)",
      duration: "3 a 8 dias úteis",
      directAnswer:
        "A remodelação de casas de banho em Aveiro pela Freitas Renovações LDA contempla desde a conversão de banheira em base de duche plana antiderrapante até à remodelação integral com substituição de prumadas e canalização multicamada sem juntas no piso, impermeabilização bicomponente certificada e cerâmica retificada.",
      customFaqs: [
        {
          question: "Quanto custa remodelar uma casa de banho em Aveiro?",
          answer:
            "A conversão de banheira para base de duche situa-se entre 1.800€ e 2.600€. Já a remodelação integral de uma casa de banho completa custa entre 3.200€ e 5.500€, incluindo demolição total, nova rede de águas e esgotos em multicamada, impermeabilização com tela líquida bicomponente, cerâmica, loiças sanitárias suspensas ou compactas, torneiras e resguardo em vidro temperado.",
        },
        {
          question: "Quanto tempo demora a obra numa casa de banho?",
          answer:
            "A substituição de banheira por base de duche demora de 2 a 3 dias úteis. Uma renovação integral com nova canalização e revestimentos completos fica concluída entre 5 a 8 dias úteis, minimizando o impacto no dia a dia da habitação.",
        },
      ],
    },
    "remodelacao-cozinhas": {
      pricing: "4.500€ a 7.500€ (renovação funcional standard) | 8.500€ a 16.000€+ (remodelação estrutural / open space com móveis por medida e pedra)",
      duration: "2 a 4 semanas",
      directAnswer:
        "Na Freitas Renovações LDA distinguimos claramente o âmbito da obra de cozinha: uma renovação funcional (mantendo layout e instalações) situa-se entre 4.500€ e 7.500€; uma intervenção profunda com abertura em open space, vigamento de suporte, móveis termolaminados/lacados por medida e bancadas em quartzo/granito situa-se entre 8.500€ e 16.000€+. O orçamento é apresentado de forma discriminada com base nas fotografias, dimensões e materiais definidos.",
      customFaqs: [
        {
          question: "Quanto custa remodelar uma cozinha em Aveiro e o que define o valor?",
          answer:
            "O investimento depende do escopo: renovações funcionais sem alteração de paredes variam de 4.500€ a 7.500€. Já projetos com abertura para a sala (open space), substituição total de canalização e esgotos, circuito elétrico dedicado para placa de indução e bancadas em quartzo compacto (Silestone/Dekton) ou granito situam-se entre 8.500€ e 16.000€+. A mão de obra, demolição e descarte legal de entulho estão sempre incluídos.",
        },
        {
          question: "Como funciona o processo de orçamento para remodelação de cozinha?",
          answer:
            "Trabalhamos num processo simples e rápido em 2 passos: 1) Envio do pedido através do formulário ou contacto direto, com fotografias do espaço e dimensões aproximadas (resposta em menos de 12 horas); 2) Apresentação de proposta discriminada e orçamento detalhado pelo Empreiteiro Jorge Freitas com os materiais, prazos e soluções técnicas definidas.",
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
            "O processo inicia-se com a análise detalhada das fotografias, registos e especificações enviadas pelo proprietário. O Empreiteiro Jorge Freitas avalia as necessidades estruturais, patologias de humidade e caixilharias, apresentando uma proposta técnica discriminada e planeada para valorizar o imóvel.",
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
      answer: `O custo de ${service.title.toLowerCase()} em Aveiro é discriminado de forma clara no orçamento gratuito da Freitas Renovações LDA: ${specifics.pricing}. Ligue para ${CONTRACTOR_INFO.phoneDisplay} ou envie fotos e medidas para receber a sua proposta sem compromisso.`,
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
    title: `${service.title} em Aveiro`,
    description: `${service.title} em Aveiro e concelhos vizinhos. Alvará IMPIC, acompanhamento direto pelo Empreiteiro Jorge Freitas e orçamento discriminado em 2 passos rápidos. ☎ ${CONTRACTOR_INFO.phoneDisplay}.`,
    h1: `${service.title} em Aveiro — Qualidade de Execução & Garantia Escrita`,
    intro: `A Freitas Renovações LDA oferece serviços especializados de ${service.title.toLowerCase()} em Aveiro e concelhos limítrofes. ${service.longDescription} Empresa licenciada IMPIC com mais de 100 obras executadas, garantia contratual e planeamento rigoroso.`,
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
    title: `${serviceTitle} em ${regionLabel}`,
    description: `Empresa licenciada de ${serviceName} em ${regionLabel}. Empreiteiro Jorge Freitas. Processo rápido em 2 passos, alvará IMPIC e orçamento discriminado. ☎ ${CONTRACTOR_INFO.phoneDisplay}.`,
    h1: `${serviceTitle} em ${regionLabel} — Obras com Acompanhamento Direto`,
    intro: `A Freitas Renovações LDA presta serviços profissionais de ${serviceName} em ${parish.fullName}. ${parish.description}. A nossa equipa, liderada pelo Empreiteiro Jorge Freitas, analisa as suas fotos e medidas para apresentar proposta discriminada e detalhada sem custos ocultos nem complicações.`,
    directAnswer: `A Freitas Renovações LDA realiza serviços de ${serviceName} em ${parish.name} com alvará IMPIC, resposta rápida, garantia contratual escrita e acompanhamento presencial em todas as fases da obra.`,
    pricingGuide: "Orçamento discriminado com base nas fotos, medidas enviadas e materiais selecionados",
    durationGuide: "Prazos contratuais acordados e cumpridos com cronograma de execução",
    faq: [
      {
        question: `A Freitas Renovações faz ${serviceName} em ${parish.name}?`,
        answer: `Sim! A Freitas Renovações LDA tem equipas ativas em ${parish.name} e presta todos os serviços de remodelações gerais, casas de banho, cozinhas, telhados, capoto e pintura com análise rápida de fotos e medidas e proposta transparente.`,
      },
      {
        question: `Como solicitar uma avaliação para obras em ${parish.name}?`,
        answer: `Ligue para o ${CONTRACTOR_INFO.phoneDisplay} ou preencha o formulário online enviando fotos e dimensões aproximadas. O Empreiteiro Jorge Freitas analisa os detalhes e apresenta proposta detalhada em menos de 12 horas.`,
      },
      {
        question: `A Freitas Renovações é licenciada pelo IMPIC para trabalhar em ${parish.name}?`,
        answer: `Sim. A Freitas Renovações LDA é titular de Alvará de Construção emitido pelo IMPIC e apólice de seguro de responsabilidade civil ativa, protegendo o imóvel e os proprietários durante toda a obra.`,
      },
      {
        question: `Como funciona o orçamento para obras em ${parish.name}?`,
        answer: `O processo é 100% gratuito, ágil e em apenas 2 passos: envia as fotografias e medidas aproximadas do espaço e o Empreiteiro Jorge Freitas elabora uma proposta discriminada e detalhada sem que tenha de aguardar por visitas presenciais nem perder tempo.`,
      },
    ],
  };
}
