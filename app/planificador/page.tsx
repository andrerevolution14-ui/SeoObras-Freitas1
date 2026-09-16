import type { Metadata } from "next";
import Link from "next/link";
import { RenovationPlanner } from "@/components/renovation-planner";
import { Calculator, ArrowRight, Phone, Shield } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Planificador de Renovação em Aveiro — Passos Essenciais para Remodelar | Freitas Renovações",
  description:
    "Guia passo a passo interativo para planear a renovação da sua casa de banho, cozinha ou habitação completa em Aveiro. Da demolição aos acabamentos sem derrapagens de custo.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/planificador" },
  keywords: [
    "planificador de obras aveiro",
    "etapas de remodelacao aveiro",
    "guia de obras aveiro",
    "como planear obras de casa",
    "remodelacao passo a passo aveiro",
    "orcamento obras aveiro",
    "freitas renovacoes planificador",
  ],
  openGraph: {
    title: "Planificador de Renovação em Aveiro — Passos Essenciais | Freitas Renovações",
    description:
      "Guia interativo para planear a sua obra em Aveiro sem erros nem custos escondidos. Dicas de materiais, prazos e custos.",
    url: "https://www.grupofreitasrenovacoes.pt/planificador",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Planificador de Renovação em Aveiro — Freitas Renovações LDA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planificador de Renovação em Aveiro | Freitas Renovações",
    description: "Guia passo a passo para planear a renovação da sua habitação em Aveiro sem derrapagens.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
  },
};

const planificadorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "Como Planear uma Remodelação em Aveiro Passo a Passo",
      description: "Guia metodológico para preparar a renovação da sua casa em Aveiro, garantindo qualidade técnica e controlo orçamental.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Levantamento de Necessidades e Diagnóstico",
          text: "Identificar anomalias, verificar prumadas, estado elétrico e definir áreas prioritárias.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Seleção de Materiais Adequados ao Clima de Aveiro",
          text: "Escolher cerâmicas, impermeabilizantes e isolamentos resistentes à humidade costeira.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Planeamento Financeiro e Orçamentação Realista",
          text: "Definir margem de contingência e obter proposta discriminada com mão de obra e materiais.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Execução Técnica com Empreiteiro Licenciado",
          text: "Supervisão presencial contínua, respeito por normas de segurança e transporte legal a vazadouro.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Vistoria Final e Emissão de Garantia",
          text: "Teste de estanquidade, ensaio de circuitos e entrega formal com garantia técnica.",
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
          name: "Planificador",
          item: "https://www.grupofreitasrenovacoes.pt/planificador",
        },
      ],
    },
  ],
};

export default function PlanificadorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(planificadorJsonLd) }}
      />
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #071a3a, #0f2d5e)", padding: "7.5rem 0 3.5rem" }}>
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>Planificador de Obras</span>
          </nav>
          <p className="section-eyebrow" style={{ color: "#fbbf24" }}>Planeamento Sem Erros</p>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 900, color: "#ffffff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Planificador de Renovação Passo a Passo
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: "640px", lineHeight: 1.65 }}>
            Siga as etapas comprovadas para planear a sua obra em Aveiro: escolha de materiais, prazos reais, estimativas de custos e vistoria técnica sem surpresas.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
            <Link href="/orcamento" className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}>
              <Calculator size={16} />
              Calcular Orçamento da Obra
            </Link>
            <Link href="/precos-m2" className="btn-secondary" style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem", color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              Consultar Preços Médios
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Componente Interativo Planificador */}
      <RenovationPlanner />

      {/* CTA Final */}
      <section style={{ background: "#071a3a", padding: "4rem 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="section-container" style={{ textAlign: "center", maxWidth: "680px" }}>
          <Shield size={36} style={{ color: "#fbbf24", margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.75rem" }}>
            Precisa de apoio para planear e executar a sua obra?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
            A equipa da Freitas Renovações LDA ajuda-o em todas as fases, desde o planeamento e escolha de materiais até à entrega da chave.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary">
              <Phone size={16} />
              Ligar {CONTRACTOR_INFO.phoneDisplay}
            </a>
            <Link href="/orcamento" className="btn-secondary" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              Pedir Orçamento Grátis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
