export const site = {
  // NÃO abreviar. O Comitê já rejeitou duas vezes formas curtas inventadas
  // ("Comitê Paulo Gustavo Maranhão", depois "Comitê Maranhão") — o nome É
  // o nome oficial abaixo, por extenso, em qualquer lugar do site.
  nomeCurto: "Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo",
  nomeOficial:
    "Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo",
  // Linguagem neutra, a pedido do Comitê.
  tagline: "Juntes para a cultura resistir",
  descricao:
    "Comitê de sociedade civil que articula fazedores e fazedoras de cultura do Maranhão e cobra do poder público a execução da Lei Paulo Gustavo.",
  // URL onde o site de fato responde agora (GitHub Pages). Trocar aqui — e só
  // aqui — quando um domínio próprio for apontado (ver README "Domínio próprio").
  url: "https://desdobroprod-eng.github.io/Comit-paulo-Gustav",
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
