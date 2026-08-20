"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: isScrolled
          ? "rgba(2, 44, 34, 0.98)"
          : "rgba(2, 44, 34, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div
        className="section-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}
      >
        {/* Real Company Logo from public/logo1s.png */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
        >
          <img
            src="/logo1s.png"
            alt="Freitas Renovações LDA"
            style={{
              height: "44px",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
          <div>
            <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "1rem", lineHeight: 1.1 }}>
              Freitas Renovações
            </div>
            <div style={{ color: "#fbbf24", fontSize: "0.65rem", letterSpacing: "0.06em", fontWeight: 700 }}>
              EMPREITEIRO AVEIRO
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} className="hidden-mobile">
          <Link href="/servicos/remodelacao-geral" className="nav-link">Serviços</Link>
          <Link href="/projetos" className="nav-link">Projetos</Link>
          <Link href="/areas-atuacao/esgueira" className="nav-link">Áreas</Link>
          <Link href="/blog" className="nav-link">Blog & Guia Obras</Link>
          <Link href="/sobre" className="nav-link">Sobre Nós</Link>
        </nav>

        {/* Phone CTA Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="hidden-mobile">
          <a
            href={`tel:${CONTRACTOR_INFO.phone}`}
            id="header-cta-phone"
            className="btn-primary"
            style={{ padding: "0.55rem 1.125rem", fontSize: "0.875rem" }}
          >
            <Phone size={15} />
            <span>{CONTRACTOR_INFO.phoneDisplay}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
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

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            background: "#022c22",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "1rem 1.25rem 1.25rem",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {[
              { href: "/servicos/remodelacao-geral", label: "Serviços de Obras" },
              { href: "/projetos", label: "Projetos Realizados" },
              { href: "/areas-atuacao/esgueira", label: "Áreas de Atuação em Aveiro" },
              { href: "/blog", label: "Blog & Guia de Obras em Aveiro" },
              { href: "/sobre", label: "Sobre o Jorge Freitas" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: "0.9375rem" }}
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
      `}</style>
    </header>
  );
}
