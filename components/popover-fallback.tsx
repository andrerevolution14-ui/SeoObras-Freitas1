"use client";

import { useEffect } from "react";

/**
 * Para browsers sem a API "popover" (ex.: iOS < 17): abre/fecha os elementos
 * [popover] com uma classe .is-open. Nos browsers modernos não faz nada.
 */
export function PopoverFallback() {
  useEffect(() => {
    if (typeof HTMLElement !== "undefined" && "popover" in HTMLElement.prototype) return;
    let open: HTMLElement | null = null;
    const close = () => {
      open?.classList.remove("is-open");
      open = null;
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const btn = t.closest<HTMLElement>("[popovertarget]");
      if (btn) {
        const el = document.getElementById(btn.getAttribute("popovertarget") || "");
        if (!el) return;
        e.preventDefault();
        const wasOpen = el === open;
        close();
        if (!wasOpen && btn.getAttribute("popovertargetaction") !== "hide") {
          el.classList.add("is-open");
          open = el;
        }
        return;
      }
      if (open && !open.contains(t)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}
