import type { Esfera } from "@/lib/site";
import editaisAutoRaw from "./editais-auto.json";

export type StatusEdital = "aberto" | "em-breve" | "encerrado";

export interface Edital {
  id: string;
  titulo: string;
  esfera: Esfera;
  orgao: string;
  areas: string[];
  status: StatusEdital;
  prazoFinal?: string; // ISO date, quando houver
  linkOficial: string;
  resumo: string;
  /** Marca conteúdo de demonstração — remover ao publicar dados reais no painel. */
  exemplo?: boolean;
  /** Adicionado pelo robô semanal (ver src/app/api/cron/atualizar-editais) — pede confirmação humana de prazo/valor. */
  detectadoAutomaticamente?: boolean;
}

interface EditalAuto {
  id: string;
  titulo: string;
  esfera: Esfera;
  orgao: string;
  linkOficial: string;
  detectadoEm: string;
}

const editaisAuto = editaisAutoRaw as EditalAuto[];

/**
 * Conteúdo inicial de demonstração. Nesta fase (sem painel administrativo),
 * a lista real é mantida aqui pela equipe técnica; a Fase 2 substitui este
 * arquivo por um painel onde o próprio Comitê cadastra e atualiza os editais,
 * sem depender de deploy.
 */
const editaisManuais: Edital[] = [
  {
    id: "exemplo-estadual-premiacao",
    titulo: "Edital de Premiação — Lei Paulo Gustavo (exemplo)",
    esfera: "estadual",
    orgao: "Secretaria de Estado da Cultura do Maranhão (SECULT-MA)",
    areas: ["Artes visuais", "Música", "Teatro"],
    status: "aberto",
    linkOficial: "https://www.cultura.ma.gov.br/programas-ou-campanhas/editais-lei-paulo-gustavo",
    resumo:
      "Conteúdo de exemplo para validar o layout. Confirme título, prazo e valor na fonte oficial antes de publicar.",
    exemplo: true,
  },
  {
    id: "exemplo-municipal-chamamento",
    titulo: "Chamamento Público — Lei Paulo Gustavo São Luís (exemplo)",
    esfera: "municipal",
    orgao: "Secretaria Municipal de Cultura de São Luís (SECULT-SL)",
    areas: ["Audiovisual", "Cultura popular"],
    status: "em-breve",
    linkOficial: "https://www.saoluis.ma.gov.br/secult/editais",
    resumo:
      "Conteúdo de exemplo para validar o layout. Confirme título, prazo e valor na fonte oficial antes de publicar.",
    exemplo: true,
  },
];

const linksManuais = new Set(editaisManuais.map((e) => e.linkOficial));

/**
 * Editais detectados pelo robô semanal (src/app/api/cron/atualizar-editais)
 * nas páginas oficiais de editais. Entram com status "aberto" por padrão e
 * marcados como detectadoAutomaticamente — a UI avisa que prazo/valor
 * precisam ser confirmados na fonte. Links já cobertos manualmente não se
 * duplicam aqui.
 */
const editaisDetectados: Edital[] = editaisAuto
  .filter((e) => !linksManuais.has(e.linkOficial))
  .map((e) => ({
    id: e.id,
    titulo: e.titulo,
    esfera: e.esfera,
    orgao: e.orgao,
    areas: [],
    status: "aberto",
    linkOficial: e.linkOficial,
    resumo: `Detectado automaticamente em ${new Date(e.detectadoEm).toLocaleDateString("pt-BR")}.`,
    detectadoAutomaticamente: true,
  }));

export const editais: Edital[] = [...editaisManuais, ...editaisDetectados];

export const fontesOficiais: Record<Esfera, { nome: string; url: string }> = {
  federal: {
    nome: "gov.br — Ministério da Cultura, Lei Paulo Gustavo",
    url: "https://www.gov.br/cultura/pt-br/assuntos/lei-paulo-gustavo",
  },
  estadual: {
    nome: "SECULT-MA — Editais Lei Paulo Gustavo",
    url: "https://www.cultura.ma.gov.br/programas-ou-campanhas/editais-lei-paulo-gustavo",
  },
  municipal: {
    nome: "Prefeitura de São Luís — Editais da Secretaria de Cultura",
    url: "https://www.saoluis.ma.gov.br/secult/editais",
  },
};
