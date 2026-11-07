"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------
   "Do primeiro dia à chave na mão."
   Sala + cozinha de um apartamento remodelada com o scroll.
   - Só CSS 3D (transform/opacity); um único valor --p (0→1) por rAF.
   - Cada peça tem uma fase de entrada [a,b] e, opcionalmente, de saída [c,e].
   - Sem JS ou com "reduzir movimento": mostra o resultado final, sem sticky.
------------------------------------------------------------------- */

type Mode = "rise" | "drop" | "fade" | "slidey" | "growx" | "growy";
type Tone =
  | "slab" | "wall" | "wallold" | "tileold" | "paperold" | "floorold" | "woodold" | "counterold" | "fabricold"
  | "blueprint" | "debris" | "bag" | "copper" | "pipegrey" | "cable" | "socket" | "wool" | "pladur"
  | "screed" | "oak" | "oak2" | "cab" | "counter" | "sink" | "dark" | "paint" | "paint2" | "glass"
  | "sofa" | "rug" | "oakdark" | "green" | "lamp";

interface BoxProps {
  x: number; y: number; z?: number;
  w: number; d: number; h: number;
  a?: number; b?: number; c?: number; e?: number;
  mode?: Mode; tone: Tone; hideMobile?: boolean;
}

function Box({ x, y, z = 0, w, d, h, a = -1, b = 0, c = 2, e = 3, mode = "fade", tone, hideMobile }: BoxProps) {
  const style = {
    left: x, top: y, width: w, height: d,
    "--z": `${z}px`, "--h": `${h}px`, "--a": a, "--b": b, "--c": c, "--e": e,
  } as React.CSSProperties;
  return (
    <div className={`bx m-${mode} t-${tone}${hideMobile ? " hm" : ""}`} style={style}>
      <i className="f f-top" style={{ width: w, height: d }} />
      <i className="f f-s" style={{ width: w, height: h, top: d }} />
      <i className="f f-e" style={{ width: h, height: d, left: w }} />
    </div>
  );
}

const STEPS = [
  { t: "Levantamento", d: "Medição, fotografias e orçamento fechado." },
  { t: "Demolição", d: "Remoção controlada e proteção do prédio." },
  { t: "Redes novas", d: "Canalização multicamada e eletricidade certificada." },
  { t: "Paredes e tetos", d: "Isolamento, pladur e barramento." },
  { t: "Pavimento e cozinha", d: "Soalho, móveis por medida e bancada." },
  { t: "Pintura e entrega", d: "Limpeza, vistoria e garantia escrita." },
];
const BOUNDS = [0, 0.14, 0.32, 0.48, 0.64, 0.82];

