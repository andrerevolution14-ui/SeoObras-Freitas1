"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  Euro,
  CheckCircle,
  ArrowRight,
  Filter,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { PAST_DETAILED_PROJECTS, PastDetailedProject } from "@/lib/projects-data";
import { CONTRACTOR_INFO } from "@/lib/constants";

export function PastProjectsPricing() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("proj-wc-20m2-aveiro");

  const categories = [
    { id: "all", label: "Todas as Obras" },
    { id: "casa-de-banho", label: "Casas de Banho" },
    { id: "cozinha", label: "Cozinhas" },
    { id: "remodelacao-total", label: "Remodelações Totais" },
    { id: "capoto", label: "Capoto & Fachadas" },
    { id: "telhado", label: "Telhados" },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? PAST_DETAILED_PROJECTS
      : PAST_DETAILED_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="obras-passadas-precos-reais"
      className="section-padding"
      style={{ background: "#ffffff" }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
              color: "#b45309",
              borderRadius: "2rem",
              padding: "0.35rem 1rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              marginBottom: "0.875rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <Euro size={14} />
            Transparência Total & Preços Reais
          </div>
          <h2 className="section-title">
            Obras Realizadas em Aveiro e Preços Reais para Comparar
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Compare o seu espaço com obras similares já executadas pela equipa do Jorge Freitas (ex: casa de banho de 20m², remodelação T2, capoto). Conheça os custos reais discriminados, áreas e prazos de conclusão.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          {categories.map((cat) => {
            const isSelected = cat.id === selectedCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "2rem",
                  border: isSelected ? "2px solid #0f2d5e" : "1.5px solid #e2e8f0",
                  background: isSelected ? "#071a3a" : "#f8fafc",
                  color: isSelected ? "#fbbf24" : "#475569",
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {filteredProjects.map((project) => {
            const isExpanded = expandedProjectId === project.id;
            return (
              <div
                key={project.id}
                className="card-hover"
                style={{
                  background: "#ffffff",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  border: "1.5px solid #e2e8f0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.25s ease",
                }}
              >
                {/* Image Container with Real SEO Alt Text */}
                <div
                  style={{
                    position: "relative",
                    height: "230px",
                    width: "100%",
                    overflow: "hidden",
                    background: "#071a3a",
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.altText}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {/* Badge: Category */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      background: "rgba(7, 26, 58, 0.9)",
                      color: "#fbbf24",
                      fontSize: "0.6875rem",
                      fontWeight: 800,
                      padding: "0.25rem 0.625rem",
                      borderRadius: "0.25rem",
                      border: "1px solid rgba(251, 191, 36, 0.3)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {project.categoryLabel}
                  </div>

                  {/* Badge: Real Price */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      background: "#22c55e",
                      color: "#ffffff",
                      fontSize: "0.8125rem",
                      fontWeight: 900,
                      padding: "0.3rem 0.75rem",
                      borderRadius: "0.375rem",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                    }}
                  >
                    Custo Real: {project.realPrice.toLocaleString("pt-PT")}€
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      left: "0.75rem",
                      right: "0.75rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "rgba(7, 26, 58, 0.85)",
                      backdropFilter: "blur(6px)",
                      padding: "0.4rem 0.75rem",
                      borderRadius: "0.375rem",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Maximize2 size={12} style={{ color: "#fbbf24" }} />
                      Área: {project.areaM2} m² ({Math.round(project.pricePerM2)}€/m²)
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Clock size={12} style={{ color: "#22c55e" }} />
                      Duração: {project.durationDays} dias
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3
                      style={{
                        fontWeight: 800,
                        fontSize: "1.125rem",
                        color: "#071a3a",
                        marginBottom: "0.4rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {project.title}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#64748b",
                        fontSize: "0.8125rem",
                        marginBottom: "0.875rem",
                      }}
                    >
                      <MapPin size={13} style={{ color: "#f59e0b" }} />
                      <span>{project.parish}</span>
                      <span>•</span>
                      <Calendar size={13} style={{ color: "#64748b" }} />
                      <span>Ano {project.year}</span>
                    </div>

                    <p
                      style={{
                        color: "#475569",
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        marginBottom: "1rem",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Scope list toggle */}
                    <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "0.875rem", marginBottom: "1rem" }}>
                      <button
                        type="button"
                        onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#0f2d5e",
                          fontSize: "0.8125rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          padding: 0,
                        }}
                      >
                        <span>{isExpanded ? "Ocultar detalhes da obra" : "Ver o que incluiu este valor (escopo)"}</span>
                        <ArrowRight size={13} style={{ transform: isExpanded ? "rotate(-90deg)" : "rotate(90deg)", transition: "transform 0.2s" }} />
                      </button>

                      {isExpanded && (
                        <div style={{ marginTop: "0.875rem" }}>
                          <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#071a3a", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                            Trabalhos Executados nesta Obra:
                          </div>
                          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                            {project.includedScope.map((item, idx) => (
                              <li
                                key={idx}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "0.375rem",
                                  color: "#334155",
                                  fontSize: "0.8rem",
                                  lineHeight: 1.45,
                                }}
                              >
                                <CheckCircle size={13} style={{ color: "#22c55e", flexShrink: 0, marginTop: "2px" }} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action CTA */}
                  <div
                    style={{
                      borderTop: "1px solid #f1f5f9",
                      paddingTop: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                        Preço Unitário
                      </div>
                      <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#071a3a" }}>
                        ~{Math.round(project.pricePerM2)}€ / m²
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/351961455997?text=${encodeURIComponent(
                        `Olá Jorge Freitas! Vi a obra "${project.title}" em ${project.parish} (${project.realPrice}€) no vosso site. Tenho um espaço semelhante e gostaria de saber o valor para o meu caso.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        background: "#071a3a",
                        color: "#fbbf24",
                        fontSize: "0.8125rem",
                        fontWeight: 800,
                        padding: "0.55rem 1rem",
                        borderRadius: "0.375rem",
                        textDecoration: "none",
                        transition: "background 0.2s",
                      }}
                    >
                      <span>Quero obra similar</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Comparison Banner */}
        <div
          style={{
            marginTop: "3rem",
            background: "linear-gradient(135deg, #071a3a 0%, #0f2d5e 100%)",
            borderRadius: "0.75rem",
            padding: "2rem",
            color: "#ffffff",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          <div>
            <div style={{ color: "#fbbf24", fontWeight: 800, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.35rem" }}>
              Tem uma casa com dimensões parecidas em Aveiro?
            </div>
            <h3 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.35rem" }}>
              Peça uma avaliação sem compromisso para o seu espaço exato
            </h3>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", maxWidth: "560px" }}>
              O Jorge Freitas visita o seu imóvel em Aveiro, mede a área real, analisa tubagens e apresenta um orçamento fechado ao cêntimo em menos de 12 horas.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href="/orcamento"
              className="btn-primary"
              style={{ fontSize: "0.875rem" }}
            >
              Simular na Calculadora
              <ArrowRight size={15} />
            </Link>
            <a
              href={`tel:${CONTRACTOR_INFO.phone}`}
              className="btn-secondary"
              style={{ fontSize: "0.875rem", background: "rgba(255,255,255,0.1)" }}
            >
              Ligar {CONTRACTOR_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
