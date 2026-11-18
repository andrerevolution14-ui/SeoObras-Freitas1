import "./trust-bar.css";
import { CONTRACTOR_INFO } from "@/lib/constants";
import { CountUp } from "@/components/count-up";

const stats: { value: React.ReactNode; suffix?: string; label: string; sub: string }[] = [
  { value: <CountUp to={CONTRACTOR_INFO.projectsCompleted} suffix="+" />, label: "Obras concluídas", sub: "Aveiro e concelhos vizinhos" },
  { value: <CountUp to={CONTRACTOR_INFO.googleRating} decimals={1} />, suffix: "/5", label: "Avaliação Google", sub: `${CONTRACTOR_INFO.reviewCount} avaliações verificadas` },
  { value: "124371-PAR", label: "Alvará de construção", sub: "Empreiteiro de obras particulares" },
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


    </div>
  );
}
