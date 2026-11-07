import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { REAL_PROJECTS } from "@/lib/constants";

export function RealProjectsGallery() {
  return (
    <section className="section-padding" id="projetos-realizados" style={{ background: "#ffffff" }}>
      <div className="section-container">
        {/* Cabeçalho */}
        <div className="gf-proj-head" data-reveal>
          <div>
            <p className="section-eyebrow">Trabalhos Concluídos</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Projetos Realizados em Aveiro (2022–2026)
            </h2>
          </div>
          <div>
            <p className="section-subtitle" style={{ marginBottom: "1.5rem" }}>
              Obras reais, com local e ano.
            </p>
            <Link href="/projetos" className="link-arrow">
              Ver galeria completa de projetos <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Grelha editorial */}
        <div className="gf-proj-grid">
          {REAL_PROJECTS.map((project, i) => (
            <article key={project.id} className="gf-proj" data-reveal style={{ ["--d" as string]: `${(i % 2) * 120}ms` }}>
              <Link href="/#hero-form" className="gf-proj-media photo-slot" aria-label={`Pedir orçamento para obra idêntica: ${project.title}`}>
                <Image
                  src={project.image}
                  alt={project.altText || `${project.title} em ${project.parish} Aveiro`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  quality={80}
                  style={{ objectFit: "cover" }}
                />
                <span className="gf-proj-year">{project.year}</span>
                <span className="gf-proj-cta">
                  Pedir orçamento para obra idêntica <ArrowUpRight size={15} />
                </span>
              </Link>
              <div className="gf-proj-body">
                <span className="gf-proj-index font-display">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="gf-proj-meta">
                    {project.service} <span>·</span> {project.parish}
                  </p>
                  <h3 className="gf-proj-title">{project.title}</h3>
                  <p className="gf-proj-desc">{project.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: "4rem", display: "flex", justifyContent: "center" }}>
          <Link href="/projetos" className="btn-dark">
            Ver Galeria Completa de Projetos
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .gf-proj-head {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: end;
          margin-bottom: 4.5rem;
        }
        .gf-proj-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 2.5rem;
          row-gap: 4.5rem;
        }
        .gf-proj:nth-child(even) { margin-top: 6rem; }
        .gf-proj-media {
          display: block;
          aspect-ratio: 4 / 3;
          text-decoration: none;
        }
        .gf-proj-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10, 10, 10, 0) 50%, rgba(10, 10, 10, 0.75) 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .gf-proj-media:hover::after { opacity: 1; }

        .gf-proj-year {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          z-index: 2;
          background: rgba(10, 10, 10, 0.85);
          color: #ffffff;
          font-size: 0.6875rem;
          letter-spacing: 0.18em;
          font-weight: 600;
          padding: 0.45rem 0.75rem;
          backdrop-filter: blur(6px);
        }
        .gf-proj-cta {
          position: absolute;
          left: 1.5rem;
          bottom: 1.25rem;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 600;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gf-proj-media:hover .gf-proj-cta { opacity: 1; transform: none; }
        .gf-proj-body {
          display: grid;
          grid-template-columns: 3.25rem 1fr;
          gap: 0.5rem;
          padding-top: 1.75rem;
        }
        .gf-proj-index { color: #6B6B6B; font-size: 0.9375rem; font-weight: 500; padding-top: 0.15rem; }
        .gf-proj-meta {
          font-size: 0.6875rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6B6B6B;
          font-weight: 500;
          margin-bottom: 0.625rem;
        }
        .gf-proj-meta span { color: #6B6B6B; margin: 0 0.35rem; }
        .gf-proj-title {
          font-size: clamp(1.375rem, 2vw, 1.75rem);
          font-weight: 600;
          color: #0A0A0A;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: 0.75rem;
        }
        .gf-proj-desc { color: #5C5C5C; font-size: 0.9375rem; line-height: 1.7; max-width: 480px; }
        @media (max-width: 900px) {
          .gf-proj-head { grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 3rem; }
          .gf-proj:nth-child(even) { margin-top: 0; }
        }
        @media (max-width: 640px) {
          .gf-proj-grid { grid-template-columns: 1fr; row-gap: 3rem; }
          .gf-proj-body { grid-template-columns: 2.5rem 1fr; padding-top: 1.25rem; }
          .gf-proj-cta { opacity: 1; transform: none; font-size: 0.8125rem; }
          .gf-proj-media::after { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
