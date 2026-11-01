import type { Metadata } from "next";
import Link from "next/link";
import { PastProjectsPricing } from "@/components/past-projects-pricing";
import { Calculator, ArrowRight, Phone, Shield } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Obras Realizadas e Preços Reais em Aveiro",
  description:
    "Veja exemplos de obras concluídas em Aveiro com custos reais discriminados, prazo de execução e especificações técnicas. Remodelação de casas de banho, cozinhas e apartamentos.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/precos-reais" },
  openGraph: {
    title: "Obras Realizadas e Preços Reais em Aveiro | Freitas Renovações",
    description:
      "Exemplos de remodelações entregues em Aveiro com preços reais discriminados e prazos cumpridos. Transparência garantida.",
    url: "https://www.grupofreitasrenovacoes.pt/precos-reais",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Obras Realizadas com Preços Reais em Aveiro — Freitas Renovações",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Obras Realizadas e Preços Reais em Aveiro | Freitas Renovações",
    description: "Casos de estudo reais de obras em Aveiro com custos transparentes.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
  },
};

const precosReaisJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Obras Realizadas e Preços Reais em Aveiro",
      description: "Portfólio de projetos concluídos com especificações técnicas e valores finais.",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Remodelação Casa de Banho Completa 20m² em Esgueira",
          description: "Substituição de canalização, impermeabilização, loiças suspensas e resguardo de duche.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Remodelação Cozinha Moderna em Aradas",
          description: "Mobiliário termolaminado, bancada em quartzo e nova instalação elétrica.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Isolamento Capoto Térmico 160m² em São Bernardo",
          description: "Aplicação de EPS 80mm com acabamento acrílico impermeável.",
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
          name: "Preços Reais",
          item: "https://www.grupofreitasrenovacoes.pt/precos-reais",
        },
      ],
    },
  ],
};

export default function PrecosReaisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(precosReaisJsonLd) }}
      />
      {/* Hero Compacto */}
      <section
        className="page-compact-hero"
        style={{
          backgroundColor: "#071a3a",
          backgroundImage:
            "linear-gradient(105deg, rgba(7, 26, 58, 0.90) 0%, rgba(7, 26, 58, 0.76) 55%, rgba(15, 45, 94, 0.52) 100%), url('/heroes/familia-cozinha-nova.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "5rem 0 1.25rem",
        }}
      >
        <div className="section-container">
          <p className="section-eyebrow" style={{ color: "#fbbf24", marginBottom: "0.25rem" }}>Transparência Total &amp; Casos de Estudo</p>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.15rem)", fontWeight: 900, color: "#ffffff", marginBottom: "0.25rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Obras Realizadas com Preços Reais em Aveiro
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", maxWidth: "580px", lineHeight: 1.45, margin: 0 }}>
            Custos reais discriminados, áreas (m²) e prazos de obras concluídas em Aveiro.
          </p>
        </div>
      </section>

      {/* Galeria de Casos Reais */}
      <PastProjectsPricing />

      {/* CTA Final */}
      <section style={{ background: "#071a3a", padding: "4rem 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="section-container" style={{ textAlign: "center", maxWidth: "680px" }}>
          <Shield size={36} style={{ color: "#fbbf24", margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.75rem" }}>
            Tem uma obra semelhante para fazer?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
            Fale connosco hoje. Fornecemos orçamento gratuito e detalhado em 12h com os melhores preços de Aveiro.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary">
              <Phone size={16} />
              Ligar {CONTRACTOR_INFO.phoneDisplay}
            </a>
            <Link href="/orcamento" className="btn-secondary" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              Simular Custo Online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
