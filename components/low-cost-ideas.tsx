import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, TrendingDown, Lightbulb } from "lucide-react";
import { LOW_COST_IDEAS } from "@/lib/projects-data";

export function LowCostIdeas() {
  return (
    <section
      id="ideias-renovacao-low-cost"
      className="section-padding"
      style={{ background: "#ffffff" }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
              color: "#b45309",
              borderRadius: "2rem",
              padding: "0.35rem 1rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              marginBottom: "0.875rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <Lightbulb size={14} />
            Engenharia & Decoração Inteligente
          </div>
          <h2 className="section-title">
            Melhores Ideias para uma Renovação Low-Cost de Alto Impacto em Aveiro
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Nem todas as transformações exigem partir paredes ou rebentar o orçamento. Descubra soluções testadas pelo Empreiteiro Jorge Freitas que modernizam o seu espaço gastando até 60% menos.
          </p>
        </div>

        {/* Ideas Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {LOW_COST_IDEAS.map((idea) => (
            <div
              key={idea.id}
              className="card-hover"
              style={{
                background: "#ffffff",
                borderRadius: "0.75rem",
                padding: "1.75rem",
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.875rem",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(15, 45, 94, 0.08)",
                      color: "#0f2d5e",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      padding: "0.25rem 0.625rem",
                      borderRadius: "0.25rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {idea.category}
                  </span>
                  <span
                    style={{
                      background: "#dcfce7",
                      color: "#166534",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      padding: "0.25rem 0.625rem",
                      borderRadius: "0.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <TrendingDown size={12} />
                    {idea.estimatedSaving}
                  </span>
                </div>

                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: "1.0625rem",
                    color: "#071a3a",
                    marginBottom: "0.5rem",
                    lineHeight: 1.35,
                  }}
                >
                  {idea.title}
                </h3>

                <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {idea.summary}
                </p>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  borderLeft: "3px solid #f59e0b",
                  padding: "0.75rem 0.875rem",
                  borderRadius: "0 0.375rem 0.375rem 0",
                  fontSize: "0.8125rem",
                  color: "#334155",
                  lineHeight: 1.5,
                }}
              >
                <strong>Como aplicar na prática:</strong> {idea.howToApply}
              </div>
            </div>
          ))}
        </div>

        {/* Low cost callout */}
        <div
          style={{
            marginTop: "2.5rem",
            textAlign: "center",
            padding: "1.5rem",
            background: "#f8fafc",
            borderRadius: "0.5rem",
            border: "1.5px dashed #cbd5e1",
          }}
        >
          <p style={{ color: "#475569", fontSize: "0.9375rem", marginBottom: "0.75rem" }}>
            Tem um orçamento fixo e quer saber o que é possível fazer com o máximo aproveitamento?
          </p>
          <Link
            href="/#calculadora-orcamento"
            style={{
              color: "#0f2d5e",
              fontWeight: 800,
              fontSize: "0.9375rem",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span>Simular opção Económica na Calculadora de Obras em Aveiro</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
