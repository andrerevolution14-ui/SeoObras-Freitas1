"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { RenoScene } from "@/components/reno-scene";

/* ------------------------------------------------------------------
   "Tudo o que a sua remodelação precisa."
   Casa de banho em corte (WebGL / Three.js), montada peça a peça
   com o scroll. Um único foco: a etapa atual aparece como etiqueta
   presa à parte da obra que está a ser feita.
   Sem WebGL ou com "reduzir movimento": imagem estática do resultado.
------------------------------------------------------------------- */

const STEPS: { t: string; d: string; at: [number, number, number] }[] = [
  { t: "Demolição", d: "Sai a casa de banho antiga e o entulho.", at: [0.1, 0.35, 0.35] },
  { t: "Canalização e eletricidade", d: "Esgotos, água quente e fria, pontos elétricos.", at: [-0.4, 0.95, -0.97] },
  { t: "Estrutura e isolamento", d: "Perfis metálicos, lã mineral e betonilha.", at: [0.6, 1.7, -0.95] },
  { t: "Placas e impermeabilização", d: "Placas hidrófugas, teto falso e membrana.", at: [-1.14, 1.5, 0.3] },
  { t: "Revestimentos", d: "Pavimento e azulejo, peça a peça.", at: [0.35, 0.15, 0.35] },
  { t: "Loiças e iluminação", d: "Duche, móvel suspenso, espelho LED.", at: [0.3, 1.0, -0.7] },
];
const BOUNDS = [0, 0.13, 0.32, 0.48, 0.62, 0.8];
const DONE_AT = 0.96;

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
  const tagRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const sceneRef = useRef<RenoScene | null>(null);
  const [step, setStep] = useState(5);
  const [done, setDone] = useState(true);
  const [mode, setMode] = useState<"poster" | "loading" | "live">("poster");
  const stepRef = useRef(5);
  const doneRef = useRef(true);

  useEffect(() => {
    const el = ref.current;
    const host = hostRef.current;
    if (!el || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !hasWebGL()) return;

    el.classList.add("is-live");
    let raf = 0;
    let visible = false;
    let disposed = false;

    const measure = () => {
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      return travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1;
    };

    /** Prende a etiqueta ao ponto 3D da etapa atual (sem re-render do React). */
    const placeTag = (s: number) => {
      const tag = tagRef.current;
      const sc = sceneRef.current;
      if (!tag || !sc) return;
      const pt = sc.project(...STEPS[s].at);
      const W = host.clientWidth, H = host.clientHeight;
      const tw = tag.offsetWidth, th = tag.offsetHeight;
      // cartão acima-direita do ponto; mantém-se dentro da cena
      let cx = pt.x + 18, cy = pt.y - th - 22;
      if (cx + tw > W - 8) cx = pt.x - tw - 18;
      cx = Math.max(8, Math.min(W - tw - 8, cx));
      cy = Math.max(8, Math.min(H - th - 8, cy));
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pt.x - 6}px, ${pt.y - 6}px, 0)`;
      tag.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    };

    const update = () => {
      raf = 0;
      const p = measure();
      el.style.setProperty("--p", p.toFixed(4));
      sceneRef.current?.setProgress(p);
      let s = 0;
      for (let i = 0; i < BOUNDS.length; i++) if (p >= BOUNDS[i]) s = i;
      if (s !== stepRef.current) {
        stepRef.current = s;
        setStep(s);
      }
      const d = p >= DONE_AT;
      if (d !== doneRef.current) {
        doneRef.current = d;
        setDone(d);
      }
      placeTag(s);
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
        requestAnimationFrame(update);
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

  const live = mode === "live";

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
            <a href="#hero-form" className="btn-dark b3-cta">
              Pedir orçamento gratuito <ArrowRight size={16} />
            </a>
          </div>

          <div className="b3-scene">
            <div ref={hostRef} className="b3-canvas" aria-hidden="true" />
            {!live && (
              <Image
                src="/brand/obra-3d-final.webp"
                alt="Casa de banho remodelada em corte: canalização, isolamento, revestimentos e loiças"
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
                className={`b3-poster${mode === "loading" ? " is-loading" : ""}`}
              />
            )}

            {/* Etiqueta única, presa à parte da obra em curso */}
            <span ref={dotRef} className={`b3-tag-dot${live ? " is-live" : ""}${done ? " is-done" : ""}`} aria-hidden="true" />
            <div ref={tagRef} className={`b3-tag${live ? " is-live" : ""}${done ? " is-done" : ""}`} aria-live="polite">
              <div className="b3-tag-card" key={done ? "done" : step}>
                {done ? (
                  <>
                    <span className="b3-tag-n">Obra entregue</span>
                    <strong className="font-serif">Pronta a usar.</strong>
                    <em>Limpeza, vistoria e garantia escrita.</em>
                  </>
                ) : (
                  <>
                    <span className="b3-tag-n">Etapa {step + 1} de {STEPS.length}</span>
                    <strong className="font-serif">{STEPS[step].t}</strong>
                    <em>{STEPS[step].d}</em>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .b3 { position: relative; background: radial-gradient(ellipse 80% 70% at 60% 45%, #FBFAF7 0%, #F1EDE6 55%, #E9E4DB 100%); color: #14110F; --p: 1; }
        .b3.is-live { height: 460vh; }
        .b3.is-live .b3-sticky { position: sticky; top: 0; height: 100vh; height: 100svh; display: flex; align-items: center; overflow: hidden; }
        .b3:not(.is-live) .b3-sticky { padding: 6rem 0; }
        .b3-grid { display: grid; grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr); gap: 3rem; align-items: center; width: 100%; padding-top: 70px; }
        .b3-eyebrow { font-size: 0.6875rem; letter-spacing: 0.24em; text-transform: uppercase; color: #8A8178; font-weight: 600; margin-bottom: 1.25rem; }
        .b3-title { font-size: clamp(2.25rem, 3.6vw, 3.5rem); font-weight: 400; letter-spacing: -0.02em; line-height: 1.04; margin: 0 0 1.25rem; color: #14110F; }
        .b3-title em { font-style: italic; color: #8A6A4A; }
        .b3-lead { color: #5E564E; font-size: 1rem; line-height: 1.6; margin-bottom: 2rem; max-width: 320px; }

        .b3-scene { position: relative; height: min(82vh, 760px); }
        .b3-canvas { position: absolute; inset: 0; }
        .b3-poster { object-fit: contain; transition: opacity 0.6s ease; }
        .b3-poster.is-loading { opacity: 0.5; }

        /* Etiqueta da etapa */
        .b3-tag { position: absolute; left: 0; top: 0; z-index: 3; pointer-events: none; will-change: transform; transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
        .b3-tag:not(.is-live) { left: 50%; top: auto; bottom: 1rem; transform: translateX(-50%) !important; }
        .b3-tag-dot {
          position: absolute; left: 0; top: 0; z-index: 3; pointer-events: none; transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          width: 12px; height: 12px; border-radius: 50%;
          background: #14110F; box-shadow: 0 0 0 4px rgba(255,255,255,0.85), 0 0 0 5px rgba(20,17,15,0.15);
          display: none;
        }
        .b3-tag-dot.is-live { display: block; animation: b3-pulse 1.8s ease-out infinite; }
        .b3-tag-dot.is-done { background: #22c55e; }
        @keyframes b3-pulse { 0% { box-shadow: 0 0 0 4px rgba(255,255,255,0.9), 0 0 0 4px rgba(20,17,15,0.35); } 100% { box-shadow: 0 0 0 4px rgba(255,255,255,0.9), 0 0 0 18px rgba(20,17,15,0); } }
        .b3-tag-card {
          display: flex; flex-direction: column; gap: 0.2rem;
          width: max-content; max-width: 260px;
          padding: 0.85rem 1.05rem 0.9rem; border-radius: 12px;
          background: rgba(255,255,255,0.94); backdrop-filter: blur(8px);
          border: 1px solid rgba(20,17,15,0.07);
          box-shadow: 0 20px 44px -18px rgba(60,40,20,0.45);
          animation: b3-tag-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .b3-tag.is-done .b3-tag-card { background: #14110F; color: #fff; border-color: transparent; }
        @keyframes b3-tag-in { from { opacity: 0; transform: translateY(8px) scale(0.97); } to { opacity: 1; transform: none; } }
        .b3-tag-n { font-size: 0.625rem; letter-spacing: 0.18em; text-transform: uppercase; color: #A0968C; font-weight: 600; }
        .b3-tag.is-done .b3-tag-n { color: #86efac; }
        .b3-tag-card strong { font-size: 1.125rem; font-weight: 400; line-height: 1.2; }
        .b3-tag-card em { font-style: normal; font-size: 0.8125rem; color: #6B635B; line-height: 1.4; }
        .b3-tag.is-done .b3-tag-card em { color: rgba(255,255,255,0.7); }

        @media (max-width: 900px) {
          .b3.is-live { height: 420vh; }
          .b3-grid { grid-template-columns: minmax(0, 1fr); gap: 0; padding-top: 76px; text-align: center; }
          .b3-copy { min-width: 0; width: 100%; display: flex; flex-direction: column; align-items: center; }
          .b3-eyebrow, .b3-lead { display: none; }
          .b3-title { font-size: 1.75rem; margin-bottom: 0.25rem; }
          .b3-cta { order: 3; padding: 0.8rem 1.25rem; font-size: 0.875rem; margin-top: 0.5rem; }
          .b3-copy .b3-cta { display: none; }
          .b3-scene { height: calc(100svh - 76px - 4.5rem - 70px); min-height: 380px; }
          .b3-tag-card { max-width: 210px; padding: 0.7rem 0.85rem; text-align: left; }
          .b3-tag-card strong { font-size: 1rem; }
          .b3-tag-card em { font-size: 0.75rem; }
        }
      `}</style>
    </section>
  );
}
