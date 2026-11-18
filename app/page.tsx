import "./home.css";
import { pageMetadata } from "@/lib/metadata";
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
import { CONTRACTOR_INFO } from "@/lib/constants";
import { BRAND_IMAGES } from "@/lib/brand-images";
import { HeroVideo } from "@/components/hero-video";
import { GoogleG } from "@/components/google-g";

export const metadata = pageMetadata({
 title: "Obras e Remodelações em Aveiro",
 description: "Remodelações de casas, apartamentos, cozinhas e casas de banho em Aveiro. Acompanhamento por Jorge Freitas. Peça um orçamento gratuito.",
 path: "/", image: "/og-image.jpg",
});

// FAQPage is emitted once by FaqAccordion; page schema: HowTo + BreadcrumbList (Organization já declarada em layout.tsx)
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
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
  { title: "Licenciada e segurada", desc: "Alvará 124371-PAR · Seguro RC ativo" },
  { title: "Garantia escrita", desc: "Entregue no fim de cada obra" },
  { title: "Um só responsável", desc: "Do orçamento à entrega da chave" },
  { title: "Orçamento fechado", desc: "Discriminado linha a linha" },
];

const COMPANY_FACTS = [
  { k: "Denominação social", v: CONTRACTOR_INFO.legalName },
  { k: "Marca", v: CONTRACTOR_INFO.companyName },
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

      </section>

      <section className="section-padding" aria-labelledby="conheca-freitas-title" style={{background:"#F4F4F2"}}>
        <div className="section-container" style={{maxWidth:960}}>
          <p className="section-eyebrow">A Empresa</p>
          <h2 id="conheca-freitas-title" className="section-title">Conheça a Freitas</h2>
          <p className="section-subtitle">Da primeira ideia ao último acabamento. Descubra como damos uma nova vida a cozinhas, casas de banho e interiores em Aveiro.</p>
          <Link href="/capa#inicio" className="btn-primary" style={{marginTop:24}}>Conhecer a Freitas <ArrowUpRight size={17}/></Link>
        </div>
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

      </section>
    </>
  );
}
