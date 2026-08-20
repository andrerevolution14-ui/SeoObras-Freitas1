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
  email: "geral@freitasrenovacoes.pt",
  website: "https://freitasrenovacoes.pt",
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
    title: "Remodelação Geral",
    shortTitle: "Remodelação",
    description:
      "Transformamos a sua casa com materiais de qualidade, preços justos e acabamentos de excelência.",
    longDescription:
      "A nossa equipa especializada realiza obras completas de remodelação residencial e comercial em Aveiro. Desde a conceção até ao acabamento final, garantimos qualidade, transparência, preços justos e pontualidade.",
    icon: "Home",
    emergencyAvailable: false,
    keywords: ["remodelação", "obras", "renovação", "reforma", "aveiro"],
    features: [
      "Projeto completo de remodelação",
      "Demolição e estrutura",
      "Revestimentos e acabamentos",
      "Instalações elétricas e canalizações",
      "Pintura e estucagem",
      "Coordenação total da obra",
    ],
  },
  {
    slug: "canalizacao",
    title: "Canalização & Fugas",
    shortTitle: "Canalização",
    description:
      "Reparação de fugas, entupimentos e instalação de novas canalizações com rapidez e preço justo.",
    longDescription:
      "Serviço de canalização profissional em Aveiro e freguesias. Detetamos e reparamos fugas de água, entupimentos, rebentamentos de tubagens e avarias em sistemas de esgoto com resposta rápida.",
    icon: "Droplets",
    emergencyAvailable: true,
    keywords: ["canalizador", "canalização", "fugas", "entupimentos", "aveiro"],
    features: [
      "Deteção de fugas sem estragos desnecessários",
      "Reparação de tubagens",
      "Desentupimentos rápidos",
      "Instalação de sistemas novos",
      "Verificação de pressão",
      "Preços justos e sem surpresas",
    ],
  },
  {
    slug: "eletricidade",
    title: "Eletricidade",
    shortTitle: "Eletricidade",
    description:
      "Instalações elétricas certificadas, quadros elétricos, tomadas e iluminação com total segurança.",
    longDescription:
      "Realizamos todas as intervenções elétricas certificadas em Aveiro. Instalação de quadros elétricos, tomadas, interruptores, iluminação LED e reparações elétricas urgentes.",
    icon: "Zap",
    emergencyAvailable: true,
    keywords: ["eletricista", "eletricidade", "instalações elétricas", "aveiro"],
    features: [
      "Instalações elétricas completas",
      "Quadros elétricos",
      "Iluminação LED",
      "Resolução de avarias",
      "Preços transparentes",
    ],
  },
  {
    slug: "infiltracoes-telhados",
    title: "Infiltrações & Telhados",
    shortTitle: "Telhados",
    description:
      "Impermeabilização, limpeza de telhados e reparação de infiltrações em coberturas e terraços.",
    longDescription:
      "Especializamo-nos na limpeza de telhados, impermeabilização e resolução definitiva de infiltrações em Aveiro. Trabalhamos em telhados, terraços e paredes exteriores com garantia adaptada a cada obra.",
    icon: "CloudRain",
    emergencyAvailable: true,
    keywords: ["infiltrações", "telhados", "limpeza telhados", "impermeabilização", "aveiro"],
    features: [
      "Limpeza e lavagem de telhados",
      "Impermeabilização de terraços",
      "Reparação de infiltrações",
      "Tratamento de telhas e algerozes",
      "Garantia adequada a cada obra",
    ],
  },
  {
    slug: "pintura-capoto",
    title: "Pintura & Capoto",
    shortTitle: "Pintura",
    description:
      "Pintura interior e exterior, aplicação de capoto ETICS para isolamento térmico e fachadas renovadas.",
    longDescription:
      "Serviço completo de pintura e revestimento de fachadas em Aveiro. Pintura interior com acabamentos de qualidade, pintura exterior, e aplicação de sistema ETICS/Capoto com preços justos.",
    icon: "Paintbrush",
    emergencyAvailable: false,
    keywords: ["pintura", "capoto", "fachadas", "isolamento", "aveiro"],
    features: [
      "Pintura interior completa",
      "Pintura de fachadas",
      "Sistema ETICS / Capoto",
      "Isolamento térmico eficiente",
      "Tintas de alta durabilidade",
    ],
  },
  {
    slug: "isolamentos",
    title: "Isolamentos",
    shortTitle: "Isolamentos",
    description:
      "Isolamento térmico e acústico de paredes, pavimentos e coberturas para maior conforto e poupança.",
    longDescription:
      "Soluções completas de isolamento térmico e acústico para habitações em Aveiro. Redução no consumo energético com materiais eficientes e orçamentos justos.",
    icon: "Layers",
    emergencyAvailable: false,
    keywords: ["isolamento térmico", "isolamento acústico", "poupança energia", "aveiro"],
    features: [
      "Isolamento de paredes",
      "Isolamento de coberturas",
      "Isolamento de pavimentos",
      "Eficiência energética",
      "Isolamento acústico",
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
}

export const REAL_PROJECTS: RealProject[] = [
  {
    id: "p1",
    title: "Remodelação Completa de Moradia",
    service: "Remodelação Geral",
    parish: "Esgueira, Aveiro",
    year: "2025",
    image: "/moradia1.jpg",
    hasBeforeAfter: false,
    description: "Remodelação integral de espaços interiores, renovação de pisos, tectos falsos e pintura geral.",
  },
  {
    id: "p2",
    title: "Limpeza e Manutenção de Telhado",
    service: "Infiltrações & Telhados",
    parish: "Aradas, Aveiro",
    year: "2024",
    image: "/LimpezaT1.jpg",
    hasBeforeAfter: false,
    description: "Lavagem de alta pressão de cobertura, remoção de musgos e impermeabilização protetora.",
  },
  {
    id: "p3",
    title: "Capoto + Pintura de Fachada",
    service: "Pintura & Capoto",
    parish: "Glória e Vera Cruz, Aveiro",
    year: "2026",
    image: "/capoto SEM Before.avif",
    hasBeforeAfter: false,
    description: "Aplicação do sistema ETICS/Capoto para isolamento térmico exterior com pintura final de alta resistência.",
  },
  {
    id: "p4",
    title: "Instalação Elétrica Completa",
    service: "Eletricidade",
    parish: "São Bernardo, Aveiro",
    year: "2023",
    image: "/eletrica1.jfif",
    hasBeforeAfter: false,
    description: "Renovação integral da rede elétrica, montagem de novo quadro elétrico, iluminação LED e tomadas.",
  },
];

// ============================================================
// PARISHES
// ============================================================
export interface Parish {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  population: number;
  geo: { lat: string; lng: string };
}

export const PARISHES: Parish[] = [
  {
    slug: "gloria-e-vera-cruz",
    name: "Glória e Vera Cruz",
    fullName: "União de Freguesias de Glória e Vera Cruz",
    description: "Zona histórica e comercial do centro de Aveiro",
    population: 15800,
    geo: { lat: "40.6405", lng: "-8.6538" },
  },
  {
    slug: "esgueira",
    name: "Esgueira",
    fullName: "Freguesia de Esgueira",
    description: "Freguesia a norte do centro de Aveiro, com forte componente residencial",
    population: 12500,
    geo: { lat: "40.6535", lng: "-8.6457" },
  },
  {
    slug: "aradas",
    name: "Aradas",
    fullName: "Freguesia de Aradas",
    description: "Zona residencial tranquila a sul de Aveiro",
    population: 9200,
    geo: { lat: "40.6290", lng: "-8.6441" },
  },
  {
    slug: "cacia",
    name: "Cácia",
    fullName: "Freguesia de Cácia",
    description: "Zona industrial e residencial a norte de Aveiro",
    population: 8700,
    geo: { lat: "40.6752", lng: "-8.5956" },
  },
  {
    slug: "sao-bernardo",
    name: "São Bernardo",
    fullName: "Freguesia de São Bernardo",
    description: "Área residencial moderna junto à Universidade de Aveiro",
    population: 7300,
    geo: { lat: "40.6282", lng: "-8.6560" },
  },
  {
    slug: "santa-joana",
    name: "Santa Joana",
    fullName: "Freguesia de Santa Joana",
    description: "Freguesia a leste do centro de Aveiro",
    population: 5600,
    geo: { lat: "40.6445", lng: "-8.6294" },
  },
  {
    slug: "oliveirinha",
    name: "Oliveirinha",
    fullName: "Freguesia de Oliveirinha",
    description: "Área suburbana a sul de Aveiro",
    population: 6100,
    geo: { lat: "40.6080", lng: "-8.6377" },
  },
  {
    slug: "eixo",
    name: "Eixo",
    fullName: "Freguesia de Eixo",
    description: "Zona residencial entre Aveiro e Águeda",
    population: 4800,
    geo: { lat: "40.6197", lng: "-8.5924" },
  },
  {
    slug: "requeixo",
    name: "Requeixo",
    fullName: "Freguesia de Requeixo",
    description: "Pequena freguesia junto à Ria de Aveiro",
    population: 3200,
    geo: { lat: "40.6597", lng: "-8.5790" },
  },
  {
    slug: "nariz",
    name: "Nariz",
    fullName: "Freguesia de Nariz",
    description: "Zona rural e residencial no município de Aveiro",
    population: 2100,
    geo: { lat: "40.5990", lng: "-8.5807" },
  },
  {
    slug: "eirol",
    name: "Eirol",
    fullName: "Freguesia de Eirol",
    description: "Freguesia rural a oeste de Aveiro",
    population: 1800,
    geo: { lat: "40.6470", lng: "-8.7050" },
  },
  {
    slug: "sao-jacinto",
    name: "São Jacinto",
    fullName: "Freguesia de São Jacinto",
    description: "Zona costeira da Reserva Natural das Dunas de São Jacinto",
    population: 1500,
    geo: { lat: "40.6724", lng: "-8.7411" },
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
    icon: "User",
    label: "Jorge Freitas",
    sublabel: "Supervisão Direta",
  },
  {
    id: "tb4",
    icon: "CheckCircle",
    label: "+100 Obras Concluídas",
    sublabel: "Em Aveiro e Arredores",
  },
  {
    id: "tb5",
    icon: "Clock",
    label: "Resposta até 12h",
    sublabel: "Atendimento Rápido",
  },
  {
    id: "tb6",
    icon: "FileText",
    label: "Preços Justos",
    sublabel: "Orçamento Transparente",
  },
];

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
    question: "Qual é o tempo de resposta aos pedidos de orçamento?",
    answer:
      "Garantimos uma resposta rápida a todos os contactos, com retorno no prazo máximo de 12 horas.",
  },
  {
    id: "faq3",
    question: "O orçamento é gratuito e sem compromisso?",
    answer:
      "Sim, totalmente! O orçamento é sempre gratuito, detalhado e com preços justos e transparentes.",
  },
  {
    id: "faq4",
    question: "Quais as áreas de atuação da Freitas Renovações?",
    answer:
      "Trabalhamos em todo o município de Aveiro, incluindo Glória e Vera Cruz, Esgueira, Aradas, Cácia, São Bernardo, Santa Joana, Oliveirinha e freguesias circundantes.",
  },
  {
    id: "faq5",
    question: "Os trabalhos têm garantia?",
    answer:
      "Sim, todos os nossos trabalhos têm garantia formalizada por escrito. A duração varia consoante o tipo de obra executada.",
  },
  {
    id: "faq6",
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
