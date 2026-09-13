import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { PARISHES, CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Áreas de Atuação em Aveiro | Freitas Renovações LDA",
  description:
    "Obras e remodelações em todas as freguesias de Aveiro: Esgueira, Aradas, Cácia, São Bernardo, Glória e Vera Cruz e muito mais. Empresa licenciada. Orçamento gratuito.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/areas-atuacao" },
  openGraph: {
    title: "Áreas de Atuação em Aveiro | Freitas Renovações LDA",
    description:
      "Cobrimos todas as freguesias do município de Aveiro. Empreiteiro licenciado, preços justos, orçamento gratuito.",
    url: "https://www.grupofreitasrenovacoes.pt/areas-atuacao",
    type: "website",
  },
};

const areasJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Áreas de Atuação — Freitas Renovações LDA em Aveiro",
  url: "https://www.grupofreitasrenovacoes.pt/areas-atuacao",
  numberOfItems: PARISHES.length,
  itemListElement: PARISHES.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.grupofreitasrenovacoes.pt/areas-atuacao/${p.slug}`,
    name: p.fullName,
  })),
};

export default function AreasAtuacaoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasJsonLd) }}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #071a3a, #0f2d5e)", padding: "7.5rem 0 4rem" }}>
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>Áreas de Atuação</span>
          </nav>
          <p className="section-eyebrow">Cobertura Total</p>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 900, color: "#ffffff", marginBottom: "0.875rem", letterSpacing: "-0.02em" }}>
            Obras e Remodelações em Todo o Município de Aveiro
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "580px", lineHeight: 1.65, marginBottom: "1.75rem" }}>
            A Freitas Renovações LDA atua em todas as freguesias de Aveiro num raio de 30km.
            Orçamento gratuito e resposta em menos de 12 horas.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary" id="areas-cta-phone">
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

      {/* Map Coverage Note */}
      <section style={{ background: "#ffffff", padding: "2rem 0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="section-container">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(15,45,94,0.06)", borderRadius: "0.5rem",
              padding: "0.625rem 1rem", fontSize: "0.875rem", color: "#071a3a", fontWeight: 600,
            }}>
              <MapPin size={16} style={{ color: "#f59e0b" }} />
              Raio de atuação: 30 km a partir de Aveiro
            </div>
            <div style={{ color: "#64748b", fontSize: "0.875rem" }}>
              Cobrimos {PARISHES.length} freguesias — selecione a sua para ver detalhes
            </div>
          </div>
        </div>
      </section>

      {/* Parishes Grid */}
      <section className="section-padding" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-eyebrow">Freguesias Cobertas</p>
            <h2 className="section-title">Onde Trabalhamos em Aveiro</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Clique na sua freguesia para saber mais sobre os serviços disponíveis na sua área.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {PARISHES.map((parish) => (
              <Link
                key={parish.slug}
                href={`/areas-atuacao/${parish.slug}`}
                style={{
                  display: "block",
                  background: "#ffffff",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  padding: "1.25rem 1.25rem 1rem",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                className="card-hover"
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <MapPin size={15} style={{ color: "#f59e0b", flexShrink: 0, marginTop: "2px" }} />
                    <h2 style={{ fontWeight: 800, color: "#071a3a", fontSize: "1rem", margin: 0 }}>
                      {parish.name}
                    </h2>
                  </div>
                  <ArrowRight size={15} style={{ color: "#94a3b8", flexShrink: 0, marginTop: "2px" }} />
                </div>
                <p style={{ color: "#64748b", fontSize: "0.8125rem", lineHeight: 1.55, margin: "0 0 0.625rem 1.625rem" }}>
                  {parish.description}
                </p>
                <div style={{ marginLeft: "1.625rem", fontSize: "0.75rem", color: "#94a3b8" }}>
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
            A sua freguesia não está na lista?
          </h2>
          <p style={{ color: "rgba(7,26,58,0.75)", marginBottom: "1.25rem", fontSize: "0.9375rem" }}>
            Contacte-nos — possivelmente também cobrimos a sua área.
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
