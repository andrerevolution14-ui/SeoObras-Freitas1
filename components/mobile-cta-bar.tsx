"use client";

import { MessageSquare } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export function MobileCtaBar() {
  const scrollToForm = () => {
    const form = document.getElementById("hero-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.location.href = "/#hero-form";
    }
  };

  return (
    <>
      <div style={{ height: "80px", display: "none" }} className="mobile-cta-spacer" />

      <div
        className="mobile-cta-bar"
        style={{
          background: "#0A0A0A",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          width: "100%",
          maxWidth: "100vw",
          boxSizing: "border-box",
          padding: "0.55rem 0.75rem",
          gap: "0.5rem",
        }}
      >
        <a
          href={CONTRACTOR_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-cta-whatsapp"
          aria-label="Falar no WhatsApp"
          style={{
            flex: "1 1 0%",
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.8125rem",
            borderRadius: "2px",
            padding: "0.6rem 0.5rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 32 32" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path fill="#25D366" d="M16 2C8.27 2 2 8.27 2 16c0 2.68.75 5.19 2.06 7.33L2.3 29.7l6.6-1.73A13.9 13.9 0 0016 30c7.73 0 14-6.27 14-14S23.73 2 16 2z" />
            <path fill="#fff" d="M24.01 21.8c-.33.94-1.66 1.73-2.31 1.84-.6.1-1.39.14-4.52-1.16-3.99-1.65-6.55-5.69-6.75-5.96-.19-.27-1.6-2.13-1.6-4.06s1.01-2.88 1.37-3.27c.36-.39.79-.49 1.05-.49l.76.02c.24.01.56-.09.88.67.33.79 1.13 2.76 1.23 2.96.1.2.17.44.03.71-.13.27-.2.44-.4.67-.2.24-.42.53-.6.71-.2.2-.41.42-.18.81.23.39 1.03 1.7 2.21 2.75 1.52 1.35 2.8 1.77 3.2 1.97.4.2.63.17.86-.1.24-.27 1.01-1.18 1.28-1.58.27-.4.54-.33.91-.2.37.14 2.36 1.11 2.76 1.31.4.2.67.3.77.47.1.17.1 1-.23 1.94z" />
          </svg>
          <span>WhatsApp</span>
        </a>

        <button
          onClick={scrollToForm}
          id="mobile-cta-form"
          type="button"
          style={{
            flex: "1.15 1 0%",
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            background: "#ffffff",
            border: "none",
            color: "#0A0A0A",
            fontWeight: 700,
            fontSize: "0.8125rem",
            borderRadius: "2px",
            padding: "0.6rem 0.5rem",
            cursor: "pointer",
            boxShadow: "none",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          <MessageSquare size={15} style={{ flexShrink: 0 }} />
          <span>Pedir Orçamento Grátis</span>
        </button>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .mobile-cta-bar { display: none !important; }
          .mobile-cta-spacer { display: none !important; }
        }
        @media (max-width: 768px) {
          .mobile-cta-spacer { display: block !important; }
        }
      `}</style>
    </>
  );
}
