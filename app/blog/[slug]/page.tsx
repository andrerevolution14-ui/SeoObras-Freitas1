import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Phone, ShieldCheck, MapPin } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { CONTRACTOR_INFO } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Freitas Renovações Aveiro`,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://freitasrenovacoes.pt/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Empreiteiro Geral",
      worksFor: {
        "@type": "HomeAndConstructionBusiness",
        name: CONTRACTOR_INFO.companyName,
      },
    },
    publisher: {
      "@type": "HomeAndConstructionBusiness",
      name: CONTRACTOR_INFO.companyName,
      logo: {
        "@type": "ImageObject",
        url: "https://freitasrenovacoes.pt/logo.png",
      },
    },
    mainEntityOfPage: `https://freitasrenovacoes.pt/blog/${slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://freitasrenovacoes.pt" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://freitasrenovacoes.pt/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://freitasrenovacoes.pt/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #071a3a, #0f2d5e)", padding: "7.5rem 0 4rem" }}>
        <div className="section-container" style={{ maxWidth: "840px" }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Blog</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#fbbf24" }}>{post.category}</span>
          </nav>

          <span
            style={{
              background: "rgba(251, 191, 36, 0.15)",
              border: "1px solid rgba(251, 191, 36, 0.3)",
              color: "#fbbf24",
              fontSize: "0.75rem",
              fontWeight: 800,
              padding: "0.25rem 0.75rem",
              borderRadius: "0.25rem",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            {post.category}
          </span>

          <h1 style={{ fontSize: "clamp(1.75rem, 3.8vw, 2.5rem)", fontWeight: 900, color: "#ffffff", marginBottom: "1.25rem", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
            {post.title}
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", color: "rgba(255,255,255,0.75)", fontSize: "0.875rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <User size={14} style={{ color: "#fbbf24" }} />
              Por {post.author} (Empreiteiro Responsável)
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <Calendar size={14} /> {post.date}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <Clock size={14} /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding" style={{ background: "#ffffff" }}>
        <div className="section-container" style={{ maxWidth: "840px" }}>
          {/* Main Image */}
          <div style={{ borderRadius: "0.5rem", overflow: "hidden", marginBottom: "2.5rem", border: "1.5px solid #e2e8f0", maxHeight: "400px" }}>
            <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Article Body */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "#334155", fontSize: "1.0625rem", lineHeight: 1.8 }}>
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* E-E-A-T Author Box */}
          <div
            style={{
              marginTop: "3rem",
              padding: "1.5rem",
              background: "#f8fafc",
              border: "1.5px solid #e2e8f0",
              borderRadius: "0.5rem",
              display: "flex",
              gap: "1.25rem",
              alignItems: "center",
            }}
          >
            <img
              src="/jorge-freitas.jpg"
              alt="Jorge Freitas"
              style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover", border: "2px solid #f59e0b", flexShrink: 0 }}
            />
            <div>
              <div style={{ fontWeight: 800, color: "#071a3a", fontSize: "1.0625rem" }}>
                Artigo verificado por {CONTRACTOR_INFO.contractorName}
              </div>
              <div style={{ fontSize: "0.8125rem", color: "#64748b", margin: "0.25rem 0 0.5rem" }}>
                {CONTRACTOR_INFO.jobTitle} da {CONTRACTOR_INFO.companyName} · Alvará de Construção Válido IMPIC
              </div>
              <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.5 }}>
                Supervisão direta de obras, remodelações e reparações em todo o município de Aveiro com orçamentos transparentes e preços justos.
              </p>
            </div>
          </div>

          {/* Internal Silo Links */}
          <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "rgba(7, 26, 58, 0.04)", border: "1px solid rgba(7, 26, 58, 0.1)", borderRadius: "0.5rem" }}>
            <h3 style={{ fontWeight: 800, color: "#071a3a", fontSize: "1rem", marginBottom: "0.75rem" }}>
              Serviços Relacionados em Aveiro:
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link href="/servicos/remodelacao-geral" style={{ color: "#d97706", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
                → Remodelação Geral em Aveiro
              </Link>
              <Link href="/servicos/canalizacao" style={{ color: "#d97706", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
                → Canalização e Deteção de Fugas
              </Link>
              <Link href="/areas-atuacao/esgueira" style={{ color: "#d97706", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
                → Obras em Esgueira
              </Link>
              <Link href="/areas-atuacao/gloria-e-vera-cruz" style={{ color: "#d97706", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
                → Obras no Centro de Aveiro
              </Link>
            </div>
          </div>

          {/* Call to Action Card */}
          <div
            style={{
              marginTop: "3rem",
              background: "linear-gradient(135deg, #071a3a, #0f2d5e)",
              borderRadius: "0.5rem",
              padding: "2rem",
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "0.5rem", color: "#ffffff" }}>
              Precisa de ajuda na sua obra em Aveiro?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
              Peça um orçamento gratuito e sem compromisso. Resposta garantida até 12 horas.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`tel:${CONTRACTOR_INFO.phone}`} className="btn-primary">
                <Phone size={16} />
                {CONTRACTOR_INFO.phoneDisplay}
              </a>
              <Link href="/#hero-form" className="btn-secondary">
                Pedir Orçamento Online
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
