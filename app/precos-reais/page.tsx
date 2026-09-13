import type { Metadata } from "next";
import Link from "next/link";
import { PastProjectsPricing } from "@/components/past-projects-pricing";
import { Calculator, ArrowRight, Phone, Shield } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Obras Realizadas e Preços Reais em Aveiro | Freitas Renovações",
  description:
    "Veja exemplos de obras concluídas em Aveiro com custos reais discriminados, prazo de execução e especificações técnicas. Remodelação de casas de banho, cozinhas e apartamentos.",
  alternates: { canonical: "/precos-reais" },
};

export default function PrecosReaisPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #071a3a, #0f2d5e)", padding: "7.5rem 0 3.5rem" }}>
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>Preços Reais de Obras</span>
          </nav>
          <p className="section-eyebrow" style={{ color: "#fbbf24" }}>Transparência Total &amp; Casos de Estudo</p>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 900, color: "#ffffff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Obras Realizadas com Preços Reais em Aveiro
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: "620px", lineHeight: 1.65 }}>
            Compare a sua obra com remodelações concluídas pela nossa equipa em Esgueira, Glória, Aradas e arredores. Valores reais mais baratos e prazos rigorosamente cumpridos.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
            <Link href="/orcamento" className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}>
              <Calculator size={16} />
              Calcular Minha Obra
            </Link>
            <Link href="/precos-m2" className="btn-secondary" style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem", color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              Ver Tabela por m²
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Galeria de Casos Reais */}
      <PastProjectsPricing />

      {/* CTA Final */}
      <section style={{ background: "#071a3a", padding: "4rem 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="section-container" style={{ textAlign: "center", maxWidth: "680px" }}>
          <Shield size={36} style={{ color: "#fbbf24", margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.75rem" }}>
            Tem uma obra semelhante para fazer?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
            Fale connosco hoje. Fornecemos orçamento gratuito e detalhado em 12h com os melhores preços de Aveiro.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary">
              <Phone size={16} />
              Ligar {CONTRACTOR_INFO.phoneDisplay}
            </a>
            <Link href="/orcamento" className="btn-secondary" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              Simular Custo Online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
