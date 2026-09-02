/**
 * Robô semanal de editais — roda via GitHub Actions (.github/workflows/atualizar-editais.yml),
 * não como parte do site (GitHub Pages não tem servidor). Varre os perfis oficiais
 * na Prosas, detecta editais novos e escreve em src/content/editais-auto.json.
 * O commit e o push ficam a cargo do workflow, não deste script.
 *
 * Fontes abaixo espelham `fontesOficiais` em src/content/editais.ts — mantenha
 * as duas em sincronia se o link mudar.
 */
import * as cheerio from "cheerio";
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

type Esfera = "federal" | "estadual" | "municipal";

interface EditalDetectado {
  id: string;
  titulo: string;
  esfera: Esfera;
  orgao: string;
  linkOficial: string;
  detectadoEm: string;
}

const FONTES: Record<"estadual" | "municipal", { url: string; orgao: string }> = {
  estadual: {
    url: "https://prosas.com.br/patrocinadores/1399-secretaria-de-estado-da-cultura-do-maranhao?subdominio=prosas",
    orgao: "Secretaria de Estado da Cultura do Maranhão (SECMA)",
  },
  municipal: {
    url: "https://prosas.com.br/empreendedores/3547-secretaria-municipal-de-cultura-de-sao-luis",
    orgao: "Secretaria Municipal de Cultura de São Luís (SECULT-SL)",
  },
};

const PADRAO_EDITAL = /edital|chamamento p[uú]blico|convocat[óo]ria|premia[çc][ãa]o/i;
// Página de edital na Prosas segue sempre /editais/{id}-{slug} — mais preciso
// que o padrão de texto genérico acima quando a fonte é prosas.com.br.
const PADRAO_PROSAS = /^\/editais\/\d+-/;

function slugify(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function coletarDaFonte(url: string, esfera: "estadual" | "municipal"): Promise<EditalDetectado[]> {
  const resposta = await fetch(url, {
    headers: { "user-agent": "ComiteMaranhao-bot/1.0 (+https://github.com/desdobroprod-eng/Comit-paulo-Gustav)" },
  });
  if (!resposta.ok) throw new Error(`Falha ao buscar ${url}: HTTP ${resposta.status}`);

  const html = await resposta.text();
  const $ = cheerio.load(html);
  const vistos = new Set<string>();
  const encontrados: EditalDetectado[] = [];

  $("a[href]").each((_, el) => {
    const texto = $(el).text().trim().replace(/\s+/g, " ");
    const href = $(el).attr("href") ?? "";
    if (!texto && !href) return;

    const linkAbsoluto = new URL(href, url).toString();
    const bateProsas = PADRAO_PROSAS.test(new URL(linkAbsoluto).pathname);
    const bateTexto = PADRAO_EDITAL.test(texto) || PADRAO_EDITAL.test(href);
    if (!bateProsas && !bateTexto) return;

    if (vistos.has(linkAbsoluto)) return;
    vistos.add(linkAbsoluto);

    encontrados.push({
      id: `${esfera}-${slugify(texto || linkAbsoluto)}`,
      titulo: texto || linkAbsoluto,
      esfera,
      orgao: FONTES[esfera].orgao,
      linkOficial: linkAbsoluto,
      detectadoEm: new Date().toISOString(),
    });
  });

  return encontrados;
}

async function main() {
  const aqui = dirname(fileURLToPath(import.meta.url));
  const caminhoArquivo = join(aqui, "..", "src", "content", "editais-auto.json");

  const [estaduais, municipais] = await Promise.all([
    coletarDaFonte(FONTES.estadual.url, "estadual"),
    coletarDaFonte(FONTES.municipal.url, "municipal"),
  ]);
  const coletados = [...estaduais, ...municipais];

  const atual: EditalDetectado[] = JSON.parse(readFileSync(caminhoArquivo, "utf-8"));
  const idsAtuais = new Set(atual.map((e) => e.id));
  const novos = coletados.filter((e) => !idsAtuais.has(e.id));

  if (novos.length === 0) {
    console.log(`Nada novo. ${coletados.length} edital(is) revisado(s), 0 novo(s).`);
    return;
  }

  const listaFinal = [...atual, ...novos];
  writeFileSync(caminhoArquivo, `${JSON.stringify(listaFinal, null, 2)}\n`, "utf-8");
  console.log(`${novos.length} edital(is) novo(s) adicionados de ${coletados.length} revisado(s):`);
  for (const e of novos) console.log(`  - [${e.esfera}] ${e.titulo} — ${e.linkOficial}`);
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
