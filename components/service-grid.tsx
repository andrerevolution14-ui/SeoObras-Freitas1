import "./service-grid.css";
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
            Da casa de banho à moradia completa — uma só equipa, um só responsável.
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


    </section>
  );
}
