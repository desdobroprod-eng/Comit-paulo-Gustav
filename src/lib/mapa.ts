import type { Map as MapaLeaflet, TileLayer } from "leaflet";
import { observarTema, temaAtual, type Tema } from "./tema";

/**
 * Camadas de fundo do mapa. CARTO tem uma versão clara e uma escura do mesmo
 * desenho, o que deixa o mapa acompanhar o botão de tema do site em vez de
 * cuspir um retângulo branco no meio da página escura.
 *
 * A atribuição é obrigatória pela licença dos dados do OpenStreetMap e pelos
 * termos da CARTO — o Leaflet a mostra no canto do mapa e ela não sai de lá.
 */
const CAMADAS: Record<Tema, string> = {
  claro: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  escuro: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};

const ATRIBUICAO =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

/**
 * Liga a camada de fundo ao tema do site: troca sozinha quando a pessoa mexe no
 * botão. Devolve a função de desligar, pra chamar na limpeza do efeito.
 */
export function camadaComTema(L: typeof import("leaflet"), mapa: MapaLeaflet): () => void {
  let camada: TileLayer | null = null;

  const desenhar = (tema: Tema) => {
    if (camada) camada.remove();
    camada = L.tileLayer(CAMADAS[tema], {
      attribution: ATRIBUICAO,
      maxZoom: 19,
      // Os tiles vêm de fora; se a rede da pessoa bloquear a CARTO, o mapa
      // continua navegável com os pinos sobre o fundo vazio.
      errorTileUrl: "",
    }).addTo(mapa);
  };

  desenhar(temaAtual());
  return observarTema(desenhar);
}
