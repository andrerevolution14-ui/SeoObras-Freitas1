# Integração /capa, SEO e desempenho móvel

Data: 18 de novembro de 2026. Base: `364f8fc`, branch `master`. Implementação: `feat/capa-seo-mobile`.

## Resultado

- Home técnica preservada em `/`, experiência visual original adaptada em `/capa`, com o cabeçalho, logótipo, cores, fontes e rodapé partilhados.
- Entrada “A Empresa” nos menus desktop/móvel e rodapé; secção curta “Conheça a Freitas” na home. Botões de orçamento encaminhados para `/#hero-form`, e “Ver serviços e obras” para `/`.
- Recursos WebP selecionados do site estético, poster móvel recortado sem reduzir a altura original, carregamento das sequências após scroll, cache de frames limitada, movimento reduzido e ligações para saltar animações.
- Vídeo da home adiado até interação e visibilidade; imagens do blog, projetos e clientes passam pelo Next/Image; estilos retirados do HTML dos componentes para ficheiros próprios; dependências sem utilização removidas. Fontes auto-hospedadas com `swap`.
- Metadados únicos e limitados em 61 páginas, canónicos, cartões sociais 1200×630, idioma pt-PT, theme-color, sitemap e llms.txt. FAQs com títulos H3; removida a duplicação do FAQPage da home; alvará incluído no schema da empresa. Cinco ligações antigas da calculadora corrigidas.
- Robots permite os rastreadores de IA pedidos. API e caminhos reservados de administração/agradecimento recebem `X-Robots-Tag: noindex, nofollow`; atualmente não existem páginas privadas ou de agradecimento dedicadas.
- Endpoints e lógica de conversão mantidos. Em `/api/contact`, a alteração é apenas de tipagem TypeScript.

## Lighthouse móvel

Relatórios obtidos no Chrome DevTools, Lighthouse 13.5.0, navegação, emulação Moto G Power, Slow 4G simulado, servidor local de produção. A `/capa` respondia 404 na base e não tem uma medição “antes” comparável. Pontuações não garantem o comportamento em produção.

| Página | Desempenho | LCP | CLS | TBT | Acessibilidade | SEO |
|---|---:|---:|---:|---:|---:|---:|
| / antes | 83 | 4.68 s | 0.000 | 9 ms | 92 | 100 |
| / depois | 88 | 3.91 s | 0.000 | 12 ms | 100 | 100 |
| /capa depois | 88 | 3.91 s | 0.000 | 31 ms | 100 | 100 |

Boas práticas: 100/100 nas três medições. Os ensaios intermédios variaram, incluindo um resultado de 95/100 que não se repetiu de forma consistente; a tabela usa os relatórios finais, sem selecionar o melhor resultado.

**As metas de desempenho ≥90 e LCP <2,5 s ainda não estão cumpridas de forma consistente.** CLS cumpre a meta. Lighthouse Navigation mede TBT, não comprova INP <200 ms: esse objetivo requer medição de interações e dados reais após publicação. Repetir em Vercel/CDN, em dispositivo real, e investigar o caminho crítico das fontes e o volume de HTML/React da home. A opção `experimental.inlineCss` está documentada no README e deve ser reavaliada com essas medições.

Relatórios completos, em HTML e JSON: [home antes](../reports/2026-11-18/home-before.html), [home depois](../reports/2026-11-18/home-after.html), [/capa depois](../reports/2026-11-18/capa-after.html).

## Verificações

- `npm run build`: aprovado, incluindo TypeScript e geração das páginas.
- `npm run lint`: 0 erros e 69 avisos. Base: 6 erros e 76 avisos. Os avisos restantes são sobretudo imports/variáveis já existentes sem utilização; não foram suprimidos globalmente.
- `python3 scripts/check-site.py`: 61 páginas, 97 ligações internas, 63 recursos locais, sem erros. Verifica unicidade e limites de metadados, canónicos, H1, alt, estrutura básica do JSON-LD, robots/llms e 404.
- 44 imagens sociais verificadas: todas com 1200×630.
- Navegador a 390×844: sem scroll horizontal, menu “A Empresa”, salto da experiência, seleção de fase, modo de movimento reduzido e CTA de orçamento verificados. Consola da /capa sem erros na verificação final.
- Formulário móvel percorrido com dados sintéticos até à mensagem de sucesso. API contact: pedido inválido retorna 400; pedido local válido retorna 200 e `telegramSent: false`, pois não existem credenciais locais. **Não foi confirmada entrega externa.**
- A validação de JSON-LD é local; o Rich Results Test deve ser repetido no URL de preview/produção. Não foi simulada uma validação externa inexistente.

## TODO antes de considerar a entrega completa

1. Atingir e confirmar as metas de LCP/desempenho na versão publicada e recolher INP real. Não aprovar apenas pela pontuação de um ensaio isolado.
2. Confirmar no ambiente Vercel `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` e `LEAD_EMAIL_TO`; enviar um pedido de teste e confirmar a sua chegada no destinatário. O comportamento anterior de sucesso HTTP mesmo sem provedor configurado foi mantido, tal como solicitado; a mensagem atual do formulário não prova entrega.
3. Não foram encontrados Meta Pixel, Microsoft Clarity nem gestão de consentimento neste código. Confirmar se são injetados pelo alojamento ou por outro sistema e testar as integrações aí. Google Ads e o evento de conversão existentes foram preservados.
4. Confirmar a denominação social: o repositório usa “Esboço Lisonjeiro, Unipessoal, Lda.”, com a marca Freitas Renovações; o briefing referia “Freitas Renovações, Lda.”. Foi mantido o dado existente. A morada disponível contém apenas código postal/localidade; não foi inventada uma rua.
5. Rever/mesclar a branch e confirmar o deployment Vercel. Depois, validar os dados estruturados no Rich Results Test e reenviar `/sitemap.xml` no Google Search Console. O push de uma branch não substitui a publicação da `master`.

![Pré-visualização móvel da /capa](../reports/2026-11-18/capa-mobile.png)
