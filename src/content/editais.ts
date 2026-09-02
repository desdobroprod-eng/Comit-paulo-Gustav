import type { Esfera } from "@/lib/site";

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
}

/**
 * Conteúdo inicial de demonstração. Nesta fase (sem painel administrativo),
 * a lista real é mantida aqui pela equipe técnica; a Fase 2 substitui este
 * arquivo por um painel onde o próprio Comitê cadastra e atualiza os editais,
 * sem depender de deploy.
 */
export const editais: Edital[] = [
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
