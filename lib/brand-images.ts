// ============================================================
// lib/brand-images.ts — Freitas Renovações
// Fonte única de todas as fotografias de marca do site.
//
// Para trocar uma imagem (ex.: novas fotos geradas no Higgsfield):
//   1. Coloque o ficheiro em /public/brand/ (ex.: /public/brand/hero.jpg)
//   2. Altere apenas o `src` abaixo. Mantenha o `alt` descritivo (SEO).
// Regra de marca: fotografias SEMPRE a cores, luz natural/quente.
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
    src: "/r10.webp",
    alt: "Equipa da Freitas Renovações a aplicar pavimento numa remodelação em Aveiro",
    recommended: "1200×1500 (4:5), equipa uniformizada em obra",
  },
  /** Reunião com clientes — secção de processo. */
  process: {
    src: "/heroes/empreiteiro-clientes-obra.jpg",
    alt: "Empreiteiro Jorge Freitas a rever o projeto de remodelação com clientes em Aveiro",
    recommended: "1600×1200 (4:3)",
  },
  /** Moradia exterior ao fim do dia — CTA final. */
  closing: {
    src: "/verdemont.jpg",
    alt: "Moradia contemporânea iluminada ao anoitecer — obra Freitas Renovações",
    recommended: "2400×1200 (2:1), exterior ao anoitecer",
  },
  /** Ambiente para o bloco de financiamento. */
  credit: {
    src: "/heroes/casal-sala-renovada.jpg",
    alt: "Casal na sala acabada de remodelar em Aveiro",
    recommended: "1600×1200 (4:3), lifestyle",
  },
  /** Identidade local — secção de zonas de atuação. */
  region: {
    src: "/heroes/aveiro-ria-moliceiros.jpg",
    alt: "Moliceiros na Ria de Aveiro ao pôr do sol — zona de atuação da Freitas Renovações",
    recommended: "2400×900 (8:3), paisagem de Aveiro",
  },
};
