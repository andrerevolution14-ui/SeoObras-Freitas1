import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `https://www.grupofreitasrenovacoes.pt${post.image}`;

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `https://www.grupofreitasrenovacoes.pt/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://www.grupofreitasrenovacoes.pt/blog/${slug}`,
      type: "article",
      locale: "pt_PT",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} — Freitas Renovações LDA`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `https://www.grupofreitasrenovacoes.pt${post.image}`;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    image: [imageUrl],
    inLanguage: "pt-PT",
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
        url: "https://www.grupofreitasrenovacoes.pt/logo.png",
      },
    },
    mainEntityOfPage: `https://www.grupofreitasrenovacoes.pt/blog/${slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://www.grupofreitasrenovacoes.pt" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.grupofreitasrenovacoes.pt/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.grupofreitasrenovacoes.pt/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="on-dark" style={{ background: "linear-gradient(135deg, #0A0A0A, #171717)", padding: "7.5rem 0 4rem" }}>
        <div className="section-container" style={{ maxWidth: "840px" }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "1.25rem", display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.8125rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Início</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Blog</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#D4D4D4" }}>{post.category}</span>
          </nav>

          <span
            style={{
              background: "rgba(128, 128, 128, 0.15)",
              border: "1px solid rgba(128, 128, 128, 0.3)",
              color: "#D4D4D4",
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
              <User size={14} style={{ color: "#D4D4D4" }} />
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
          <div style={{ borderRadius: "0.5rem", overflow: "hidden", marginBottom: "2.5rem", border: "1.5px solid #E5E5E3", maxHeight: "400px" }}>
            <img
              src={post.image}
              alt={`${post.title} — Guia de obras e remodelações em Aveiro por Jorge Freitas`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Article Body */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "#3A3A3A", fontSize: "1.0625rem", lineHeight: 1.8 }}>
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* E-E-A-T Author Box */}
          <div
            style={{
              marginTop: "3rem",
              padding: "1.5rem",
              background: "#F7F7F5",
              border: "1.5px solid #E5E5E3",
              borderRadius: "0.5rem",
              display: "flex",
              gap: "1.25rem",
              alignItems: "center",
            }}
          >
            <Image
              src="/icon-192.png"
              alt="Freitas Renovações — artigo verificado pelo Empreiteiro Jorge Freitas, Aveiro"
              width={70}
              height={70}
              quality={75}
              loading="lazy"
              style={{ width: "70px", height: "70px", borderRadius: "2px", objectFit: "cover", flexShrink: 0 }}
            />
            <div>
              <div style={{ fontWeight: 800, color: "#0A0A0A", fontSize: "1.0625rem" }}>
                Artigo verificado por {CONTRACTOR_INFO.contractorName}
              </div>
              <div style={{ fontSize: "0.8125rem", color: "#6B6B6B", margin: "0.25rem 0 0.5rem" }}>
                {CONTRACTOR_INFO.jobTitle} da {CONTRACTOR_INFO.companyName} · Alvará de Construção Válido IMPIC
              </div>
              <p style={{ fontSize: "0.875rem", color: "#525252", lineHeight: 1.5 }}>
                Supervisão direta de obras, remodelações e reparações em todo o município de Aveiro com orçamentos transparentes e preços justos.
              </p>
            </div>
          </div>

          {/* Internal Silo Links */}
          <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "rgba(10, 10, 10, 0.04)", border: "1px solid rgba(10, 10, 10, 0.1)", borderRadius: "0.5rem" }}>
            <h3 style={{ fontWeight: 800, color: "#0A0A0A", fontSize: "1rem", marginBottom: "0.75rem" }}>
              Serviços Relacionados em Aveiro:
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link href="/servicos/remodelacao-geral" style={{ color: "#525252", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
                → Remodelação Geral em Aveiro
              </Link>
              <Link href="/servicos/canalizacao" style={{ color: "#525252", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
                → Canalização e Deteção de Fugas
              </Link>
              <Link href="/areas-atuacao/esgueira" style={{ color: "#525252", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
                → Obras em Esgueira
              </Link>
              <Link href="/areas-atuacao/gloria-e-vera-cruz" style={{ color: "#525252", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
                → Obras no Centro de Aveiro
              </Link>
            </div>
          </div>

          {/* Call to Action Card */}
          <div
            className="on-dark" style={{
              marginTop: "3rem",
              background: "linear-gradient(135deg, #0A0A0A, #171717)",
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
