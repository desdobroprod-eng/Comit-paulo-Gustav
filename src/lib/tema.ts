/**
 * Qual tema está valendo agora, e aviso quando mudar.
 *
 * O resto do site resolve tema só com CSS, que é o certo. O mapa não consegue:
 * a camada de tiles é uma imagem vinda de fora, então trocar de claro pra
 * escuro é decisão de JavaScript. Só por isso isto existe.
 */
export type Tema = "claro" | "escuro";

export function temaAtual(): Tema {
  if (typeof document === "undefined") return "claro";
  const marcado = document.documentElement.getAttribute("data-theme");
  if (marcado === "dark") return "escuro";
  if (marcado === "light") return "claro";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
}

/** Chama `aoMudar` sempre que o tema virar. Devolve a função de desinscrever. */
export function observarTema(aoMudar: (tema: Tema) => void): () => void {
  const observador = new MutationObserver(() => aoMudar(temaAtual()));
  observador.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // Sem data-theme, quem manda é o sistema operacional.
  const midia = window.matchMedia("(prefers-color-scheme: dark)");
  const aoTrocarSistema = () => aoMudar(temaAtual());
  midia.addEventListener("change", aoTrocarSistema);

  return () => {
    observador.disconnect();
    midia.removeEventListener("change", aoTrocarSistema);
  };
}
