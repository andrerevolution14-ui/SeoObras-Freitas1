import type { Metadata } from "next";
import Link from "next/link";
import { AveragePricesGuide } from "@/components/average-prices-guide";
import { Calculator, CheckCircle, Phone, ArrowRight, Shield } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Preços Médios por m² em Aveiro — Tabela de Remodelação 2026 | Freitas Renovações",
  description:
    "Consulte a tabela oficial de preços médios por m² para remodelação de casas de banho, cozinhas, capoto e pintura em Aveiro. Preços baratos, transparentes e sem surpresas.",
  alternates: { canonical: "/precos-m2" },
};

export default function PrecosM2Page() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #071a3a, #0f2d5e)", padding: "7.5rem 0 3.5rem" }}>
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>Preços Médios por m²</span>
          </nav>
          <p className="section-eyebrow" style={{ color: "#fbbf24" }}>Valores Reais &amp; Honestos em Aveiro</p>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 900, color: "#ffffff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Preços Médios por m² em Aveiro
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: "620px", lineHeight: 1.65 }}>
            Consulte a tabela detalhada de custos de construção civil e remodelação para habitações em Aveiro. Preços económicos, sem custos ocultos e com garantia técnica.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
            <Link href="/orcamento" className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}>
              <Calculator size={16} />
              Simular na Calculadora
            </Link>
            <Link href="/precos-reais" className="btn-secondary" style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem", color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              Ver Obras Reais com Preços
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tabela de Preços Médios */}
      <AveragePricesGuide />

      {/* CTA Final */}
      <section style={{ background: "#071a3a", padding: "4rem 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="section-container" style={{ textAlign: "center", maxWidth: "680px" }}>
          <Shield size={36} style={{ color: "#fbbf24", margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.75rem" }}>
            Quer uma cotação exata para a sua obra em Aveiro?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
            Avaliamos o local sem qualquer compromisso e apresentamos proposta discriminada com materiais e mão de obra a preços justos.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary">
              <Phone size={16} />
              Ligar {CONTRACTOR_INFO.phoneDisplay}
            </a>
            <Link href="/orcamento" className="btn-secondary" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              Abrir Calculadora de Orçamento
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
