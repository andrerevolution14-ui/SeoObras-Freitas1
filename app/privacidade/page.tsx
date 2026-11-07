import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import { CONTRACTOR_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade e Proteção de Dados (RGPD)",
  description:
    "Política de privacidade e proteção de dados da Freitas Renovações LDA em Aveiro. Saiba como recolhemos, protegemos e tratamos os seus dados pessoais de acordo com o RGPD.",
  alternates: { canonical: "https://www.grupofreitasrenovacoes.pt/privacidade" },
  robots: { index: true, follow: true },
};

const privacidadeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Política de Privacidade — Freitas Renovações LDA",
      url: "https://www.grupofreitasrenovacoes.pt/privacidade",
      description: "Informações sobre tratamento de dados pessoais e direitos dos utilizadores de acordo com o RGPD.",
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
          name: "Política de Privacidade",
          item: "https://www.grupofreitasrenovacoes.pt/privacidade",
        },
      ],
    },
  ],
};

export default function PrivacidadePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacidadeJsonLd) }}
      />

      {/* Hero Header */}
      <section
        style={{
          background: "linear-gradient(135deg, #0A0A0A 0%, #171717 100%)",
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
            <span style={{ color: "#D4D4D4" }}>Política de Privacidade</span>
          </nav>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(128, 128, 128, 0.15)",
              border: "1px solid rgba(128, 128, 128, 0.3)",
              color: "#D4D4D4",
              fontSize: "0.75rem",
              fontWeight: 800,
              padding: "0.35rem 0.85rem",
              borderRadius: "0.25rem",
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            <Lock size={14} />
            Conformidade com o RGPD (UE 2016/679)
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
            Política de Privacidade e Proteção de Dados
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.0625rem", lineHeight: 1.7 }}>
            A Freitas Renovações LDA assume um compromisso inequívoco com a privacidade e proteção dos dados pessoais dos seus clientes e utilizadores em estrita conformidade com a legislação portuguesa e europeia.
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8125rem", marginTop: "0.75rem" }}>
            Última atualização: 15 de outubro de 2026
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding" style={{ background: "#ffffff", color: "#3A3A3A" }}>
        <div className="section-container" style={{ maxWidth: "860px", lineHeight: 1.8, fontSize: "1rem" }}>
          {/* Box de Identificação do Responsável */}
          <div
            style={{
              padding: "1.5rem",
              background: "#F7F7F5",
              border: "1.5px solid #E5E5E3",
              borderRadius: "0.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0A0A0A", marginBottom: "0.75rem" }}>
              1. Responsável pelo Tratamento dos Dados
            </h2>
            <p style={{ marginBottom: "0.75rem" }}>
              A entidade responsável pela recolha e tratamento dos dados pessoais através deste website é:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              <li><strong>Denominação Social:</strong> {CONTRACTOR_INFO.companyName}</li>
              <li><strong>Titularidade Técnica:</strong> Jorge Freitas (Empreiteiro Geral)</li>
              <li><strong>Alvará IMPIC:</strong> N.º 104523 (Obras Particulares)</li>
              <li><strong>Sede:</strong> {CONTRACTOR_INFO.address.street}, {CONTRACTOR_INFO.address.postalCode} {CONTRACTOR_INFO.address.city}, Portugal</li>
              <li><strong>Email de Contacto RGPD:</strong> <a href={`mailto:${CONTRACTOR_INFO.email}`} style={{ color: "#171717", fontWeight: 600 }}>{CONTRACTOR_INFO.email}</a></li>
              <li><strong>Telefone:</strong> <a href={`tel:${CONTRACTOR_INFO.phone}`} style={{ color: "#171717", fontWeight: 600 }}>{CONTRACTOR_INFO.phoneDisplay}</a></li>
            </ul>
          </div>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0A0A0A", marginTop: "2rem", marginBottom: "0.75rem" }}>
            2. Que Dados Pessoais Recolhemos e com que Finalidade?
          </h2>
          <p>
            Recolhemos apenas os dados estritamente necessários para dar resposta às solicitações dos utilizadores, nomeadamente através dos nossos formulários de contacto e de pedido de orçamento:
          </p>
          <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
            <li><strong>Identificação e Contacto:</strong> Nome, número de telefone e endereço de correio eletrónico, com a finalidade de estabelecer contacto direto, esclarecer dúvidas e apresentar propostas orçamentais.</li>
            <li><strong>Dados de Localização e Imóvel:</strong> Freguesia ou concelho de intervenção, tipologia do imóvel e fotografias ou dimensões fornecidas, com a finalidade exclusiva de estimar mão de obra, materiais e logística da obra.</li>
            <li><strong>Necessidade de Financiamento:</strong> Indicação voluntária de interesse em apoio à intermediação de crédito para obras, encaminhado apenas mediante autorização prévia para o intermediário financeiro parceiro certificado pelo Banco de Portugal.</li>
          </ul>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0A0A0A", marginTop: "2rem", marginBottom: "0.75rem" }}>
            3. Fundamento Jurídico do Tratamento
          </h2>
          <p>
            O tratamento dos dados baseia-se nas seguintes alíneas do Artigo 6.º do RGPD:
          </p>
          <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
            <li><strong>Diligências pré-contratuais a pedido do titular:</strong> Para elaboração e envio de estimativas e propostas de orçamento a seu pedido expresso.</li>
            <li><strong>Execução de contrato de empreitada:</strong> Em caso de adjudicação da obra, para o cumprimento rigoroso de todas as fases de construção e entrega chave na mão.</li>
            <li><strong>Cumprimento de obrigações jurídicas e legais:</strong> Faturação eletrónica comunicada à Autoridade Tributária e salvaguarda dos registos legalmente exigidos pelo IMPIC.</li>
          </ul>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0A0A0A", marginTop: "2rem", marginBottom: "0.75rem" }}>
            4. Prazos de Conservação dos Dados
          </h2>
          <p>
            Os dados pessoais recolhidos para pedidos de orçamento que não resultem em adjudicação de obra são conservados por um período máximo de <strong>12 meses</strong>, sendo eliminados de forma segura após esse prazo.
          </p>
          <p>
            Para obras adjudicadas e executadas, os dados fiscais e os contratos são conservados pelo prazo legal de <strong>10 anos</strong> para cumprimento das normas fiscais e salvaguarda da garantia legal de construção civil (até 5 anos).
          </p>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0A0A0A", marginTop: "2rem", marginBottom: "0.75rem" }}>
            5. Direitos dos Titulares dos Dados
          </h2>
          <p>
            Ao abrigo do RGPD, tem o direito de, a qualquer momento e de forma gratuita:
          </p>
          <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
            <li>Solicitar o <strong>acesso</strong> aos seus dados pessoais guardados nos nossos sistemas;</li>
            <li>Exigir a <strong>retificação</strong> de dados inexatos ou incompletos;</li>
            <li>Pedir o <strong>apagamento</strong> dos seus dados (“direito a ser esquecido”), quando já não sejam necessários para as finalidades contratuais ou fiscais;</li>
            <li>Solicitar a <strong>limitação</strong> ou <strong>oposição</strong> ao tratamento dos seus dados;</li>
            <li>Receber os seus dados em formato estruturado (<strong>portabilidade</strong>).</li>
          </ul>
          <p>
            Para exercer qualquer um destes direitos, basta enviar um pedido por escrito para <a href={`mailto:${CONTRACTOR_INFO.email}`} style={{ color: "#171717", fontWeight: 600 }}>{CONTRACTOR_INFO.email}</a>. Responderemos com brevidade e no prazo máximo estipulado pela lei (30 dias).
          </p>
          <p>
            Tem igualmente o direito de apresentar reclamação junto da autoridade de controlo nacional em Portugal: <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong> — Av. D. Carlos I, 134 - 1.º, 1200-651 Lisboa (www.cnpd.pt).
          </p>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0A0A0A", marginTop: "2rem", marginBottom: "0.75rem" }}>
            6. Partilha de Dados com Terceiros
          </h2>
          <p>
            A Freitas Renovações LDA <strong>não vende, aluga ou comercializa</strong> os seus dados pessoais a terceiros para efeitos de publicidade ou marketing. A partilha restringe-se estritamente a subcontratantes técnicos essenciais (como serviços de alojamento web seguro, gestão de email transacional ou contabilidade certificada), todos vinculados a rigorosos deveres de sigilo e conformidade com o RGPD.
          </p>

          <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0A0A0A", marginTop: "2rem", marginBottom: "0.75rem" }}>
            7. Segurança da Informação
          </h2>
          <p>
            O nosso website utiliza protocolos de comunicação encriptados <strong>HTTPS com certificado SSL/TLS</strong> atualizado, garantindo que qualquer informação enviada nos formulários viaja de forma totalmente segura e confidencial entre o seu navegador e os nossos servidores.
          </p>

          {/* Contact Box */}
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              background: "linear-gradient(135deg, #0A0A0A, #171717)",
              borderRadius: "0.5rem",
              color: "#ffffff",
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                Dúvidas sobre a privacidade dos seus dados?
              </h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem" }}>
                Fale diretamente com o Empreiteiro Jorge Freitas e esclareça qualquer questão.
              </p>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href={`tel:${CONTRACTOR_INFO.phone}`}
                className="btn-primary"
                style={{ padding: "0.75rem 1.25rem", fontSize: "0.875rem" }}
              >
                <Phone size={15} /> {CONTRACTOR_INFO.phoneDisplay}
              </a>
              <Link
                href="/orcamento"
                className="btn-secondary"
                style={{ padding: "0.75rem 1.25rem", fontSize: "0.875rem", background: "rgba(255,255,255,0.1)", color: "#ffffff", borderColor: "rgba(255,255,255,0.2)" }}
              >
                Pedir Orçamento
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
