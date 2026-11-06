// ============================================================
// lib/brand-images.ts — Grupo Freitas
// Fonte única de todas as fotografias de marca do site.
//
// Para trocar uma imagem (ex.: novas fotos geradas no Higgsfield):
//   1. Coloque o ficheiro em /public/brand/ (ex.: /public/brand/hero.jpg)
//   2. Altere apenas o `src` abaixo. Mantenha o `alt` descritivo (SEO).
// Tamanhos recomendados estão indicados em cada entrada.
// ============================================================

export interface BrandImage {
  src: string;
  alt: string;
  /** Formato recomendado para a fotografia final */
  recommended: string;
}

export const BRAND_IMAGES = {
  /** Fundo do hero da homepage — cinematográfico, tons escuros, interior premium. */
  hero: {
    src: "/hero-bg-v4.jpg",
    alt: "Cozinha contemporânea remodelada pelo Grupo Freitas em Aveiro",
    recommended: "2400×1350 (16:9), escura à esquerda para o texto",
  },
  /** Retrato do fundador — secção "Quem somos". */
  founder: {
    src: "/jorge-freitas.jpg",
    alt: "Jorge Freitas, Empreiteiro Geral e fundador do Grupo Freitas em Aveiro",
    recommended: "1200×1500 (4:5), retrato em obra",
  },
  /** Equipa / reunião com clientes — secção de processo. */
  process: {
    src: "/heroes/empreiteiro-clientes-obra.jpg",
    alt: "Empreiteiro Jorge Freitas a rever o projeto de remodelação com clientes em Aveiro",
    recommended: "1600×1200 (4:3)",
  },
  /** Moradia exterior ao fim do dia — CTA final. */
  closing: {
    src: "/verdemont.jpg",
    alt: "Moradia contemporânea iluminada ao anoitecer — obra Grupo Freitas",
    recommended: "2400×1200 (2:1), exterior ao anoitecer",
  },
  /** Ambiente para o bloco de financiamento. */
  credit: {
    src: "/heroes/casal-sala-renovada.jpg",
    alt: "Casal na sala acabada de remodelar em Aveiro",
    recommended: "1600×1200 (4:3), lifestyle",
  },
  /** Faixa de manifesto (imagem larga). */
  manifesto: {
    src: "/hero-bg-v3.jpg",
    alt: "Interior de cozinha e sala em open space remodelado pelo Grupo Freitas",
    recommended: "2400×1000 (21:9)",
  },
} satisfies Record<string, BrandImage>;
