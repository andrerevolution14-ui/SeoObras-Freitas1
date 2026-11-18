import "./faq-accordion.css";
import { Plus, ArrowRight } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export function FaqAccordion() {
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
          <div className="gf-faq-intro" data-reveal>
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
            {FAQ_ITEMS.slice(0, 6).map((item, i) => (
              <details key={item.id} className="accordion-item gf-faq-item" id={`faq-${item.id}`}>
                <summary className="accordion-trigger">
                  <span style={{ display: "flex", gap: "1.25rem", paddingRight: "1rem" }}>
                    <span className="font-display" style={{ color: "#666666", fontSize: "0.8125rem", fontWeight: 500, paddingTop: "0.2rem", minWidth: "1.5rem" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 style={{font:"inherit",margin:0}}>{item.question}</h3>
                  </span>
                  <span className="gf-faq-toggle" aria-hidden="true">
                    <Plus size={18} strokeWidth={1.5} />
                  </span>
                </summary>
                <div className="accordion-content gf-faq-answer">{item.answer}</div>
              </details>
            ))}
            <details className="gf-faq-more">
              <summary className="gf-faq-more-btn">Ver mais {FAQ_ITEMS.length - 6} perguntas</summary>
              {FAQ_ITEMS.slice(6).map((item, j) => {
                const i = j + 6;
                return (
              <details key={item.id} className="accordion-item gf-faq-item" id={`faq-${item.id}`}>
                  <summary className="accordion-trigger">
                    <span style={{ display: "flex", gap: "1.25rem", paddingRight: "1rem" }}>
                      <span className="font-display" style={{ color: "#666666", fontSize: "0.8125rem", fontWeight: 500, paddingTop: "0.2rem", minWidth: "1.5rem" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 style={{font:"inherit",margin:0}}>{item.question}</h3>
                    </span>
                    <span className="gf-faq-toggle" aria-hidden="true">
                      <Plus size={18} strokeWidth={1.5} />
                    </span>
                  </summary>
                  <div className="accordion-content gf-faq-answer">{item.answer}</div>
                </details>
                  );
              })}
            </details>
          </div>
        </div>
      </div>

    </section>
  );
}
