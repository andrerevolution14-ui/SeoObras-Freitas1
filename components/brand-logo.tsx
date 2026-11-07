import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  /** "light" = logótipo branco (fundos escuros) · "dark" = logótipo preto (fundos claros) */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string | null;
}

// Altura do logótipo em px (versão horizontal: ícone + FREITAS RENOVAÇÕES)
const HEIGHTS = { sm: 30, md: 38, lg: 52 };
const RATIO = 1484 / 320;

/** Logótipo oficial Freitas Renovações — versão horizontal (public/brand). */
export function BrandLogo({ tone = "light", size = "md", href = "/" }: BrandLogoProps) {
  const h = HEIGHTS[size];
  const img = (
    <Image
      src={tone === "light" ? "/brand/logo-horizontal-white.png" : "/brand/logo-horizontal-dark.png"}
      alt="Freitas Renovações LDA — Empresa de Obras e Remodelações em Aveiro"
      width={Math.round(h * RATIO)}
      height={h}
      priority={size !== "lg"}
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
