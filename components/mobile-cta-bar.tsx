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
          background: "#071a3a",
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
            background: "rgba(255,255,255,0.08)",
            border: "1.5px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.8125rem",
            borderRadius: "0.375rem",
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
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            border: "none",
            color: "#071a3a",
            fontWeight: 900,
            fontSize: "0.8125rem",
            borderRadius: "0.375rem",
            padding: "0.6rem 0.5rem",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(245, 158, 11, 0.4)",
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
