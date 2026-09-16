import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  MessageCircle,
  HelpCircle,
  Building,
  TrendingDown,
  Percent,
  Coins,
  BadgeCheck,
  FileSpreadsheet,
  AlertCircle,
  Banknote,
  Home,
  Check,
} from "lucide-react";
import { CONTRACTOR_INFO, CREDIT_PARTNER_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Crédito para Obras em Aveiro | Intermediação 100% Gratuita | Freitas Renovações LDA",
  description:
    "Financie as suas obras e remodelações em Aveiro com as melhores taxas do mercado. Serviço parceiro de intermediação de crédito 100% gratuito e autorizado pelo Banco de Portugal. Simulação rápida sem compromisso.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/credito-obras" },
  openGraph: {
    title: "Crédito para Obras & Remodelações em Aveiro | 100% Gratuito",
    description:
      "Apoio no financiamento da sua obra através de parceiros intermediários de crédito registados no Banco de Portugal. Custo zero para o cliente, resposta rápida e taxas competitivas.",
    url: "https://www.grupofreitasrenovacoes.pt/credito-obras",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Crédito para Obras e Remodelações em Aveiro — Freitas Renovações LDA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crédito para Obras & Remodelações em Aveiro | 100% Gratuito",
    description: "Financiamento para obras em Aveiro com intermediação gratuita autorizada pelo Banco de Portugal.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
  },
  keywords: [
    "credito para obras aveiro",
    "financiamento remodelacao aveiro",
    "intermediacao de credito obras",
    "emprestimo obras casa aveiro",
    "credito pessoal para obras",
    "financiar obras de casa",
    "obras a prestacoes aveiro",
    "freitas renovacoes credito",
  ],
};

const creditoJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://www.grupofreitasrenovacoes.pt",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Crédito para Obras",
          "item": "https://www.grupofreitasrenovacoes.pt/credito-obras",
        },
      ],
    },
    {
      "@type": "FinancialProduct",
      "name": "Intermediação de Crédito para Obras e Remodelações",
      "description":
        "Serviço parceiro de intermediação de crédito gratuito para obras, remodelações e melhoria energética de habitações em Aveiro, com intermediários autorizados pelo Banco de Portugal.",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": CONTRACTOR_INFO.companyName,
        "telephone": CONTRACTOR_INFO.phone,
        "url": CONTRACTOR_INFO.website,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": CONTRACTOR_INFO.address.street,
          "addressLocality": "Aveiro",
          "postalCode": CONTRACTOR_INFO.address.postalCode,
          "addressCountry": "PT",
        },
      },
      "feesAndCommissionsSpecification": "Serviço 100% gratuito para o cliente final. 0€ de comissão.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O serviço de intermediação de crédito tem algum custo para mim?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não, é 100% gratuito para o cliente. A remuneração do intermediário de crédito vinculado é assegurada diretamente pelas instituições financeiras parceiras, sem qualquer custo, comissão oculta ou acréscimo no valor da sua obra.",
          },
        },
        {
          "@type": "Question",
          "name": "Que tipos de obras podem ser financiadas com este crédito?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pode financiar qualquer intervenção realizada pela Freitas Renovações: remodelações integrais de moradias ou apartamentos, renovação de cozinhas e casas de banho, substituição de telhados, impermeabilizações, isolamento térmico com capoto ETICS, eletricidade ou canalização.",
          },
        },
        {
          "@type": "Question",
          "name": "Qual o prazo médio para obter resposta e aprovação do financiamento?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Após o envio dos documentos necessários, o parceiro intermediário apresenta propostas comparadas entre 24 a 48 horas úteis. Uma vez aprovado pelo banco, o capital fica disponível rapidamente para avançar com o início dos trabalhos.",
          },
        },
        {
          "@type": "Question",
          "name": "É possível juntar o crédito da obra com outros créditos existentes (Crédito Consolidado)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. O nosso parceiro analisa a sua situação financeira global e pode incluir uma consolidação de créditos existentes, reduzindo a sua prestação mensal global e libertando liquidez adicional para a realização da obra.",
          },
        },
      ],
    },
  ],
};

