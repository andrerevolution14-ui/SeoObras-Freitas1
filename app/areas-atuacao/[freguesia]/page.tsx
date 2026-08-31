import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, ArrowRight, CheckCircle, Clock } from "lucide-react";
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
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `/areas-atuacao/${freguesia}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://freitasrenovacoes.pt/areas-atuacao/${freguesia}`,
      type: "website",
    },
  };
}

export default async function ParishPage({ params }: Props) {
  const { freguesia } = await params;
  const parish = PARISHES.find((p) => p.slug === freguesia);
  if (!parish) notFound();

  const seo = generateParishSEO(parish);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: CONTRACTOR_INFO.companyName,
    description: `Serviços de obras e remodelações em ${parish.name}, Aveiro.`,
    telephone: CONTRACTOR_INFO.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: parish.name,
      addressRegion: "Aveiro",
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
            <span style={{ color: "rgba(255,255,255,0.6)" }}>Áreas</span>
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
                  borderRadius: "0.25rem",
                  padding: "0.375rem 0.875rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  marginBottom: "1.25rem",
                }}
              >
                <MapPin size={13} />
                Zona de Cobertura em Aveiro
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

              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                {seo.intro}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem" }}>
                {[
                  { icon: <Clock size={15} />, text: "Resposta até 12 horas em " + parish.name },
                  { icon: <CheckCircle size={15} />, text: "Orçamento gratuito e sem compromisso" },
                  { icon: <MapPin size={15} />, text: "Empresa local baseada em Aveiro" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <span style={{ color: "#fbbf24" }}>{item.icon}</span>
                    <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.875rem" }}>{item.text}</span>
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
            .parish-hero-grid { grid-template-columns: 1fr !important; gap: 2.25rem !important; }
          }
        `}</style>
      </section>

      {/* Services in parish */}
      <section className="section-padding" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p className="section-eyebrow">O Que Fazemos em {parish.name}</p>
            <h2 className="section-title">
              Serviços disponíveis em {parish.name}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {SERVICES.map((service) => (
              <Link key={service.slug} href={`/servicos/${service.slug}`} className="service-card">
                <h3 style={{ fontWeight: 800, color: "#071a3a", marginBottom: "0.375rem" }}>
                  {service.title} em {parish.name}
                </h3>
                <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.5, marginBottom: "0.875rem" }}>
                  {service.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#d97706", fontWeight: 700, fontSize: "0.8125rem" }}>
                  Saber mais <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
