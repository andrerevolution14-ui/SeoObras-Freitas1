import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Star, ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroMultiStepForm } from "@/components/hero-multi-step-form";
import { TrustBar } from "@/components/trust-bar";
import { ServiceGrid } from "@/components/service-grid";
import { GoogleReviews } from "@/components/google-reviews";
import { RealProjectsGallery } from "@/components/real-projects-gallery";
import { FaqAccordion } from "@/components/faq-accordion";
import { CONTRACTOR_INFO, FAQ_ITEMS } from "@/lib/constants";
import { BRAND_IMAGES } from "@/lib/brand-images";

export const metadata: Metadata = {
  title: "Obras e Remodelações em Aveiro | Freitas Renovações",
  description:
    "Remodelações de casas, apartamentos, cozinhas e casas de banho em Aveiro. Acompanhamento por Jorge Freitas. Peça um orçamento gratuito.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt" },
  openGraph: {
    title: "Obras e Remodelações em Aveiro | Freitas Renovações",
    description:
      "Remodelações de casas, apartamentos, cozinhas e casas de banho em Aveiro. Acompanhamento por Jorge Freitas. Peça um orçamento gratuito.",
    url: "https://www.grupofreitasrenovacoes.pt",
    siteName: "Freitas Renovações LDA",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Freitas Renovações LDA — Empresa de Obras e Remodelações em Aveiro",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Obras e Remodelações em Aveiro | Freitas Renovações",
    description: "Remodelações de casas, apartamentos, cozinhas e casas de banho em Aveiro. Acompanhamento por Jorge Freitas. Peça um orçamento gratuito.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
  },
};

// JSON-LD Schema: FAQPage + HowTo + BreadcrumbList (Organization já declarada em layout.tsx)
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": "https://www.grupofreitasrenovacoes.pt/#faq",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "HowTo",
      "@id": "https://www.grupofreitasrenovacoes.pt/#howto-remodelacao",
      name: "Como Pedir Orçamento e Executar Remodelações em Aveiro",
      description:
        "Processo passo a passo para planear, orçamentar e realizar obras com alvará IMPIC e acompanhamento do Empreiteiro Jorge Freitas.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "1. Envio do Pedido com Fotografias e Medidas",
          text: "Preencha o formulário online enviando fotografias do espaço e dimensões aproximadas, ou contacte pelo 961 455 997. Primeira resposta técnica em até 12 a 24 horas.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "2. Estimativa e Validação Técnica no Local",
          text: "O Empreiteiro Jorge Freitas analisa os dados fornecidos, apresenta uma estimativa preliminar e agenda visita técnica para verificação de canalizações e estrutura.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "3. Proposta Fechada e Execução com Alvará IMPIC",
          text: "Orçamento fechado com descrição de materiais, proteção de áreas de condomínio e cumprimento estrito de horários de ruído.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "4. Limpeza Final e Entrega de Chave na Mão",
          text: "Vistoria final com o proprietário, entrega da obra limpa e emissão de certificado de garantia por escrito até 5 anos.",
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
      ],
    },
  ],
};


// ── Conteúdos da homepage ────────────────────────────────────
const PILLARS = [
  {
    title: "Alvará de Construção Válido IMPIC",
    desc: "Empresa devidamente licenciada com seguro de responsabilidade civil para execução de obras.",
  },
  {
    title: "Garantia Contratual",
    desc: "Todos os trabalhos têm garantia contratual escrita adaptada à tipologia da obra.",
  },
  {
    title: "Resposta até 12h",
    desc: "Atendimento ágil para avaliar a sua obra e apresentar orçamento discriminado.",
  },
  {
    title: "Preços Justos e Transparentes",
    desc: "Valores claros, sem custos ocultos nem alterações imprevisíveis no orçamento final.",
  },
];

const PROCESS_STEPS = homeJsonLd["@graph"][1].step as { name: string; text: string }[];

