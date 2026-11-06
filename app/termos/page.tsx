import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Shield, CheckCircle, Phone, Scale, Award } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termos e Condições Gerais de Serviço",
  description:
    "Termos e condições gerais de utilização do website e prestação de serviços da Freitas Renovações LDA em Aveiro. Regras de orçamento, garantias de obra e resolução de litígios.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/termos" },
  robots: { index: true, follow: true },
};

const termosJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Termos e Condições Gerais — Freitas Renovações LDA",
      url: "https://www.grupofreitasrenovacoes.pt/termos",
      description: "Condições gerais de prestação de serviços de construção civil e remodelações em Aveiro.",
      inLanguage: "pt-PT",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: "https://www.grupofreitasrenovacoes.pt",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Termos e Condições",
          item: "https://www.grupofreitasrenovacoes.pt/termos",
        },
      ],
    },
  ],
};

export default function TermosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termosJsonLd) }}
      />

      {/* Hero Header */}
      <section
        style={{
          background: "linear-gradient(135deg, #0B1B2E 0%, #13294A 100%)",
          padding: "7.5rem 0 4rem",
          color: "#ffffff",
        }}
      >
        <div className="section-container" style={{ maxWidth: "860px" }}>
          <nav
            style={{
              marginBottom: "1.25rem",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              fontSize: "0.8125rem",
            }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              Início
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
            <span style={{ color: "#C9A86A" }}>Termos e Condições</span>
          </nav>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(184, 147, 90, 0.15)",
              border: "1px solid rgba(184, 147, 90, 0.3)",
              color: "#C9A86A",
              fontSize: "0.75rem",
              fontWeight: 800,
              padding: "0.35rem 0.85rem",
              borderRadius: "0.25rem",
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            <Scale size={14} />
            Transparência &amp; Condições Contratuais
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Termos e Condições Gerais de Serviço
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.0625rem", lineHeight: 1.7 }}>
            Consulte os termos aplicáveis à utilização deste website e às propostas de empreitada e prestação de serviços de remodelação executadas pela Freitas Renovações LDA em Aveiro.
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8125rem", marginTop: "0.75rem" }}>
            Última atualização: 15 de outubro de 2026
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding" style={{ background: "#ffffff", color: "#334155" }}>
        <div className="section-container" style={{ maxWidth: "860px", lineHeight: 1.8, fontSize: "1rem" }}>
          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0B1B2E", marginBottom: "0.75rem" }}>
            1. Identificação da Empresa e Licenciamento
          </h2>
          <p>
            O website <strong>grupofreitasrenovacoes.pt</strong> é operado pela sociedade <strong>{CONTRACTOR_INFO.companyName}</strong>, com sede na {CONTRACTOR_INFO.address.street}, {CONTRACTOR_INFO.address.postalCode} {CONTRACTOR_INFO.address.city}, titular de <strong>Alvará de Construção IMPIC N.º 104523</strong> (Empreiteiro de Obras Particulares emitido pelo Instituto dos Mercados Públicos, do Imobiliário e da Construção) e com apólice de Seguro de Responsabilidade Civil em vigor.
          </p>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0B1B2E", marginTop: "2rem", marginBottom: "0.75rem" }}>
            2. Natureza das Informações e Estimativas de Preço
          </h2>
          <p>
            Os valores apresentados nas tabelas de preços médios por metro quadrado, no simulador de custos e nos artigos do blog são <strong>estimativas orientativas de mercado</strong> para o município de Aveiro e concelhos limítrofes. Não constituem proposta vinculativa até que:
          </p>
          <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
            <li>Seja efetuada a análise detalhada das dimensões, estado de conservação do imóvel e fotografias pelo Empreiteiro Jorge Freitas;</li>
            <li>Seja validado tecnicamente o local da obra para verificação de canalizações, circuitos elétricos e condicionantes estruturais;</li>
            <li>Seja emitido um <strong>Orçamento Discriminado Formal com Preço Fechado</strong> e respetivo caderno de encargos assinado por ambas as partes.</li>
          </ul>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0B1B2E", marginTop: "2rem", marginBottom: "0.75rem" }}>
            3. Processo de Orçamentação em 3 Fases
          </h2>
          <p>
            Para garantir rigor financeiro e evitar desvios orçamentais, o processo de contratação rege-se pelas seguintes etapas:
          </p>
          <ol style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
            <li><strong>Primeira Resposta &amp; Estimativa Indicativa:</strong> No prazo de 12 a 24 horas após o envio de fotografias e medidas pelo cliente, apresentamos uma análise preliminar com intervalos de custo esperados.</li>
            <li><strong>Validação Técnica no Local:</strong> Agendamento de visita técnica para medições de precisão e diagnóstico estrutural.</li>
            <li><strong>Proposta Fechada e Contrato:</strong> Apresentação de mapa de quantidades com descrição exata de materiais, mão de obra, prazos de execução e garantia por escrito.</li>
          </ol>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0B1B2E", marginTop: "2rem", marginBottom: "0.75rem" }}>
            4. Garantias Legais de Construção Civil
          </h2>
          <p>
            Todas as obras executadas pela Freitas Renovações LDA beneficiam das garantias legais previstas no Código Civil português e na legislação da atividade da construção:
          </p>
          <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
            <li><strong>Elementos estruturais e obras profundas:</strong> Garantia legal de até 5 anos contra defeitos de execução;</li>
            <li><strong>Equipamentos e materiais instalados:</strong> Garantia direta dos respetivos fabricantes (louças sanitárias, caixilharias PVC, aparelhos elétricos e torneiras);</li>
            <li><strong>Compromisso pós-obra:</strong> Assistência técnica prioritária para afinações e revisões de pormenores após a entrega da chave na mão.</li>
          </ul>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0B1B2E", marginTop: "2rem", marginBottom: "0.75rem" }}>
            5. Cumprimento de Normas de Ruído e Condomínios
          </h2>
          <p>
            Em intervenções em frações autónomas sujeitas a regime de condomínio, a nossa equipa assegura o cumprimento do Regulamento Geral do Ruído (horários de obras em dias úteis entre as 08h00 e as 20h00), a afixação do aviso prévio no hall de entrada e a proteção das zonas comuns (elevadores e escadas) durante o transporte de materiais e remoção de entulho.
          </p>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0B1B2E", marginTop: "2rem", marginBottom: "0.75rem" }}>
            6. Propriedade Intelectual
          </h2>
          <p>
            Todos os conteúdos textuais, logótipos e registos fotográficos de projetos reais publicados no website pertencem à Freitas Renovações LDA ou são utilizados com autorização. É estritamente proibida a sua reprodução sem consentimento prévio por escrito.
          </p>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0B1B2E", marginTop: "2rem", marginBottom: "0.75rem" }}>
            7. Resolução Alternativa de Litígios de Consumo (RAL)
          </h2>
          <p>
            Em cumprimento do Artigo 18.º da Lei n.º 144/2015, informa-se que em caso de litígio o consumidor pode recorrer a uma entidade de Resolução Alternativa de Litígios de Consumo competente na área geográfica de Aveiro:
          </p>
          <div
            style={{
              padding: "1.25rem",
              background: "#f8fafc",
              border: "1.5px solid #e2e8f0",
              borderRadius: "0.5rem",
              margin: "1rem 0 1.5rem",
            }}
          >
            <p style={{ fontWeight: 700, color: "#0B1B2E", marginBottom: "0.25rem" }}>
              CIAB — Centro de Informação, Mediação e Arbitragem de Consumo / Tribunal Arbitral de Consumo
            </p>
            <p style={{ margin: 0, fontSize: "0.9375rem" }}>
              Ou Centro de Arbitragem de Conflitos de Consumo do Distrito de Coimbra / Região Centro: <a href="https://www.centrodearbitragemdecentro.pt" target="_blank" rel="noopener noreferrer" style={{ color: "#13294A", fontWeight: 600 }}>www.centrodearbitragemdecentro.pt</a>
            </p>
          </div>

          <p>
            Poderá ainda aceder à Plataforma Europeia de Resolução de Litígios em Linha (RLL) disponível em: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: "#13294A", fontWeight: 600 }}>ec.europa.eu/consumers/odr</a>.
          </p>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0B1B2E", marginTop: "2rem", marginBottom: "0.75rem" }}>
            8. Contactos para Questões Contratuais
          </h2>
          <p>
            Para qualquer esclarecimento sobre os presentes termos, contacte-nos através do endereço <a href={`mailto:${CONTRACTOR_INFO.email}`} style={{ color: "#13294A", fontWeight: 600 }}>{CONTRACTOR_INFO.email}</a> ou ligue para o <a href={`tel:${CONTRACTOR_INFO.phone}`} style={{ color: "#13294A", fontWeight: 600 }}>{CONTRACTOR_INFO.phoneDisplay}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
