// ============================================================
// lib/projects-data.ts — Dados Ricos de Obras Reais, Preços m²,
// Planificador, Verdemont e Guias de Renovações em Aveiro
// ============================================================

export interface PastDetailedProject {
  id: string;
  title: string;
  category: "casa-de-banho" | "cozinha" | "remodelacao-total" | "capoto" | "telhado" | "eletricidade-canalizacao";
  categoryLabel: string;
  parish: string;
  year: string;
  areaM2: number;
  realPrice: number;
  pricePerM2: number;
  durationDays: number;
  image: string;
  altText: string;
  description: string;
  includedScope: string[];
  materialsUsed: string[];
  costBreakdown: {
    labor: number;      // percentagem
    materials: number;  // percentagem
    wasteAndPermits: number; // percentagem
  };
}

export const PAST_DETAILED_PROJECTS: PastDetailedProject[] = [
  {
    id: "proj-wc-20m2-aveiro",
    title: "Remodelação Completa de Casa de Banho (20 m²)",
    category: "casa-de-banho",
    categoryLabel: "Casa de Banho",
    parish: "Esgueira, Aveiro",
    year: "2025",
    areaM2: 20,
    realPrice: 3450,
    pricePerM2: 172.5,
    durationDays: 7,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
    altText: "Remodelação completa de casa de banho de 20m2 em Esgueira Aveiro com base de duche italiana e móvel suspenso",
    description: "Transformação integral de casa de banho com 20m² em moradia familiar. Substituição total de canalização de chumbo por multicamada, nova impermeabilização e loiças de design contemporâneo a preço económico.",
    includedScope: [
      "Demolição de banheira antiga, loiças e azulejos deteriorados",
      "Substituição integral da canalização de água e ramais de esgoto (PEX/Multicamada)",
      "Impermeabilização contínua com membrana líquida em toda a zona de duche",
      "Assentamento de cerâmica retificada com cimento-cola flexível",
      "Instalação de base de duche mineral extraplana antiderrapante",
      "Resguardo em vidro temperado de 8mm com tratamento anti-calcário",
      "Móvel suspenso com lavatório de pousar e sanita compacta Rimless",
      "Teto falso em gesso cartonado hidrófugo com focos LED embutidos 3000K",
    ],
    materialsUsed: [
      "Cerâmica porcelânica retificada",
      "Tubagem multicamada com isolamento térmico",
      "Argamassa impermeabilizante bicomponente",
      "Torneiras monomando acabamento preto mate anti-risco",
    ],
    costBreakdown: {
      labor: 45,
      materials: 48,
      wasteAndPermits: 7,
    },
  },
  {
    id: "proj-cozinha-15m2-aveiro",
    title: "Renovação Completa de Cozinha Moderna (15 m²)",
    category: "cozinha",
    categoryLabel: "Cozinha",
    parish: "Glória e Vera Cruz, Aveiro",
    year: "2025",
    areaM2: 15,
    realPrice: 4100,
    pricePerM2: 273.3,
    durationDays: 10,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80",
    altText: "Remodelação de cozinha moderna 15m2 em Glória e Vera Cruz Aveiro com bancada em quartzo e armários lacados",
    description: "Conceito funcional com armários lacados por medida até ao teto, bancada de quartzo resistente e integração harmoniosa com preço muito competitivo.",
    includedScope: [
      "Desmontagem e remoção da cozinha antiga com transporte a vazadouro autorizado",
      "Adaptação de pontos de água, esgotos e reforço de circuitos elétricos dedicados",
      "Fabricação e montagem de armários em MDF hidrófugo lacado a branco acetinado",
      "Fornecimento e corte de bancada em pedra de quartzo com escorredor esculpido",
      "Aplicação de revestimento tipo Metro Tile entre bancada e móveis superiores",
      "Teto falso com sanca de iluminação LED indireta sobre a área de bancada",
    ],
    materialsUsed: [
      "MDF Hidrófugo lacado",
      "Bancada em quartzo compacto de alta densidade",
      "Corrediças e dobradiças com fecho amortecido soft-close",
      "Lava-louça sob tampo em aço inoxidável 18/10",
    ],
    costBreakdown: {
      labor: 40,
      materials: 53,
      wasteAndPermits: 7,
    },
  },
  {
    id: "proj-t2-85m2-aveiro",
    title: "Remodelação Integral Chave-na-Mão T2 (85 m²)",
    category: "remodelacao-total",
    categoryLabel: "Remodelação Total",
    parish: "Aradas, Aveiro",
    year: "2026",
    areaM2: 85,
    realPrice: 22800,
    pricePerM2: 268.2,
    durationDays: 32,
    image: "/moradia1.jpg",
    altText: "Obras de remodelação total de apartamento T2 85m2 em Aradas Aveiro chave na mão pelo Empreiteiro Jorge Freitas",
    description: "Reabilitação profunda de apartamento antigo. Criação de conceito open space sala/cozinha, renovação de todas as redes técnicas, piso flutuante e novas portas interiores com custo otimizado.",
    includedScope: [
      "Derrube de parede divisória entre sala e cozinha para criar Open Space luminoso",
      "Substituição total de fiação elétrica e montagem de quadro com diferenciais",
      "Nova rede de águas e esgotos para cozinha e 2 casas de banho",
      "Instalação de piso flutuante AC5 de alta resistência com manta acústica",
      "Substituição de portas interiores por modelos lisos lacados em branco",
      "Estucagem geral e pintura de paredes e tetos com tinta lavável CIN",
      "Renovação completa de WC suite e WC de serviço",
    ],
    materialsUsed: [
      "Pavimento laminado AC5 resistente à água",
      "Tintas laváveis anti-humidade e anti-fungos CIN",
      "Mecanismos elétricos modulares Efapel",
      "Portas interiores alveolares lacadas com fecho magnético",
    ],
    costBreakdown: {
      labor: 48,
      materials: 46,
      wasteAndPermits: 6,
    },
  },
  {
    id: "proj-capoto-160m2-aveiro",
    title: "Isolamento Térmico Capoto ETICS em Moradia (160 m²)",
    category: "capoto",
    categoryLabel: "Pintura & Capoto",
    parish: "São Bernardo, Aveiro",
    year: "2026",
    areaM2: 160,
    realPrice: 5120,
    pricePerM2: 32.0,
    durationDays: 9,
    image: "/capoto SEM Before.avif",
    altText: "Aplicação de sistema ETICS Capoto 160m2 em fachada de moradia em São Bernardo Aveiro com isolamento térmico EPS",
    description: "Aplicação do sistema Capoto pelo exterior para eliminar pontes térmicas, salitre e humidades frequentes devido ao clima húmido e maresia do concelho de Aveiro a preço de fábrica.",
    includedScope: [
      "Lavagem mecânica prévia da fachada e tratamento fungicida biocida",
      "Colagem de placas de EPS com grafite com cimento-cola polimérico",
      "Fixação mecânica com buchas de isolamento térmico",
      "Aplicação de rede de fibra de vidro de 160g/m² com duplo barramento",
      "Reforço de perfis de canto com rede em todas as arestas e janelas",
      "Pintura final com revestimento acrílico repelente de água e resistente à salinidade",
    ],
    materialsUsed: [
      "Placas EPS Grafitado",
      "Argamassa polimérica flexível certificada ETAG",
      "Rede de fibra de vidro anti-álcalis",
      "Tinta de silicone exterior de máxima hidrorrepelência",
    ],
    costBreakdown: {
      labor: 42,
      materials: 52,
      wasteAndPermits: 6,
    },
  },
  {
    id: "proj-telhado-120m2-aveiro",
    title: "Limpeza, Revisão e Impermeabilização de Telhado (120 m²)",
    category: "telhado",
    categoryLabel: "Telhados & Infiltrações",
    parish: "Santa Joana, Aveiro",
    year: "2025",
    areaM2: 120,
    realPrice: 1680,
    pricePerM2: 14.0,
    durationDays: 2,
    image: "/LimpezaT1.jpg",
    altText: "Limpeza e impermeabilização de telhado cerâmico 120m2 em Santa Joana Aveiro com eliminação de infiltrações",
    description: "Intervenção preventiva e corretiva para estancar goteiras no sótão. Lavagem completa com alta pressão, substituição de telhas partidas e impermeabilização de algerozes.",
    includedScope: [
      "Lavagem integral da cobertura com jato de alta pressão regulado",
      "Remoção profunda de líquenes, musgos e detritos de pinhal",
      "Substituição de telhas cerâmicas fraturadas ou porosas",
      "Revisão e vedação das juntas em chaminés e caleiras com mástique de poliuretano",
      "Impermeabilização de algerozes com tela líquida elastomérica armada",
      "Aplicação de hidrofugante impermeabilizante incolor repelente de água",
    ],
    materialsUsed: [
      "Telhas cerâmicas tipo Lusa idênticas às originais",
      "Membrana impermeabilizante líquida com fibras",
      "Selante elastomérico de poliuretano",
      "Hidrófugo de base silano/siloxano respirável",
    ],
    costBreakdown: {
      labor: 55,
      materials: 38,
      wasteAndPermits: 7,
    },
  },
  {
    id: "proj-wc-social-8m2-aveiro",
    title: "Remodelação Casa de Banho Suite Compacta (8 m²)",
    category: "casa-de-banho",
    categoryLabel: "Casa de Banho",
    parish: "Cácia, Aveiro",
    year: "2024",
    areaM2: 8,
    realPrice: 1850,
    pricePerM2: 231.2,
    durationDays: 4,
    image: "/r5.jfif",
    altText: "Remodelação de casa de banho suite compacta 8m2 em Cácia Aveiro com base de duche e azulejos modernos",
    description: "Otimização de espaço reduzido transformando um WC escuro numa suite moderna, luminosa e fácil de limpar com custo ultra económico.",
    includedScope: [
      "Substituição de base de duche antiga por modelo extraplano",
      "Nova torneira termostática com chuveiro de efeito chuva",
      "Revestimento vinílico sobreposto resistente a humidade direta",
      "Instalação de sanita suspensa com autoclismo embutido na parede",
      "Espelho com luz LED frontal anti-embaciamento e armário de arrumação",
    ],
    materialsUsed: [
      "Piso vinílico SPC acústico 100% à prova de água",
      "Torneira termostática economizadora",
      "Autoclismo de encastrar com placa de comando cromada",
    ],
    costBreakdown: {
      labor: 47,
      materials: 47,
      wasteAndPermits: 6,
    },
  },
];

