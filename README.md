# Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo

![Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo](docs/readme-banner.jpg)

Site institucional do Comitê, com editais abertos (Estado do Maranhão e São Luís) e links
oficiais para emissão de certidão negativa.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js (App Router) + TypeScript, export estático (`output: "export"` em `next.config.ts`)
- Tailwind CSS v4 — tokens de marca em `src/app/globals.css`
- Tipografia: Fraunces (títulos) + Inter (corpo), via `next/font`
- Deploy: **GitHub Pages**, via GitHub Actions (`.github/workflows/deploy.yml`)

## SDD — Documento de Design do Sistema

Visão geral de arquitetura, pra quem chega no projeto sem ter acompanhado a conversa toda.

### Objetivo

Site institucional estático que resolve três problemas concretos do Comitê: (1) centralizar
editais de fomento à cultura abertos no MA/São Luís, (2) reunir os links oficiais de emissão
de certidão negativa exigidos nesses editais, (3) cadastrar fazedores e fazedoras de cultura
(Radar Cultural) pra indicação a produtores/curadores e aviso de edital por área/município.

### Restrição que define a arquitetura

GitHub Pages só serve arquivo estático — sem servidor, sem banco de dados, sem rota de API.
Toda peça "dinâmica" do site (redirect de link, robô de atualização, formulário) teve que ser
resolvida sem depender de um backend próprio: redirect virou página estática com JS,
atualização de dados virou workflow do GitHub Actions que comita direto no repositório, e
cadastro de usuário foi delegado ao Google Forms.

### Diagrama

```mermaid
flowchart LR
    subgraph gha_deploy["GitHub Actions — deploy.yml"]
        push["push na branch"] --> build["next build (output: export)"]
        build --> pages["GitHub Pages"]
    end

    subgraph gha_robo["GitHub Actions — atualizar-editais.yml (cron semanal)"]
        cron["Segunda 09h BRT"] --> scraper["scripts/atualizar-editais.ts"]
        scraper -->|"perfis na Prosas: SECMA e SECULT-SL"| detecta["Edital novo?"]
        detecta -->|sim| commit["commit + push em editais-auto.json"]
        commit --> push
    end

    pages --> site["Site público (comitê + visitante)"]
    site --> ga4["Google Analytics 4"]
    site -->|POST/fetch| apps["Apps Script do Comitê — planilha + Drive"]
```

### Componentes

| Componente | Onde mora | Responsabilidade |
| --- | --- | --- |
| Páginas (`src/app/**/page.tsx`) | build estático | conteúdo e layout de cada rota |
| Conteúdo estruturado (`src/content/*.ts`) | build estático | editais, certidões, FAQ — dados que viram HTML no build |
| `editais-auto.json` | commitado no repo | achados do robô semanal, mesclados com `editais.ts` em runtime de build |
| `scripts/atualizar-editais.ts` | roda só no Actions | scraper — não faz parte do bundle do site |
| Analytics (`GoogleAnalytics.tsx`, `TrackedLink.tsx`) | client-side | GA4, condicional a `NEXT_PUBLIC_GA_MEASUREMENT_ID` existir |
| Radar Cultural | formulário próprio + Apps Script | a planilha e o Drive do Comitê guardam os dados; o site estático não guarda nada |
| `/r/[slug]` | build estático | página por link de convite (WhatsApp), redirect via JS |
| `Modal.tsx` | client-side | janela em `<dialog>` nativo — passo a passo da certidão e menu do celular |
| `Reveal.tsx` | client-side | entrada no scroll, com a base sempre visível (sem JS o conteúdo aparece igual) |
| `Figura.tsx` / `cultura.ts` | build estático | acervo Creative Commons com o crédito que a licença exige |
| `MapaRadar.tsx` / `RadarForm.tsx` | client-side | mapa dos fazedores e o cadastro que alimenta ele |
| `scripts/apps-script/radar.gs` | conta do Google do Comitê | grava na planilha e devolve só as colunas públicas |
| `scripts/sincronizar-radar.ts` | roda só no Actions | assa perfis e fotos no repositório — fora do bundle |

