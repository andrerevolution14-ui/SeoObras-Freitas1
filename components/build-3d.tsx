"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------
   "Tudo o que a sua remodelação precisa."
   Casa de banho em corte, renderizada de forma fotorrealista em 8 fases
   (mesmo ângulo). Com o scroll, cada fase transforma-se na seguinte e uma
   única etiqueta assinala a parte da obra em curso.
   - Sem bibliotecas: só imagens WebP + opacity/transform (GPU).
   - Imagens carregadas só quando a secção se aproxima (a 1.ª logo à vista).
   - Sem JS / "reduzir movimento": mostra o resultado final.
------------------------------------------------------------------- */

interface Phase {
  t: string;
  d: string;
  /** posição do ponto na imagem (%), para a etiqueta */
  x: number;
  y: number;
}

const PHASES: Phase[] = [
  { t: "Antes da obra", d: "Casa de banho antiga, com loiças e revestimentos gastos.", x: 33, y: 47 },
  { t: "Demolição", d: "Remoção de azulejos, loiças e entulho, com proteção do prédio.", x: 47, y: 60 },
  { t: "Divisão em bruto", d: "Paredes e pavimento limpos, prontos para as novas redes.", x: 36, y: 34 },
  { t: "Canalização, eletricidade e isolamento", d: "Água em multicamada, esgotos, pontos elétricos e lã mineral.", x: 62, y: 36 },
  { t: "Placas e impermeabilização", d: "Placas hidrófugas, betonilha e membrana estanque no duche.", x: 36, y: 40 },
  { t: "Assentamento de revestimentos", d: "Azulejo e pavimento de grande formato, nivelados peça a peça.", x: 54, y: 60 },
  { t: "Revestimentos concluídos", d: "Juntas, nichos com LED e pontos de água prontos.", x: 44, y: 52 },
  { t: "Loiças, luz e entrega", d: "Duche em vidro, móvel suspenso, espelho LED — limpeza e garantia escrita.", x: 33, y: 50 },
];
const N = PHASES.length;

const src = (i: number, mobile: boolean) => `/brand/obra/fase-${i}${mobile ? "-m" : ""}.webp`;

