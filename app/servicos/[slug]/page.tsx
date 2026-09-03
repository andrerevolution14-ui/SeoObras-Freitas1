import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, Phone, MapPin } from "lucide-react";
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
    alternates: { canonical: `https://freitasrenovacoes.pt/servicos/${slug}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://freitasrenovacoes.pt/servicos/${slug}`,
      type: "website",
      images: [
        {
          url: "https://freitasrenovacoes.pt/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${service.title} em Aveiro — Freitas Renovações LDA`,
        },
      ],
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
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aveiro",
        addressCountry: "PT",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Aveiro",
      containedInPlace: { "@type": "Country", name: "Portugal" },
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: "https://freitasrenovacoes.pt/" },
          { "@type": "ListItem", position: 2, name: "Serviços", item: "https://freitasrenovacoes.pt/servicos" },
          { "@type": "ListItem", position: 3, name: service.title, item: `https://freitasrenovacoes.pt/servicos/${slug}` },
        ],
      }) }} />

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
              {service.emergencyAvailable && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    background: "rgba(239, 68, 68, 0.15)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#fca5a5",
                    borderRadius: "0.25rem",
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    marginBottom: "1.25rem",
                  }}
                >
                  🔴 Urgências e Resposta Rápida
                </div>
              )}

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
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                {seo.intro}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.75rem" }}>
                {service.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <CheckCircle size={15} style={{ color: "#fbbf24", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.875rem" }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary" style={{ fontSize: "0.9375rem" }}>
                <Phone size={18} />
                Ligar: {CONTRACTOR_INFO.phoneDisplay}
              </a>
            </div>

            <div>
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

      {/* Local Areas for this service */}
      <section className="section-padding" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p className="section-eyebrow">Zonas que Cobrimos</p>
            <h2 className="section-title">
              {service.shortTitle} em todas as freguesias de Aveiro
            </h2>
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
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "0.375rem",
                  color: "#334155",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                className="parish-chip"
              >
                <MapPin size={13} style={{ color: "#f59e0b" }} />
                {parish.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container" style={{ maxWidth: "760px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p className="section-eyebrow">Perguntas Frequentes</p>
            <h2 className="section-title">Dúvidas sobre {service.title} em Aveiro?</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {seo.faq.map((item, i) => (
              <div key={i} style={{ padding: "1.25rem", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: "0.375rem" }}>
                <h3 style={{ fontWeight: 800, color: "#071a3a", marginBottom: "0.5rem", fontSize: "0.9375rem" }}>
                  {item.question}
                </h3>
                <p style={{ color: "#475569", lineHeight: 1.6, fontSize: "0.875rem" }}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
