import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { CONTRACTOR_INFO, SERVICES } from "@/lib/constants";
import { BrandLogo } from "@/components/brand-logo";

// Google Business Profile — CID oficial: 0xc11699bc26385889 (13914443692994943113)
const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47652.34!2d-8.7662379!3d40.679534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6cc6ccf60f817c6f%3A0xc11699bc26385889!2sFreitas+Renova%C3%A7%C3%B5es!5e0!3m2!1spt-PT!2spt!4v1725096000000!5m2!1spt-PT!2spt";
const GOOGLE_MAPS_LINK = "https://maps.google.com/?cid=13914443692994943113";

const GUIDE_LINKS = [
  { href: "/clientes", label: "Clientes & Obras Reais (Aveiro)" },
  { href: "/orcamento", label: "Calculadora de Orçamento" },
  { href: "/credito-obras", label: "Crédito para Obras (100% Grátis)" },
  { href: "/precos-reais", label: "Preços Reais de Obras" },
  { href: "/precos-m2", label: "Tabela Preços Médios por m²" },
  { href: "/planificador", label: "Planificador Passo a Passo" },
  { href: "/verdemont", label: "Projeto Verdemont (Destaque)" },
  { href: "/projetos", label: "Portfólio de Projetos" },
  { href: "/blog/quanto-custa-remodelar-casa-em-aveiro", label: "Quanto Custa Remodelar?" },
  { href: "/blog/como-poupar-dinheiro-em-renovacoes-aveiro", label: "Como Poupar em Obras" },
  { href: "/blog/melhores-ideias-renovacao-low-cost-aveiro", label: "Ideias Low-Cost Aveiro" },
  { href: "/blog", label: "Blog & Todos os Guias" },
  { href: "/sobre", label: "Sobre Nós" },
];

