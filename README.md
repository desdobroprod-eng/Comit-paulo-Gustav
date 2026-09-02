# Comitê Paulo Gustavo Maranhão — site institucional

Site do **Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura
Paulo Gustavo**, com editais abertos (Estado do Maranhão e São Luís) e links oficiais para
emissão de certidão negativa.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 — tokens de marca em `src/app/globals.css`
- Deploy: Vercel

## Onde editar conteúdo (Fase 1 — sem painel administrativo)

- `src/content/editais.ts` — lista de editais abertos. Os itens marcados `exemplo: true` são
  placeholder e devem ser substituídos por editais reais e conferidos antes de publicar.
- `src/content/certidoes.ts` — links oficiais de emissão de certidão negativa, por esfera.
- `src/lib/site.ts` — nome oficial, tagline e redes sociais do Comitê.
- `src/lib/redirects.ts` — destino dos links de convite dos grupos de WhatsApp (rota `/r/[slug]`).

A Fase 2 do projeto substitui `editais.ts` e `certidoes.ts` por um painel administrativo
(`/admin`) com login, para que o próprio Comitê cadastre e atualize esse conteúdo sem depender
de deploy.

## Manual de marca

Rascunho publicado como referência de paleta, tipografia e uso do logotipo — aplicado nos
tokens de `globals.css`.
