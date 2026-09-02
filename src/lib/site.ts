export const site = {
  nomeCurto: "Comitê Paulo Gustavo Maranhão",
  nomeOficial:
    "Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo",
  tagline: "Juntos para a cultura resistir",
  descricao:
    "Comitê de sociedade civil que articula fazedores e fazedoras de cultura do Maranhão e cobra do poder público a execução da Lei Paulo Gustavo.",
  url: "https://comitepaulogustavo.ma",
  redes: {
    instagramMA: "https://instagram.com/comitepaulogustavoma",
    instagramNacional: "http://bit.ly/PLPGInstagram",
    minc: "https://www.gov.br/cultura/pt-br/assuntos/lei-paulo-gustavo",
  },
} as const;

export type Esfera = "federal" | "estadual" | "municipal";

export const esferaLabel: Record<Esfera, string> = {
  federal: "Federal",
  estadual: "Estadual — Maranhão",
  municipal: "Municipal — São Luís",
};
