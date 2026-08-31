"use client";

import { ShieldCheck, Star, User, CheckCircle, Clock, FileText } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck size={20} />,
  Star: <Star size={20} />,
  User: <User size={20} />,
  CheckCircle: <CheckCircle size={20} />,
  Clock: <Clock size={20} />,
  FileText: <FileText size={20} />,
};

const badges = [
  { icon: "ShieldCheck", label: "Alvará de Construção Válido", sublabel: "Empresa Licenciada" },
  { icon: "Star", label: `${CONTRACTOR_INFO.googleRating}/5 no Google`, sublabel: `+${CONTRACTOR_INFO.reviewCount} Avaliações Reais` },
  { icon: "User", label: CONTRACTOR_INFO.contractorName, sublabel: "Supervisão Direta" },
  { icon: "CheckCircle", label: `+${CONTRACTOR_INFO.projectsCompleted} Obras Concluídas`, sublabel: "Em Aveiro e Arredores" },
  { icon: "Clock", label: "Resposta até 12h", sublabel: "Atendimento Rápido" },
  { icon: "FileText", label: "Preços Justos", sublabel: "Orçamento Transparente" },
];

export function TrustBar() {
  return (
    <div
      className="trust-bar"
      style={{
        background: "#071a3a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "0.875rem 0",
        overflow: "hidden",
      }}
    >
      <div className="section-container" style={{ display: "flex", justifyContent: "center" }}>
        {/* Centered & Animated Marquee container */}
        <div className="trust-marquee" style={{ alignItems: "center", justifyContent: "center" }}>
          {[...badges, ...badges, ...badges].map((badge, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.625rem",
                padding: "0.375rem 1.75rem",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: "#fbbf24", display: "flex", alignItems: "center" }}>
                {iconMap[badge.icon]}
              </span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.8125rem", lineHeight: 1.2 }}>
                  {badge.label}
                </div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.6875rem" }}>
                  {badge.sublabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