### Decisões e por quê

- **GitHub Pages em vez de Vercel:** zero conta nova, zero token manual pra criar (ver histórico
  da conversa — foi trocado depois de já estar rodando na Vercel). Custo: perde SSR/API routes,
  daí as três adaptações acima.
- **Robô de editais com `confirmarNaFonte`/`detectadoAutomaticamente` em vez de publicar direto:**
  o scraper lê link e texto do link, não o conteúdo do edital — prazo e valor errados num site
  civil tem custo real pra quem depende disso. Marca em vez de confiar sem checar.
- **Radar Cultural no Google Forms em vez de banco próprio:** cadastro de dado pessoal
  (contato, cidade, área de atuação) pedia storage com controle de acesso — GitHub Pages não
  tem onde guardar isso com segurança. Google Forms resolve sem exigir infraestrutura nova.
- **Fonte de editais é a Prosas, não o site de cada governo:** a pedido do Comitê — perfil
  único por órgão, mais fácil de ler manualmente também.

### Limitações conhecidas

- O scraper nunca rodou contra o HTML real da Prosas (ambiente de desenvolvimento usado pra
  escrever isso bloqueia acesso à internet) — primeira execução real precisa de conferência manual.
- Sem painel administrativo: conteúdo de editais/certidões é editado direto no código (Fase 2
  no roadmap).
- PNAB (Política Nacional Aldir Blanc) e Lei Paulo Gustavo são programas diferentes,
  administrados pelas mesmas secretarias — o site mostra os dois, sempre identificando qual é
  qual, pra não passar um pelo outro.

## Deploy — GitHub Pages

Habilitar uma vez, direto no navegador (também funciona pelo celular):

1. `Settings` do repositório → **Pages** → em "Build and deployment", **Source: GitHub Actions**.
2. Pronto. Todo push na branch `claude/paulo-gustavo-dom-site-1izkpv` builda e publica sozinho
   (workflow `deploy.yml`). O link fica em `https://desdobroprod-eng.github.io/Comit-paulo-Gustav/`.

Nenhum token precisa ser criado à mão pra isso — o workflow usa a permissão de deploy que o
próprio GitHub Actions já injeta.

### Domínio próprio

Se um domínio for apontado depois (tipo `comitepaulogustavo.ma`): cria um arquivo
`public/CNAME` com o domínio dentro, muda `basePath` em `next.config.ts` pra `""`, e atualiza
`site.url` em `src/lib/site.ts`.

## Variáveis de build (GitHub → Settings → Secrets and variables → Actions → aba "Variables")

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — código do GA4, formato `G-XXXXXXXXXX`. Pega em
  analytics.google.com → Admin → Fluxos de dados → toca no fluxo Web (não confundir com o
  "Property ID", que é só número). Sem essa variável o site funciona normal, só sem analytics.
- `NEXT_PUBLIC_RADAR_ENDPOINT` — URL do Apps Script do Radar Cultural (ver seção abaixo). Sem
  ela, o formulário aparece mas o envio oferece o Google Forms antigo como alternativa, e o mapa
  mostra só o que estiver assado no repositório.

Ver `.env.example` pros mesmos valores em desenvolvimento local.

## Onde editar conteúdo (Fase 1 — sem painel administrativo)

- `src/content/editais.ts` — lista de editais abertos.
- `src/content/certidoes.ts` — links oficiais de emissão de certidão negativa, por esfera.
- `src/lib/site.ts` — nome oficial, tagline e redes sociais do Comitê.
- `src/lib/redirects.ts` — destino dos links de convite dos grupos de WhatsApp (páginas `/r/*`).

A Fase 2 do projeto substitui `editais.ts` e `certidoes.ts` por um painel administrativo com
login, para que o próprio Comitê cadastre e atualize esse conteúdo sem depender de deploy —
GitHub Pages sendo estático, esse painel não pode morar no próprio site; fica pra decidir onde
hospedar quando chegar a hora.