// ============================================================
// PREÇOS MÉDIOS POR M² EM AVEIRO (Tabela Oficial de Referência)
// ============================================================
export interface AveragePriceRow {
  service: string;
  unit: string;
  lowCostRange: string;
  standardRange: string;
  premiumRange: string;
  notes: string;
}

export const AVERAGE_PRICES_AVEIRO: AveragePriceRow[] = [
  {
    service: "Remodelação Geral Chave-na-Mão",
    unit: "€ / m²",
    lowCostRange: "190€ – 260€",
    standardRange: "280€ – 420€",
    premiumRange: "480€ – 750€",
    notes: "Inclui demolições, redes de água/eletricidade, pisos, portas e pintura geral.",
  },
  {
    service: "Remodelação de Casa de Banho",
    unit: "€ / obra (ou m²)",
    lowCostRange: "1.400€ – 2.100€",
    standardRange: "2.400€ – 3.600€",
    premiumRange: "4.200€ – 6.200€",
    notes: "Varia consoante canalização nova, base de duche italiana e loiças suspensas.",
  },
  {
    service: "Remodelação de Cozinha",
    unit: "€ / obra",
    lowCostRange: "2.100€ – 3.200€",
    standardRange: "3.500€ – 5.400€",
    premiumRange: "6.000€ – 9.500€",
    notes: "Inclui móveis à medida, bancada em pedra/quartzo e novas redes elétricas.",
  },
  {
    service: "Isolamento Térmico Capoto (ETICS)",
    unit: "€ / m²",
    lowCostRange: "28€ – 34€",
    standardRange: "35€ – 44€",
    premiumRange: "46€ – 58€",
    notes: "Espessuras 60mm a 100mm grafitado. Fundamental para o clima húmido de Aveiro.",
  },
  {
    service: "Pintura Interior (Tetos e Paredes)",
    unit: "€ / m²",
    lowCostRange: "5€ – 7€",
    standardRange: "8€ – 11€",
    premiumRange: "12€ – 16€",
    notes: "Com preparação de superfícies, barramento de fissuras e tintas laváveis CIN.",
  },
  {
    service: "Pavimento Flutuante / Vinílico SPC",
    unit: "€ / m² instalado",
    lowCostRange: "14€ – 18€",
    standardRange: "20€ – 28€",
    premiumRange: "30€ – 45€",
    notes: "Inclui manta isolante acústica de alta densidade e rodapés lacados a branco.",
  },
  {
    service: "Tetos Falsos em Pladur com Isolamento",
    unit: "€ / m²",
    lowCostRange: "16€ – 22€",
    standardRange: "24€ – 32€",
    premiumRange: "35€ – 48€",
    notes: "Gesso cartonado hidrófugo com lã de rocha para isolamento térmico e acústico.",
  },
  {
    service: "Lavagem e Impermeabilização de Telhados",
    unit: "€ / m²",
    lowCostRange: "9€ – 13€",
    standardRange: "14€ – 19€",
    premiumRange: "20€ – 28€",
    notes: "Eliminação de musgos da ria, substituição de telhas e telas em caleiras.",
  },
];

