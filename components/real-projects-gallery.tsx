"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, CheckCircle } from "lucide-react";
import { REAL_PROJECTS } from "@/lib/constants";

export function RealProjectsGallery() {
  return (
    <section className="section-padding" id="projetos-realizados" style={{ background: "#ffffff" }}>
      <div className="section-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p className="section-eyebrow">Trabalhos Concluídos</p>
          <h2 className="section-title">
            Projetos Realizados em Aveiro (2022–2026)
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Conheça alguns dos trabalhos efetuados pela equipa do Jorge Freitas com preços justos, transparência e elevada qualidade técnica.
          </p>
        </div>

        {/* 2x2 Grid for 4 Real Projects */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {REAL_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="card-hover"
              style={{
                background: "#ffffff",
                borderRadius: "0.5rem",
                overflow: "hidden",
                border: "1.5px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Project Image */}
              <div style={{ position: "relative", height: "230px", width: "100%", overflow: "hidden", background: "#022c22" }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                />

                {/* Service Tag */}
                <div
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    left: "0.75rem",
                    background: "rgba(2, 44, 34, 0.9)",
                    color: "#fbbf24",
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    padding: "0.25rem 0.625rem",
                    borderRadius: "0.25rem",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(251, 191, 36, 0.3)",
                  }}
                >
                  {project.service}
                </div>

                {/* Year Tag */}
                <div
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    background: "rgba(245, 158, 11, 0.95)",
                    color: "#022c22",
                    fontSize: "0.6875rem",
                    fontWeight: 900,
                    padding: "0.25rem 0.625rem",
                    borderRadius: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <Calendar size={12} />
                  {project.year}
                </div>

                {/* Concluído Badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "0.75rem",
                    left: "0.75rem",
                    background: "rgba(34, 197, 94, 0.9)",
                    color: "#ffffff",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.5rem",
                    borderRadius: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <CheckCircle size={12} />
                  Resultado Final
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.0625rem", color: "#022c22", marginBottom: "0.375rem" }}>
                    {project.title}
                  </h3>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "#64748b", fontSize: "0.8125rem", marginBottom: "0.75rem" }}>
                    <MapPin size={13} style={{ color: "#f59e0b" }} />
                    <span>{project.parish}</span>
                  </div>

                  <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    {project.description}
                  </p>
                </div>

                <div style={{ marginTop: "1.25rem", paddingTop: "0.875rem", borderTop: "1px solid #f1f5f9" }}>
                  <Link
                    href="/#hero-form"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      color: "#d97706",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      textDecoration: "none",
                    }}
                  >
                    <span>Pedir orçamento para obra idêntica</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "2.25rem" }}>
          <Link href="/projetos" className="btn-primary" style={{ display: "inline-flex" }}>
            Ver Galeria Completa de Projetos
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