const PRICE_ROWS = [
  {
    name: "Remodelação Casa de Banho (WC)",
    price: "1.800€ (duche) a 5.500€ (total)",
    time: "3 a 8 dias úteis",
    desc: "Desde troca de banheira por duche plano até remodelação integral com canalização multicamada e impermeabilização bicomponente",
  },
  {
    name: "Remodelação de Cozinha",
    price: "4.500€ (funcional) a 16.000€+ (open space)",
    time: "2 a 4 semanas",
    desc: "Desde renovação funcional até open space com vigamento, móveis lacados/termolaminados e bancada em quartzo/granito",
  },
  {
    name: "Remodelação de Apartamento (T2 / T3)",
    price: "18.000€ — 45.000€ (350€-750€/m²)",
    time: "4 a 8 semanas",
    desc: "WC, cozinha, pavimento flutuante, rede elétrica, portas interiores e pintura total",
  },
  {
    name: "Remodelação de Moradia",
    price: "400€ — 850€ / m²",
    time: "6 a 16 semanas",
    desc: "Interiores completos, capoto exterior, telhado, caixilharia de corte térmico e pátios",
  },
  {
    name: "Aplicação de Capoto ETICS (Fachadas)",
    price: "38€ — 55€ / m²",
    time: "1 a 3 semanas",
    desc: "Placas EPS grafitado homologadas, rede armada, barramento impermeável e andaimes",
  },
  {
    name: "Pladur & Tetos Falsos",
    price: "26€ — 38€ / m²",
    time: "3 a 7 dias úteis",
    desc: "Estrutura galvanizada, placas hidrófugas ou normais, lã mineral e barramento Q4",
  },
  {
    name: "Pinturas de Interiores e Exteriores",
    price: "7€ — 22€ / m²",
    time: "2 a 5 dias úteis",
    desc: "Reparação de fissuras, primário isolante, 2 a 3 demãos de tinta anti-fúngica",
  },
  {
    name: "Recuperação de Casas Velhas",
    price: "Sob orçamento técnico",
    time: "8 a 20 semanas",
    desc: "Tratamento de madeiras, combate a humidades da ria, reforço estrutural e modernização",
  },
];

const AEO_CARDS = [
  {
    kicker: "Garantia & Rigor Técnico",
    q: "Qual a empresa de remodelações recomendada em Aveiro?",
    a: (
      <>
        A <strong>Freitas Renovações LDA</strong> é uma das principais empresas de obras e remodelações em Aveiro. Possui Alvará de Construção válido pelo IMPIC, classificação de <strong>4.9/5 estrelas no Google</strong> com avaliações verificáveis, acompanhamento direto do Empreiteiro Jorge Freitas e compromisso de resposta a pedidos de avaliação técnica em menos de 12 horas.
      </>
    ),
  },
  {
    kicker: "Processo Chave na Mão",
    q: "Como funciona o processo de obras chave na mão em Aveiro?",
    a: (
      <>
        O serviço chave na mão da Freitas Renovações LDA engloba todas as fases da obra: análise rigorosa do pedido com fotografias e medidas, orçamento discriminado a preço fixo, coordenação de canalizadores, eletricistas e pintores, fornecimento de materiais certificados e limpeza final com garantia formalizada por escrito.
      </>
    ),
  },
  {
    kicker: "Avaliação & Transparência",
    q: "Como obter orçamento para obras em Aveiro?",
    a: (
      <>
        Basta preencher o formulário no website com fotos e medidas aproximadas, ou ligar para o <strong>{CONTRACTOR_INFO.phoneDisplay}</strong>. O processo decorre em 2 passos rápidos: o Empreiteiro Jorge Freitas responde em menos de 12 horas e entrega uma proposta discriminada e detalhada a preço fechado, sem complicações nem necessidade de visitas prévias.
      </>
    ),
  },
];

