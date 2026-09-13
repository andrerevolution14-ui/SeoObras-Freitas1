"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckSquare,
  Square,
  Clock,
  Compass,
  ArrowRight,
  Sparkles,
  Phone,
  Layers,
  ChevronRight,
} from "lucide-react";
import { RENOVATION_PLANNER_DATA, RenovationStepItem } from "@/lib/projects-data";
import { CONTRACTOR_INFO } from "@/lib/constants";

export function RenovationPlanner() {
  const [activeCategory, setActiveCategory] = useState<string>("casa-de-banho");
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const plannerData = RENOVATION_PLANNER_DATA[activeCategory] || RENOVATION_PLANNER_DATA["casa-de-banho"];

  const toggleStep = (stepNumber: number) => {
    const key = `${activeCategory}-${stepNumber}`;
    setCompletedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const completedCount = plannerData.steps.filter(
    (s) => completedSteps[`${activeCategory}-${s.number}`]
  ).length;

  const progressPercent = Math.round((completedCount / plannerData.steps.length) * 100);

  return (
    <section
      id="planificador-renovacao"
      className="section-padding"
      style={{ background: "#ffffff", position: "relative" }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(15, 45, 94, 0.08)",
              border: "1px solid rgba(15, 45, 94, 0.15)",
              color: "#0f2d5e",
              borderRadius: "2rem",
              padding: "0.35rem 1rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              marginBottom: "0.875rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <Compass size={14} style={{ color: "#d97706" }} />
            Guia Prático Passo a Passo
          </div>
          <h2 className="section-title">
            Planificador Interativo: Passos Essenciais para a sua Obra em Aveiro
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Seja para renovar a casa de banho, remodelar a cozinha ou reabilitar o apartamento todo: siga cada passo, marque as etapas concluídas e garanta uma obra sem falhas nem custos imprevistos.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "casa-de-banho", label: "🚿 Quero Renovar Casa de Banho" },
            { id: "cozinha", label: "🍳 Quero Renovar Cozinha" },
            { id: "remodelacao-total", label: "🏠 Remodelação Total de Imóvel" },
          ].map((tab) => {
            const isSelected = tab.id === activeCategory;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: "0.75rem 1.25rem",
                  borderRadius: "0.5rem",
                  border: isSelected ? "2px solid #0f2d5e" : "1.5px solid #e2e8f0",
                  background: isSelected ? "#071a3a" : "#f8fafc",
                  color: isSelected ? "#fbbf24" : "#334155",
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isSelected ? "0 4px 15px rgba(7, 26, 58, 0.15)" : "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Progress Bar Card */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: "0.75rem",
            padding: "1.25rem 1.75rem",
            border: "1.5px solid #e2e8f0",
            marginBottom: "2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <div style={{ fontWeight: 800, color: "#071a3a", fontSize: "1rem" }}>
              {plannerData.title}
            </div>
            <div style={{ color: "#64748b", fontSize: "0.8125rem", marginTop: "0.15rem" }}>
              {completedCount} de {plannerData.steps.length} etapas assinaladas
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: "220px", flex: 1, maxWidth: "360px" }}>
            <div style={{ flex: 1, height: "10px", background: "#e2e8f0", borderRadius: "5px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #f59e0b, #22c55e)",
                  borderRadius: "5px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <span style={{ fontWeight: 800, color: "#0f2d5e", fontSize: "0.875rem", minWidth: "40px" }}>
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Steps List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {plannerData.steps.map((step) => {
            const isCompleted = !!completedSteps[`${activeCategory}-${step.number}`];
            return (
              <div
                key={step.number}
                style={{
                  background: isCompleted ? "#f0fdf4" : "#ffffff",
                  border: isCompleted ? "1.5px solid #86efac" : "1.5px solid #e2e8f0",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  transition: "all 0.2s ease",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: "1.25rem",
                  alignItems: "start",
                }}
                className="planner-step-card"
              >
                {/* Step Number & Checkbox Button */}
                <button
                  type="button"
                  onClick={() => toggleStep(step.number)}
                  aria-label={`Marcar passo ${step.number} como concluído`}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: isCompleted ? "#22c55e" : "#071a3a",
                      color: isCompleted ? "#ffffff" : "#fbbf24",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1rem",
                      flexShrink: 0,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    {step.number}
                  </div>
                  {isCompleted ? (
                    <CheckSquare size={24} style={{ color: "#22c55e" }} />
                  ) : (
                    <Square size={24} style={{ color: "#cbd5e1" }} />
                  )}
                </button>

                {/* Step Details */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
                    <h3
                      style={{
                        fontWeight: 800,
                        fontSize: "1.0625rem",
                        color: isCompleted ? "#166534" : "#071a3a",
                        textDecoration: isCompleted ? "line-through" : "none",
                      }}
                    >
                      {step.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        background: "rgba(15, 45, 94, 0.08)",
                        color: "#0f2d5e",
                        fontWeight: 700,
                        padding: "0.2rem 0.5rem",
                        borderRadius: "0.25rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <Clock size={11} />
                      {step.estimatedDuration}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#d97706", marginBottom: "0.5rem" }}>
                    {step.subtitle}
                  </div>

                  <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                    {step.description}
                  </p>

                  <div
                    style={{
                      background: "rgba(245, 158, 11, 0.08)",
                      borderLeft: "3px solid #f59e0b",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0 0.375rem 0.375rem 0",
                      fontSize: "0.8125rem",
                      color: "#92400e",
                      lineHeight: 1.5,
                    }}
                  >
                    <strong>Dica Aveiro:</strong> {step.tipsAveiro}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div style={{ alignSelf: "center" }}>
                  <a
                    href={`https://wa.me/351961455997?text=${encodeURIComponent(
                      `Olá Jorge Freitas! Estou a planear uma ${plannerData.title} e preciso de ajuda especificamente no passo: ${step.number}. ${step.title}. Poderia dar-me um orçamento?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      background: isCompleted ? "#22c55e" : "#071a3a",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      padding: "0.5rem 0.875rem",
                      borderRadius: "0.375rem",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span>Pedir apoio</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div
          style={{
            marginTop: "2.5rem",
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
            borderRadius: "0.75rem",
            padding: "2rem",
            textAlign: "center",
            color: "#071a3a",
          }}
        >
          <h3 style={{ fontSize: "1.375rem", fontWeight: 900, marginBottom: "0.5rem" }}>
            Quer que a Freitas Renovações execute o plano por si em Aveiro?
          </h3>
          <p style={{ maxWidth: "520px", margin: "0 auto 1.5rem", fontSize: "0.9375rem", fontWeight: 600, color: "rgba(7, 26, 58, 0.85)" }}>
            Poupa tempo, garante materiais ao melhor preço com desconto profissional e tem a supervisão direta do Empreiteiro Jorge Freitas.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/#calculadora-orcamento"
              className="btn-primary"
              style={{ background: "#071a3a", color: "#ffffff", boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}
            >
              Calcular Custo da Minha Obra
              <ArrowRight size={16} />
            </Link>
            <a
              href={`tel:${CONTRACTOR_INFO.phone}`}
              className="btn-secondary"
              style={{ background: "rgba(7, 26, 58, 0.12)", color: "#071a3a", border: "2px solid rgba(7, 26, 58, 0.25)" }}
            >
              <Phone size={16} />
              Ligar {CONTRACTOR_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .planner-step-card {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
