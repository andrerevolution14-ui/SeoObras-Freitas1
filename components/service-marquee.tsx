import "./service-marquee.css";
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

    </div>
  );
}
