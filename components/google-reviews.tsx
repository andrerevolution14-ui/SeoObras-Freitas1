"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, BadgeCheck, ArrowRight, Camera, Maximize2, X } from "lucide-react";
import { GOOGLE_REVIEWS, CONTRACTOR_INFO } from "@/lib/constants";

type GoogleReviewItem = (typeof GOOGLE_REVIEWS)[number];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="stars" style={{ flexShrink: 0 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? "#f59e0b" : "none"}
          stroke={i < rating ? "#f59e0b" : "#cbd5e1"}
        />
      ))}
    </div>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-PT", { month: "short", year: "numeric" });
}

export function GoogleReviews() {
  const [activeReview, setActiveReview] = useState<GoogleReviewItem | null>(null);

  return (
    <section
      className="section-padding"
      id="reviews"
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        overflow: "hidden",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <p className="section-eyebrow">Avaliações Verificadas</p>
          <h2 className="section-title">
            O que dizem os nossos clientes em Aveiro
          </h2>
          <div
            className="google-rating-summary-pill"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              background: "#ffffff",
              border: "1.5px solid #e2e8f0",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              marginTop: "0.5rem",
              maxWidth: "100%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            <div className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />
              ))}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
              <strong style={{ fontWeight: 800, fontSize: "1rem", color: "#071a3a" }}>4.9</strong>
              <span> / 5 · 48 avaliações reais no Google</span>
            </div>
          </div>

          {/* Info discreta que indica que podem abrir as reviews */}
          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
              fontSize: "0.75rem",
              color: "#64748b",
              fontWeight: 600,
            }}
          >
            <Maximize2 size={12} style={{ color: "#d97706", flexShrink: 0 }} />
            <span>Pode tocar em qualquer avaliação para abrir e ler na íntegra</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="home-reviews-grid">
          {GOOGLE_REVIEWS.map((review) => (
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
              className="testimonial-card home-review-card"
            >
              <div>
                {/* Header */}
                <div className="home-review-header">
                  <div className="home-review-user">
                    <div
                      className="home-review-avatar"
                      style={{
                        background: `linear-gradient(135deg, ${getAvatarColor(review.name)})`,
                      }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div className="home-review-name-row">
                        <span className="home-review-name">{review.name}</span>
                        <BadgeCheck
                          size={13}
                          className="home-review-verified-icon"
                          style={{ color: "#16a34a", flexShrink: 0 }}
                        />
                      </div>
                      <div className="home-review-parish">
                        📍 {review.parish}
                      </div>
                    </div>
                  </div>
                  <div className="home-review-verified-pill">
                    <BadgeCheck size={11} style={{ color: "#16a34a", flexShrink: 0 }} />
                    <span>Verificado</span>
                  </div>
                </div>

                {/* Stars + Date */}
                <div className="home-review-stars-date">
                  <StarRating rating={review.rating} size={13} />
                  <span className="home-review-date">{formatDate(review.date)}</span>
                </div>

                {/* Review text */}
                <p className="home-review-text">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Footer: Service badge + Abrir review */}
              <div className="home-review-footer">
                <span className="home-review-service-badge">
                  🔧 {review.service}
                </span>
                <span className="home-review-open-hint">
                  <span>Abrir review</span>
                  <Maximize2 size={10} />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA para a Página de Clientes & Obras Reais */}
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/clientes"
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.9rem",
                padding: "0.8rem 1.35rem",
                boxShadow: "0 4px 20px rgba(245, 158, 11, 0.35)",
              }}
            >
              <Camera size={16} />
              <span>Ver Opiniões e Fotos de Obras Reais</span>
              <ArrowRight size={15} />
            </Link>

            <a
              href={CONTRACTOR_INFO.socialLinks.google}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                color: "#071a3a",
                fontWeight: 700,
                fontSize: "0.85rem",
                textDecoration: "none",
                padding: "0.75rem 1.2rem",
                border: "1.5px solid #cbd5e1",
                borderRadius: "0.375rem",
                background: "#ffffff",
                transition: "all 0.2s",
              }}
            >
              <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
              <span>Ver Perfil no Google</span>
            </a>
          </div>
          <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0 }}>
            Cozinhas, Casas de Banho, Apartamentos e Moradias · Testemunhos e fotografias reais sem filtros
          </p>
        </div>
      </div>

      {/* Modal de Leitura de Review */}
      {activeReview && (
        <div
          onClick={() => setActiveReview(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 120,
            background: "rgba(5, 13, 26, 0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#ffffff",
              borderRadius: "0.875rem",
              maxWidth: "520px",
              width: "100%",
              padding: "1.5rem",
              boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveReview(null)}
              aria-label="Fechar avaliação"
              style={{
                position: "absolute",
                top: "0.85rem",
                right: "0.85rem",
                background: "#f1f5f9",
                color: "#071a3a",
                border: "none",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", paddingRight: "2rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "0.5rem",
                  background: `linear-gradient(135deg, ${getAvatarColor(activeReview.name)})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  color: "#ffffff",
                  fontSize: "1rem",
                  flexShrink: 0,
                }}
              >
                {activeReview.name.charAt(0)}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "#071a3a" }}>
                    {activeReview.name}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.2rem",
                      background: "rgba(34, 197, 94, 0.1)",
                      border: "1px solid rgba(34, 197, 94, 0.25)",
                      borderRadius: "999px",
                      padding: "0.12rem 0.5rem",
                      fontSize: "0.68rem",
                      color: "#16a34a",
                      fontWeight: 700,
                    }}
                  >
                    <BadgeCheck size={12} />
                    Cliente Verificado
                  </span>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.15rem" }}>
                  📍 {activeReview.parish}, Aveiro · {formatDate(activeReview.date)}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "0.85rem" }}>
              <StarRating rating={activeReview.rating} size={16} />
            </div>

            <p style={{ color: "#1e293b", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
              &ldquo;{activeReview.text}&rdquo;
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
                flexWrap: "wrap",
                paddingTop: "1rem",
                borderTop: "1px solid #e2e8f0",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "rgba(7, 26, 58, 0.06)",
                  color: "#071a3a",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  padding: "0.3rem 0.7rem",
                  borderRadius: "0.35rem",
                }}
              >
                🔧 {activeReview.service}
              </span>

              <Link
                href="/clientes"
                onClick={() => setActiveReview(null)}
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 800,
                  color: "#d97706",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <span>Ver mais obras reais</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .home-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
          width: 100%;
          max-width: 100%;
        }
        .home-review-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
          box-sizing: border-box;
          cursor: pointer;
        }
        .home-review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .home-review-user {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          min-width: 0;
          flex: 1;
        }
        .home-review-avatar {
          width: 38px;
          height: 38px;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #ffffff;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .home-review-name-row {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          min-width: 0;
        }
        .home-review-name {
          font-weight: 800;
          font-size: 0.92rem;
          color: #071a3a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .home-review-verified-icon {
          display: none;
        }
        .home-review-parish {
          font-size: 0.75rem;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .home-review-verified-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.22rem;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 0.25rem;
          padding: 0.18rem 0.45rem;
          font-size: 0.68rem;
          color: #16a34a;
          font-weight: 700;
          flex-shrink: 0;
        }
        .home-review-stars-date {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
          margin-bottom: 0.65rem;
        }
        .home-review-date {
          font-size: 0.72rem;
          color: #94a3b8;
          white-space: nowrap;
        }
        .home-review-text {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.58;
          margin: 0 0 0.875rem 0;
          word-break: break-word;
        }
        .home-review-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
          padding-top: 0.6rem;
          border-top: 1px solid #f1f5f9;
        }
        .home-review-service-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(7, 26, 58, 0.06);
          color: #071a3a;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 68%;
        }
        .home-review-open-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.22rem;
          font-size: 0.68rem;
          font-weight: 700;
          color: #d97706;
          white-space: nowrap;
          flex-shrink: 0;
        }

        @media (max-width: 960px) {
          .home-reviews-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.85rem;
          }
        }

        @media (max-width: 640px) {
          .home-reviews-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 0.55rem !important;
          }
          .home-review-card {
            padding: 0.7rem 0.6rem !important;
            border-radius: 0.65rem !important;
          }
          .home-review-header {
            margin-bottom: 0.45rem !important;
          }
          .home-review-user {
            gap: 0.4rem !important;
          }
          .home-review-avatar {
            width: 26px !important;
            height: 26px !important;
            font-size: 0.72rem !important;
            border-radius: 0.3rem !important;
          }
          .home-review-name {
            font-size: 0.76rem !important;
          }
          .home-review-verified-icon {
            display: inline-block !important;
          }
          .home-review-verified-pill {
            display: none !important;
          }
          .home-review-parish {
            font-size: 0.64rem !important;
          }
          .home-review-stars-date {
            margin-bottom: 0.4rem !important;
          }
          .home-review-date {
            font-size: 0.6rem !important;
          }
          .home-review-text {
            font-size: 0.72rem !important;
            line-height: 1.4 !important;
            margin-bottom: 0.5rem !important;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .home-review-footer {
            padding-top: 0.45rem !important;
            gap: 0.25rem !important;
          }
          .home-review-service-badge {
            font-size: 0.6rem !important;
            padding: 0.14rem 0.38rem !important;
            max-width: 58% !important;
          }
          .home-review-open-hint {
            font-size: 0.6rem !important;
          }
        }
      `}</style>
    </section>
  );
}

function getAvatarColor(name: string): string {
  const colors = [
    "#071a3a, #1a3f7a",
    "#7c3aed, #5b21b6",
    "#0369a1, #0284c7",
    "#047857, #059669",
    "#b45309, #d97706",
    "#be123c, #e11d48",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}
