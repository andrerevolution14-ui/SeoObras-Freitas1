import { CONTRACTOR_INFO } from "@/lib/constants";

const IG = (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
const FB = (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
    <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
  </svg>
);

const LINKS = [
  { href: CONTRACTOR_INFO.socialLinks.instagram, label: "Instagram", sub: CONTRACTOR_INFO.socialLinks.instagramHandle, icon: IG },
  { href: CONTRACTOR_INFO.socialLinks.facebook, label: "Facebook", sub: "Freitas Renovações", icon: FB },
];

/** Ícones de redes sociais (rodapé, menu). tone: "light" em fundos escuros. */
export function SocialLinks({ tone = "light", withLabels = false }: { tone?: "light" | "dark"; withLabels?: boolean }) {
  return (
    <div className={`gf-social gf-social-${tone}${withLabels ? " has-labels" : ""}`}>
      {LINKS.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer me" aria-label={`Freitas Renovações no ${l.label}`} className="gf-social-link">
          {l.icon}
          {withLabels && (
            <span>
              <strong>{l.label}</strong>
              <em>{l.sub}</em>
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
