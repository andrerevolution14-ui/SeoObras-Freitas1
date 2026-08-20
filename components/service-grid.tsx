"use client";

import Link from "next/link";
import { ArrowRight, Home, Droplets, Zap, CloudRain, Paintbrush, Layers } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const iconComponents: Record<string, React.ComponentType<{ size?: number }>> = {
  Home,
  Droplets,
  Zap,
  CloudRain,
  Paintbrush,
  Layers,
};

export function ServiceGrid() {
  return (
    <section className="section-padding" style={{ background: "#f8fafc" }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p className="section-eyebrow">O Que Fazemos</p>
          <h2 className="section-title">
            Serviços de Obras & Reparações em Aveiro
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Desde reparações a obras completas de remodelação, a equipa do Jorge Freitas oferece soluções com preços justos e qualidade garantida.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {SERVICES.map((service) => {
            const Icon = iconComponents[service.icon];
            return (
              <Link
                key={service.slug}
                href={`/servicos/${service.slug}`}
                className="service-card"
                id={`service-card-${service.slug}`}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.875rem" }}>
                  <div className="icon-wrapper icon-wrapper-navy">
                    {Icon && <Icon size={22} />}
                  </div>
                  {service.emergencyAvailable && (
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        background: "rgba(239, 68, 68, 0.08)",
                        color: "#dc2626",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "0.25rem",
                        fontWeight: 700,
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                      }}
                    >
                      🔴 Atendimento Rápido
                    </span>
                  )}
                </div>

                <h3 style={{ fontWeight: 800, fontSize: "1.0625rem", color: "#0f172a", marginBottom: "0.375rem" }}>
                  {service.title}
                </h3>
                <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {service.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1rem" }}>
                  {service.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      style={{
                        fontSize: "0.6875rem",
                        background: "#f1f5f9",
                        color: "#334155",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "0.25rem",
                        fontWeight: 600,
                      }}
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "#ca8a04", fontWeight: 700, fontSize: "0.875rem" }}>
                  <span>Ver detalhes do serviço</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ color: "#64748b", marginBottom: "0.875rem", fontSize: "0.9375rem" }}>
            Precisa de uma avaliação ou orçamento personalizado?
          </p>
          <Link href="/#hero-form" className="btn-primary" style={{ display: "inline-flex" }}>
            Pedir Orçamento Grátis e Transparente
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
