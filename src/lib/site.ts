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
   * Endpoint do Radar Cultural: o Apps Script publicado como App da Web na
   * conta do Google do Comitê (ver README "Radar Cultural"). É público por
   * natureza — o navegador de qualquer visitante o chama pra cadastrar e pra
   * ler o mapa —, por isso nenhum segredo mora nele e toda validação é refeita
   * do lado de lá.
   *
   * Sem a variável o site segue de pé: o formulário aparece igual e o envio
   * explica que o cadastro está sendo ligado, oferecendo o formulário antigo.
   */
  radarEndpoint: process.env.NEXT_PUBLIC_RADAR_ENDPOINT ?? "",
  /** Formulário anterior, ainda de pé como alternativa enquanto o endpoint não é configurado. */
  radarFormularioAntigo:
    "https://docs.google.com/forms/d/e/1FAIpQLSfehHkoWMYNwNRVBDPTFN0pk_9Dfq9ocZyy5MT6XEjzMZmuoQ/viewform",
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


// Prefixo de path do GitHub Pages (ver next.config.ts). next/image não
// prefixa sozinho o src de imagem não otimizada no export estático — use
// isto ao montar src="" de assets em public/ fora do componente Image.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type Esfera = "federal" | "estadual" | "municipal";

export const esferaLabel: Record<Esfera, string> = {
  federal: "Federal",
  estadual: "Estadual — Maranhão",
  municipal: "Municipal — São Luís",
};