export default function CreditoObrasPage() {
  const whatsappSimulationText = encodeURIComponent(
    "Olá Jorge Freitas! Gostaria de pedir um orçamento para obras em Aveiro e saber mais sobre a simulação gratuita de crédito através do parceiro intermediário."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creditoJsonLd) }}
      />

      {/* ── 1. HERO SECTION ───────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #071a3a 0%, #0f2d5e 60%, #1e3a8a 100%)",
          padding: "7.5rem 0 4.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav
            style={{
              marginBottom: "1.25rem",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              fontSize: "0.8125rem",
            }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              Início
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24", fontWeight: 600 }}>Crédito para Obras</span>
          </nav>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#34d399",
              borderRadius: "2rem",
              padding: "0.35rem 1rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              marginBottom: "1rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <BadgeCheck size={15} />
            Serviço Parceiro 100% Gratuito · Banco de Portugal
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "3rem",
              alignItems: "center",
            }}
            id="credito-hero-grid"
          >
            <div>
              <h1
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Financie a Sua Obra em Aveiro com as{" "}
                <span className="text-gradient-gold">Melhores Taxas.</span>
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  marginBottom: "1.75rem",
                  maxWidth: "580px",
                }}
              >
                Na <strong>Freitas Renovações LDA</strong> ajudamos a concretizar a remodelação dos
                seus sonhos sem comprometer o seu orçamento mensal. Através da nossa rede de
                <strong> parceiros intermediários de crédito autorizados pelo Banco de Portugal</strong>,
                encontramos a melhor solução de financiamento para a sua obra — <strong>sem qualquer custo para si</strong>.
              </p>

              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                <a
                  href={`https://wa.me/351961455997?text=${whatsappSimulationText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  id="credito-hero-whatsapp-cta"
                  style={{ fontSize: "0.9375rem" }}
                >
                  <MessageCircle size={18} />
                  <span>Pedir Simulação Gratuita</span>
                </a>

                <a
                  href={`tel:${CONTRACTOR_INFO.phone}`}
                  className="btn-secondary"
                  id="credito-hero-call-cta"
                  style={{ fontSize: "0.9375rem" }}
                >
                  <Phone size={17} />
                  <span>Falar com Jorge Freitas</span>
                </a>
              </div>

              {/* Mini Highlights */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.75rem",
                  borderTop: "1px solid rgba(255,255,255,0.12)",
                  paddingTop: "1.5rem",
                }}
                id="credito-stats-row"
              >
                <div>
                  <div style={{ color: "#34d399", fontWeight: 900, fontSize: "1.375rem", lineHeight: 1 }}>
                    0€ Custo
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    Para o cliente final
                  </div>
                </div>
                <div>
                  <div style={{ color: "#fbbf24", fontWeight: 900, fontSize: "1.375rem", lineHeight: 1 }}>
                    24h a 48h
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    Resposta e propostas
                  </div>
                </div>
                <div>
                  <div style={{ color: "#38bdf8", fontWeight: 900, fontSize: "1.375rem", lineHeight: 1 }}>
                    +10 Bancos
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    Comparação de mercado
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card — Value Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1.5px solid rgba(251, 191, 36, 0.35)",
                borderRadius: "1rem",
                padding: "1.75rem",
                backdropFilter: "blur(12px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "0.5rem",
                    background: "rgba(251, 191, 36, 0.15)",
                    border: "1px solid rgba(251, 191, 36, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fbbf24",
                  }}
                >
                  <CreditCard size={22} />
                </div>
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "1rem" }}>
                    Vantagem Freitas Renovações
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>
                    Solução Chave na Mão + Financiamento
                  </div>
                </div>
              </div>

              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                Ao adjudicar a sua obra connosco, não precisa de perder dias nos balcões dos bancos.
                O nosso parceiro especializado trata de tudo por si para garantir a taxa mais competitiva de Portugal.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
                {[
                  "Sem comissões ocultas ou despesas de consultoria",
                  "Crédito para remodelações totais ou parciais",
                  "Prazos até 84 ou 120 meses à sua medida",
                  "Possibilidade de 100% do financiamento da obra",
                  "Intermediários certificados pelo Banco de Portugal",
                ].map((point) => (
                  <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.8125rem", color: "#e2e8f0" }}>
                    <CheckCircle2 size={16} style={{ color: "#34d399", flexShrink: 0, marginTop: "2px" }} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/orcamento"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.875rem" }}
              >
                <span>Simular Custos na Calculadora</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. VANTAGENS DO SERVIÇO PARCEIRO ───────────────── */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-eyebrow" style={{ color: "#d97706" }}>Porquê Escolher a Nossa Ajuda</p>
            <h2 className="section-title">
              Vantagens Exclusivas da Intermediação de Crédito Gratuita
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Conheça as razões pelas quais os nossos clientes em Aveiro financiam as suas obras sem preocupações e com as melhores prestações mensais.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {CREDIT_PARTNER_INFO.advantages.map((adv, index) => (
              <div
                key={adv.title}
                style={{
                  background: "#f8fafc",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "0.75rem",
                  padding: "1.75rem",
                  transition: "all 0.2s ease",
                }}
                className="card-hover"
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "0.5rem",
                    background: "rgba(15, 45, 94, 0.08)",
                    border: "1px solid rgba(15, 45, 94, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0f2d5e",
                    fontWeight: 900,
                    fontSize: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {index + 1}
                </div>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 800,
                    color: "#071a3a",
                    marginBottom: "0.5rem",
                  }}
                >
                  {adv.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.65 }}>
                  {adv.desc}
                </p>
              </div>
            ))}

            {/* Extra Card: Segurança Regulamentada */}
            <div
              style={{
                background: "linear-gradient(135deg, #071a3a 0%, #0f2d5e 100%)",
                borderRadius: "0.75rem",
                padding: "1.75rem",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#34d399", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
                  <ShieldCheck size={16} />
                  Entidade Certificada
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                  Segurança &amp; Proteção de Dados
                </h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", lineHeight: 1.65 }}>
                  Os nossos parceiros são intermediários de crédito vinculados autorizados pelo <strong>Banco de Portugal</strong>, garantindo total sigilo bancário e transparência em todas as propostas apresentadas.
                </p>
              </div>
              <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                Banco de Portugal · Decreto-Lei n.º 81-C/2017
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. COMO FUNCIONA EM 4 PASSOS ──────────────────── */}
      <section className="section-padding" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-eyebrow" style={{ color: "#0f2d5e" }}>Passo a Passo Simples</p>
            <h2 className="section-title">
              Como Funciona o Processo de Financiamento da Obra?
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Sem deslocações aos balcões nem processos burocráticos complicados. Tudo é conduzido de forma simples e digital.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                step: "01",
                title: "Orçamento com Jorge Freitas",
                desc: "A nossa equipa visita a sua casa ou analisa o seu projeto e apresenta um orçamento transparente, detalhado e com preço justo.",
                icon: <Coins size={22} style={{ color: "#fbbf24" }} />,
              },
              {
                step: "02",
                title: "Simulação sem Compromisso",
                desc: "O nosso parceiro intermediário de crédito recolhe os dados e simula a melhor mensalidade adaptada ao valor orçamentado da obra.",
                icon: <FileSpreadsheet size={22} style={{ color: "#38bdf8" }} />,
              },
              {
                step: "03",
                title: "Aprovação & Escolha do Banco",
                desc: "Compara propostas de múltiplos bancos. Você escolhe a prestação mais baixa e as condições ideais sem pagar 1 cêntimo pelo serviço.",
                icon: <TrendingDown size={22} style={{ color: "#34d399" }} />,
              },
              {
                step: "04",
                title: "Execução da Sua Obra",
                desc: "Capital disponibilizado na sua conta e a Freitas Renovações LDA arranca os trabalhos cumprindo prazos e com garantia total.",
                icon: <Home size={22} style={{ color: "#f472b6" }} />,
              },
            ].map((st) => (
              <div
                key={st.step}
                style={{
                  background: "#ffffff",
                  borderRadius: "0.75rem",
                  padding: "1.75rem",
                  border: "1.5px solid #e2e8f0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1.25rem",
                    right: "1.25rem",
                    fontSize: "1.75rem",
                    fontWeight: 900,
                    color: "rgba(15, 45, 94, 0.08)",
                    lineHeight: 1,
                  }}
                >
                  {st.step}
                </div>

                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "0.5rem",
                    background: "#071a3a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  {st.icon}
                </div>

                <h3
                  style={{
                    fontSize: "1.0625rem",
                    fontWeight: 800,
                    color: "#071a3a",
                    marginBottom: "0.5rem",
                  }}
                >
                  {st.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.8125rem", lineHeight: 1.65 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TIPOS DE OBRAS FINANCIÁVEIS ────────────────── */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-eyebrow" style={{ color: "#d97706" }}>Obras Elegíveis</p>
            <h2 className="section-title">
              Que Obras Podem Ser Financiadas com Este Apoio?
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Qualquer serviço realizado pela equipa da Freitas Renovações LDA pode usufruir de financiamento à medida.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                title: "Remodelação Geral de Moradia / Apartamento",
                desc: "Renovação integral de interiores, tetos falsos, pisos, carpintarias e canalizações.",
                amount: "15.000€ a 70.000€",
                tag: "Moradias & T1/T2/T3",
              },
              {
                title: "Remodelação de Cozinhas & Casas de Banho",
                desc: "Substituição de loiças, canalização nova, azulejos, bancadas e mobiliário por medida.",
                amount: "3.500€ a 15.000€",
                tag: "Zonas Húmidas",
              },
              {
                title: "Isolamento Térmico Capoto ETICS & Fachadas",
                desc: "Aplicação de sistema ETICS para eliminar humidades e reduzir drasticamente a fatura energética.",
                amount: "4.000€ a 18.000€",
                tag: "Eficiência Energética",
              },
              {
                title: "Infiltrações, Telhados & Coberturas",
                desc: "Impermeabilização completa, lavagem profunda de coberturas e substituição de telhas danificadas.",
                amount: "1.500€ a 8.000€",
                tag: "Proteção Estrutural",
              },
            ].map((work) => (
              <div
                key={work.title}
                style={{
                  background: "#f8fafc",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  border: "1.5px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "#0f2d5e",
                      background: "rgba(15,45,94,0.08)",
                      borderRadius: "0.25rem",
                      padding: "0.2rem 0.5rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {work.tag}
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#071a3a", marginBottom: "0.5rem", lineHeight: 1.35 }}>
                    {work.title}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "0.8125rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {work.desc}
                  </p>
                </div>

                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "0.75rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Valores comuns de obra:</span>
                  <div style={{ fontWeight: 800, color: "#0f2d5e", fontSize: "0.9375rem" }}>
                    {work.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TABELA EXEMPLIFICATIVA DE MENSALIDADES ──────── */}
      <section className="section-padding" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-eyebrow" style={{ color: "#16a34a" }}>Exemplos Práticos</p>
            <h2 className="section-title">
              Simulação Ilustrativa de Mensalidades para Obras
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Veja como o custo da sua remodelação se pode traduzir numa mensalidade confortável e perfeitamente suportável.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "0.75rem",
              border: "1.5px solid #e2e8f0",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
                background: "#071a3a",
                color: "#ffffff",
                padding: "1rem 1.25rem",
                fontWeight: 700,
                fontSize: "0.8125rem",
              }}
              id="tabela-header"
            >
              <div>Tipo de Intervenção</div>
              <div>Valor Financiado</div>
              <div>Prazo Médio</div>
              <div>Prestação Estimada*</div>
            </div>

            {[
              {
                work: "Renovação de Casa de Banho",
                value: "4.500 €",
                period: "48 meses",
                monthly: "~108 € / mês",
              },
              {
                work: "Remodelação de Cozinha Completa",
                value: "9.000 €",
                period: "60 meses",
                monthly: "~179 € / mês",
              },
              {
                work: "Capoto ETICS / Isolamento Fachada",
                value: "14.000 €",
                period: "84 meses",
                monthly: "~215 € / mês",
              },
              {
                work: "Remodelação Geral de Apartamento",
                value: "28.000 €",
                period: "96 meses",
                monthly: "~368 € / mês",
              },
              {
                work: "Grande Remodelação de Moradia",
                value: "50.000 €",
                period: "120 meses",
                monthly: "~525 € / mês",
              },
            ].map((row, idx) => (
              <div
                key={row.work}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
                  padding: "1rem 1.25rem",
                  fontSize: "0.8125rem",
                  borderBottom: idx < 4 ? "1px solid #f1f5f9" : "none",
                  background: idx % 2 === 0 ? "#ffffff" : "#f8fafc",
                  alignItems: "center",
                }}
                className="tabela-row"
              >
                <div style={{ fontWeight: 700, color: "#071a3a" }}>{row.work}</div>
                <div style={{ color: "#475569", fontWeight: 600 }}>{row.value}</div>
                <div style={{ color: "#64748b" }}>{row.period}</div>
                <div style={{ fontWeight: 800, color: "#16a34a", fontSize: "0.875rem" }}>{row.monthly}</div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: "0.75rem",
              color: "#64748b",
              textAlign: "center",
              marginTop: "1rem",
              maxWidth: "700px",
              margin: "1rem auto 0",
              lineHeight: 1.5,
            }}
          >
            * Valores meramente ilustrativos baseados em médias de mercado e TAN/TAEG indicativas para crédito pessoal à habitação/obras. As condições finais dependem da análise de risco individual pelo intermediário de crédito parceiro e pela entidade bancária concedente.
          </p>
        </div>
      </section>

      {/* ── 6. FAQ DETALHADA CRÉDITO ───────────────────────── */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container" style={{ maxWidth: "850px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-eyebrow" style={{ color: "#0f2d5e" }}>Perguntas Frequentes</p>
            <h2 className="section-title">
              Dúvidas Comuns sobre Financiamento de Obras
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              {
                q: "O serviço de intermediação de crédito tem algum custo para mim?",
                a: "Não! O serviço é 100% gratuito para o cliente final. A remuneração do intermediário de crédito vinculado é assegurada pelas instituições bancárias parceiras nos termos da lei, sem qualquer acréscimo no valor das obras orçamentadas pelo Empreiteiro Jorge Freitas.",
              },
              {
                q: "Tenho de pedir o crédito obrigatoriamente convosco?",
                a: "Não. A intermediação de crédito é uma vantagem e facilidade opcional que oferecemos aos nossos clientes para poupar tempo e dinheiro. Se preferir financiar com fundos próprios ou através do seu banco habitual, tem total liberdade.",
              },
              {
                q: "Quais os documentos necessários para a simulação?",
                a: "Para uma análise inicial rápida são normalmente necessários: Cartão de Cidadão, comprovativo de morada recente, última declaração de IRS com nota de liquidação e os últimos 3 recibos de vencimento (ou extratos bancários se for trabalhador independente).",
              },
              {
                q: "O crédito pode cobrir tanto a mão de obra como os materiais?",
                a: "Sim. O financiamento pode cobrir a totalidade do orçamento apresentado pela Freitas Renovações LDA, englobando a mão de obra especializada, materiais de construção, louças sanitárias, azulejos, tintas e gestão de resíduos.",
              },
              {
                q: "Qual a diferença entre Crédito Pessoal para Obras e Crédito Habitação (Obras)?",
                a: "Para valores até 30.000€ - 50.000€, o crédito pessoal ou para energias renováveis/obras é muito mais rápido (aprovação em 24-48h, sem custos de hipoteca nem avaliações imobiliárias demoradas). Para grandes obras estruturais de moradias (+50.000€), pode ser mais vantajoso um reforço hipotecário com prazos até 25-30 anos e taxas mais baixas.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                style={{
                  background: "#f8fafc",
                  borderRadius: "0.5rem",
                  border: "1.5px solid #e2e8f0",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <HelpCircle size={18} style={{ color: "#d97706", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#071a3a", marginBottom: "0.5rem" }}>
                      {faq.q}
                    </h3>
                    <p style={{ color: "#475569", fontSize: "0.8125rem", lineHeight: 1.65 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA BANNER ────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <div className="section-container">
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 900,
              color: "#071a3a",
              marginBottom: "0.875rem",
              letterSpacing: "-0.01em",
            }}
          >
            Quer saber quanto fica a prestação da sua obra?
          </h2>
          <p
            style={{
              color: "rgba(7, 26, 58, 0.85)",
              fontSize: "1.0625rem",
              maxWidth: "540px",
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            Fale diretamente com o Empreiteiro Jorge Freitas e obtenha um orçamento gratuito com apoio de crédito à medida das suas possibilidades.
          </p>

          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/351961455997?text=${whatsappSimulationText}`}
              target="_blank"
              rel="noopener noreferrer"
              id="final-credito-whatsapp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#071a3a",
                color: "#ffffff",
                fontWeight: 800,
                padding: "0.875rem 1.75rem",
                borderRadius: "0.375rem",
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(7, 26, 58, 0.3)",
              }}
            >
              <MessageCircle size={18} />
              <span>Pedir Simulação Gratuita</span>
            </a>

            <a
              href={`tel:${CONTRACTOR_INFO.phone}`}
              id="final-credito-phone"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(7, 26, 58, 0.12)",
                color: "#071a3a",
                fontWeight: 800,
                padding: "0.875rem 1.75rem",
                borderRadius: "0.375rem",
                fontSize: "1rem",
                textDecoration: "none",
                border: "2px solid rgba(7, 26, 58, 0.3)",
              }}
            >
              <Phone size={18} />
              <span>{CONTRACTOR_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Media Queries */}
      <style>{`
        @media (max-width: 768px) {
          #credito-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          #credito-stats-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 1rem !important;
          }
          #tabela-header, .tabela-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}
