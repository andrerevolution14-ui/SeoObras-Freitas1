"use client";
import Image from "next/image";
import "./clientes-wall.css";


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
          <Maximize2 size={12} style={{ color: "#525252", flexShrink: 0 }} />
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
                        <Star key={s} size={13} fill="#6B6B6B" stroke="#6B6B6B" />
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
                        <CheckCircle2 size={12} style={{ color: "#525252", flexShrink: 0 }} />
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
                    <meta itemProp="name" content="Freitas Renovações" />
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

          if (!item.image) return null;

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
                  <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
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
                      <MapPin size={12} style={{ color: "#D4D4D4", flexShrink: 0 }} />
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
                          <Star key={s} size={13} fill="#6B6B6B" stroke="#6B6B6B" />
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
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
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
            background: "rgba(5, 5, 5, 0.88)",
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
                background: "rgba(10, 10, 10, 0.85)",
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
              <div className="on-dark" style={{ background: "#050505", textAlign: "center", maxHeight: "500px", overflow: "hidden" }}>
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" width={1200} height={800}
                  src={lightboxItem.image}
                  alt={lightboxItem.imageAlt || lightboxItem.headline}
                  title={`${lightboxItem.headline} — ${lightboxItem.location}`}
                  style={{
                    width: "100%",
                    maxHeight: "500px",
                    height: "auto",
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
                    background: "#0A0A0A",
                    color: "#D4D4D4",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "0.25rem",
                  }}
                >
                  {lightboxItem.categoryLabel}
                </span>
                <span style={{ fontSize: "0.8125rem", color: "#6B6B6B", fontWeight: 600 }}>
                  📍 {lightboxItem.location}
                </span>
              </div>

              <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0A0A0A", marginBottom: "0.75rem" }}>
                {lightboxItem.headline}
              </h3>

              {lightboxItem.quote ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
                  {lightboxItem.quote.map((p, i) => (
                    <p key={i} style={{ color: "#3A3A3A", fontSize: "0.9375rem", lineHeight: 1.65, margin: 0 }}>
                      {i === 0 ? `“${p}` : p}
                      {i === lightboxItem.quote!.length - 1 ? "”" : ""}
                    </p>
                  ))}
                  {lightboxItem.clientName && (
                    <div style={{ fontWeight: 800, color: "#0A0A0A", fontSize: "0.9rem", marginTop: "0.25rem" }}>
                      — {lightboxItem.clientName} ({lightboxItem.location})
                    </div>
                  )}
                </div>
              ) : (
                lightboxItem.imageCaption && (
                  <p style={{ color: "#3A3A3A", fontSize: "0.9375rem", lineHeight: 1.65, marginBottom: "1rem" }}>
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
                  borderTop: "1px solid #E5E5E3",
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
                    background: "#F2F2F0",
                    color: "#0A0A0A",
                    border: "1px solid #D4D4D2",
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


    </div>
  );
}