// ============================================================
// PLANIFICADOR INTERATIVO: Passos Essenciais para Renovação
// ============================================================
export interface RenovationStepItem {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  tipsAveiro: string;
  estimatedDuration: string;
}

export interface RenovationCategorySteps {
  category: string;
  title: string;
  description: string;
  steps: RenovationStepItem[];
}

export const RENOVATION_PLANNER_DATA: Record<string, RenovationCategorySteps> = {
  "casa-de-banho": {
    category: "casa-de-banho",
    title: "Planificador: Quero Renovar a Casa de Banho",
    description: "Siga o roteiro passo a passo testado em mais de 100 casas de banho em Aveiro para garantir uma obra sem dores de cabeça.",
    steps: [
      {
        number: 1,
        title: "Diagnóstico, Medição & Necessidades",
        subtitle: "Medir área útil, pé-direito e inspecionar canalização existente",
        description: "Avalie se as paredes apresentam humidade por capilaridade ou condensação. Verifique se os canos são de ferro/chumbo antigo — se tiverem mais de 20 anos, substitua-os obrigatoriamente.",
        tipsAveiro: "Em Aveiro, o ar salino acelera a corrosão de canos metálicos antigos. A substituição por multicamada evita ter de abrir a casa de banho novamente daqui a 3 anos.",
        estimatedDuration: "1 a 2 dias",
      },
      {
        number: 2,
        title: "Escolha de Estilo & Seleção de Materiais",
        subtitle: "Loiças, base de duche, torneiras e cerâmicas",
        description: "Defina a disposição espacial: substituir banheira por duche raso liberta até 40% de circulação. Escolha cerâmica retificada de baixa porosidade e torneiras economizadoras com certificação.",
        tipsAveiro: "Opte por cimento-cola flexível C2TE S1 e juntas epóxi ou hidrófugas para que os azulejos nunca ganhem fungos com a humidade típica da ria.",
        estimatedDuration: "2 a 4 dias",
      },
      {
        number: 3,
        title: "Pedido e Comparação de Orçamentos",
        subtitle: "Exigir orçamento discriminado por materiais e mão de obra",
        description: "Peça um orçamento com alvará IMPIC e seguros válidos. Recuse orçamentos com valor único vago. Na Freitas Renovações, o Jorge Freitas entrega o orçamento detalhado em menos de 12 horas.",
        tipsAveiro: "Confirme se o orçamento inclui o transporte e taxa de vazadouro de entulho licenciado em Aveiro para não ter surpresas legais.",
        estimatedDuration: "1 a 3 dias",
      },
      {
        number: 4,
        title: "Demolição Segura & Preparação",
        subtitle: "Proteção de zonas comuns e remoção de entulho",
        description: "Corte das águas parciais, proteção do chão do corredor e demolição controlada das loiças antigas e rebocos soltos.",
        tipsAveiro: "Aviso prévio aos vizinhos de condomínio em Aveiro sobre o ruído entre as 08h e as 18h conforme o Regulamento Geral do Ruído.",
        estimatedDuration: "1 a 2 dias de obra",
      },
      {
        number: 5,
        title: "Rede Técnica & Impermeabilização Crítica",
        subtitle: "Canalização multicamada, esgotos e tela impermeável",
        description: "Instalação de novas tubagens sem uniões embutidas no piso. Aplicação de 2 a 3 demãos cruzadas de membrana impermeável líquida nas paredes e chão da zona de banho com bandas elásticas nos cantos.",
        tipsAveiro: "O teste de estanquidade com pressão é obrigatório antes de assentar qualquer azulejo.",
        estimatedDuration: "2 a 3 dias de obra",
      },
      {
        number: 6,
        title: "Assentamento de Cerâmica & Rejuntamento",
        subtitle: "Revestimentos, tetos falsos e pavimentos",
        description: "Aplicação dos azulejos e chão com espaçadores niveladores, seguido de betumação com rejunte anti-bolor. Montagem de teto falso hidrófugo com pontos de luz LED.",
        tipsAveiro: "A ventilação forçada com extrator elétrico temporizado é essencial em apartamentos sem janela direta em Aveiro.",
        estimatedDuration: "2 a 3 dias de obra",
      },
      {
        number: 7,
        title: "Montagem de Loiças, Acessórios & Vistoria",
        subtitle: "Instalação de resguardo, móvel, sanita e limpeza final",
        description: "Fixação do móvel suspenso, torneiras, espelho, resguardo de vidro temperado e sanita. Teste de caudal e escoamento na presença do empreiteiro Jorge Freitas.",
        tipsAveiro: "Vistoria final com entrega da garantia contratual por escrito e certificado dos materiais aplicados.",
        estimatedDuration: "1 dia de obra",
      },
    ],
  },
  "cozinha": {
    category: "cozinha",
    title: "Planificador: Quero Renovar a Cozinha",
    description: "Do conceito funcional à bancada duradoura. O roteiro completo para otimizar o espaço central da sua habitação em Aveiro.",
    steps: [
      {
        number: 1,
        title: "Triângulo de Trabalho & Layout Funcional",
        subtitle: "Frigorífico, lava-louça e placa de confeção",
        description: "Defina o fluxo de preparação de alimentos. Em cozinhas de Aveiro, a abertura para a sala (Open Space) é a opção mais procurada e a que mais valoriza o imóvel.",
        tipsAveiro: "Se tiver paredes mestras ou pilares do prédio, a intervenção tem de respeitar a integridade estática sem afetar vizinhos.",
        estimatedDuration: "2 a 3 dias",
      },
      {
        number: 2,
        title: "Escolha de Bancada e Armários",
        subtitle: "Materiais resistentes a gordura, água e calor",
        description: "Bancadas em Silestone, Dekton ou Granito Nacional oferecem longevidade máxima contra riscos e calor. Armários em MDF hidrófugo com interiores de alta densidade.",
        tipsAveiro: "Evite aglomerados comuns não hidrófugos em zonas litorais como Aveiro, pois incham rapidamente com o vapor de água.",
        estimatedDuration: "3 a 5 dias",
      },
      {
        number: 3,
        title: "Circuito Elétrico & Tomadas Estratégicas",
        subtitle: "Linhas dedicadas para forno, placa de indução e máquina de lavar",
        description: "O maior erro em cozinhas antigas é ligar eletrodomésticos potentes a circuitos partilhados. Dimensionamos cabos de 4mm e 6mm com disjuntores independentes no quadro.",
        tipsAveiro: "Muitos apartamentos antigos em Aveiro necessitam de aumento de potência contratada na e-redes.",
        estimatedDuration: "2 dias de obra",
      },
      {
        number: 4,
        title: "Canalização & Exaustão de Fumos",
        subtitle: "Esgotos, torneira misturadora com chuveiro e tubo de exaustor",
        description: "Renovação das prumadas e ligação de exaustor com válvula anti-retorno para evitar que cheiros de outros andares entrem na sua cozinha.",
        tipsAveiro: "A ligação do exaustor ao exterior deve ter inclinação correta para não condensar vapores na tubagem.",
        estimatedDuration: "2 dias de obra",
      },
      {
        number: 5,
        title: "Montagem dos Móveis, Eletrodomésticos e Vistoria",
        subtitle: "Nivelamento milimétrico, calafetagem e ligação segura",
        description: "Ajuste de portas com dobradiças amortecidas, calafetagem de lava-louça com silicone neutro anti-fungos e ligação certificada de gás/indução.",
        tipsAveiro: "Vistoria detalhada com teste de funcionamento de todos os aparelhos e entrega da cozinha limpa e operacional.",
        estimatedDuration: "3 a 4 dias de obra",
      },
    ],
  },
  "remodelacao-total": {
    category: "remodelacao-total",
    title: "Planificador: Remodelação Total de Imóvel",
    description: "Planeie a intervenção completa da sua moradia ou apartamento em Aveiro com cronograma rigoroso e orçamento transparente.",
    steps: [
      {
        number: 1,
        title: "Levantamento Técnico & Projeto de Espaço",
        subtitle: "Verificação de estrutura, canalizações, elétrica e janelas",
        description: "O empreiteiro Jorge Freitas visita o imóvel em Aveiro, verifica paredes estruturais, estado do soalho e caixilharias e delineia o programa de obras.",
        tipsAveiro: "Verificação prévia de enquadramento legal na Câmara Municipal de Aveiro (isenção de licença para escassa relevância vs. comunicação prévia).",
        estimatedDuration: "2 a 5 dias",
      },
      {
        number: 2,
        title: "Orçamentação Detalhada & Contrato com Prazos",
        subtitle: "Sem derrapagens financeiras nem surpresas",
        description: "Elaboração de mapa de quantidades com preços unitários de cada especialidade e assinatura de contrato com garantia escrita e datas fixadas.",
        tipsAveiro: "Beneficie de taxas reduzidas de IVA (6%) em reabilitação de imóveis nas zonas ARU de Aveiro.",
        estimatedDuration: "3 a 5 dias",
      },
      {
        number: 3,
        title: "Demolições, Remoção e Redes Técnicas",
        subtitle: "Fase pesada de infraestruturas",
        description: "Abertura de roços, renovação completa da eletricidade, ITED (telecomunicações), canalização multicamada e pré-instalação de ar condicionado.",
        tipsAveiro: "Trabalhos de ruído coordenados com condomínio e acondicionamento rigoroso de materiais.",
        estimatedDuration: "1 a 2 semanas",
      },
      {
        number: 4,
        title: "Isolamentos, Tetos Falsos e Paredes em Pladur",
        subtitle: "Eficiência energética e conforto acústico",
        description: "Isolamento térmico e acústico com lã mineral de alta densidade, tetos falsos com alhetas e sancas para iluminação indireta.",
        tipsAveiro: "Essencial para proteger as divisões contra a amplitude térmica e o inverno húmido de Aveiro.",
        estimatedDuration: "1 a 2 semanas",
      },
      {
        number: 5,
        title: "Revestimentos, Pinturas e Carpintarias",
        subtitle: "Acabamentos visuais de alta qualidade",
        description: "Assentamento de cerâmicas retificadas, chão flutuante AC5, montagem de portas e rodapés lacados e pintura a 3 demãos de tinta lavável.",
        tipsAveiro: "Aplicação de primário anti-alcalino para que as tintas não descasquem com o tempo.",
        estimatedDuration: "2 a 3 semanas",
      },
      {
        number: 6,
        title: "Entrega Chave-na-Mão & Garantia Escrita",
        subtitle: "Limpeza profissional pós-obra e certificação",
        description: "Vistoria minuciosa de cada detalhe com o cliente e entrega formal do imóvel pronto a habitar.",
        tipsAveiro: "Acompanhamento pós-venda direto pelo Jorge Freitas.",
        estimatedDuration: "2 dias",
      },
    ],
  },
};

