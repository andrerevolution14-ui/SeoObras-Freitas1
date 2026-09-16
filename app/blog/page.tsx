import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog & Guia de Obras em Aveiro | Freitas Renovações LDA",
  description:
    "Artigos, guias de preços, legislação e dicas úteis sobre obras, remodelações, infiltrações e licenças no concelho de Aveiro. Pela equipa de Jorge Freitas.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/blog" },
  keywords: [
    "blog obras aveiro",
    "guia remodelacoes aveiro",
    "artigos construcao aveiro",
    "quanto custa obra aveiro blog",
    "licencas obras camara de aveiro",
    "infiltracoes telhados aveiro dicas",
    "freitas renovacoes blog",
  ],
  openGraph: {
    title: "Blog & Guia de Obras em Aveiro | Freitas Renovações LDA",
    description:
      "Artigos técnicos, guias de preços, conselhos de manutenção e legislação sobre obras em Aveiro por Jorge Freitas.",
    url: "https://www.grupofreitasrenovacoes.pt/blog",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog de Obras e Remodelações em Aveiro — Freitas Renovações LDA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Guia de Obras em Aveiro | Freitas Renovações LDA",
    description: "Guias práticos de remodelação, preços e dicas de obras em Aveiro.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      name: "Blog & Guia de Obras em Aveiro",
      url: "https://www.grupofreitasrenovacoes.pt/blog",
      description: "Artigos e guias especializados de obras e remodelações no concelho de Aveiro.",
      blogPost: BLOG_POSTS.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        url: `https://www.grupofreitasrenovacoes.pt/blog/${post.slug}`,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: "https://www.grupofreitasrenovacoes.pt",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://www.grupofreitasrenovacoes.pt/blog",
        },
      ],
    },
  ],
};

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #071a3a, #0f2d5e)", padding: "7.5rem 0 4rem" }}>
        <div className="section-container">
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>Blog & Guia de Obras</span>
          </nav>
          <p className="section-eyebrow" style={{ color: "#fbbf24" }}>Informação & Dicas Úteis</p>
          <h1 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 900, color: "#ffffff", marginBottom: "0.875rem", letterSpacing: "-0.02em" }}>
            Guia de Obras e Remodelações em Aveiro
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: "580px", lineHeight: 1.65 }}>
            Respostas às dúvidas mais frequentes sobre custos, licenças camarárias, isolamento térmico e reparações no concelho de Aveiro.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="section-padding" style={{ background: "#f8fafc" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="card-hover"
                style={{
                  background: "#ffffff",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  border: "1.5px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image Header */}
                <div style={{ position: "relative", height: "190px", width: "100%", overflow: "hidden", background: "#071a3a" }}>
                  <img
                    src={post.image}
                    alt={`${post.title} — Artigo de remodelações em Aveiro por Jorge Freitas`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      background: "rgba(7, 26, 58, 0.9)",
                      color: "#fbbf24",
                      fontSize: "0.6875rem",
                      fontWeight: 800,
                      padding: "0.25rem 0.625rem",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {post.category}
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#94a3b8", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>

                    <h2 style={{ fontWeight: 800, fontSize: "1.0625rem", color: "#071a3a", marginBottom: "0.5rem", lineHeight: 1.35 }}>
                      <Link href={`/blog/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {post.title}
                      </Link>
                    </h2>

                    <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                      {post.excerpt}
                    </p>
                  </div>

                  <div style={{ paddingTop: "0.875rem", borderTop: "1px solid #f1f5f9" }}>
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        color: "#d97706",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        textDecoration: "none",
                      }}
                    >
                      <span>Ler Artigo Completo</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", padding: "3.5rem 0", textAlign: "center" }}>
        <div className="section-container">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#071a3a", marginBottom: "0.75rem" }}>
            Tem dúvidas sobre a sua obra em Aveiro?
          </h2>
          <p style={{ color: "#071a3a", fontSize: "1rem", marginBottom: "1.5rem", opacity: 0.9 }}>
            Fale diretamente com o Empreiteiro Jorge Freitas e receba um orçamento gratuito com preço justo.
          </p>
          <Link href="/#hero-form" className="btn-primary" style={{ display: "inline-flex", background: "#071a3a", color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
            Solicitar Orçamento Grátis
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