## Manual de marca

Rascunho publicado como referência de paleta, tipografia e uso do logotipo — aplicado nos
tokens de `globals.css`.

## Acervo de imagem e crédito obrigatório

As fotos e o vídeo em `public/cultura/` são de terceiros, sob licença Creative Commons
(CC BY 4.0, CC BY-SA 4.0/2.0 e CC BY 3.0). Autoria e licença de cada arquivo estão em
`public/cultura/CREDITOS.json`, aparecem na legenda de cada foto e na página `/creditos`.

**Ao trocar ou acrescentar imagem, o crédito vai junto** — sem ele o uso deixa de ser
autorizado pela licença. Cadastre o arquivo no `CREDITOS.json` e em `src/content/cultura.ts`
antes de usá-lo em qualquer página.

## Certidões — por que uma janela e não um link direto

O botão "Como emitir" abre uma janela dentro do próprio site, com o que ter em mãos, o passo a
passo e a validade, e só de dentro dela o portal do órgão abre em outra aba. É decisão do
Comitê (retenção): ninguém sai do site sem saber o que vai encontrar do lado de lá. Embutir o
portal em iframe não é opção — os sites de governo mandam `X-Frame-Options`/CSP e recusam.

O passo a passo mora em `src/content/certidoes.ts` (`precisaDe`, `passos`, `validade`).
Prazo de validade só é afirmado onde é fixado em norma; nos demais casos o texto manda conferir
o que vem impresso na certidão. `certidoesVerificadasEm` registra quando os links foram
conferidos um por um — atualize junto com a conferência.

## Analytics (GA4)

Eventos customizados já disparados: `clique_edital`, `clique_certidao`, `clique_grupo_whatsapp`,
`clique_rede_social`, `clique_fonte_oficial`, `clique_guia_certidoes`,
`abre_passo_a_passo_certidao`, `copia_link_certidao`, `cadastro_radar`,
`clique_whatsapp_radar`, `clique_instagram_radar` e `clique_site_radar` (ver
`src/components/TrackedLink.tsx`, `src/components/CertidaoRow.tsx`,
`src/components/MapaRadar.tsx` e `src/lib/analytics.ts`).

Os dois últimos medem o funil da certidão: quantas pessoas abrem o passo a passo e quantas
dessas de fato seguem para o portal do órgão (`clique_certidao`).

## Robô semanal de editais

GitHub Pages não tem servidor, então o robô não é mais uma rota do site — é um workflow do
GitHub Actions (`.github/workflows/atualizar-editais.yml`) que roda toda segunda-feira,
executa `scripts/atualizar-editais.ts` (busca os perfis da SECMA e da SECULT-SL na Prosas —
`fontesOficiais` em `src/content/editais.ts`, a pedido do Comitê) e, se achar edital novo,
comita direto em `src/content/editais-auto.json` usando o token que o próprio Actions já
fornece (`permissions: contents: write` no workflow) — **nenhum token precisa ser criado à
mão**. Itens detectados assim aparecem no site com o aviso "detectado automaticamente —
confirme prazo e valor", porque o robô lê o link e o texto do link, não o conteúdo do edital.

**Importante:** o scraper reconhece o padrão de URL de edital da própria Prosas
(`/editais/{id}-slug`) mais um heurístico genérico de texto ("edital", "chamamento público"
etc.) como reforço. O ambiente usado para escrever isso não tem acesso à internet aberto —
`npm run atualizar-editais` rodou aqui e falhou por bloqueio de rede local, não por erro no
código (confirmado por `tsc` e pela mensagem de erro, que veio do proxy do ambiente, não da
Prosas). Ele deve funcionar normalmente no GitHub Actions (que tem internet igual qualquer
outro serviço), mas o primeiro disparo precisa ser conferido — vai em **Actions → Robô semanal
de editais → Run workflow** pra rodar na mão uma vez e olhar o log antes de confiar nele
rodando sozinho.

## Radar Cultural MA — mapa e cadastro

