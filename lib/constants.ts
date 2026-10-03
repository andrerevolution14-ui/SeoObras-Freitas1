// ============================================================
// lib/constants.ts — Freitas Renovações LDA
// Central data source for all business information
// ============================================================

export const CONTRACTOR_INFO = {
  companyName: "Freitas Renovações LDA",
  shortName: "Freitas Renovações",
  contractorName: "Jorge Freitas",
  jobTitle: "Empreiteiro Geral",
  phone: "+351 961 455 997",
  phoneDisplay: "961 455 997",
  email: "Freitasrenovacoes@gmail.com",
  website: "https://www.grupofreitasrenovacoes.pt",
  address: {
    street: "R. Magistério Primário",
    city: "Aveiro",
    postalCode: "3800-212",
    country: "Portugal",
    countryCode: "PT",
  },
  geo: {
    latitude: "40.647487",
    longitude: "-8.640135",
  },
  googleRating: 4.9,
  reviewCount: 48,
  projectsCompleted: 100,
  responseTime: "Até 12h",
  socialLinks: {
    google: "https://g.page/freitas-renovacoes",
    facebook: "https://facebook.com/freitasrenovacoes",
  },
};

// ============================================================
// SERVICES
// ============================================================
export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  emergencyAvailable: boolean;
  keywords: string[];
  features: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "remodelacao-geral",
    title: "Remodelações Gerais & Obras Chave na Mão",
    shortTitle: "Remodelação Geral",
    description:
      "Empresa de remodelações e obras gerais em Aveiro. Soluções chave na mão com prazos rigorosos, garantia contratual e preços justos.",
    longDescription:
      "A Freitas Renovações LDA é a sua empresa de obras e remodelações chave na mão em Aveiro. Liderada pelo Empreiteiro Jorge Freitas, com Alvará IMPIC válido, a nossa equipa executa projetos integrados de reabilitação residencial e comercial: demolição, alvenarias, canalização, eletricidade, pladur, acabamentos e carpintarias com preço fixo sem surpresas.",
    icon: "Home",
    emergencyAvailable: false,
    keywords: [
      "remodelações aveiro",
      "empresa de remodelações aveiro",
      "obras aveiro",
      "empresa de obras aveiro",
      "obras e remodelações aveiro",
      "empreiteiros aveiro",
      "remodelações gerais aveiro",
      "empresa de construção e remodelação aveiro",
      "obras chave na mão aveiro",
    ],
    features: [
      "Gestão de obra chave na mão",
      "Alvará de construção IMPIC e seguro civil",
      "Orçamento discriminado com preços justos",
      "Cumprimento estrito de prazos contratuais",
      "Garantia formal por escrito",
      "Supervisão direta do Empreiteiro Jorge Freitas",
    ],
  },
  {
    slug: "remodelacao-casas-de-banho",
    title: "Remodelação de Casas de Banho & WCs",
    shortTitle: "Casas de Banho",
    description:
      "Remodelação de casas de banho e WCs em Aveiro: troca de banheira por base de duche, canalização nova, impermeabilização e loiças modernas.",
    longDescription:
      "Especialistas em remodelação de casas de banho em Aveiro (WC). Fazemos substituição rápida de banheira antiga por base de duche plana antiderrapante, renovação integral da rede de canalização e esgotos em multicamada, impermeabilização bicomponente, cerâmica retificada, tetos falsos hidrófugos e instalação de louças sanitárias suspensas com acabamentos perfeitos.",
    icon: "Bath",
    emergencyAvailable: false,
    keywords: [
      "remodelação de casas de banho aveiro",
      "remodelação wc aveiro",
      "obras casa de banho aveiro",
      "trocar banheira por base de duche aveiro",
      "canalização casa de banho aveiro",
      "preço remodelação wc aveiro",
    ],
    features: [
      "Substituição de banheira por duche plano",
      "Impermeabilização completa de zonas húmidas",
      "Substituição integral da canalização de água e esgoto",
      "Assentamento de cerâmica e azulejos retificados",
      "Instalação de resguardos em vidro temperado",
      "Prazos rápidos: conclusão típica em 5 a 8 dias úteis",
    ],
  },
  {
    slug: "remodelacao-cozinhas",
    title: "Remodelação de Cozinhas",
    shortTitle: "Cozinhas",
    description:
      "Remodelação moderna de cozinhas em Aveiro: móveis à medida, bancadas em quartzo/granito, nova canalização e eletricidade para eletrodomésticos.",
    longDescription:
      "Transformamos cozinhas em espaços funcionais, ergonómicos e modernos em Aveiro. Executamos abertura de cozinhas em open space para a sala, instalação de móveis termolaminados ou lacados à medida, bancadas de alta durabilidade (Silestone, Dekton, granito), reforço de circuitos elétricos dedicados e canalizações estanques.",
    icon: "UtensilsCrossed",
    emergencyAvailable: false,
    keywords: [
      "remodelação de cozinhas aveiro",
      "obras de cozinhas aveiro",
      "cozinhas por medida aveiro",
      "abrir cozinha em open space aveiro",
      "quanto custa remodelar cozinha aveiro",
    ],
    features: [
      "Layout em Open Space e derrube seguro de paredes",
      "Móveis de cozinha por medida com ferragens amortecidas",
      "Bancadas em quartzo compacto, cerâmica ou granito",
      "Instalação de pontos de gás, água e eletricidade para eletrodomésticos",
      "Iluminação LED encastrada sob móveis",
      "Revestimento entre móveis anti-gordura de fácil limpeza",
    ],
  },
  {
    slug: "remodelacao-apartamentos",
    title: "Remodelação de Apartamentos",
    shortTitle: "Apartamentos",
    description:
      "Obras e remodelações completas de apartamentos em Aveiro. Soluções integradas com respeito pelo condomínio e prazos rigorosos.",
    longDescription:
      "Remodelação integral e parcial de apartamentos (T1, T2, T3 e T4) em Aveiro. Otimizamos áreas úteis, melhoramos o conforto térmico e acústico entre vizinhos, substituímos canalizações antigas, renovamos pavimentos flutuantes ou vinílicos e cuidamos de toda a logística com comunicação prévia ao condomínio e proteção rigorosa das partes comuns.",
    icon: "Building",
    emergencyAvailable: false,
    keywords: [
      "remodelação de apartamentos aveiro",
      "obras em apartamentos aveiro",
      "remodelar apartamento aveiro",
      "obras condomínio aveiro",
      "preço m2 remodelação apartamento aveiro",
    ],
    features: [
      "Remodelação total chave na mão sem incómodos para o proprietário",
      "Proteção de elevadores e zonas comuns do condomínio",
      "Horários de ruído escrupulosamente respeitados",
      "Isolamento acústico de pavimentos e tetos falsos",
      "Renovação completa de WC, Cozinha e Salas",
      "Remoção diária de entulhos para vazadouro licenciado",
    ],
  },
  {
    slug: "remodelacao-moradias",
    title: "Remodelação de Moradias",
    shortTitle: "Moradias",
    description:
      "Remodelação e ampliação de moradias em Aveiro: interiores, fachadas com capoto, telhados, exteriores e valorização patrimonial total.",
    longDescription:
      "Projetos abrangentes de renovação e modernização de moradias unifamiliares e vivendas em Aveiro e concelhos vizinhos. Desde a redistribuição interior de divisões, isolamento de paredes e telhados para classe energética superior, até à remodelação de pátios, garagens, caleiras e coberturas.",
    icon: "Home",
    emergencyAvailable: false,
    keywords: [
      "remodelação de moradias aveiro",
      "obras em moradias aveiro",
      "remodelação vivendas aveiro",
      "reforma de vivendas aveiro",
      "preço remodelação moradia aveiro",
    ],
    features: [
      "Reorganização estrutural e interior de divisões",
      "Isolamento térmico exterior ETICS (Capoto) e coberturas",
      "Instalações elétricas e ITED atualizadas",
      "Substituição de caixilharias por vidro duplo eficiente",
      "Recuperação de pavimentos exteriores e muros",
      "Melhoria drástica na eficiência energética da habitação",
    ],
  },
  {
    slug: "remodelacao-interiores",
    title: "Remodelação de Interiores",
    shortTitle: "Interiores",
    description:
      "Design de interiores, demolições pontuais, tetos falsos em pladur, nova iluminação LED e pintura decorativa para casas e comércios.",
    longDescription:
      "Especialistas em remodelações de interiores residenciais e comerciais em Aveiro. Criamos ambientes luminosos e modernos através de tetos falsos com iluminação embutida, divisórias leves em gesso cartonado, assentamento de vinílico SPC resistente à água e pinturas laváveis com acabamento mate ou acetinado de topo.",
    icon: "Sparkles",
    emergencyAvailable: false,
    keywords: [
      "remodelação de interiores aveiro",
      "obras de interiores aveiro",
      "renovação de interiores aveiro",
      "decoração e remodelação aveiro",
      "pintura e pladur aveiro",
    ],
    features: [
      "Tetos falsos modernos com sancas de luz indireta",
      "Divisórias em pladur acústico para criar novos quartos ou escritórios",
      "Aplicação de pavimento flutuante AC5 e vinílico SPC",
      "Portas de interior lacadas e rodapés embutidos",
      "Pinturas de paredes e tetos sem manchas nem marcas de rolo",
      "Otimização ergonómica de espaços",
    ],
  },
  {
    slug: "recuperacao-casas-velhas",
    title: "Recuperação de Casas Velhas & Reabilitação",
    shortTitle: "Casas Velhas",
    description:
      "Reabilitação de edifícios antigos e recuperação de casas velhas em Aveiro: reforço estrutural, tratamento de madeiras e modernização integral.",
    longDescription:
      "A Freitas Renovações LDA possui ampla experiência na reabilitação e restauro de imóveis antigos e casas tradicionais em Aveiro. Recuperamos travejamentos de madeira, reforçamos alvenarias históricas de pedra ou tijolo de burro, resolvemos humidades ascendentes pelo solo e modernizamos totalmente as redes técnicas, mantendo o charme original do património aveirense.",
    icon: "Hammer",
    emergencyAvailable: false,
    keywords: [
      "recuperação de casas velhas aveiro",
      "reabilitação urbana aveiro",
      "restauro de casas antigas aveiro",
      "remodelar casa de aldeia aveiro",
      "obras em prédios antigos aveiro",
    ],
    features: [
      "Diagnóstico estrutural e tratamento de madeiras contra térmitas/caruncho",
      "Eliminação definitiva de humidades ascensionais",
      "Reforço de lajes e paredes mestras",
      "Substituição de coberturas antigas com isolamento térmico moderno",
      "Preservação de pormenores arquitetónicos e cantarias tradicionais",
      "Apoio com enquadramento de incentivos fiscais à reabilitação urbana",
    ],
  },
  {
    slug: "infiltracoes-telhados",
    title: "Infiltrações & Impermeabilização de Telhados",
    shortTitle: "Telhados & Infiltrações",
    description:
      "Impermeabilização de coberturas, reparação urgente de infiltrações e lavagem profissional de telhados em Aveiro.",
    longDescription:
      "Especialistas na resolução definitiva de infiltrações e humidades em coberturas e terraços em Aveiro. A proximidade da Ria e a humidade atlântica exigem materiais certificados: aplicamos telas asfálticas, membranas líquidas poliuretânicas, impermeabilização de terraços transitáveis, reparação de caleiras e telhas partidas com garantia técnica por escrito.",
    icon: "CloudRain",
    emergencyAvailable: true,
    keywords: [
      "impermeabilização de telhados aveiro",
      "reparação de infiltrações aveiro",
      "infiltrações aveiro",
      "telhados aveiro",
      "limpeza de telhados aveiro",
      "arranjo telhados aveiro",
    ],
    features: [
      "Deteção precisa da origem de infiltrações e goteiras",
      "Impermeabilização contínua com poliuretano ou telas elastoméricas",
      "Lavagem de alta pressão com tratamento fungicida e algicida",
      "Substituição de telhas partidas e reparação de cumeeiras",
      "Limpeza e substituição de algerozes e caleiras de zinco/chapa",
      "Atendimento urgente em caso de entrada de água",
    ],
  },
  {
    slug: "pintura-capoto",
    title: "Pinturas de Interiores e Exteriores & Capoto ETICS",
    shortTitle: "Pinturas & Capoto",
    description:
      "Aplicação de capoto ETICS para isolamento térmico de fachadas e pinturas de interiores e exteriores com tintas anti-humidade em Aveiro.",
    longDescription:
      "Serviço profissional de pintura e isolamento de fachadas em Aveiro. Aplicamos o sistema térmico ETICS (Capoto com placas EPS grafitado ou lã de rocha) homologado, garantindo redução de até 50% na fatura energética. Executamos pinturas exteriores com tintas de membrana elástica resistentes à maresia e pinturas interiores anti-fúngicas.",
    icon: "Paintbrush",
    emergencyAvailable: false,
    keywords: [
      "aplicação de capoto aveiro",
      "isolamento térmico aveiro",
      "pinturas de interiores e exteriores aveiro",
      "pintor aveiro",
      "pintura de fachadas aveiro",
      "preço m2 capoto aveiro",
    ],
    features: [
      "Aplicação de Capoto ETICS certificado (EPS grafitado / Lã de rocha)",
      "Redução comprovada do consumo de eletricidade e gás",
      "Eliminação de pontes térmicas e condensações interiores",
      "Pintura exterior de fachadas com tintas acrílicas e de siloxano",
      "Pintura interior sem pó com tintas laváveis ecológicas",
      "Andaimes próprios e montagem segura certificada",
    ],
  },
  {
    slug: "pladur-tetos-falsos",
    title: "Pladur & Tetos Falsos",
    shortTitle: "Pladur & Tetos",
    description:
      "Instalação de tetos falsos, divisórias em pladur (gesso cartonado), isolamento acústico e sancas iluminadas em Aveiro.",
    longDescription:
      "Execução rápida e limpa de estruturas de gesso cartonado (Pladur) em Aveiro. Montamos tetos falsos lisos ou decorativos com iluminação embutida, divisórias para criação de novos quartos ou escritórios, paredes duplas com lã mineral para insonorização e soluções de pladur hidrófugo (verde) para casas de banho e cozinhas.",
    icon: "Grid",
    emergencyAvailable: false,
    keywords: [
      "pladur e tetos falsos aveiro",
      "tetos falsos aveiro",
      "divisórias pladur aveiro",
      "gesso cartonado aveiro",
      "montagem de pladur aveiro",
      "preço m2 pladur aveiro",
    ],
    features: [
      "Tetos falsos acústicos e térmicos com lã de rocha",
      "Divisórias leves e resistentes com placa dupla",
      "Pladur hidrófugo especial para cozinhas e casas de banho",
      "Sancas de iluminação LED e cortineiros embutidos",
      "Acabamento Q4 de barramento pronto para pintura perfeita",
      "Rapidez de execução sem obras pesadas de alvenaria",
    ],
  },
  {
    slug: "caixilharia-janelas",
    title: "Substituição de Caixilharia & Janelas",
    shortTitle: "Caixilharia & Janelas",
    description:
      "Substituição de janelas antigas por caixilharia em PVC e alumínio com corte térmico e vidro duplo de alta eficiência em Aveiro.",
    longDescription:
      "Elimine correntes de ar, ruído da rua e perdas de calor em Aveiro com a substituição das suas janelas antigas. Fornecemos e instalamos caixilharia em PVC e alumínio com rutura térmica, vidros duplos com tratamento térmico baixo emissivo (Low-E) e proteção acústica, estores térmicos elétricos e fecho oscilobatente.",
    icon: "AppWindow",
    emergencyAvailable: false,
    keywords: [
      "substituição de caixilharia aveiro",
      "janelas aveiro",
      "janelas pvc aveiro",
      "caixilharia corte térmico aveiro",
      "trocar janelas aveiro",
      "vidros duplos aveiro",
    ],
    features: [
      "Perfis em PVC e Alumínio com corte térmico Classe A+",
      "Vidro duplo e triplo com gás árgon e tratamento Low-E",
      "Ferragens de alta segurança e mecanismo oscilobatente",
      "Estores térmicos em alumínio com motorização",
      "Remoção e encaminhamento das janelas velhas",
      "Candidatura ao Fundo Ambiental para reembolso da despesa",
    ],
  },
  {
    slug: "isolamentos",
    title: "Isolamento Térmico & Acústico",
    shortTitle: "Isolamentos",
    description:
      "Isolamento térmico e acústico de paredes, pavimentos e coberturas para conforto e poupança energética em Aveiro.",
    longDescription:
      "Soluções completas de isolamento térmico e acústico para combater o frio, humidade atlântica e barulhos em habitações de Aveiro. Trabalhamos com lã de rocha, aglomerado de cortiça, poliuretano e membranas acústicas sob pavimento.",
    icon: "Layers",
    emergencyAvailable: false,
    keywords: [
      "isolamento térmico aveiro",
      "aplicação de capoto aveiro",
      "isolamento acústico aveiro",
      "eficiência energética aveiro",
      "conforto térmico habitações aveiro",
    ],
    features: [
      "Isolamento térmico de paredes interiores e exteriores",
      "Isolamento de sótãos e coberturas inclinadas",
      "Telas de impacto sob soalhos para corte de ruído de passos",
      "Certificação técnica de materiais",
      "Aumento imediato da classificação energética do imóvel",
      "Garantia escrita de eficácia",
    ],
  },
  {
    slug: "canalizacao",
    title: "Canalização & Deteção de Fugas",
    shortTitle: "Canalização",
    description:
      "Reparação urgente de fugas de água, desentupimentos e instalação de novas canalizações em multicamada em Aveiro.",
    longDescription:
      "Serviço profissional de canalizador em Aveiro e concelhos limítrofes. Deteção precisa de fugas, substituição de canos velhos de chumbo ou ferro por tubagens modernas PEX/multicamada sem juntas no chão, e resolução rápida de desentupimentos.",
    icon: "Droplets",
    emergencyAvailable: true,
    keywords: ["canalizador aveiro", "canalização aveiro", "fugas de água aveiro", "desentupimentos aveiro"],
    features: [
      "Deteção de roturas sem destruição desnecessária",
      "Substituição por tubagens multicamada prensada",
      "Desentupimento rápido de esgotos e sanitários",
      "Instalação de bombas de calor e termoacumuladores",
      "Atendimento prioritário em avarias graves",
      "Preços justos e transparentes",
    ],
  },
  {
    slug: "eletricidade",
    title: "Eletricidade & Instalações Certificadas",
    shortTitle: "Eletricidade",
    description:
      "Instalações elétricas residenciais e comerciais, remodelação de quadros elétricos e iluminação LED em Aveiro.",
    longDescription:
      "Execução de redes elétricas completas em Aveiro de acordo com as normas da DGEG e CERTIEL. Instalação de quadros modernos com proteção diferencial contra choques, circuitos dedicados para placas de indução e ar condicionado, e certificação.",
    icon: "Zap",
    emergencyAvailable: true,
    keywords: ["eletricista aveiro", "instalações elétricas aveiro", "quadro elétrico aveiro", "avarias elétricas aveiro"],
    features: [
      "Remodelação e certificação de quadros elétricos",
      "Instalação de iluminação LED económica",
      "Circuitos dedicados para equipamentos de alta potência",
      "Passagem de nova cablagem anti-fogo",
      "Resolução urgente de curtos-circuitos e falhas de energia",
      "Conformidade rigorosa com normas de segurança",
    ],
  },
];

