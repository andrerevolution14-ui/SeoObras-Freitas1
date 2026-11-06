import type { Metadata } from "next";
import Link from "next/link";
import { AveragePricesGuide } from "@/components/average-prices-guide";
import { Calculator, CheckCircle, Phone, ArrowRight, Shield, Sparkles, HelpCircle } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Preço m2 Remodelação Aveiro — Custos e Estimativas 2026",
  description:
    "Descubra quanto custa remodelar uma casa em Aveiro. Tabela de custos médios de referência por m² para casas de banho, cozinhas, apartamentos, moradias e capoto.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/precos-m2" },
  openGraph: {
    title: "Preço m2 Remodelação Aveiro — Custos e Estimativas 2026 | Freitas Renovações",
    description:
      "Tabela atualizada de preços de remodelação por m² em Aveiro: casas de banho, cozinhas, capoto, moradias e pinturas. Respostas diretas e sem custos ocultos.",
    url: "https://www.grupofreitasrenovacoes.pt/precos-m2",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tabela de Preços Médios por m2 em Aveiro — Freitas Renovações",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preço m2 Remodelação Aveiro — Guia 2026 | Freitas Renovações",
    description: "Consulte custos reais de remodelação por m² em Aveiro com preços honestos.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
  },
};

const precosM2JsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quanto custa remodelar uma casa em Aveiro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Em média, remodelar uma casa em Aveiro custa entre 350€ e 550€/m² para intervenções parciais (pintura, pavimentos e portas) e entre 650€ e 900€/m² para remodelações totais chave na mão com canalização, eletricidade, caixilharia de corte térmico, cozinha e casas de banho. Reabilitações estruturais ou de alta gama situam-se entre 900€ e 1.300€/m².",
          },
        },
        {
          "@type": "Question",
          name: "Qual é o preço por m² de remodelação em Aveiro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "O preço médio por m² de remodelação em Aveiro varia de 350€ a 550€/m² para intervenções parciais e de 650€ a 900€/m² para remodelações chave na mão standard. A Freitas Renovações LDA apresenta propostas detalhadas com preço fechado e alvará IMPIC.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto custa remodelar uma casa de banho em Aveiro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A remodelação completa de uma casa de banho standard em Aveiro custa entre 2.800€ e 4.500€, englobando substituição de banheira por duche plano, nova canalização em multicamada, impermeabilização bicomponente, loiças sanitárias e cerâmica retificada.",
          },
        },
        {
          "@type": "Question",
          name: "Qual é o preço do capoto (ETICS) por m² em Aveiro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A aplicação de capoto térmico ETICS em Aveiro custa entre 38€ e 55€ por m², valor com placas EPS grafitado homologadas, andaimes, colas impermeabilizantes e barramento final texturado com garantia.",
          },
        },
        {
          "@type": "Question",
          name: "Como obter um orçamento de obras ou remodelação em Aveiro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Para obter um orçamento gratuito e sem compromisso para obras em Aveiro, contacte a Freitas Renovações LDA pelo 961 455 997 ou preencha o formulário online. O Empreiteiro Jorge Freitas responde no prazo máximo de 12 horas.",
          },
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
          name: "Preços por m²",
          item: "https://www.grupofreitasrenovacoes.pt/precos-m2",
        },
      ],
    },
  ],
};

export default function PrecosM2Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(precosM2JsonLd) }}
      />
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0B1B2E, #13294A)", padding: "7.5rem 0 3.5rem" }}>
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#C9A86A" }}>Preços Médios por m²</span>
          </nav>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(184, 147, 90, 0.15)",
              border: "1px solid rgba(184, 147, 90, 0.35)",
              color: "#C9A86A",
              borderRadius: "2rem",
              padding: "0.25rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            <Sparkles size={13} /> Guia de Custos &amp; Estimativas Aveiro 2026
          </div>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 900, color: "#ffffff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Quanto Custa Remodelar uma Casa em Aveiro? Tabela &amp; Preço por m²
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1.0625rem", maxWidth: "680px", lineHeight: 1.65 }}>
            Consulte a tabela oficial de custos de remodelação, obras de casas de banho, cozinhas, capoto e moradias em Aveiro. Preços transparentes, calculados com base em mais de 100 obras executadas pelo Empreiteiro Jorge Freitas.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
            <Link href="/orcamento" className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}>
              <Calculator size={16} />
              Simulador de Orçamento Online
            </Link>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-secondary" style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem", color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              <Phone size={15} />
              Ligar {CONTRACTOR_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Tabela de Preços Médios */}
      <AveragePricesGuide />

      {/* Respostas Diretas sobre Custos */}
      <section className="section-padding" style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0" }}>
        <div className="section-container" style={{ maxWidth: "800px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-eyebrow">Perguntas Frequentes sobre Custos</p>
            <h2 className="section-title">Perguntas Rápidas sobre Preços de Obras em Aveiro</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Tudo o que precisa de saber para orçamentar a sua remodelação sem custos surpresa.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              {
                q: "Quanto custa remodelar uma casa em Aveiro?",
                a: "O custo médio varia entre 350€/m² (intervenções parciais com pinturas, flutuante e substituição pontual de louças) e 750€ a 1.200€/m² para remodelações totais chave na mão com canalização multicamada, eletricidade, caixilharias de vidro duplo e cozinha completa.",
              },
              {
                q: "Qual o preço por m² de uma remodelação de apartamento em Aveiro?",
                a: "A remodelação de um apartamento T2 ou T3 em Aveiro oscila normalmente entre 350€ e 550€/m² para intervenções parciais (pisos, portas e pinturas) e entre 650€ e 900€/m² para chave na mão standard com cozinha e casas de banho novas. Para acabamentos de luxo ou remodelações profundas com caixilharia de topo, os valores situam-se entre 900€ e 1.300€/m².",
              },
              {
                q: "O que deve constar num orçamento de remodelação transparente?",
                a: "Um orçamento de confiança deve discriminar: mão de obra detalhada, lista de materiais com marcas e especificações, prazos de início e conclusão, seguro de responsabilidade civil e menção expressa ao Alvará IMPIC da empresa.",
              },
              {
                q: "A Freitas Renovações cobra pela elaboração do orçamento?",
                a: "Não. A análise técnica das informações enviadas e a elaboração do orçamento discriminado são 100% gratuitas e sem compromisso para todo o concelho de Aveiro e concelhos vizinhos.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                style={{
                  background: "#f8fafc",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0B1B2E", fontWeight: 800, fontSize: "1rem", marginBottom: "0.5rem" }}>
                  <HelpCircle size={18} style={{ color: "#8F6E3E", flexShrink: 0 }} />
                  {faq.q}
                </div>
                <p style={{ color: "#475569", lineHeight: 1.65, fontSize: "0.9rem", margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ background: "#0B1B2E", padding: "4rem 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="section-container" style={{ textAlign: "center", maxWidth: "680px" }}>
          <Shield size={36} style={{ color: "#C9A86A", margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.75rem" }}>
            Quer uma cotação exata para a sua obra em Aveiro?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
            Avaliamos o local sem qualquer compromisso e apresentamos proposta discriminada com materiais e mão de obra a preços justos. Resposta até 12 horas.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary">
              <Phone size={16} />
              Ligar {CONTRACTOR_INFO.phoneDisplay}
            </a>
            <Link href="/orcamento" className="btn-secondary" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              Abrir Calculadora de Orçamento
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
