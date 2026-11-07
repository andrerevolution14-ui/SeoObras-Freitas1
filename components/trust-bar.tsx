import { CONTRACTOR_INFO } from "@/lib/constants";
import { CountUp } from "@/components/count-up";

const stats: { value: React.ReactNode; suffix?: string; label: string; sub: string }[] = [
  { value: <CountUp to={CONTRACTOR_INFO.projectsCompleted} suffix="+" />, label: "Obras concluídas", sub: "Aveiro e concelhos vizinhos" },
  { value: <CountUp to={CONTRACTOR_INFO.googleRating} decimals={1} />, suffix: "/5", label: "Avaliação Google", sub: `${CONTRACTOR_INFO.reviewCount} avaliações verificadas` },
  { value: "IMPIC", label: "Alvará de construção", sub: "N.º 104523 · Obras particulares" },
  { value: <CountUp to={150} suffix="k€" />, label: "Seguro de responsabilidade civil", sub: "Apólice ativa · Fidelidade" },
  { value: <CountUp to={12} suffix="h" />, label: "Primeira resposta", sub: "Com orçamento discriminado" },
];

/** Faixa institucional de credenciais — logo abaixo do hero. */
export function TrustBar() {
  return (
    <div className="trust-bar gf-stats on-dark tex-dark" aria-label="Credenciais Freitas Renovações">
      <div className="section-container">
        <dl className="gf-stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="gf-stat">
              <dt className="gf-stat-label">{s.label}</dt>
              <dd className="gf-stat-value font-display"><span className="text-metal">
                {s.value}
                </span>{s.suffix && <span className="gf-stat-suffix">{s.suffix}</span>}
              </dd>
              <dd className="gf-stat-sub">{s.sub}</dd>
            </div>
          ))}
        </dl>
      </div>

      <style>{`
        .gf-stats { background: #0A0A0A; border-top: 1px solid rgba(255,255,255,0.1); }
        .gf-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          margin: 0;
        }
        .gf-stat {
          display: flex;
          flex-direction: column;
          padding: 2.25rem 1.75rem;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }
        .gf-stat:first-child { border-left: 0; padding-left: 0; }
        .gf-stat-label {
          order: 2;
          color: #ffffff;
          font-size: 0.8125rem;
          font-weight: 500;
          margin-top: 0.75rem;
        }
        .gf-stat-value {
          order: 1;
          margin: 0;
          color: #ffffff;
          font-size: clamp(2rem, 3vw, 2.75rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .gf-stat-suffix { font-size: 0.45em; color: rgba(255, 255, 255, 0.45); margin-left: 0.15em; letter-spacing: 0; }
        .gf-stat-sub {
          order: 3;
          margin: 0.25rem 0 0;
          color: rgba(255, 255, 255, 0.45);
          font-size: 0.75rem;
        }
        @media (max-width: 1024px) {
          .gf-stats-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .gf-stat:nth-child(4) { border-left: 0; padding-left: 0; }
          .gf-stat:nth-child(n + 4) { border-top: 1px solid rgba(255, 255, 255, 0.08); }
        }
        @media (max-width: 640px) {
          .gf-stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .gf-stat { padding: 1.5rem 1rem; border-left: 1px solid rgba(255, 255, 255, 0.08) !important; padding-left: 1rem !important; border-top: 1px solid rgba(255, 255, 255, 0.08); }
          .gf-stat:nth-child(odd) { border-left: 0 !important; padding-left: 0 !important; }
          .gf-stat:nth-child(-n + 2) { border-top: 0; }
          .gf-stat:last-child { grid-column: span 2; border-left: 0 !important; padding-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
