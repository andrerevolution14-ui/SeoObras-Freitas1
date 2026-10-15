// ============================================================
// lib/calculator-data.ts — Motor da Calculadora de Orçamento
// Adaptado para Aveiro com preços reais e cálculo instantâneo
// ============================================================

export interface CalculatorServiceOption {
  id: string;
  name: string;
  category: string;
  defaultArea: number;
  minArea: number;
  maxArea: number;
  areaUnit: string;
  basePricePerUnit: number; // EUR
  laborRatio: number;      // 0.0 - 1.0
  materialsRatio: number;  // 0.0 - 1.0
  wasteRatio: number;      // 0.0 - 1.0
  daysPerUnit: number;     // Duração base em dias por m2/unidade
  description: string;
}

export const CALCULATOR_SERVICES: CalculatorServiceOption[] = [
  {
    id: "casa-de-banho",
    name: "Casa de Banho Completa",
    category: "Interior",
    defaultArea: 5,
    minArea: 3,
    maxArea: 15,
    areaUnit: "m²",
    basePricePerUnit: 680,
    laborRatio: 0.45,
    materialsRatio: 0.48,
    wasteRatio: 0.07,
    daysPerUnit: 1.4,
    description: "Demolição, canalização multicamada nova, base de duche, cerâmicas retificadas e loiças completas.",
  },
  {
    id: "cozinha",
    name: "Remodelação de Cozinha",
    category: "Interior",
    defaultArea: 12,
    minArea: 6,
    maxArea: 35,
    areaUnit: "m²",
    basePricePerUnit: 520,
    laborRatio: 0.40,
    materialsRatio: 0.53,
    wasteRatio: 0.07,
    daysPerUnit: 1.2,
    description: "Armários sob medida, bancada em quartzo/granito, pontos elétricos e canalização nova.",
  },
  {
    id: "remodelacao-total",
    name: "Remodelação Total de Imóvel",
    category: "Integral",
    defaultArea: 80,
    minArea: 25,
    maxArea: 300,
    areaUnit: "m²",
    basePricePerUnit: 720,
    laborRatio: 0.48,
    materialsRatio: 0.45,
    wasteRatio: 0.07,
    daysPerUnit: 0.45,
    description: "Chave-na-mão: demolições, redes de águas/eletricidade novas, pisos, portas, tetos e pintura geral.",
  },
  {
    id: "capoto",
    name: "Isolamento Térmico Capoto (ETICS)",
    category: "Fachadas",
    defaultArea: 120,
    minArea: 30,
    maxArea: 500,
    areaUnit: "m²",
    basePricePerUnit: 46,
    laborRatio: 0.43,
    materialsRatio: 0.51,
    wasteRatio: 0.06,
    daysPerUnit: 0.08,
    description: "Placas EPS grafitado homologadas, rede de fibra, duplo barramento armado e pintura exterior.",
  },
  {
    id: "pintura-interior",
    name: "Pintura Geral de Interiores",
    category: "Pintura",
    defaultArea: 90,
    minArea: 20,
    maxArea: 400,
    areaUnit: "m²",
    basePricePerUnit: 9.5,
    laborRatio: 0.65,
    materialsRatio: 0.30,
    wasteRatio: 0.05,
    daysPerUnit: 0.04,
    description: "Preparação de paredes, barramento de fissuras e demãos de tinta lavável de alta qualidade.",
  },
  {
    id: "telhado-impermeabilizacao",
    name: "Telhados & Impermeabilização",
    category: "Coberturas",
    defaultArea: 100,
    minArea: 25,
    maxArea: 400,
    areaUnit: "m²",
    basePricePerUnit: 16,
    laborRatio: 0.55,
    materialsRatio: 0.38,
    wasteRatio: 0.07,
    daysPerUnit: 0.03,
    description: "Lavagem especializada, substituição de telhas danificadas e impermeabilização de caleiras.",
  },
  {
    id: "pavimentos-flutuante",
    name: "Pavimento Flutuante / Vinílico SPC",
    category: "Pavimentos",
    defaultArea: 65,
    minArea: 15,
    maxArea: 250,
    areaUnit: "m²",
    basePricePerUnit: 24,
    laborRatio: 0.35,
    materialsRatio: 0.60,
    wasteRatio: 0.05,
    daysPerUnit: 0.035,
    description: "Fornecimento e instalação de piso AC5 ou vinílico SPC, tela acústica e rodapés lacados.",
  },
  {
    id: "eletricidade-canalizacao",
    name: "Renovação Elétrica e Canalização",
    category: "Técnico",
    defaultArea: 75,
    minArea: 20,
    maxArea: 250,
    areaUnit: "m²",
    basePricePerUnit: 48,
    laborRatio: 0.60,
    materialsRatio: 0.35,
    wasteRatio: 0.05,
    daysPerUnit: 0.06,
    description: "Novo quadro elétrico certificado, cablagem, tomadas novas e rede multicamada de água/esgoto.",
  },
];

export interface FinishTier {
  id: "economica" | "standard" | "premium";
  name: string;
  multiplier: number;
  badge: string;
  description: string;
}

export const FINISH_TIERS: FinishTier[] = [
  {
    id: "economica",
    name: "Económica / Prática",
    multiplier: 0.78,
    badge: "Mais Barato",
    description: "Materiais acessíveis, soluções de excelente durabilidade com foco em custo reduzido.",
  },
  {
    id: "standard",
    name: "Standard / Equilibrada",
    multiplier: 0.95,
    badge: "Melhor Relação",
    description: "Cerâmicas retificadas, marcas consagradas (Roca, Grohe), acabamentos contemporâneos.",
  },
  {
    id: "premium",
    name: "Alta Gama / Premium",
    multiplier: 1.20,
    badge: "Acabamento Superior",
    description: "Pedras naturais/quartzo, louças suspensas de design, iluminação LED arquitetural oculta.",
  },
];

export interface CalculationResult {
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  pricePerM2: number;
  durationDays: number;
  laborCost: number;
  materialsCost: number;
  wasteAndLogisticsCost: number;
}

export function calculateBudgetEstimate(
  serviceId: string,
  areaM2: number,
  tierId: "economica" | "standard" | "premium"
): CalculationResult {
  const service =
    CALCULATOR_SERVICES.find((s) => s.id === serviceId) || CALCULATOR_SERVICES[0];
  const tier = FINISH_TIERS.find((t) => t.id === tierId) || FINISH_TIERS[1];

  const baseTotal = service.basePricePerUnit * areaM2 * tier.multiplier;

  // Range realista com margem de tolerância +/- 10%
  const minPrice = Math.round((baseTotal * 0.9) / 50) * 50;
  const maxPrice = Math.round((baseTotal * 1.1) / 50) * 50;
  const averagePrice = Math.round(((minPrice + maxPrice) / 2) / 50) * 50;

  const pricePerM2 = Math.round(averagePrice / areaM2);

  // Estimativa de duração em dias úteis (mínimo de 2 dias para qualquer obra)
  const durationDays = Math.max(2, Math.ceil(areaM2 * service.daysPerUnit));

  // Divisão de custos
  const laborCost = Math.round(averagePrice * service.laborRatio);
  const materialsCost = Math.round(averagePrice * service.materialsRatio);
  const wasteAndLogisticsCost = averagePrice - laborCost - materialsCost;

  return {
    minPrice,
    maxPrice,
    averagePrice,
    pricePerM2,
    durationDays,
    laborCost,
    materialsCost,
    wasteAndLogisticsCost,
  };
}
