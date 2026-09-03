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
  /**
   * Edital real e nomeado corretamente, mas cujo status/prazo atual não pôde
   * ser confirmado direto na fonte no momento em que foi cadastrado aqui —
   * pede confirmação antes de divulgar, sem ser conteúdo fabricado.
   */
  confirmarNaFonte?: boolean;
  /**
   * Rótulo do botão. Quando `linkOficial` aponta para o perfil do órgão (e não
   * para a página do edital específico), o rótulo padrão "Ver edital completo"
   * promete mais do que o link entrega — daí poder sobrescrever.
   */
  linkRotulo?: string;
}

/** Normaliza URL para deduplicar (ignora query, âncora, barra final e caixa). */
function chaveUrl(url: string): string {
  try {
    const u = new URL(url);
    return `${u.host}${u.pathname}`.replace(/\/+$/, "").toLowerCase();
  } catch {
    return url.trim().replace(/\/+$/, "").toLowerCase();
  }
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
 * Levantamento feito por busca em 02/09/2026. Nesta fase (sem painel
 * administrativo), a lista real é mantida aqui pela equipe técnica — segundo
 * combinado com o Comitê, as próximas atualizações serão manuais, e a fonte
 * preferida agora é o perfil de cada órgão na Prosas (ver fontesOficiais
 * abaixo), não a página bruta de cada site de governo.
 *
 * Não foi possível abrir cultura.ma.gov.br, saoluis.ma.gov.br nem
 * prosas.com.br diretamente (bloqueio de rede do ambiente usado nesta
 * busca) para confirmar prazo e status em tempo real — por isso os dois
 * itens abaixo estão marcados `confirmarNaFonte: true`. São chamamentos da
 * Política Nacional Aldir Blanc (PNAB), programa federal irmão da Lei Paulo
 * Gustavo e administrado pelas mesmas secretarias de cultura — não
 * encontramos, nesta busca, nenhum edital com a marca "Lei Paulo Gustavo"
 * com inscrições abertas agora no Maranhão; os editais estaduais e
 * municipais da LPG localizados já encerraram inscrições.
 */
const editaisManuais: Edital[] = [
  {
    id: "estadual-secma-pnab-001-2026",
    titulo: "Chamamento Público nº 001/2026 — SECMA/PNAB",
    esfera: "estadual",
    orgao: "Secretaria de Estado da Cultura do Maranhão (SECMA)",
    areas: ["Política Nacional Aldir Blanc (PNAB)"],
    status: "aberto",
    // Perfil do órgão na Prosas — fonte determinada pelo Comitê. Enquanto a URL
    // do edital específico não for conhecida, o botão leva ao perfil e o rótulo
    // diz exatamente isso.
    linkOficial:
      "https://prosas.com.br/patrocinadores/1399-secretaria-de-estado-da-cultura-do-maranhao?subdominio=prosas",
    linkRotulo: "Ver na Prosas",
    resumo:
      "Chamamento da SECMA no âmbito da Política Nacional Aldir Blanc (PNAB) — não é edital da Lei Paulo Gustavo, mas programa federal irmão, administrado pela mesma secretaria.",
    confirmarNaFonte: true,
  },
  {
    id: "municipal-secult-sl-pnab-2026",
    titulo: "Chamamento Público — SECULT-SL/PNAB",
    esfera: "municipal",
    orgao: "Secretaria Municipal de Cultura de São Luís (SECULT-SL)",
    areas: ["Política Nacional Aldir Blanc (PNAB)"],
    status: "aberto",
    linkOficial: "https://prosas.com.br/empreendedores/3547-secretaria-municipal-de-cultura-de-sao-luis",
    linkRotulo: "Ver na Prosas",
    resumo:
      "Referência a um chamamento da SECULT-SL no âmbito da Política Nacional Aldir Blanc (PNAB) encontrada nesta busca, sem confirmação direta na fonte municipal — não é edital da Lei Paulo Gustavo.",
    confirmarNaFonte: true,
  },
];

const idsManuais = new Set(editaisManuais.map((e) => e.id));
const linksManuais = new Set(editaisManuais.map((e) => chaveUrl(e.linkOficial)));

/**
 * Editais detectados pelo robô semanal (scripts/atualizar-editais.ts) nos
 * perfis oficiais da Prosas. Entram com status "aberto" por padrão e marcados
 * como detectadoAutomaticamente — a UI avisa que prazo/valor precisam ser
 * confirmados na fonte.
 *
 * A deduplicação é por id E por URL normalizada: desde que os itens manuais
 * passaram a apontar para o perfil do órgão na Prosas — que é exatamente a
 * página que o robô varre —, comparar a string crua da URL deixava passar
 * duplicata por diferença de query string ou barra final.
 */
const editaisDetectados: Edital[] = editaisAuto
  .filter((e) => !idsManuais.has(e.id) && !linksManuais.has(chaveUrl(e.linkOficial)))
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

/**
 * A pedido do Comitê, a fonte principal de estadual/municipal passou a ser o
 * perfil de cada órgão na Prosas (plataforma que os dois já usam para
 * publicar chamamentos) em vez da página bruta de cada site de governo —
 * mais estável para o robô semanal ler e mais fácil pra gente confirmar na
 * mão também.
 */
export const fontesOficiais: Record<Esfera, { nome: string; url: string }> = {
  federal: {
    nome: "gov.br — Ministério da Cultura, Lei Paulo Gustavo",
    url: "https://www.gov.br/cultura/pt-br/assuntos/lei-paulo-gustavo",
  },
  estadual: {
    nome: "Prosas — Secretaria de Estado da Cultura do Maranhão (SECMA)",
    url: "https://prosas.com.br/patrocinadores/1399-secretaria-de-estado-da-cultura-do-maranhao?subdominio=prosas",
  },
  municipal: {
    nome: "Prosas — Secretaria Municipal de Cultura de São Luís (SECULT-SL)",
    url: "https://prosas.com.br/empreendedores/3547-secretaria-municipal-de-cultura-de-sao-luis",
  },
};
