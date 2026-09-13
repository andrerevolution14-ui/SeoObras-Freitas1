import Link from "next/link";
import { TrendingUp, ArrowRight, Home, Zap, Shield, Sparkles } from "lucide-react";
import { HIGH_ROI_RENOVATIONS } from "@/lib/projects-data";

export function RoiValuation() {
  return (
    <section
      id="remodelacoes-valorizacao-roi"
      className="section-padding"
      style={{ background: "#f8fafc" }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              color: "#15803d",
              borderRadius: "2rem",
              padding: "0.35rem 1rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              marginBottom: "0.875rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <TrendingUp size={14} />
            Valorização Imobiliária em Aveiro
          </div>
          <h2 className="section-title">
            Remodelações que Fazem Logo a Casa Valer Mais (ROI Comprovado)
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Conheça as intervenções com maior retorno sobre o investimento (ROI) no mercado imobiliário do concelho de Aveiro, quer pretenda vender, arrendar ou aumentar o património familiar.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {HIGH_ROI_RENOVATIONS.map((item, idx) => (
            <div
              key={item.id}
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
                {/* Badge ROI */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    background: "rgba(34, 197, 94, 0.12)",
                    color: "#15803d",
                    padding: "0.3rem 0.65rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    marginBottom: "1rem",
                  }}
                >
                  <TrendingUp size={13} />
                  <span>ROI: {item.roiPercentage}</span>
                </div>

                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: "1.125rem",
                    color: "#071a3a",
                    marginBottom: "0.5rem",
                    lineHeight: 1.35,
                  }}
                >
                  {item.renovationType}
                </h3>

                <div
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 800,
                    color: "#b45309",
                    marginBottom: "0.875rem",
                  }}
                >
                  Impacto: {item.valueAddedAverage}
                </div>

                <p
                  style={{
                    color: "#475569",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    marginBottom: "1rem",
                  }}
                >
                  {item.whyItPaysOff}
                </p>
              </div>

              <div
                style={{
                  background: "rgba(15, 45, 94, 0.04)",
                  borderLeft: "3px solid #0f2d5e",
                  padding: "0.625rem 0.75rem",
                  borderRadius: "0 0.375rem 0.375rem 0",
                  fontSize: "0.775rem",
                  color: "#334155",
                  lineHeight: 1.45,
                }}
              >
                <strong>No Mercado de Aveiro:</strong> {item.aveiroContext}
              </div>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link
            href="/#calculadora-orcamento"
            className="btn-primary"
            style={{ display: "inline-flex" }}
          >
            <span>Simular Custo de Remodelação para Valorização</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
