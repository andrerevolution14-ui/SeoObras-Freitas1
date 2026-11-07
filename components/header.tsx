"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";
import { BrandLogo } from "@/components/brand-logo";

const TOOLS_MENU_ITEMS = [
  {
    title: "Calculadora de Orçamento",
    desc: "Simule custos de obras e remodelações em Aveiro em tempo real.",
    href: "/orcamento",
  },
  {
    title: "Preços Reais & Tabela m²",
    desc: "Casos reais concluídos em Aveiro com custos discriminados.",
    href: "/precos-reais",
  },
  {
    title: "Crédito para Obras",
    desc: "Intermediação parceira 100% gratuita para financiar a sua remodelação.",
    href: "/credito-obras",
  },
];

const NAV_LINKS = [
  { href: "/servicos", label: "Serviços" },
  { href: "/projetos", label: "Projetos" },
  { href: "/clientes", label: "Clientes" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const solid = isScrolled || isMobileMenuOpen;

  return (
    <header className={`gf-header on-dark ${solid ? "is-solid" : ""}`}>
      {/* Barra institucional (desktop) */}
      <div className="gf-topbar hidden-mobile">
        <div className="section-container gf-topbar-inner">
          <div className="gf-topbar-left">
            <span>{CONTRACTOR_INFO.alvaraNumber}</span>
            <span className="gf-dot" />
            <span>Aveiro e concelhos limítrofes</span>
            <span className="gf-dot" />
            <span>Seg–Sex 08:00–18:00 · Sáb 09:00–13:00</span>
          </div>
          <div className="gf-topbar-right">
            <a href="/clientes" className="gf-topbar-link">
              <Star size={11} fill="#ffffff" stroke="#ffffff" />
              {CONTRACTOR_INFO.googleRating} no Google · {CONTRACTOR_INFO.reviewCount} avaliações
            </a>
            <a href={`mailto:${CONTRACTOR_INFO.email}`} className="gf-topbar-link">
              {CONTRACTOR_INFO.email}
            </a>
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <div className="section-container gf-nav-row">
        <BrandLogo tone="light" size="md" />

        <nav className="gf-nav hidden-mobile" aria-label="Navegação principal">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="gf-nav-link">
              {l.label}
            </Link>
          ))}

          <div
            ref={dropdownRef}
            style={{ position: "relative" }}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="gf-nav-link gf-nav-button"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Preços &amp; Ferramentas
              <ChevronDown
                size={14}
                style={{ transition: "transform 0.25s ease", transform: isDropdownOpen ? "rotate(180deg)" : "none" }}
              />
            </button>

            {isDropdownOpen && (
              <div className="gf-dropdown">
                {TOOLS_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDropdownOpen(false)}
                    className="gf-dropdown-link"
                  >
                    <span className="gf-dropdown-title">
                      {item.title}
                      <ArrowUpRight size={14} />
                    </span>
                    <span className="gf-dropdown-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/sobre" className="gf-nav-link">Sobre Nós</Link>
        </nav>

        <div className="gf-nav-cta hidden-mobile">
          <a href={`tel:${CONTRACTOR_INFO.phone}`} id="header-cta-phone" className="gf-phone">
            <Phone size={15} />
            <span>{CONTRACTOR_INFO.phoneDisplay}</span>
          </a>
          <Link href="/orcamento" className="btn-primary" style={{ padding: "0.7rem 1.25rem", fontSize: "0.8125rem" }}>
            Pedir Orçamento
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-controls gf-burger"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="gf-mobile-menu">
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {[
              { href: "/", label: "Início" },
              { href: "/servicos", label: "Serviços" },
              { href: "/projetos", label: "Projetos" },
              { href: "/clientes", label: "Clientes & Obras Reais" },
              { href: "/sobre", label: "Sobre Nós" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="gf-mobile-link"
              >
                {item.label}
                <ArrowRight size={16} />
              </Link>
            ))}
          </nav>

          <p className="gf-mobile-label">Preços &amp; Ferramentas</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {TOOLS_MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="gf-mobile-sublink"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary" style={{ width: "100%" }}>
              <Phone size={16} />
              Ligar {CONTRACTOR_INFO.phoneDisplay}
            </a>
            <a
              href={CONTRACTOR_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ width: "100%" }}
            >
              Mensagem WhatsApp
            </a>
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: "0.6875rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
            {CONTRACTOR_INFO.alvaraNumber}
          </p>
        </div>
      )}

      <style>{`
        .gf-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: linear-gradient(180deg, rgba(5, 5, 5, 0.7) 0%, rgba(5, 5, 5, 0) 100%);
          transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          border-bottom: 1px solid transparent;
        }
        .gf-header.is-solid {
          background: rgba(10, 10, 10, 0.97);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.45);
        }
        .gf-topbar {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.6875rem;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.55);
          overflow: hidden;
          max-height: 40px;
          transition: max-height 0.35s ease, opacity 0.3s ease;
        }
        .gf-header.is-solid .gf-topbar { max-height: 0; opacity: 0; border-bottom-color: transparent; }
        .gf-topbar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 36px;
          gap: 1rem;
        }
        .gf-topbar-left, .gf-topbar-right { display: flex; align-items: center; gap: 0.875rem; white-space: nowrap; }
        .gf-dot { width: 3px; height: 3px; background: rgba(255,255,255,0.35); border-radius: 50%; }
        .gf-topbar-link { color: rgba(255, 255, 255, 0.65); text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; transition: color 0.2s; }
        .gf-topbar-link:hover { color: #ffffff; }
        .gf-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          transition: height 0.35s ease;
          gap: 2rem;
        }
        .gf-header.is-solid .gf-nav-row { height: 70px; }
        .gf-nav { display: flex; align-items: center; gap: 2.25rem; }
        .gf-nav-link {
          position: relative;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          padding: 0.5rem 0;
          transition: color 0.2s ease;
        }
        .gf-nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: #ffffff;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gf-nav-link:hover { color: #ffffff; }
        .gf-nav-link:hover::after { transform: scaleX(1); }
        .gf-nav-button { display: inline-flex; align-items: center; gap: 0.35rem; background: none; border: 0; cursor: pointer; font-family: inherit; }
        .gf-dropdown {
          position: absolute;
          top: 100%;
          left: -1.5rem;
          width: 340px;
          background: #0A0A0A;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-top: 2px solid #ffffff;
          box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.6);
          padding: 0.5rem;
          margin-top: 0.75rem;
          animation: gfDrop 0.22s ease;
        }
        .gf-dropdown::before { content: ""; position: absolute; top: -16px; left: 0; right: 0; height: 16px; }
        .gf-dropdown-link {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          padding: 0.9rem 1rem;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .gf-dropdown-link:hover { background: rgba(255, 255, 255, 0.05); }
        .gf-dropdown-title { display: flex; justify-content: space-between; align-items: center; color: #ffffff; font-weight: 600; font-size: 0.875rem; }
        .gf-dropdown-title svg { color: #8C8C8C; }
        .gf-dropdown-desc { color: rgba(255, 255, 255, 0.5); font-size: 0.75rem; line-height: 1.45; }
        @keyframes gfDrop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .gf-nav-cta { display: flex; align-items: center; gap: 1.5rem; }
        .gf-phone {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.9375rem;
          letter-spacing: 0.02em;
          text-decoration: none;
          font-variant-numeric: tabular-nums;
        }
        .gf-phone svg { color: #8C8C8C; }
        .gf-burger {
          display: none;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .gf-mobile-menu {
          background: #0A0A0A;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1rem 1.25rem 2rem;
          height: calc(100dvh - 70px);
          overflow-y: auto;
        }
        .gf-mobile-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.05rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          text-decoration: none;
          font-size: 1.375rem;
          font-weight: 500;
          letter-spacing: -0.02em;
          font-family: var(--font-display), sans-serif;
        }
        .gf-mobile-link svg { color: #8C8C8C; }
        .gf-mobile-label {
          margin: 2rem 0 0.5rem;
          font-size: 0.6875rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8C8C8C;
          font-weight: 600;
        }
        .gf-mobile-sublink {
          padding: 0.65rem 0;
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          font-size: 0.9375rem;
        }
        @media (max-width: 1100px) {
          .gf-nav { gap: 1.5rem; }
          .gf-phone { display: none; }
        }
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .mobile-controls { display: inline-flex !important; }
          .gf-nav-row, .gf-header.is-solid .gf-nav-row { height: 70px; }
        }
      `}</style>
    </header>
  );
}
