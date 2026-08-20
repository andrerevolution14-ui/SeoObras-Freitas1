import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, CheckCircle } from "lucide-react";
import { REAL_PROJECTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projetos Realizados em Aveiro (2022-2026) | Freitas Renovações LDA",
  description:
    "Galeria de obras e remodelações efetuadas pela Freitas Renovações LDA em Aveiro. Veja os resultados reais das nossas intervenções entre 2022 e 2026.",
  alternates: { canonical: "/projetos" },
};

export default function ProjetosPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #022c22, #064e3b)", padding: "7.5rem 0 4rem" }}>
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>Projetos</span>
          </nav>
          <p className="section-eyebrow">Portfolio de Trabalhos</p>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 900, color: "#ffffff", marginBottom: "0.875rem", letterSpacing: "-0.02em" }}>
            Projetos Realizados em Aveiro (2022–2026)
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "560px", lineHeight: 1.65 }}>
            Trabalhos reais, resultados de excelência. Conheça algumas das intervenções executadas pela equipa de Jorge Freitas em Aveiro.
          </p>
        </div>
      </section>

      {/* Portfolio Grid for the 4 Real Projects */}
      <section className="section-padding" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {REAL_PROJECTS.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  border: "1.5px solid #e2e8f0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="card-hover"
              >
                {/* Real Image Container */}
                <div style={{ position: "relative", height: "240px", width: "100%", overflow: "hidden", background: "#022c22" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      background: "rgba(2, 44, 34, 0.9)",
                      color: "#fbbf24",
                      fontSize: "0.6875rem",
                      fontWeight: 800,
                      padding: "0.25rem 0.625rem",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {item.service}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      background: "rgba(245, 158, 11, 0.95)",
                      color: "#022c22",
                      fontSize: "0.6875rem",
                      fontWeight: 900,
                      padding: "0.25rem 0.625rem",
                      borderRadius: "0.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <Calendar size={12} />
                    {item.year}
                  </div>
                </div>

                <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontWeight: 800, color: "#022c22", marginBottom: "0.375rem", fontSize: "1.0625rem" }}>
                      {item.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#64748b", fontSize: "0.8125rem", marginBottom: "0.75rem" }}>
                      <MapPin size={13} style={{ color: "#f59e0b" }} />
                      <span>{item.parish}</span>
                    </div>
                    <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>

                  <div style={{ marginTop: "1.25rem", paddingTop: "0.875rem", borderTop: "1px solid #f1f5f9" }}>
                    <Link
                      href="/#hero-form"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        color: "#d97706",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        textDecoration: "none",
                      }}
                    >
                      <span>Solicitar orçamento para obra idêntica</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", padding: "3.5rem 0", textAlign: "center" }}>
        <div className="section-container">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#022c22", marginBottom: "0.75rem" }}>
            Quer ver a sua casa transformada com preço justo?
          </h2>
          <Link href="/#hero-form" className="btn-primary" style={{ display: "inline-flex", background: "#022c22", color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
            Pedir Orçamento Gratuito
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
