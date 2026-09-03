import creditosData from "../../public/cultura/CREDITOS.json";

/**
 * Acervo de cultura popular maranhense. Todas as mídias são Creative Commons
 * do Wikimedia Commons — os créditos vêm de public/cultura/CREDITOS.json, que
 * é a fonte da verdade, e a licença exige que autor e licença apareçam onde a
 * imagem é usada (ver /creditos).
 */
export interface Credito {
  arquivo: string;
  titulo: string;
  autor: string;
  licenca: string;
  fonte: string;
}

export const creditos = (creditosData as { creditos: Credito[] }).creditos;

export const creditoDe = (arquivo: string): Credito | undefined =>
  creditos.find((c) => c.arquivo === arquivo);

export interface Foto {
  arquivo: string;
  manifestacao: string;
  legenda: string;
  alt: string;
}

export const fotos: Foto[] = [
  {
    arquivo: "tambor-1.jpg",
    manifestacao: "Tambor de Crioula",
    legenda: "Coreiras em roda de Tambor de Crioula, patrimônio cultural do Brasil.",
    alt: "Coreiras de Tambor de Crioula em saias estampadas e colares de miçanga, em roda num terreiro de chão de areia",
  },
  {
    arquivo: "bumba-1.jpg",
    manifestacao: "Bumba meu boi",
    legenda: "Pandeirões do Bumba meu Boi do Maranhão.",
    alt: "Brincantes tocando pandeirões no Bumba meu Boi do Maranhão",
  },
  {
    arquivo: "cacuria-1.jpg",
    manifestacao: "Cacuriá",
    legenda: "Dança e tambores do Cacuriá.",
    alt: "Dançantes de Cacuriá em roda",
  },
  {
    arquivo: "bumba-2.jpg",
    manifestacao: "Bumba meu boi",
    legenda: "Brincantes e bordados do boi.",
    alt: "Brincantes do Bumba meu Boi com indumentária bordada",
  },
  {
    arquivo: "tambor-2.jpg",
    manifestacao: "Tambor de Crioula",
    legenda: "Casa do Tambor de Crioula, em São Luís.",
    alt: "Tambores da Casa do Tambor de Crioula",
  },
  {
    arquivo: "cacuria-2.jpg",
    manifestacao: "Cacuriá",
    legenda: "Tambor do Cacuriá.",
    alt: "Tambor usado no Cacuriá",
  },
];

export const fotoDe = (arquivo: string): Foto | undefined =>
  fotos.find((f) => f.arquivo === arquivo);

export const video = {
  mp4: "cultura/video/tambor.mp4",
  webm: "cultura/video/tambor.webm",
  poster: "cultura/video/tambor-poster.jpg",
  creditoArquivo: "video/tambor.mp4",
  legenda: "Tambor de Crioula do Maranhão — dança, canto e percussão.",
};
