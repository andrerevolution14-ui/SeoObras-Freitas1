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
        url: "https://www.grupofreitasrenovacoes.pt/clientes/wc-madeira-espelho-led.jpg",
        width: 1200,
        height: 900,
        alt: "Casa de banho remodelada em Aveiro com revestimento madeira e espelho LED — Freitas Renovações",
      },
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
    images: ["https://www.grupofreitasrenovacoes.pt/clientes/wc-madeira-espelho-led.jpg"],
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
        ...(item.image
          ? {
              associatedMedia: {
                "@type": "ImageObject",
                contentUrl: `https://www.grupofreitasrenovacoes.pt${item.image}`,
                name: `${item.headline} — ${item.location}`,
                description: item.imageAlt || item.headline,
                contentLocation: `${item.location}, Aveiro, Portugal`,
              },
            }
          : {}),
      })),
    },
    {
      "@type": "ImageGallery",
      "@id": "https://www.grupofreitasrenovacoes.pt/clientes#galeria-obras-reais",
      name: "Galeria de Obras e Remodelações Reais em Aveiro — Freitas Renovações",
      description:
        "Fotografias reais de casas de banho, cozinhas, apartamentos e moradias remodeladas pela Freitas Renovações LDA em Aveiro e concelhos vizinhos.",
      image: [
        ...CLIENTES_FEED_ITEMS.filter((item) => item.image).map((item) => ({
          "@type": "ImageObject",
          contentUrl: `https://www.grupofreitasrenovacoes.pt${item.image}`,
          name: `${item.headline} em ${item.location}`,
          description: item.imageAlt || item.imageCaption || item.headline,
          caption: item.imageCaption || item.headline,
          contentLocation: `${item.location}, Aveiro, Portugal`,
          creator: {
            "@type": "Organization",
            name: CONTRACTOR_INFO.companyName,
          },
        })),
        {
          "@type": "ImageObject",
          contentUrl: "https://www.grupofreitasrenovacoes.pt/heroes/casal-sala-renovada.jpg",
          name: "Casal feliz em sala de estar renovada em Aveiro — Freitas Renovações",
          description: "Proprietários satisfeitos na sua sala e terraço após remodelação chave na mão em Aveiro.",
          contentLocation: "Aveiro, Portugal",
        },
        {
          "@type": "ImageObject",
          contentUrl: "https://www.grupofreitasrenovacoes.pt/heroes/casal-chaves-casa.jpg",
          name: "Entrega de chaves de moradia remodelada em Aveiro — Freitas Renovações",
          description: "Clientes celebram a entrega das chaves da sua casa renovada pela Freitas Renovações em Aveiro.",
          contentLocation: "Aveiro, Portugal",
        },
        {
          "@type": "ImageObject",
          contentUrl: "https://www.grupofreitasrenovacoes.pt/heroes/familia-cozinha-nova.jpg",
          name: "Família em cozinha moderna remodelada em Aveiro — Freitas Renovações",
          description: "Cozinha em open space com ilha em pedra e armários por medida executada em Aveiro.",
          contentLocation: "Aveiro, Portugal",
        },
        {
          "@type": "ImageObject",
          contentUrl: "https://www.grupofreitasrenovacoes.pt/heroes/empreiteiro-clientes-obra.jpg",
          name: "Acompanhamento de obra em Aveiro pelo Empreiteiro Jorge Freitas",
          description: "Reunião presencial em obra com proprietários para validação de acabamentos e prazos em Aveiro.",
          contentLocation: "Aveiro, Portugal",
        },
        {
          "@type": "ImageObject",
          contentUrl: "https://www.grupofreitasrenovacoes.pt/heroes/aveiro-ria-moliceiros.jpg",
          name: "Obras e remodelações junto à Ria de Aveiro — Freitas Renovações",
          description: "Atuação local em todas as freguesias de Aveiro, canais da Ria e concelhos limítrofes.",
          contentLocation: "Aveiro, Portugal",
        },
        {
          "@type": "ImageObject",
          contentUrl: "https://www.grupofreitasrenovacoes.pt/heroes/aveiro-barra-costa.jpg",
          name: "Reabilitação de moradias e fachadas na Praia da Barra e Costa Nova, Aveiro",
          description: "Isolamento térmico Capoto ETICS e pintura resistente ao salitre na faixa costeira de Aveiro e Ílhavo.",
          contentLocation: "Praia da Barra, Aveiro, Portugal",
        },
      ],
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

      {/* ── 1. HERO DE ALTA CONFIANÇA COM IMAGEM DE FUNDO REAL ── */}
      <section
        aria-label="O que dizem os nossos clientes — Obras e remodelações reais em Aveiro"
        style={{
          backgroundColor: "#050e22",
          backgroundImage:
            "linear-gradient(180deg, rgba(5, 14, 34, 0.90) 0%, rgba(11, 27, 46, 0.85) 55%, rgba(5, 14, 34, 0.92) 100%), url('/heroes/casal-sala-renovada.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "7.5rem 0 4rem",
        }}
      >
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            <span style={{ color: "#C9A86A", fontWeight: 600 }}>Clientes</span>
          </nav>
          <p className="section-eyebrow" style={{ color: "#C9A86A", textShadow: "0 1px 4px rgba(0,0,0,0.45)" }}>
            Obras Reais · Clientes Reais · ⭐ 4.9/5 Google
          </p>
          <h1
            style={{
              fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
              fontWeight: 900,
              color: "#ffffff",
              marginBottom: "0.875rem",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
            O que dizem os nossos clientes em Aveiro
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.92)",
              fontWeight: 500,
              fontSize: "1rem",
              maxWidth: "580px",
              lineHeight: 1.65,
              marginBottom: "1.75rem",
              textShadow: "0 1px 6px rgba(0,0,0,0.55)",
            }}
          >
            Fotografias reais sem filtros e opiniões verificadas de proprietários em Aveiro, Esgueira,
            Aradas, São Bernardo, Oliveirinha e Ílhavo — prazos cumpridos e orçamento sem surpresas.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary">
              <Phone size={16} />
              Ligar: {CONTRACTOR_INFO.phoneDisplay}
            </a>
            <Link href="/orcamento" className="btn-secondary">
              Pedir Orçamento Gratuito
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. GRELHA PRINCIPAL DE REVIEWS & FOTOS REAIS ── */}
      <section
        style={{
          padding: "1.1rem 0 3.75rem",
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
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 2.25rem" }}>
            <p className="section-eyebrow">Obras Sem Dores de Cabeça</p>
            <h2 className="section-title">
              Os 4 Compromissos Que Mais Tranquilizam os Nossos Clientes
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Não prometemos apenas um bom resultado final — garantimos que todo o processo decorre com respeito pela sua casa, pela sua família e pelo seu orçamento.
            </p>
          </div>

          <div className="clientes-pillars-grid">
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
                className="clientes-pillar-card"
              >
                <div className="clientes-pillar-icon">
                  {pillar.icon}
                </div>
                <h3 style={{ fontSize: "1.02rem", fontWeight: 800, color: "#0B1B2E", marginBottom: "0.45rem" }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.58, margin: 0 }}>
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
          backgroundColor: "#0B1B2E",
          backgroundImage:
            "linear-gradient(135deg, rgba(11, 27, 46, 0.88) 0%, rgba(19, 41, 74, 0.78) 100%), url('/heroes/casal-chaves-casa.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "4.25rem 0",
          textAlign: "center",
          borderTop: "2px solid rgba(184, 147, 90, 0.3)",
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "#C9A86A",
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
              color: "rgba(255,255,255,0.82)",
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

      <style>{`
        .clientes-hero-inner {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
        }
        .clientes-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        .clientes-pillar-card {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.875rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .clientes-pillar-icon {
          width: 44px;
          height: 44px;
          border-radius: 0.5rem;
          background: #0B1B2E;
          color: #C9A86A;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        @media (max-width: 1024px) {
          .clientes-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .clientes-hero-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1rem;
          }
          .clientes-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
          .clientes-pillar-card {
            padding: 1rem 0.85rem;
            align-items: center;
            text-align: center;
          }
          .clientes-pillar-card h3 {
            font-size: 0.9rem !important;
          }
          .clientes-pillar-card p {
            font-size: 0.76rem !important;
            line-height: 1.45 !important;
          }
          .clientes-pillar-icon {
            width: 38px;
            height: 38px;
            margin-bottom: 0.65rem;
          }
        }
      `}</style>
    </>
  );
}
