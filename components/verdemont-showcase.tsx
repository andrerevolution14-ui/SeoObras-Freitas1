import { ExternalLink, Award, CheckCircle, ArrowRight, ShieldCheck, Building } from "lucide-react";
import { VERDEMONT_PROJECT, PAST_DETAILED_PROJECTS } from "@/lib/projects-data";

export function VerdemontShowcase() {
  return (
    <section
      id="projeto-destaque-verdemont"
      style={{
        background: "linear-gradient(135deg, #051329 0%, #0a2347 50%, #071a3a 100%)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        padding: "4.5rem 0",
        borderTop: "2px solid rgba(251, 191, 36, 0.3)",
        borderBottom: "2px solid rgba(251, 191, 36, 0.3)",
      }}
    >
      {/* Decorative background glow */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-150px",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(7, 26, 58, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
          className="verdemont-grid"
        >
          {/* Left Column: Context & Link */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(251, 191, 36, 0.15)",
                border: "1px solid rgba(251, 191, 36, 0.4)",
                color: "#fbbf24",
                borderRadius: "2rem",
                padding: "0.35rem 1rem",
                fontSize: "0.75rem",
                fontWeight: 800,
                marginBottom: "1.25rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <Award size={14} />
              Grande Projeto Atual em Destaque
            </div>

            <h2
              style={{
                fontSize: "clamp(1.85rem, 3.5vw, 2.75rem)",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.15,
                marginBottom: "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              Empreendimento <span className="text-gradient-gold">Verdemont</span>
            </h2>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.0625rem",
                fontWeight: 700,
                color: "#fef08a",
                marginBottom: "1.25rem",
              }}
            >
              <Building size={18} />
              <span>Construção & Arquitetura de Alto Padrão</span>
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              A equipa da <strong>Freitas Renovações LDA</strong> e o Empreiteiro <strong>Jorge Freitas</strong> têm a honra de demonstrar a sua comprovada competência técnica, rigor estrutural e acabamentos de grande escala no prestigiado projeto internacional <strong>Verdemont</strong>. Conheça todos os detalhes do empreendimento em{" "}
              <a
                href={VERDEMONT_PROJECT.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#fbbf24",
                  fontWeight: 800,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                {VERDEMONT_PROJECT.domain}
              </a>.
            </p>

            {/* Key highlights list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
                marginBottom: "2rem",
              }}
            >
              {VERDEMONT_PROJECT.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "0.875rem",
                  }}
                >
                  <CheckCircle size={16} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Direct Link Button to www.verdemont.eu */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href={VERDEMONT_PROJECT.url}
                target="_blank"
                rel="noopener noreferrer"
                id="verdemont-external-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                  color: "#071a3a",
                  fontWeight: 900,
                  fontSize: "1rem",
                  padding: "0.875rem 1.75rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  boxShadow: "0 6px 20px rgba(251, 191, 36, 0.35)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <span>Visitar Website Oficial Verdemont</span>
                <ExternalLink size={17} />
              </a>

              <a
                href="/#calculadora-orcamento"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(255,255,255,0.08)",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <span>Pedir Obra do Mesmo Nível</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div>
            <div
              style={{
                position: "relative",
                borderRadius: "1rem",
                overflow: "hidden",
                border: "2px solid rgba(251, 191, 36, 0.4)",
                boxShadow: "0 15px 50px rgba(0,0,0,0.5)",
                background: "#071a3a",
              }}
            >
              <img
                src="/verdemont.jpg"
                alt="Empreendimento de arquitetura contemporânea Verdemont www.verdemont.eu — Intervenção Freitas Renovações LDA"
                style={{
                  width: "100%",
                  height: "440px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(5, 19, 41, 0.95) 0%, rgba(5, 19, 41, 0.2) 60%, transparent 100%)",
                }}
              />

              {/* Bottom Card Info */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div style={{ color: "#fbbf24", fontWeight: 800, fontSize: "1.125rem" }}>
                    Projeto Verdemont
                  </div>
                  <a
                    href={VERDEMONT_PROJECT.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#ffffff",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      textDecoration: "none",
                      background: "rgba(255,255,255,0.15)",
                      padding: "0.25rem 0.625rem",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <span>www.verdemont.eu</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.8125rem", lineHeight: 1.5 }}>
                  Garantia de capacidade para projetos de qualquer dimensão em Aveiro: desde reabilitações residenciais a grandes empreendimentos imobiliários.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .verdemont-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
