"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* "Cada divisão tem um antes. Nós entregamos o depois."
   Moldura iluminada: o "depois" revela-se sobre o "antes" com o scroll. */

const PAIRS = [
  { antes: "/brand/antes-depois/bathroom-antes.webp", depois: "/brand/antes-depois/bathroom-depois.webp", label: "Casa de banho", local: "Aveiro" },
  { antes: "/brand/antes-depois/kitchen-antes.webp", depois: "/brand/antes-depois/kitchen-depois.webp", label: "Cozinha", local: "Aveiro" },
];

export function BeforeAfterScroll() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("is-live");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="ba on-dark" aria-label="Antes e depois de obras reais" style={{ ["--p" as string]: 0.3 }}>
      <div className="ba-sticky">
        <div className="section-container ba-grid">
          <div className="ba-copy">
            <p className="ba-eyebrow">Remodelação completa</p>
            <h2 className="ba-title font-serif">
              Cada divisão tem um <em>“antes”</em>. Nós entregamos o <em>“depois”</em>.
            </h2>
            <p className="ba-lead">Obras reais da Freitas Renovações. Faça scroll para ver a transformação.</p>
            <Link href="/clientes" className="btn-primary ba-cta">
              Ver mais antes e depois <ArrowRight size={16} />
            </Link>
          </div>

          <div className="ba-frame-wrap">
            <div className="ba-frame">
              {PAIRS.map((pair, i) => (
                <div key={pair.label} className={`ba-pair ba-pair-${i}`}>
                  <Image src={pair.antes} alt={`${pair.label} antes da remodelação — ${pair.local}`} fill sizes="(max-width: 900px) 92vw, 46vw" className="ba-img" />
                  <div className="ba-after">
                    <Image src={pair.depois} alt={`${pair.label} depois da remodelação pela Freitas Renovações — ${pair.local}`} fill sizes="(max-width: 900px) 92vw, 46vw" className="ba-img" />
                  </div>
                  <div className="ba-line" />
                  <span className="ba-chip ba-chip-antes">Antes</span>
                  <span className="ba-chip ba-chip-depois">Depois</span>
                  <span className="ba-caption">
                    {pair.label} · {pair.local}
                  </span>
                </div>
              ))}
            </div>
            <div className="ba-glow" aria-hidden="true" />
          </div>
        </div>
      </div>

      <style>{`
        .ba { position: relative; background: radial-gradient(ellipse 70% 60% at 70% 55%, #2A221C 0%, #14110F 55%, #0B0A09 100%); color: #fff; }
        .ba.is-live { height: 300vh; }
        .ba.is-live .ba-sticky { position: sticky; top: 0; height: 100vh; height: 100svh; display: flex; align-items: center; overflow: hidden; }
        .ba:not(.is-live) .ba-sticky { padding: 6rem 0; }
        .ba-grid { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 4rem; align-items: center; width: 100%; padding-top: 70px; }
        .ba-eyebrow { font-size: 0.6875rem; letter-spacing: 0.24em; text-transform: uppercase; color: #A89A8A; font-weight: 600; margin-bottom: 1.25rem; }
        .ba-title { font-size: clamp(2.1rem, 3.8vw, 3.5rem); font-weight: 400; line-height: 1.08; margin: 0 0 1.5rem; }
        .ba-title em { font-style: italic; color: #D9B98E; }
        .ba-lead { color: rgba(255,255,255,0.62); font-size: 1rem; line-height: 1.6; max-width: 360px; margin-bottom: 2rem; }

        .ba-frame-wrap { position: relative; }
        .ba-frame {
          position: relative; aspect-ratio: 4 / 5; max-height: 74vh; margin: 0 auto;
          border-radius: 18px; overflow: hidden; background: #1C1815;
          box-shadow: 0 0 0 1px rgba(255,220,170,0.18), 0 0 0 10px rgba(255,255,255,0.03), 0 60px 120px -40px rgba(0,0,0,0.9);
        }
        .ba-glow { position: absolute; left: 10%; right: 10%; bottom: -40px; height: 80px; background: radial-gradient(ellipse at center, rgba(255,190,120,0.45), transparent 70%); filter: blur(10px); pointer-events: none; }
        .ba-pair { position: absolute; inset: 0; }
        .ba-img { object-fit: cover; }
        /* Par 0 (casa de banho): revela 0.08 → 0.42. Par 1 (cozinha): entra 0.5 → 0.58, revela 0.6 → 0.92 */
        .ba-pair-0 { --r: clamp(0, calc((var(--p) - 0.08) / 0.34), 1); opacity: calc(1 - clamp(0, calc((var(--p) - 0.5) / 0.08), 1)); }
        .ba-pair-1 { --r: clamp(0, calc((var(--p) - 0.6) / 0.32), 1); opacity: clamp(0, calc((var(--p) - 0.5) / 0.08), 1); }
        .ba-after { position: absolute; inset: 0; clip-path: inset(0 0 0 calc((1 - var(--r)) * 100%)); }
        .ba-line { position: absolute; top: 0; bottom: 0; width: 2px; left: calc((1 - var(--r)) * 100%); background: linear-gradient(180deg, transparent, #FFE2B8, transparent); box-shadow: 0 0 18px 2px rgba(255,200,140,0.7); opacity: calc(min(1, var(--r) * 8) * (1 - clamp(0, calc((var(--r) - 0.92) / 0.08), 1))); }
        .ba-chip { position: absolute; top: 1rem; padding: 0.4rem 0.75rem; border-radius: 999px; font-size: 0.6875rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600; backdrop-filter: blur(6px); }
        .ba-chip-antes { left: 1rem; background: rgba(0,0,0,0.55); color: #fff; opacity: calc(1 - var(--r)); }
        .ba-chip-depois { right: 1rem; background: rgba(255,255,255,0.92); color: #14110F; opacity: var(--r); }
        .ba-caption { position: absolute; left: 1rem; bottom: 1rem; padding: 0.45rem 0.8rem; border-radius: 999px; background: rgba(0,0,0,0.55); font-size: 0.75rem; backdrop-filter: blur(6px); }
        .ba:not(.is-live) .ba-pair-0 { --r: 1; }
        .ba:not(.is-live) .ba-pair-1 { display: none; }
        @media (max-width: 900px) {
          .ba.is-live { height: 260vh; }
          .ba-grid { grid-template-columns: minmax(0, 1fr); gap: 1.25rem; padding-top: 76px; text-align: center; }
          .ba-copy { display: flex; flex-direction: column; align-items: center; }
          .ba-eyebrow, .ba-lead { display: none; }
          .ba-title { font-size: 1.6rem; margin-bottom: 0; max-width: 340px; }
          .ba-cta { display: none; }
          .ba-frame { aspect-ratio: 4 / 5; max-height: 62svh; width: auto; }
        }
      `}</style>
    </section>
  );
}
