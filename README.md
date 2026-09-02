# Comitê Maranhão — site institucional

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

## Analytics (GA4)

Copie `.env.example` para `.env.local` (e configure o mesmo valor em Vercel → Project Settings
→ Environment Variables) e preencha `NEXT_PUBLIC_GA_MEASUREMENT_ID` com o ID de mensuração do
GA4 (formato `G-XXXXXXXXXX`). Sem essa variável o site funciona normalmente, só sem analytics.

Eventos customizados já disparados: `clique_edital`, `clique_certidao`, `clique_grupo_whatsapp`,
`clique_rede_social` (ver `src/components/TrackedLink.tsx` e `src/lib/analytics.ts`).

## Robô semanal de editais

`src/app/api/cron/atualizar-editais` roda toda segunda-feira (configurado em `vercel.json`),
busca os perfis da SECMA e da SECULT-SL na Prosas (`fontesOficiais` em `src/content/editais.ts`
— a pedido do Comitê, é a fonte principal agora, mais fácil de ler que o site de cada governo),
detecta links de edital novos e comita automaticamente em `src/content/editais-auto.json` via
API do GitHub — sem precisar de deploy manual nem de intervenção humana. Itens detectados assim
aparecem no site com o aviso "detectado automaticamente — confirme prazo e valor", porque o
robô lê o link e o texto do link, não o conteúdo do edital.

Variáveis necessárias (ver `.env.example`): `CRON_SECRET`, `GITHUB_TOKEN` (fine-grained PAT
com "Contents: Read and write" só neste repositório), `GITHUB_REPO`, `GITHUB_BRANCH`.

**Importante:** o scraper reconhece o padrão de URL de edital da própria Prosas
(`/editais/{id}-slug`) mais um heurístico genérico de texto ("edital", "chamamento público" etc.)
como reforço. Não foi possível abrir prosas.com.br a partir do ambiente de desenvolvimento
usado para construir isso (rede bloqueada), então o padrão da Prosas não foi testado contra o
HTML real. Deve funcionar assim que publicado na Vercel (que tem acesso normal à internet), mas
o primeiro disparo precisa ser conferido — dispare manualmente uma vez (`GET
/api/cron/atualizar-editais` com o header `Authorization: Bearer <CRON_SECRET>`) e valide o
resultado antes de confiar nele rodando sozinho.

## Radar Cultural MA

`/radar-cultural` é o cadastro de fazedores e fazedoras de cultura. A pedido do Comitê, o
formulário é feito no Google Forms (não Jotform). A página lê a URL do formulário da variável
de ambiente `NEXT_PUBLIC_RADAR_CULTURAL_FORM_URL` — assim que o formulário existir, basta
colar a URL nessa variável em Vercel → Project Settings → Environment Variables, sem tocar em
código. Até lá, a página mostra um aviso de "formulário em configuração".

## Créditos de autoria

`site.idealizadores` em `src/lib/site.ts` já tem o nome de Ben-hur Real Figueiro e da 10Dobro
Prod no rodapé e nos metadados de SEO. Falta preencher `idealizadores.url` com o link oficial
(site ou Instagram da 10Dobro Prod) antes de publicar — deixei em branco para não linkar um
endereço não confirmado.
