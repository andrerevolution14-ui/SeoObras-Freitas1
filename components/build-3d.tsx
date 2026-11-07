"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------
   Secção "Obra em 3D": uma moradia constrói-se com o scroll.
   - Só CSS 3D (transform/opacity) → leve e fluido em telemóvel.
   - Um único valor --p (0→1) é atualizado por requestAnimationFrame.
   - Sem JS ou com "reduzir movimento": mostra a casa acabada, sem sticky.
------------------------------------------------------------------- */

type Mode = "rise" | "drop" | "fade" | "crane";

interface BoxProps {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  a: number; // início da fase (0–1)
  b: number; // fim da fase (0–1)
  mode?: Mode;
  c?: number; // (grua) início da saída
  e?: number; // (grua) fim da saída
  tone?: "concrete" | "white" | "dark" | "wood" | "green";
  windows?: "band" | "grid" | "door";
}

function Box({ x, y, z = 0, w, d, h, a, b, mode = "rise", c = 2, e = 3, tone = "white", windows }: BoxProps) {
  const vars = { "--a": a, "--b": b, "--c": c, "--e": e } as React.CSSProperties;
  const win = windows ? ` win-${windows}` : "";
  return (
    <div
      className={`b3-box m-${mode} t-${tone}`}
      style={{ left: x, top: y, width: w, height: d, ["--z" as string]: `${z}px`, ["--h" as string]: `${h}px`, ...vars }}
    >
      <div className="f f-top" style={{ width: w, height: d }} />
      <div className={`f f-s${win}`} style={{ width: w, height: h, top: d }} />
      <div className={`f f-n${win}`} style={{ width: w, height: h, top: 0 }} />
      <div className={`f f-e${win}`} style={{ width: h, height: d, left: w }} />
      <div className={`f f-w${win}`} style={{ width: h, height: d, left: 0 }} />
    </div>
  );
}

const STEPS = [
  { t: "Levantamento", d: "Visita técnica e orçamento fechado." },
  { t: "Estrutura", d: "Demolições, alvenarias e novas redes." },
  { t: "Acabamentos", d: "Pavimentos, cozinha, WC e pintura." },
  { t: "Entrega", d: "Limpeza, vistoria e garantia escrita." },
];

