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
import { ServiceMarquee } from "@/components/service-marquee";
import { Build3D } from "@/components/build-3d";
import { BeforeAfterScroll } from "@/components/before-after-scroll";
import { FeaturedQuote } from "@/components/featured-quote";
import { CONTRACTOR_INFO, FAQ_ITEMS } from "@/lib/constants";
import { BRAND_IMAGES } from "@/lib/brand-images";
import { HeroVideo } from "@/components/hero-video";
import { GoogleG } from "@/components/google-g";

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
  { title: "Licenciada e segurada", desc: "Alvará IMPIC 104523 · Seguro RC ativo" },
  { title: "Garantia escrita", desc: "Entregue no fim de cada obra" },
  { title: "Um só responsável", desc: "Do orçamento à entrega da chave" },
  { title: "Orçamento fechado", desc: "Discriminado linha a linha" },
];

const COMPANY_FACTS = [
  { k: "Denominação social", v: CONTRACTOR_INFO.companyName },
  { k: "NIPC", v: CONTRACTOR_INFO.nif },
  { k: "Alvará de construção", v: CONTRACTOR_INFO.alvaraNumber.replace("Alvará ", "") },
  { k: "Seguro", v: "Responsabilidade Civil · Fidelidade · 150.000 €" },
  { k: "Direção técnica", v: `${CONTRACTOR_INFO.contractorName}, ${CONTRACTOR_INFO.jobTitle}` },
  { k: "Sede", v: `${CONTRACTOR_INFO.address.postalCode} Aveiro, Portugal` },
  { k: "Área de atuação", v: "Concelho de Aveiro e concelhos limítrofes" },
  { k: "Horário", v: "Seg–Sex 08:00–18:00 · Sáb 09:00–13:00" },
];

