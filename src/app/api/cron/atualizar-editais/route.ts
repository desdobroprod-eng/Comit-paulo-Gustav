import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import type { Esfera } from "@/lib/site";
import { fontesOficiais } from "@/content/editais";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface EditalDetectado {
  id: string;
  titulo: string;
  esfera: Esfera;
  orgao: string;
  linkOficial: string;
  detectadoEm: string;
}

const orgaoPorEsfera: Record<Esfera, string> = {
  federal: "Ministério da Cultura",
  estadual: "Secretaria de Estado da Cultura do Maranhão (SECULT-MA)",
  municipal: "Secretaria Municipal de Cultura de São Luís (SECULT-SL)",
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

/** Extrai candidatos a edital de uma página oficial: links cujo texto ou href batem com PADRAO_EDITAL. */
async function coletarDaFonte(url: string, esfera: Esfera): Promise<EditalDetectado[]> {
  const resposta = await fetch(url, {
    headers: { "user-agent": "ComitePauloGustavoMA-bot/1.0 (+https://comitepaulogustavo.ma)" },
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
      orgao: orgaoPorEsfera[esfera],
      linkOficial: linkAbsoluto,
      detectadoEm: new Date().toISOString(),
    });
  });

  return encontrados;
}

async function lerArquivoAtualNoGitHub(repo: string, branch: string, token: string) {
  const url = `https://api.github.com/repos/${repo}/contents/src/content/editais-auto.json?ref=${branch}`;
  const resposta = await fetch(url, {
    headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json" },
  });
  if (!resposta.ok) throw new Error(`GitHub GET falhou: HTTP ${resposta.status}`);
  const dados = await resposta.json();
  const conteudo = Buffer.from(dados.content, "base64").toString("utf-8");
  return { sha: dados.sha as string, lista: JSON.parse(conteudo) as EditalDetectado[] };
}

async function commitarNoGitHub(
  repo: string,
  branch: string,
  token: string,
  sha: string,
  lista: EditalDetectado[],
) {
  const url = `https://api.github.com/repos/${repo}/contents/src/content/editais-auto.json`;
  const conteudo = Buffer.from(`${JSON.stringify(lista, null, 2)}\n`, "utf-8").toString("base64");
  const resposta = await fetch(url, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      accept: "application/vnd.github+json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      message: `chore(editais): atualização automática semanal (${new Date().toISOString().slice(0, 10)})`,
      content: conteudo,
      sha,
      branch,
    }),
  });
  if (!resposta.ok) {
    const texto = await resposta.text();
    throw new Error(`GitHub PUT falhou: HTTP ${resposta.status} — ${texto}`);
  }
}

export async function GET(request: NextRequest) {
  const segredo = process.env.CRON_SECRET;
  if (segredo && request.headers.get("authorization") !== `Bearer ${segredo}`) {
    return NextResponse.json({ erro: "não autorizado" }, { status: 401 });
  }

  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "claude/paulo-gustavo-dom-site-1izkpv";
  const token = process.env.GITHUB_TOKEN;
  if (!repo || !token) {
    return NextResponse.json(
      { erro: "GITHUB_REPO e GITHUB_TOKEN precisam estar configurados nas variáveis de ambiente" },
      { status: 500 },
    );
  }

  try {
    const [estaduais, municipais] = await Promise.all([
      coletarDaFonte(fontesOficiais.estadual.url, "estadual"),
      coletarDaFonte(fontesOficiais.municipal.url, "municipal"),
    ]);
    const coletados = [...estaduais, ...municipais];

    const { sha, lista: atual } = await lerArquivoAtualNoGitHub(repo, branch, token);
    const idsAtuais = new Set(atual.map((e) => e.id));
    const novos = coletados.filter((e) => !idsAtuais.has(e.id));

    if (novos.length === 0) {
      return NextResponse.json({ atualizado: false, novos: 0, totalColetado: coletados.length });
    }

    const listaFinal = [...atual, ...novos];
    await commitarNoGitHub(repo, branch, token, sha, listaFinal);

    return NextResponse.json({ atualizado: true, novos: novos.length, totalColetado: coletados.length });
  } catch (erro) {
    return NextResponse.json({ erro: erro instanceof Error ? erro.message : "erro desconhecido" }, { status: 500 });
  }
}