// ============================================================
// REAL PROJECTS DATA (2022 - 2026)
// ============================================================
export interface RealProject {
  id: string;
  title: string;
  service: string;
  parish: string;
  year: string;
  image: string;
  hasBeforeAfter: boolean;
  beforeImage?: string;
  description: string;
  altText: string;
  areaM2?: number;
  realPrice?: number;
}

export const REAL_PROJECTS: RealProject[] = [
  {
    id: "p1",
    title: "Remodelação Completa de Moradia T3",
    service: "Remodelações Gerais & Obras Chave na Mão",
    parish: "Esgueira, Aveiro",
    year: "2025",
    image: "/moradia1.jpg",
    hasBeforeAfter: false,
    areaM2: 130,
    realPrice: 42000,
    altText: "Remodelação completa de moradia T3 em Esgueira Aveiro pelo Empreiteiro Jorge Freitas",
    description: "Remodelação integral de espaços interiores, renovação de pisos, tectos falsos com isolamento acústico e pintura geral.",
  },
  {
    id: "p2",
    title: "Limpeza e Impermeabilização de Telhado",
    service: "Infiltrações & Impermeabilização de Telhados",
    parish: "Aradas, Aveiro",
    year: "2024",
    image: "/LimpezaT1.jpg",
    hasBeforeAfter: false,
    areaM2: 120,
    realPrice: 2350,
    altText: "Limpeza profunda e impermeabilização de cobertura de moradia em Aradas Aveiro",
    description: "Lavagem de alta pressão de cobertura, remoção de musgos da ria e impermeabilização protetora com tela elastomérica.",
  },
  {
    id: "p3",
    title: "Capoto ETICS + Pintura de Fachada",
    service: "Pinturas de Interiores e Exteriores & Capoto ETICS",
    parish: "Glória e Vera Cruz, Aveiro",
    year: "2026",
    image: "/capoto SEM Before.avif",
    hasBeforeAfter: false,
    areaM2: 160,
    realPrice: 7200,
    altText: "Aplicação de sistema ETICS Capoto para isolamento térmico exterior em Glória e Vera Cruz Aveiro",
    description: "Aplicação do sistema ETICS/Capoto para isolamento térmico exterior com pintura final acrílica de alta resistência à humidade.",
  },
  {
    id: "p4",
    title: "Instalação Elétrica Completa e Quadro",
    service: "Eletricidade & Instalações Certificadas",
    parish: "São Bernardo, Aveiro",
    year: "2023",
    image: "/eletrica1.jfif",
    hasBeforeAfter: false,
    areaM2: 95,
    realPrice: 4500,
    altText: "Instalação elétrica certificada com montagem de novo quadro elétrico em São Bernardo Aveiro",
    description: "Renovação integral da rede elétrica, montagem de novo quadro elétrico com disjuntores diferenciais e iluminação LED.",
  },
];

