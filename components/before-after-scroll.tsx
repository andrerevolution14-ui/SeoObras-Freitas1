"use client";
import "./before-after-scroll.css";


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


    </section>
  );
}
