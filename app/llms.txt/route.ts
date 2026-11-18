import { CONTRACTOR_INFO, SERVICES, PARISHES } from "@/lib/constants";

export const dynamic = "force-static";

export function GET() {
 const {companyName,legalName,website,phone,email,alvaraNumber}=CONTRACTOR_INFO;
 const body=`# ${companyName}

> Obras e remodelações em Aveiro e concelhos vizinhos. Marca explorada por ${legalName}.

${alvaraNumber}. Contacto: ${phone}. Email: ${email}.
Acompanhamento por ${CONTRACTOR_INFO.contractorName}. Orçamento gratuito e discriminado; os valores e prazos dependem da avaliação de cada obra.

## Páginas principais
- [Serviços e obras](${website}/): página principal e formulário de orçamento.
- [A Empresa](${website}/capa): apresentação visual da Freitas; as sequências conceptuais estão identificadas.
- [Sobre nós](${website}/sobre): identificação e informações da empresa.
- [Projetos](${website}/projetos): portfólio.
- [Clientes](${website}/clientes): opiniões e fotografias publicadas.
- [Pedir orçamento](${website}/#hero-form): formulário existente.
- [Orçamento e calculadora](${website}/orcamento): simulação indicativa.
- [Guias](${website}/blog): artigos sobre remodelações.

## Serviços
${SERVICES.map(s=>`- [${s.shortTitle}](${website}/servicos/${s.slug}): ${s.description}`).join('\n')}

## Área servida
${PARISHES.map(p=>p.name).join(', ')}.
- [Todas as áreas de atuação](${website}/areas-atuacao)

## Referências
- [Sitemap](${website}/sitemap.xml)
- [Privacidade](${website}/privacidade)
- [Termos](${website}/termos)

Os preços publicados são referências, não propostas vinculativas. Consulte a página específica e peça confirmação à empresa para condições atualizadas.
`;
 return new Response(body,{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=3600, s-maxage=86400"}});
}
