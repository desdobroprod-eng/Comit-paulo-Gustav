import type { Esfera } from "@/lib/site";

export interface Certidao {
  id: string;
  nome: string;
  esfera: Esfera;
  orgao: string;
  paraQuem: ("pessoa-fisica" | "pessoa-juridica")[];
  paraQueServe: string;
  link: string;
  /** O que ter em mãos antes de abrir o site do órgão. */
  precisaDe: string[];
  /** Passo a passo dentro do site oficial, na ordem em que ele aparece. */
  passos: string[];
  /**
   * Prazo de validade. Só afirmamos prazo onde ele é fixado em norma; nos
   * demais casos o texto manda conferir o que vem impresso na certidão.
   */
  validade: string;
}

/**
 * Mês em que o Comitê conferiu, um por um, se os links abaixo ainda abrem a
 * página de emissão. Aparece no site para quem usa saber a idade da conferência.
 */
export const certidoesVerificadasEm = "setembro de 2026";

export const certidoes: Certidao[] = [
  {
    id: "federal-tributos-pgfn",
    nome: "Certidão de Regularidade Fiscal (Receita Federal / PGFN)",
    esfera: "federal",
    orgao: "Receita Federal e Procuradoria-Geral da Fazenda Nacional",
    paraQuem: ["pessoa-fisica", "pessoa-juridica"],
    paraQueServe:
      "Comprova que não há débitos com a União. É a certidão mais pedida em editais culturais, para CPF e para CNPJ.",
    link: "https://www.gov.br/pt-br/servicos/emitir-certidao-de-regularidade-fiscal",
    precisaDe: ["CPF (pessoa física) ou CNPJ (pessoa jurídica)", "Data de nascimento ou de abertura"],
    passos: [
      "Na página do gov.br, escolha entre Pessoa Física e Pessoa Jurídica.",
      "Informe o CPF ou CNPJ e confirme o código de verificação da tela.",
      "Se já existir certidão válida no seu nome, o sistema devolve a mesma; senão, emite na hora.",
      "Baixe o PDF. Edital pede o arquivo emitido pelo órgão — print de tela costuma ser recusado.",
    ],
    validade: "180 dias a partir da emissão.",
  },
  {
    id: "federal-fgts",
    nome: "Certificado de Regularidade do FGTS (CRF)",
    esfera: "federal",
    orgao: "Caixa Econômica Federal",
    paraQuem: ["pessoa-juridica"],
    paraQueServe:
      "Só se aplica a quem tem empresa com empregados. Comprova regularidade com o FGTS.",
    link: "https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf",
    precisaDe: ["CNPJ da empresa (ou CEI)", "UF do empregador"],
    passos: [
      "Escolha o tipo de inscrição (CNPJ) e informe o número.",
      "Selecione a UF e envie a consulta.",
      "Estando regular, a Caixa mostra o certificado com número e data de validade.",
      "Salve ou imprima em PDF a página do certificado.",
    ],
    validade: "30 dias — é a certidão que vence mais rápido, deixe por último.",
  },
  {
    id: "federal-trabalhista",
    nome: "Certidão Negativa de Débitos Trabalhistas (CNDT)",
    esfera: "federal",
    orgao: "Tribunal Superior do Trabalho (TST)",
    paraQuem: ["pessoa-fisica", "pessoa-juridica"],
    paraQueServe: "Comprova que não há débitos reconhecidos na Justiça do Trabalho.",
    link: "https://www.tst.jus.br/certidao1",
    precisaDe: ["CPF ou CNPJ"],
    passos: [
      "Informe o CPF ou o CNPJ no campo da página do TST.",
      "Confirme o código de verificação e emita.",
      "O sistema devolve a certidão em PDF, já com o código de autenticação.",
    ],
    validade: "180 dias a partir da emissão.",
  },
  {
    id: "federal-tcu-inidoneos",
    nome: "Certidão de Licitantes Inidôneos (TCU)",
    esfera: "federal",
    orgao: "Tribunal de Contas da União",
    paraQuem: ["pessoa-juridica"],
    paraQueServe:
      "Exigida em alguns editais para pessoa jurídica: comprova que a empresa não está impedida de contratar com o poder público.",
    link: "https://certidoes.apps.tcu.gov.br/emitir-certidao-inidoneos",
    precisaDe: ["CNPJ da empresa"],
    passos: [
      "Informe o CNPJ e emita a certidão no portal do TCU.",
      "Salve o PDF gerado.",
    ],
    validade: "Confira o prazo impresso na própria certidão.",
  },
  {
    id: "estadual-sefaz-ma",
    nome: "Certidão Negativa de Débitos Estaduais",
    esfera: "estadual",
    orgao: "Secretaria de Estado da Fazenda do Maranhão (SEFAZ-MA)",
    paraQuem: ["pessoa-fisica", "pessoa-juridica"],
    paraQueServe: "Comprova regularidade com tributos do Estado do Maranhão (ICMS e outros).",
    link: "https://sistemas1.sefaz.ma.gov.br/portalsefaz/jsp/menu/view.jsf?codigo=16",
    precisaDe: ["CPF ou CNPJ", "Inscrição estadual, se a empresa tiver"],
    passos: [
      "No portal da SEFAZ-MA, escolha a emissão de certidão negativa.",
      "Informe CPF/CNPJ (ou a inscrição estadual) e emita.",
      "Salve o PDF com o código de autenticidade.",
    ],
    validade: "Confira o prazo impresso na própria certidão.",
  },
  {
    id: "municipal-semfaz-sl",
    nome: "Certidão Negativa de Débitos Municipais",
    esfera: "municipal",
    orgao: "Secretaria Municipal da Fazenda de São Luís (SEMFAZ)",
    paraQuem: ["pessoa-fisica", "pessoa-juridica"],
    paraQueServe: "Comprova regularidade com tributos do Município de São Luís (IPTU, ISS e outros).",
    link: "https://stm.semfaz.saoluis.ma.gov.br/credenciamento/jsp/emissaoCertidao/emissaoPublicaCertidao.jsf",
    precisaDe: ["CPF ou CNPJ", "Inscrição municipal, se você tiver"],
    passos: [
      "Escolha o tipo de contribuinte e informe CPF ou CNPJ.",
      "Confirme os dados e emita a certidão.",
      "Salve o PDF — ele traz o código para o edital conferir a autenticidade.",
    ],
    validade: "Confira o prazo impresso na própria certidão.",
  },
];

/**
 * A própria SECMA mantém uma página com os links de emissão que ela
 * exige nos editais — útil como referência cruzada sempre que um link aqui
 * mudar de endereço.
 */
export const guiaOficialSecultMA = {
  nome: "SECMA — Links para emissão de certidões",
  url: "https://www.cultura.ma.gov.br/programas-ou-campanhas/links-para-emissao-de-certidoes",
};
