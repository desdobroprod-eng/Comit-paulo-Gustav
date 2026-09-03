"use client";

/**
 * Troca claro/escuro e guarda a escolha no navegador de quem visita.
 *
 * Sem estado em React de propósito: o tema já vive no `data-theme` do <html>
 * (aplicado antes da primeira pintura pelo script inline em layout.tsx), e o
 * rótulo do botão é decidido por CSS. Assim o botão não depende de hidratação
 * e não há risco de piscar o rótulo errado.
 */
export function BotaoTema() {
  function trocar() {
    const raiz = document.documentElement;
    const atual =
      raiz.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const novo = atual === "dark" ? "light" : "dark";

    raiz.setAttribute("data-theme", novo);
    try {
      localStorage.setItem("tema", novo);
    } catch {
      /* navegação privada pode bloquear: a troca vale só nesta visita */
    }
  }

  return (
    <button
      type="button"
      onClick={trocar}
      aria-label="Alternar entre tema claro e escuro"
      className="rounded-full border border-linha px-3 py-1.5 text-xs text-tinta-suave transition hover:border-ambar-fundo hover:text-tinta"
    >
      <span className="tema-claro">Escuro</span>
      <span className="tema-escuro">Claro</span>
    </button>
  );
}
