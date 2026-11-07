import { SERVICES } from "@/lib/constants";

/** Faixa tipográfica em movimento com os serviços — dá ritmo entre secções. */
export function ServiceMarquee() {
  const items = SERVICES.map((s) => s.shortTitle);
  const row = [...items, ...items];
  return (
    <div className="gf-marquee" aria-hidden="true">
      <div className="gf-marquee-track">
        {row.map((t, i) => (
          <span key={i} className="gf-marquee-item font-display">
            {t}
            <span className="gf-marquee-sep" />
          </span>
        ))}
      </div>
      <style>{`
        .gf-marquee { overflow: hidden; background: #ffffff; border-top: 1px solid #E5E5E3; border-bottom: 1px solid #E5E5E3; padding: 1.75rem 0; }
        .gf-marquee-track { display: flex; width: max-content; animation: gf-marquee 60s linear infinite; }
        .gf-marquee:hover .gf-marquee-track { animation-play-state: paused; }
        .gf-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 2.5rem;
          padding-right: 2.5rem;
          font-size: clamp(2rem, 4.5vw, 3.75rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          color: #0A0A0A;
          white-space: nowrap;
        }
        .gf-marquee-item:nth-child(even) { color: transparent; -webkit-text-stroke: 1px #0A0A0A; }
        .gf-marquee-sep { width: 12px; height: 12px; background: #0A0A0A; transform: rotate(45deg); }
        @keyframes gf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .gf-marquee-track { animation: none; } }
        @media (max-width: 640px) { .gf-marquee { padding: 1.25rem 0; } .gf-marquee-item { gap: 1.5rem; padding-right: 1.5rem; } .gf-marquee-sep { width: 8px; height: 8px; } }
      `}</style>
    </div>
  );
}
