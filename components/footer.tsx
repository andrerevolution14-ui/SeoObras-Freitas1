import "./footer.css";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { CONTRACTOR_INFO, SERVICES } from "@/lib/constants";
import { BrandLogo } from "@/components/brand-logo";
import { SocialLinks } from "@/components/social-links";

// Google Business Profile — CID oficial: 0xc11699bc26385889 (13914443692994943113)
const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47652.34!2d-8.7662379!3d40.679534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6cc6ccf60f817c6f%3A0xc11699bc26385889!2sFreitas+Renova%C3%A7%C3%B5es!5e0!3m2!1spt-PT!2spt!4v1725096000000!5m2!1spt-PT!2spt";
const GOOGLE_MAPS_LINK = "https://maps.google.com/?cid=13914443692994943113";

const GUIDE_LINKS = [
  { href: "/capa", label: "A Empresa" },
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
              <Link href="/#hero-form" className="btn-primary">
                Pedir Orçamento <ArrowRight size={16} />
              </Link>
              <a href={CONTRACTOR_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp
              </a>
            </div>
            <p className="gf-foot-small" style={{ marginTop: "1.5rem" }}>Acompanhe as nossas obras</p>
            <div style={{ marginTop: "0.6rem" }}>
              <SocialLinks withLabels />
            </div>
          </div>
        </div>

        {/* Colunas */}
        <div className="gf-foot-cols">
          <div>
            <h2 className="gf-foot-h">Contactos</h2>
            <ul className="gf-foot-list">
              <li><a href={`tel:${CONTRACTOR_INFO.phone}`} className="footer-link">{CONTRACTOR_INFO.phoneDisplay} ({CONTRACTOR_INFO.phone})</a></li>
              <li><a href={CONTRACTOR_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer-link">WhatsApp: {CONTRACTOR_INFO.phoneDisplay}</a></li>
              <li><a href={CONTRACTOR_INFO.socialLinks.instagram} target="_blank" rel="noopener noreferrer me" className="footer-link">Instagram: {CONTRACTOR_INFO.socialLinks.instagramHandle}</a></li>
              <li><a href={CONTRACTOR_INFO.socialLinks.facebook} target="_blank" rel="noopener noreferrer me" className="footer-link">Facebook: Freitas Renovações</a></li>
              <li><a href={`mailto:${CONTRACTOR_INFO.email}`} className="footer-link">{CONTRACTOR_INFO.email}</a></li>
              <li className="footer-link" style={{ lineHeight: 1.6 }}>
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
            <h2 className="gf-foot-h">Serviços em Aveiro</h2>
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
            <h2 className="gf-foot-h">Informações &amp; Guias</h2>
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
            <h2 className="gf-foot-h">Áreas de Atuação</h2>
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
              © {currentYear} {CONTRACTOR_INFO.legalName} — {CONTRACTOR_INFO.companyName} · {CONTRACTOR_INFO.alvaraNumber} · NIPC {CONTRACTOR_INFO.nif}
            </p>
            <p style={{ margin: "0.35rem 0 0", color: "rgba(255,255,255,0.4)" }}>
              {CONTRACTOR_INFO.address.postalCode} Aveiro, Portugal · {CONTRACTOR_INFO.insurancePolicy}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacidade" className="footer-link">Privacidade &amp; RGPD</Link>
            <Link href="/termos" className="footer-link">Termos e Condições</Link>
          </div>
        </div>
      </div>


    </footer>
  );
}
