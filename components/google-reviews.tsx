import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { GOOGLE_REVIEWS, CONTRACTOR_INFO } from "@/lib/constants";
import { CLIENTES_FEED_ITEMS } from "@/lib/clientes-data";
import { GoogleG } from "@/components/google-g";

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
    <span className="gf-rs-stars" aria-label={`${n} em 5 estrelas`}>
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
              <span className="gf-rs-stars-txt" aria-label={`${r.rating} em 5 estrelas`}>{"★".repeat(r.rating)}</span>
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

      <style>{`
        .gf-rs { background: #ffffff; padding: 4.5rem 0 4rem; border-bottom: 1px solid #E5E5E3; overflow: hidden; }
        .gf-rs-head {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 2.5rem;
          margin-bottom: 2.75rem;
        }
        .gf-rs-score { display: flex; align-items: center; gap: 0.875rem; padding-right: 2.5rem; border-right: 1px solid #E5E5E3; }
        .gf-rs-num { font-size: 3.5rem; font-weight: 600; letter-spacing: -0.05em; line-height: 0.9; color: #0A0A0A; }
        .gf-rs-meta { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.8125rem; color: #525252; }
        .gf-rs-meta strong { color: #0A0A0A; font-weight: 600; }
        .gf-rs-stars { display: inline-flex; gap: 1px; }
        .gf-rs-stars-txt { color: #FBBC04; font-size: 0.8125rem; letter-spacing: 0.08em; line-height: 1; }
        .gf-rs-title { font-size: clamp(1.375rem, 2.2vw, 1.875rem); font-weight: 600; letter-spacing: -0.03em; color: #0A0A0A; line-height: 1.15; margin: 0; max-width: 420px; }
        .gf-rs-actions { display: flex; gap: 0.625rem; }
        .gf-rs-actions a { padding: 0.8rem 1.2rem; font-size: 0.8125rem; white-space: nowrap; }
        .gf-rs-actions-m { display: none; }
        .gf-rs-rows {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }
        .gf-rs-row { overflow: hidden; }
        .gf-rs-track { display: flex; gap: 0.875rem; width: max-content; animation: gf-rs-scroll 150s linear infinite; }
        .gf-rs-row.is-reverse .gf-rs-track { animation-direction: reverse; animation-duration: 170s; }
        .gf-rs-rows:hover .gf-rs-track, .gf-rs-rows:focus-within .gf-rs-track { animation-play-state: paused; }
        @keyframes gf-rs-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .gf-rs-card {
          display: flex;
          gap: 0.875rem;
          align-items: flex-start;
          width: 340px;
          padding: 1.1rem 1.2rem;
          background: #F4F4F2;
          border: 1px solid transparent;
          text-align: left;
          cursor: pointer;
          font: inherit;
          color: inherit;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .gf-rs-card:hover { background: #ffffff; border-color: #0A0A0A; }
        .gf-rs-card:focus-visible { outline: 2px solid #0A0A0A; outline-offset: 2px; }
        .gf-rs-thumb { position: relative; flex-shrink: 0; width: 64px; height: 64px; overflow: hidden; background: #E5E5E3; }
        .gf-rs-body { display: flex; flex-direction: column; gap: 0.45rem; min-width: 0; }
        .gf-rs-text {
          font-size: 0.875rem;
          line-height: 1.45;
          color: #1F1F1F;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gf-rs-who { font-size: 0.75rem; color: #6B6B6B; }
        .gf-rs-who strong { color: #0A0A0A; font-weight: 600; }
        .gf-rev-pop { border: 0; padding: 0; background: transparent; inset: 0; margin: auto; width: min(620px, calc(100vw - 2rem)); height: fit-content; max-height: 90dvh; overflow: auto; }
        .gf-rev-pop::backdrop { background: rgba(5, 5, 5, 0.85); }
        .gf-rev-modal-card { position: relative; background: #fff; max-width: 620px; width: 100%; padding: 3rem 2.5rem 2.5rem; display: flex; flex-direction: column; border-top: 3px solid #0A0A0A; }
        .gf-rev-close { position: absolute; top: 1rem; right: 1rem; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E3; background: #fff; cursor: pointer; color: #0A0A0A; }
        .gf-rev-modal-tag { margin-top: 1rem; font-size: 0.6875rem; letter-spacing: 0.16em; text-transform: uppercase; color: #6B6B6B; font-weight: 600; }
        .gf-rev-modal-text { font-size: 1.25rem; line-height: 1.5; color: #0A0A0A; letter-spacing: -0.015em; margin: 1rem 0 1.5rem; font-weight: 500; }
        .gf-rev-modal-who { font-size: 0.875rem; color: #6B6B6B; }
        .gf-rev-modal-who strong { color: #0A0A0A; }
        @media (prefers-reduced-motion: reduce) {
          .gf-rs-track { animation: none; }
          .gf-rs-row { overflow-x: auto; }
        }
        @media (max-width: 1024px) {
          .gf-rs-head { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 1.25rem; }
          .gf-rs-score { border-right: 0; padding-right: 0; }
          .gf-rs-title { max-width: none; }
        }
        @media (max-width: 640px) {
          .gf-rs { padding: 3rem 0 2.75rem; }
          .gf-rs-num { font-size: 2.75rem; }
          .gf-rs-title { font-size: 1.25rem; }
          .gf-rs-head { gap: 0.75rem; }
          .gf-rs-head .gf-rs-actions { display: none; }
          .gf-rs-actions-m { display: flex; flex-direction: column; align-items: center; gap: 1rem; margin-top: 1.5rem; }
          .gf-rs-actions-m .btn-dark { width: 100%; }
          .gf-rs-actions-m .link-arrow { padding: 0 0 0.25rem; font-size: 0.8125rem; }
          .gf-rs-head { margin-bottom: 1.75rem; }
          .gf-rs-card { width: 280px; padding: 0.95rem 1rem; }
          .gf-rs-thumb { width: 52px; height: 52px; }
          .gf-rs-rows { gap: 0.6rem; }
          .gf-rs-track { animation-duration: 190s; }
          .gf-rev-modal-card { padding: 2.5rem 1.5rem 1.75rem; }
          .gf-rev-modal-text { font-size: 1.0625rem; }
        }
      `}</style>
    </section>
  );
}