export function Build3D() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(3);
  const stepRef = useRef(3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    el.classList.add("is-live");
    let raf = 0;
    let visible = false;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1;
      el.style.setProperty("--p", p.toFixed(4));
      const s = Math.min(3, Math.floor(p * 4.0001));
      if (s !== stepRef.current) {
        stepRef.current = s;
        setStep(s);
      }
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) update();
    }, { rootMargin: "100px 0px" });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} id="obra-3d" className="b3 on-dark tex-dark" style={{ ["--p" as string]: 1 }} aria-label="Como construímos: do levantamento à entrega">
      <div className="b3-sticky">
        <div className="section-container b3-grid">
          <div className="b3-copy">
            <p className="section-eyebrow" style={{ color: "#8C8C8C" }}>Do esboço à chave na mão</p>
            <h2 className="b3-title font-display">
              Cada obra, <span className="text-metal">fase a fase.</span>
            </h2>
            <ol className="b3-steps">
              {STEPS.map((s, i) => (
                <li key={s.t} className={i === step ? "is-on" : i < step ? "is-done" : ""}>
                  <span className="b3-n font-display">{String(i + 1).padStart(2, "0")}</span>
                  <span className="b3-st">
                    <strong>{s.t}</strong>
                    <em>{s.d}</em>
                  </span>
                </li>
              ))}
            </ol>
            <a href="#hero-form" className="btn-primary b3-cta">
              Começar pelo orçamento <ArrowRight size={16} />
            </a>
          </div>

          <div className="b3-scene" aria-hidden="true">
            <div className="b3-stage">
              <div className="b3-ground" />
              {/* Grua: entra no início, sai no fim */}
              <Box x={8} y={30} w={12} d={12} h={300} a={0.02} b={0.2} c={0.8} e={0.92} mode="crane" tone="dark" />
              <Box x={8} y={30} z={300} w={300} d={10} h={10} a={0.06} b={0.24} c={0.8} e={0.92} mode="crane" tone="dark" />
              {/* Laje */}
              <Box x={50} y={70} w={320} d={270} h={12} a={-0.12} b={0.12} tone="concrete" />
              {/* Rés-do-chão */}
              <Box x={90} y={115} z={12} w={250} d={195} h={98} a={0.16} b={0.42} windows="band" />
              {/* Piso superior em consola */}
              <Box x={60} y={95} z={110} w={205} d={170} h={80} a={0.4} b={0.62} mode="drop" windows="grid" />
              {/* Cobertura */}
              <Box x={50} y={85} z={190} w={225} d={190} h={7} a={0.58} b={0.72} mode="drop" tone="dark" />
              {/* Terraço e jardim */}
              <Box x={255} y={312} z={12} w={110} d={36} h={4} a={0.68} b={0.8} mode="fade" tone="wood" />
              <Box x={64} y={300} z={12} w={30} d={30} h={26} a={0.72} b={0.86} tone="green" />
              <Box x={104} y={312} z={12} w={22} d={22} h={18} a={0.75} b={0.88} tone="green" />
            </div>
            <div className="b3-progress"><span /></div>
          </div>
        </div>
      </div>

      <style>{`
        .b3 { position: relative; background: #0A0A0A; color: #fff; --p: 1; }
        .b3.is-live { height: 210vh; }
        .b3-sticky { position: relative; }
        .b3.is-live .b3-sticky { position: sticky; top: 0; height: 100vh; height: 100svh; display: flex; align-items: center; overflow: hidden; }
        .b3:not(.is-live) .b3-sticky { padding: 6rem 0; }
        .b3-grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 3rem; align-items: center; width: 100%; padding-top: 70px; }
        .b3-title { font-size: clamp(2.25rem, 4.2vw, 3.75rem); font-weight: 600; letter-spacing: -0.045em; line-height: 1.02; margin: 0 0 2.25rem; }
        .b3-steps { list-style: none; margin: 0 0 2.25rem; padding: 0; border-top: 1px solid rgba(255,255,255,0.12); }
        .b3-steps li { display: grid; grid-template-columns: 2.75rem 1fr; gap: 0.5rem; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.12); opacity: 0.38; transition: opacity 0.4s ease; }
        .b3-steps li.is-done { opacity: 0.6; }
        .b3-steps li.is-on { opacity: 1; }
        .b3-n { font-size: 0.8125rem; color: #8C8C8C; padding-top: 0.15rem; }
        .b3-steps li.is-on .b3-n { color: #fff; }
        .b3-st { display: flex; flex-direction: column; gap: 0.2rem; }
        .b3-st strong { font-size: 1.0625rem; font-weight: 600; letter-spacing: -0.01em; }
        .b3-st em { font-style: normal; font-size: 0.875rem; color: rgba(255,255,255,0.6); }

        /* ---------- Cena 3D ---------- */
        .b3-scene { position: relative; height: min(70vh, 620px); display: flex; align-items: center; justify-content: center; perspective: 1700px; perspective-origin: 50% 30%; }
        .b3-stage {
          position: relative;
          width: 420px;
          height: 420px;
          transform-style: preserve-3d;
          transform: scale(var(--s, 1)) rotateX(57deg) rotateZ(calc(-48deg + var(--p) * 26deg));
          will-change: transform;
        }
        .b3-ground {
          position: absolute;
          inset: -40px;
          background:
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px) 0 0 / 40px 40px,
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px) 0 0 / 40px 40px,
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 70%);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .b3-box {
          --t: clamp(0, calc((var(--p) - var(--a)) / (var(--b) - var(--a))), 1);
          position: absolute;
          transform-style: preserve-3d;
          transform-origin: 50% 50% 0;
        }
        .b3-box.m-rise { transform: translateZ(var(--z)) scale3d(1, 1, max(0.001, var(--t))); opacity: min(1, calc(var(--t) * 3)); }
        .b3-box.m-drop { transform: translateZ(calc(var(--z) + (1 - var(--t)) * 220px)); opacity: var(--t); }
        .b3-box.m-fade { transform: translateZ(var(--z)); opacity: var(--t); }
        .b3-box.m-crane {
          --u: clamp(0, calc((var(--p) - var(--c)) / (var(--e) - var(--c))), 1);
          transform: translateZ(var(--z)) scale3d(1, 1, max(0.001, var(--t)));
          opacity: calc(min(1, var(--t) * 3) * (1 - var(--u)));
        }
        .b3-box .f { position: absolute; backface-visibility: visible; }
        .b3-box .f-top { left: 0; top: 0; transform: translateZ(var(--h)); }
        .b3-box .f-s, .b3-box .f-n { left: 0; transform-origin: top center; transform: rotateX(90deg); }
        .b3-box .f-e, .b3-box .f-w { top: 0; transform-origin: center left; transform: rotateY(-90deg); }

        /* Materiais */
        .t-white .f-top { background: #F2F2F0; }
        .t-white .f-s { background: #DCDCDA; }
        .t-white .f-e { background: #BDBDBB; }
        .t-white .f-n { background: #A3A3A1; }
        .t-white .f-w { background: #E6E6E4; }
        .t-concrete .f { background: #8A8A88; }
        .t-concrete .f-top { background: #A9A9A7; }
        .t-dark .f { background: #2A2A2A; }
        .t-dark .f-top { background: #3A3A3A; }
        .t-wood .f { background: #8B6B4A; }
        .t-wood .f-top { background: repeating-linear-gradient(90deg, #9C7A55 0 9px, #8B6B4A 9px 11px); }
        .t-green .f { background: #3F5E3A; }
        .t-green .f-top { background: #557A4E; }

        /* Janelas — acendem no fim (luz quente = casa habitada) */
        .win-band, .win-grid { position: absolute; overflow: hidden; }
        .win-band::before, .win-grid::before {
          content: "";
          position: absolute;
          inset: 14% 8% 22% 8%;
          background: repeating-linear-gradient(90deg, #1B1B1B 0 22%, #DCDCDA 22% 24%);
        }
        .win-grid::before { inset: 18% 10% 18% 10%; background: repeating-linear-gradient(90deg, #1B1B1B 0 14%, #BDBDBB 14% 18%); }
        .win-band::after, .win-grid::after {
          content: "";
          position: absolute;
          inset: 14% 8% 22% 8%;
          background: linear-gradient(180deg, rgba(255, 214, 150, 0.95), rgba(255, 180, 90, 0.75));
          mix-blend-mode: screen;
          opacity: clamp(0, calc((var(--p) - 0.82) / 0.15), 1);
        }
        .win-grid::after { inset: 18% 10% 18% 10%; }

        .b3-progress { position: absolute; left: 10%; right: 10%; bottom: 0; height: 2px; background: rgba(255,255,255,0.12); }
        .b3-progress span { display: block; height: 100%; background: var(--metal); transform-origin: left; transform: scaleX(var(--p)); }

        @media (max-width: 900px) {
          .b3.is-live { height: 190vh; }
          .b3-grid { grid-template-columns: minmax(0, 1fr); gap: 0; padding-top: 72px; text-align: center; }
          .b3-copy { min-width: 0; width: 100%; }
          .b3-copy { order: 2; display: flex; flex-direction: column; align-items: center; }
          .b3-copy .section-eyebrow { display: none; }
          .b3-title { font-size: 1.75rem; margin-bottom: 1rem; }
          .b3-scene { order: 1; height: 44svh; --s: 0.62; }
          .b3-steps { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.375rem; border: 0; margin-bottom: 1.25rem; width: 100%; max-width: 420px; }
          .b3-steps li { min-width: 0; }
          .b3-steps li { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; padding: 0.6rem 0 0; border: 0; border-top: 2px solid rgba(255,255,255,0.18); }
          .b3-steps li.is-on { border-top-color: #fff; }
          .b3-st strong { font-size: 0.6875rem; letter-spacing: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; display: block; }
          .b3-st { min-width: 0; width: 100%; align-items: center; }
          .b3-st em { display: none; }
          .b3-steps li.is-on .b3-st em { display: block; position: absolute; left: 0; right: 0; margin-top: 1.75rem; font-size: 0.875rem; }
          .b3-steps { position: relative; padding-bottom: 2.25rem; }
          .b3-n { display: none; }
          .b3-cta { padding: 0.8rem 1.25rem; font-size: 0.875rem; }
          .b3-progress { display: none; }
        }
        @media (max-width: 380px) {
          .b3-scene { --s: 0.54; height: 40svh; }
        }
        @media (max-height: 700px) and (min-width: 901px) {
          .b3-scene { --s: 0.8; }
        }
      `}</style>
    </section>
  );
}