// ============================================================
// PARISHES & NEIGHBORING MUNICIPALITIES (Expansão Geográfica)
// ============================================================
export interface Parish {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  population: number;
  geo: { lat: string; lng: string };
  isNeighboringCounty?: boolean;
}

export const PARISHES: Parish[] = [
  // Freguesias Centrais do Município de Aveiro
  {
    slug: "gloria-e-vera-cruz",
    name: "Glória e Vera Cruz",
    fullName: "União de Freguesias de Glória e Vera Cruz",
    description: "Zona histórica, canais da ria e coração urbano e comercial do centro de Aveiro",
    population: 15800,
    geo: { lat: "40.6405", lng: "-8.6538" },
  },
  {
    slug: "esgueira",
    name: "Esgueira",
    fullName: "Freguesia de Esgueira",
    description: "Freguesia residencial em forte expansão a norte de Aveiro, com elevado volume de obras em apartamentos e moradias",
    population: 12500,
    geo: { lat: "40.6535", lng: "-8.6457" },
  },
  {
    slug: "aradas",
    name: "Aradas",
    fullName: "Freguesia de Aradas",
    description: "Zona residencial tranquila a sul de Aveiro, ideal para remodelações de moradias unifamiliares",
    population: 9200,
    geo: { lat: "40.6290", lng: "-8.6441" },
  },
  {
    slug: "cacia",
    name: "Cácia",
    fullName: "Freguesia de Cácia",
    description: "Pólo residencial e empresarial a norte de Aveiro, com procura ativa de remodelações e manutenção de telhados",
    population: 8700,
    geo: { lat: "40.6752", lng: "-8.5956" },
  },
  {
    slug: "sao-bernardo",
    name: "São Bernardo",
    fullName: "Freguesia de São Bernardo",
    description: "Área nobre residencial junto ao Hospital e Universidade de Aveiro",
    population: 7300,
    geo: { lat: "40.6282", lng: "-8.6560" },
  },
  {
    slug: "santa-joana",
    name: "Santa Joana",
    fullName: "Freguesia de Santa Joana",
    description: "Freguesia residencial acolhedora a leste do centro de Aveiro",
    population: 5600,
    geo: { lat: "40.6445", lng: "-8.6294" },
  },
  {
    slug: "oliveirinha",
    name: "Oliveirinha",
    fullName: "Freguesia de Oliveirinha",
    description: "Área suburbana de moradias a sul de Aveiro com grande procura de capoto e isolamentos",
    population: 6100,
    geo: { lat: "40.6080", lng: "-8.6377" },
  },
  {
    slug: "eixo",
    name: "Eixo",
    fullName: "Freguesia de Eixo",
    description: "Zona de transição entre Aveiro e Águeda com moradias tradicionais e novos projetos de remodelação",
    population: 4800,
    geo: { lat: "40.6197", lng: "-8.5924" },
  },
  {
    slug: "requeixo",
    name: "Requeixo",
    fullName: "Freguesia de Requeixo",
    description: "Zona ribeirinha da Ria de Aveiro com habitações rurais e projetos de reabilitação",
    population: 3200,
    geo: { lat: "40.6597", lng: "-8.5790" },
  },
  {
    slug: "nariz",
    name: "Nariz",
    fullName: "Freguesia de Nariz",
    description: "Zona residencial e rural no município de Aveiro",
    population: 2100,
    geo: { lat: "40.5990", lng: "-8.5807" },
  },
  {
    slug: "eirol",
    name: "Eirol",
    fullName: "Freguesia de Eirol",
    description: "Freguesia a oeste de Aveiro caracterizada por moradias e recuperação de habitações",
    population: 1800,
    geo: { lat: "40.6470", lng: "-8.7050" },
  },
  {
    slug: "sao-jacinto",
    name: "São Jacinto",
    fullName: "Freguesia de São Jacinto",
    description: "Península costeira entre a Ria e o Oceano, com necessidades específicas de impermeabilização",
    population: 1500,
    geo: { lat: "40.6724", lng: "-8.7411" },
  },

  // Expansão Geográfica Próxima — Concelhos Limítrofes (Grupo 5 do Briefing)
  {
    slug: "ilhavo",
    name: "Ílhavo",
    fullName: "Concelho de Ílhavo (Gafanhas e Centro)",
    description: "Município vizinho de Aveiro com forte procura de remodelações de apartamentos e moradias em Gafanha da Nazaré, Gafanha da Encarnação e Ílhavo centro",
    population: 39500,
    geo: { lat: "40.6006", lng: "-8.6677" },
    isNeighboringCounty: true,
  },
  {
    slug: "agueda",
    name: "Águeda",
    fullName: "Concelho de Águeda",
    description: "Concelho dinâmico e industrial limítrofe a Aveiro, com elevado investimento em recuperação de casas velhas, remodelações de vivendas e isolamento térmico",
    population: 46200,
    geo: { lat: "40.5758", lng: "-8.4447" },
    isNeighboringCounty: true,
  },
  {
    slug: "estarreja",
    name: "Estarreja",
    fullName: "Concelho de Estarreja",
    description: "Concelho a norte de Aveiro com procura expressiva de aplicação de capoto ETICS, obras de casas de banho, cozinhas e reparações de telhados",
    population: 26300,
    geo: { lat: "40.7533", lng: "-8.5694" },
    isNeighboringCounty: true,
  },
  {
    slug: "vagos",
    name: "Vagos",
    fullName: "Concelho de Vagos",
    description: "Concelho a sul de Aveiro com abundância de moradias térreas, vivendas familiares e reabilitação de habitações antigas",
    population: 23100,
    geo: { lat: "40.5539", lng: "-8.6811" },
    isNeighboringCounty: true,
  },
  {
    slug: "praia-da-barra-costa-nova",
    name: "Praia da Barra e Costa Nova",
    fullName: "Frente Costeira da Barra e Costa Nova",
    description: "Zona balnear de prestígio com exposição severa à maresia e humidade atlântica, exigindo caixilharia de corte térmico, impermeabilizações marítimas e remodelações de apartamentos de férias",
    population: 8500,
    geo: { lat: "40.6417", lng: "-8.7486" },
    isNeighboringCounty: true,
  },
];

