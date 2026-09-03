/**
 * Robô do Radar Cultural — roda via GitHub Actions
 * (.github/workflows/sincronizar-radar.yml), não como parte do site: GitHub
 * Pages não tem servidor.
 *
 * O mapa já busca os perfis direto do endpoint quando a pessoa abre a página,
 * então isto NÃO é o que faz o pino aparecer. O que este robô faz é assar os
 * perfis dentro do repositório, e isso importa por três motivos: o mapa pinta
 * na primeira renderização sem esperar o Google; continua de pé se o Apps
 * Script cair ou estourar cota; e o conteúdo entra no HTML, que é o que
 * buscador e busca por IA conseguem ler.
 *
 * Também é aqui que a foto sai do Drive e vira arquivo do repositório — mais
 * rápido de carregar e sem depender de link de terceiro pra sempre existir.
 */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

interface PerfilPublico {
  id: string;
  nome: string;
  tipo: string;
  linguagens: string[];
  municipio: string;
  bairro?: string;
  sobre: string;
  foto?: string;
  whatsapp?: string;
  instagram?: string;
  site?: string;
  atuaDesde?: number;
  lat: number;
  lng: number;
  cadastradoEm: string;
}

const TIPOS = new Set(["pessoa", "coletivo", "organizacao"]);
/** Mesmos limites do Apps Script — pino fora do Maranhão não entra no repositório. */
const LIMITES = { latMin: -11.0, latMax: -0.5, lngMin: -49.5, lngMax: -41.0 };

/**
 * O endpoint é público, mas o que vem dele é texto de fora: qualquer pessoa
 * pode ter mandado qualquer coisa pelo formulário. Nada entra no repositório
 * sem passar por aqui.
 */
function saneado(bruto: unknown): PerfilPublico | null {
  if (!bruto || typeof bruto !== "object") return null;
  const p = bruto as Record<string, unknown>;

  const texto = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const id = texto(p.id, 80);
  const nome = texto(p.nome, 120);
  const sobre = texto(p.sobre, 280);
  const municipio = texto(p.municipio, 80);
  const lat = Number(p.lat);
  const lng = Number(p.lng);
  const linguagens = Array.isArray(p.linguagens)
    ? p.linguagens.map((l) => texto(l, 60)).filter(Boolean).slice(0, 6)
    : [];

  if (!id || !nome || !sobre || !municipio || linguagens.length === 0) return null;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < LIMITES.latMin || lat > LIMITES.latMax) return null;
  if (lng < LIMITES.lngMin || lng > LIMITES.lngMax) return null;

  const whatsapp = texto(p.whatsapp, 20).replace(/\D/g, "");
  const ano = Number(p.atuaDesde);

  return {
    id,
    nome,
    tipo: TIPOS.has(String(p.tipo)) ? String(p.tipo) : "pessoa",
    linguagens,
    municipio,
    bairro: texto(p.bairro, 80) || undefined,
    sobre,
    foto: texto(p.foto, 400) || undefined,
    whatsapp: whatsapp || undefined,
    instagram: texto(p.instagram, 60).replace(/^@/, "") || undefined,
    site: texto(p.site, 200) || undefined,
    atuaDesde: Number.isInteger(ano) && ano > 1900 && ano <= new Date().getFullYear() ? ano : undefined,
    lat,
    lng,
    cadastradoEm: texto(p.cadastradoEm, 40) || new Date().toISOString(),
  };
}

/** Baixa a foto do Drive pro repositório. Falhou? Volta sem foto, e o pino cai na inicial. */
async function baixarFoto(perfil: PerfilPublico, pasta: string): Promise<string | undefined> {
  if (!perfil.foto || perfil.foto.startsWith("/")) return perfil.foto;
  const destino = join(pasta, `${perfil.id}.jpg`);
  try {
    const r = await fetch(perfil.foto);
    if (!r.ok) return undefined;
    const bytes = Buffer.from(await r.arrayBuffer());
    // Guarda contra devolverem uma página de erro em HTML no lugar da imagem.
    if (bytes.length < 500 || bytes.length > 3_000_000) return undefined;
    writeFileSync(destino, bytes);
    return `/radar/${perfil.id}.jpg`;
  } catch {
    return undefined;
  }
}

async function main() {
  const endpoint = process.env.RADAR_ENDPOINT;
  if (!endpoint) {
    console.log("RADAR_ENDPOINT não configurado — nada a sincronizar ainda.");
    return;
  }

  const aqui = dirname(fileURLToPath(import.meta.url));
  const arquivoJson = join(aqui, "..", "src", "content", "radar-auto.json");
  const pastaFotos = join(aqui, "..", "public", "radar");
  mkdirSync(pastaFotos, { recursive: true });

  const resposta = await fetch(endpoint);
  if (!resposta.ok) throw new Error(`Endpoint respondeu ${resposta.status}`);
  const bruto: unknown = await resposta.json();
  if (!Array.isArray(bruto)) throw new Error("Endpoint não devolveu uma lista.");

  const perfis: PerfilPublico[] = [];
  for (const item of bruto) {
    const perfil = saneado(item);
    if (!perfil) continue;
    perfil.foto = await baixarFoto(perfil, pastaFotos);
    perfis.push(perfil);
  }

  /*
   * Quem saiu do mapa leva a foto junto. Sem isto, pedir "me tira do site"
   * derrubaria o pino e deixaria o rosto da pessoa no repositório pra sempre.
   */
  const idsVivos = new Set(perfis.map((p) => p.id));
  for (const arquivo of existsSync(pastaFotos) ? readdirSync(pastaFotos) : []) {
    if (!arquivo.endsWith(".jpg")) continue;
    if (!idsVivos.has(arquivo.replace(/\.jpg$/, ""))) {
      rmSync(join(pastaFotos, arquivo));
      console.log(`Foto removida (perfil saiu do mapa): ${arquivo}`);
    }
  }

  perfis.sort((a, b) => a.cadastradoEm.localeCompare(b.cadastradoEm));
  writeFileSync(arquivoJson, `${JSON.stringify(perfis, null, 2)}\n`, "utf-8");
  console.log(`${perfis.length} perfil(is) no mapa, de ${bruto.length} linha(s) recebida(s).`);
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
