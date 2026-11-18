import "./real-projects-gallery.css";
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


    </section>
  );
}