export function Build3D() {
  const ref = useRef<HTMLElement>(null);
  const frameRefs = useRef<(HTMLImageElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState(N - 1);
  const [load, setLoad] = useState(false);
  const [mobile, setMobile] = useState(false);
  const phaseRef = useRef(N - 1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setMobile(window.matchMedia("(max-width: 900px)").matches);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoad(true);
      return;
    }
    el.classList.add("is-live");
    let raf = 0;
    let visible = false;

    const place = (i: number) => {
      const stage = stageRef.current, tag = tagRef.current, dot = dotRef.current;
      if (!stage || !tag || !dot) return;
      const W = stage.clientWidth, H = stage.clientHeight;
      const fr = stage.firstElementChild as HTMLElement; // .b3-frames
      const fw = fr.clientWidth, fh = fr.clientHeight, fx = fr.offsetLeft, fy = fr.offsetTop;
      const size = Math.min(fw, fh); // imagem quadrada com object-fit: contain
      const Z = parseFloat(getComputedStyle(stage).getPropertyValue("--zoom")) || 1;
      const px = fx + fw / 2 + (PHASES[i].x / 100 - 0.5) * size * Z;
      const py = fy + fh / 2 + (PHASES[i].y / 100 - 0.5) * size * Z;
      dot.style.transform = `translate3d(${px - 7}px, ${py - 7}px, 0)`;
      const tw = tag.offsetWidth, th = tag.offsetHeight;
      const below = window.matchMedia("(max-width: 900px)").matches;
      let cx = below ? (W - tw) / 2 : PHASES[i].x < 50 ? px + 26 : px - tw - 26;
      let cy = below ? H - th - 4 : py - th / 2;
      cx = Math.max(6, Math.min(W - tw - 6, cx));
      cy = Math.max(6, Math.min(H - th - 6, cy));
      tag.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    };

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1;
      // posição contínua na sequência (0 → N-1), com pequenas pausas em cada fase
      const f = p * (N - 1);
      const base = Math.floor(f);
      const frac = f - base;
      const hold = 0.35; // fração de cada segmento em que a fase fica parada
      const mix = frac < hold ? 0 : (frac - hold) / (1 - hold);
      const eased = mix * mix * (3 - 2 * mix);
      frameRefs.current.forEach((img, i) => {
        if (!img) return;
        let o = 0;
        if (i === base) o = 1;
        else if (i === base + 1) o = eased;
        if (i < base) o = 1; // fases anteriores ficam por baixo (sem "piscar")
        img.style.opacity = String(i <= base + 1 ? (i <= base ? 1 : o) : 0);
      });
      el.style.setProperty("--p", p.toFixed(4));
      const cur = Math.min(N - 1, eased > 0.5 ? base + 1 : base);
      if (cur !== phaseRef.current) {
        phaseRef.current = cur;
        setPhase(cur);
      }
      place(cur);
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };

    const loader = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          setLoad(true);
          loader.disconnect();
        }
      },
      { rootMargin: "150% 0px" }
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
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      loader.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // reposiciona a etiqueta depois de o texto mudar de tamanho
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [phase]);

  const done = phase === N - 1;

  return (
    <section ref={ref} id="obra-3d" className="b3" style={{ ["--p" as string]: 1 }} aria-label="Remodelação de uma casa de banho, fase a fase">
      <div className="b3-sticky">
        <div className="section-container b3-grid">
          <div className="b3-copy">
            <p className="b3-eyebrow">Remodelação chave na mão</p>
            <h2 className="b3-title font-serif">
              Tudo o que a sua remodelação <em>precisa.</em>
            </h2>
            <p className="b3-lead">Do esgoto ao espelho — uma só equipa, um só responsável, fase a fase.</p>
            <div className="b3-count" aria-hidden="true">
              <span className="font-serif">{String(phase + 1).padStart(2, "0")}</span>
              <i>/ {String(N).padStart(2, "0")}</i>
            </div>
            <a href="#hero-form" className="btn-dark b3-cta">
              Pedir orçamento gratuito <ArrowRight size={16} />
            </a>
          </div>

          <div className="b3-scene">
            <div ref={stageRef} className="b3-stage">
              <div className="b3-frames">
              {PHASES.map((ph, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  ref={(n) => {
                    frameRefs.current[i] = n;
                  }}
                  src={load || i === N - 1 ? src(i, mobile) : undefined}
                  alt={i === N - 1 ? "Casa de banho remodelada em corte, com canalização, isolamento, revestimentos e loiças" : ""}
                  aria-hidden={i === N - 1 ? undefined : true}
                  width={1024}
                  height={1024}
                  loading={i === 0 || i === N - 1 ? "eager" : "lazy"}
                  decoding="async"
                  className="b3-frame"
                  style={{ opacity: i === N - 1 ? 1 : 0, zIndex: i + 1 }}
                />
              ))}
              </div>

              <span ref={dotRef} className={`b3-dot${done ? " is-done" : ""}`} aria-hidden="true" />
              <div ref={tagRef} className={`b3-tag${done ? " is-done" : ""}`} aria-live="polite">
                <div className="b3-tag-card" key={phase}>
                  <span className="b3-tag-n">{done ? "Obra entregue" : `Fase ${phase + 1} de ${N}`}</span>
                  <strong className="font-serif">{PHASES[phase].t}</strong>
                  <em>{PHASES[phase].d}</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .b3 { position: relative; background: #F4E6CC; color: #14110F; --p: 1; }
        .b3::before { content: ""; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 70% at 62% 52%, rgba(255,255,255,0.35), transparent 70%); pointer-events: none; }
        .b3.is-live { height: 520vh; }
        .b3.is-live .b3-sticky { position: sticky; top: 0; height: 100vh; height: 100svh; display: flex; align-items: center; overflow: hidden; }
        .b3:not(.is-live) .b3-sticky { padding: 6rem 0; }
        .b3-grid { position: relative; display: grid; grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr); gap: 3rem; align-items: center; width: 100%; padding-top: 70px; }
        .b3-copy { position: relative; z-index: 5; }
        .b3-scene { z-index: 1; }
        .b3-eyebrow { font-size: 0.6875rem; letter-spacing: 0.24em; text-transform: uppercase; color: #8A7660; font-weight: 600; margin-bottom: 1.25rem; }
        .b3-title { font-size: clamp(2.25rem, 3.6vw, 3.5rem); font-weight: 400; letter-spacing: -0.02em; line-height: 1.04; margin: 0 0 1.25rem; }
        .b3-title em { font-style: italic; color: #8A6A4A; }
        .b3-lead { color: #5E5245; font-size: 1rem; line-height: 1.6; margin-bottom: 2rem; max-width: 320px; }
        .b3-count { display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 2rem; }
        .b3-count span { font-size: 3.25rem; line-height: 1; color: #14110F; }
        .b3-count i { font-style: normal; font-size: 0.875rem; color: #8A7660; letter-spacing: 0.08em; }

        .b3-scene { position: relative; display: flex; align-items: center; justify-content: center; height: min(84vh, 780px); }
        .b3-stage { position: relative; height: 100%; aspect-ratio: 1; max-width: 100%; --zoom: 1.32; }
        .b3-frames {
          position: absolute; inset: 0;
          transform: scale(calc(var(--zoom) * (0.97 + var(--p) * 0.04)));
          will-change: transform;
          -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 52%, transparent 68%);
          mask-image: radial-gradient(circle at 50% 50%, #000 52%, transparent 68%);
        }
        .b3-frame { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; transition: opacity 0.12s linear; will-change: opacity; }

        /* Etiqueta (ponto + cartão) */
        .b3-dot {
          position: absolute; left: 0; top: 0; z-index: 20; width: 14px; height: 14px; border-radius: 50%;
          background: #14110F; box-shadow: 0 0 0 4px rgba(255,255,255,0.9);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          animation: b3-pulse 1.8s ease-out infinite;
        }
        .b3-dot.is-done { background: #22c55e; }
        @keyframes b3-pulse { 0% { box-shadow: 0 0 0 4px rgba(255,255,255,0.9), 0 0 0 4px rgba(20,17,15,0.35); } 100% { box-shadow: 0 0 0 4px rgba(255,255,255,0.9), 0 0 0 20px rgba(20,17,15,0); } }
        .b3-tag { position: absolute; left: 0; top: 0; z-index: 21; pointer-events: none; transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
        .b3:not(.is-live) .b3-tag, .b3:not(.is-live) .b3-dot { display: none; }
        .b3-tag-card {
          display: flex; flex-direction: column; gap: 0.25rem; width: 250px;
          padding: 0.9rem 1.05rem 1rem; border-radius: 12px;
          background: rgba(255,255,255,0.96); border: 1px solid rgba(20,17,15,0.06);
          box-shadow: 0 22px 46px -18px rgba(70,45,20,0.45);
          animation: b3-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .b3-tag.is-done .b3-tag-card { background: #14110F; color: #fff; border-color: transparent; }
        @keyframes b3-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .b3-tag-n { font-size: 0.625rem; letter-spacing: 0.18em; text-transform: uppercase; color: #A08C76; font-weight: 600; }
        .b3-tag.is-done .b3-tag-n { color: #86efac; }
        .b3-tag-card strong { font-size: 1.125rem; font-weight: 400; line-height: 1.2; }
        .b3-tag-card em { font-style: normal; font-size: 0.8125rem; color: #6B5F52; line-height: 1.45; }
        .b3-tag.is-done .b3-tag-card em { color: rgba(255,255,255,0.72); }

        @media (max-width: 900px) {
          .b3.is-live { height: 480vh; }
          .b3-grid { grid-template-columns: minmax(0, 1fr); gap: 0; padding-top: 74px; text-align: center; }
          .b3-copy { min-width: 0; width: 100%; display: flex; flex-direction: column; align-items: center; }
          .b3-eyebrow, .b3-lead, .b3-cta, .b3-count { display: none; }
          .b3-title { font-size: 1.7rem; margin: 0.5rem 0 0; }
          .b3-scene { height: calc(100svh - 74px - 4.5rem - 72px - 2.75rem); min-height: 340px; }
          .b3-stage { width: 100%; height: 100%; aspect-ratio: auto; --zoom: 1.45; }
          .b3-frames { inset: 0 0 7rem 0; }
          .b3-tag-card { width: 196px; padding: 0.7rem 0.8rem; text-align: left; }
          .b3-tag-card strong { font-size: 0.975rem; }
          .b3-tag-card em { font-size: 0.72rem; }
        }
      `}</style>
    </section>
  );
}
