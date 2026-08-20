"use client";

import { Star, BadgeCheck } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/constants";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          fill={i < rating ? "#f59e0b" : "none"}
          stroke={i < rating ? "#f59e0b" : "#cbd5e1"}
        />
      ))}
    </div>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
}

export function GoogleReviews() {
  return (
    <section
      className="section-padding"
      id="reviews"
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p className="section-eyebrow">Avaliações Verificadas</p>
          <h2 className="section-title">
            O que dizem os nossos clientes em Aveiro
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "#ffffff",
              border: "1.5px solid #e2e8f0",
              borderRadius: "0.375rem",
              padding: "0.625rem 1.25rem",
              marginTop: "0.75rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            <div className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} fill="#f59e0b" stroke="#f59e0b" />
              ))}
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: "1.125rem", color: "#022c22" }}>4.9</span>
              <span style={{ color: "#64748b", fontSize: "0.875rem" }}> / 5 · 48 avaliações reais no Google</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {GOOGLE_REVIEWS.map((review) => (
            <div key={review.id} className="testimonial-card">
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.875rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "0.375rem",
                      background: `linear-gradient(135deg, ${getAvatarColor(review.name)})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      color: "#ffffff",
                      fontSize: "0.9375rem",
                      flexShrink: 0,
                    }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.9375rem", color: "#022c22" }}>
                      {review.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      📍 {review.parish}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    background: "rgba(34, 197, 94, 0.08)",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                    borderRadius: "0.25rem",
                    padding: "0.2rem 0.5rem",
                    flexShrink: 0,
                  }}
                >
                  <BadgeCheck size={12} style={{ color: "#16a34a" }} />
                  <span style={{ fontSize: "0.6875rem", color: "#16a34a", fontWeight: 700 }}>Verificado</span>
                </div>
              </div>

              {/* Stars + Date */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
                <StarRating rating={review.rating} />
                <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{formatDate(review.date)}</span>
              </div>

              {/* Review text */}
              <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "0.875rem" }}>
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Service badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "rgba(2, 44, 34, 0.06)",
                  color: "#022c22",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "0.2rem 0.625rem",
                  borderRadius: "0.25rem",
                }}
              >
                🔧 {review.service}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="https://g.page/freitas-renovacoes"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#d97706",
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
              padding: "0.625rem 1.25rem",
              border: "1.5px solid rgba(245, 158, 11, 0.3)",
              borderRadius: "0.375rem",
              background: "rgba(251, 191, 36, 0.08)",
              transition: "all 0.2s",
            }}
          >
            <Star size={15} />
            Ver todas as avaliações no Google
          </a>
        </div>
      </div>
    </section>
  );
}

function getAvatarColor(name: string): string {
  const colors = [
    "#022c22, #065f46",
    "#7c3aed, #5b21b6",
    "#0369a1, #0284c7",
    "#047857, #059669",
    "#b45309, #d97706",
    "#be123c, #e11d48",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}
