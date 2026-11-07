import Link from "next/link";

interface BrandLogoProps {
  /** "light" = logótipo branco (fundos escuros) · "dark" = logótipo preto (fundos claros) */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string | null;
}

// Altura do logótipo em px (versão horizontal vetorial: ícone + FREITAS RENOVAÇÕES)
const HEIGHTS = { sm: 30, md: 40, lg: 54 };
const RATIO = 2433 / 562;

/** Logótipo oficial Freitas Renovações — SVG vetorial (nítido em qualquer ecrã). */
export function BrandLogo({ tone = "light", size = "md", href = "/" }: BrandLogoProps) {
  const h = HEIGHTS[size];
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tone === "light" ? "/brand/logo-horizontal-white.svg" : "/brand/logo-horizontal-dark.svg"}
      alt="Freitas Renovações LDA — Empresa de Obras e Remodelações em Aveiro"
      width={Math.round(h * RATIO)}
      height={h}
      className="gf-logo-img"
      style={{ height: h, width: "auto", display: "block" }}
    />
  );

  if (href === null) return img;
  return (
    <Link href={href} aria-label="Freitas Renovações — Página inicial" style={{ display: "inline-flex" }}>
      {img}
    </Link>
  );
}
