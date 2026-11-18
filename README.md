# Freitas Renovações

Site técnico em Next.js App Router. A página principal permanece em `/`; a experiência visual da empresa está em `/capa`. Ambas partilham o cabeçalho, o logótipo, as fontes e o rodapé.

## Desenvolvimento e verificação

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run start
python3 scripts/check-site.py http://localhost:3000
```

O verificador percorre as páginas do sitemap e valida metadados, ligações internas, imagens locais, estrutura básica do JSON-LD, robots e a resposta 404. Não substitui o Rich Results Test nem a verificação de leads em produção.

## Conteúdo e integrações

- `lib/constants.ts`: identidade da empresa, serviços, áreas e FAQs.
- `lib/metadata.ts`: títulos, descrições, canónicos e cartões sociais.
- `components/capa/` e `app/capa/`: apresentação visual e scroll.
- `lib/capa-assets.json`: proveniência dos recursos importados. Ao substituir imagens, alterar também o diretório versionado e as referências, devido à cache imutável.
- `/api/contact`: formulário principal existente, com Telegram/Resend.
- `/api/lead`: endpoint de leads existente.

As credenciais são configuradas no ambiente de alojamento: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` e `LEAD_EMAIL_TO`. Nunca devem ser guardadas no Git.

Fontes Inter, Inter Tight e Libre Caslon Text servidas pelo próprio site através de `next/font`, com `display: swap`. As imagens convencionais usam o otimizador Next/Image; as sequências WebP da `/capa` usam versões móveis e uma cache limitada de frames. O vídeo da home só é carregado depois de interação e quando está visível.

A opção `experimental.inlineCss` do Next 16.3.1 entrega os estilos na resposta inicial. Favorece a primeira visita móvel, com o custo de repetir CSS no HTML. A navegação entre páginas continua a usar os ficheiros CSS gerados. Rever esta opção ao atualizar o Next.

Ver [relatório da integração](docs/capa-seo-mobile.md) e [relatórios de auditoria](reports/2026-11-18/).