const AREA_LINKS = [
  { href: "/areas-atuacao/gloria-e-vera-cruz", label: "Aveiro Centro" },
  { href: "/areas-atuacao/esgueira", label: "Esgueira" },
  { href: "/areas-atuacao/aradas", label: "Aradas" },
  { href: "/areas-atuacao/sao-bernardo", label: "São Bernardo" },
  { href: "/areas-atuacao/cacia", label: "Cácia" },
  { href: "/areas-atuacao/ilhavo", label: "Ílhavo & Gafanhas" },
  { href: "/areas-atuacao/agueda", label: "Águeda" },
  { href: "/areas-atuacao/estarreja", label: "Estarreja" },
  { href: "/areas-atuacao/vagos", label: "Vagos" },
  { href: "/areas-atuacao/praia-da-barra-costa-nova", label: "Praia da Barra & Costa Nova" },
  { href: "/areas-atuacao", label: "Ver Todas as 17 Áreas" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer gf-footer tex-dark">
      <div className="section-container">
        {/* Bloco de abertura */}
        <div className="gf-foot-hero">
          <div>
            <BrandLogo tone="light" size="lg" />
            <p className="gf-foot-claim font-display">
              Obras, remodelações e reabilitação em Aveiro — com alvará, garantia escrita e o empreiteiro presente em cada obra.
            </p>
          </div>
          <div className="gf-foot-contact">
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="gf-foot-phone font-display">
              {CONTRACTOR_INFO.phoneDisplay}
            </a>
            <span className="gf-foot-small">Chamada para a rede móvel nacional · {CONTRACTOR_INFO.phone}</span>
            <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <Link href="/orcamento" className="btn-primary">
                Pedir Orçamento <ArrowRight size={16} />
              </Link>
              <a href={CONTRACTOR_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Colunas */}
        <div className="gf-foot-cols">
          <div>
            <h4 className="gf-foot-h">Contactos</h4>
            <ul className="gf-foot-list">
              <li><a href={`tel:${CONTRACTOR_INFO.phone}`} className="footer-link">{CONTRACTOR_INFO.phoneDisplay} ({CONTRACTOR_INFO.phone})</a></li>
              <li><a href={CONTRACTOR_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer-link">WhatsApp: {CONTRACTOR_INFO.phoneDisplay}</a></li>
              <li><a href={`mailto:${CONTRACTOR_INFO.email}`} className="footer-link">{CONTRACTOR_INFO.email}</a></li>
              <li className="footer-link" style={{ lineHeight: 1.6 }}>
                {CONTRACTOR_INFO.address.street}<br />
                {CONTRACTOR_INFO.address.postalCode} Aveiro, Portugal
              </li>
            </ul>
            <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer" className="gf-foot-rating">
              <Star size={13} fill="#ffffff" stroke="#ffffff" />
              {CONTRACTOR_INFO.googleRating} no Google Business
              <ArrowUpRight size={12} />
            </a>
            <div className="gf-foot-map">
              <iframe
                title="Freitas Renovações — Google Business Profile Aveiro"
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <h4 className="gf-foot-h">Serviços em Aveiro</h4>
            <ul className="gf-foot-list">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={`/servicos/${service.slug}`} className="footer-link">
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="gf-foot-h">Informações &amp; Guias</h4>
            <ul className="gf-foot-list">
              {GUIDE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">{link.label}</Link>
                </li>
              ))}
              <li>
                <a href="http://www.verdemont.eu" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: "#ffffff" }}>
                  Projeto Verdemont (www.verdemont.eu) ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="gf-foot-h">Áreas de Atuação</h4>
            <ul className="gf-foot-list">
              {AREA_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Credenciais legais */}
        <div className="gf-foot-legal">
          <div>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.8)" }}>
              © {currentYear} {CONTRACTOR_INFO.companyName} · {CONTRACTOR_INFO.alvaraNumber} · NIPC {CONTRACTOR_INFO.nif}
            </p>
            <p style={{ margin: "0.35rem 0 0", color: "rgba(255,255,255,0.4)" }}>
              {CONTRACTOR_INFO.address.street}, {CONTRACTOR_INFO.address.postalCode} Aveiro (GPS: {CONTRACTOR_INFO.geo.latitude}, {CONTRACTOR_INFO.geo.longitude}) · {CONTRACTOR_INFO.insurancePolicy}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacidade" className="footer-link">Privacidade &amp; RGPD</Link>
            <Link href="/termos" className="footer-link">Termos e Condições</Link>
          </div>
        </div>
      </div>

      <style>{`
        .gf-footer { padding-top: 5.5rem; }
        .gf-foot-hero {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 4rem;
          padding-bottom: 4.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .gf-foot-claim {
          margin-top: 2.25rem;
          color: #ffffff;
          font-size: clamp(1.5rem, 2.5vw, 2.125rem);
          line-height: 1.25;
          letter-spacing: -0.03em;
          font-weight: 500;
          max-width: 620px;
        }
        .gf-foot-contact { display: flex; flex-direction: column; justify-content: flex-end; }
        .gf-foot-phone {
          color: #ffffff;
          text-decoration: none;
          font-size: clamp(2.25rem, 4vw, 3.5rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          transition: color 0.2s;
        }
        .gf-foot-phone:hover { color: #B5B5B5; }
        .gf-foot-small { margin-top: 0.75rem; font-size: 0.75rem; color: rgba(255, 255, 255, 0.4); }
        .gf-foot-cols {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1.2fr 1fr;
          gap: 3rem;
          padding: 4rem 0;
        }
        .gf-foot-h {
          color: #8C8C8C;
          font-size: 0.6875rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 1.5rem;
          font-family: var(--font-inter), sans-serif;
        }
        .gf-foot-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.7rem; }
        .gf-foot-rating {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: 1.5rem;
          color: #ffffff;
          font-size: 0.8125rem;
          font-weight: 500;
          text-decoration: none;
          padding: 0.55rem 0.875rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .gf-foot-map { margin-top: 1rem; height: 150px; border: 1px solid rgba(255, 255, 255, 0.1); background: #171717; }
        .gf-foot-legal {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: space-between;
          align-items: center;
          padding: 1.75rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.75rem;
        }
        @media (max-width: 1024px) {
          .gf-foot-cols { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 768px) {
          .gf-footer { padding-top: 3.5rem; }
          .gf-foot-hero { grid-template-columns: 1fr; gap: 2.5rem; padding-bottom: 3rem; }
          .gf-foot-cols { grid-template-columns: 1fr 1fr; gap: 2.5rem 1.5rem; padding: 3rem 0; }
          .gf-foot-cols > div:first-child { grid-column: span 2; }
        }
      `}</style>
    </footer>
  );
}
