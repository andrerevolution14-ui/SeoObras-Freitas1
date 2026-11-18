"use client";
import "./whatsapp-button.css";


import { CONTRACTOR_INFO } from "@/lib/constants";

export function WhatsAppButton() {
  const handleClick = () => {
    // Track in Google Analytics / Google Ads if gtag is loaded
    if (typeof window !== "undefined") {
      const win = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof win.gtag === "function") {
        win.gtag("event", "whatsapp_click", {
          event_category: "Contact",
          event_label: "WhatsApp Floating Button",
          value: 1,
        });
      }
    }
  };

  return (
    <>
      <aside
        aria-label="Contacto WhatsApp"
        className="whatsapp-floating-wrapper"
      >
        {/* Floating Action Button */}
        <a
          href={CONTRACTOR_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          id="whatsapp-floating-btn"
          aria-label="Abrir conversa no WhatsApp com Empreiteiro Jorge Freitas"
          className="whatsapp-floating-btn"
        >
          {/* Radar pulsing ring */}
          <span className="whatsapp-pulse-ring" />

          {/* Online green indicator badge */}
          <span className="whatsapp-online-badge" title="Disponível agora" />

          {/* Official WhatsApp SVG Icon */}
          <svg
            className="whatsapp-icon"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 2C8.268 2 2 8.268 2 16c0 2.68.75 5.19 2.06 7.33L2.3 29.7l6.6-1.73A13.91 13.91 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm8.01 19.8c-.33.94-1.66 1.73-2.31 1.84-.6.1-1.39.14-4.52-1.16-3.99-1.65-6.55-5.69-6.75-5.96-.19-.27-1.6-2.13-1.6-4.06 0-1.93 1.01-2.88 1.37-3.27.36-.39.79-.49 1.05-.49.27 0 .53.01.76.02.24.01.56-.09.88.67.33.79 1.13 2.76 1.23 2.96.1.2.17.44.03.71-.13.27-.2.44-.4.67-.2.24-.42.53-.6.71-.2.2-.41.42-.18.81.23.39 1.03 1.7 2.21 2.75 1.52 1.35 2.8 1.77 3.2 1.97.4.2.63.17.86-.1.24-.27 1.01-1.18 1.28-1.58.27-.4.54-.33.91-.2.37.14 2.36 1.11 2.76 1.31.4.2.67.3.77.47.1.17.1 1-.23 1.94z"
              fill="#ffffff"
            />
          </svg>
        </a>
      </aside>


    </>
  );
}
