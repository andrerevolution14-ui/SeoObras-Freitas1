import type { Metadata } from "next";
import Link from "next/link";
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  BadgeCheck,
  Sparkles,
  FileCheck2,
  MessageSquare,
} from "lucide-react";
import { ClientesWall } from "@/components/clientes-wall";
import { CLIENTES_FEED_ITEMS, CLIENTES_TRUST_PILLARS } from "@/lib/clientes-data";
import { CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Clientes & Avaliações Reais em Aveiro | Obras Reais",
  description:
    "Veja o que dizem os nossos clientes em Aveiro e arredores. Fotografias reais de obras concluídas (casas de banho, cozinhas, apartamentos e moradias) e testemunhos verificados sobre prazos, limpeza e cumprimento de orçamento.",
  alternates: {
    canonical: "https://www.grupofreitasrenovacoes.pt/clientes",
  },
  openGraph: {
    title: "O que dizem os nossos clientes | Obras Reais em Aveiro — Freitas Renovações",
    description:
      "Obras reais, clientes reais em Aveiro e arredores. Veja fotos de trabalhos concluídos e avaliações sobre acabamentos, cumprimento de prazos e orçamento sem surpresas.",
    url: "https://www.grupofreitasrenovacoes.pt/clientes",
    siteName: "Freitas Renovações LDA",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Avaliações de Clientes e Obras Reais em Aveiro — Freitas Renovações",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clientes & Obras Reais em Aveiro | Freitas Renovações",
    description:
      "O que dizem os nossos clientes em Aveiro e arredores: fotos reais de remodelações e opiniões verificadas.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
  },
};

const clientesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.grupofreitasrenovacoes.pt/#organization",
      name: CONTRACTOR_INFO.companyName,
      url: CONTRACTOR_INFO.website,
      telephone: CONTRACTOR_INFO.phone,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        ratingCount: "48",
      },
      review: CLIENTES_FEED_ITEMS.filter((item) => item.quote && item.clientName).map((item) => ({
        "@type": "Review",
        name: item.headline,
        reviewBody: item.quote?.join(" "),
        author: {
          "@type": "Person",
          name: item.clientName,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: item.rating || 5,
          bestRating: 5,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: "https://www.grupofreitasrenovacoes.pt",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Clientes & Avaliações",
          item: "https://www.grupofreitasrenovacoes.pt/clientes",
        },
      ],
    },
  ],
};

