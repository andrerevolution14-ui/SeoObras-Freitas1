import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Home,
  Droplets,
  Zap,
  CloudRain,
  Paintbrush,
  Layers,
  Bath,
  UtensilsCrossed,
  Building,
  Sparkles,
  Hammer,
  Grid,
  AppWindow,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";

const iconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Home,
  Droplets,
  Zap,
  CloudRain,
  Paintbrush,
  Layers,
  Bath,
  UtensilsCrossed,
  Building,
  Sparkles,
  Hammer,
  Grid,
  AppWindow,
};

export function ServiceGrid() {
  return (
    <section className="section-padding" style={{ background: "#F4F4F2" }} id="servicos">
      <div className="section-container">
        <div className="gf-svc-head" data-reveal>
          <div>
            <p className="section-eyebrow">Empresa Licenciada IMPIC</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Obras &amp; Remodelações em Aveiro e Concelhos Vizinhos
            </h2>
          </div>
          <p className="section-subtitle">
            Especialistas em remodelações gerais chave na mão, casas de banho, cozinhas, apartamentos, moradias, capoto e reabilitação de casas velhas com preços justos.
          </p>
        </div>

        <div className="gf-svc-grid">
          {SERVICES.map((service, i) => {
            const Icon = iconComponents[service.icon];
            return (
              <Link
                key={service.slug}
                href={`/servicos/${service.slug}`}
                className="gf-svc"
                id={`service-card-${service.slug}`}
                data-reveal
                style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
              >
                <div className="gf-svc-top">
                  <span className="gf-svc-num font-display">{String(i + 1).padStart(2, "0")}</span>
                  <span className="gf-svc-icon">{Icon && <Icon size={22} strokeWidth={1.5} />}</span>
                </div>
                <h3 className="gf-svc-title">{service.title}</h3>
                <p className="gf-svc-desc">{service.description}</p>
                <ul className="gf-svc-feats">
                  {service.features.slice(0, 3).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <span className="gf-svc-link">
                  {service.emergencyAvailable ? "Atendimento rápido · Ver serviço" : "Ver detalhes do serviço"}
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            );
          })}
          <div className="gf-svc gf-svc-cta on-dark tex-dark">
            <p className="gf-svc-cta-title font-display">Precisa de uma avaliação ou orçamento personalizado?</p>
            <Link href="/#hero-form" className="btn-primary">
              Pedir Orçamento Grátis
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .gf-svc-head {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: end;
          margin-bottom: 4rem;
        }
        .gf-svc-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          background: #DCDCDA;
          border: 1px solid #DCDCDA;
        }
        .gf-svc {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #F4F4F2;
          padding: 2.25rem 2rem 2rem;
          text-decoration: none;
          color: inherit;
          transition: background 0.35s ease;
        }
        .gf-svc::before {
          content: "";
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          height: 2px;
          background: #0A0A0A;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gf-svc:hover { background: #ffffff; }
        .gf-svc:hover::before { transform: scaleX(1); }
        .gf-svc-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
        .gf-svc-num { font-size: 0.8125rem; color: #8A8A8A; font-weight: 500; letter-spacing: 0.04em; }
        .gf-svc-icon { color: #0A0A0A; }
        .gf-svc-title {
          font-size: 1.3125rem;
          font-weight: 600;
          color: #0A0A0A;
          letter-spacing: -0.025em;
          line-height: 1.2;
          margin-bottom: 0.875rem;
        }
        .gf-svc-desc { color: #5C5C5C; font-size: 0.875rem; line-height: 1.7; margin-bottom: 1.25rem; }
        .gf-svc-feats { list-style: none; padding: 0; margin: 0 0 1.75rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .gf-svc-feats li {
          position: relative;
          padding-left: 1.25rem;
          font-size: 0.8125rem;
          color: #3A3A3A;
          line-height: 1.45;
        }
        .gf-svc-feats li::before { content: ""; position: absolute; left: 0; top: 0.6em; width: 8px; height: 1px; background: #6B6B6B; }
        .gf-svc-link {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #0A0A0A;
        }
        .gf-svc-link svg { color: #0A0A0A; transition: transform 0.3s ease; }
        .gf-svc:hover .gf-svc-link svg { transform: translate(2px, -2px); }
        .gf-svc-cta {
          background: #0A0A0A;
          justify-content: space-between;
          gap: 2rem;
        }
        .gf-svc-cta:hover { background: #0A0A0A; }
        .gf-svc-cta { grid-column: span 1; }
        .gf-svc-cta::before { display: none; }
        .gf-svc-cta-title { color: #ffffff; font-size: 1.5rem; font-weight: 500; letter-spacing: -0.025em; line-height: 1.25; }
        @media (max-width: 1024px) {
          .gf-svc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .gf-svc-cta { grid-column: span 2; flex-direction: row; align-items: center; }
        }
        @media (max-width: 900px) {
          .gf-svc-head { grid-template-columns: 1fr; gap: 1.25rem; margin-bottom: 2.5rem; }
        }
        @media (max-width: 640px) {
          .gf-svc-grid { grid-template-columns: 1fr; }
          .gf-svc-cta { grid-column: span 1; flex-direction: column; align-items: flex-start; }
          .gf-svc { padding: 1.25rem 0; background: transparent; display: grid; grid-template-columns: 2.25rem 1fr auto; align-items: center; column-gap: 0.5rem; }
          .gf-svc:hover { background: transparent; }
          .gf-svc-grid { background: transparent; border: 0; border-top: 1px solid #DCDCDA; gap: 0; }
          .gf-svc:not(.gf-svc-cta) { border-bottom: 1px solid #DCDCDA; }
          .gf-svc-top { display: contents; }
          .gf-svc-num { grid-column: 1; grid-row: 1; }
          .gf-svc-icon { display: none; }
          .gf-svc-title { grid-column: 2; grid-row: 1; font-size: 1.0625rem; margin: 0; }
          .gf-svc-desc, .gf-svc-feats { display: none; }
          .gf-svc-link { grid-column: 3; grid-row: 1; margin: 0; font-size: 0; gap: 0; }
          .gf-svc-link svg { width: 18px; height: 18px; }
          .gf-svc-cta { display: flex; margin-top: 1.5rem; padding: 1.75rem 1.25rem; background: #0A0A0A !important; }
          .gf-svc-cta-title { font-size: 1.25rem; }
        }
      `}</style>
    </section>
  );
}
