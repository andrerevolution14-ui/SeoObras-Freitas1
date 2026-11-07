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
    const slow = conn?.saveData || conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";
    if (!reduce && !slow) setEnabled(true);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!enabled || !v) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    v.src = isMobile ? srcMobile : src;
    v.load();
    const play = () => v.play().catch(() => {});
    play();

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { threshold: 0.05 });
    io.observe(v);
    const onVis = () => (document.hidden ? v.pause() : play());
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
        <img src={poster} alt={label} className="gf-hero-poster" fetchPriority="high" decoding="async" />
      </picture>
      {enabled && (
        <video
          ref={ref}
          className={`gf-hero-video${ready ? " is-ready" : ""}`}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onCanPlay={() => setReady(true)}
        />
      )}
    </div>
  );
}