// ============================================================
// MELHORES IDEIAS PARA UMA RENOVAÇÃO LOW COST EM AVEIRO
// ============================================================
export interface LowCostIdea {
  id: string;
  title: string;
  category: string;
  estimatedSaving: string;
  impactLevel: "Alto" | "Muito Alto" | "Máximo";
  summary: string;
  howToApply: string;
}

export const LOW_COST_IDEAS: LowCostIdea[] = [
  {
    id: "lc-1",
    title: "Piso Vinílico SPC Clicado sobre o Pavimento Antigo",
    category: "Pavimentos",
    estimatedSaving: "Poupança de 45% vs demolição total",
    impactLevel: "Máximo",
    summary: "Evite custos com demolição de mosaicos antigos, remoção de entulho e regularização de laje.",
    howToApply: "O piso vinílico rígido SPC de 4 a 6mm é instalado diretamente por cima do azulejo ou cerâmica existente com manta acústica integrada. É 100% à prova de água, suave ao toque e transforma uma casa de banho ou apartamento em apenas 2 dias.",
  },
  {
    id: "lc-2",
    title: "Pintura Epóxi de Azulejos com Primário de Alta Aderência",
    category: "Casas de Banho & Cozinhas",
    estimatedSaving: "Poupança de até 60%",
    impactLevel: "Alto",
    summary: "Se os azulejos estão bem colados mas fora de moda, renove a cor sem quebrar paredes.",
    howToApply: "Com limpeza profunda desengordurante, aplicação de primário de ancoragem epoxídico e esmalte de poliuretano acetinado, uma casa de banho antiga dos anos 90 ganha um visual minimalista branco ou cinzento moderno por uma fração do preço.",
  },
  {
    id: "lc-3",
    title: "Preservação da Disposição das Redes de Água e Esgoto",
    category: "Canalização",
    estimatedSaving: "Poupança de 800€ a 1.500€",
    impactLevel: "Muito Alto",
    summary: "Mantenha sanita, lavatório e duche no mesmo alinhamento de prumada.",
    howToApply: "Mudar a sanita de parede obriga a furar lajes ou criar degraus inestéticos com custos pesados de mão de obra. Substitua as tubagens e equipamentos na mesma prumada para poupar centenas de euros e acelerar a obra em 4 dias.",
  },
  {
    id: "lc-4",
    title: "Renovação das Frentes de Armários e Puxadores Modernos",
    category: "Cozinhas",
    estimatedSaving: "Poupança de 50% vs cozinha nova de raiz",
    impactLevel: "Muito Alto",
    summary: "Se a estrutura interior dos armários estiver sã, substitua apenas as portas e bancada.",
    howToApply: "Trocar frentes em madeira escura por portas lisas termolaminadas ou lacadas em tons neutros, adicionando novos puxadores preto fosco e fita LED 3000K sob os armários superiores cria um efeito visual de cozinha acabada de estrear.",
  },
  {
    id: "lc-5",
    title: "Iluminação LED Indireta e Focos Embutidos",
    category: "Eletricidade & Ambiente",
    estimatedSaving: "Investimento inferior a 250€ por divisão",
    impactLevel: "Alto",
    summary: "Uma iluminação moderna altera instantaneamente a perceção de espaço e luxo.",
    howToApply: "Substituir candeeiros centrais únicos por sancas de luz quente difusa e focos orientáveis valoriza a arquitetura dos espaços, faz as divisões parecerem 20% maiores e consome uma fração da energia.",
  },
];

