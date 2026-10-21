"use client";

import { useState, useEffect } from "react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export function WhatsAppButton() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show gentle prompt tooltip after 3 seconds on page
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setHasInteracted(true);
    // Track in Google Analytics / Google Ads if gtag is loaded
    if (typeof window !== "undefined") {
      const win = window as unknown as { gtag?: (...args: any[]) => void };
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
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip / Speech Bubble */}
        <div
          className={`whatsapp-tooltip ${showTooltip ? "whatsapp-tooltip-visible" : ""}`}
          role="status"
        >
          <div className="whatsapp-tooltip-header">
            <span className="whatsapp-status-dot" />
            <span className="whatsapp-tooltip-title">Jorge Freitas · Empreiteiro</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              aria-label="Fechar mensagem"
              className="whatsapp-tooltip-close"
            >
              ×
            </button>
          </div>
          <p className="whatsapp-tooltip-body">
            Olá! Precisa de orçamento para a sua obra? Fale connosco pelo WhatsApp.
          </p>
          <a
            href={CONTRACTOR_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="whatsapp-tooltip-btn"
          >
            Iniciar Conversa Rápida
          </a>
        </div>

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

      <style>{`
        .whatsapp-floating-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 95;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          user-select: none;
        }

        /* Tooltip Speech Bubble */
        .whatsapp-tooltip {
          opacity: 0;
          transform: translateY(10px) scale(0.95);
          pointer-events: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          background: #ffffff;
          border-radius: 12px;
          padding: 12px 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.08);
          max-width: 260px;
          position: relative;
        }

        .whatsapp-tooltip::after {
          content: "";
          position: absolute;
          bottom: -6px;
          right: 24px;
          width: 12px;
          height: 12px;
          background: #ffffff;
          transform: rotate(45deg);
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .whatsapp-tooltip-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .whatsapp-tooltip-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        .whatsapp-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
        }

        .whatsapp-tooltip-title {
          font-size: 0.75rem;
          font-weight: 800;
          color: #071a3a;
          flex: 1;
        }

        .whatsapp-tooltip-close {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 1.1rem;
          line-height: 1;
          cursor: pointer;
          padding: 0 2px;
        }

        .whatsapp-tooltip-close:hover {
          color: #071a3a;
        }

        .whatsapp-tooltip-body {
          font-size: 0.8125rem;
          color: #475569;
          line-height: 1.4;
          margin: 0 0 10px 0;
        }

        .whatsapp-tooltip-btn {
          display: block;
          text-align: center;
          background: #25D366;
          color: #ffffff;
          font-weight: 800;
          font-size: 0.75rem;
          padding: 6px 12px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.15s ease;
        }

        .whatsapp-tooltip-btn:hover {
          background: #1eb856;
        }

        /* Floating Button Main */
        .whatsapp-floating-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border-radius: 50%;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4), 0 2px 6px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }

        .whatsapp-floating-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 26px rgba(37, 211, 102, 0.55), 0 3px 8px rgba(0, 0, 0, 0.2);
        }

        .whatsapp-floating-btn:active {
          transform: scale(0.96);
        }

        .whatsapp-icon {
          width: 32px;
          height: 32px;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15));
        }

        /* Radar Pulse Animation */
        .whatsapp-pulse-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 2px solid #25D366;
          animation: whatsapp-pulse 2.4s cubic-bezier(0.25, 0, 0, 1) infinite;
          pointer-events: none;
        }

        @keyframes whatsapp-pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.35);
            opacity: 0;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }

        /* Online Green Badge */
        .whatsapp-online-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #22c55e;
          border: 2.5px solid #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        /* Mobile Adjustments: sits comfortably above the sticky mobile CTA bar */
        @media (max-width: 768px) {
          .whatsapp-floating-wrapper {
            bottom: 74px;
            right: 14px;
            gap: 8px;
          }

          .whatsapp-floating-btn {
            width: 54px;
            height: 54px;
          }

          .whatsapp-icon {
            width: 29px;
            height: 29px;
          }

          .whatsapp-tooltip {
            max-width: 230px;
            padding: 10px 12px;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}
