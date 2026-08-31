"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, Shield, UserCheck, ExternalLink, Star } from "lucide-react";
import { CONTRACTOR_INFO, SERVICES } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Google Business Profile — Place ID extraído do URL fornecido
  // URL original: https://www.google.com/maps/place/Freitas+Renovações/@40.679534,-8.7662379,...
  // Place ID: ChIJbnyBD_bGxkYRiViYJrwZFsE
  const GOOGLE_MAPS_EMBED =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47652.34!2d-8.7662379!3d40.679534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6cc6ccf60f817c6f%3A0xc11699bc26385889!2sFreitas+Renova%C3%A7%C3%B5es!5e0!3m2!1spt-PT!2spt!4v1725096000000!5m2!1spt-PT!2spt";
  const GOOGLE_MAPS_LINK =
    "https://www.google.com/maps/place/Freitas+Renova%C3%A7%C3%B5es/@40.679534,-8.7662379,10z/data=!3m1!4b1!4m6!3m5!1s0x6cc6ccf60f817c6f:0xc11699bc26385889!8m2!3d40.679482!4d-8.4366004!16s%2Fg%2F11zx1bcp3x";

  return (
    <footer className="footer" style={{ paddingTop: "3.5rem", background: "#071a3a" }}>
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

            {/* Google Rating Badge */}
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(251, 191, 36, 0.1)",
                border: "1px solid rgba(251, 191, 36, 0.35)",
                borderRadius: "0.375rem",
                padding: "0.5rem 0.875rem",
                marginBottom: "1rem",
                color: "#fbbf24",
                fontSize: "0.8125rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              <Star size={13} fill="#fbbf24" />
              <span>4.9 no Google Business</span>
              <ExternalLink size={11} style={{ opacity: 0.7 }} />
            </a>

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

          {/* Google Maps Embed — Localização Real */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "0.875rem", fontSize: "0.8125rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Localização Google Business
            </h4>
            <div
              style={{
                borderRadius: "0.5rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.15)",
                height: "180px",
                width: "100%",
                background: "#0f2d5e",
              }}
            >
              <iframe
                title="Freitas Renovações — Google Business Profile Aveiro"
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                marginTop: "0.625rem",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.75rem",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              <ExternalLink size={11} />
              Ver no Google Maps
            </a>
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

          {/* Links Úteis */}
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

            {/* Contacto direto por email */}
            <div style={{ marginTop: "1.25rem", paddingTop: "0.875rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                Contacto Email
              </p>
              <a
                href={`mailto:${CONTRACTOR_INFO.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#fbbf24",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <Mail size={14} />
                {CONTRACTOR_INFO.email}
              </a>
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
            {CONTRACTOR_INFO.address.street}, {CONTRACTOR_INFO.address.postalCode} Aveiro (GPS: {CONTRACTOR_INFO.geo.latitude}, {CONTRACTOR_INFO.geo.longitude})
          </p>
        </div>
      </div>
    </footer>
  );
}
