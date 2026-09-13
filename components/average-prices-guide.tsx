import Link from "next/link";
import { Table, ArrowRight, ShieldCheck, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { AVERAGE_PRICES_AVEIRO } from "@/lib/projects-data";
import { CONTRACTOR_INFO } from "@/lib/constants";

export function AveragePricesGuide() {
  return (
    <section
      id="precos-medios-m2-aveiro"
      className="section-padding"
      style={{ background: "#f8fafc", position: "relative" }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(15, 45, 94, 0.08)",
              border: "1px solid rgba(15, 45, 94, 0.15)",
              color: "#0f2d5e",
              borderRadius: "2rem",
              padding: "0.35rem 1rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              marginBottom: "0.875rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <Table size={14} style={{ color: "#d97706" }} />
            Tabela de Referência Atualizada 2026
          </div>
          <h2 className="section-title">
            Preços Médios de Obras e Remodelações por m² em Aveiro
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Consulte os intervalos reais praticados no município de Aveiro para que possa planear o seu investimento com confiança e evitar propostas inflacionadas.
          </p>
        </div>

        {/* Responsive Table Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "0.75rem",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 4px 25px rgba(0,0,0,0.04)",
            overflow: "hidden",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                minWidth: "720px",
              }}
            >
              <thead>
                <tr style={{ background: "#071a3a", color: "#ffffff" }}>
                  <th style={{ padding: "1rem 1.25rem", fontSize: "0.8125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Tipo de Obra em Aveiro
                  </th>
                  <th style={{ padding: "1rem 1rem", fontSize: "0.8125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Unidade
                  </th>
                  <th style={{ padding: "1rem 1rem", fontSize: "0.8125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "#86efac" }}>
                    Económica / Low-Cost
                  </th>
                  <th style={{ padding: "1rem 1rem", fontSize: "0.8125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "#fbbf24" }}>
                    Standard / Equilibrada
                  </th>
                  <th style={{ padding: "1rem 1rem", fontSize: "0.8125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "#fbcfe8" }}>
                    Alta Gama / Premium
                  </th>
                  <th style={{ padding: "1rem 1.25rem", fontSize: "0.8125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Observações Técnicas
                  </th>
                </tr>
              </thead>
              <tbody>
                {AVERAGE_PRICES_AVEIRO.map((row, idx) => (
                  <tr
                    key={row.service}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      background: idx % 2 === 0 ? "#ffffff" : "#fcfcfd",
                      transition: "background 0.15s ease",
                    }}
                  >
                    <td style={{ padding: "1rem 1.25rem", fontWeight: 700, color: "#071a3a", fontSize: "0.875rem" }}>
                      {row.service}
                    </td>
                    <td style={{ padding: "1rem 1rem", color: "#64748b", fontSize: "0.8125rem", fontWeight: 600 }}>
                      {row.unit}
                    </td>
                    <td style={{ padding: "1rem 1rem", fontWeight: 700, color: "#16a34a", fontSize: "0.875rem" }}>
                      {row.lowCostRange}
                    </td>
                    <td style={{ padding: "1rem 1rem", fontWeight: 800, color: "#0f2d5e", fontSize: "0.875rem" }}>
                      {row.standardRange}
                    </td>
                    <td style={{ padding: "1rem 1rem", fontWeight: 700, color: "#9333ea", fontSize: "0.875rem" }}>
                      {row.premiumRange}
                    </td>
                    <td style={{ padding: "1rem 1.25rem", color: "#475569", fontSize: "0.8125rem", lineHeight: 1.5 }}>
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Key Factors that Influence Price */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              border: "1.5px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", color: "#0f2d5e" }}>
              <ShieldCheck size={18} style={{ color: "#d97706" }} />
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#071a3a" }}>
                1. Mão de Obra vs. Materiais
              </h4>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.6 }}>
              Em média, a mão de obra representa entre 40% e 55% do valor total da obra em Aveiro. Os restantes 45% a 60% correspondem a materiais, equipamentos sanitários e taxas de gestão de resíduos autorizadas.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              border: "1.5px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", color: "#0f2d5e" }}>
              <AlertCircle size={18} style={{ color: "#d97706" }} />
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#071a3a" }}>
                2. Idade do Imóvel e Acessos
              </h4>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.6 }}>
              Prédios antigos no centro de Aveiro sem elevador ou com canalizações de chumbo requerem substituição de prumadas e transporte manual de entulho, o que reflete ligeiramente no custo logístico.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              border: "1.5px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", color: "#0f2d5e" }}>
              <CheckCircle size={18} style={{ color: "#16a34a" }} />
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#071a3a" }}>
                3. Taxa Reduzida de IVA a 6%
              </h4>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.6 }}>
              Trabalhar com uma empresa licenciada como a Freitas Renovações LDA permite aplicar IVA reduzido a 6% em mão de obra de reabilitação urbana em habitações próprias ou zonas ARU de Aveiro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
