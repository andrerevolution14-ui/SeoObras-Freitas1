"use client";
import "./build-3d.css";


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
    const firstFrame = requestAnimationFrame(() => setMobile(window.matchMedia("(max-width: 900px)").matches));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedFrame = requestAnimationFrame(() => setLoad(true));
      return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(reducedFrame); };
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
      { rootMargin: "120px 0px" }
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
      cancelAnimationFrame(firstFrame);
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
                  loading="lazy"
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


    </section>
  );
}