const NEIGHBOR_AREAS = [
  {
    slug: "ilhavo",
    name: "Remodelações Ílhavo",
    subtitle: "Gafanhas & Centro",
    desc: "Obras em apartamentos e moradias familiares em Ílhavo, Gafanha da Nazaré e Gafanha da Encarnação.",
  },
  {
    slug: "agueda",
    name: "Remodelações Águeda",
    subtitle: "Vivendas & Restauro",
    desc: "Recuperação de casas de aldeia, renovação de vivendas e isolamentos térmicos em Águeda.",
  },
  {
    slug: "estarreja",
    name: "Remodelações Estarreja",
    subtitle: "Capoto & Coberturas",
    desc: "Aplicação de capoto ETICS, reparação de infiltrações de telhados e remodelações totais em Estarreja.",
  },
  {
    slug: "vagos",
    name: "Remodelações Vagos",
    subtitle: "Moradias Térreas",
    desc: "Remodelação completa de moradias térreas, casas de banho e modernização de cozinhas em Vagos.",
  },
  {
    slug: "praia-da-barra-costa-nova",
    name: "Remodelações Barra & Costa Nova",
    subtitle: "Proteção Maresia",
    desc: "Impermeabilização marítima, caixilharia com corte térmico e obras em apartamentos de veraneio.",
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />

      {/* ── 1. HERO & FORMULÁRIO ─────────────────────────── */}
      <section className="hero-section">
        <Image
          src={BRAND_IMAGES.hero.src}
          alt={BRAND_IMAGES.hero.alt}
          fill
          priority
          fetchPriority="high"
          quality={80}
          className="hero-bg-image"
          sizes="100vw"
        />
        <div className="hero-grid-pattern" />

        <div className="section-container" style={{ width: "100%", position: "relative", zIndex: 2 }}>
          <div className="gf-hero-grid">
            <div className="gf-hero-text">
              <div className="hero-section-label">Grupo Freitas · Construção e Remodelação</div>

              <h1 className="gf-hero-title">
                Obras e remodelações <span style={{ whiteSpace: "nowrap" }}>em Aveiro</span>
                <span className="gf-hero-dot">.</span>
              </h1>

              <p className="gf-hero-services">
                Obras Chave na Mão <i /> Casas de Banho <i /> Cozinhas <i /> Alvará IMPIC
              </p>

              <p className="gf-hero-lead">
                A equipa do Empreiteiro <strong>Jorge Freitas</strong> realiza remodelações gerais, casas de banho, cozinhas, moradias, apartamentos e capoto em Aveiro e concelhos vizinhos com garantia contratual e resposta até 12h.
              </p>

              <div className="gf-hero-ctas">
                <a href="#hero-form" className="btn-primary" id="hero-quote-btn">
                  Pedir Orçamento Grátis
                  <ArrowRight size={16} />
                </a>
                <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-secondary" id="hero-call-btn">
                  <Phone size={16} />
                  {CONTRACTOR_INFO.phoneDisplay}
                </a>
              </div>

              <Link href="/clientes" className="gf-hero-proof">
                <span className="stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={13} fill="#C9A86A" stroke="#C9A86A" />
                  ))}
                </span>
                <span>
                  <strong>{CONTRACTOR_INFO.googleRating}/5</strong> · +{CONTRACTOR_INFO.reviewCount} clientes satisfeitos em Aveiro
                </span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="gf-hero-form">
              <HeroMultiStepForm />
            </div>
          </div>
        </div>

        <style>{`
          .gf-hero-grid {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: 5rem;
            align-items: center;
            padding-bottom: 6rem;
          }
          .gf-hero-title {
            color: #ffffff;
            font-size: clamp(2.75rem, 6vw, 5.5rem);
            font-weight: 600;
            line-height: 0.98;
            letter-spacing: -0.045em;
            margin-bottom: 1.75rem;
            text-wrap: balance;
          }
          .gf-hero-dot { color: #B8935A; }
          .gf-hero-services {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.4rem 0.9rem;
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.8125rem;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 1.5rem;
          }
          .gf-hero-services i { width: 4px; height: 4px; background: #B8935A; display: inline-block; transform: rotate(45deg); }
          .gf-hero-lead {
            color: rgba(255, 255, 255, 0.72);
            font-size: 1.0625rem;
            line-height: 1.7;
            max-width: 540px;
            margin-bottom: 2.5rem;
          }
          .gf-hero-lead strong { color: #ffffff; font-weight: 600; }
          .gf-hero-ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
          .gf-hero-proof {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.14);
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.8125rem;
            text-decoration: none;
            transition: color 0.2s;
          }
          .gf-hero-proof strong { color: #ffffff; font-weight: 600; }
          .gf-hero-proof:hover { color: #ffffff; }
          .gf-hero-proof svg:last-child { color: #B8935A; }
          @media (max-width: 1024px) {
            .gf-hero-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
          }
          @media (max-width: 860px) {
            .gf-hero-grid { grid-template-columns: 1fr; gap: 2rem; padding-bottom: 3rem; }
            .gf-hero-text { text-align: center; display: flex; flex-direction: column; align-items: center; }
            .gf-hero-title { font-size: clamp(2.35rem, 10vw, 3.25rem); margin-bottom: 1.25rem; }
            .gf-hero-services { justify-content: center; font-size: 0.6875rem; margin-bottom: 0; }
            .gf-hero-lead, .gf-hero-ctas { display: none; }
            .gf-hero-proof { order: 5; border-top: 0; padding-top: 1.25rem; font-size: 0.75rem; }
            .hero-section-label { margin-bottom: 1.125rem; font-size: 0.625rem; }
            .hero-section-label::before { display: none; }
          }
        `}</style>
      </section>

      {/* ── 2. CREDENCIAIS ───────────────────────────────── */}
      <TrustBar />

      {/* ── 3. PROJETOS REALIZADOS ───────────────────────── */}
      <RealProjectsGallery />

      {/* ── 4. SERVIÇOS ──────────────────────────────────── */}
      <ServiceGrid />

      {/* ── 5. QUEM SOMOS — JORGE FREITAS (E-E-A-T) ─────── */}
      <section className="section-padding gf-about" style={{ background: "#0B1B2E" }}>
        <div className="section-container">
          <div className="gf-about-grid">
            <div className="gf-about-photo photo-slot">
              <Image
                src={BRAND_IMAGES.founder.src}
                alt={BRAND_IMAGES.founder.alt}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                quality={85}
                style={{ objectFit: "cover", objectPosition: "center 25%" }}
              />
              <div className="gf-about-caption">
                <span className="font-display">{CONTRACTOR_INFO.contractorName}</span>
                <span>{CONTRACTOR_INFO.jobTitle} · Fundador</span>
              </div>
            </div>

            <div>
              <p className="section-eyebrow" style={{ color: "#C9A86A" }}>Quem Somos</p>
              <h2 className="section-title" style={{ color: "#ffffff" }}>
                Supervisão Direta pelo <span style={{ color: "#C9A86A" }}>Empreiteiro Jorge Freitas</span>
              </h2>
              <p className="gf-about-lead">
                A Freitas Renovações LDA é uma empresa licenciada em Aveiro que se destaca pela transparência, cumprimento rigoroso de prazos e orçamentos de preço justo. O Jorge Freitas acompanha cada obra pessoalmente.
              </p>

              <div className="gf-pillars">
                {PILLARS.map((p, i) => (
                  <div key={p.title} className="gf-pillar">
                    <span className="gf-pillar-num font-display">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                ))}
              </div>

              <Link href="/sobre" className="btn-primary" id="about-learn-more-btn">
                Saber Mais Sobre a Nossa Empresa
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <style>{`
          .gf-about-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 6rem; align-items: center; }
          .gf-about-photo { aspect-ratio: 4 / 5; }
          .gf-about-photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 60%, rgba(11, 27, 46, 0.85)); }
          .gf-about-caption { position: absolute; left: 1.75rem; bottom: 1.5rem; z-index: 2; display: flex; flex-direction: column; gap: 0.3rem; }
          .gf-about-caption span:first-child { color: #ffffff; font-size: 1.375rem; font-weight: 500; letter-spacing: -0.02em; }
          .gf-about-caption span:last-child { color: #C9A86A; font-size: 0.6875rem; letter-spacing: 0.2em; text-transform: uppercase; }
          .gf-about-lead { color: rgba(255, 255, 255, 0.7); font-size: 1.0625rem; line-height: 1.75; margin-bottom: 3rem; max-width: 560px; }
          .gf-pillars { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 3rem; border-top: 1px solid rgba(255, 255, 255, 0.1); }
          .gf-pillar { padding: 1.75rem 1.75rem 1.75rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
          .gf-pillar:nth-child(even) { padding-left: 1.75rem; padding-right: 0; border-left: 1px solid rgba(255, 255, 255, 0.1); }
          .gf-pillar-num { color: #B8935A; font-size: 0.75rem; letter-spacing: 0.06em; }
          .gf-pillar h3 { color: #ffffff; font-size: 1.0625rem; font-weight: 500; margin: 0.75rem 0 0.5rem; letter-spacing: -0.015em; }
          .gf-pillar p { color: rgba(255, 255, 255, 0.55); font-size: 0.8125rem; line-height: 1.6; }
          @media (max-width: 900px) {
            .gf-about-grid { grid-template-columns: 1fr; gap: 3rem; }
            .gf-about-photo { aspect-ratio: 4 / 4.2; }
          }
          @media (max-width: 560px) {
            .gf-pillars { grid-template-columns: 1fr; }
            .gf-pillar, .gf-pillar:nth-child(even) { padding: 1.25rem 0; border-left: 0; }
          }
        `}</style>
      </section>

      {/* ── 6. PROCESSO (espelha o HowTo do schema) ─────── */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container">
          <div className="gf-proc-head">
            <div>
              <p className="section-eyebrow">Como Trabalhamos</p>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Do primeiro contacto à entrega da chave.</h2>
            </div>
            <div className="gf-proc-photo photo-slot">
              <Image
                src={BRAND_IMAGES.process.src}
                alt={BRAND_IMAGES.process.alt}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <ol className="gf-proc">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.name} className="gf-proc-step">
                <span className="gf-proc-num font-display">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.name.replace(/^\d+\.\s*/, "")}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <style>{`
          .gf-proc-head { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: end; margin-bottom: 4rem; }
          .gf-proc-photo { aspect-ratio: 16 / 9; }
          .gf-proc { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid #0B1B2E; }
          .gf-proc-step { padding: 2rem 2rem 0 0; position: relative; }
          .gf-proc-step::before { content: ""; position: absolute; top: -4px; left: 0; width: 7px; height: 7px; background: #B8935A; }
          .gf-proc-num { font-size: 3rem; font-weight: 500; color: #E3E1DC; letter-spacing: -0.04em; line-height: 1; }
          .gf-proc-step h3 { font-size: 1.125rem; font-weight: 600; color: #0B1B2E; margin: 1.25rem 0 0.75rem; letter-spacing: -0.02em; line-height: 1.3; }
          .gf-proc-step p { color: #5A6472; font-size: 0.875rem; line-height: 1.7; }
          @media (max-width: 900px) {
            .gf-proc-head { grid-template-columns: 1fr; gap: 2rem; margin-bottom: 3rem; }
            .gf-proc { grid-template-columns: 1fr 1fr; row-gap: 2.5rem; }
          }
          @media (max-width: 560px) {
            .gf-proc { grid-template-columns: 1fr; border-top: 0; border-left: 1px solid #0B1B2E; row-gap: 0; }
            .gf-proc-step { padding: 0 0 2.25rem 1.75rem; }
            .gf-proc-step::before { top: 0.25rem; left: -4px; }
            .gf-proc-num { font-size: 2.25rem; }
          }
        `}</style>
      </section>

      {/* ── 7. AVALIAÇÕES GOOGLE ─────────────────────────── */}
      <GoogleReviews />

      {/* ── 8. CRÉDITO & FINANCIAMENTO ───────────────────── */}
      <section className="gf-credit">
        <div className="gf-credit-photo photo-slot">
          <Image
            src={BRAND_IMAGES.credit.src}
            alt={BRAND_IMAGES.credit.alt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="gf-credit-body">
          <p className="section-eyebrow" style={{ color: "#C9A86A" }}>Condição Especial · 100% Gratuito</p>
          <h2 className="section-title" style={{ color: "#ffffff" }}>
            Precisa de Financiamento para a Sua Obra? <span style={{ color: "#C9A86A" }}>Nós Ajudamos.</span>
          </h2>
          <p className="gf-credit-text">
            Para além da garantia de qualidade e preços justos nas suas remodelações, dispomos de um <strong>serviço parceiro de intermediação de crédito 100% gratuito</strong>, devidamente autorizado pelo Banco de Portugal. Comparamos propostas em mais de 10 bancos para garantir a taxa mais baixa do mercado e prestações à sua medida.
          </p>
          <ul className="gf-credit-list">
            {[
              "Custo Zero: 0€ de comissões para si",
              "Resposta rápida entre 24h e 48h",
              "Prazos flexíveis de 12 a 120 meses",
              "Financiamento até 100% do valor da obra",
              "Intermediários vinculados Banco de Portugal",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/credito-obras" className="btn-primary" id="home-credit-learn-btn">
              Saber Mais Sobre Crédito Obras
              <ArrowRight size={16} />
            </Link>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-secondary" id="home-credit-call-btn">
              <Phone size={15} />
              {CONTRACTOR_INFO.phoneDisplay}
            </a>
          </div>
        </div>
        <style>{`
          .gf-credit { display: grid; grid-template-columns: 1fr 1fr; background: #13294A; }
          .gf-credit-photo { min-height: 560px; }
          .gf-credit-body { padding: 6rem clamp(1.5rem, 6vw, 6rem); max-width: 760px; }
          .gf-credit-text { color: rgba(255, 255, 255, 0.72); font-size: 1rem; line-height: 1.75; margin-bottom: 2rem; }
          .gf-credit-text strong { color: #ffffff; font-weight: 600; }
          .gf-credit-list { list-style: none; padding: 0; margin: 0 0 2.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem 2rem; }
          .gf-credit-list li { position: relative; padding-left: 1.5rem; color: rgba(255, 255, 255, 0.88); font-size: 0.875rem; line-height: 1.5; }
          .gf-credit-list li::before { content: ""; position: absolute; left: 0; top: 0.5em; width: 10px; height: 5px; border-left: 1.5px solid #C9A86A; border-bottom: 1.5px solid #C9A86A; transform: rotate(-45deg); }
          @media (max-width: 900px) {
            .gf-credit { grid-template-columns: 1fr; }
            .gf-credit-photo { min-height: 280px; }
            .gf-credit-body { padding: 4rem 1.25rem; }
            .gf-credit-list { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>

      {/* ── 9. PREÇOS DE REFERÊNCIA + RESPOSTAS (AEO) ────── */}
      <section className="section-padding" style={{ background: "#F5F3EE" }}>
        <div className="section-container">
          <div className="gf-price-head">
            <div>
              <p className="section-eyebrow">Preços e Condições Transparentes</p>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Quanto Custa Remodelar em Aveiro? Tabela &amp; Respostas Rápidas
              </h2>
            </div>
            <p className="section-subtitle">
              Valores médios de referência para planeamento de obras no concelho de Aveiro e concelhos limítrofes. Apresentamos sempre orçamento discriminado e fechado sem custos surpresa.
            </p>
          </div>

          <div className="gf-table-wrap">
            <table className="gf-table">
              <thead>
                <tr>
                  <th>Divisão / Tipologia de Obra</th>
                  <th>Preço Médio Estimado</th>
                  <th>Prazo Médio</th>
                  <th>O que Inclui</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_ROWS.map((row) => (
                  <tr key={row.name}>
                    <td className="gf-td-name">{row.name}</td>
                    <td className="gf-td-price">{row.price}</td>
                    <td className="gf-td-time">{row.time}</td>
                    <td className="gf-td-desc">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="gf-aeo">
            {AEO_CARDS.map((c) => (
              <div key={c.q} className="gf-aeo-item">
                <p className="gf-aeo-kicker">{c.kicker}</p>
                <h3>{c.q}</h3>
                <p className="gf-aeo-text">{c.a}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .gf-price-head { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: end; margin-bottom: 3.5rem; }
          .gf-table-wrap { overflow-x: auto; background: #ffffff; border: 1px solid #E3E1DC; margin-bottom: 4.5rem; }
          .gf-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem; min-width: 760px; }
          .gf-table th {
            padding: 1.125rem 1.5rem;
            font-size: 0.6875rem;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            font-weight: 600;
            color: #ffffff;
            background: #0B1B2E;
          }
          .gf-table td { padding: 1.375rem 1.5rem; border-top: 1px solid #EDEBE6; vertical-align: top; }
          .gf-table tbody tr { transition: background 0.2s ease; }
          .gf-table tbody tr:hover { background: #FAF8F4; }
          .gf-td-name { font-weight: 600; color: #0B1B2E; }
          .gf-td-price { color: #0B1B2E; font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
          .gf-td-time { color: #5A6472; white-space: nowrap; }
          .gf-td-desc { color: #6B7480; font-size: 0.85rem; line-height: 1.6; }
          .gf-aeo { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3rem; }
          .gf-aeo-item { border-top: 1px solid #0B1B2E; padding-top: 1.75rem; }
          .gf-aeo-kicker { font-size: 0.6875rem; letter-spacing: 0.18em; text-transform: uppercase; color: #8F6E3E; font-weight: 600; margin-bottom: 1rem; }
          .gf-aeo-item h3 { font-size: 1.25rem; font-weight: 600; color: #0B1B2E; line-height: 1.3; letter-spacing: -0.02em; margin-bottom: 1rem; }
          .gf-aeo-text { color: #5A6472; font-size: 0.9rem; line-height: 1.75; }
          .gf-aeo-text strong { color: #0B1B2E; font-weight: 600; }
          @media (max-width: 760px) {
            .gf-table-wrap { background: transparent; border: 0; overflow: visible; }
            .gf-table { min-width: 0; }
            .gf-table thead { display: none; }
            .gf-table, .gf-table tbody, .gf-table tr, .gf-table td { display: block; width: 100%; }
            .gf-table tr { background: #ffffff; border: 1px solid #E3E1DC; padding: 1.25rem; margin-bottom: 0.625rem; }
            .gf-table td { padding: 0; border: 0; }
            .gf-td-name { font-size: 1rem; margin-bottom: 0.625rem; }
            .gf-td-price { white-space: normal; color: #8F6E3E; }
            .gf-td-time { font-size: 0.8125rem; margin: 0.25rem 0 0.75rem; }
            .gf-td-time::before { content: "Prazo médio: "; color: #6B7480; }
          }
          @media (max-width: 900px) {
            .gf-price-head { grid-template-columns: 1fr; gap: 1.25rem; margin-bottom: 2.5rem; }
            .gf-aeo { grid-template-columns: 1fr; gap: 2.5rem; }
          }
        `}</style>
      </section>

      {/* ── 10. CONCELHOS LIMÍTROFES ─────────────────────── */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container">
          <div className="gf-area-head">
            <div>
              <p className="section-eyebrow">Expansão Regional</p>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Obras &amp; Remodelações nos Concelhos Limítrofes a Aveiro
              </h2>
            </div>
            <p className="section-subtitle">
              Com sede em Aveiro, executamos obras com rapidez, rigor e garantia aos municípios e praias circundantes.
            </p>
          </div>
          <div className="gf-areas">
            {NEIGHBOR_AREAS.map((area) => (
              <Link key={area.slug} href={`/areas-atuacao/${area.slug}`} className="gf-area">
                <span className="gf-area-sub">{area.subtitle}</span>
                <h3>{area.name}</h3>
                <p>{area.desc}</p>
                <span className="gf-area-link">
                  Ver obras nesta zona <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          .gf-area-head { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: end; margin-bottom: 3.5rem; }
          .gf-areas { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); border-top: 1px solid #E3E1DC; border-bottom: 1px solid #E3E1DC; }
          .gf-area {
            display: flex;
            flex-direction: column;
            padding: 2rem 1.5rem 1.75rem;
            border-left: 1px solid #E3E1DC;
            text-decoration: none;
            transition: background 0.3s ease;
          }
          .gf-area:first-child { border-left: 0; }
          .gf-area:hover { background: #F5F3EE; }
          .gf-area-sub { font-size: 0.625rem; letter-spacing: 0.18em; text-transform: uppercase; color: #8F6E3E; font-weight: 600; }
          .gf-area h3 { font-size: 1.125rem; font-weight: 600; color: #0B1B2E; letter-spacing: -0.02em; line-height: 1.25; margin: 0.875rem 0 0.75rem; }
          .gf-area p { color: #6B7480; font-size: 0.8125rem; line-height: 1.65; flex: 1; margin-bottom: 1.5rem; }
          .gf-area-link { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8125rem; font-weight: 600; color: #0B1B2E; }
          .gf-area-link svg { color: #B8935A; }
          @media (max-width: 1024px) {
            .gf-areas { grid-template-columns: repeat(2, minmax(0, 1fr)); border-bottom: 0; }
            .gf-area { border-bottom: 1px solid #E3E1DC; }
            .gf-area:nth-child(odd) { border-left: 0; }
          }
          @media (max-width: 900px) {
            .gf-area-head { grid-template-columns: 1fr; gap: 1.25rem; margin-bottom: 2.5rem; }
          }
          @media (max-width: 560px) {
            .gf-areas { grid-template-columns: 1fr; }
            .gf-area { border-left: 0; padding: 1.5rem 0; }
          }
        `}</style>
      </section>

      {/* ── 11. FAQ ──────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid #E3E1DC" }}>
        <FaqAccordion />
      </div>

      {/* ── 12. CTA FINAL ────────────────────────────────── */}
      <section className="gf-final">
        <Image
          src={BRAND_IMAGES.closing.src}
          alt={BRAND_IMAGES.closing.alt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 60%" }}
        />
        <div className="gf-final-overlay" />
        <div className="section-container gf-final-inner">
          <p className="section-eyebrow" style={{ color: "#C9A86A" }}>Orçamento Gratuito</p>
          <h2 className="gf-final-title">Pronto para remodelar com preço justo?</h2>
          <p className="gf-final-text">
            Peça um orçamento gratuito hoje. A equipa do Jorge Freitas responde no prazo máximo de 12 horas.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href="#hero-form" id="final-cta-form" className="btn-primary">
              Pedir Orçamento Online
              <ArrowRight size={16} />
            </a>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} id="final-cta-call" className="btn-secondary">
              <Phone size={16} />
              {CONTRACTOR_INFO.phoneDisplay}
            </a>
          </div>
        </div>
        <style>{`
          .gf-final { position: relative; overflow: hidden; background: #070F1A; padding: 9rem 0; }
          .gf-final-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(7, 15, 26, 0.94) 0%, rgba(7, 15, 26, 0.75) 50%, rgba(7, 15, 26, 0.35) 100%); }
          .gf-final-inner { position: relative; z-index: 2; }
          .gf-final-title {
            color: #ffffff;
            font-size: clamp(2.25rem, 5vw, 4.25rem);
            font-weight: 600;
            letter-spacing: -0.045em;
            line-height: 1.02;
            max-width: 760px;
            margin-bottom: 1.5rem;
            text-wrap: balance;
          }
          .gf-final-text { color: rgba(255, 255, 255, 0.72); font-size: 1.0625rem; line-height: 1.7; max-width: 480px; margin-bottom: 2.5rem; }
          @media (max-width: 768px) {
            .gf-final { padding: 5.5rem 0; }
            .gf-final-overlay { background: rgba(7, 15, 26, 0.82); }
            .gf-final .btn-primary, .gf-final .btn-secondary { width: 100%; }
          }
        `}</style>
      </section>
    </>
  );
}