// ============================================================
// REMODELAÇÕES QUE FAZEM LOGO A CASA VALER MAIS (ROI Imobiliário Aveiro)
// ============================================================
export interface RoiItem {
  id: string;
  renovationType: string;
  roiPercentage: string;
  valueAddedAverage: string;
  whyItPaysOff: string;
  aveiroContext: string;
}

export const HIGH_ROI_RENOVATIONS: RoiItem[] = [
  {
    id: "roi-1",
    renovationType: "Remodelação de Casas de Banho Modernas",
    roiPercentage: "80% a 95% do valor investido",
    valueAddedAverage: "+4.000€ a +8.000€ no valor de venda",
    whyItPaysOff: "É o primeiro pormenor inspecionado pelos compradores e arrendatários. Uma base de duche italiana, sanita compacta e espelho iluminado eliminam a sensação de 'casa velha que precisa de obras'.",
    aveiroContext: "Em bairros centrais de Aveiro (Vera Cruz, Glória, Forca), apartamentos com casas de banho renovadas vendem em menos de metade do tempo médio de mercado.",
  },
  {
    id: "roi-2",
    renovationType: "Cozinha em Conceito Aberto (Open Space)",
    roiPercentage: "85% a 105% do valor investido",
    valueAddedAverage: "+7.000€ a +14.000€ no valor de venda",
    whyItPaysOff: "A fusão da sala com a cozinha multiplica a luz natural e a perceção de amplitude social. Compradores modernos recusam cozinhas fechadas e escuras de prédios das décadas de 80 e 90.",
    aveiroContext: "Em zonas universitárias e residenciais de Aveiro (São Bernardo, Aradas), o formato Open Space atrai de imediato casais jovens e investidores para arrendamento de alta rentabilidade.",
  },
  {
    id: "roi-3",
    renovationType: "Aplicação de Capoto ETICS e Eficiência Energética",
    roiPercentage: "80% + Poupança contínua mensal",
    valueAddedAverage: "Salto de classe energética (D/C para A/B)",
    whyItPaysOff: "Com os novos certificados energéticos obrigatórios, um imóvel com bom isolamento exterior consome até 40% menos em aquecimento e desumidificação.",
    aveiroContext: "Devido aos ventos húmidos da Ria de Aveiro, casas sem isolamento sofrem com bolores e paredes frias. O Capoto é um dos argumentos de venda mais valorizados pelas agências imobiliárias na região.",
  },
  {
    id: "roi-4",
    renovationType: "Pintura Neutra e Chão Flutuante Contínuo",
    roiPercentage: "100% a 120% (Alto retorno sobre custo reduzido)",
    valueAddedAverage: "+5.000€ a +10.000€ na valorização percetiva",
    whyItPaysOff: "O chão uniforme sem desníveis nem transições de mosaico para carpete unifica visualmente toda a habitação. Paredes em tons brancos quentes ou cinza suave refletem a luz e tornam as fotografias de anúncio irresistíveis.",
    aveiroContext: "Excelente para valorização imediata antes de colocar o imóvel à venda em agências imobiliárias de Aveiro.",
  },
];

