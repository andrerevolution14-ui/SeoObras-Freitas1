"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { GOOGLE_REVIEWS, CONTRACTOR_INFO } from "@/lib/constants";

type GoogleReviewItem = (typeof GOOGLE_REVIEWS)[number];

function StarRating({ rating, size = 14, color = "#0A0A0A" }: { rating: number; size?: number; color?: string }) {
  return (
    <div className="stars" style={{ flexShrink: 0 }} aria-label={`${rating} em 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < rating ? color : "none"} stroke={i < rating ? color : "#D4D4D2"} />
      ))}
    </div>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
}

export function GoogleReviews() {
  const [activeReview, setActiveReview] = useState<GoogleReviewItem | null>(null);

  useEffect(() => {
    if (!activeReview) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveReview(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeReview]);

  return (
    <section className="section-padding" id="reviews" style={{ background: "#ffffff" }}>
      <div className="section-container">
        <div className="gf-rev-head" data-reveal>
          <div>
            <p className="section-eyebrow">Avaliações Verificadas</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              O que dizem os nossos clientes em Aveiro
            </h2>
          </div>
          <a
            href={CONTRACTOR_INFO.socialLinks.google}
            target="_blank"
            rel="noopener noreferrer"
            className="gf-rev-score"
            aria-label="Ver perfil no Google"
          >
            <span className="gf-rev-score-num font-display">{CONTRACTOR_INFO.googleRating}</span>
            <span>
              <StarRating rating={5} size={15} />
              <span className="gf-rev-score-label">
                {CONTRACTOR_INFO.reviewCount} avaliações reais no Google
                <ArrowUpRight size={13} />
              </span>
            </span>
          </a>
        </div>

        <div className="gf-rev-grid">
          {GOOGLE_REVIEWS.map((review, i) => (
            <article
              key={review.id}
              onClick={() => setActiveReview(review)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveReview(review);
                }
              }}
              aria-label={`Abrir avaliação de ${review.name}`}
              className="gf-rev"
              data-reveal
              style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
            >
              <div className="gf-rev-top">
                <StarRating rating={review.rating} size={13} />
                <span className="gf-rev-service">{review.service}</span>
              </div>
              <p className="gf-rev-text">&ldquo;{review.text}&rdquo;</p>
              <footer className="gf-rev-foot">
                <span className="gf-rev-initial font-display">{review.name.charAt(0)}</span>
                <span style={{ minWidth: 0 }}>
                  <span className="gf-rev-name">{review.name}</span>
                  <span className="gf-rev-parish">
                    {review.parish} · {formatDate(review.date)}
                  </span>
                </span>
              </footer>
            </article>
          ))}
        </div>

        <div className="gf-rev-actions">
          <Link href="/clientes" className="btn-dark">
            Ver Opiniões e Fotos de Obras Reais
            <ArrowRight size={16} />
          </Link>
          <a href={CONTRACTOR_INFO.socialLinks.google} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">
            Ver Perfil no Google
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {activeReview && (
        <div className="gf-rev-modal" onClick={() => setActiveReview(null)} role="dialog" aria-modal="true">
          <div className="gf-rev-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="gf-rev-close" onClick={() => setActiveReview(null)} aria-label="Fechar">
              <X size={18} />
            </button>
            <StarRating rating={activeReview.rating} size={16} />
            <p className="gf-rev-modal-text font-display">&ldquo;{activeReview.text}&rdquo;</p>
            <div className="gf-rev-foot" style={{ borderTop: "1px solid #E5E5E3", paddingTop: "1.25rem" }}>
              <span className="gf-rev-initial font-display">{activeReview.name.charAt(0)}</span>
              <span>
                <span className="gf-rev-name">{activeReview.name}</span>
                <span className="gf-rev-parish">
                  {activeReview.parish} · {activeReview.service} · {formatDate(activeReview.date)}
                </span>
              </span>
            </div>
            <Link href="/clientes" onClick={() => setActiveReview(null)} className="link-arrow" style={{ marginTop: "1.5rem" }}>
              Ver mais obras reais <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .gf-rev-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 3rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }
        .gf-rev-head > div { max-width: 640px; }
        .gf-rev-score {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          text-decoration: none;
          padding-left: 2rem;
          border-left: 1px solid #E5E5E3;
        }
        .gf-rev-score-num { font-size: 4.5rem; line-height: 0.9; font-weight: 500; color: #0A0A0A; letter-spacing: -0.05em; }
        .gf-rev-score-label {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-top: 0.5rem;
          font-size: 0.8125rem;
          color: #5C5C5C;
        }
        .gf-rev-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
        }
        .gf-rev {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          background: #F4F4F2;
          border: 1px solid transparent;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease;
          min-width: 0;
        }
        .gf-rev:hover { background: #ffffff; border-color: #DCDCDA; }
        .gf-rev:focus-visible { outline: 2px solid #0A0A0A; outline-offset: 2px; }
        .gf-rev-top { display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        .gf-rev-service {
          font-size: 0.625rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6B6B6B;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .gf-rev-text {
          color: #0A0A0A;
          font-size: 1rem;
          line-height: 1.65;
          margin-bottom: 2rem;
          flex: 1;
        }
        .gf-rev-foot { display: flex; align-items: center; gap: 0.875rem; }
        .gf-rev-initial {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0A0A0A;
          color: #ffffff;
          font-weight: 500;
          font-size: 1rem;
        }
        .gf-rev-name { display: block; font-weight: 600; color: #0A0A0A; font-size: 0.9375rem; }
        .gf-rev-parish { display: block; color: #6B6B6B; font-size: 0.75rem; margin-top: 0.15rem; }
        .gf-rev-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 3.5rem; }
        .gf-rev-modal {
          position: fixed;
          inset: 0;
          z-index: 120;
          background: rgba(5, 5, 5, 0.85);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .gf-rev-modal-card {
          position: relative;
          background: #ffffff;
          max-width: 620px;
          width: 100%;
          padding: 3rem 2.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          border-top: 3px solid #0A0A0A;
        }
        .gf-rev-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #E5E5E3;
          background: #fff;
          cursor: pointer;
          color: #0A0A0A;
        }
        .gf-rev-modal-text { font-size: 1.375rem; line-height: 1.5; color: #0A0A0A; letter-spacing: -0.015em; margin: 1.5rem 0 2rem; font-weight: 500; }
        @media (max-width: 960px) {
          .gf-rev-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .gf-rev-score { padding-left: 0; border-left: 0; }
        }
        @media (max-width: 640px) {
          .gf-rev-head { margin-bottom: 2.5rem; gap: 1.5rem; }
          .gf-rev-score-num { font-size: 3.5rem; }
          .gf-rev-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 0.75rem;
            margin: 0 -1.25rem;
            padding: 0 1.25rem 0.5rem;
            scrollbar-width: none;
          }
          .gf-rev-grid::-webkit-scrollbar { display: none; }
          .gf-rev { flex: 0 0 84%; scroll-snap-align: start; padding: 1.5rem; }
          .gf-rev-text { font-size: 0.9375rem; }
          .gf-rev-actions a { width: 100%; }
          .gf-rev-modal-card { padding: 2.5rem 1.5rem 1.75rem; }
          .gf-rev-modal-text { font-size: 1.125rem; }
        }
      `}</style>
    </section>
  );
}
