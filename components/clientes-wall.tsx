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
  const [formatFilter, setFormatFilter] = useState<"all" | "with-photo" | "text-only">("all");
  const [lightboxItem, setLightboxItem] = useState<ClienteFeedItem | null>(null);

  const mainWallItems = CLIENTES_FEED_ITEMS.slice(0, 16).filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesFormat =
      formatFilter === "all"
        ? true
        : formatFilter === "with-photo"
        ? Boolean(item.image)
        : item.type === "review-only";
    return matchesCategory && matchesFormat;
  });

  const bottomTextReviews = CLIENTES_FEED_ITEMS.slice(16).filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesFormat = formatFilter === "with-photo" ? false : true;
    return matchesCategory && matchesFormat;
  });

  return (
    <div>
      {/* ── Barra de Filtros Rápida e Direta ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.65rem",
          marginBottom: "1.4rem",
          alignItems: "center",
        }}
      >
        {/* Filtros por Tipologia de Obra */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
          {CLIENTES_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? CLIENTES_FEED_ITEMS.length
                : CLIENTES_FEED_ITEMS.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.55rem 1.1rem",
                  borderRadius: "2rem",
                  border: isActive ? "2px solid #071a3a" : "1.5px solid #cbd5e1",
                  background: isActive ? "#071a3a" : "#ffffff",
                  color: isActive ? "#fbbf24" : "#334155",
                  fontWeight: isActive ? 800 : 600,
                  fontSize: "0.84rem",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  boxShadow: isActive ? "0 4px 14px rgba(7, 26, 58, 0.18)" : "none",
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    padding: "0.08rem 0.45rem",
                    borderRadius: "1rem",
                    background: isActive ? "rgba(251, 191, 36, 0.2)" : "#f1f5f9",
                    color: isActive ? "#fbbf24" : "#64748b",
                    fontWeight: 700,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub-filtro opcional: Tudo | Com Fotos de Obra | Só Testemunhos */}
        <div
          style={{
            display: "inline-flex",
            background: "#e2e8f0",
            padding: "0.25rem",
            borderRadius: "0.5rem",
            gap: "0.25rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { id: "all", label: "Mistura Completa (Fotos + Reviews)" },
            { id: "with-photo", label: "📷 Com Foto da Obra" },
            { id: "text-only", label: "💬 Só Avaliações Escritas" },
          ].map((tab) => {
            const active = formatFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFormatFilter(tab.id as "all" | "with-photo" | "text-only")}
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  background: active ? "#ffffff" : "transparent",
                  color: active ? "#071a3a" : "#475569",
                  fontWeight: active ? 700 : 600,
                  fontSize: "0.76rem",
                  cursor: "pointer",
                  boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Mosaico Masonry de Clientes & Obras Reais ── */}
      <div className="clientes-masonry">
        {mainWallItems.map((item) => {
          /* ── FORMATO 1: CARTÃO EDITORIAL SÓ DE OPINIÃO (Inspirado nos 4 exemplos da Freitas Renovações) ── */
          if (item.type === "review-only") {
            return (
              <article
                key={item.id}
                className="clientes-card clientes-card-editorial"
                style={{
                  background: "#f8f8f6",
                  border: "1.5px solid #dce1e7",
                  borderRadius: "1rem",
                  padding: "1.85rem 1.65rem",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 6px 22px rgba(7, 26, 58, 0.05)",
                }}
              >
                {/* Pormenor geométrico subtil no canto superior direito (como nos cartões originais) */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "110px",
                    height: "110px",
                    border: "1px solid rgba(7, 26, 58, 0.1)",
                    transform: "rotate(28deg)",
                    pointerEvents: "none",
                  }}
                />

                {/* Topo: Marca + Etiqueta OPINIÕES */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#475569",
                    }}
                  >
                    {item.categoryLabel}
                  </span>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "rgba(22, 163, 74, 0.1)",
                      border: "1px solid rgba(22, 163, 74, 0.25)",
                      borderRadius: "2rem",
                      padding: "0.18rem 0.55rem",
                    }}
                  >
                    <BadgeCheck size={12} style={{ color: "#15803d" }} />
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#15803d" }}>
                      Cliente Verificado
                    </span>
                  </div>
                </div>

                {/* Título Forte (ex: "Casa de banho", "Remodelação de cozinha") */}
                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                    fontSize: "1.65rem",
                    fontWeight: 900,
                    color: "#1e293b",
                    lineHeight: 1.12,
                    letterSpacing: "-0.025em",
                    marginBottom: "1.1rem",
                  }}
                >
                  {item.headline}
                </h3>

                {/* Caixa com moldura fina e aspas grandes (fiel ao design das 4 imagens) */}
                <div
                  style={{
                    border: "1px solid #94a3b8",
                    borderRadius: "0.875rem",
                    padding: "1.5rem 1.35rem 1.25rem",
                    position: "relative",
                    background: "rgba(255, 255, 255, 0.65)",
                  }}
                >
                  {/* Aspas grandes no topo da moldura */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "-1.35rem",
                      left: "1rem",
                      background: "#f8f8f6",
                      padding: "0 0.4rem",
                      fontSize: "2.75rem",
                      lineHeight: 1,
                      fontWeight: 900,
                      color: "#94a3b8",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    &ldquo;
                  </div>

                  {/* Estrelas */}
                  <div style={{ display: "flex", gap: "2px", marginBottom: "0.75rem" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill="#f59e0b" stroke="#f59e0b" />
                    ))}
                  </div>

                  {/* Parágrafos da Review */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {item.quote?.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        style={{
                          color: "#1e293b",
                          fontSize: "0.925rem",
                          lineHeight: 1.62,
                          margin: 0,
                        }}
                      >
                        {pIdx === 0 ? `“${paragraph}` : paragraph}
                        {pIdx === (item.quote?.length || 1) - 1 ? "”" : ""}
                      </p>
                    ))}
                  </div>

                  {/* Destaque de Quebra de Objeção */}
                  {item.highlightTag && (
                    <div
                      style={{
                        marginTop: "1rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        background: "rgba(7, 26, 58, 0.06)",
                        color: "#071a3a",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      <CheckCircle2 size={13} style={{ color: "#d97706", flexShrink: 0 }} />
                      <span>{item.highlightTag}</span>
                    </div>
                  )}

                  {/* Linha divisória + Assinatura do Cliente */}
                  <div
                    style={{
                      marginTop: "1.1rem",
                      paddingTop: "0.85rem",
                      borderTop: "1px solid #cbd5e1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a" }}>
                        {item.clientName}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#475569", marginTop: "0.1rem" }}>
                        {item.location}
                      </div>
                    </div>
                    <MessageSquareQuote size={20} style={{ color: "#cbd5e1" }} />
                  </div>
                </div>

                {/* Rodapé discreto da marca */}
                <div
                  style={{
                    marginTop: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.7rem",
                    color: "#64748b",
                    letterSpacing: "0.04em",
                  }}
                >
                  <span>Grupo Freitas Renovações</span>
                  <span>Alvará IMPIC</span>
                </div>
              </article>
            );
          }

          /* ── FORMATO 2: REVIEW COM FOTO REAL DA OBRA ── */
          if (item.type === "review-with-photo") {
            return (
              <article
                key={item.id}
                className="clientes-card"
                style={{
                  background: "#ffffff",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 8px 26px rgba(7, 26, 58, 0.06)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Imagem da Obra Clicável */}
                <div
                  onClick={() => setLightboxItem(item)}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "270px",
                    background: "#071a3a",
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                  className="clientes-photo-wrapper"
                >
                  <img
                    src={item.image}
                    alt={item.imageAlt || item.headline}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.35s ease",
                    }}
                  />

                  {/* Etiqueta Superior Esquerda */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.85rem",
                      left: "0.85rem",
                      background: "rgba(7, 26, 58, 0.9)",
                      backdropFilter: "blur(6px)",
                      color: "#fbbf24",
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      letterSpacing: "0.05em",
                      padding: "0.3rem 0.65rem",
                      borderRadius: "0.375rem",
                      border: "1px solid rgba(251, 191, 36, 0.35)",
                    }}
                  >
                    {item.categoryLabel}
                  </div>

                  {/* Botão Ampliar Foto */}
                  <button
                    type="button"
                    aria-label="Ampliar fotografia da obra"
                    style={{
                      position: "absolute",
                      top: "0.85rem",
                      right: "0.85rem",
                      background: "rgba(15, 23, 42, 0.75)",
                      color: "#ffffff",
                      border: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: "0.375rem",
                      padding: "0.35rem 0.55rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    <Maximize2 size={12} />
                    <span>Ver Detalhe</span>
                  </button>

                  {/* Barra inferior na foto: Localização */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(7,26,58,0.9) 0%, rgba(7,26,58,0) 100%)",
                      padding: "1.75rem 1rem 0.7rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        color: "#ffffff",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                      }}
                    >
                      <MapPin size={13} style={{ color: "#fbbf24" }} />
                      {item.location}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#34d399",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <Camera size={12} />
                      Foto Real de Obra
                    </span>
                  </div>
                </div>

                {/* Corpo da Avaliação */}
                <div style={{ padding: "1.4rem 1.4rem 1.3rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} fill="#f59e0b" stroke="#f59e0b" />
                      ))}
                    </div>
                    {item.highlightTag && (
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "#b45309",
                          background: "rgba(245, 158, 11, 0.12)",
                          padding: "0.18rem 0.55rem",
                          borderRadius: "1rem",
                        }}
                      >
                        ✓ {item.highlightTag}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      color: "#071a3a",
                      marginBottom: "0.65rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {item.headline}
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {item.quote?.map((paragraph, idx) => (
                      <p
                        key={idx}
                        style={{
                          color: "#334155",
                          fontSize: "0.885rem",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {idx === 0 ? `“${paragraph}` : paragraph}
                        {idx === (item.quote?.length || 1) - 1 ? "”" : ""}
                      </p>
                    ))}
                  </div>

                  {/* Assinatura do Cliente */}
                  <div
                    style={{
                      marginTop: "1.1rem",
                      paddingTop: "0.85rem",
                      borderTop: "1px solid #f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#071a3a" }}>
                        {item.clientName}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        {item.location}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        color: "#16a34a",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                      }}
                    >
                      <BadgeCheck size={14} />
                      <span>Obra Verificada</span>
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
              className="clientes-card clientes-card-photo-only"
              style={{
                background: "#071a3a",
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1.5px solid #1e293b",
                cursor: "pointer",
                position: "relative",
                boxShadow: "0 8px 24px rgba(7, 26, 58, 0.12)",
              }}
            >
              <div style={{ position: "relative", height: "340px", width: "100%", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.imageAlt || item.headline}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.35s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(7,26,58,0.45) 0%, rgba(7,26,58,0.1) 45%, rgba(7,26,58,0.94) 100%)",
                  }}
                />

                {/* Topo */}
                <div
                  style={{
                    position: "absolute",
                    top: "0.85rem",
                    left: "0.85rem",
                    right: "0.85rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(251, 191, 36, 0.95)",
                      color: "#071a3a",
                      fontSize: "0.68rem",
                      fontWeight: 900,
                      padding: "0.28rem 0.65rem",
                      borderRadius: "0.375rem",
                      letterSpacing: "0.04em",
                    }}
                  >
                    📷 {item.categoryLabel}
                  </span>
                  <span
                    style={{
                      background: "rgba(7, 26, 58, 0.8)",
                      color: "#ffffff",
                      padding: "0.3rem 0.55rem",
                      borderRadius: "0.375rem",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <Maximize2 size={12} />
                    Ampliar
                  </span>
                </div>

                {/* Rodapé sobre a foto */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      color: "#fbbf24",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      marginBottom: "0.3rem",
                    }}
                  >
                    <MapPin size={13} />
                    <span>{item.location}</span>
                  </div>
                  <h3
                    style={{
                      color: "#ffffff",
                      fontSize: "1.125rem",
                      fontWeight: 800,
                      marginBottom: "0.35rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {item.headline}
                  </h3>
                  {item.imageCaption && (
                    <p
                      style={{
                        color: "rgba(255,255,255,0.82)",
                        fontSize: "0.8125rem",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.imageCaption}
                    </p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── 10 Reviews Adicionais Sem Imagem (Em Baixo, tudo junto) ── */}
      {bottomTextReviews.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "1.5rem",
            marginTop: "0.25rem",
          }}
        >
            {bottomTextReviews.map((item) => (
              <article
                key={item.id}
                className="clientes-card-editorial"
                style={{
                  background: "#f8f8f6",
                  border: "1.5px solid #dce1e7",
                  borderRadius: "1rem",
                  padding: "1.75rem 1.55rem",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 6px 22px rgba(7, 26, 58, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "110px",
                    height: "110px",
                    border: "1px solid rgba(7, 26, 58, 0.1)",
                    transform: "rotate(28deg)",
                    pointerEvents: "none",
                  }}
                />

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                      marginBottom: "0.7rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#475569",
                      }}
                    >
                      {item.categoryLabel}
                    </span>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        background: "rgba(22, 163, 74, 0.1)",
                        border: "1px solid rgba(22, 163, 74, 0.25)",
                        borderRadius: "2rem",
                        padding: "0.18rem 0.55rem",
                      }}
                    >
                      <BadgeCheck size={12} style={{ color: "#15803d" }} />
                      <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#15803d" }}>
                        Cliente Verificado
                      </span>
                    </div>
                  </div>

                  <h4
                    style={{
                      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                      fontSize: "1.45rem",
                      fontWeight: 900,
                      color: "#1e293b",
                      lineHeight: 1.15,
                      letterSpacing: "-0.02em",
                      marginBottom: "1rem",
                    }}
                  >
                    {item.headline}
                  </h4>

                  <div
                    style={{
                      border: "1px solid #94a3b8",
                      borderRadius: "0.875rem",
                      padding: "1.4rem 1.25rem 1.15rem",
                      position: "relative",
                      background: "rgba(255, 255, 255, 0.65)",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: "-1.3rem",
                        left: "1rem",
                        background: "#f8f8f6",
                        padding: "0 0.4rem",
                        fontSize: "2.6rem",
                        lineHeight: 1,
                        fontWeight: 900,
                        color: "#94a3b8",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      &ldquo;
                    </div>

                    <div style={{ display: "flex", gap: "2px", marginBottom: "0.65rem" }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} fill="#f59e0b" stroke="#f59e0b" />
                      ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                      {item.quote?.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          style={{
                            color: "#1e293b",
                            fontSize: "0.9rem",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {pIdx === 0 ? `“${paragraph}` : paragraph}
                          {pIdx === (item.quote?.length || 1) - 1 ? "”" : ""}
                        </p>
                      ))}
                    </div>

                    {item.highlightTag && (
                      <div
                        style={{
                          marginTop: "0.9rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          background: "rgba(7, 26, 58, 0.06)",
                          color: "#071a3a",
                          padding: "0.22rem 0.6rem",
                          borderRadius: "0.375rem",
                          fontSize: "0.74rem",
                          fontWeight: 700,
                        }}
                      >
                        <CheckCircle2 size={13} style={{ color: "#d97706", flexShrink: 0 }} />
                        <span>{item.highlightTag}</span>
                      </div>
                    )}

                    <div
                      style={{
                        marginTop: "1rem",
                        paddingTop: "0.8rem",
                        borderTop: "1px solid #cbd5e1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>
                          {item.clientName}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#475569", marginTop: "0.1rem" }}>
                          {item.location}
                        </div>
                      </div>
                      <MessageSquareQuote size={19} style={{ color: "#cbd5e1" }} />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.68rem",
                    color: "#64748b",
                    letterSpacing: "0.04em",
                  }}
                >
                  <span>Grupo Freitas Renovações</span>
                  <span>Alvará IMPIC</span>
                </div>
              </article>
            ))}
          </div>
      )}

      {/* ── Lightbox Modal para Ver Fotografia de Obra ao Detalhe ── */}
      {lightboxItem && (
        <div
          onClick={() => setLightboxItem(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(5, 13, 26, 0.88)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.25rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#ffffff",
              borderRadius: "1rem",
              maxWidth: "920px",
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
              <div style={{ background: "#050d1a", textAlign: "center", maxHeight: "520px", overflow: "hidden" }}>
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.imageAlt || lightboxItem.headline}
                  style={{
                    width: "100%",
                    maxHeight: "520px",
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
        .clientes-masonry {
          column-count: 3;
          column-gap: 1.5rem;
        }
        .clientes-card {
          break-inside: avoid;
          margin-bottom: 1.5rem;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .clientes-card:hover {
          transform: translateY(-3px);
        }
        .clientes-photo-wrapper:hover img,
        .clientes-card-photo-only:hover img {
          transform: scale(1.04);
        }
        @media (max-width: 1024px) {
          .clientes-masonry {
            column-count: 2;
          }
        }
        @media (max-width: 680px) {
          .clientes-masonry {
            column-count: 1;
          }
        }
      `}</style>
    </div>
  );
}

