"use client";
import "./header.css";


import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";
import { BrandLogo } from "@/components/brand-logo";
import { SocialLinks } from "@/components/social-links";

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
  { href: "/capa#inicio", label: "A Empresa" },
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
            <a href={`tel:${CONTRACTOR_INFO.phone}`} className="gf-topbar-link" id="header-cta-phone">
              <Phone size={11} /> {CONTRACTOR_INFO.phoneDisplay}
            </a>
            <a href={CONTRACTOR_INFO.socialLinks.instagram} target="_blank" rel="noopener noreferrer me" className="gf-topbar-link" aria-label="Freitas Renovações no Instagram">
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href={CONTRACTOR_INFO.socialLinks.facebook} target="_blank" rel="noopener noreferrer me" className="gf-topbar-link" aria-label="Freitas Renovações no Facebook">
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="currentColor"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <div className="section-container gf-nav-row">
        <div className="gf-logo-slot">
          <BrandLogo tone="light" size="md" />
        </div>

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
          <Link href="/#hero-form" className="btn-primary" style={{ padding: "0.7rem 1.25rem", fontSize: "0.8125rem" }}>
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

      <span className="gf-progress" aria-hidden="true" />

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="gf-mobile-menu">
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {[
              { href: "/", label: "Início" },
              { href: "/capa#inicio", label: "A Empresa" },
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
            <Link href="/#hero-form" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary" style={{ width: "100%" }}>
              Pedir Orçamento Grátis
              <ArrowRight size={16} />
            </Link>
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
          <div style={{ marginTop: "1.5rem" }}>
            <SocialLinks withLabels />
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: "0.6875rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
            {CONTRACTOR_INFO.alvaraNumber}
          </p>
        </div>
      )}


    </header>
  );
}