// ============================================================
// GOOGLE REVIEWS
// ============================================================
export interface Review {
  id: string;
  name: string;
  parish: string;
  rating: number;
  date: string;
  text: string;
  service: string;
  verified: boolean;
}

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Maria Sousa",
    parish: "Esgueira",
    rating: 5,
    date: "2025-01-15",
    text: "Excelente trabalho! O Jorge e a sua equipa remodelaram a nossa moradia em tempo record. Materiais de qualidade, limpeza impecável e preço justo. Recomendo a 100%!",
    service: "Remodelação Geral",
    verified: true,
  },
  {
    id: "r2",
    name: "António Costa",
    parish: "Aradas",
    rating: 5,
    date: "2024-10-08",
    text: "Limpeza de telhado impecável. O telhado ficou como novo e o Jorge deu uma resposta muito rápida com um preço justo.",
    service: "Infiltrações & Telhados",
    verified: true,
  },
  {
    id: "r3",
    name: "Carla Ferreira",
    parish: "Glória e Vera Cruz",
    rating: 5,
    date: "2026-02-02",
    text: "Fizemos a aplicação de capoto e pintura da fachada. O isolamento térmico melhorou imenso e a fachada ficou espetacular!",
    service: "Pintura & Capoto",
    verified: true,
  },
  {
    id: "r4",
    name: "Pedro Rodrigues",
    parish: "Cácia",
    rating: 5,
    date: "2024-08-14",
    text: "Infiltrações no telhado resolvidas definitivamente. Excelente relação qualidade/preço e total profissionalismo do Empreiteiro Jorge Freitas.",
    service: "Infiltrações & Telhados",
    verified: true,
  },
  {
    id: "r5",
    name: "Sofia Lopes",
    parish: "São Bernardo",
    rating: 5,
    date: "2023-11-20",
    text: "Instalação elétrica completa na moradia. Trabalho muito bem feito, organizado e cumprindo escrupulosamente o orçamento.",
    service: "Eletricidade",
    verified: true,
  },
  {
    id: "r6",
    name: "Rui Mendes",
    parish: "Santa Joana",
    rating: 5,
    date: "2024-05-12",
    text: "Equipa muito competente e pontual. Orçamento justo e serviço de canalização urgente resolvido com mestria.",
    service: "Canalização & Fugas",
    verified: true,
  },
];

