import type { Metadata } from "next";
import { Phone, MapPin, Star, Shield, Clock, ArrowRight, CheckCircle, CreditCard } from "lucide-react";
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
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt" },
  keywords: [
    "obras aveiro",
    "remodelações aveiro",
    "empreiteiro aveiro",
    "remodelação de casas de banho aveiro",
    "remodelação de cozinhas aveiro",
    "capoto aveiro",
    "isolamento térmico aveiro",
    "pintura de interiores e exteriores aveiro",
    "reparação de telhados aveiro",
    "canalizador aveiro",
    "eletricista aveiro",
    "empresa de construção aveiro",
    "obras baratas aveiro",
    "preços obras aveiro",
    "freitas renovações lda",
    "jorge freitas empreiteiro",
  ],
  openGraph: {
    title: "Freitas Renovações LDA | Obras e Remodelações em Aveiro",
    description:
      "Empresa licenciada de obras, remodelações e reparações em Aveiro. Empreiteiro Jorge Freitas. ⭐ 4.9/5 Google · +100 obras · Preços Justos · Orçamento gratuito.",
    url: "https://www.grupofreitasrenovacoes.pt",
    siteName: "Freitas Renovações LDA",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Freitas Renovações LDA — Obras e Remodelações em Aveiro",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freitas Renovações LDA | Obras e Remodelações em Aveiro",
    description:
      "Empresa licenciada de obras em Aveiro. Orçamento gratuito e resposta em menos de 12h. Preços justos.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
  },
};

// Enhanced JSON-LD Schema: LocalBusiness + BreadcrumbList
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.grupofreitasrenovacoes.pt/#organization",
      name: CONTRACTOR_INFO.companyName,
      image: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
      logo: "https://www.grupofreitasrenovacoes.pt/logo.png",
      telephone: CONTRACTOR_INFO.phone,
      email: CONTRACTOR_INFO.email,
      url: "https://www.grupofreitasrenovacoes.pt",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTRACTOR_INFO.address.street,
        postalCode: CONTRACTOR_INFO.address.postalCode,
        addressLocality: "Aveiro",
        addressRegion: "Aveiro",
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
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://www.grupofreitasrenovacoes.pt",
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
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
                  { emoji: "💳", text: "Crédito Obras 100% Grátis" },
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
          background: "linear-gradient(135deg, #071a3a 0%, #0f2d5e 100%)",
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

      {/* ── 6.5. CRÉDITO & FINANCIAMENTO PARA OBRAS (100% GRÁTIS) ── */}
      <section
        className="section-padding"
        style={{
          background: "#ffffff",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div className="section-container">
          <div
            style={{
              background: "linear-gradient(135deg, #071a3a 0%, #0f2d5e 100%)",
              borderRadius: "1rem",
              padding: "2.5rem 2rem",
              color: "#ffffff",
              display: "grid",
              gridTemplateColumns: "1.3fr 0.7fr",
              gap: "2.5rem",
              alignItems: "center",
              boxShadow: "0 10px 30px rgba(7, 26, 58, 0.15)",
              border: "1.5px solid rgba(251, 191, 36, 0.3)",
            }}
            className="credit-highlight-box"
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  color: "#34d399",
                  borderRadius: "2rem",
                  padding: "0.3rem 0.875rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                <CreditCard size={14} />
                Condição Especial da Oferta · 100% Gratuito
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
                  fontWeight: 900,
                  lineHeight: 1.2,
                  marginBottom: "1rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Precisa de Financiamento para a Sua Obra?{" "}
                <span className="text-gradient-gold">Nós Ajudamos.</span>
              </h2>

              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                }}
              >
                Para além da garantia de qualidade e preços justos nas suas remodelações, dispomos de um
                <strong> serviço parceiro de intermediação de crédito 100% gratuito</strong>, devidamente
                autorizado pelo Banco de Portugal. Comparamos propostas em mais de 10 bancos para garantir
                a taxa mais baixa do mercado e prestações à sua medida.
              </p>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a
                  href="/credito-obras"
                  className="btn-primary"
                  id="home-credit-learn-btn"
                  style={{ fontSize: "0.875rem", padding: "0.75rem 1.25rem" }}
                >
                  <span>Saber Mais Sobre Crédito Obras</span>
                  <ArrowRight size={15} />
                </a>

                <a
                  href={`tel:${CONTRACTOR_INFO.phone}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#ffffff",
                    fontWeight: 700,
                    padding: "0.75rem 1.25rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                  }}
                  id="home-credit-call-btn"
                >
                  <Phone size={15} style={{ color: "#fbbf24" }} />
                  <span>{CONTRACTOR_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Quick Benefits List */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
              }}
            >
              <div style={{ fontWeight: 800, color: "#fbbf24", fontSize: "0.9375rem", marginBottom: "0.875rem" }}>
                Vantagens do Financiamento:
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  "Custo Zero: 0€ de comissões para si",
                  "Resposta rápida entre 24h e 48h",
                  "Prazos flexíveis de 12 a 120 meses",
                  "Financiamento até 100% do valor da obra",
                  "Intermediários vinculados Banco de Portugal",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.8125rem", color: "rgba(255,255,255,0.9)" }}>
                    <CheckCircle size={15} style={{ color: "#34d399", flexShrink: 0, marginTop: "2px" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 850px) {
            .credit-highlight-box {
              grid-template-columns: 1fr !important;
              gap: 1.75rem !important;
              padding: 1.75rem 1.25rem !important;
            }
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
              color: "#071a3a",
              marginBottom: "0.75rem",
              letterSpacing: "-0.01em",
            }}
          >
            Pronto para remodelar com preço justo?
          </h2>
          <p style={{ color: "rgba(7, 26, 58, 0.85)", fontSize: "1rem", marginBottom: "2rem", maxWidth: "480px", margin: "0 auto 2rem" }}>
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
                background: "#071a3a",
                color: "#ffffff",
                fontWeight: 800,
                padding: "0.875rem 1.75rem",
                borderRadius: "0.375rem",
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(7, 26, 58, 0.3)",
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
                background: "rgba(7, 26, 58, 0.12)",
                color: "#071a3a",
                fontWeight: 800,
                padding: "0.875rem 1.75rem",
                borderRadius: "0.375rem",
                fontSize: "1rem",
                textDecoration: "none",
                border: "2px solid rgba(7, 26, 58, 0.3)",
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
