import Link from "next/link";
import { Table, ArrowRight, ShieldCheck, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { AVERAGE_PRICES_AVEIRO } from "@/lib/projects-data";
import { CONTRACTOR_INFO } from "@/lib/constants";

export function AveragePricesGuide() {
  return (
    <section
      id="precos-medios-m2-aveiro"
      className="section-padding"
      style={{ background: "#F7F7F5", position: "relative" }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(23, 23, 23, 0.08)",
              border: "1px solid rgba(23, 23, 23, 0.15)",
              color: "#171717",
              borderRadius: "2rem",
              padding: "0.35rem 1rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              marginBottom: "0.875rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <Table size={14} style={{ color: "#525252" }} />
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
            border: "1.5px solid #E5E5E3",
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
                <tr style={{ background: "#0A0A0A", color: "#ffffff" }}>
                  <th style={{ padding: "1rem 1.25rem", fontSize: "0.8125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Tipo de Obra em Aveiro
                  </th>
                  <th style={{ padding: "1rem 1rem", fontSize: "0.8125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Unidade
                  </th>
                  <th style={{ padding: "1rem 1rem", fontSize: "0.8125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "#86efac" }}>
                    Económica / Low-Cost
                  </th>
                  <th style={{ padding: "1rem 1rem", fontSize: "0.8125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "#D4D4D4" }}>
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
                      borderBottom: "1px solid #F2F2F0",
                      background: idx % 2 === 0 ? "#ffffff" : "#fcfcfd",
                      transition: "background 0.15s ease",
                    }}
                  >
                    <td style={{ padding: "1rem 1.25rem", fontWeight: 700, color: "#0A0A0A", fontSize: "0.875rem" }}>
                      {row.service}
                    </td>
                    <td style={{ padding: "1rem 1rem", color: "#6B6B6B", fontSize: "0.8125rem", fontWeight: 600 }}>
                      {row.unit}
                    </td>
                    <td style={{ padding: "1rem 1rem", fontWeight: 700, color: "#16a34a", fontSize: "0.875rem" }}>
                      {row.lowCostRange}
                    </td>
                    <td style={{ padding: "1rem 1rem", fontWeight: 800, color: "#171717", fontSize: "0.875rem" }}>
                      {row.standardRange}
                    </td>
                    <td style={{ padding: "1rem 1rem", fontWeight: 700, color: "#9333ea", fontSize: "0.875rem" }}>
                      {row.premiumRange}
                    </td>
                    <td style={{ padding: "1rem 1.25rem", color: "#525252", fontSize: "0.8125rem", lineHeight: 1.5 }}>
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Nota de Esclarecimento sobre Estimativas vs. Preços Reais Históricos */}
        <div
          style={{
            background: "#eff6ff",
            border: "1.5px solid #bfdbfe",
            borderRadius: "0.5rem",
            padding: "1rem 1.25rem",
            marginBottom: "2rem",
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
          }}
        >
          <AlertCircle size={20} style={{ color: "#2563eb", flexShrink: 0, marginTop: "2px" }} />
          <div style={{ fontSize: "0.8125rem", color: "#1e3a8a", lineHeight: 1.6 }}>
            <strong>Nota de Transparência Orçamental:</strong> Os valores desta tabela representam <em>estimativas orientativas para novas obras em 2026</em> calculadas por m² de área útil/bruta. Distinguem intervenções parciais de remodelações completas chave na mão. Aos valores acresce IVA à taxa legal em vigor (com possibilidade de taxa reduzida de 6% para reabilitação urbana). Para consultar os <strong>valores finais adjudicados e pagos pelos clientes</strong> em projetos concluídos pela Freitas Renovações, consulte a nossa página de{" "}
            <Link href="/precos-reais" style={{ color: "#1d4ed8", fontWeight: 700, textDecoration: "underline" }}>
              Preços Reais de Obras
            </Link>
            .
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
              border: "1.5px solid #E5E5E3",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", color: "#171717" }}>
              <ShieldCheck size={18} style={{ color: "#525252" }} />
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#0A0A0A" }}>
                1. Mão de Obra vs. Materiais
              </h4>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#6B6B6B", lineHeight: 1.6 }}>
              Em média, a mão de obra representa entre 40% e 55% do valor total da obra em Aveiro. Os restantes 45% a 60% correspondem a materiais, equipamentos sanitários e taxas de gestão de resíduos autorizadas.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              border: "1.5px solid #E5E5E3",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", color: "#171717" }}>
              <AlertCircle size={18} style={{ color: "#525252" }} />
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#0A0A0A" }}>
                2. Idade do Imóvel e Acessos
              </h4>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#6B6B6B", lineHeight: 1.6 }}>
              Prédios antigos no centro de Aveiro sem elevador ou com canalizações de chumbo requerem substituição de prumadas e transporte manual de entulho, o que reflete ligeiramente no custo logístico.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              border: "1.5px solid #E5E5E3",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", color: "#171717" }}>
              <CheckCircle size={18} style={{ color: "#16a34a" }} />
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#0A0A0A" }}>
                3. Taxa Reduzida de IVA a 6%
              </h4>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "#6B6B6B", lineHeight: 1.6 }}>
              Trabalhar com uma empresa licenciada como a Freitas Renovações LDA permite aplicar IVA reduzido a 6% em mão de obra de reabilitação urbana em habitações próprias ou zonas ARU de Aveiro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
