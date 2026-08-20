"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface BeforeAfterProject {
  id: string;
  title: string;
  service: string;
  parish: string;
  beforeLabel: string;
  afterLabel: string;
  beforeBg: string;
  afterBg: string;
}

const PROJECTS: BeforeAfterProject[] = [
  {
    id: "p1",
    title: "Remodelação Completa de Casa de Banho",
    service: "Remodelação Geral",
    parish: "Esgueira, Aveiro",
    beforeLabel: "ANTES",
    afterLabel: "DEPOIS",
    beforeBg: "linear-gradient(135deg, #7c6f64 0%, #5c5247 100%)",
    afterBg: "linear-gradient(135deg, #e8f4f8 0%, #c8e6f0 100%)",
  },
  {
    id: "p2",
    title: "Impermeabilização de Terraço",
    service: "Infiltrações & Telhados",
    parish: "Aradas, Aveiro",
    beforeLabel: "ANTES",
    afterLabel: "DEPOIS",
    beforeBg: "linear-gradient(135deg, #8b7355 0%, #6b5a42 100%)",
    afterBg: "linear-gradient(135deg, #f0f4f0 0%, #d4e8d4 100%)",
  },
  {
    id: "p3",
    title: "Aplicação de Capoto em Fachada",
    service: "Pintura & Capoto",
    parish: "Glória e Vera Cruz, Aveiro",
    beforeLabel: "ANTES",
    afterLabel: "DEPOIS",
    beforeBg: "linear-gradient(135deg, #9e9086 0%, #7d706a 100%)",
    afterBg: "linear-gradient(135deg, #fefce8 0%, #fde68a 100%)",
  },
];

function SliderCard({ project }: { project: BeforeAfterProject }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPos(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) updatePosition(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) updatePosition(e.touches[0].clientX);
    };
    const stop = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", stop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stop);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "0.5rem",
        overflow: "hidden",
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* Before/After Visual */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: "240px",
          cursor: "col-resize",
          userSelect: "none",
          overflow: "hidden",
          touchAction: "none",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* After */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: project.afterBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", opacity: 0.7 }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.25rem" }}>✨</div>
            <p style={{ fontSize: "0.8125rem", color: "#0f172a", fontWeight: 700 }}>Depois da Remodelação</p>
          </div>
          <div
            style={{
              position: "absolute",
              right: "0.75rem",
              top: "0.75rem",
              background: "rgba(34, 197, 94, 0.95)",
              color: "#ffffff",
              fontSize: "0.6875rem",
              fontWeight: 800,
              padding: "0.2rem 0.625rem",
              borderRadius: "0.25rem",
            }}
          >
            {project.afterLabel}
          </div>
        </div>

        {/* Before */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            background: project.beforeBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", opacity: 0.8 }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.25rem" }}>🏗️</div>
            <p style={{ fontSize: "0.8125rem", color: "#ffffff", fontWeight: 700 }}>Antes da Obra</p>
          </div>
          <div
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "0.75rem",
              background: "rgba(239, 68, 68, 0.95)",
              color: "#ffffff",
              fontSize: "0.6875rem",
              fontWeight: 800,
              padding: "0.2rem 0.625rem",
              borderRadius: "0.25rem",
            }}
          >
            {project.beforeLabel}
          </div>
        </div>

        {/* Handle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${sliderPos}%`,
            transform: "translateX(-50%)",
            width: "3px",
            background: "#ffffff",
            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            zIndex: 5,
          }}
        >
          <div className="before-after-handle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
            </svg>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0.625rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(15, 23, 42, 0.75)",
            color: "#ffffff",
            fontSize: "0.65rem",
            fontWeight: 600,
            padding: "0.2rem 0.625rem",
            borderRadius: "0.25rem",
            whiteSpace: "nowrap",
            backdropFilter: "blur(4px)",
          }}
        >
          ← Arraste para comparar →
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "1rem 1.25rem" }}>
        <p style={{ fontSize: "0.75rem", color: "#ca8a04", fontWeight: 700, marginBottom: "0.25rem" }}>
          {project.service}
        </p>
        <h3 style={{ fontWeight: 800, fontSize: "0.9375rem", color: "#0f172a", marginBottom: "0.25rem" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.8125rem", color: "#64748b", display: "flex", alignItems: "center", gap: "0.25rem" }}>
          📍 {project.parish}
        </p>
      </div>
    </div>
  );
}

export function BeforeAfterSlider() {
  return (
    <section className="section-padding" style={{ background: "#ffffff" }}>
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p className="section-eyebrow">Projetos Reais</p>
          <h2 className="section-title">
            Antes & Depois — Transformações em Aveiro
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Deslize o controlo para ver o resultado do nosso trabalho. Orçamentos transparentes e preços justos em todas as obras.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {PROJECTS.map((project) => (
            <SliderCard key={project.id} project={project} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a href="/projetos" className="btn-primary" style={{ display: "inline-flex" }}>
            Ver Todos os Projetos
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
