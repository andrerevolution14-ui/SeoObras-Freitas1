"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { RenoScene } from "@/components/reno-scene";

/* ------------------------------------------------------------------
   "Tudo o que a sua remodelação precisa."
   Casa de banho em corte (WebGL / Three.js), montada peça a peça
   com o scroll. A biblioteca só é carregada quando a secção se aproxima.
   Sem WebGL ou com "reduzir movimento": imagem estática do resultado.
------------------------------------------------------------------- */

const STEPS = [
  { t: "Demolição", d: "Remoção da casa de banho antiga e do entulho.", img: "/clientes/demolicao-remodelacao-integral.jpg" },
  { t: "Canalização e eletricidade", d: "Esgotos em PVC, água em multicamada, pontos elétricos.", img: "/eletrica1.jpg" },
  { t: "Estrutura e isolamento", d: "Perfis metálicos, lã mineral e betonilha.", img: "/r10.webp" },
  { t: "Placas e impermeabilização", d: "Placas hidrófugas, teto falso e membrana estanque.", img: "/clientes/wc-marmore-espelho-led.jpg" },
  { t: "Revestimentos", d: "Pavimento e azulejo de grande formato, peça a peça.", img: "/clientes/wc-suite-claraboia-branco.jpg" },
  { t: "Loiças, luz e entrega", d: "Base de duche, vidro, móvel suspenso e espelho LED.", img: "/clientes/wc-madeira-espelho-led.jpg" },
];
const BOUNDS = [0, 0.13, 0.32, 0.48, 0.62, 0.8];

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Build3D() {
  const ref = useRef<HTMLElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLElement>(null);
  const pctRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<RenoScene | null>(null);
  const [step, setStep] = useState(5);
  const [mode, setMode] = useState<"poster" | "loading" | "live">("poster");
  const stepRef = useRef(5);

  useEffect(() => {
    const el = ref.current;
    const host = hostRef.current;
    if (!el || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !hasWebGL()) return;

    el.classList.add("is-live");
    let raf = 0;
    let visible = false;
    let disposed = false;
    let p = 0;

    const measure = () => {
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      return travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1;
    };
    const update = () => {
      raf = 0;
      p = measure();
      el.style.setProperty("--p", p.toFixed(4));
      sceneRef.current?.setProgress(p);
      if (dayRef.current) dayRef.current.textContent = String(1 + Math.round(p * 34)).padStart(2, "0");
      if (pctRef.current) pctRef.current.textContent = String(Math.round(p * 100));
      let s = 0;
      for (let i = 0; i < BOUNDS.length; i++) if (p >= BOUNDS[i]) s = i;
      if (s !== stepRef.current) {
        stepRef.current = s;
        setStep(s);
      }
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      sceneRef.current?.resize();
      onScroll();
    };

    // Carrega o motor 3D só quando a secção está perto (não pesa no primeiro ecrã)
    const loader = new IntersectionObserver(
      async ([en]) => {
        if (!en.isIntersecting || sceneRef.current) return;
        loader.disconnect();
        setMode("loading");
        const { createRenoScene } = await import("@/components/reno-scene");
        if (disposed) return;
        sceneRef.current = createRenoScene(host, { mobile: window.matchMedia("(max-width: 900px)").matches });
        sceneRef.current.setProgress(measure());
        setMode("live");
      },
      { rootMargin: "120% 0px" }
    );
    loader.observe(el);

    const io = new IntersectionObserver(
      ([en]) => {
        visible = en.isIntersecting;
        if (visible) update();
      },
      { rootMargin: "100px 0px" }
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    update();
    return () => {
      disposed = true;
      loader.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <section ref={ref} id="obra-3d" className="b3" style={{ ["--p" as string]: 1 }} aria-label="Remodelação de uma casa de banho, camada a camada">
      <div className="b3-sticky">
        <div className="section-container b3-grid">
          <div className="b3-copy">
            <p className="b3-eyebrow">Remodelação chave na mão</p>
            <h2 className="b3-title font-serif">
              Tudo o que a sua remodelação <em>precisa.</em>
            </h2>
            <p className="b3-lead">Do esgoto ao espelho — uma só equipa, camada a camada.</p>
            <div className="b3-mstep" aria-hidden="true">
              <div className="b3-bars">
                {STEPS.map((s, i) => (
                  <span key={s.t} className={i <= step ? "on" : ""} />
                ))}
              </div>
              <strong>
                {String(step + 1).padStart(2, "0")} · {STEPS[step].t}
              </strong>
              <em>{STEPS[step].d}</em>
            </div>
            <a href="#hero-form" className="btn-dark b3-cta">
              Pedir orçamento gratuito <ArrowRight size={16} />
            </a>
          </div>

          <div className="b3-scene">
            <div className="b3-hud" aria-hidden="true">
              <span>
                Dia <b ref={dayRef}>35</b> / 35
              </span>
              <span>
                Obra <b ref={pctRef}>100</b>%
              </span>
            </div>
            <div ref={hostRef} className="b3-canvas" aria-hidden="true" />
            {mode !== "live" && (
              <Image
                src="/brand/obra-3d-final.webp"
                alt="Casa de banho remodelada em corte: canalização, isolamento, revestimentos e loiças"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={`b3-poster${mode === "loading" ? " is-loading" : ""}`}
              />
            )}
            <div className="b3-done" aria-hidden="true">
              <span className="b3-done-dot" />
              Obra entregue · garantia escrita
            </div>
          </div>

          <ol className="b3-cards">
            {STEPS.map((s, i) => (
              <li key={s.t} className={i === step ? "is-on" : i < step ? "is-done" : ""}>
                <span className="b3-card-txt">
                  <span className="b3-card-n">{String(i + 1).padStart(2, "0")}</span>
                  <strong className="font-serif">{s.t}</strong>
                  <em>{s.d}</em>
                </span>
                <span className="b3-card-img">
                  <Image src={s.img} alt={s.t} fill sizes="80px" style={{ objectFit: "cover" }} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        .b3 { position: relative; background: radial-gradient(ellipse 80% 70% at 55% 45%, #FBFAF7 0%, #F1EDE6 55%, #E9E4DB 100%); color: #14110F; --p: 1; }
        .b3.is-live { height: 460vh; }
        .b3.is-live .b3-sticky { position: sticky; top: 0; height: 100vh; height: 100svh; display: flex; align-items: center; overflow: hidden; }
        .b3:not(.is-live) .b3-sticky { padding: 6rem 0; }
        .b3-grid { display: grid; grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.45fr) minmax(0, 0.72fr); gap: 2.5rem; align-items: center; width: 100%; padding-top: 70px; }
        .b3-eyebrow { font-size: 0.6875rem; letter-spacing: 0.24em; text-transform: uppercase; color: #8A8178; font-weight: 600; margin-bottom: 1.25rem; }
        .b3-title { font-size: clamp(2.25rem, 3.6vw, 3.5rem); font-weight: 400; letter-spacing: -0.02em; line-height: 1.04; margin: 0 0 1.25rem; color: #14110F; }
        .b3-title em { font-style: italic; color: #8A6A4A; }
        .b3-lead { color: #5E564E; font-size: 1rem; line-height: 1.6; margin-bottom: 2rem; max-width: 300px; }
        .b3-mstep { display: none; }

        .b3-scene { position: relative; height: min(80vh, 720px); }
        .b3-canvas { position: absolute; inset: 0; }
        .b3-poster { object-fit: contain; transition: opacity 0.6s ease; }
        .b3-poster.is-loading { opacity: 0.5; }
        .b3-hud { position: absolute; top: 0.5rem; left: 0; right: 0; display: flex; justify-content: space-between; font-size: 0.6875rem; letter-spacing: 0.16em; text-transform: uppercase; color: #8A8178; z-index: 2; pointer-events: none; }
        .b3-hud b { color: #14110F; font-weight: 600; font-variant-numeric: tabular-nums; font-size: 1.0625rem; letter-spacing: 0; margin: 0 0.15rem; }
        .b3-done {
          position: absolute; left: 50%; bottom: 0.75rem; z-index: 3;
          transform: translate(-50%, calc((1 - clamp(0, calc((var(--p) - 0.95) / 0.04), 1)) * 12px));
          opacity: clamp(0, calc((var(--p) - 0.95) / 0.04), 1);
          display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.7rem 1.1rem;
          background: #14110F; color: #fff; font-size: 0.8125rem; font-weight: 600; white-space: nowrap; border-radius: 999px;
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.5);
        }
        .b3:not(.is-live) .b3-done { display: none; }
        .b3-done-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; }

        .b3-cards { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; }
        .b3-cards li {
          display: grid; grid-template-columns: 1fr 64px; gap: 0.75rem; align-items: center;
          padding: 0.7rem 0.7rem 0.7rem 0.95rem; background: rgba(255,255,255,0.72);
          border: 1px solid rgba(20,17,15,0.06); border-radius: 10px;
          box-shadow: 0 10px 30px -18px rgba(60,40,20,0.35);
          opacity: 0.55; transform: translateX(8px);
          transition: opacity 0.45s ease, transform 0.45s var(--ease-out), background 0.45s ease, box-shadow 0.45s ease;
        }
        .b3-cards li.is-done { opacity: 0.8; transform: none; }
        .b3-cards li.is-on { opacity: 1; transform: translateX(-6px); background: #fff; box-shadow: 0 18px 40px -16px rgba(60,40,20,0.45); }
        .b3-card-txt { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
        .b3-card-n { font-size: 0.625rem; letter-spacing: 0.18em; color: #A0968C; font-weight: 600; }
        .b3-card-txt strong { font-size: 0.9375rem; font-weight: 400; color: #14110F; line-height: 1.2; }
        .b3-card-txt em { font-style: normal; font-size: 0.6875rem; color: #7A7168; line-height: 1.35; }
        .b3-card-img { position: relative; width: 64px; height: 64px; border-radius: 8px; overflow: hidden; background: #E9E4DB; }

        @media (max-width: 1200px) {
          .b3-grid { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr); }
          .b3-cards { display: none; }
        }
        @media (max-width: 900px) {
          .b3.is-live { height: 420vh; }
          .b3-grid { grid-template-columns: minmax(0, 1fr); gap: 0; padding-top: 72px; text-align: center; }
          .b3-copy { order: 2; min-width: 0; width: 100%; display: flex; flex-direction: column; align-items: center; }
          .b3-eyebrow, .b3-lead { display: none; }
          .b3-title { font-size: 1.75rem; margin-bottom: 0.75rem; }
          .b3-mstep { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; width: 100%; max-width: 380px; margin-bottom: 1rem; min-height: 4.4rem; }
          .b3-bars { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; width: 100%; margin-bottom: 0.45rem; }
          .b3-bars span { height: 3px; background: rgba(20,17,15,0.14); transition: background 0.3s ease; border-radius: 2px; }
          .b3-bars span.on { background: #14110F; }
          .b3-mstep strong { font-size: 1rem; font-weight: 600; }
          .b3-mstep em { font-style: normal; font-size: 0.8125rem; color: #6B635B; }
          .b3-cta { padding: 0.8rem 1.25rem; font-size: 0.875rem; }
          .b3-scene { order: 1; height: 52svh; }
          .b3-hud { padding: 0 0.25rem; }
          .b3-done { bottom: 0.25rem; font-size: 0.75rem; padding: 0.5rem 0.85rem; }
        }
      `}</style>
    </section>
  );
}
