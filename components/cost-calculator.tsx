"use client";

import { useState, useId } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Phone,
  Clock,
  CheckCircle,
  HelpCircle,
  TrendingDown,
  Sparkles,
  Layers,
} from "lucide-react";
import {
  CALCULATOR_SERVICES,
  FINISH_TIERS,
  calculateBudgetEstimate,
} from "@/lib/calculator-data";
import { CONTRACTOR_INFO, PARISHES } from "@/lib/constants";

export function CostCalculator({
  idPrefix = "calc",
  embedded = false,
}: {
  idPrefix?: string;
  embedded?: boolean;
}) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("casa-de-banho");
  const currentService =
    CALCULATOR_SERVICES.find((s) => s.id === selectedServiceId) || CALCULATOR_SERVICES[0];

  const [areaM2, setAreaM2] = useState<number>(currentService.defaultArea);
  const [selectedTierId, setSelectedTierId] = useState<"economica" | "standard" | "premium">("standard");
  const [selectedParish, setSelectedParish] = useState<string>("Esgueira");

  const sliderId = useId();

  // Handle service change and reset to sensible default area
  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const service = CALCULATOR_SERVICES.find((s) => s.id === serviceId);
    if (service) {
      setAreaM2(service.defaultArea);
    }
  };

  const results = calculateBudgetEstimate(selectedServiceId, areaM2, selectedTierId);

  // Pre-filled WhatsApp message
  const whatsappText = encodeURIComponent(
    `Olá Jorge Freitas! Fiz uma estimativa na calculadora do site para:\n• Serviço: ${currentService.name}\n• Área: ${areaM2} m²\n• Gama: ${selectedTierId}\n• Freguesia: ${selectedParish}, Aveiro\n• Estimativa calculada: ${results.minPrice.toLocaleString("pt-PT")}€ – ${results.maxPrice.toLocaleString("pt-PT")}€\n\nGostaria de agendar uma visita gratuita para validar o orçamento.`
  );

  return (
    <section
      id="calculadora-orcamento"
      className={embedded ? "" : "section-padding"}
      style={{
        background: embedded ? "transparent" : "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        position: "relative",
      }}
    >
      <div className="section-container">
        {!embedded && (
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
                fontWeight: 700,
                marginBottom: "0.875rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              <Calculator size={14} style={{ color: "#d97706" }} />
              Simulador Interativo para Aveiro
            </div>
            <h2 className="section-title">
              Calculadora de Orçamento de Obras em Aveiro
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Calcule instantaneamente o custo estimado para a sua remodelação com base nos valores médios reais praticados no concelho de Aveiro. Sem custos ocultos.
            </p>
          </div>
        )}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "1rem",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 10px 40px rgba(7, 26, 58, 0.07)",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
          }}
          className="calculator-main-grid"
        >
          {/* Controls Column */}
          <div style={{ padding: "2rem" }}>
            {/* Step 1: Service Type */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 800,
                  color: "#071a3a",
                  marginBottom: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                1. Tipo de Intervenção
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "0.5rem",
                }}
              >
                {CALCULATOR_SERVICES.map((s) => {
                  const isSelected = s.id === selectedServiceId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      id={`${idPrefix}-svc-${s.id}`}
                      onClick={() => handleServiceChange(s.id)}
                      style={{
                        padding: "0.625rem 0.5rem",
                        borderRadius: "0.5rem",
                        border: isSelected
                          ? "2px solid #0f2d5e"
                          : "1.5px solid #e2e8f0",
                        background: isSelected ? "#071a3a" : "#ffffff",
                        color: isSelected ? "#fbbf24" : "#1e293b",
                        fontWeight: isSelected ? 800 : 600,
                        fontSize: "0.8125rem",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        textAlign: "center",
                      }}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
              <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                {currentService.description}
              </p>
            </div>

            {/* Step 2: Dimensions Slider */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <label
                  htmlFor={sliderId}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 800,
                    color: "#071a3a",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                  }}
                >
                  2. Área / Dimensão
                </label>
                <div
                  style={{
                    background: "rgba(245, 158, 11, 0.12)",
                    color: "#b45309",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "0.375rem",
                    fontWeight: 900,
                    fontSize: "1.0625rem",
                  }}
                >
                  {areaM2} {currentService.areaUnit}
                </div>
              </div>

              <input
                id={sliderId}
                type="range"
                min={currentService.minArea}
                max={currentService.maxArea}
                step={1}
                value={areaM2}
                onChange={(e) => setAreaM2(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#f59e0b",
                  height: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#94a3b8",
                  fontSize: "0.75rem",
                  marginTop: "0.375rem",
                }}
              >
                <span>{currentService.minArea} {currentService.areaUnit}</span>
                <span style={{ color: "#64748b", fontWeight: 600 }}>Exemplo: {currentService.defaultArea} {currentService.areaUnit}</span>
                <span>{currentService.maxArea} {currentService.areaUnit}</span>
              </div>
            </div>

            {/* Step 3: Finish Quality Tier */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 800,
                  color: "#071a3a",
                  marginBottom: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                3. Nível de Acabamentos
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                {FINISH_TIERS.map((tier) => {
                  const isSelected = tier.id === selectedTierId;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      id={`${idPrefix}-tier-${tier.id}`}
                      onClick={() => setSelectedTierId(tier.id)}
                      style={{
                        padding: "0.75rem 0.5rem",
                        borderRadius: "0.5rem",
                        border: isSelected
                          ? "2px solid #0f2d5e"
                          : "1.5px solid #e2e8f0",
                        background: isSelected ? "rgba(15, 45, 94, 0.05)" : "#ffffff",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: 800,
                          color: isSelected ? "#0f2d5e" : "#64748b",
                          textTransform: "uppercase",
                        }}
                      >
                        {tier.badge}
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 800,
                          color: isSelected ? "#071a3a" : "#334155",
                          marginTop: "0.2rem",
                        }}
                      >
                        {tier.name.split("/")[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Parish in Aveiro */}
            <div>
              <label
                htmlFor={`${idPrefix}-parish-select`}
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 800,
                  color: "#071a3a",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                4. Localização em Aveiro
              </label>
              <select
                id={`${idPrefix}-parish-select`}
                value={selectedParish}
                onChange={(e) => setSelectedParish(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  borderRadius: "0.5rem",
                  border: "1.5px solid #cbd5e1",
                  background: "#ffffff",
                  fontSize: "0.875rem",
                  color: "#071a3a",
                  fontWeight: 600,
                }}
              >
                {PARISHES.map((p) => (
                  <option key={p.slug} value={p.name}>
                    {p.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Column */}
          <div
            style={{
              background: "linear-gradient(135deg, #071a3a 0%, #0f2d5e 100%)",
              padding: "2rem",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  background: "rgba(251, 191, 36, 0.15)",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                  color: "#fbbf24",
                  padding: "0.25rem 0.625rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                <Sparkles size={13} />
                Estimativa para {selectedParish}, Aveiro
              </div>

              <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.7)" }}>
                Intervalo de Custo Estimado
              </div>

              <div
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.35rem)",
                  fontWeight: 900,
                  color: "#fbbf24",
                  lineHeight: 1.1,
                  margin: "0.35rem 0 0.875rem",
                }}
              >
                {results.minPrice.toLocaleString("pt-PT")}€{" "}
                <span style={{ fontSize: "1.25rem", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
                  a
                </span>{" "}
                {results.maxPrice.toLocaleString("pt-PT")}€
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                  background: "rgba(255,255,255,0.06)",
                  padding: "0.875rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                    Preço Médio / m²
                  </div>
                  <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "#ffffff" }}>
                    ~{results.pricePerM2}€ / m²
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                    Prazo de Execução
                  </div>
                  <div
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 800,
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <Clock size={15} style={{ color: "#fbbf24" }} />
                    {results.durationDays} dias úteis
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Decomposição Estimada da Obra
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.8125rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>Mão de Obra Especializada:</span>
                    <span style={{ fontWeight: 700 }}>~{results.laborCost.toLocaleString("pt-PT")}€</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>Materiais de Construção:</span>
                    <span style={{ fontWeight: 700 }}>~{results.materialsCost.toLocaleString("pt-PT")}€</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>Demolição, Entulho & Vazadouro:</span>
                    <span style={{ fontWeight: 700 }}>~{results.wasteAndLogisticsCost.toLocaleString("pt-PT")}€</span>
                  </div>
                </div>
              </div>

              {/* Credit Callout Box */}
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 0.875rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "0.875rem" }}>💶</span>
                  <span style={{ color: "#34d399", fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    Financiamento para esta obra
                  </span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.75rem", lineHeight: 1.45, margin: "0 0 0.5rem" }}>
                  Pague em mensalidades com serviço de intermediação de crédito 100% gratuito através de parceiro Banco de Portugal.
                </p>
                <Link
                  href="/credito-obras"
                  style={{
                    color: "#fbbf24",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textDecoration: "underline",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  Saber mais sobre Crédito Obras →
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <a
                href={`https://wa.me/351961455997?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                id={`${idPrefix}-whatsapp-btn`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  background: "#22c55e",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "0.9375rem",
                  padding: "0.875rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 15px rgba(34, 197, 94, 0.35)",
                  marginBottom: "0.625rem",
                  transition: "background 0.2s",
                }}
              >
                <span>Validar Orçamento via WhatsApp</span>
                <ArrowRight size={16} />
              </a>

              <a
                href={`tel:${CONTRACTOR_INFO.phone}`}
                id={`${idPrefix}-call-btn`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <Phone size={15} style={{ color: "#fbbf24" }} />
                <span>Ligar ao Jorge Freitas ({CONTRACTOR_INFO.phoneDisplay})</span>
              </a>

              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.6875rem",
                  marginTop: "0.75rem",
                  textAlign: "center",
                }}
              >
                * Valores meramente indicativos calculados com base em obras médias em Aveiro. O orçamento final é gratuito e entregue após vistoria técnica.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .calculator-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
