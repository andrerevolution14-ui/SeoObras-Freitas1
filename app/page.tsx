import type { Metadata } from "next";
import { Phone, MapPin, Star, Shield, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { HeroMultiStepForm } from "@/components/hero-multi-step-form";
import { TrustBar } from "@/components/trust-bar";
import { ServiceGrid } from "@/components/service-grid";
import { GoogleReviews } from "@/components/google-reviews";
import { RealProjectsGallery } from "@/components/real-projects-gallery";
import { FaqAccordion } from "@/components/faq-accordion";
import { CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Freitas Renovações LDA | Obras e Remodelações em Aveiro",
  description:
    "Empresa licenciada de obras, remodelações e reparações em Aveiro. Empreiteiro Jorge Freitas. ⭐ 4.9/5 Google · +100 obras · Preços Justos · Orçamento gratuito · Resposta até 12h.",
  alternates: { canonical: "/" },
};

// AggregateRating JSON-LD schema for yellow stars in Google search results
const aggregateRatingJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: CONTRACTOR_INFO.companyName,
  image: "https://freitasrenovacoes.pt/logo.png",
  telephone: CONTRACTOR_INFO.phone,
  url: "https://freitasrenovacoes.pt",
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTRACTOR_INFO.address.street,
    postalCode: CONTRACTOR_INFO.address.postalCode,
    addressLocality: "Aveiro",
    addressCountry: "PT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CONTRACTOR_INFO.geo.latitude,
    longitude: CONTRACTOR_INFO.geo.longitude,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "48",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingJsonLd) }}
      />

      {/* ── 1. HERO & LEAD GENERATOR ─────────────────────── */}
      <section className="hero-section">
        <div className="hero-grid-pattern" />
        <div className="section-container" style={{ width: "100%", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* Left Column — Value Proposition */}
            <div className="hero-left-content">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(251, 191, 36, 0.15)",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                  color: "#fef08a",
                  borderRadius: "0.25rem",
                  padding: "0.375rem 0.875rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  marginBottom: "1.25rem",
                  letterSpacing: "0.02em",
                }}
              >
                <MapPin size={13} />
                Atendimento Rápido em Aveiro & Freguesias
              </div>

              <h1
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  fontSize: "clamp(1.875rem, 4vw, 3rem)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  marginBottom: "1rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Obras, Remodelações e Reparações em{" "}
                <span className="text-gradient-gold">Aveiro.</span>{" "}
                <span style={{ color: "rgba(255,255,255,0.9)" }}>Preços Justos.</span>
              </h1>

              {/* Subtitle Paragraph — Hidden on Mobile per user request */}
              <p
                className="hero-subtitle hidden-mobile"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                  maxWidth: "480px",
                }}
              >
                A equipa do Empreiteiro <strong style={{ color: "#fbbf24" }}>Jorge Freitas</strong> resolve a sua obra com garantia de qualidade, orçamento transparente, preços justos e rapidez.
              </p>

              {/* Trust micro-badges */}
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.75rem" }}
                className="hero-badges-wrapper"
              >
                {[
                  { emoji: "⭐", text: "4.9/5 no Google" },
                  { emoji: "🛡️", text: "Empresa Licenciada" },
                  { emoji: "⚡", text: "Resposta até 12h" },
                  { emoji: "💶", text: "Preços Justos" },
                ].map((badge) => (
                  <div
                    key={badge.text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "0.25rem",
                      padding: "0.3rem 0.75rem",
                      color: "rgba(255,255,255,0.95)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    <span>{badge.emoji}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div
                style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
                className="hero-btn-wrapper"
              >
                <a
                  href={`tel:${CONTRACTOR_INFO.phone}`}
                  className="btn-primary"
                  id="hero-call-btn"
                >
                  <Phone size={18} />
                  <span>{CONTRACTOR_INFO.phoneDisplay}</span>
                </a>
                <a href="#hero-form" className="btn-secondary" id="hero-quote-btn">
                  <span>Pedir Orçamento Grátis</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Rating Teaser */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginTop: "1.5rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
                className="hero-rating-teaser"
              >
                <div style={{ display: "flex", gap: "2px" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="#fbbf24" stroke="#fbbf24" />
                  ))}
                </div>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8125rem" }}>
                  +48 clientes satisfeitos em Aveiro com orçamentos justos
                </p>
              </div>
            </div>

            {/* Right Column — Multi-step Lead Form */}
            <div>
              <HeroMultiStepForm />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
            .hero-left-content {
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .hero-subtitle {
              display: none !important;
            }
            .hero-badges-wrapper {
              justify-content: center;
            }
            .hero-btn-wrapper {
              justify-content: center;
              width: 100%;
            }
            .hero-btn-wrapper a {
              width: 100%;
            }
            .hero-rating-teaser {
              justify-content: center;
            }
          }
        `}</style>
      </section>

      {/* ── 2. TRUST BAR (Continuous marquee scroll on mobile) ── */}
      <TrustBar />

      {/* ── 3. GOOGLE REVIEWS ────────────────────────────── */}
      <GoogleReviews />

      {/* ── 4. PROJETOS REALIZADOS (Directly below reviews) ── */}
      <RealProjectsGallery />

      {/* ── 5. SERVICE GRID ──────────────────────────────── */}
      <ServiceGrid />

      {/* ── 6. E-E-A-T ABOUT JORGE FREITAS ───────────────── */}
      <section
        className="section-padding"
        style={{
          background: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3.5rem",
              alignItems: "center",
            }}
            className="about-grid"
          >
            <div>
              <p className="section-eyebrow" style={{ color: "#fbbf24" }}>Quem Somos</p>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(1.625rem, 3.2vw, 2.25rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.2,
                  marginBottom: "1rem",
                }}
              >
                Supervisão Direta pelo <span className="text-gradient-gold">Empreiteiro Jorge Freitas</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                A Freitas Renovações LDA é uma empresa licenciada em Aveiro que se destaca pela transparência, cumprimento rigoroso de prazos e orçamentos de preço justo. O Jorge Freitas acompanha cada obra pessoalmente.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "1.75rem" }}>
                {[
                  { number: `+${CONTRACTOR_INFO.projectsCompleted}`, label: "Obras Concluídas" },
                  { number: "4.9★", label: "Avaliação Google" },
                  { number: "Até 12h", label: "Resposta Rápida" },
                  { number: "100%", label: "Preços Justos" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "0.375rem",
                      padding: "1rem",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fbbf24", lineHeight: 1 }}>
                      {stat.number}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", marginTop: "0.25rem" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <a href="/sobre" className="btn-primary" id="about-learn-more-btn">
                Saber Mais Sobre a Nossa Empresa
                <ArrowRight size={16} />
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                {
                  icon: <Shield size={20} />,
                  title: "Alvará de Construção Válido IMPIC",
                  desc: "Empresa devidamente licenciada com seguro de responsabilidade civil para execução de obras.",
                },
                {
                  icon: <CheckCircle size={20} />,
                  title: "Garantia Contratual",
                  desc: "Todos os trabalhos têm garantia contratual escrita adaptada à tipologia da obra.",
                },
                {
                  icon: <Clock size={20} />,
                  title: "Resposta até 12h",
                  desc: "Atendimento ágil para avaliar a sua obra e apresentar orçamento discriminado.",
                },
                {
                  icon: <Star size={20} />,
                  title: "Preços Justos e Transparentes",
                  desc: "Valores claros, sem custos ocultos nem alterações imprevisíveis no orçamento final.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: "0.875rem",
                    padding: "1rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.375rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "0.25rem",
                      background: "rgba(251, 191, 36, 0.15)",
                      border: "1px solid rgba(251, 191, 36, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fbbf24",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.9375rem", marginBottom: "0.2rem" }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .about-grid { grid-template-columns: 1fr !important; gap: 2.25rem !important; }
          }
        `}</style>
      </section>

      {/* ── 7. FAQ ACCORDION ─────────────────────────────── */}
      <FaqAccordion />

      {/* ── 8. FINAL CTA ─────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <div className="section-container">
          <h2
            style={{
              fontSize: "clamp(1.625rem, 3.2vw, 2.25rem)",
              fontWeight: 900,
              color: "#022c22",
              marginBottom: "0.75rem",
              letterSpacing: "-0.01em",
            }}
          >
            Pronto para remodelar com preço justo?
          </h2>
          <p style={{ color: "rgba(2, 44, 34, 0.85)", fontSize: "1rem", marginBottom: "2rem", maxWidth: "480px", margin: "0 auto 2rem" }}>
            Peça um orçamento gratuito hoje. A equipa do Jorge Freitas responde no prazo máximo de 12 horas.
          </p>

          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={`tel:${CONTRACTOR_INFO.phone}`}
              id="final-cta-call"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#022c22",
                color: "#ffffff",
                fontWeight: 800,
                padding: "0.875rem 1.75rem",
                borderRadius: "0.375rem",
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(2, 44, 34, 0.3)",
              }}
            >
              <Phone size={18} />
              <span>{CONTRACTOR_INFO.phoneDisplay}</span>
            </a>

            <a
              href="#hero-form"
              id="final-cta-form"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(2, 44, 34, 0.12)",
                color: "#022c22",
                fontWeight: 800,
                padding: "0.875rem 1.75rem",
                borderRadius: "0.375rem",
                fontSize: "1rem",
                textDecoration: "none",
                border: "2px solid rgba(2, 44, 34, 0.3)",
              }}
            >
              <span>Pedir Orçamento Online</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