const COMMITMENTS = [
  "Orçamento discriminado e a preço fechado antes de qualquer início de obra.",
  "Prazos definidos em contrato, com cronograma partilhado com o cliente.",
  "Proteção de áreas comuns e cumprimento dos horários de ruído do condomínio.",
  "Materiais certificados e especialidades coordenadas por um só interlocutor.",
  "Limpeza final, vistoria conjunta e garantia entregue por escrito.",
];


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
      <section className="hero-section gf-hero">
        <HeroVideo
          src={BRAND_IMAGES.heroVideo.src}
          srcMobile={BRAND_IMAGES.heroVideo.srcMobile}
          poster={BRAND_IMAGES.heroVideo.poster}
          posterMobile={BRAND_IMAGES.heroVideo.posterMobile}
          label={BRAND_IMAGES.heroVideo.alt}
        />
        <div className="hero-grid-pattern" />

        <div className="section-container gf-hero-wrap">
          <div className="gf-hero-grid">
            <div className="gf-hero-text hero-enter">
              <div className="hero-section-label">Empresa Licenciada · Alvará IMPIC</div>

              <h1 className="gf-hero-title font-serif">
                Obras e remodelações <em style={{ whiteSpace: "nowrap" }}>em Aveiro.</em>
              </h1>

              <p className="gf-hero-lead">
                Chave na mão, com orçamento fechado, prazo em contrato e garantia escrita.
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

              <a href="#reviews" className="gf-gbadge" aria-label={`${CONTRACTOR_INFO.googleRating} em 5 no Google, ${CONTRACTOR_INFO.reviewCount} avaliações`}>
                <GoogleG />
                <span className="gf-gbadge-score font-display">{CONTRACTOR_INFO.googleRating}</span>
                <span className="gf-gbadge-mid">
                  <span className="gf-gbadge-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={13} fill="#FBBC04" stroke="#FBBC04" />
                    ))}
                  </span>
                  <span className="gf-gbadge-count">{CONTRACTOR_INFO.reviewCount} avaliações no Google</span>
                </span>
                <span className="gf-gbadge-faces" aria-hidden="true">
                  {["M", "A", "C", "P"].map((l) => (
                    <i key={l}>{l}</i>
                  ))}
                </span>
              </a>
            </div>

            <div className="gf-hero-form">
              <HeroMultiStepForm />
            </div>
          </div>
        </div>

        <a href="#obra-3d" className="gf-scroll-cue" aria-label="Descer para ver mais">
          <span />
        </a>

        <style>{`
          .gf-hero { min-height: 100svh; }
          .gf-hero-title, .gf-hero-lead, .gf-hero .hero-section-label { text-shadow: 0 2px 22px rgba(0, 0, 0, 0.55); }
          .gf-hero-wrap { width: 100%; position: relative; z-index: 2; }
          .gf-hero-media { position: absolute; inset: 0; z-index: 0; overflow: hidden; background: #0A0A0A; }
          .gf-hero-poster, .gf-hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
          .gf-hero-video { opacity: 0; transition: opacity 1.2s ease; }
          .gf-hero-video.is-ready { opacity: 1; }
          .gf-hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 480px);
            gap: clamp(3rem, 6vw, 6rem);
            align-items: center;
            padding: 2.5rem 0 5.5rem;
          }
          .gf-hero-title {
            color: #ffffff;
            font-size: clamp(2.6rem, 5.2vw, 4.9rem);
            font-weight: 400;
            line-height: 1.02;
            letter-spacing: -0.025em;
            margin-bottom: 1.5rem;
            text-wrap: balance;
          }
          .gf-hero-title em { font-style: italic; color: #E7CFA9; }
          .gf-hero-lead {
            color: rgba(255, 255, 255, 0.82);
            font-size: 1.1875rem;
            line-height: 1.55;
            max-width: 480px;
            margin-bottom: 2.25rem;
          }
          .gf-hero-ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2.25rem; }
          .gf-gbadge {
            display: inline-flex;
            align-items: center;
            gap: 0.875rem;
            padding: 0.8rem 1.1rem 0.8rem 0.9rem;
            background: rgba(255, 255, 255, 0.96);
            color: #0A0A0A;
            text-decoration: none;
            box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.6);
            transition: transform 0.3s var(--ease-out);
          }
          .gf-gbadge:hover { transform: translateY(-2px); }
          .gf-gbadge-score { font-size: 1.875rem; font-weight: 600; letter-spacing: -0.04em; line-height: 1; }
          .gf-gbadge-mid { display: flex; flex-direction: column; gap: 0.2rem; }
          .gf-gbadge-stars { display: flex; gap: 1px; }
          .gf-gbadge-count { font-size: 0.75rem; color: #3A3A3A; font-weight: 500; white-space: nowrap; }
          .gf-gbadge-faces { display: flex; padding-left: 0.875rem; border-left: 1px solid #E5E5E3; }
          .gf-gbadge-faces i {
            font-style: normal;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0A0A0A;
            color: #fff;
            font-size: 0.6875rem;
            font-weight: 600;
            border: 2px solid #fff;
            margin-left: -8px;
          }
          .gf-gbadge-faces i:first-child { margin-left: 0; }
          .gf-gbadge-faces i:nth-child(2) { background: #3A3A3A; }
          .gf-gbadge-faces i:nth-child(3) { background: #6B6B6B; }
          .gf-gbadge-faces i:nth-child(4) { background: #262626; }
          .gf-scroll-cue {
            position: absolute;
            left: 50%;
            bottom: 1.5rem;
            transform: translateX(-50%);
            z-index: 3;
            width: 26px;
            height: 42px;
            border: 1.5px solid rgba(255, 255, 255, 0.5);
            border-radius: 14px;
          }
          .gf-scroll-cue span {
            position: absolute;
            left: 50%;
            top: 8px;
            width: 3px;
            height: 8px;
            margin-left: -1.5px;
            border-radius: 2px;
            background: #fff;
            animation: cue 1.8s ease-in-out infinite;
          }
          @keyframes cue { 0% { transform: translateY(0); opacity: 1; } 70% { transform: translateY(14px); opacity: 0; } 100% { opacity: 0; } }
          @media (max-width: 1024px) {
            .gf-hero-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 430px); gap: 2.5rem; }
          }
          @media (max-width: 860px) {
            .gf-hero-grid { grid-template-columns: 1fr; gap: 1.5rem; padding: 0.5rem 0 2.5rem; justify-items: center; }
            .gf-hero-text { text-align: center; display: flex; flex-direction: column; align-items: center; width: 100%; }
            .gf-hero-title { font-size: clamp(2.2rem, 9.6vw, 3rem); margin-bottom: 0.875rem; }
            .gf-hero-lead { font-size: 0.9375rem; margin: 0 auto 1.25rem; max-width: 330px; color: rgba(255,255,255,0.85); }
            .gf-hero-ctas { display: none; }
            .gf-hero-form { width: 100%; max-width: 480px; }
            .gf-gbadge { gap: 0.6rem; padding: 0.6rem 0.8rem 0.6rem 0.7rem; }
            .gf-gbadge-score { font-size: 1.5rem; }
            .gf-gbadge-faces { display: none; }
            .hero-section-label { margin-bottom: 1rem; font-size: 0.625rem; justify-content: center; }
            .hero-section-label::before { display: none; }
            .gf-scroll-cue { display: none; }
          }
        `}</style>
      </section>

      {/* ── 7. AVALIAÇÕES GOOGLE ─────────────────────────── */}
      <GoogleReviews />

      {/* ── OBRA EM 3D (scroll) ─────────────────────────── */}
      <Build3D />

      {/* ── 2. CREDENCIAIS ───────────────────────────────── */}
      <TrustBar />

      {/* ── 3. PROJETOS REALIZADOS ───────────────────────── */}
      <RealProjectsGallery />

      <ServiceMarquee />

      {/* ── ANTES / DEPOIS (scroll) ─────────────────────── */}
      <BeforeAfterScroll />

      {/* ── 4. SERVIÇOS ──────────────────────────────────── */}
      <ServiceGrid />

      {/* ── TESTEMUNHO EM DESTAQUE ──────────────────────── */}
      <FeaturedQuote />

      {/* ── 5. QUEM SOMOS — JORGE FREITAS (E-E-A-T) ─────── */}
      <section className="section-padding gf-about on-dark tex-dark" style={{ background: "#0A0A0A" }}>
        <div className="section-container">
          <div className="gf-about-grid">
            <div className="gf-about-photo photo-slot" data-reveal="image">
              <Image
                src={BRAND_IMAGES.team.src}
                alt={BRAND_IMAGES.team.alt}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                quality={85}
                style={{ objectFit: "cover", objectPosition: "center 40%" }}
              />
              <div className="gf-about-caption">
                <span className="font-display">Cada detalhe, à mão</span>
                <span>Direção técnica · {CONTRACTOR_INFO.contractorName}</span>
              </div>
            </div>

            <div>
              <p className="section-eyebrow" style={{ color: "#8C8C8C" }}>Quem Somos</p>
              <h2 className="section-title" style={{ color: "#ffffff" }}>
                Supervisão Direta pelo <span className="text-metal">Empreiteiro Jorge Freitas</span>
              </h2>
              <p className="gf-about-lead">
                Quem orçamenta é quem responde pela obra — do primeiro levantamento à entrega da chave.
              </p>

              <div className="gf-pillars">
                {PILLARS.map((p, i) => (
                  <div key={p.title} className="gf-pillar" data-reveal style={{ ["--d" as string]: `${i * 90}ms` }}>
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
          .gf-about-photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 60%, rgba(10, 10, 10, 0.85)); }
          .gf-about-caption { position: absolute; left: 1.75rem; bottom: 1.5rem; z-index: 2; display: flex; flex-direction: column; gap: 0.3rem; }
          .gf-about-caption span:first-child { color: #ffffff; font-size: 1.375rem; font-weight: 500; letter-spacing: -0.02em; }
          .gf-about-caption span:last-child { color: rgba(255,255,255,0.6); font-size: 0.6875rem; letter-spacing: 0.2em; text-transform: uppercase; }
          .gf-about-lead { color: rgba(255, 255, 255, 0.7); font-size: 1.0625rem; line-height: 1.75; margin-bottom: 3rem; max-width: 560px; }
          .gf-pillars { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 3rem; border-top: 1px solid rgba(255, 255, 255, 0.1); }
          .gf-pillar { padding: 1.75rem 1.75rem 1.75rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
          .gf-pillar:nth-child(even) { padding-left: 1.75rem; padding-right: 0; border-left: 1px solid rgba(255, 255, 255, 0.1); }
          .gf-pillar-num { color: #8C8C8C; font-size: 0.75rem; letter-spacing: 0.06em; }
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

      {/* ── 5b. A EMPRESA EM DETALHE (credibilidade institucional) ── */}
      <section className="section-padding" style={{ background: "#F4F4F2" }}>
        <div className="section-container">
          <div className="gf-inst">
            <div>
              <p className="section-eyebrow">A Empresa em Detalhe</p>
              <h2 className="section-title">Transparência começa nos dados da empresa.</h2>
              <p className="section-subtitle" style={{ marginBottom: "2.5rem" }}>
                Dados oficiais, públicos e verificáveis.
              </p>
              <dl className="gf-facts">
                {COMPANY_FACTS.map((f) => (
                  <div key={f.k} className="gf-fact" data-reveal="fade">
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="gf-commit on-dark tex-dark" data-reveal>
              <p className="gf-commit-kicker">Os nossos compromissos</p>
              <h3 className="gf-commit-title font-display">Tudo o que prometemos fica escrito.</h3>
              <ol className="gf-commit-list">
                {COMMITMENTS.map((c, i) => (
                  <li key={c}>
                    <span className="font-display">{String(i + 1).padStart(2, "0")}</span>
                    <p>{c}</p>
                  </li>
                ))}
              </ol>
              <a href="#hero-form" className="btn-primary" style={{ width: "100%" }}>
                Pedir Orçamento Discriminado
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
        <style>{`
          .gf-inst { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 5rem; align-items: start; }
          .gf-facts { margin: 0; border-top: 1px solid #0A0A0A; }
          .gf-fact { display: grid; grid-template-columns: 200px 1fr; gap: 1.5rem; padding: 1.05rem 0; border-bottom: 1px solid #DCDCDA; }
          .gf-fact dt { font-size: 0.6875rem; letter-spacing: 0.16em; text-transform: uppercase; color: #6B6B6B; font-weight: 600; padding-top: 0.2rem; }
          .gf-fact dd { margin: 0; color: #0A0A0A; font-size: 0.9375rem; font-weight: 500; }
          .gf-commit { background: #0A0A0A; color: #ffffff; padding: 3rem 2.5rem; position: sticky; top: 100px; }
          .gf-commit-kicker { font-size: 0.6875rem; letter-spacing: 0.22em; text-transform: uppercase; color: #8C8C8C; font-weight: 600; margin-bottom: 1rem; }
          .gf-commit-title { font-size: 1.875rem; line-height: 1.15; letter-spacing: -0.035em; font-weight: 500; margin-bottom: 2rem; }
          .gf-commit-list { list-style: none; padding: 0; margin: 0 0 2.5rem; }
          .gf-commit-list li { display: grid; grid-template-columns: 2.25rem 1fr; gap: 0.5rem; padding: 1rem 0; border-top: 1px solid rgba(255,255,255,0.12); }
          .gf-commit-list span { color: #8C8C8C; font-size: 0.8125rem; padding-top: 0.15rem; }
          .gf-commit-list p { color: rgba(255,255,255,0.85); font-size: 0.9375rem; line-height: 1.55; }
          @media (max-width: 960px) {
            .gf-inst { grid-template-columns: 1fr; gap: 3rem; }
            .gf-commit { position: static; padding: 2.25rem 1.5rem; }
          }
          @media (max-width: 560px) {
            .gf-fact { grid-template-columns: 1fr; gap: 0.3rem; }
          }
        `}</style>
      </section>

      {/* ── 8. CRÉDITO & FINANCIAMENTO ───────────────────── */}
      <section className="gf-credit on-dark tex-dark">
        <div className="gf-credit-photo photo-slot" data-reveal="image">
          <Image
            src={BRAND_IMAGES.credit.src}
            alt={BRAND_IMAGES.credit.alt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="gf-credit-body">
          <p className="section-eyebrow" style={{ color: "#8C8C8C" }}>Crédito para Obras · Serviço Gratuito</p>
          <h2 className="section-title" style={{ color: "#ffffff" }}>
            Financiamento para a sua obra, <span className="text-metal">sem custos de intermediação.</span>
          </h2>
          <p className="gf-credit-text">
            Parceiro <strong>autorizado pelo Banco de Portugal</strong> compara mais de 10 bancos por si. Gratuito e sem compromisso.
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
          .gf-credit { display: grid; grid-template-columns: 1fr 1fr; background: #171717; }
          .gf-credit-photo { min-height: 560px; }
          .gf-credit-body { padding: 6rem clamp(1.5rem, 6vw, 6rem); max-width: 760px; }
          .gf-credit-text { color: rgba(255, 255, 255, 0.72); font-size: 1rem; line-height: 1.75; margin-bottom: 2rem; }
          .gf-credit-text strong { color: #ffffff; font-weight: 600; }
          .gf-credit-list { list-style: none; padding: 0; margin: 0 0 2.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem 2rem; }
          .gf-credit-list li { position: relative; padding-left: 1.5rem; color: rgba(255, 255, 255, 0.88); font-size: 0.875rem; line-height: 1.5; }
          .gf-credit-list li::before { content: ""; position: absolute; left: 0; top: 0.5em; width: 10px; height: 5px; border-left: 1.5px solid #ffffff; border-bottom: 1.5px solid #ffffff; transform: rotate(-45deg); }
          @media (max-width: 900px) {
            .gf-credit { grid-template-columns: 1fr; }
            .gf-credit-photo { min-height: 280px; }
            .gf-credit-body { padding: 4rem 1.25rem; }
            .gf-credit-list { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>

      {/* ── 9. PREÇOS DE REFERÊNCIA + RESPOSTAS (AEO) ────── */}
      <section className="section-padding" style={{ background: "#F4F4F2" }}>
        <div className="section-container">
          <div className="gf-price-head" data-reveal>
            <div>
              <p className="section-eyebrow">Preços e Condições Transparentes</p>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Quanto Custa Remodelar em Aveiro? Tabela de Preços
              </h2>
            </div>
            <p className="section-subtitle">
              Valores médios de referência em Aveiro. O seu orçamento é sempre discriminado e fechado.
            </p>
          </div>

          <div className="gf-table-wrap" data-reveal>
            <table className="gf-table">
              <thead>
                <tr>
                  <th>Divisão / Tipologia de Obra</th>
                  <th>Preço Médio Estimado</th>
                  <th>Prazo Médio</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_ROWS.map((row) => (
                  <tr key={row.name}>
                    <td className="gf-td-name">{row.name}</td>
                    <td className="gf-td-price">{row.price}</td>
                    <td className="gf-td-time">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
        <style>{`
          .gf-price-head { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: end; margin-bottom: 3.5rem; }
          .gf-table-wrap { overflow-x: auto; background: #ffffff; border: 1px solid #E5E5E3; margin-bottom: 4.5rem; }
          .gf-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem; min-width: 760px; }
          .gf-table th {
            padding: 1.125rem 1.5rem;
            font-size: 0.6875rem;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            font-weight: 600;
            color: #ffffff;
            background: #0A0A0A;
          }
          .gf-table td { padding: 1.375rem 1.5rem; border-top: 1px solid #EDEDEB; vertical-align: top; }
          .gf-table tbody tr { transition: background 0.2s ease; }
          .gf-table tbody tr:hover { background: #F8F8F7; }
          .gf-td-name { font-weight: 600; color: #0A0A0A; }
          .gf-td-price { color: #0A0A0A; font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
          .gf-td-time { color: #5C5C5C; white-space: nowrap; }
          .gf-td-desc { color: #6B6B6B; font-size: 0.85rem; line-height: 1.6; }
          .gf-aeo { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3rem; }
          .gf-aeo-item { border-top: 1px solid #0A0A0A; padding-top: 1.75rem; }
          .gf-aeo-kicker { font-size: 0.6875rem; letter-spacing: 0.18em; text-transform: uppercase; color: #525252; font-weight: 600; margin-bottom: 1rem; }
          .gf-aeo-item h3 { font-size: 1.25rem; font-weight: 600; color: #0A0A0A; line-height: 1.3; letter-spacing: -0.02em; margin-bottom: 1rem; }
          .gf-aeo-text { color: #5C5C5C; font-size: 0.9rem; line-height: 1.75; }
          .gf-aeo-text strong { color: #0A0A0A; font-weight: 600; }
          @media (max-width: 760px) {
            .gf-table-wrap { background: transparent; border: 0; overflow: visible; }
            .gf-table { min-width: 0; }
            .gf-table thead { display: none; }
            .gf-table, .gf-table tbody, .gf-table tr, .gf-table td { display: block; width: 100%; }
            .gf-table tr { background: #ffffff; border: 1px solid #E5E5E3; padding: 1.25rem; margin-bottom: 0.625rem; }
            .gf-table td { padding: 0; border: 0; }
            .gf-td-name { font-size: 1rem; margin-bottom: 0.625rem; }
            .gf-td-price { white-space: normal; color: #525252; }
            .gf-td-time { font-size: 0.8125rem; margin: 0.25rem 0 0.75rem; }
            .gf-td-time::before { content: "Prazo médio: "; color: #6B6B6B; }
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
          <div className="gf-area-head" data-reveal>
            <div>
              <p className="section-eyebrow">Expansão Regional</p>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Obras &amp; Remodelações nos Concelhos Limítrofes a Aveiro
              </h2>
            </div>
            <p className="section-subtitle">
              Sede em Aveiro. Obras em todo o concelho e nos municípios vizinhos.
            </p>
          </div>
          <div className="gf-region photo-slot" data-reveal="image">
            <Image
              src={BRAND_IMAGES.region.src}
              alt={BRAND_IMAGES.region.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 55%" }}
            />
            <div className="gf-region-caption">
              <span className="font-display">Aveiro</span>
              <span>Sede · Glória e Vera Cruz · Esgueira · Aradas · São Bernardo · Cácia</span>
            </div>
          </div>
          <div className="gf-areas">
            {NEIGHBOR_AREAS.map((area, i) => (
              <Link key={area.slug} href={`/areas-atuacao/${area.slug}`} className="gf-area" data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                <span className="gf-area-sub">{area.subtitle}</span>
                <h3>{area.name}</h3>
                <span className="gf-area-link">
                  Ver obras nesta zona <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          .gf-area-head { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: end; margin-bottom: 3.5rem; }
          .gf-region { aspect-ratio: 21 / 7; margin-bottom: 0; }
          .gf-region::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0) 55%); }
          .gf-region-caption { position: absolute; left: 2.5rem; bottom: 2rem; z-index: 2; display: flex; flex-direction: column; gap: 0.4rem; }
          .gf-region-caption span:first-child { color: #ffffff; font-size: clamp(2rem, 4vw, 3.25rem); font-weight: 500; letter-spacing: -0.04em; line-height: 1; }
          .gf-region-caption span:last-child { color: rgba(255,255,255,0.75); font-size: 0.8125rem; }
          @media (max-width: 640px) { .gf-region { aspect-ratio: 4 / 3; } .gf-region-caption { left: 1.25rem; bottom: 1.25rem; right: 1.25rem; } }
          .gf-areas { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); border-top: 1px solid #E5E5E3; border-bottom: 1px solid #E5E5E3; }
          .gf-area {
            display: flex;
            flex-direction: column;
            padding: 2rem 1.5rem 1.75rem;
            border-left: 1px solid #E5E5E3;
            text-decoration: none;
            transition: background 0.3s ease;
          }
          .gf-area:first-child { border-left: 0; }
          .gf-area:hover { background: #F4F4F2; }
          .gf-area-sub { font-size: 0.625rem; letter-spacing: 0.18em; text-transform: uppercase; color: #525252; font-weight: 600; }
          .gf-area h3 { font-size: 1.125rem; font-weight: 600; color: #0A0A0A; letter-spacing: -0.02em; line-height: 1.25; margin: 0.875rem 0 0.75rem; }
          .gf-area p { color: #6B6B6B; font-size: 0.8125rem; line-height: 1.65; flex: 1; margin-bottom: 1.5rem; }
          .gf-area-link { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8125rem; font-weight: 600; color: #0A0A0A; }
          .gf-area-link svg { color: #6B6B6B; }
          @media (max-width: 1024px) {
            .gf-areas { grid-template-columns: repeat(2, minmax(0, 1fr)); border-bottom: 0; }
            .gf-area { border-bottom: 1px solid #E5E5E3; }
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
      <div style={{ borderTop: "1px solid #E5E5E3" }}>
        <FaqAccordion />
      </div>

      {/* ── 12. CTA FINAL ────────────────────────────────── */}
      <section className="gf-final on-dark tex-dark">
        <Image
          src={BRAND_IMAGES.closing.src}
          alt={BRAND_IMAGES.closing.alt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 55%" }}
        />
        <div className="gf-final-overlay" />
        <div className="section-container gf-final-inner">
          <p className="section-eyebrow" style={{ color: "#8C8C8C" }}>Orçamento Gratuito e Sem Compromisso</p>
          <h2 className="gf-final-title" data-reveal>Fale connosco <span className="text-metal">sobre a sua obra.</span></h2>
          <p className="gf-final-text">
            Fotos e medidas aproximadas bastam. Resposta em até 12 horas.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href="#hero-form" id="final-cta-form" className="btn-primary">
              Pedir Orçamento
              <ArrowRight size={16} />
            </a>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} id="final-cta-call" className="btn-secondary">
              <Phone size={16} />
              {CONTRACTOR_INFO.phoneDisplay}
            </a>
          </div>
        </div>
        <style>{`
          .gf-final { position: relative; overflow: hidden; background: #050505; padding: 9rem 0; }
          .gf-final-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(5, 5, 5, 0.88) 0%, rgba(5, 5, 5, 0.5) 45%, rgba(5, 5, 5, 0.05) 100%); }
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
            .gf-final-overlay { background: linear-gradient(180deg, rgba(5,5,5,0.55), rgba(5,5,5,0.85)); }
            .gf-final .btn-primary, .gf-final .btn-secondary { width: 100%; }
          }
        `}</style>
      </section>
    </>
  );
}
