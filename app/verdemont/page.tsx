import type { Metadata } from "next";
import Link from "next/link";
import { VerdemontShowcase } from "@/components/verdemont-showcase";
import { ExternalLink, ArrowRight, Phone, ShieldCheck, Building2, MapPin } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";
import { VERDEMONT_PROJECT } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Projeto Verdemont Aveiro — Empreendimento Residencial | Freitas Renovações",
  description:
    "Conheça o grande projeto Verdemont em Aveiro. Fachadas de alta eficiência, varandas com iluminação noturna e reabilitação de referência pela Freitas Renovações LDA.",
  alternates: { canonical: "/verdemont" },
};

export default function VerdemontPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #051329, #0a2347)", padding: "7.5rem 0 3.5rem" }}>
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <Link href="/projetos" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Projetos</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>Projeto Verdemont</span>
          </nav>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(251, 191, 36, 0.15)",
              border: "1px solid rgba(251, 191, 36, 0.4)",
              color: "#fbbf24",
              borderRadius: "2rem",
              padding: "0.35rem 1rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <Building2 size={14} />
            Grande Projeto em Destaque
          </div>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 900, color: "#ffffff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Projeto Verdemont — Reabilitação &amp; Construção de Referência
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", maxWidth: "660px", lineHeight: 1.65 }}>
            O empreendimento Verdemont exemplifica a capacidade técnica e o padrão de excelência da Freitas Renovações LDA em Aveiro, integrando acabamentos de vanguarda, isolamento térmico e iluminação arquitetural.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
            <a
              href={VERDEMONT_PROJECT.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}
            >
              <ExternalLink size={16} />
              Visitar Website Oficial (verdemont.eu)
            </a>
            <Link href="/orcamento" className="btn-secondary" style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem", color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              Pedir Proposta para Obra Similar
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Showcase Component com a imagem enviada */}
      <VerdemontShowcase />

      {/* CTA Final */}
      <section style={{ background: "#071a3a", padding: "4rem 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="section-container" style={{ textAlign: "center", maxWidth: "680px" }}>
          <ShieldCheck size={36} style={{ color: "#fbbf24", margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.75rem" }}>
            Planeia uma intervenção de grande dimensão em Aveiro?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem", marginBottom: "1.75rem", lineHeight: 1.6 }}>
            Dispomos de capacidade técnica, alvará de construção e equipas completas para reabilitações integrais de edifícios e moradias.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary">
              <Phone size={16} />
              Contactar Jorge Freitas ({CONTRACTOR_INFO.phoneDisplay})
            </a>
            <Link href="/projetos" className="btn-secondary" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              Ver Outros Projetos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
