"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, Shield, UserCheck } from "lucide-react";
import { CONTRACTOR_INFO, SERVICES, PARISHES } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" style={{ paddingTop: "3.5rem", background: "#022c22" }}>
      <div className="section-container">
        {/* Top Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Brand & NAP */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
              <img
                src="/logo1s.png"
                alt="Freitas Renovações LDA"
                style={{ height: "42px", width: "auto", objectFit: "contain" }}
              />
              <div>
                <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "1rem" }}>
                  Freitas Renovações
                </div>
                <div style={{ color: "#fbbf24", fontSize: "0.75rem", fontWeight: 700 }}>LDA</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1rem" }}>
              Empresa de obras, remodelações e reparações em Aveiro. Empreiteiro responsável: Jorge Freitas.
            </p>

            {/* 100% NAP Synchronization */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a
                href={`tel:${CONTRACTOR_INFO.phone}`}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#fbbf24", fontSize: "0.875rem", textDecoration: "none", fontWeight: 800 }}
              >
                <Phone size={15} />
                <span>{CONTRACTOR_INFO.phoneDisplay} ({CONTRACTOR_INFO.phone})</span>
              </a>
              <a
                href={`mailto:${CONTRACTOR_INFO.email}`}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", textDecoration: "none" }}
              >
                <Mail size={15} />
                <span>{CONTRACTOR_INFO.email}</span>
              </a>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "rgba(255,255,255,0.75)", fontSize: "0.875rem" }}>
                <MapPin size={15} style={{ flexShrink: 0, color: "#fbbf24", marginTop: "3px" }} />
                <span>{CONTRACTOR_INFO.address.street}, {CONTRACTOR_INFO.address.postalCode} Aveiro, Portugal</span>
              </div>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                background: "rgba(251, 191, 36, 0.12)",
                border: "1px solid rgba(251, 191, 36, 0.3)",
                borderRadius: "0.25rem",
                padding: "0.375rem 0.75rem",
                marginTop: "1rem",
                color: "#fbbf24",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              <Shield size={13} />
              Alvará de Construção Válido IMPIC
            </div>
          </div>

          {/* Google Maps Interactive Embed */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "0.875rem", fontSize: "0.8125rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Localização em Aveiro (GBP)
            </h4>
            <div
              style={{
                borderRadius: "0.375rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.15)",
                height: "180px",
                width: "100%",
                background: "#064e3b",
              }}
            >
              <iframe
                title="Localização Freitas Renovações LDA Aveiro"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.543!2d-8.640135!3d40.647487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDM4JzUxLjAiTiA4wrAzOCcyNC41Ilc!5e0!3m2!1spt-PT!2spt!4v1700000000000!5m2!1spt-PT!2spt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "0.875rem", fontSize: "0.8125rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Serviços em Aveiro
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicos/${service.slug}`}
                    className="footer-link"
                    style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}
                  >
                    <ArrowRight size={12} style={{ color: "#fbbf24", flexShrink: 0 }} />
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links & Blog & Admin */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "0.875rem", fontSize: "0.8125rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Informação & Guia SEO
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: "/blog", label: "Blog & Artigos de Obras" },
                { href: "/sobre", label: "Sobre o Jorge Freitas" },
                { href: "/projetos", label: "Projetos Realizados" },
                { href: "/#faq", label: "Perguntas Frequentes" },
                { href: "/#hero-form", label: "Pedir Orçamento Grátis" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link" style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <ArrowRight size={12} style={{ color: "#fbbf24", flexShrink: 0 }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "1.25rem", paddingTop: "0.875rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <Link
                href="/login"
                id="footer-jorge-login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(251, 191, 36, 0.12)",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                  color: "#fbbf24",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <UserCheck size={15} />
                <span>Área de Trabalho</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            padding: "1.25rem 0",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.8125rem",
          }}
        >
          <p>© {currentYear} {CONTRACTOR_INFO.companyName}. Todos os direitos reservados.</p>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>
            Rua Magistério Primário, 3800-212 Aveiro (GPS: 40.647487, -8.640135)
          </p>
        </div>
      </div>
    </footer>
  );
}
