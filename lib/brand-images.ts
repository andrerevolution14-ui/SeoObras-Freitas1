// ============================================================
// lib/brand-images.ts — Freitas Renovações
// Fonte única de todas as fotografias de marca do site.
//
// Para trocar uma imagem (ex.: novas fotos geradas no Higgsfield):
//   1. Coloque o ficheiro em /public/brand/ (ex.: /public/brand/hero.jpg)
//   2. Altere apenas o `src` abaixo. Mantenha o `alt` descritivo (SEO).
// Regra de marca: fotografias SEMPRE a cores, luz natural/quente.
// Imagens de ambiente geradas no Higgsfield (Soul): equipa, processo, crédito e CTA final.
// Obras reais, antes/depois e projetos usam SEMPRE fotografias reais.
// ============================================================

export interface BrandImage {
  src: string;
  alt: string;
  /** Formato recomendado para a fotografia final */
  recommended: string;
}

export const BRAND_IMAGES = {
  /** Vídeo de fundo do hero — obra real em curso (Coverr, licença gratuita para uso comercial). */
  heroVideo: {
    src: "/brand/video/obra-hero.mp4",
    srcMobile: "/brand/video/obra-hero-mobile.mp4",
    poster: "/brand/video/obra-hero-poster.webp",
    posterMobile: "/brand/video/obra-hero-poster-mobile.webp",
    alt: "Equipa em obra de remodelação interior — demolição de divisórias e preparação de paredes",
    recommended: "MP4 H.264 sem áudio, 10–15 s em loop; 1280×720 (desktop) e 540×720 (mobile)",
  },
  /** Fundo do hero da homepage — interior remodelado, luz quente, pessoas. */
  hero: {
    src: "/heroes/familia-cozinha-nova.jpg",
    alt: "Família na cozinha e sala em open space remodeladas pela Freitas Renovações em Aveiro",
    recommended: "2400×1350 (16:9), zona esquerda mais calma para o texto",
  },
  /** Equipa em obra — secção "Quem somos". */
  team: {
    src: "/brand/equipa-em-obra.webp",
    alt: "Equipa de remodelação a assentar azulejo de grande formato numa casa de banho em obra",
    recommended: "1200×1500 (4:5), equipa uniformizada em obra",
  },
  /** Reunião com clientes — secção de processo. */
  process: {
    src: "/brand/processo-planeamento.webp",
    alt: "Empreiteiro a rever a planta da remodelação com a cliente num apartamento em obra",
    recommended: "1600×1200 (4:3)",
  },
  /** Moradia exterior ao fim do dia — CTA final. */
  closing: {
    src: "/brand/casa-de-banho-noite.webp",
    alt: "Casa de banho remodelada com duche em vidro, espelho LED e iluminação quente",
    recommended: "2400×1200 (2:1), exterior ao anoitecer",
  },
  /** Ambiente para o bloco de financiamento. */
  credit: {
    src: "/brand/casa-renovada.webp",
    alt: "Casal na sala e cozinha em open space de um apartamento acabado de remodelar",
    recommended: "1600×1200 (4:3), lifestyle",
  },
  /** Identidade local — secção de zonas de atuação. */
  region: {
    src: "/heroes/aveiro-ria-moliceiros.jpg",
    alt: "Moliceiros na Ria de Aveiro ao pôr do sol — zona de atuação da Freitas Renovações",
    recommended: "2400×900 (8:3), paisagem de Aveiro",
  },
};