// ============================================================
// TRUST BADGES
// ============================================================
export const TRUST_BADGES = [
  {
    id: "tb1",
    icon: "ShieldCheck",
    label: "Alvará de Construção Válido",
    sublabel: "Empresa Licenciada",
  },
  {
    id: "tb2",
    icon: "Star",
    label: "4.9/5 no Google",
    sublabel: "+48 Avaliações Reais",
  },
  {
    id: "tb3",
    icon: "CreditCard",
    label: "Crédito Obras 100% Grátis",
    sublabel: "Intermediação Parceira",
  },
  {
    id: "tb4",
    icon: "User",
    label: "Jorge Freitas",
    sublabel: "Supervisão Direta",
  },
  {
    id: "tb5",
    icon: "CheckCircle",
    label: "+100 Obras Concluídas",
    sublabel: "Em Aveiro e Arredores",
  },
  {
    id: "tb6",
    icon: "Clock",
    label: "Resposta até 12h",
    sublabel: "Atendimento Rápido",
  },
  {
    id: "tb7",
    icon: "FileText",
    label: "Preços Justos",
    sublabel: "Orçamento Transparente",
  },
];

// ============================================================
// CREDIT INTERMEDIATION PARTNER INFO
// ============================================================
export const CREDIT_PARTNER_INFO = {
  title: "Apoio a Crédito e Financiamento para Obras",
  serviceName: "Intermediação de Crédito para Obras e Remodelações",
  shortBadge: "100% Gratuito para o Cliente",
  summary:
    "Dispomos de serviço parceiro de intermediação de crédito devidamente registado e autorizado pelo Banco de Portugal, especializado em soluções de financiamento para obras, remodelações e melhoria energética de habitações.",
  advantages: [
    {
      title: "100% Gratuito (0€ de Comissão)",
      desc: "O serviço de intermediação de crédito não tem qualquer custo para o cliente. Não cobramos honorários de consultoria.",
    },
    {
      title: "Comparação em Vários Bancos",
      desc: "Negociação com os principais bancos e instituições financeiras em Portugal para garantir a taxa de juro mais baixa e as melhores condições.",
    },
    {
      title: "Soluções Específicas para Obras",
      desc: "Crédito pessoal para remodelações de curto/médio prazo (cozinhas, WCs, telhados) ou reforço hipotecário para grandes remodelações de moradias.",
    },
    {
      title: "Sem Burocracia & Resposta em 24-48h",
      desc: "Acompanhamento integral desde a recolha documental até à aprovação e libertação do capital para início da obra.",
    },
    {
      title: "Prazos Flexíveis",
      desc: "Mensalidades ajustadas ao seu rendimento com prazos de 12 a 84/120 meses para crédito pessoal ou prazos alargados em crédito habitação.",
    },
  ],
};