`/radar-cultural` tem duas coisas: o **mapa** de quem faz cultura no Maranhão (um pino com a
foto de cada perfil; clicou, abre os detalhes com `wa.me` e redes) e o **cadastro**, um
formulário próprio do site — o Google Forms saiu.

### Como os dados andam

```
Formulário no site ──POST──► Apps Script ──► planilha (todas as colunas)
                                        └──► Drive (foto do perfil)

Mapa ──fetch ao abrir a página──► Apps Script ──► só as colunas públicas de quem tem Publicar = SIM
Robô diário ──lê o mesmo endpoint──► src/content/radar-auto.json + public/radar/*.jpg (comitados)
```

O `fetch` em runtime é o que faz o pino aparecer na hora, sem rebuild — decisão do Comitê. O robô
diário (`.github/workflows/sincronizar-radar.yml` + `scripts/sincronizar-radar.ts`) assa os
mesmos perfis no repositório por três motivos: o mapa pinta na primeira renderização sem esperar
o Google, continua de pé se o Apps Script cair ou estourar cota, e o conteúdo entra no HTML pra
buscador e busca por IA acharem. Se o `fetch` falhar, falha calado e fica o que veio assado.

### Colunas públicas e privadas

Vão pro site: nome, tipo, linguagens, município, bairro, apresentação, foto, WhatsApp, Instagram,
site, ano e as coordenadas. **Ficam só na planilha:** e-mail e qualquer coisa que se acrescente
como privada. O `doGet` do Apps Script devolve campo por campo, de propósito — quem for
acrescentar coluna nova precisa decidir de que lado ela fica. Não há coleta de CPF nem de CNPJ.

Publicação é imediata, sem fila de aprovação (decisão do Comitê). As travas são o consentimento
obrigatório no envio e a coluna **`Publicar`**, que nasce `SIM`: virou `NÃO`, o pino sai do ar na
próxima leitura, e o robô apaga a foto do repositório junto.

### Instalar o endpoint (uma vez, dá pelo celular)

1. Abra a planilha que vai guardar os cadastros → **Extensões → Apps Script**.
2. Apague o que estiver lá e cole `scripts/apps-script/radar.gs`.
3. **Implantar → Nova implantação → App da Web**: executar como *Eu*, acesso *Qualquer pessoa*.
4. Copie a URL (termina em `/exec`).
5. No GitHub: **Settings → Secrets and variables → Actions → Variables** → `NEXT_PUBLIC_RADAR_ENDPOINT`
   com essa URL. O robô diário usa a mesma variável.

Mexeu no `.gs`? Precisa **implantar de novo** (Implantar → Gerenciar implantações → nova versão).
Salvar não publica.

Sem a variável o site segue de pé: o formulário aparece igual e o envio explica que o cadastro
está sendo ligado, oferecendo o Google Forms antigo (`site.radarFormularioAntigo`) como
alternativa.

### Mapa

Leaflet puro (sem react-leaflet), carregado sob demanda dentro do efeito — só a página do Radar
paga o peso. Fundo de tiles da CARTO em duas versões, clara e escura, trocando junto com o botão
de tema; a atribuição do OpenStreetMap e da CARTO é exigida pela licença e não sai do canto do
mapa. Nenhum ícone padrão do Leaflet é usado (o que evita o clássico marcador quebrado sob
`basePath`): todo pino é `divIcon` com HTML nosso, estilizado em `globals.css`.

Ao lado do mapa há a **mesma lista em texto**. Não é redundância: mapa sozinho não se navega por
teclado nem por leitor de tela, e é a lista que sai no HTML.

## Créditos de autoria

`site.idealizadores` em `src/lib/site.ts` já tem o nome de Ben-hur Real Figueiro e da 10Dobro
Prod no rodapé e nos metadados de SEO. Falta preencher `idealizadores.url` com o link oficial
(site ou Instagram da 10Dobro Prod) antes de publicar — deixei em branco para não linkar um
endereço não confirmado.
