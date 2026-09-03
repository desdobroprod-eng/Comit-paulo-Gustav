# Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo

Next.js (App Router) + TypeScript + Tailwind v4. Ver README.md para detalhes de conteúdo e stack.

Nome do Comitê: NÃO abreviar (nem "Comitê Maranhão", nem "Comitê Paulo Gustavo Maranhão") —
usar sempre o nome completo do título acima, em qualquer texto do site/README/copy. Isso já foi
corrigido duas vezes a pedido explícito do Comitê.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Radar Cultural — dado de pessoa real

O mapa em `/radar-cultural` publica nome, foto, município e contato de gente que se cadastrou.
Duas regras que não se quebram:

1. **Coluna privada não vira coluna pública.** O `doGet` de `scripts/apps-script/radar.gs`
   monta a resposta campo por campo justamente pra isso — e-mail e afins ficam na planilha.
   Acrescentou coluna? Decida de que lado ela fica antes de expor.
2. **Sair do mapa apaga a foto.** `scripts/sincronizar-radar.ts` remove de `public/radar/` a
   foto de quem não vem mais na leitura. Sem isso, "me tira do site" derrubaria o pino e
   deixaria o rosto da pessoa no repositório pra sempre.
