import "./featured-quote.css";
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
          <span role="img" className="fq-stars" aria-label="5 estrelas">
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


    </section>
  );
}
