"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Revelação ao scroll para elementos com [data-reveal].
 * - Sem JS o conteúdo fica sempre visível (a classe .js-motion só é adicionada aqui).
 * - O que já está no ecrã é marcado como visível antes de ativar o efeito (sem "piscar").
 * - Respeita prefers-reduced-motion (tratado em CSS).
 */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in");
    });
    document.documentElement.classList.add("js-motion");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    els.filter((el) => !el.classList.contains("is-in")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
