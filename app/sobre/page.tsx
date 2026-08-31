import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Award, Users, Clock, CheckCircle, Phone, ArrowRight, Star, MapPin } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre Nós — Empreiteiro Jorge Freitas | Freitas Renovações LDA",
  description:
    "Conheça Jorge Freitas, empreiteiro responsável da Freitas Renovações LDA em Aveiro. Alvará de construção válido, +100 obras concluídas e preços justos.",
  alternates: { canonical: "/sobre" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: CONTRACTOR_INFO.contractorName,
  jobTitle: CONTRACTOR_INFO.jobTitle,
  worksFor: {
    "@type": "HomeAndConstructionBusiness",
    name: CONTRACTOR_INFO.companyName,
    url: CONTRACTOR_INFO.website,
  },
  knowsAbout: [
    "Construção Civil",
    "Remodelações Residenciais",
    "Canalização",
    "Instalações Elétricas",
    "Impermeabilização",
    "Isolamentos",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTRACTOR_INFO.address.street,
    postalCode: CONTRACTOR_INFO.address.postalCode,
    addressLocality: "Aveiro",
    addressCountry: "PT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CONTRACTOR_INFO.geo.latitude,
    longitude: CONTRACTOR_INFO.geo.longitude,
  },
};

export default function SobrePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #071a3a, #0f2d5e)", padding: "7.5rem 0 4rem" }}>
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>Sobre Nós</span>
          </nav>
          <p className="section-eyebrow" style={{ color: "#fbbf24" }}>Quem Somos</p>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 900, color: "#ffffff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            A Equipa da Freitas Renovações LDA
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: "560px", lineHeight: 1.65 }}>
            Empresa de construção civil e remodelações em Aveiro, fundada e liderada pelo Empreiteiro Jorge Freitas com forte compromisso na qualidade e em preços justos.
          </p>
        </div>
      </section>

      {/* Jorge Freitas Profile */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "3.5rem", alignItems: "start" }} className="about-profile-grid">
            {/* Avatar & Cards */}
            <div>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "0.5rem",
                  background: "linear-gradient(135deg, #071a3a 0%, #0f2d5e 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  border: "3px solid #fbbf24",
                  boxShadow: "0 10px 30px rgba(7, 26, 58, 0.15)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "4.5rem", marginBottom: "0.25rem" }}>👷</div>
                  <div style={{ color: "#fbbf24", fontWeight: 800, fontSize: "1.125rem" }}>Jorge Freitas</div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8125rem" }}>Empreiteiro Responsável</div>
                </div>
              </div>

              {/* Credentials */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  { icon: <Shield size={16} />, label: "Alvará", value: "Licenciado IMPIC" },
                  { icon: <CheckCircle size={16} />, label: "Obras Concluídas", value: `+${CONTRACTOR_INFO.projectsCompleted} Obras` },
                  { icon: <Star size={16} />, label: "Google Rating", value: `${CONTRACTOR_INFO.googleRating}/5 ⭐` },
                  { icon: <Clock size={16} />, label: "Atendimento", value: "Resposta até 12h" },
                ].map((c) => (
                  <div
                    key={c.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem 0.875rem",
                      background: "#f8fafc",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "0.375rem",
                    }}
                  >
                    <span style={{ color: "#d97706" }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.6875rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 800, color: "#071a3a" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#071a3a", marginBottom: "1.25rem" }}>
                {CONTRACTOR_INFO.contractorName} — {CONTRACTOR_INFO.jobTitle}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "#475569", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                <p>
                  O Jorge Freitas é o empreiteiro responsável pela <strong style={{ color: "#071a3a" }}>Freitas Renovações LDA</strong> em Aveiro. A sua dedicação à transparência, rigor na execução e política de <strong style={{ color: "#071a3a" }}>preços justos</strong> transformou a empresa numa referência de confiança na região.
                </p>
                <p>
                  Jorge Freitas acompanha pessoalmente as obras, garantindo que os materiais aplicados cumprem os padrões de exigência e que a comunicação com o cliente é clara do início ao fim.
                </p>
                <p>
                  A <strong style={{ color: "#071a3a" }}>Freitas Renovações LDA</strong> é uma empresa devidamente licenciada com Alvará de Construção Válido e seguro de responsabilidade civil para execução de obras de construção e remodelação em Portugal.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "1.75rem" }}>
                {[
                  { icon: <Shield size={18} />, title: "Empresa Licenciada", desc: "Alvará de Construção válido e seguro de responsabilidade civil" },
                  { icon: <Clock size={18} />, title: "Resposta até 12h", desc: "Atendimento ágil para avaliar a sua obra e apresentar orçamento" },
                  { icon: <Users size={18} />, title: "Equipa Dedicada", desc: "Profissionais qualificados em cada especialidade" },
                  { icon: <CheckCircle size={18} />, title: "Preços Justos", desc: "Valores transparentes e garantia em todos os trabalhos" },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: "1rem",
                      background: "#f8fafc",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "0.375rem",
                    }}
                  >
                    <span style={{ color: "#d97706", marginBottom: "0.375rem", display: "block" }}>{item.icon}</span>
                    <div style={{ fontWeight: 700, color: "#071a3a", fontSize: "0.875rem", marginBottom: "0.2rem" }}>{item.title}</div>
                    <div style={{ fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>

              <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary" style={{ fontSize: "0.9375rem" }}>
                <Phone size={18} />
                Contactar o Jorge Freitas — {CONTRACTOR_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .about-profile-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          }
        `}</style>
      </section>

      {/* Location / Real Address section */}
      <section
        id="localizacao"
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #071a3a, #0f2d5e)" }}
      >
        <div className="section-container" style={{ maxWidth: "760px" }}>
          <p className="section-eyebrow" style={{ color: "#fbbf24" }}>Localização Real</p>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", marginBottom: "1.25rem" }}>
            Onde Estamos em Aveiro
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { label: "Empresa", value: CONTRACTOR_INFO.companyName },
              { label: "Empreiteiro Responsável", value: CONTRACTOR_INFO.contractorName },
              { label: "Morada", value: `${CONTRACTOR_INFO.address.street}, ${CONTRACTOR_INFO.address.postalCode} Aveiro` },
              { label: "Coordenadas GPS", value: `${CONTRACTOR_INFO.geo.latitude}, ${CONTRACTOR_INFO.geo.longitude}` },
              { label: "Contacto Telefónico", value: CONTRACTOR_INFO.phoneDisplay },
              { label: "Prazo de Resposta", value: "Até 12 horas" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "1rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "0.375rem",
                }}
              >
                <div style={{ fontSize: "0.6875rem", color: "#fbbf24", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>
                  {item.label}
                </div>
                <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.875rem" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", padding: "3.5rem 0", textAlign: "center" }}>
        <div className="section-container">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#071a3a", marginBottom: "0.75rem" }}>
            Pronto para solicitar o seu orçamento?
          </h2>
          <Link href="/#hero-form" className="btn-primary" style={{ display: "inline-flex", background: "#071a3a", color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
            Pedir Orçamento Grátis e Transparente
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