// ============================================================
// GRANDE PROJETO ATUAL: VERDEMONT (www.verdemont.eu)
// ============================================================
export const VERDEMONT_PROJECT = {
  name: "Verdemont",
  domain: "www.verdemont.eu",
  url: "http://www.verdemont.eu",
  headline: "Grande Empreendimento em Destaque — Verdemont",
  tagline: "Construção e Arquitetura de Alto Padrão com Rigor de Engenharia",
  description: "A equipa da Freitas Renovações LDA e o Empreiteiro Jorge Freitas têm o orgulho de apresentar a sua intervenção e capacidade técnica de grande escala no prestigiado projeto Verdemont (visite www.verdemont.eu). Um desenvolvimento de referência que alia sofisticação arquitetónica, sustentabilidade e excelência construtiva.",
  highlights: [
    "Execução de acabamentos de alta gama e rigor dimensional",
    "Sistemas avançados de isolamento térmico e acústico de máxima eficiência",
    "Soluções construtivas sustentáveis em conformidade com as normas europeias",
    "Coordenação técnica e gestão de obra com cumprimento escrupuloso de cronogramas",
  ],
  externalLinkText: "Visitar Website Oficial Verdemont (www.verdemont.eu)",
};

// ============================================================
// COMO ESCOLHER EMPRESAS DE RENOVAÇÕES EM AVEIRO
// ============================================================
export const COMPANIES_AVEIRO_CRITERIA = [
  {
    id: "crit-1",
    title: "1. Alvará IMPIC Válido",
    desc: "Exija o número de alvará ou título de registo do Instituto dos Mercados Públicos do Imobiliário e da Construção. Trabalhar com entidades ilegais elimina qualquer proteção jurídica em caso de defeitos de obra.",
    checkFreitas: "A Freitas Renovações LDA é titular de alvará de construção válido com registo público.",
  },
  {
    id: "crit-2",
    title: "2. Seguros Obrigatórios em Dia",
    desc: "Seguro de Acidentes de Trabalho para todos os operários e Seguro de Responsabilidade Civil para salvaguardar terceiros e o próprio edifício contra danos.",
    checkFreitas: "Cobertura total com apólices ativas e seguro de responsabilidade civil.",
  },
  {
    id: "crit-3",
    title: "3. Orçamento Discriminado por Especialidade",
    desc: "Desconfie de orçamentos com valores globais tipo 'Remodelação completa: 12.000€'. Um orçamento sério detalha metros quadrados, marcas de materiais, tempo de mão de obra e taxas.",
    checkFreitas: "Apresentamos mapa de quantidades rigoroso, preços justos e sem custos camuflados.",
  },
  {
    id: "crit-4",
    title: "4. Supervisão Presencial pelo Empreiteiro",
    desc: "Muitas empresas subcontratam terceiros e nunca aparecem na obra. O responsável técnico deve estar presente e coordenar diariamente os trabalhos.",
    checkFreitas: "O Empreiteiro Jorge Freitas fiscaliza e acompanha pessoalmente cada obra em Aveiro.",
  },
  {
    id: "crit-5",
    title: "5. Conhecimento do Clima e Solo de Aveiro",
    desc: "A proximidade à Ria de Aveiro e ao mar exige materiais hidrófugos específicos, cimentos-cola elásticos e técnicas anti-salitre que empreiteiros de outras regiões desconhecem.",
    checkFreitas: "Mais de 100 obras concluídas com sucesso no concelho de Aveiro e freguesias.",
  },
];

