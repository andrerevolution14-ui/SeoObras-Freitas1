import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, ArrowRight, CheckCircle, Clock, Shield, Sparkles } from "lucide-react";
import { PARISHES, SERVICES, CONTRACTOR_INFO } from "@/lib/constants";
import { generateParishSEO } from "@/lib/seo-data";
import { HeroMultiStepForm } from "@/components/hero-multi-step-form";

interface Props {
  params: Promise<{ freguesia: string }>;
}

export async function generateStaticParams() {
  return PARISHES.map((p) => ({ freguesia: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { freguesia } = await params;
  const parish = PARISHES.find((p) => p.slug === freguesia);
  if (!parish) return {};

  const seo = generateParishSEO(parish);
  const locationLabel = parish.isNeighboringCounty ? `Concelho de ${parish.name}` : `${parish.name}, Aveiro`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      `obras ${parish.name.toLowerCase()}`,
      `remodelações ${parish.name.toLowerCase()}`,
      `empresa de remodelações ${parish.name.toLowerCase()}`,
      `empreiteiro ${parish.name.toLowerCase()}`,
      `remodelação de casas de banho ${parish.name.toLowerCase()}`,
      `remodelação de cozinhas ${parish.name.toLowerCase()}`,
      `pintura ${parish.name.toLowerCase()}`,
      `capoto ${parish.name.toLowerCase()}`,
      `obras chave na mão ${parish.name.toLowerCase()}`,
      "obras aveiro",
      "remodelações aveiro",
      "freitas renovações lda",
    ],
    alternates: { canonical: `https://www.grupofreitasrenovacoes.pt/areas-atuacao/${freguesia}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.grupofreitasrenovacoes.pt/areas-atuacao/${freguesia}`,
      type: "website",
      locale: "pt_PT",
      images: [
        {
          url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Obras e Remodelações em ${locationLabel} — Freitas Renovações LDA`,
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

export default async function ParishPage({ params }: Props) {
  const { freguesia } = await params;
  const parish = PARISHES.find((p) => p.slug === freguesia);
  if (!parish) notFound();

  const seo = generateParishSEO(parish);
  const locationLabel = parish.isNeighboringCounty ? `Concelho de ${parish.name}` : `${parish.name} (Aveiro)`;

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: CONTRACTOR_INFO.companyName,
    description: `Serviços profissionais de obras, remodelações gerais e reparações em ${locationLabel}.`,
    telephone: CONTRACTOR_INFO.phone,
    url: CONTRACTOR_INFO.website,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTRACTOR_INFO.address.street,
      addressLocality: parish.name,
      addressRegion: "Aveiro",
      postalCode: CONTRACTOR_INFO.address.postalCode,
      addressCountry: "PT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: parish.geo.lat,
      longitude: parish.geo.lng,
    },
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://www.grupofreitasrenovacoes.pt/" },
      { "@type": "ListItem", position: 2, name: "Áreas de Atuação", item: "https://www.grupofreitasrenovacoes.pt/areas-atuacao" },
      { "@type": "ListItem", position: 3, name: parish.name, item: `https://www.grupofreitasrenovacoes.pt/areas-atuacao/${freguesia}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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
            <Link href="/areas-atuacao" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Áreas</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>{parish.name}</span>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "3.5rem", alignItems: "start" }} className="parish-hero-grid">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(251, 191, 36, 0.15)",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                  color: "#fef08a",
                  borderRadius: "2rem",
                  padding: "0.35rem 0.875rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  marginBottom: "1.25rem",
                }}
              >
                <MapPin size={13} />
                <span>{parish.isNeighboringCounty ? `Concelho Vizinho Atendido` : `Freguesia de Aveiro`}</span>
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

              {/* Local AEO Snapshot */}
              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(251, 191, 36, 0.25)",
                  borderRadius: "0.5rem",
                  padding: "1rem 1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#fbbf24", fontSize: "0.8125rem", fontWeight: 800, marginBottom: "0.35rem" }}>
                  <Sparkles size={14} /> Resumo Direto de Serviço Local (AEO)
                </div>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.875rem", lineHeight: 1.55, margin: 0 }}>
                  {seo.directAnswer}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem" }}>
                {[
                  { icon: <Clock size={16} />, text: `Resposta até 12 horas para orçamentos em ${parish.name}` },
                  { icon: <CheckCircle size={16} />, text: "Orçamento gratuito, detalhado e com preços justos" },
                  { icon: <Shield size={16} />, text: "Empresa licenciada com Alvará de Construção IMPIC" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <span style={{ color: "#fbbf24" }}>{item.icon}</span>
                    <span style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.875rem" }}>{item.text}</span>
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
            .parish-hero-grid { grid-template-columns: 1fr !important; gap: 2.25rem !important; }
          }
        `}</style>
      </section>

      {/* Services in parish */}
      <section className="section-padding" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-eyebrow">Catálogo de Obras &amp; Remodelações</p>
            <h2 className="section-title">
              Serviços de Obras Disponíveis em {parish.name}
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              A equipa do Empreiteiro Jorge Freitas atua em {parish.name} com todas as especialidades de construção e renovação.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {SERVICES.map((service) => (
              <Link key={service.slug} href={`/servicos/${service.slug}`} className="service-card">
                <h3 style={{ fontWeight: 800, color: "#071a3a", marginBottom: "0.375rem", fontSize: "1.0625rem" }}>
                  {service.title} em {parish.name}
                </h3>
                <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.55, marginBottom: "0.875rem" }}>
                  {service.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#d97706", fontWeight: 700, fontSize: "0.8125rem" }}>
                  Ver detalhes e preços <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ for this area */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container" style={{ maxWidth: "780px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-eyebrow">Respostas Locais</p>
            <h2 className="section-title">Perguntas Frequentes sobre Obras em {parish.name}</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Tudo o que precisa de saber sobre prazos, custos e deslocações para {parish.name}.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {seo.faq.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem",
                  background: "#f8fafc",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "0.5rem",
                }}
              >
                <h3 style={{ fontWeight: 800, color: "#071a3a", marginBottom: "0.5rem", fontSize: "0.9375rem" }}>
                  {item.question}
                </h3>
                <p style={{ color: "#475569", lineHeight: 1.6, fontSize: "0.875rem", margin: 0 }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary" style={{ display: "inline-flex" }}>
              <Phone size={17} />
              Solicitar Orçamento em {parish.name} ({CONTRACTOR_INFO.phoneDisplay})
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
