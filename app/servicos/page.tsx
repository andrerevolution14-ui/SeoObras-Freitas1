import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Home, Droplets, Zap, CloudRain, Paintbrush, Layers, Phone } from "lucide-react";
import { SERVICES, CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Serviços de Obras e Remodelações em Aveiro | Freitas Renovações LDA",
  description:
    "Remodelação geral, canalização, eletricidade, telhados, pintura e isolamentos em Aveiro. Empresa licenciada IMPIC. Orçamento gratuito. Resposta em menos de 12h.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/servicos" },
  keywords: [
    "serviços de obras aveiro",
    "remodelação geral aveiro",
    "canalizador aveiro",
    "eletricista aveiro",
    "reparação de telhados aveiro",
    "pintura de interiores aveiro",
    "capoto e isolamento térmico aveiro",
    "remodelação de casas de banho aveiro",
    "remodelação de cozinhas aveiro",
    "empresa de renovações aveiro",
  ],
  openGraph: {
    title: "Serviços de Obras e Remodelações em Aveiro | Freitas Renovações LDA",
    description:
      "Remodelação geral, canalização, eletricidade, telhados, pintura e isolamentos em Aveiro. Orçamento gratuito. ⭐ 4.9/5 no Google.",
    url: "https://www.grupofreitasrenovacoes.pt/servicos",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Serviços de Obras e Remodelações em Aveiro — Freitas Renovações LDA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serviços de Obras e Remodelações em Aveiro | Freitas Renovações LDA",
    description: "Remodelações, canalização, eletricidade, telhados e pintura em Aveiro. Resposta em <12h.",
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

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #071a3a, #0f2d5e)", padding: "7.5rem 0 4rem" }}>
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>Serviços</span>
          </nav>
          <p className="section-eyebrow">O Que Fazemos</p>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 900, color: "#ffffff", marginBottom: "0.875rem", letterSpacing: "-0.02em" }}>
            Serviços de Obras e Remodelações em Aveiro
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "580px", lineHeight: 1.65, marginBottom: "1.75rem" }}>
            Empresa licenciada IMPIC com alvará de construção válido. Remodelação, canalização, eletricidade,
            telhados, pintura e isolamentos — tudo com preços justos e orçamento gratuito.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary" id="servicos-cta-phone">
              <Phone size={16} />
              Ligar: {CONTRACTOR_INFO.phoneDisplay}
            </a>
            <Link href="/orcamento" className="btn-secondary">
              Pedir Orçamento Gratuito
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-eyebrow">Todos os Serviços</p>
            <h2 className="section-title">Escolha o Serviço que Precisa</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Clique em qualquer serviço para ver detalhes, preços e solicitar orçamento gratuito.
            </p>
          </div>

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
