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
  /**
   * Créditos de autoria do site (não do Comitê). URL fica vazia até o time
   * confirmar o link oficial — ver README "Créditos de autoria" antes de publicar.
   */
  idealizadores: {
    pessoa: "Ben-hur Real Figueiro",
    agencia: "10Dobro Prod",
    url: "",
  },
} as const;

export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export type Esfera = "federal" | "estadual" | "municipal";

export const esferaLabel: Record<Esfera, string> = {
  federal: "Federal",
  estadual: "Estadual — Maranhão",
  municipal: "Municipal — São Luís",
};