// ============================================================
// FAQ DATA
// ============================================================
export const FAQ_ITEMS = [
  {
    id: "faq1",
    question: "A Freitas Renovações é uma empresa licenciada?",
    answer:
      "Sim. A Freitas Renovações LDA é uma empresa devidamente licenciada com Alvará de Construção válido e seguro de responsabilidade civil para execução de trabalhos em Aveiro.",
  },
  {
    id: "faq2",
    question: "Ajudam com crédito ou financiamento para pagar a obra?",
    answer:
      "Sim! Oferecemos um serviço de intermediação de crédito parceiro 100% gratuito para os nossos clientes. Através de intermediários de crédito registados no Banco de Portugal, analisamos o seu processo, comparamos as melhores propostas bancárias do mercado e ajudamos a aprovar o financiamento para a sua obra (remodelação total, cozinha, casa de banho, capoto ou telhado) com a mensalidade e taxas mais vantajosas, sem qualquer encargo extra para si.",
  },
  {
    id: "faq3",
    question: "Qual é o tempo de resposta aos pedidos de orçamento?",
    answer:
      "Garantimos uma resposta rápida a todos os contactos, com retorno no prazo máximo de 12 horas.",
  },
  {
    id: "faq4",
    question: "O orçamento é gratuito e sem compromisso?",
    answer:
      "Sim, totalmente! O orçamento é sempre gratuito, detalhado e com preços justos e transparentes.",
  },
  {
    id: "faq5",
    question: "Quais as áreas de atuação da Freitas Renovações?",
    answer:
      "Trabalhamos em todo o município de Aveiro, incluindo Glória e Vera Cruz, Esgueira, Aradas, Cácia, São Bernardo, Santa Joana, Oliveirinha e freguesias circundantes.",
  },
  {
    id: "faq6",
    question: "Os trabalhos têm garantia?",
    answer:
      "Sim, todos os nossos trabalhos têm garantia formalizada por escrito. A duração varia consoante o tipo de obra executada.",
  },
  {
    id: "faq7",
    question: "Como garantem preços justos em cada obra?",
    answer:
      "Apresentamos orçamentos discriminados por materiais e mão de obra, sem margens inflacionadas nem custos surpresa.",
  },
];

// ============================================================
// STEP FORM DATA
// ============================================================
export const URGENCY_OPTIONS = [
  {
    id: "emergency",
    label: "Urgência / Imediato",
    description: "Preciso de ajuda o mais rápido possível",
    color: "red",
    emoji: "🔴",
  },
  {
    id: "this-week",
    label: "Esta Semana",
    description: "Nos próximos dias",
    color: "yellow",
    emoji: "🟡",
  },
  {
    id: "planned",
    label: "Planeado para Breve",
    description: "Sem urgência imediata",
    color: "green",
    emoji: "🟢",
  },
];
