import "./google-reviews.css";
import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { GOOGLE_REVIEWS, CONTRACTOR_INFO } from "@/lib/constants";
import { CLIENTES_FEED_ITEMS } from "@/lib/clientes-data";
import { GoogleG } from "@/components/google-g";
import { PopoverFallback } from "@/components/popover-fallback";

interface ReviewCard {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  full: string;
  tag: string;
  image?: string;
  imageAlt?: string;
}

function Stars({ n = 5, size = 12 }: { n?: number; size?: number }) {
  return (
    <span role="img" className="gf-rs-stars" aria-label={`${n} em 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < n ? "#FBBC04" : "none"} stroke={i < n ? "#FBBC04" : "#D4D4D2"} />
      ))}
    </span>
  );
}

function firstSentence(t: string, max = 120) {
  const m = t.match(/^.*?[.!?](?=\s|$)/);
  const s = m ? m[0] : t;
  return s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s;
}

/** Faixa de avaliações — mostra rapidamente a quantidade e a qualidade das opiniões. */
export function GoogleReviews() {
  const cards: ReviewCard[] = (() => {
    const google = GOOGLE_REVIEWS.map((r) => ({
      id: r.id,
      name: r.name,
      location: r.parish,
      rating: r.rating,
      text: firstSentence(r.text),
      full: r.text,
      tag: r.service,
    }));
    const seen = new Set(google.map((g) => g.name));
    const clientes = CLIENTES_FEED_ITEMS.filter((c) => c.clientName && c.quote?.length && !seen.has(c.clientName)).map((c) => ({
      id: c.id,
      name: c.clientName as string,
      location: c.location,
      rating: c.rating ?? 5,
      text: firstSentence(c.quote![0]),
      full: c.quote!.join(" "),
      tag: c.headline,
      image: c.image,
      imageAlt: c.imageAlt,
    }));
    return [...google, ...clientes];
  })();

  const half = Math.ceil(cards.length / 2);
  const rowA = cards.slice(0, half);
  const rowB = cards.slice(half);

  const renderRow = (row: ReviewCard[], reverse = false, extra = "") => (
    <div className={`gf-rs-row${reverse ? " is-reverse" : ""} ${extra}`}>
      <div className="gf-rs-track">
        {[...row, ...row].map((r, i) => (
          <button
            key={`${r.id}-${i}`}
            type="button"
            className="gf-rs-card"
            popoverTarget={`rev-${r.id}`}
            aria-label={`Ler avaliação de ${r.name}`}
            tabIndex={i >= row.length ? -1 : 0}
          >
            {r.image && (
              <span className="gf-rs-thumb">
                <Image src={r.image} alt={r.imageAlt || r.tag} fill sizes="64px" style={{ objectFit: "cover" }} />
              </span>
            )}
            <span className="gf-rs-body">
              <span role="img" className="gf-rs-stars-txt" aria-label={`${r.rating} em 5 estrelas`}>{"★".repeat(r.rating)}</span>
              <span className="gf-rs-text">&ldquo;{r.text}&rdquo;</span>
              <span className="gf-rs-who">
                <strong>{r.name}</strong> · {r.location}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="gf-rs" id="reviews" aria-label="Avaliações de clientes">
      <PopoverFallback />
      <div className="section-container">
        <div className="gf-rs-head" data-reveal>
          <div className="gf-rs-score">
            <GoogleG size={34} />
            <span className="gf-rs-num font-display">{CONTRACTOR_INFO.googleRating}</span>
            <span className="gf-rs-meta">
              <Stars size={16} />
              <span>
                <strong>{CONTRACTOR_INFO.reviewCount} avaliações</strong> verificadas no Google
              </span>
            </span>
          </div>
          <h2 className="gf-rs-title font-display">
            O que dizem os nossos clientes em Aveiro
          </h2>
          <div className="gf-rs-actions">
            <a href={CONTRACTOR_INFO.socialLinks.google} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">
              Ver no Google <ArrowUpRight size={15} />
            </a>
            <Link href="/clientes" className="btn-dark">
              {cards.length}+ testemunhos com fotos <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <div className="gf-rs-rows">
        {renderRow(rowA)}
        {renderRow(rowB, true)}
      </div>

      <div className="section-container gf-rs-actions gf-rs-actions-m">
        <Link href="/clientes" className="btn-dark">
          Ver {cards.length}+ testemunhos com fotos <ArrowRight size={15} />
        </Link>
        <a href={CONTRACTOR_INFO.socialLinks.google} target="_blank" rel="noopener noreferrer" className="link-arrow">
          Ver as {CONTRACTOR_INFO.reviewCount} avaliações no Google <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="section-container gf-rs-social">
        <span>Veja as obras em curso no</span>
        <a href={CONTRACTOR_INFO.socialLinks.instagram} target="_blank" rel="noopener noreferrer me">Instagram</a>
        <span>·</span>
        <a href={CONTRACTOR_INFO.socialLinks.facebook} target="_blank" rel="noopener noreferrer me">Facebook</a>
      </div>

      {cards.map((r) => (
        <div key={r.id} id={`rev-${r.id}`} popover="auto" className="gf-rev-pop" aria-label={`Avaliação de ${r.name}`}>
          <div className="gf-rev-modal-card">
            <button type="button" className="gf-rev-close" popoverTarget={`rev-${r.id}`} popoverTargetAction="hide" aria-label="Fechar">
              <X size={18} />
            </button>
            <span className="gf-rs-stars-txt" style={{ fontSize: "1rem" }}>{"★".repeat(r.rating)}</span>
            <p className="gf-rev-modal-tag">{r.tag}</p>
            <p className="gf-rev-modal-text font-display">&ldquo;{r.full}&rdquo;</p>
            <p className="gf-rev-modal-who">
              <strong>{r.name}</strong> · {r.location}
            </p>
            <Link href="/clientes" className="link-arrow" style={{ marginTop: "1.5rem" }}>
              Ver mais obras e opiniões <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ))}


    </section>
  );
}
