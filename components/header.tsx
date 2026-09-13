"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Calculator,
  FileSpreadsheet,
  Ruler,
  CheckSquare,
  Building2,
  MapPin,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const TOOLS_MENU_ITEMS = [
    {
      title: "Calculadora de Orçamento",
      desc: "Simule custos de obras e remodelações em Aveiro em tempo real",
      href: "/orcamento",
      icon: <Calculator size={18} style={{ color: "#fbbf24" }} />,
      badge: "Interativo",
      badgeColor: "#fbbf24",
    },
    {
      title: "Preços Reais de Obras",
      desc: "Casos reais concluídos (ex: WC 20m², Cozinha) com custos por m²",
      href: "/precos-reais",
      icon: <FileSpreadsheet size={18} style={{ color: "#38bdf8" }} />,
      badge: "Económico",
      badgeColor: "#38bdf8",
    },
    {
      title: "Preços Médios por m²",
      desc: "Tabela de referência para construção civil e remodelação em Aveiro",
      href: "/precos-m2",
      icon: <Ruler size={18} style={{ color: "#a78bfa" }} />,
      badge: "Guia 2026",
      badgeColor: "#a78bfa",
    },
    {
      title: "Planificador de Renovação",
      desc: "Checklist passo a passo para renovar WC e Cozinha sem derrapagens",
      href: "/planificador",
      icon: <CheckSquare size={18} style={{ color: "#f472b6" }} />,
      badge: "Checklist",
      badgeColor: "#f472b6",
    },
    {
      title: "Projeto Verdemont",
      desc: "Grande projeto de referência em Aveiro com acabamentos de topo",
      href: "/verdemont",
      icon: <Building2 size={18} style={{ color: "#34d399" }} />,
      badge: "Destaque",
      badgeColor: "#34d399",
    },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: isScrolled ? "rgba(7, 26, 58, 0.98)" : "rgba(7, 26, 58, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {/* Barra de Topo Discreta */}
      <div
        style={{
          background: "#040d1a",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          fontSize: "0.71875rem",
          padding: "0.3rem 0",
        }}
      >
        <div
          className="section-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#94a3b8" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <MapPin size={11} style={{ color: "#fbbf24" }} /> Aveiro &amp; Concelhos Vizinhos
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <ShieldCheck size={11} style={{ color: "#34d399" }} /> Alvará IMPIC Válido · Seguro de Obras
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a
              href="https://wa.me/351912543977?text=Ol%C3%A1%20Jorge%2C%20gostaria%20de%20pedir%20um%20or%C3%A7amento%20para%20uma%20obra%20em%20Aveiro"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "#34d399",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.71875rem",
              }}
            >
              <MessageCircle size={12} />
              WhatsApp Direto
            </a>
          </div>
        </div>
      </div>

      {/* Menu Principal */}
      <div
        className="section-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "66px" }}
      >
        {/* Logótipo Oficial */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
        >
          <img
            src="/logo1s.png"
            alt="Logótipo da Freitas Renovações LDA — Empreiteiro Licenciado em Aveiro"
            style={{
              height: "42px",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
          <div>
            <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "1rem", lineHeight: 1.1 }}>
              Freitas Renovações
            </div>
            <div style={{ color: "#fbbf24", fontSize: "0.625rem", letterSpacing: "0.06em", fontWeight: 700 }}>
              EMPREITEIRO AVEIRO
            </div>
          </div>
        </Link>

        {/* Navegação Desktop */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.25rem" }} className="hidden-mobile">
          <Link href="/servicos" className="nav-link">Serviços</Link>
          <Link href="/projetos" className="nav-link">Projetos</Link>

          {/* Menu Pendente (Dropdown) Ferramentas & Preços */}
          <div
            ref={dropdownRef}
            style={{ position: "relative" }}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: isDropdownOpen ? "rgba(251, 191, 36, 0.12)" : "transparent",
                border: isDropdownOpen ? "1px solid rgba(251, 191, 36, 0.35)" : "1px solid transparent",
                borderRadius: "0.375rem",
                padding: "0.35rem 0.65rem",
                color: isDropdownOpen ? "#fbbf24" : "#e2e8f0",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <span>Ferramentas &amp; Preços</span>
              <ChevronDown
                size={14}
                style={{
                  color: "#fbbf24",
                  transition: "transform 0.25s ease",
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {/* Caixa Pendente Dropdown no PC */}
            {isDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "350px",
                  background: "rgba(7, 26, 58, 0.98)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1.5px solid rgba(251, 191, 36, 0.35)",
                  borderRadius: "0.75rem",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.08)",
                  padding: "0.6rem",
                  zIndex: 100,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                  animation: "dropdownFadeIn 0.2s ease",
                }}
              >
                <div
                  style={{
                    padding: "0.35rem 0.6rem 0.5rem",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#fbbf24",
                  }}
                >
                  Ferramentas &amp; Custos em Aveiro
                </div>

                {TOOLS_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDropdownOpen(false)}
                    className="tools-dropdown-link"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      padding: "0.6rem 0.75rem",
                      borderRadius: "0.5rem",
                      textDecoration: "none",
                      transition: "all 0.15s ease",
                      border: "1px solid transparent",
                    }}
                  >
                    <div
                      style={{
                        padding: "0.4rem",
                        borderRadius: "0.375rem",
                        background: "rgba(255,255,255,0.06)",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                        <span style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.875rem" }}>
                          {item.title}
                        </span>
                        <span
                          style={{
                            fontSize: "0.625rem",
                            padding: "0.1rem 0.4rem",
                            borderRadius: "1rem",
                            background: `${item.badgeColor}20`,
                            color: item.badgeColor,
                            fontWeight: 700,
                            border: `1px solid ${item.badgeColor}40`,
                          }}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <div style={{ color: "#94a3b8", fontSize: "0.71875rem", marginTop: "2px", lineHeight: 1.35 }}>
                        {item.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/areas-atuacao" className="nav-link">Áreas</Link>
          <Link href="/blog" className="nav-link">Blog &amp; Guias</Link>
          <Link href="/sobre" className="nav-link">Sobre Nós</Link>
          <Link href="/orcamento" className="nav-link" style={{ color: "#fbbf24", fontWeight: 800 }}>Orçamento</Link>
        </nav>

        {/* Botão de Chamada CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="hidden-mobile">
          <a
            href={`tel:${CONTRACTOR_INFO.phone}`}
            id="header-cta-phone"
            className="btn-primary"
            style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
          >
            <Phone size={14} />
            <span>{CONTRACTOR_INFO.phoneDisplay}</span>
          </a>
        </div>

        {/* Botão Hambúrguer Mobile */}
        <div style={{ display: "none", alignItems: "center", gap: "0.5rem" }} className="mobile-controls">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#ffffff",
              padding: "0.45rem",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
            aria-label="Abrir Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu Gaveta Mobile */}
      {isMobileMenuOpen && (
        <div
          style={{
            background: "#071a3a",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "1rem 1.25rem 1.75rem",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
          }}
        >
          {/* Seção Ferramentas & Preços em Acordeão */}
          <div style={{ marginBottom: "1rem" }}>
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(251, 191, 36, 0.12)",
                border: "1px solid rgba(251, 191, 36, 0.25)",
                padding: "0.6rem 0.85rem",
                borderRadius: "0.375rem",
                color: "#fbbf24",
                fontWeight: 800,
                fontSize: "0.8125rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                cursor: "pointer",
                marginBottom: "0.5rem",
              }}
            >
              <span>Ferramentas &amp; Preços Aveiro</span>
              <ChevronDown
                size={16}
                style={{
                  transition: "transform 0.2s ease",
                  transform: isMobileDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {isMobileDropdownOpen && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", paddingLeft: "0.25rem" }}>
                {TOOLS_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.55rem 0.75rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "0.375rem",
                      color: "#e2e8f0",
                      textDecoration: "none",
                      fontSize: "0.8125rem",
                    }}
                  >
                    {item.icon}
                    <span style={{ fontWeight: 600 }}>{item.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navegação Geral */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.75rem" }}>
            {[
              { href: "/", label: "Início" },
              { href: "/servicos", label: "Serviços de Obras" },
              { href: "/projetos", label: "Portfólio de Projetos" },
              { href: "/areas-atuacao", label: "Áreas de Atuação em Aveiro" },
              { href: "/blog", label: "Blog & Guias SEO" },
              { href: "/sobre", label: "Sobre Nós" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: "0.4rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.875rem" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ marginTop: "1rem" }}>
            <a
              href={`tel:${CONTRACTOR_INFO.phone}`}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Phone size={16} />
              Ligar: {CONTRACTOR_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
        .tools-dropdown-link:hover {
          background: rgba(251, 191, 36, 0.12) !important;
          border-color: rgba(251, 191, 36, 0.3) !important;
        }
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -6px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </header>
  );
}
