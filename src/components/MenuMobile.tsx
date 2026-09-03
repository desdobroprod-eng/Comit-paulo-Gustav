"use client";

import Link from "next/link";
import { useState } from "react";
import { Modal } from "./Modal";

/**
 * Navegação em telas estreitas. Sem isso, os cinco links do Comitê quebravam em
 * três linhas no celular e empurravam a foto do topo para fora da tela.
 */
export function MenuMobile({ links }: { links: { href: string; label: string }[] }) {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        aria-label="Abrir menu"
        className="rounded-sm border border-linha px-3 py-2 text-sm font-medium text-tinta transition hover:bg-superficie-alt lg:hidden"
      >
        Menu
      </button>

      <Modal aberto={aberto} aoFechar={() => setAberto(false)} titulo="Navegação">
        <nav className="flex flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setAberto(false)}
              className="border-b border-linha py-3 font-display text-lg font-semibold text-tinta transition last:border-none hover:text-ambar-fundo"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Modal>
    </>
  );
}
