import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, Phone, MapPin, Shield, Clock, Euro, Sparkles } from "lucide-react";
import { SERVICES, PARISHES, CONTRACTOR_INFO } from "@/lib/constants";
import { generateServiceSEO } from "@/lib/seo-data";
import { HeroMultiStepForm } from "@/components/hero-multi-step-form";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  const seo = generateServiceSEO(service);
  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      service.title.toLowerCase(),
      `${service.title.toLowerCase()} aveiro`,
      `serviço de ${service.title.toLowerCase()} aveiro`,
      `orçamento ${service.title.toLowerCase()} aveiro`,
      "obras aveiro",
      "remodelações aveiro",
      "empresa de remodelações aveiro",
      "obras chave na mão aveiro",
      "freitas renovações lda",
      "jorge freitas empreiteiro aveiro",
      ...service.keywords,
    ],
    alternates: { canonical: `https://www.grupofreitasrenovacoes.pt/servicos/${slug}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.grupofreitasrenovacoes.pt/servicos/${slug}`,
      type: "website",
      locale: "pt_PT",
      images: [
        {
          url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${service.title} em Aveiro — Freitas Renovações LDA`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const seo = generateServiceSEO(service);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: CONTRACTOR_INFO.companyName,
      telephone: CONTRACTOR_INFO.phone,
      url: CONTRACTOR_INFO.website,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTRACTOR_INFO.address.street,
        addressLocality: "Aveiro",
        postalCode: CONTRACTOR_INFO.address.postalCode,
        addressCountry: "PT",
      },
    },
    areaServed: PARISHES.map((p) => ({
      "@type": "City",
      name: p.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: p.isNeighboringCounty ? p.name : "Aveiro",
      },
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seo.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://www.grupofreitasrenovacoes.pt/" },
      { "@type": "ListItem", position: 2, name: "Serviços", item: "https://www.grupofreitasrenovacoes.pt/servicos" },
      { "@type": "ListItem", position: 3, name: service.title, item: `https://www.grupofreitasrenovacoes.pt/servicos/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #071a3a 0%, #0f2d5e 100%)",
          padding: "7.5rem 0 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <Link href="/servicos" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Serviços</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>{service.title}</span>
          </nav>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 420px",
              gap: "3.5rem",
              alignItems: "start",
            }}
            className="service-hero-grid"
          >
            <div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    background: "rgba(251, 191, 36, 0.15)",
                    border: "1px solid rgba(251, 191, 36, 0.35)",
                    color: "#fbbf24",
                    borderRadius: "2rem",
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  <Shield size={12} /> Alvará IMPIC Válido
                </span>

                {service.emergencyAvailable && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      background: "rgba(239, 68, 68, 0.15)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      color: "#fca5a5",
                      borderRadius: "2rem",
                      padding: "0.25rem 0.75rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    🔴 Resposta Rápida Aveiro
                  </span>
                )}
              </div>

              <h1
                style={{
                  fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  marginBottom: "1rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {seo.h1}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1.0625rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                {seo.intro}
              </p>

              {/* AEO Quick Snapshot Box */}
              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(251, 191, 36, 0.25)",
                  borderRadius: "0.5rem",
                  padding: "1rem 1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#fbbf24", fontSize: "0.8125rem", fontWeight: 800, marginBottom: "0.4rem" }}>
                  <Sparkles size={14} /> Resumo Direto para Clientes &amp; Motores de IA (AEO)
                </div>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.875rem", lineHeight: 1.55, margin: 0 }}>
                  {seo.directAnswer}
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.75rem" }}>
                {service.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <CheckCircle size={15} style={{ color: "#fbbf24", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.875rem" }}>{f}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary" style={{ fontSize: "0.9375rem" }}>
                  <Phone size={18} />
                  Ligar: {CONTRACTOR_INFO.phoneDisplay}
                </a>
                <a
                  href="#hero-form"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.25rem",
                    borderRadius: "0.375rem",
                    background: "rgba(255,255,255,0.1)",
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                  }}
                >
                  Pedir Orçamento Grátis
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div id="hero-form">
              <HeroMultiStepForm />
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .service-hero-grid { grid-template-columns: 1fr !important; gap: 2.25rem !important; }
          }
        `}</style>
      </section>

      {/* AEO Technical Specifications & Estimates */}
      <section style={{ background: "#ffffff", padding: "3.5rem 0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-eyebrow">Transparência &amp; Orçamento Honesto</p>
            <h2 className="section-title">Valores Médios e Prazos para {service.title} em Aveiro</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Dados orientativos para planeamento de obra. Apresentamos sempre orçamento discriminado e fechado por escrito.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              maxWidth: "960px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                border: "1.5px solid #e2e8f0",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f59e0b", fontWeight: 800, fontSize: "0.9375rem" }}>
                <Euro size={18} /> Preço Médio Indicativo
              </div>
              <p style={{ color: "#0f172a", fontSize: "1.0625rem", fontWeight: 700, margin: 0 }}>
                {seo.pricingGuide}
              </p>
              <p style={{ color: "#64748b", fontSize: "0.8125rem", margin: 0 }}>
                Sem taxas ocultas, discriminado por mão de obra e materiais certificados.
              </p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1.5px solid #e2e8f0",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f59e0b", fontWeight: 800, fontSize: "0.9375rem" }}>
                <Clock size={18} /> Prazo Típico de Execução
              </div>
              <p style={{ color: "#0f172a", fontSize: "1.0625rem", fontWeight: 700, margin: 0 }}>
                {seo.durationGuide}
              </p>
              <p style={{ color: "#64748b", fontSize: "0.8125rem", margin: 0 }}>
                Cumprimento escrupuloso com cronograma assinado em contrato de empreitada.
              </p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1.5px solid #e2e8f0",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f59e0b", fontWeight: 800, fontSize: "0.9375rem" }}>
                <Shield size={18} /> Garantia &amp; Qualidade Técnica
              </div>
              <p style={{ color: "#0f172a", fontSize: "1.0625rem", fontWeight: 700, margin: 0 }}>
                Garantia Contratual Escrita
              </p>
              <p style={{ color: "#64748b", fontSize: "0.8125rem", margin: 0 }}>
                Alvará IMPIC Válido · Seguro de Responsabilidade Civil · Acompanhamento Jorge Freitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Areas for this service */}
      <section className="section-padding" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p className="section-eyebrow">Cobertura Geográfica Total</p>
            <h2 className="section-title">
              {service.shortTitle} em Aveiro e Concelhos Limítrofes
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Deslocamo-nos rapidamente a qualquer freguesia de Aveiro e aos concelhos vizinhos para avaliar a sua obra gratuitamente.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", justifyContent: "center" }}>
            {PARISHES.map((parish) => (
              <Link
                key={parish.slug}
                href={`/areas-atuacao/${parish.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.5rem 0.875rem",
                  background: "#ffffff",
                  border: parish.isNeighboringCounty ? "1.5px solid #fbbf24" : "1.5px solid #e2e8f0",
                  borderRadius: "0.375rem",
                  color: "#334155",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                className="parish-chip"
              >
                <MapPin size={13} style={{ color: parish.isNeighboringCounty ? "#f59e0b" : "#64748b" }} />
                <span>{parish.name}</span>
                {parish.isNeighboringCounty && (
                  <span style={{ fontSize: "0.6875rem", background: "rgba(251, 191, 36, 0.2)", color: "#b45309", padding: "0.1rem 0.35rem", borderRadius: "0.2rem" }}>
                    Concelho
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-eyebrow">AEO / Respostas Diretas</p>
            <h2 className="section-title">Perguntas Frequentes sobre {service.title} em Aveiro</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Respostas claras, transparentes e sem jargões para tomar uma decisão informada.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {seo.faq.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "1.35rem",
                  background: "#f8fafc",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "0.5rem",
                }}
              >
                <h3 style={{ fontWeight: 800, color: "#071a3a", marginBottom: "0.5rem", fontSize: "1rem" }}>
                  {item.question}
                </h3>
                <p style={{ color: "#475569", lineHeight: 1.65, fontSize: "0.9rem", margin: 0 }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <p style={{ color: "#64748b", fontSize: "0.9375rem", marginBottom: "1rem" }}>
              Ainda tem dúvidas ou pretende um orçamento discriminado para a sua habitação?
            </p>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary" style={{ display: "inline-flex" }}>
              <Phone size={17} />
              Falar com o Empreiteiro Jorge Freitas ({CONTRACTOR_INFO.phoneDisplay})
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
