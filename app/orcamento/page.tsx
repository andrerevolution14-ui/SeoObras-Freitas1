import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight, CheckCircle, Clock, Shield, Star } from "lucide-react";
import { CONTRACTOR_INFO, SERVICES } from "@/lib/constants";
import { CostCalculator } from "@/components/cost-calculator";

export const metadata: Metadata = {
  title: "Pedir Orçamento Gratuito & Calculadora de Obras em Aveiro | Freitas Renovações LDA",
  description:
    "Calcule o seu orçamento online ou peça proposta gratuita para obras e remodelações em Aveiro. Resposta em < 12h. Empreiteiro Jorge Freitas. Sem compromisso.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/orcamento" },
  keywords: [
    "orcamento obras aveiro",
    "pedir orcamento remodelacao aveiro",
    "calculadora obras aveiro",
    "preco remodelacao casa aveiro",
    "orcamento gratis obras aveiro",
    "jorge freitas orcamento",
    "freitas renovacoes orcamento",
  ],
  openGraph: {
    title: "Pedir Orçamento Gratuito em Aveiro | Freitas Renovações LDA",
    description:
      "Calculadora de obras e orçamento gratuito, detalhado e sem compromisso. Resposta em menos de 12h. ⭐ 4.9/5 no Google.",
    url: "https://www.grupofreitasrenovacoes.pt/orcamento",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pedir Orçamento de Obras em Aveiro — Freitas Renovações LDA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedir Orçamento Gratuito em Aveiro | Freitas Renovações LDA",
    description: "Simule na calculadora ou peça orçamento gratuito com resposta em <12h.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
  },
};

const orcamentoJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: "Pedido de Orçamento e Calculadora — Freitas Renovações LDA",
      url: "https://www.grupofreitasrenovacoes.pt/orcamento",
      description: "Calculadora interativa e formulário de contacto para pedir orçamento gratuito de obras e remodelações em Aveiro",
      mainEntity: {
        "@type": "HomeAndConstructionBusiness",
        name: CONTRACTOR_INFO.companyName,
        telephone: CONTRACTOR_INFO.phone,
        email: CONTRACTOR_INFO.email,
        url: CONTRACTOR_INFO.website,
      },
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
          name: "Orçamento",
          item: "https://www.grupofreitasrenovacoes.pt/orcamento",
        },
      ],
    },
  ],
};

export default function OrcamentoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orcamentoJsonLd) }}
      />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #071a3a, #0f2d5e)", padding: "7.5rem 0 4rem" }}>
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>Pedir Orçamento</span>
          </nav>
          <p className="section-eyebrow">Gratuito &amp; Sem Compromisso</p>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 900, color: "#ffffff", marginBottom: "0.875rem", letterSpacing: "-0.02em" }}>
            Calculadora &amp; Pedido de Orçamento Gratuito em Aveiro
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "600px", lineHeight: 1.65 }}>
            Simule o custo da sua obra na calculadora abaixo ou contacte diretamente. O empreiteiro Jorge Freitas responde pessoalmente
            em menos de 12 horas com um orçamento detalhado e preço justo.
          </p>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <div style={{ background: "#f8fafc", padding: "3rem 0 1rem" }}>
        <CostCalculator idPrefix="orcamento-page-calc" embedded={false} />
      </div>

      {/* Trust Strip */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "1.25rem 0" }}>
        <div className="section-container">
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
            {[
              { icon: <CheckCircle size={15} />, text: "Orçamento 100% gratuito" },
              { icon: <Clock size={15} />, text: "Resposta em menos de 12h" },
              { icon: <Shield size={15} />, text: "Empresa licenciada IMPIC" },
              { icon: <Star size={15} />, text: "⭐ 4.9/5 no Google (48 avaliações)" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", fontWeight: 600, color: "#334155" }}>
                <span style={{ color: "#0f2d5e" }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }} id="orcamento-grid">

            {/* Left: Contact Options */}
            <div>
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Como Prefere Contactar?
              </h2>

              {/* Phone CTA */}
              <div style={{
                background: "#071a3a", borderRadius: "0.75rem", padding: "1.75rem",
                marginBottom: "1.25rem", border: "2px solid rgba(251,191,36,0.3)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{
                    width: "44px", height: "44px", background: "rgba(251,191,36,0.15)",
                    borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Phone size={20} style={{ color: "#fbbf24" }} />
                  </div>
                  <div>
                    <div style={{ color: "#fbbf24", fontWeight: 800, fontSize: "1rem" }}>Ligar Agora</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}>Resposta imediata</div>
                  </div>
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", marginBottom: "1.125rem", lineHeight: 1.6 }}>
                  A forma mais rápida. O Jorge Freitas atende pessoalmente ou responde em menos de 1 hora.
                </p>
                <a
                  href={`tel:${CONTRACTOR_INFO.phone}`}
                  className="btn-primary"
                  id="orcamento-phone-cta"
                  style={{ width: "100%", justifyContent: "center", fontSize: "1rem" }}
                >
                  <Phone size={17} />
                  {CONTRACTOR_INFO.phoneDisplay}
                </a>
              </div>

              {/* WhatsApp / Email */}
              <div style={{
                background: "#ffffff", borderRadius: "0.75rem", padding: "1.5rem",
                border: "1.5px solid #e2e8f0",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{
                    width: "44px", height: "44px", background: "rgba(34,197,94,0.1)",
                    borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <MessageCircle size={20} style={{ color: "#16a34a" }} />
                  </div>
                  <div>
                    <div style={{ color: "#071a3a", fontWeight: 800, fontSize: "1rem" }}>Email / Mensagem</div>
                    <div style={{ color: "#64748b", fontSize: "0.8125rem" }}>Resposta em menos de 12h</div>
                  </div>
                </div>
                <a
                  href={`mailto:${CONTRACTOR_INFO.email}?subject=Pedido%20de%20Or%C3%A7amento&body=Ol%C3%A1%2C%20gostaria%20de%20pedir%20um%20or%C3%A7amento%20para%20`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.375rem",
                    color: "#0f2d5e", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none",
                  }}
                  id="orcamento-email-cta"
                >
                  {CONTRACTOR_INFO.email}
                  <ArrowRight size={14} />
                </a>
              </div>

              {/* Back to home form */}
              <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
                <Link
                  href="/#hero-form"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.375rem",
                    color: "#64748b", fontSize: "0.8125rem", textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Ou use o formulário rápido na página inicial
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right: Services Quick Select */}
            <div>
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>
                Que tipo de obra precisa?
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "1.25rem", lineHeight: 1.6 }}>
                Selecione o serviço para ver detalhes e pedir orçamento específico.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/servicos/${service.slug}`}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: "#ffffff", border: "1.5px solid #e2e8f0",
                      borderRadius: "0.5rem", padding: "0.875rem 1rem",
                      textDecoration: "none", transition: "all 0.2s ease",
                    }}
                    className="card-hover"
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: "#071a3a", fontSize: "0.9375rem" }}>{service.title}</div>
                      <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.125rem" }}>{service.description.slice(0, 60)}...</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                      {service.emergencyAvailable && (
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#dc2626", background: "rgba(239,68,68,0.08)", padding: "0.2rem 0.5rem", borderRadius: "0.25rem" }}>
                          URGÊNCIA
                        </span>
                      )}
                      <ArrowRight size={15} style={{ color: "#94a3b8" }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive fix for mobile two columns */}
      <style>{`
        @media (max-width: 768px) {
          #orcamento-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
