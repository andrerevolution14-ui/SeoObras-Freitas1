import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

/** Testemunho em destaque — citação grande em serifa com fotos de obra em arco. */
export function FeaturedQuote() {
  return (
    <section className="fq" aria-label="Testemunho de cliente">
      <div className="fq-img fq-img-a" data-reveal="image">
        <Image src="/clientes/wc-madeira-espelho-led.jpg" alt="Casa de banho remodelada com espelho LED redondo — Freitas Renovações" fill sizes="(max-width: 900px) 40vw, 22vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="fq-img fq-img-b" data-reveal="image">
        <Image src="/clientes/cozinha-cinza-janela.jpg" alt="Cozinha remodelada em cinza com janela — Freitas Renovações" fill sizes="(max-width: 900px) 30vw, 16vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="fq-img fq-img-c" data-reveal="image">
        <Image src="/clientes/wc-suite-claraboia-branco.jpg" alt="Casa de banho suite em branco com claraboia — Freitas Renovações" fill sizes="(max-width: 900px) 34vw, 18vw" style={{ objectFit: "cover" }} />
      </div>

      <figure className="fq-body" data-reveal>
        <span className="fq-mark font-serif" aria-hidden="true">“</span>
        <blockquote className="fq-quote font-serif">
          Cumpriram o prazo combinado e deixavam tudo limpo ao fim de cada dia — com crianças em casa, <em>fez toda a diferença.</em>
        </blockquote>
        <figcaption className="fq-who">
          <span className="fq-stars" aria-label="5 estrelas">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={13} fill="#14110F" stroke="#14110F" />
            ))}
          </span>
          <strong>Mariana Soares</strong>
          <span>Remodelação de cozinha · Aveiro</span>
        </figcaption>
        <Link href="/clientes" className="link-arrow" style={{ marginTop: "1.75rem" }}>
          Ler as {CONTRACTOR_INFO.reviewCount} avaliações e ver as obras <ArrowRight size={15} />
        </Link>
      </figure>

      <style>{`
        .fq { position: relative; background: #F3F0EA; padding: 9rem 0; min-height: 640px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .fq-body { position: relative; z-index: 2; max-width: 640px; margin: 0 auto; padding: 0 1.5rem; text-align: center; display: flex; flex-direction: column; align-items: center; }
        .fq-mark { font-size: 5rem; line-height: 0.6; color: #B49A7E; margin-bottom: 1rem; }
        .fq-quote { font-size: clamp(1.6rem, 2.8vw, 2.4rem); line-height: 1.28; color: #14110F; margin: 0 0 2rem; font-weight: 400; }
        .fq-quote em { font-style: italic; color: #8A6A4A; }
        .fq-who { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #6B635B; }
        .fq-who strong { color: #14110F; font-weight: 600; }
        .fq-stars { display: inline-flex; gap: 2px; }
        .fq-img { position: absolute; overflow: hidden; background: #E3DED5; box-shadow: 0 30px 60px -30px rgba(60,40,20,0.45); }
        .fq-img-a { left: 4%; top: 12%; width: 18vw; max-width: 260px; aspect-ratio: 3 / 4; border-radius: 999px 999px 18px 18px; }
        .fq-img-b { right: 6%; top: 8%; width: 13vw; max-width: 190px; aspect-ratio: 1; border-radius: 50%; }
        .fq-img-c { right: 3%; bottom: 8%; width: 16vw; max-width: 230px; aspect-ratio: 3 / 4; border-radius: 999px 999px 18px 18px; }
        @media (max-width: 900px) {
          .fq { padding: 4.5rem 0 5rem; min-height: 0; flex-direction: column; }
          .fq-img { position: relative; left: auto; right: auto; top: auto; bottom: auto; }
          .fq-img-a { width: 46vw; max-width: none; order: 0; margin-bottom: 2rem; }
          .fq-img-b, .fq-img-c { display: none; }
          .fq-quote { font-size: 1.45rem; }
        }
      `}</style>
    </section>
  );
}