export function Build3D() {
  const ref = useRef<HTMLElement>(null);
  const dayRef = useRef<HTMLElement>(null);
  const pctRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(5);
  const stepRef = useRef(5);

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
    const io = new IntersectionObserver(
      ([en]) => {
        visible = en.isIntersecting;
        if (visible) update();
      },
      { rootMargin: "100px 0px" }
    );
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

  const planks = Array.from({ length: 8 }, (_, i) => i);
  const pladurBack = [
    { x: 12, w: 86, z: 10, h: 230 },
    { x: 98, w: 86, z: 10, h: 230 },
    { x: 184, w: 88, z: 10, h: 230 },
    { x: 272, w: 138, z: 10, h: 80 },
    { x: 272, w: 138, z: 200, h: 40 },
    { x: 410, w: 30, z: 10, h: 230 },
  ];

  return (
    <section
      ref={ref}
      id="obra-3d"
      className="b3 on-dark tex-dark"
      style={{ ["--p" as string]: 1 }}
      aria-label="Uma remodelação, do primeiro dia à entrega da chave"
    >
      <div className="b3-sticky">
        <div className="section-container b3-grid">
          <div className="b3-copy">
            <p className="section-eyebrow" style={{ color: "#8C8C8C" }}>Remodelação chave na mão</p>
            <h2 className="b3-title font-display">
              Do primeiro dia <span className="text-metal">à chave na mão.</span>
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
            <a href="#hero-form" className="btn-primary b3-cta">
              Começar pelo orçamento <ArrowRight size={16} />
            </a>
          </div>

          <div className="b3-scene" aria-hidden="true">
            <div className="b3-hud">
              <span>
                Dia <b ref={dayRef}>35</b> / 35
              </span>
              <span>
                Obra <b ref={pctRef}>100</b>%
              </span>
            </div>

            <div className="b3-stage">
              {/* Estrutura existente */}
              <Box x={0} y={0} w={440} d={440} h={10} tone="slab" />
              <Box x={0} y={0} z={10} w={440} d={12} h={240} tone="wall" />
              <Box x={0} y={0} z={10} w={12} d={440} h={240} tone="wall" />

              {/* Estado inicial (sai na demolição) */}
              <Box x={12} y={12} z={10} w={428} d={2} h={230} c={0.21} e={0.27} tone="wallold" />
              <Box x={12} y={12} z={10} w={250} d={3} h={110} c={0.19} e={0.25} tone="tileold" />
              <Box x={12} y={12} z={10} w={3} d={428} h={230} c={0.21} e={0.27} tone="paperold" />
              <Box x={12} y={12} z={10} w={428} d={428} h={3} c={0.25} e={0.3} tone="floorold" />
              <Box x={20} y={14} z={13} w={200} d={55} h={80} c={0.16} e={0.21} tone="woodold" />
              <Box x={18} y={14} z={93} w={204} d={58} h={5} c={0.16} e={0.21} tone="counterold" />
              <Box x={20} y={14} z={145} w={200} d={32} h={50} c={0.15} e={0.2} tone="woodold" />
              <Box x={40} y={300} z={13} w={62} d={62} h={44} c={0.15} e={0.2} tone="fabricold" />
              <Box x={272} y={12} z={90} w={138} d={10} h={110} tone="glass" />

              {/* Levantamento */}
              <Box x={30} y={30} z={16} w={380} d={380} h={1} a={0.01} b={0.05} c={0.12} e={0.16} tone="blueprint" />

              {/* Demolição: entulho e sacos */}
              {[[120, 140], [200, 220], [300, 160], [90, 260], [250, 320], [160, 360]].map(([x, y], i) => (
                <Box key={`deb${i}`} x={x} y={y} z={13} w={22 + (i % 3) * 6} d={18 + (i % 2) * 8} h={10 + (i % 3) * 5} a={0.16 + i * 0.008} b={0.2 + i * 0.008} c={0.27} e={0.31} tone="debris" />
              ))}
              <Box x={340} y={300} z={13} w={34} d={34} h={30} a={0.2} b={0.23} c={0.29} e={0.32} mode="drop" tone="bag" />
              <Box x={380} y={340} z={13} w={30} d={30} h={26} a={0.21} b={0.24} c={0.29} e={0.32} mode="drop" tone="bag" />

              {/* Redes novas: canalização (fundo) e eletricidade (lateral) */}
              <Box x={30} y={12} z={18} w={232} d={7} h={8} a={0.33} b={0.39} c={0.56} e={0.6} mode="growx" tone="pipegrey" />
              <Box x={30} y={12} z={50} w={220} d={4} h={5} a={0.34} b={0.39} c={0.56} e={0.6} mode="growx" tone="copper" />
              <Box x={30} y={12} z={62} w={200} d={4} h={5} a={0.35} b={0.4} c={0.56} e={0.6} mode="growx" tone="copper" />
              <Box x={64} y={12} z={50} w={5} d={4} h={120} a={0.37} b={0.41} c={0.56} e={0.6} mode="rise" tone="copper" />
              <Box x={180} y={12} z={62} w={5} d={4} h={90} a={0.38} b={0.42} c={0.56} e={0.6} mode="rise" tone="copper" />
              <Box x={12} y={20} z={170} w={4} d={400} h={4} a={0.39} b={0.44} c={0.56} e={0.6} mode="growy" tone="cable" />
              {[80, 200, 330].map((y, i) => (
                <Box key={`cv${i}`} x={12} y={y} z={42} w={4} d={4} h={130} a={0.41 + i * 0.01} b={0.45 + i * 0.01} c={0.56} e={0.6} mode="rise" tone="cable" />
              ))}
              {[76, 196, 326].map((y, i) => (
                <Box key={`so${i}`} x={12} y={y} z={34} w={6} d={12} h={12} a={0.44 + i * 0.01} b={0.46 + i * 0.01} c={0.56} e={0.6} tone="socket" hideMobile />
              ))}

              {/* Paredes: isolamento + pladur */}
              <Box x={12} y={12} z={10} w={6} d={428} h={230} a={0.47} b={0.5} c={0.6} e={0.62} tone="wool" />
              {pladurBack.map((pn, i) => (
                <Box key={`pb${i}`} x={pn.x} y={12} z={pn.z} w={pn.w} d={8} h={pn.h} a={0.49 + i * 0.016} b={0.53 + i * 0.016} mode="drop" tone="pladur" />
              ))}
              {[0, 1, 2, 3, 4].map((i) => (
                <Box key={`pl${i}`} x={12} y={12 + i * 85.6} z={10} w={8} d={85.6} h={230} a={0.5 + i * 0.016} b={0.54 + i * 0.016} mode="drop" tone="pladur" />
              ))}

              {/* Pavimento e cozinha */}
              <Box x={20} y={20} z={10} w={420} d={420} h={2} a={0.62} b={0.65} tone="screed" />
              {planks.map((i) => (
                <Box key={`pk${i}`} x={20 + i * 52.5} y={20} z={12} w={52.5} d={420} h={3} a={0.64 + i * 0.012} b={0.67 + i * 0.012} mode="slidey" tone={i % 2 ? "oak2" : "oak"} />
              ))}
              <Box x={22} y={22} z={15} w={240} d={58} h={82} a={0.72} b={0.76} mode="rise" tone="cab" />
              <Box x={20} y={22} z={97} w={244} d={62} h={5} a={0.75} b={0.78} mode="drop" tone="counter" />
              <Box x={100} y={34} z={102} w={44} d={30} h={1} a={0.78} b={0.8} tone="sink" hideMobile />
              <Box x={22} y={22} z={150} w={240} d={32} h={56} a={0.76} b={0.79} mode="drop" tone="cab" />
              <Box x={150} y={178} z={15} w={150} d={62} h={82} a={0.77} b={0.8} mode="rise" tone="cab" />
              <Box x={146} y={174} z={97} w={158} d={70} h={5} a={0.79} b={0.81} mode="drop" tone="counter" />
              <Box x={170} y={252} z={15} w={22} d={22} h={50} a={0.8} b={0.82} mode="rise" tone="dark" hideMobile />
              <Box x={250} y={252} z={15} w={22} d={22} h={50} a={0.8} b={0.82} mode="rise" tone="dark" hideMobile />

              {/* Pintura e entrega */}
              <Box x={20} y={20} z={10} w={2} d={420} h={230} a={0.83} b={0.9} mode="rise" tone="paint" />
              <Box x={20} y={20} z={150} w={252} d={2} h={90} a={0.85} b={0.91} mode="rise" tone="paint2" />
              <Box x={100} y={286} z={15} w={140} d={140} h={1} a={0.87} b={0.9} tone="rug" />
              <Box x={24} y={292} z={15} w={64} d={132} h={36} a={0.88} b={0.92} mode="drop" tone="sofa" />
              <Box x={24} y={292} z={15} w={20} d={132} h={70} a={0.88} b={0.92} mode="drop" tone="sofa" />
              <Box x={140} y={330} z={16} w={62} d={52} h={22} a={0.9} b={0.93} mode="drop" tone="oakdark" />
              <Box x={398} y={388} z={15} w={26} d={26} h={58} a={0.9} b={0.94} mode="rise" tone="green" />
              <Box x={202} y={206} z={200} w={2} d={2} h={50} a={0.91} b={0.94} mode="drop" tone="dark" />
              <Box x={256} y={206} z={200} w={2} d={2} h={50} a={0.92} b={0.95} mode="drop" tone="dark" />
              <Box x={196} y={200} z={188} w={14} d={14} h={12} a={0.91} b={0.94} mode="drop" tone="lamp" />
              <Box x={250} y={200} z={188} w={14} d={14} h={12} a={0.92} b={0.95} mode="drop" tone="lamp" />
              <div className="b3-glow" />
            </div>

            <div className="b3-done">
              <span className="b3-done-dot" />
              Obra entregue · garantia escrita
            </div>
            <div className="b3-progress">
              <span />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .b3 { position: relative; background: #0A0A0A; color: #fff; --p: 1; }
        .b3.is-live { height: 420vh; }
        .b3.is-live .b3-sticky { position: sticky; top: 0; height: 100vh; height: 100svh; display: flex; align-items: center; overflow: hidden; }
        .b3:not(.is-live) .b3-sticky { padding: 6rem 0; }
        .b3-grid { display: grid; grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr); gap: 3rem; align-items: center; width: 100%; padding-top: 70px; }
        .b3-title { font-size: clamp(2.25rem, 4vw, 3.5rem); font-weight: 600; letter-spacing: -0.045em; line-height: 1.02; margin: 0 0 2rem; }
        .b3-steps { list-style: none; margin: 0 0 2rem; padding: 0; border-top: 1px solid rgba(255,255,255,0.12); }
        .b3-steps li { display: grid; grid-template-columns: 2.5rem 1fr; gap: 0.5rem; padding: 0.8rem 0; border-bottom: 1px solid rgba(255,255,255,0.12); opacity: 0.35; transition: opacity 0.4s ease; }
        .b3-steps li.is-done { opacity: 0.6; }
        .b3-steps li.is-on { opacity: 1; }
        .b3-n { font-size: 0.8125rem; color: #8C8C8C; padding-top: 0.1rem; }
        .b3-steps li.is-on .b3-n { color: #fff; }
        .b3-st { display: flex; flex-direction: column; gap: 0.15rem; }
        .b3-st strong { font-size: 1rem; font-weight: 600; }
        .b3-st em { font-style: normal; font-size: 0.8125rem; color: rgba(255,255,255,0.6); }
        .b3-mstep { display: none; }

        /* ---------- Cena ---------- */
        .b3-scene { position: relative; height: min(76vh, 660px); display: flex; align-items: center; justify-content: center; perspective: 1800px; perspective-origin: 50% 25%; }
        .b3-stage {
          position: relative;
          width: 440px;
          height: 440px;
          margin-top: 120px;
          transform-style: preserve-3d;
          transform: scale(calc(var(--s, 1) * (0.94 + var(--p) * 0.08))) rotateX(57deg) rotateZ(calc(36deg + var(--p) * 16deg));
          will-change: transform;
        }
        .b3-hud { position: absolute; top: 0.5rem; left: 0; right: 0; display: flex; justify-content: space-between; font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.55); z-index: 2; }
        .b3-hud b { color: #fff; font-weight: 600; font-variant-numeric: tabular-nums; font-size: 1.125rem; letter-spacing: 0; margin: 0 0.15rem; }

        .bx {
          --t: clamp(0, calc((var(--p) - var(--a)) / (var(--b) - var(--a))), 1);
          --u: clamp(0, calc((var(--p) - var(--c)) / (var(--e) - var(--c))), 1);
          --zz: calc(var(--z) + var(--u) * 130px);
          position: absolute;
          transform-style: preserve-3d;
          transform-origin: 50% 50% 0;
          opacity: calc(var(--o, 1) * (1 - var(--u)));
        }
        .m-fade { transform: translateZ(var(--zz)); --o: var(--t); }
        .m-rise { transform: translateZ(var(--zz)) scale3d(1, 1, max(0.001, var(--t))); --o: min(1, calc(var(--t) * 4)); }
        .m-drop { transform: translateZ(calc(var(--zz) + (1 - var(--t)) * 260px)); --o: var(--t); }
        .m-slidey { transform: translate3d(0, calc((1 - var(--t)) * 220px), var(--zz)); --o: var(--t); }
        .m-growx { transform-origin: 0 50% 0; transform: translateZ(var(--zz)) scale3d(max(0.001, var(--t)), 1, 1); --o: min(1, calc(var(--t) * 4)); }
        .m-growy { transform-origin: 50% 0 0; transform: translateZ(var(--zz)) scale3d(1, max(0.001, var(--t)), 1); --o: min(1, calc(var(--t) * 4)); }

        .bx .f { position: absolute; display: block; backface-visibility: visible; background-color: var(--mc); }
        .bx .f-top { left: 0; top: 0; transform: translateZ(var(--h)); }
        .bx .f-s { left: 0; transform-origin: top center; transform: rotateX(90deg); box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.16); }
        .bx .f-e { top: 0; transform-origin: center left; transform: rotateY(-90deg); box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.3); }

        /* Materiais */
        .t-slab { --mc: #7E7C78; }
        .t-wall { --mc: #C9C6BF; }
        .t-wallold { --mc: #B9AE95; }
        .t-tileold { --mc: #8FA39A; }
        .t-tileold .f-s { background-image: linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px); background-size: 16px 16px; }
        .t-paperold { --mc: #B49B78; }
        .t-paperold .f-e { background-image: repeating-linear-gradient(90deg, rgba(90,60,30,0.25) 0 6px, transparent 6px 16px); }
        .t-floorold { --mc: #A9876A; }
        .t-floorold .f-top { background-image: conic-gradient(#C9B79C 25%, #A9876A 0 50%, #C9B79C 0 75%, #A9876A 0); background-size: 36px 36px; }
        .t-woodold { --mc: #7A5534; }
        .t-woodold .f-s { background-image: linear-gradient(90deg, rgba(0,0,0,0.35) 1px, transparent 1px); background-size: 50px 100%; }
        .t-counterold { --mc: #B7A88E; }
        .t-fabricold { --mc: #8C6E5A; }
        .t-blueprint { --mc: transparent; }
        .t-blueprint .f-top { background-color: rgba(30, 60, 110, 0.55); outline: 3px dashed rgba(190, 220, 255, 0.95); outline-offset: -2px; background-image: linear-gradient(rgba(170,210,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(170,210,255,0.25) 1px, transparent 1px); background-size: 38px 38px; }
        .t-blueprint .f-s, .t-blueprint .f-e { display: none; }
        .t-glass .f-s { box-shadow: none; }
        .t-debris { --mc: #9C958A; }
        .t-bag { --mc: #E8E6E0; }
        .t-copper { --mc: #C27A45; }
        .t-pipegrey { --mc: #8D8D8D; }
        .t-cable { --mc: #F1C232; }
        .t-socket { --mc: #F7F7F5; }
        .t-wool { --mc: #E3C25A; }
        .t-wool .f-e { background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0 2px, transparent 2px 7px); }
        .t-pladur { --mc: #E7E6E1; }
        .t-pladur .f-s { box-shadow: inset 0 0 0 1px rgba(0,0,0,0.14), inset 0 0 0 2000px rgba(0,0,0,0.1); }
        .t-pladur .f-e { box-shadow: inset 0 0 0 1px rgba(0,0,0,0.14), inset 0 0 0 2000px rgba(0,0,0,0.22); }
        .t-screed { --mc: #A9A7A2; }
        .t-oak { --mc: #C29A6B; }
        .t-oak2 { --mc: #B78D5F; }
        .t-oak .f-top, .t-oak2 .f-top { background-image: linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px); background-size: 100% 70px; }
        .t-cab { --mc: #F4F3EF; }
        .t-cab .f-s { background-image: linear-gradient(90deg, rgba(0,0,0,0.14) 1px, transparent 1px); background-size: 60px 100%; }
        .t-counter { --mc: #2F2F2F; }
        .t-sink { --mc: #9A9A9A; }
        .t-dark { --mc: #262626; }
        .t-paint { --mc: #D9CFC0; }
        .t-paint2 { --mc: #E9E4DA; }
        .t-glass { --mc: #2E3A42; }
        .t-glass .f-s { background-image: linear-gradient(90deg, transparent 49%, #E7E6E1 49% 51%, transparent 51%), linear-gradient(135deg, rgba(255,255,255,0.18), transparent 40%); }
        .t-glass .f-s::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255, 214, 150, 0.95), rgba(255, 170, 80, 0.7)); opacity: clamp(0, calc((var(--p) - 0.9) / 0.08), 1); }
        .t-sofa { --mc: #6E665C; }
        .t-rug { --mc: #D8CDB8; }
        .t-oakdark { --mc: #8A6644; }
        .t-green { --mc: #4E7A47; }
        .t-lamp { --mc: #E8C27A; }
        .b3-glow {
          position: absolute;
          left: 60px; top: 120px; width: 320px; height: 320px;
          transform: translateZ(16px);
          background: radial-gradient(circle, rgba(255, 196, 120, 0.45), transparent 65%);
          opacity: clamp(0, calc((var(--p) - 0.92) / 0.08), 1);
          pointer-events: none;
        }

        .b3-done {
          position: absolute;
          top: 0;
          left: 50%;
          z-index: 3;
          transform: translate(-50%, calc((1 - clamp(0, calc((var(--p) - 0.95) / 0.04), 1)) * 12px));
          opacity: clamp(0, calc((var(--p) - 0.95) / 0.04), 1);
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 1.1rem;
          background: #fff;
          color: #0A0A0A;
          font-size: 0.8125rem;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.8);
        }
        .b3-done-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; }
        .b3-progress { position: absolute; left: 8%; right: 8%; bottom: 0.5rem; height: 2px; background: rgba(255,255,255,0.12); }
        .b3-progress span { display: block; height: 100%; background: var(--metal); transform-origin: left; transform: scaleX(var(--p)); }

        @media (max-width: 900px) {
          .b3.is-live { height: 360vh; }
          .b3-grid { grid-template-columns: minmax(0, 1fr); gap: 0; padding-top: 72px; text-align: center; }
          .b3-copy { order: 2; min-width: 0; width: 100%; display: flex; flex-direction: column; align-items: center; }
          .b3-copy .section-eyebrow, .b3-steps { display: none; }
          .b3-title { font-size: 1.625rem; margin-bottom: 0.875rem; }
          .b3-mstep { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; width: 100%; max-width: 380px; margin-bottom: 1.1rem; min-height: 4.6rem; }
          .b3-bars { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; width: 100%; margin-bottom: 0.5rem; }
          .b3-bars span { height: 3px; background: rgba(255,255,255,0.18); transition: background 0.3s ease; }
          .b3-bars span.on { background: #fff; }
          .b3-mstep strong { font-size: 1rem; font-weight: 600; }
          .b3-mstep em { font-style: normal; font-size: 0.8125rem; color: rgba(255,255,255,0.65); }
          .b3-cta { padding: 0.8rem 1.25rem; font-size: 0.875rem; }
          .b3-scene { order: 1; height: 48svh; --s: 0.47; }
          .b3-stage { margin-top: 70px; }
          .b3-hud { top: 0; padding: 0 0.25rem; font-size: 0.625rem; }
          .b3-hud b { font-size: 0.9375rem; }
          .b3-done { top: 1.6rem; font-size: 0.75rem; padding: 0.5rem 0.85rem; }
          .b3-progress { display: none; }
          .hm { display: none; }
        }
        @media (max-width: 380px) {
          .b3-scene { --s: 0.45; height: 44svh; }
        }
        @media (max-height: 720px) and (min-width: 901px) {
          .b3-scene { --s: 0.8; }
        }
      `}</style>
    </section>
  );
}
