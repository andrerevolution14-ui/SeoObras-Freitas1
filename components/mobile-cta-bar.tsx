"use client";

import { Phone, MessageSquare } from "lucide-react";
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
          background: "#0B1B2E",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          width: "100%",
          maxWidth: "100vw",
          boxSizing: "border-box",
          padding: "0.55rem 0.75rem",
          gap: "0.5rem",
        }}
      >
        <a
          href={`tel:${CONTRACTOR_INFO.phone}`}
          id="mobile-cta-call"
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
          <Phone size={15} style={{ flexShrink: 0 }} />
          <span>Ligar Já</span>
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
            background: "#B8935A",
            border: "none",
            color: "#0B1B2E",
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
          <span>Pedir Orçamento</span>
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