export default function ClientesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clientesJsonLd) }}
      />

      {/* ── 1. HERO COMPACTO DE ALTA CONFIANÇA COM IMAGEM DE FUNDO REAL ── */}
      <section
        style={{
          position: "relative",
          backgroundColor: "#071a3a",
          backgroundImage:
            "linear-gradient(105deg, rgba(7, 26, 58, 0.88) 0%, rgba(7, 26, 58, 0.72) 52%, rgba(7, 26, 58, 0.48) 100%), url('/heroes/casal-sala-renovada.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "5.25rem 0 1.65rem",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div className="section-container" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.25rem",
            }}
          >
            <div style={{ maxWidth: "680px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "rgba(251, 191, 36, 0.14)",
                  border: "1px solid rgba(251, 191, 36, 0.35)",
                  color: "#fbbf24",
                  borderRadius: "2rem",
                  padding: "0.22rem 0.75rem",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                <BadgeCheck size={13} />
                Obras Reais · Clientes Reais em Aveiro e Arredores
              </div>

              <h1
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  fontSize: "clamp(1.65rem, 3.5vw, 2.35rem)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.12,
                  letterSpacing: "-0.025em",
                  marginBottom: "0.4rem",
                }}
              >
                O que dizem os nossos clientes
              </h1>

              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "0.925rem",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Fotografias reais sem filtros e opiniões verificadas de proprietários em Aveiro, Esgueira, Aradas, São Bernardo, Oliveirinha e Ílhavo.
              </p>
            </div>

            {/* Selo Compacto de Classificação */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.85rem",
                background: "rgba(7, 26, 58, 0.78)",
                border: "1.5px solid rgba(251, 191, 36, 0.4)",
                borderRadius: "0.75rem",
                padding: "0.75rem 1.1rem",
                backdropFilter: "blur(8px)",
              }}
            >
              <div>
                <div style={{ display: "flex", gap: "2px", marginBottom: "0.2rem" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={15} fill="#fbbf24" stroke="#fbbf24" />
                  ))}
                </div>
                <div style={{ fontSize: "0.76rem", color: "#e2e8f0", fontWeight: 700 }}>
                  <strong style={{ color: "#fbbf24", fontSize: "0.95rem" }}>4.9/5</strong> · +48 Avaliações Reais
                </div>
              </div>
              <Link
                href="/orcamento"
                className="btn-primary"
                style={{ fontSize: "0.78rem", padding: "0.5rem 0.9rem", whiteSpace: "nowrap" }}
              >
                <span>Pedir Orçamento</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. GRELHA PRINCIPAL DE REVIEWS & FOTOS REAIS ── */}
      <section
        style={{
          padding: "1.75rem 0 4rem",
          background: "#f1f5f9",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div className="section-container">
          <ClientesWall />
        </div>
      </section>

      {/* ── 3. SECÇÃO QUEBRA DE OBJEÇÕES: PORQUE OS CLIENTES NOS RECOMENDAM ── */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2.5rem" }}>
            <p className="section-eyebrow">Obras Sem Dores de Cabeça</p>
            <h2 className="section-title">
              Os 4 Compromissos Que Mais Tranquilizam os Nossos Clientes
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Não prometemos apenas um bom resultado final — garantimos que todo o processo decorre com respeito pela sua casa, pela sua família e pelo seu orçamento.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                icon: <FileCheck2 size={22} />,
                ...CLIENTES_TRUST_PILLARS[0],
              },
              {
                icon: <MessageSquare size={22} />,
                ...CLIENTES_TRUST_PILLARS[1],
              },
              {
                icon: <Sparkles size={22} />,
                ...CLIENTES_TRUST_PILLARS[2],
              },
              {
                icon: <ShieldCheck size={22} />,
                ...CLIENTES_TRUST_PILLARS[3],
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                style={{
                  background: "#f8fafc",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "0.875rem",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "0.5rem",
                    background: "#071a3a",
                    color: "#fbbf24",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {pillar.icon}
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#071a3a", marginBottom: "0.5rem" }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: "0.86rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA FINAL ── */}
      <section
        style={{
          backgroundColor: "#071a3a",
          backgroundImage:
            "linear-gradient(135deg, rgba(7, 26, 58, 0.88) 0%, rgba(15, 45, 94, 0.78) 100%), url('/heroes/casal-chaves-casa.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "4.5rem 0",
          textAlign: "center",
          borderTop: "2px solid rgba(251, 191, 36, 0.3)",
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "#fbbf24",
              fontSize: "0.8rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "0.65rem",
            }}
          >
            <CheckCircle2 size={16} />
            Próximo Passo Sem Compromisso
          </div>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.2vw, 2.25rem)",
              fontWeight: 900,
              color: "#ffffff",
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            Quer que a sua casa seja o nosso próximo caso de sucesso em Aveiro?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.78)",
              fontSize: "1rem",
              maxWidth: "560px",
              margin: "0 auto 1.85rem",
              lineHeight: 1.6,
            }}
          >
            Fale diretamente com o Empreiteiro Jorge Freitas. Receba uma estimativa discriminada em até 12h e visita técnica gratuita no local.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/orcamento" className="btn-primary" style={{ fontSize: "0.95rem", padding: "0.85rem 1.6rem" }}>
              <span>Pedir Orçamento Gratuito</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href={`tel:${CONTRACTOR_INFO.phone}`}
              className="btn-secondary"
              style={{
                fontSize: "0.95rem",
                padding: "0.85rem 1.6rem",
                border: "1.5px solid rgba(255,255,255,0.35)",
              }}
            >
              <Phone size={16} />
              <span>Ligar: {CONTRACTOR_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

