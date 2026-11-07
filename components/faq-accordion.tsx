"use client";

import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="section-padding" id="faq" style={{ background: "#ffffff" }}>
      {/* JSON-LD for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="section-container">
        <div className="gf-faq">
          <div className="gf-faq-intro">
            <p className="section-eyebrow">Perguntas Frequentes</p>
            <h2 className="section-title">Dúvidas sobre obras em Aveiro?</h2>
            <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
              Respondemos às questões mais comuns sobre os nossos serviços, preços e processos.
            </p>
            <a href="#hero-form" className="link-arrow">
              Falar diretamente com o Jorge Freitas <ArrowRight size={15} />
            </a>
          </div>

          <div style={{ borderTop: "1px solid #E5E5E3" }}>
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="accordion-item" style={{ borderColor: isOpen ? "#0A0A0A" : undefined }}>
                  <button
                    className="accordion-trigger"
                    id={`faq-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                  >
                    <span style={{ display: "flex", gap: "1.25rem", paddingRight: "1rem" }}>
                      <span className="font-display" style={{ color: "#9A9A9A", fontSize: "0.8125rem", fontWeight: 500, paddingTop: "0.2rem", minWidth: "1.5rem" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item.question}</span>
                    </span>
                    <span className="gf-faq-toggle" data-open={isOpen}>
                      <Plus size={18} strokeWidth={1.5} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="accordion-content" style={{ paddingLeft: "2.75rem" }}>{item.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        .gf-faq { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 5rem; align-items: start; }
        .gf-faq-intro { position: sticky; top: 110px; }
        .gf-faq-toggle {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #DCDCDA;
          color: #0A0A0A;
          transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
        }
        .gf-faq-toggle[data-open="true"] { transform: rotate(45deg); background: #0A0A0A; border-color: #0A0A0A; color: #ffffff; }
        @media (max-width: 900px) {
          .gf-faq { grid-template-columns: 1fr; gap: 2.5rem; }
          .gf-faq-intro { position: static; }
        }
        @media (max-width: 640px) {
          .accordion-trigger { font-size: 0.9625rem; padding: 1.25rem 0; }
          .accordion-content { padding-left: 0 !important; padding-right: 0; }
        }
      `}</style>
    </section>
  );
}
