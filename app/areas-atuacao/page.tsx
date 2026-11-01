import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Shield, Sparkles } from "lucide-react";
import { PARISHES, CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Áreas de Atuação — Obras em Aveiro e Concelhos Limítrofes",
  description:
    "Obras e remodelações em Aveiro e concelhos vizinhos: Ílhavo, Águeda, Estarreja, Vagos, Praia da Barra e Costa Nova. Empresa licenciada IMPIC com acompanhamento direto.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/areas-atuacao" },
  openGraph: {
    title: "Áreas de Atuação — Obras em Aveiro e Concelhos Limítrofes | Freitas Renovações",
    description:
      "Cobertura completa no município de Aveiro e concelhos vizinhos (Ílhavo, Águeda, Estarreja, Vagos, Barra e Costa Nova). Alvará IMPIC.",
    url: "https://www.grupofreitasrenovacoes.pt/areas-atuacao",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Áreas de Atuação de Obras e Remodelações em Aveiro e Limítrofes — Freitas Renovações",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Áreas de Atuação — Obras em Aveiro e Concelhos Vizinhos | Freitas Renovações",
    description: "Obras em Aveiro, Ílhavo, Águeda, Estarreja e Vagos. Resposta em < 12h.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
  },
};

const areasJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Áreas de Atuação — Freitas Renovações LDA em Aveiro e Concelhos Limítrofes",
      url: "https://www.grupofreitasrenovacoes.pt/areas-atuacao",
      numberOfItems: PARISHES.length,
      itemListElement: PARISHES.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://www.grupofreitasrenovacoes.pt/areas-atuacao/${p.slug}`,
        name: p.fullName,
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
          name: "Áreas de Atuação",
          item: "https://www.grupofreitasrenovacoes.pt/areas-atuacao",
        },
      ],
    },
  ],
};

export default function AreasAtuacaoPage() {
  const aveiroParishes = PARISHES.filter((p) => !p.isNeighboringCounty);
  const neighboringCounties = PARISHES.filter((p) => p.isNeighboringCounty);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasJsonLd) }}
      />

      {/* Hero Compacto */}
      <section
        className="page-compact-hero"
        style={{
          backgroundColor: "#071a3a",
          backgroundImage:
            "linear-gradient(105deg, rgba(7, 26, 58, 0.88) 0%, rgba(7, 26, 58, 0.74) 55%, rgba(15, 45, 94, 0.50) 100%), url('/heroes/aveiro-ria-moliceiros.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "5rem 0 1.25rem",
        }}
      >
        <div className="section-container">
          <p className="section-eyebrow" style={{ color: "#fbbf24", marginBottom: "0.25rem" }}>Aveiro &amp; Concelhos Limítrofes</p>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.15rem)", fontWeight: 900, color: "#ffffff", marginBottom: "0.25rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Áreas de Atuação em Aveiro e Arredores
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", maxWidth: "580px", lineHeight: 1.45, margin: 0 }}>
            Todas as freguesias de Aveiro, Ílhavo, Águeda, Estarreja, Vagos e Costa Nova.
          </p>
        </div>
      </section>

      {/* Map Coverage Note */}
      <section style={{ background: "#ffffff", padding: "1.5rem 0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="section-container">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", justifyContent: "space-between" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(15,45,94,0.06)", borderRadius: "0.5rem",
              padding: "0.625rem 1rem", fontSize: "0.875rem", color: "#071a3a", fontWeight: 700,
            }}>
              <MapPin size={16} style={{ color: "#f59e0b" }} />
              Raio de atuação: Aveiro e concelhos limítrofes num raio de até 45 km
            </div>
            <div style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: 600 }}>
              Orçamentos discriminados 100% gratuitos em qualquer uma das {PARISHES.length} localizações
            </div>
          </div>
        </div>
      </section>

      {/* Neighboring Counties Grid (Expansão Geográfica) */}
      <section className="section-padding" style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-eyebrow">Expansão Regional</p>
            <h2 className="section-title">Concelhos Limítrofes Atendidos</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Muitos clientes de concelhos limítrofes procuram a nossa garantia e alvará IMPIC sediado em Aveiro.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {neighboringCounties.map((parish) => (
              <Link
                key={parish.slug}
                href={`/areas-atuacao/${parish.slug}`}
                style={{
                  display: "block",
                  background: "#ffffff",
                  border: "2px solid #fbbf24",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 15px rgba(251, 191, 36, 0.08)",
                }}
                className="card-hover"
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <MapPin size={18} style={{ color: "#d97706", flexShrink: 0 }} />
                    <h3 style={{ fontWeight: 800, color: "#071a3a", fontSize: "1.125rem", margin: 0 }}>
                      Remodelações {parish.name}
                    </h3>
                  </div>
                  <span style={{ fontSize: "0.6875rem", background: "rgba(251, 191, 36, 0.2)", color: "#b45309", padding: "0.2rem 0.5rem", borderRadius: "1rem", fontWeight: 700 }}>
                    Concelho
                  </span>
                </div>
                <p style={{ color: "#475569", fontSize: "0.85rem", lineHeight: 1.55, margin: "0 0 1rem 0" }}>
                  {parish.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#ca8a04", fontWeight: 700, fontSize: "0.8125rem" }}>
                  Ver obras e pedir orçamento em {parish.name} <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Aveiro Parishes Grid */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-eyebrow">Concelho de Aveiro</p>
            <h2 className="section-title">Freguesias do Município de Aveiro</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Trabalhos com resposta urgente e acompanhamento pessoal do Empreiteiro Jorge Freitas.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {aveiroParishes.map((parish) => (
              <Link
                key={parish.slug}
                href={`/areas-atuacao/${parish.slug}`}
                style={{
                  display: "block",
                  background: "#f8fafc",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  padding: "1.25rem",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                className="card-hover"
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <MapPin size={15} style={{ color: "#f59e0b", flexShrink: 0 }} />
                    <h3 style={{ fontWeight: 800, color: "#071a3a", fontSize: "1rem", margin: 0 }}>
                      {parish.name}
                    </h3>
                  </div>
                  <ArrowRight size={14} style={{ color: "#94a3b8" }} />
                </div>
                <p style={{ color: "#64748b", fontSize: "0.8125rem", lineHeight: 1.55, margin: "0 0 0.5rem 0" }}>
                  {parish.description}
                </p>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                  ~{parish.population.toLocaleString("pt-PT")} habitantes
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", padding: "3.5rem 0", textAlign: "center" }}>
        <div className="section-container">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#071a3a", marginBottom: "0.5rem" }}>
            Quer remodelar a sua casa com preço justo?
          </h2>
          <p style={{ color: "rgba(7,26,58,0.8)", marginBottom: "1.5rem", fontSize: "0.9375rem" }}>
            Avaliamos o local gratuitamente em Aveiro, Ílhavo, Águeda, Estarreja, Vagos e praias. Resposta garantida em até 12 horas.
          </p>
          <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary" style={{ background: "#071a3a", color: "#fff" }} id="areas-bottom-phone">
            <Phone size={16} />
            Ligar: {CONTRACTOR_INFO.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
