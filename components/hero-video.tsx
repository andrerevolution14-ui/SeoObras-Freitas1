"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  src: string;
  srcMobile: string;
  poster: string;
  posterMobile: string;
  label: string;
}

/**
 * Vídeo de fundo do hero.
 * - Mostra primeiro o poster (leve, bom para LCP); o vídeo só começa quando há dados suficientes.
 * - Versão vertical e leve no telemóvel.
 * - Não reproduz com "reduzir movimento" nem com "poupança de dados".
 * - Pausa quando o separador fica em segundo plano ou o hero sai do ecrã.
 */
export function HeroVideo({ src, srcMobile, poster, posterMobile, label }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (reduce || conn?.saveData || ["slow-2g", "2g"].includes(conn?.effectiveType || "")) return;
    const hero = document.querySelector(".gf-hero-media");
    if (!hero) return;
    let visible=false,interacted=false;
    const activate=()=>{if(visible&&interacted)setEnabled(true);};
    const onInteraction=()=>{interacted=true;activate();};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;activate();},{threshold:0.05});
    observer.observe(hero);
    const events=["pointerdown","keydown","touchstart","scroll"];
    events.forEach(event=>window.addEventListener(event,onInteraction,{passive:true,once:true}));
    return ()=>{observer.disconnect();events.forEach(event=>window.removeEventListener(event,onInteraction));};
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!enabled || !v) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    v.src = isMobile ? srcMobile : src;
    v.load();
    let inView=true;
    const play = () => v.play().catch(() => {});
    play();

    const io = new IntersectionObserver(([e]) => { inView=e.isIntersecting; if(inView&&!document.hidden)play();else v.pause(); }, { threshold: 0.05 });
    io.observe(v);
    const onVis = () => (document.hidden || !inView ? v.pause() : play());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [enabled, src, srcMobile]);

  return (
    <div className="gf-hero-media" aria-hidden="true">
      <picture>
        <source media="(max-width: 768px)" srcSet={posterMobile} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt={label} className="gf-hero-poster" width="1920" height="1080" fetchPriority="high" decoding="async" />
      </picture>
      {enabled && (
        <video
          ref={ref}
          className={`gf-hero-video${ready ? " is-ready" : ""}`}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onCanPlay={() => setReady(true)}
        />
      )}
    </div>
  );
}
