import radarAutoRaw from "./radar-auto.json";
import { basePath } from "@/lib/site";

/**
 * Radar Cultural — quem faz cultura no Maranhão, no mapa.
 *
 * Estes são os campos PÚBLICOS: tudo aqui aparece no site, é indexável por
 * busca e sai no HTML. E-mail, telefone alternativo e nome de quem preencheu
 * ficam só na planilha do Comitê — o endpoint não devolve essas colunas e elas
 * nunca entram neste arquivo nem no radar-auto.json. Se um dia alguém for
 * acrescentar campo aqui, essa é a linha que não se cruza.
 */
export type TipoPerfil = "pessoa" | "coletivo" | "organizacao";

export interface PerfilRadar {
  id: string;
  nome: string;
  tipo: TipoPerfil;
  /** Linguagens artísticas — ver `linguagens` abaixo. */
  linguagens: string[];
  municipio: string;
  bairro?: string;
  /** Até 280 caracteres, escrito pela própria pessoa. */
  sobre: string;
  /**
   * Foto do perfil. Depois que o robô diário roda, é o arquivo local
   * (`/radar/<id>.jpg`); antes disso, a miniatura no Drive devolvida pelo
   * endpoint. Pode não existir — o pino cai na inicial sobre cor.
   */
  foto?: string;
  /** Só dígitos, com DDI (ex.: 5598991234567). Vira wa.me na hora de montar o link. */
  whatsapp?: string;
  instagram?: string;
  site?: string;
  atuaDesde?: number;
  lat: number;
  lng: number;
  /** ISO. Serve pro mapa saber o que é mais novo que o build. */
  cadastradoEm: string;
}

export const rotuloTipo: Record<TipoPerfil, string> = {
  pessoa: "Artista",
  coletivo: "Coletivo",
  organizacao: "Organização",
};

/**
 * Linguagens artísticas oferecidas no formulário. A ordem aqui é a ordem que
 * aparece na tela, e a cor é a do pino de quem escolhe a linguagem como
 * primeira — todas saídas do manual de marca.
 */
export const linguagens = [
  { id: "bumba-meu-boi", nome: "Bumba meu boi", cor: "var(--color-ambar)" },
  { id: "tambor-de-crioula", nome: "Tambor de Crioula", cor: "var(--color-terracota)" },
  { id: "danca", nome: "Dança", cor: "var(--color-violeta)" },
  { id: "musica", nome: "Música", cor: "var(--color-turquesa)" },
  { id: "teatro", nome: "Teatro", cor: "var(--color-ambar-fundo)" },
  { id: "audiovisual", nome: "Audiovisual", cor: "var(--color-violeta)" },
  { id: "artes-visuais", nome: "Artes visuais", cor: "var(--color-turquesa)" },
  { id: "literatura", nome: "Literatura", cor: "var(--color-terracota)" },
  { id: "artesanato", nome: "Artesanato", cor: "var(--color-ambar)" },
  { id: "cultura-popular", nome: "Cultura popular e tradicional", cor: "var(--color-ambar-fundo)" },
  { id: "circo", nome: "Circo", cor: "var(--color-violeta)" },
  { id: "producao", nome: "Produção cultural", cor: "var(--color-turquesa)" },
  { id: "outra", nome: "Outra", cor: "var(--color-tinta-fraca)" },
] as const;

export function corDaLinguagem(nome: string | undefined): string {
  return linguagens.find((l) => l.nome === nome)?.cor ?? "var(--color-ambar)";
}

/**
 * Perfis mantidos à mão pelo Comitê (mesmo papel de `editaisManuais` em
 * editais.ts). Começa vazio de propósito: mapa de gente real não se semeia com
 * gente inventada — o primeiro pino é de quem se cadastrar.
 */
const perfisManuais: PerfilRadar[] = [];

const perfisAuto = radarAutoRaw as PerfilRadar[];

const idsManuais = new Set(perfisManuais.map((p) => p.id));

/** Perfis que vieram assados pelo robô diário, sem duplicar o que é mantido à mão. */
export const perfis: PerfilRadar[] = [
  ...perfisManuais,
  ...perfisAuto.filter((p) => !idsManuais.has(p.id)),
];

/** Municípios presentes, pro filtro do mapa. */
export function municipiosDosPerfis(lista: PerfilRadar[]): string[] {
  return [...new Set(lista.map((p) => p.municipio))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

/**
 * Link de conversa no WhatsApp. Montado em JS a partir dos dígitos, e não
 * escrito como texto no HTML, pra não servir o número de bandeja pra robô de
 * spam que varre página atrás de telefone.
 */
export function linkWhatsapp(numero: string, nomeDoPerfil: string): string {
  const texto = `Oi, ${nomeDoPerfil}! Achei seu perfil no Radar Cultural do Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo.`;
  return `https://wa.me/${numero.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`;
}

/**
 * Caminho da foto pronto pra usar em <img>. Foto assada pelo robô é caminho
 * local e precisa do basePath do GitHub Pages ("/Comit-paulo-Gustav"); foto de
 * perfil recém-cadastrado vem como URL completa do Drive e vai como está.
 */
export function urlDaFoto(foto: string | undefined): string | undefined {
  if (!foto) return undefined;
  return foto.startsWith("/") ? `${basePath}${foto}` : foto;
}

/** Centro do mapa quando ainda não há pino nenhum: São Luís. */
export const centroPadrao = { lat: -2.5307, lng: -44.3068, zoom: 11 };
