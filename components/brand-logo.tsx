import Link from "next/link";

interface BrandLogoProps {
  /** "light" = texto branco (fundos escuros) · "dark" = texto navy (fundos claros) */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  href?: string | null;
}

const SIZES = {
  sm: { mark: 32, name: "0.875rem", tag: "0.5625rem" },
  md: { mark: 38, name: "1rem", tag: "0.59375rem" },
  lg: { mark: 46, name: "1.25rem", tag: "0.6875rem" },
};

/** Monograma Grupo Freitas — telhado + "F" dentro de moldura quadrada. */
export function BrandMark({ size = 38, tone = "light" }: { size?: number; tone?: "light" | "dark" }) {
  const fg = tone === "light" ? "#ffffff" : "#0B1B2E";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="38.5" height="38.5" stroke="#B8935A" strokeWidth="1.5" />
      <path d="M9 17.5 L20 9 L31 17.5" stroke="#B8935A" strokeWidth="2" strokeLinecap="square" />
      <rect x="14" y="20" width="3.2" height="11.5" fill={fg} />
      <rect x="14" y="20" width="12.5" height="3" fill={fg} />
      <rect x="14" y="25" width="9.5" height="2.8" fill={fg} />
    </svg>
  );
}

export function BrandLogo({ tone = "light", size = "md", withTagline = true, href = "/" }: BrandLogoProps) {
  const s = SIZES[size];
  const nameColor = tone === "light" ? "#ffffff" : "#0B1B2E";
  const tagColor = tone === "light" ? "rgba(255,255,255,0.55)" : "#6B7480";

  const content = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem" }}>
      <BrandMark size={s.mark} tone={tone} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          className="font-display"
          style={{
            color: nameColor,
            fontWeight: 600,
            fontSize: s.name,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Grupo Freitas
        </span>
        {withTagline && (
          <span
            style={{
              color: tagColor,
              fontSize: s.tag,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginTop: "0.4rem",
            }}
          >
            Obras &amp; Remodelações
          </span>
        )}
      </span>
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="Grupo Freitas — Página inicial" style={{ textDecoration: "none", display: "inline-flex" }}>
      {content}
    </Link>
  );
}
