import Link from "next/link";
import { ShieldCheck, CheckCircle, ArrowRight, Phone, Building2, PiggyBank, Sparkles } from "lucide-react";
import { COMPANIES_AVEIRO_CRITERIA, MONEY_SAVING_TIPS } from "@/lib/projects-data";
import { CONTRACTOR_INFO } from "@/lib/constants";

export function CompaniesGuide() {
  return (
    <section
      id="empresas-renovacoes-aveiro"
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        position: "relative",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
            <Building2 size={14} style={{ color: "#d97706" }} />
            Segurança, Licenciamento & Poupança
          </div>
          <h2 className="section-title">
            Empresas de Renovações em Aveiro: Como Escolher e Como Poupar Dinheiro
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Contratar uma empresa de remodelações no distrito de Aveiro exige atenção a critérios legais e técnicos. Saiba como blindar o seu investimento e aplicar as melhores práticas de poupança.
          </p>
        </div>

        {/* Two Columns Grid: 1. Criteria / 2. Money Saving */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
          className="companies-two-col"
        >
          {/* Column 1: Criteria */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.25rem",
              }}
            >
              <ShieldCheck size={22} style={{ color: "#0f2d5e" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#071a3a" }}>
                Checklist: Como Escolher um Empreiteiro em Aveiro
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {COMPANIES_AVEIRO_CRITERIA.map((crit) => (
                <div
                  key={crit.id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "0.5rem",
                    border: "1.5px solid #e2e8f0",
                    padding: "1.125rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#071a3a", fontSize: "0.9375rem", marginBottom: "0.35rem" }}>
                    {crit.title}
                  </div>
                  <p style={{ color: "#64748b", fontSize: "0.8125rem", lineHeight: 1.55, marginBottom: "0.625rem" }}>
                    {crit.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      color: "#166534",
                      background: "#f0fdf4",
                      padding: "0.35rem 0.65rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    <CheckCircle size={13} style={{ flexShrink: 0 }} />
                    <span>Na Freitas Renovações: {crit.checkFreitas}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: How to Save Money */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.25rem",
              }}
            >
              <PiggyBank size={22} style={{ color: "#d97706" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#071a3a" }}>
                Como Poupar Dinheiro em Obras em Aveiro
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {MONEY_SAVING_TIPS.map((tip) => (
                <div
                  key={tip.number}
                  style={{
                    background: "#ffffff",
                    borderRadius: "0.5rem",
                    border: "1.5px solid #e2e8f0",
                    padding: "1.125rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "0.375rem",
                      background: "rgba(245, 158, 11, 0.15)",
                      color: "#b45309",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "0.9375rem",
                      flexShrink: 0,
                    }}
                  >
                    {tip.number}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: "#071a3a", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>
                      {tip.title}
                    </div>
                    <p style={{ color: "#64748b", fontSize: "0.8125rem", lineHeight: 1.55 }}>
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action strip */}
        <div
          style={{
            marginTop: "3rem",
            background: "#071a3a",
            borderRadius: "0.75rem",
            padding: "1.75rem 2rem",
            color: "#ffffff",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          <div>
            <div style={{ color: "#fbbf24", fontWeight: 800, fontSize: "0.8125rem", textTransform: "uppercase" }}>
              Precisa de aconselhamento honesto em Aveiro?
            </div>
            <div style={{ fontSize: "1.125rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Fale diretamente com o Empreiteiro Jorge Freitas
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href={`tel:${CONTRACTOR_INFO.phone}`}
              className="btn-primary"
              style={{ fontSize: "0.875rem" }}
            >
              <Phone size={15} />
              <span>{CONTRACTOR_INFO.phoneDisplay}</span>
            </a>
            <Link
              href="/blog"
              className="btn-secondary"
              style={{ fontSize: "0.875rem", background: "rgba(255,255,255,0.1)" }}
            >
              <span>Ler Todos os Artigos do Blog</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .companies-two-col {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
