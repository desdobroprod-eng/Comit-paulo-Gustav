import type { Esfera } from "@/lib/site";

export interface Certidao {
  id: string;
  nome: string;
  esfera: Esfera;
  orgao: string;
  paraQuem: ("pessoa-fisica" | "pessoa-juridica")[];
  paraQueServe: string;
  link: string;
}

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
  },
  {
    id: "federal-trabalhista",
    nome: "Certidão Negativa de Débitos Trabalhistas (CNDT)",
    esfera: "federal",
    orgao: "Tribunal Superior do Trabalho (TST)",
    paraQuem: ["pessoa-fisica", "pessoa-juridica"],
    paraQueServe: "Comprova que não há débitos reconhecidos na Justiça do Trabalho.",
    link: "https://www.tst.jus.br/certidao1",
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
  },
  {
    id: "estadual-sefaz-ma",
    nome: "Certidão Negativa de Débitos Estaduais",
    esfera: "estadual",
    orgao: "Secretaria de Estado da Fazenda do Maranhão (SEFAZ-MA)",
    paraQuem: ["pessoa-fisica", "pessoa-juridica"],
    paraQueServe: "Comprova regularidade com tributos do Estado do Maranhão (ICMS e outros).",
    link: "https://sistemas1.sefaz.ma.gov.br/portalsefaz/jsp/menu/view.jsf?codigo=16",
  },
  {
    id: "municipal-semfaz-sl",
    nome: "Certidão Negativa de Débitos Municipais",
    esfera: "municipal",
    orgao: "Secretaria Municipal da Fazenda de São Luís (SEMFAZ)",
    paraQuem: ["pessoa-fisica", "pessoa-juridica"],
    paraQueServe: "Comprova regularidade com tributos do Município de São Luís (IPTU, ISS e outros).",
    link: "https://stm.semfaz.saoluis.ma.gov.br/credenciamento/jsp/emissaoCertidao/emissaoPublicaCertidao.jsf",
  },
];

/**
 * A própria SECULT-MA mantém uma página com os links de emissão que ela
 * exige nos editais — útil como referência cruzada sempre que um link aqui
 * mudar de endereço.
 */
export const guiaOficialSecultMA = {
  nome: "SECULT-MA — Links para emissão de certidões",
  url: "https://www.cultura.ma.gov.br/programas-ou-campanhas/links-para-emissao-de-certidoes",
};