// ============================================================
// COMO POUPAR DINHEIRO EM RENOVAÇÕES EM AVEIRO
// ============================================================
export const MONEY_SAVING_TIPS = [
  {
    number: "01",
    title: "Defina o Projeto Completo Antes de Iniciar a Obra",
    description: "Alterações de materiais ou demolições a meio dos trabalhos custam até 3 vezes mais do que decisões planeadas na fase inicial. Congele o plano técnico.",
  },
  {
    number: "02",
    title: "Beneficie da Tabela de Descontos Profissionais do Empreiteiro",
    description: "Comprar loiças sanitárias, cerâmicas e tintas através da conta profissional do empreiteiro assegura descontos de 15% a 30% face ao preço de balcão das grandes superfícies.",
  },
  {
    number: "03",
    title: "Aproveite a Taxa de IVA Reduzida (6%) em Reabilitação Urbana",
    description: "Obras de reabilitação e melhoria de imóveis em Áreas de Reabilitação Urbana (ARU) de Aveiro com empreiteiro licenciado têm direito a taxa de IVA a 6% sobre mão de obra e materiais aplicados.",
  },
  {
    number: "04",
    title: "Priorize as Infraestruturas Ocultas Antes do Cosmético",
    description: "Investir primeiro na canalização, quadros elétricos e impermeabilizações evita ter de estragar revestimentos caros acabados de colocar devido a fugas futuras.",
  },
  {
    number: "05",
    title: "Escolha Formatos de Cerâmica Standard (60x60 ou 60x120)",
    description: "Peças cerâmicas gigantes (ex: 120x240cm) ou mosaicos minúsculos requerem o dobro das horas de mão de obra de assentamento. Os formatos standard combinam estética moderna com custo equilibrado.",
  },
  {
    number: "06",
    title: "Mantenha a Localização dos Pontos de Esgoto e Prumadas",
    description: "Deslocar a sanita ou o ralo principal para outra parede requer quebrar laje e mudar caimentos, elevando o custo em mais de 1.000€ desnecessariamente.",
  },
];
