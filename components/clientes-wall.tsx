"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  MapPin,
  BadgeCheck,
  CheckCircle2,
  Camera,
  MessageSquareQuote,
  Maximize2,
  X,
  ArrowRight,
  Phone,
} from "lucide-react";
import {
  CLIENTES_CATEGORIES,
  CLIENTES_FEED_ITEMS,
  ClienteCategory,
  ClienteFeedItem,
} from "@/lib/clientes-data";
import { CONTRACTOR_INFO } from "@/lib/constants";

export function ClientesWall() {
  const [selectedCategory, setSelectedCategory] = useState<ClienteCategory>("all");
  const [lightboxItem, setLightboxItem] = useState<ClienteFeedItem | null>(null);

  const filteredItems = CLIENTES_FEED_ITEMS.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  return (
    <div>
      {/* ── Barra de Filtros Compacta e Centrada + Nota de Leitura ── */}
      <div className="clientes-filter-dock-wrap">
        <div className="clientes-filter-dock" role="tablist" aria-label="Filtrar obras e opiniões por categoria">
          {CLIENTES_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat.id)}
                className={`clientes-filter-pill ${isActive ? "is-active" : ""}`}
              >
                <span>{cat.label}</span>
                {cat.count !== undefined && (
                  <span className="clientes-filter-count">{cat.count}</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="clientes-tap-hint">
          <Maximize2 size={12} style={{ color: "#d97706", flexShrink: 0 }} />
          <span>Pode tocar em qualquer avaliação ou foto para abrir e ler completa</span>
        </div>
      </div>

      {/* ── Grelha Unificada (CSS Grid) de Clientes & Obras Reais ── */}
      <div className="clientes-grid">
        {filteredItems.map((item) => {
          const seoImageTitle = `${item.headline} em ${item.location} — Freitas Renovações Aveiro`;

          /* ── FORMATO 1: CARTÃO EDITORIAL SÓ DE OPINIÃO ── */
          if (item.type === "review-only") {
            return (
              <article
                key={item.id}
                onClick={() => setLightboxItem(item)}
                itemScope
                itemType="https://schema.org/Review"
                className="clientes-card clientes-card-editorial"
              >
                <div
                  aria-hidden="true"
                  className="editorial-corner-shape"
                />

                <div>
                  {/* Topo: Etiqueta OPINIÕES + Cliente Verificado */}
                  <div className="clientes-card-top-row">
                    <span className="clientes-category-eyebrow">
                      {item.categoryLabel}
                    </span>
                    <div className="clientes-verified-pill">
                      <BadgeCheck size={12} style={{ color: "#15803d", flexShrink: 0 }} />
                      <span>Verificado</span>
                    </div>
                  </div>

                  {/* Título Forte */}
                  <h3 itemProp="name" className="editorial-headline">
                    {item.headline}
                  </h3>

                  {/* Caixa com moldura fina e aspas grandes */}
                  <div className="editorial-quote-box">
                    <div aria-hidden="true" className="editorial-quote-mark">
                      &ldquo;
                    </div>

                    {/* Estrelas */}
                    <div
                      itemProp="reviewRating"
                      itemScope
                      itemType="https://schema.org/Rating"
                      className="clientes-stars-row"
                    >
                      <meta itemProp="ratingValue" content={String(item.rating || 5)} />
                      <meta itemProp="bestRating" content="5" />
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={13} fill="#f59e0b" stroke="#f59e0b" />
                      ))}
                    </div>

                    {/* Parágrafos da Review */}
                    <div itemProp="reviewBody" className="clientes-quote-text">
                      {item.quote?.map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {pIdx === 0 ? `“${paragraph}` : paragraph}
                          {pIdx === (item.quote?.length || 1) - 1 ? "”" : ""}
                        </p>
                      ))}
                    </div>

                    {/* Destaque de Quebra de Objeção */}
                    {item.highlightTag && (
                      <div className="clientes-highlight-tag">
                        <CheckCircle2 size={12} style={{ color: "#d97706", flexShrink: 0 }} />
                        <span>{item.highlightTag}</span>
                      </div>
                    )}

                    {/* Linha divisória + Assinatura do Cliente */}
                    <div
                      itemProp="author"
                      itemScope
                      itemType="https://schema.org/Person"
                      className="clientes-author-footer"
                    >
                      <div>
                        <div itemProp="name" className="clientes-author-name">
                          {item.clientName}
                        </div>
                        <div className="clientes-author-loc">
                          {item.location}
                        </div>
                      </div>
                      <MessageSquareQuote size={18} className="clientes-quote-icon" />
                    </div>
                  </div>
                </div>

                {/* Rodapé discreto da marca + Abrir review */}
                <div className="editorial-brand-footer">
                  <span itemProp="itemReviewed" itemScope itemType="https://schema.org/LocalBusiness">
                    <meta itemProp="name" content="Freitas Renovações LDA" />
                    Freitas Renovações
                  </span>
                  <span className="clientes-open-review-label">
                    <span>Abrir review</span>
                    <Maximize2 size={10} />
                  </span>
                </div>
              </article>
            );
          }

          /* ── FORMATO 2: REVIEW COM FOTO REAL DA OBRA ── */
          if (item.type === "review-with-photo") {
            return (
              <article
                key={item.id}
                onClick={() => setLightboxItem(item)}
                itemScope
                itemType="https://schema.org/Review"
                className="clientes-card clientes-card-with-photo"
              >
                {/* Imagem da Obra Clicável com SEO Completo */}
                <div className="clientes-photo-wrapper">
                  <img
                    src={item.image}
                    alt={item.imageAlt || seoImageTitle}
                    title={seoImageTitle}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    itemProp="image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.35s ease",
                    }}
                  />

                  {/* Etiqueta Superior Esquerda */}
                  <div className="photo-badge-top-left">
                    {item.categoryLabel}
                  </div>

                  {/* Botão Ampliar Foto */}
                  <button
                    type="button"
                    aria-label={`Ampliar fotografia: ${seoImageTitle}`}
                    className="photo-zoom-btn"
                  >
                    <Maximize2 size={11} />
                    <span className="zoom-label-text">Ampliar</span>
                  </button>

                  {/* Barra inferior na foto: Localização */}
                  <div className="photo-bottom-bar">
                    <span className="photo-loc-tag">
                      <MapPin size={12} style={{ color: "#fbbf24", flexShrink: 0 }} />
                      <span>{item.location}</span>
                    </span>
                    <span className="photo-real-tag">
                      <Camera size={11} />
                      <span>Obra Real</span>
                    </span>
                  </div>
                </div>

                {/* Corpo da Avaliação */}
                <div className="clientes-card-body">
                  <div>
                    <div className="clientes-rating-tag-row">
                      <div
                        itemProp="reviewRating"
                        itemScope
                        itemType="https://schema.org/Rating"
                        style={{ display: "flex", gap: "2px" }}
                      >
                        <meta itemProp="ratingValue" content={String(item.rating || 5)} />
                        <meta itemProp="bestRating" content="5" />
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={13} fill="#f59e0b" stroke="#f59e0b" />
                        ))}
                      </div>
                      {item.highlightTag && (
                        <span className="clientes-amber-pill">
                          ✓ {item.highlightTag}
                        </span>
                      )}
                    </div>

                    <h3 itemProp="name" className="clientes-photo-card-title">
                      {item.headline}
                    </h3>

                    <div itemProp="reviewBody" className="clientes-quote-text">
                      {item.quote?.map((paragraph, idx) => (
                        <p key={idx}>
                          {idx === 0 ? `“${paragraph}` : paragraph}
                          {idx === (item.quote?.length || 1) - 1 ? "”" : ""}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Assinatura do Cliente + Abrir review */}
                  <div
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                    className="clientes-photo-author-row"
                  >
                    <div style={{ minWidth: 0 }}>
                      <div itemProp="name" className="clientes-author-name">
                        {item.clientName}
                      </div>
                      <div className="clientes-author-loc">
                        {item.location}
                      </div>
                    </div>

                    <div className="clientes-open-review-label">
                      <span>Abrir review</span>
                      <Maximize2 size={10} />
                    </div>
                  </div>
                </div>
              </article>
            );
          }

          /* ── FORMATO 3: SÓ IMAGEM (REGISTO VISUAL DE OBRA REAL) ── */
          return (
            <article
              key={item.id}
              onClick={() => setLightboxItem(item)}
              itemScope
              itemType="https://schema.org/ImageObject"
              className="clientes-card clientes-card-photo-only"
            >
              <div className="photo-only-inner">
                <img
                  src={item.image}
                  alt={item.imageAlt || seoImageTitle}
                  title={seoImageTitle}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  itemProp="contentUrl"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.35s ease",
                  }}
                />
                <meta itemProp="name" content={item.headline} />
                <meta itemProp="description" content={item.imageAlt || item.imageCaption || item.headline} />
                <meta itemProp="contentLocation" content={`${item.location}, Aveiro, Portugal`} />

                <div className="photo-only-overlay" />

                {/* Topo */}
                <div className="photo-only-top">
                  <span className="photo-only-badge">
                    📷 {item.categoryLabel}
                  </span>
                  <span className="photo-only-zoom">
                    <Maximize2 size={11} />
                    <span className="zoom-label-text">Ampliar</span>
                  </span>
                </div>

                {/* Rodapé sobre a foto */}
                <div className="photo-only-bottom">
                  <div className="photo-only-loc">
                    <MapPin size={12} />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="photo-only-title">
                    {item.headline}
                  </h3>
                  {item.imageCaption && (
                    <p itemProp="caption" className="photo-only-caption">
                      {item.imageCaption}
                    </p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Lightbox Modal para Ver Fotografia / Testemunho ao Detalhe ── */}
      {lightboxItem && (
        <div
          onClick={() => setLightboxItem(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 110,
            background: "rgba(5, 13, 26, 0.88)",
            backdropFilter: "blur(8px)",
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
              borderRadius: "1rem",
              maxWidth: "860px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Fechar janela"
              style={{
                position: "absolute",
                top: "0.85rem",
                right: "0.85rem",
                zIndex: 10,
                background: "rgba(7, 26, 58, 0.85)",
                color: "#ffffff",
                border: "none",
                borderRadius: "50%",
                width: "38px",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>

            {lightboxItem.image && (
              <div style={{ background: "#050d1a", textAlign: "center", maxHeight: "500px", overflow: "hidden" }}>
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.imageAlt || lightboxItem.headline}
                  title={`${lightboxItem.headline} — ${lightboxItem.location}`}
                  style={{
                    width: "100%",
                    maxHeight: "500px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            )}

            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    background: "#071a3a",
                    color: "#fbbf24",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "0.25rem",
                  }}
                >
                  {lightboxItem.categoryLabel}
                </span>
                <span style={{ fontSize: "0.8125rem", color: "#64748b", fontWeight: 600 }}>
                  📍 {lightboxItem.location}
                </span>
              </div>

              <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#071a3a", marginBottom: "0.75rem" }}>
                {lightboxItem.headline}
              </h3>

              {lightboxItem.quote ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
                  {lightboxItem.quote.map((p, i) => (
                    <p key={i} style={{ color: "#334155", fontSize: "0.9375rem", lineHeight: 1.65, margin: 0 }}>
                      {i === 0 ? `“${p}` : p}
                      {i === lightboxItem.quote!.length - 1 ? "”" : ""}
                    </p>
                  ))}
                  {lightboxItem.clientName && (
                    <div style={{ fontWeight: 800, color: "#071a3a", fontSize: "0.9rem", marginTop: "0.25rem" }}>
                      — {lightboxItem.clientName} ({lightboxItem.location})
                    </div>
                  )}
                </div>
              ) : (
                lightboxItem.imageCaption && (
                  <p style={{ color: "#334155", fontSize: "0.9375rem", lineHeight: 1.65, marginBottom: "1rem" }}>
                    {lightboxItem.imageCaption}
                  </p>
                )
              )}

              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                  paddingTop: "1rem",
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <Link
                  href="/orcamento"
                  className="btn-primary"
                  style={{ fontSize: "0.85rem", padding: "0.65rem 1.2rem" }}
                >
                  <span>Pedir Orçamento para Obra Semelhante</span>
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={`tel:${CONTRACTOR_INFO.phone}`}
                  className="btn-secondary"
                  style={{
                    fontSize: "0.85rem",
                    padding: "0.65rem 1.2rem",
                    background: "#f1f5f9",
                    color: "#071a3a",
                    border: "1px solid #cbd5e1",
                  }}
                >
                  <Phone size={15} />
                  <span>{CONTRACTOR_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ── Barra de Filtros ── */
        .clientes-filter-dock-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          margin-bottom: 1.25rem;
        }
        .clientes-tap-hint {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          font-weight: 600;
          color: #64748b;
          text-align: center;
        }
        .clientes-open-review-label {
          display: inline-flex;
          align-items: center;
          gap: 0.22rem;
          font-size: 0.68rem;
          font-weight: 700;
          color: #d97706;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .clientes-filter-dock {
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.35rem;
          background: #ffffff;
          padding: 0.32rem;
          border-radius: 999px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px rgba(7, 26, 58, 0.05);
          max-width: 100%;
        }
        .clientes-filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.95rem;
          border-radius: 999px;
          border: 1px solid transparent;
          background: transparent;
          color: #334155;
          font-weight: 600;
          font-size: 0.84rem;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .clientes-filter-pill:hover {
          background: #f8fafc;
          color: #071a3a;
        }
        .clientes-filter-pill.is-active {
          background: #071a3a;
          color: #fbbf24;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(7, 26, 58, 0.18);
        }
        .clientes-filter-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.06rem 0.4rem;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 800;
          background: #f1f5f9;
          color: #64748b;
        }
        .clientes-filter-pill.is-active .clientes-filter-count {
          background: rgba(251, 191, 36, 0.18);
          color: #fbbf24;
        }

        /* ── Grelha Unificada (CSS Grid em Desktop, Tablet e Mobile) ── */
        .clientes-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
          align-items: stretch;
          width: 100%;
          max-width: 100%;
        }

        .clientes-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          cursor: pointer;
          height: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .clientes-card:hover {
          transform: translateY(-3px);
        }

        /* ── Cartão Editorial (Só Opinião) ── */
        .clientes-card-editorial {
          background: #f8f8f6;
          border: 1.5px solid #dce1e7;
          border-radius: 1rem;
          padding: 1.65rem 1.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 6px 22px rgba(7, 26, 58, 0.05);
        }
        .editorial-corner-shape {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100px;
          height: 100px;
          border: 1px solid rgba(7, 26, 58, 0.09);
          transform: rotate(28deg);
          pointer-events: none;
        }
        .clientes-card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
          margin-bottom: 0.65rem;
        }
        .clientes-category-eyebrow {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #475569;
        }
        .clientes-verified-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.22rem;
          background: rgba(22, 163, 74, 0.1);
          border: 1px solid rgba(22, 163, 74, 0.25);
          border-radius: 2rem;
          padding: 0.16rem 0.5rem;
          font-size: 0.66rem;
          font-weight: 700;
          color: #15803d;
          white-space: nowrap;
        }
        .editorial-headline {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-size: 1.4rem;
          font-weight: 900;
          color: #1e293b;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 0.95rem;
        }
        .editorial-quote-box {
          border: 1px solid #94a3b8;
          border-radius: 0.875rem;
          padding: 1.35rem 1.2rem 1.1rem;
          position: relative;
          background: rgba(255, 255, 255, 0.68);
        }
        .editorial-quote-mark {
          position: absolute;
          top: -1.25rem;
          left: 0.9rem;
          background: #f8f8f6;
          padding: 0 0.35rem;
          font-size: 2.5rem;
          line-height: 1;
          font-weight: 900;
          color: #94a3b8;
          font-family: Georgia, serif;
        }
        .clientes-stars-row {
          display: flex;
          gap: 2px;
          margin-bottom: 0.6rem;
        }
        .clientes-quote-text {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .clientes-quote-text p {
          color: #1e293b;
          font-size: 0.885rem;
          line-height: 1.58;
          margin: 0;
        }
        .clientes-highlight-tag {
          margin-top: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(7, 26, 58, 0.06);
          color: #071a3a;
          padding: 0.22rem 0.55rem;
          border-radius: 0.375rem;
          font-size: 0.72rem;
          font-weight: 700;
        }
        .clientes-author-footer {
          margin-top: 0.95rem;
          padding-top: 0.75rem;
          border-top: 1px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
        }
        .clientes-author-name {
          font-weight: 800;
          font-size: 0.9rem;
          color: #0f172a;
        }
        .clientes-author-loc {
          font-size: 0.75rem;
          color: #475569;
          margin-top: 0.05rem;
        }
        .clientes-quote-icon {
          color: #cbd5e1;
          flex-shrink: 0;
        }
        .editorial-brand-footer {
          margin-top: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.68rem;
          color: #64748b;
          letter-spacing: 0.03em;
        }

        /* ── Cartão com Foto + Review ── */
        .clientes-card-with-photo {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 8px 26px rgba(7, 26, 58, 0.06);
        }
        .clientes-photo-wrapper {
          position: relative;
          width: 100%;
          height: 240px;
          background: #071a3a;
          overflow: hidden;
          flex-shrink: 0;
        }
        .clientes-photo-wrapper:hover img,
        .clientes-card-photo-only:hover img {
          transform: scale(1.04);
        }
        .photo-badge-top-left {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: rgba(7, 26, 58, 0.9);
          backdrop-filter: blur(6px);
          color: #fbbf24;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          padding: 0.25rem 0.6rem;
          border-radius: 0.375rem;
          border: 1px solid rgba(251, 191, 36, 0.35);
        }
        .photo-zoom-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(15, 23, 42, 0.75);
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 0.375rem;
          padding: 0.3rem 0.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.68rem;
          font-weight: 700;
          cursor: pointer;
        }
        .photo-bottom-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(7,26,58,0.92) 0%, rgba(7,26,58,0) 100%);
          padding: 1.5rem 0.85rem 0.6rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
        }
        .photo-loc-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .photo-real-tag {
          font-size: 0.68rem;
          color: #34d399;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.22rem;
          white-space: nowrap;
        }
        .clientes-card-body {
          padding: 1.25rem 1.3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
        }
        .clientes-rating-tag-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-bottom: 0.45rem;
        }
        .clientes-amber-pill {
          font-size: 0.68rem;
          font-weight: 700;
          color: #b45309;
          background: rgba(245, 158, 11, 0.12);
          padding: 0.16rem 0.5rem;
          border-radius: 1rem;
        }
        .clientes-photo-card-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #071a3a;
          margin-bottom: 0.55rem;
          line-height: 1.25;
        }
        .clientes-photo-author-row {
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
        }
        .clientes-verified-inline {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          color: #16a34a;
          font-size: 0.7rem;
          font-weight: 700;
          white-space: nowrap;
        }

        /* ── Cartão Só Foto ── */
        .clientes-card-photo-only {
          background: #071a3a;
          border-radius: 1rem;
          overflow: hidden;
          border: 1.5px solid #1e293b;
          position: relative;
          box-shadow: 0 8px 24px rgba(7, 26, 58, 0.12);
        }
        .photo-only-inner {
          position: relative;
          height: 100%;
          min-height: 340px;
          width: 100%;
          overflow: hidden;
        }
        .photo-only-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7,26,58,0.45) 0%, rgba(7,26,58,0.1) 45%, rgba(7,26,58,0.94) 100%);
        }
        .photo-only-top {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          right: 0.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.4rem;
        }
        .photo-only-badge {
          background: rgba(251, 191, 36, 0.95);
          color: #071a3a;
          font-size: 0.65rem;
          font-weight: 900;
          padding: 0.25rem 0.6rem;
          border-radius: 0.375rem;
          letter-spacing: 0.03em;
        }
        .photo-only-zoom {
          background: rgba(7, 26, 58, 0.8);
          color: #ffffff;
          padding: 0.28rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.68rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.22rem;
        }
        .photo-only-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.15rem;
        }
        .photo-only-loc {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: #fbbf24;
          font-size: 0.72rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .photo-only-title {
          color: #ffffff;
          font-size: 1.05rem;
          font-weight: 800;
          margin-bottom: 0.3rem;
          line-height: 1.25;
        }
        .photo-only-caption {
          color: rgba(255,255,255,0.82);
          font-size: 0.78rem;
          line-height: 1.45;
          margin: 0;
        }

        /* ── Tablet (2 Colunas em Grade) ── */
        @media (max-width: 1024px) {
          .clientes-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.15rem;
          }
        }

        /* ── Mobile (2 Colunas em Grade Elegante, Centrado e Suave) ── */
        @media (max-width: 768px) {
          .clientes-filter-dock-wrap {
            margin-bottom: 0.9rem;
            gap: 0.45rem;
          }
          .clientes-tap-hint {
            font-size: 0.7rem;
          }
          .clientes-filter-dock {
            background: #ffffff;
            border: 1px solid #dbe2ea;
            box-shadow: 0 2px 10px rgba(7, 26, 58, 0.04);
            padding: 0.25rem;
            gap: 0.28rem;
            border-radius: 0.75rem;
          }
          .clientes-filter-pill {
            padding: 0.34rem 0.65rem;
            font-size: 0.74rem;
            gap: 0.28rem;
            background: transparent;
            border: none;
            border-radius: 0.5rem;
          }
          .clientes-filter-pill.is-active {
            background: #071a3a;
            color: #fbbf24;
          }
          .clientes-filter-count {
            font-size: 0.64rem;
            padding: 0.04rem 0.32rem;
          }
        }

        @media (max-width: 640px) {
          .clientes-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.55rem;
          }
          .clientes-open-review-label {
            font-size: 0.58rem;
            gap: 0.16rem;
          }
          .clientes-card-editorial {
            padding: 0.85rem 0.7rem;
            border-radius: 0.85rem;
          }
          .editorial-corner-shape {
            display: none;
          }
          .clientes-card-top-row {
            margin-bottom: 0.4rem;
          }
          .clientes-category-eyebrow {
            font-size: 0.56rem;
            letter-spacing: 0.06em;
          }
          .clientes-verified-pill {
            padding: 0.1rem 0.35rem;
            font-size: 0.56rem;
          }
          .editorial-headline {
            font-size: 0.92rem;
            margin-bottom: 0.55rem;
            line-height: 1.2;
          }
          .editorial-quote-box {
            padding: 0.75rem 0.6rem 0.65rem;
            border-radius: 0.65rem;
          }
          .editorial-quote-mark {
            font-size: 1.5rem;
            top: -0.75rem;
            left: 0.45rem;
            padding: 0 0.2rem;
          }
          .clientes-stars-row {
            margin-bottom: 0.35rem;
          }
          .clientes-quote-text {
            gap: 0.35rem;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .clientes-quote-text p {
            font-size: 0.74rem;
            line-height: 1.42;
            display: inline;
          }
          .clientes-quote-text p::after {
            content: " ";
          }
          .clientes-highlight-tag {
            margin-top: 0.5rem;
            padding: 0.16rem 0.4rem;
            font-size: 0.6rem;
          }
          .clientes-author-footer,
          .clientes-photo-author-row {
            margin-top: 0.6rem;
            padding-top: 0.5rem;
          }
          .clientes-author-name {
            font-size: 0.76rem;
          }
          .clientes-author-loc {
            font-size: 0.64rem;
          }
          .clientes-quote-icon {
            display: none;
          }
          .editorial-brand-footer {
            margin-top: 0.5rem;
            font-size: 0.56rem;
          }
          .clientes-photo-wrapper {
            height: 140px;
          }
          .photo-badge-top-left,
          .photo-only-badge {
            top: 0.45rem;
            left: 0.45rem;
            font-size: 0.54rem;
            padding: 0.18rem 0.42rem;
          }
          .photo-zoom-btn,
          .photo-only-zoom {
            top: 0.45rem;
            right: 0.45rem;
            padding: 0.22rem 0.35rem;
          }
          .zoom-label-text {
            display: none;
          }
          .photo-bottom-bar {
            padding: 1rem 0.5rem 0.4rem;
          }
          .photo-loc-tag {
            font-size: 0.62rem;
          }
          .photo-real-tag {
            display: none;
          }
          .clientes-card-body {
            padding: 0.75rem 0.65rem;
          }
          .clientes-amber-pill {
            display: none;
          }
          .clientes-photo-card-title {
            font-size: 0.88rem;
            margin-bottom: 0.35rem;
            line-height: 1.2;
          }
          .clientes-verified-inline span {
            display: none;
          }
          .photo-only-inner {
            min-height: 230px;
          }
          .photo-only-bottom {
            padding: 0.65rem;
          }
          .photo-only-loc {
            font-size: 0.62rem;
          }
          .photo-only-title {
            font-size: 0.86rem;
            margin-bottom: 0.2rem;
          }
          .photo-only-caption {
            font-size: 0.68rem;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
}
