"use client";

import { useEffect, useRef } from "react";

/**
 * Janela sobre o site, em `<dialog>` nativo. A escolha é deliberada: o
 * `showModal()` do navegador já prende o foco dentro da janela, fecha no ESC e
 * devolve o foco ao botão que abriu — sem biblioteca e sem armadilha de
 * acessibilidade escrita à mão.
 *
 * Existe porque o Comitê pediu retenção: link de certidão não pode levar a
 * pessoa embora do site sem antes explicar o que ela vai encontrar do lado de lá.
 */
export function Modal({
  aberto,
  aoFechar,
  titulo,
  children,
}: {
  aberto: boolean;
  aoFechar: () => void;
  titulo: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (aberto && !dialog.open) dialog.showModal();
    if (!aberto && dialog.open) dialog.close();
  }, [aberto]);

  // O `showModal()` bloqueia o scroll do fundo em parte dos navegadores, não em
  // todos — então travamos aqui também, para o comportamento ser o mesmo.
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [aberto]);

  return (
    <dialog
      ref={ref}
      aria-label={titulo}
      onClose={aoFechar}
      /* Clique no fundo fecha: fora da caixa, o alvo do clique é o próprio dialog. */
      onClick={(e) => {
        if (e.target === ref.current) aoFechar();
      }}
      className="m-auto w-[min(34rem,92vw)] rounded-sm border border-linha bg-superficie p-0 text-tinta shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-start justify-between gap-4 border-b border-linha px-6 py-4">
        <h2 className="font-display text-lg font-semibold leading-snug text-tinta">{titulo}</h2>
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar"
          className="-mr-2 -mt-1 shrink-0 rounded-sm px-2 py-1 text-2xl leading-none text-tinta-fraca transition hover:bg-superficie-alt hover:text-tinta"
        >
          ×
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
    </dialog>
  );
}
