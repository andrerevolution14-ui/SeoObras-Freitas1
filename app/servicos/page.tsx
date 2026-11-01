import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Home,
  Droplets,
  Zap,
  CloudRain,
  Paintbrush,
  Layers,
  Phone,
  Bath,
  UtensilsCrossed,
  Building,
  Sparkles,
  Hammer,
  Grid,
  AppWindow,
} from "lucide-react";
import { SERVICES, CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Serviços de Obras e Remodelações em Aveiro",
  description:
    "Soluções completas de remodelações em Aveiro: chave na mão, casas de banho, cozinhas, apartamentos, moradias, capoto e telhados. Alvará IMPIC e acompanhamento direto pelo Empreiteiro Jorge Freitas.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/servicos" },
  openGraph: {
    title: "Serviços de Obras e Remodelações em Aveiro | Freitas Renovações",
    description:
      "Remodelações gerais chave na mão, casas de banho, cozinhas, moradias, capoto e telhados em Aveiro. Processo ágil em 2 passos e proposta detalhada.",
    url: "https://www.grupofreitasrenovacoes.pt/servicos",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Serviços de Obras e Remodelações em Aveiro — Freitas Renovações",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serviços de Obras e Remodelações em Aveiro | Freitas Renovações",
    description: "Remodelações chave na mão, casas de banho, cozinhas e moradias em Aveiro. Resposta em <12h.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
  },
};

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home size={24} />,
  Droplets: <Droplets size={24} />,
  Zap: <Zap size={24} />,
  CloudRain: <CloudRain size={24} />,
  Paintbrush: <Paintbrush size={24} />,
  Layers: <Layers size={24} />,
  Bath: <Bath size={24} />,
  UtensilsCrossed: <UtensilsCrossed size={24} />,
  Building: <Building size={24} />,
  Sparkles: <Sparkles size={24} />,
  Hammer: <Hammer size={24} />,
  Grid: <Grid size={24} />,
  AppWindow: <AppWindow size={24} />,
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Serviços de Obras e Remodelações — Freitas Renovações LDA",
      url: "https://www.grupofreitasrenovacoes.pt/servicos",
      numberOfItems: SERVICES.length,
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://www.grupofreitasrenovacoes.pt/servicos/${s.slug}`,
        name: s.title,
        description: s.description,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: "https://www.grupofreitasrenovacoes.pt",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Serviços",
          item: "https://www.grupofreitasrenovacoes.pt/servicos",
        },
      ],
    },
  ],
};

export default function ServicosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      {/* Hero Compacto */}
      <section
        className="page-compact-hero"
        style={{
          backgroundColor: "#071a3a",
          backgroundImage:
            "linear-gradient(105deg, rgba(7, 26, 58, 0.90) 0%, rgba(7, 26, 58, 0.78) 55%, rgba(15, 45, 94, 0.55) 100%), url('/heroes/empreiteiro-clientes-obra.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "5rem 0 1.25rem",
        }}
      >
        <div className="section-container">
          <p className="section-eyebrow" style={{ marginBottom: "0.25rem" }}>Alvará IMPIC · Aveiro</p>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.15rem)", fontWeight: 900, color: "#ffffff", marginBottom: "0.25rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Serviços de Obras e Remodelações em Aveiro
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", maxWidth: "560px", lineHeight: 1.45, margin: 0 }}>
            Escolha a especialidade que procura. Preços justos, garantia escrita e orçamento gratuito.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ background: "#f8fafc", padding: "1.5rem 0 3.5rem" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/servicos/${service.slug}`}
                className="service-card"
                style={{ textDecoration: "none" }}
              >
                <div className="icon-wrapper icon-wrapper-navy">
                  {iconMap[service.icon] ?? <Home size={24} />}
                </div>

                <h2 style={{ fontSize: "1.125rem", fontWeight: 800, color: "#071a3a", marginBottom: "0.5rem" }}>
                  {service.title}
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {service.description}
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {service.features.slice(0, 3).map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "#475569" }}>
                      <CheckCircle size={13} style={{ color: "#0f2d5e", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0f2d5e" }}>
                    Ver detalhes e pedir orçamento
                  </span>
                  <ArrowRight size={15} style={{ color: "#0f2d5e" }} />
                </div>

                {service.emergencyAvailable && (
                  <div style={{
                    marginTop: "0.875rem",
                    padding: "0.375rem 0.75rem",
                    background: "rgba(239,68,68,0.08)",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#dc2626",
                    display: "inline-block",
                  }}>
                    ⚡ Disponível em Urgência
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Strip */}
      <section style={{ background: "#071a3a", padding: "3rem 0" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", textAlign: "center" }}>
            {[
              { label: "Empresa Licenciada IMPIC", sub: "Alvará de Construção Válido" },
              { label: "⭐ 4.9/5 no Google", sub: "+48 Avaliações Reais" },
              { label: "Resposta em até 12h", sub: "Orçamento Gratuito" },
              { label: "+100 Obras Concluídas", sub: "Em Aveiro e Arredores" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontWeight: 800, color: "#fbbf24", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>{item.label}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", padding: "3.5rem 0", textAlign: "center" }}>
        <div className="section-container">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#071a3a", marginBottom: "0.5rem" }}>
            Não sabe qual o serviço que precisa?
          </h2>
          <p style={{ color: "rgba(7,26,58,0.75)", marginBottom: "1.25rem", fontSize: "0.9375rem" }}>
            Descreva o problema e o Jorge Freitas dará uma resposta em menos de 12 horas.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary" style={{ background: "#071a3a", color: "#fff" }} id="servicos-bottom-phone">
              <Phone size={16} />
              Ligar Agora
            </a>
            <Link href="/orcamento" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(7,26,58,0.1)", color: "#071a3a", fontWeight: 700,
              padding: "0.75rem 1.5rem", borderRadius: "0.375rem", textDecoration: "none",
              border: "2px solid rgba(7,26,58,0.25)",
            }}>
              Pedir Orçamento Online
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
