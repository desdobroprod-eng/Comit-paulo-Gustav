"use client";

import { useState } from "react";
import type { Certidao } from "@/content/certidoes";
import { trackEvent } from "@/lib/analytics";
import { Modal } from "./Modal";
import { TrackedLink } from "./TrackedLink";

const rotuloPara: Record<Certidao["paraQuem"][number], string> = {
  "pessoa-fisica": "Pessoa física",
  "pessoa-juridica": "Pessoa jurídica",
};

/**
 * Uma certidão na lista. O botão não sai do site: abre a janela com o passo a
 * passo, e só de dentro dela a pessoa vai para o portal do órgão, em outra aba
 * — o site do Comitê continua aberto atrás (decisão do Comitê: retenção).
 */
export function CertidaoRow({ certidao }: { certidao: Certidao }) {
  const [aberto, setAberto] = useState(false);
  const [copiado, setCopiado] = useState(false);

  function abrir() {
    setAberto(true);
    trackEvent("abre_passo_a_passo_certidao", {
      certidao_id: certidao.id,
      esfera: certidao.esfera,
    });
  }

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(certidao.link);
      setCopiado(true);
      trackEvent("copia_link_certidao", { certidao_id: certidao.id });
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sem permissão de área de transferência: o link segue visível na janela.
    }
  }

  return (
    <div className="flex flex-col gap-2 border-b border-linha px-6 py-5 transition last:border-none hover:bg-superficie-alt sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="max-w-2xl">
        <p className="font-semibold text-tinta">{certidao.nome}</p>
        <p className="mt-1 text-sm text-tinta-suave">{certidao.orgao}</p>
        <p className="mt-1 text-sm text-tinta-suave">{certidao.paraQueServe}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {certidao.paraQuem.map((p) => (
            <span
              key={p}
              className="rounded-full bg-superficie-alt px-2.5 py-1 text-xs text-tinta-suave"
            >
              {rotuloPara[p]}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={abrir}
        className="inline-flex h-fit shrink-0 items-center gap-1.5 rounded-sm border border-linha bg-ambar px-4 py-2 text-sm font-semibold text-fixed-tinta transition hover:-translate-y-0.5 hover:shadow-md"
      >
        Como emitir
      </button>

      <Modal aberto={aberto} aoFechar={() => setAberto(false)} titulo={certidao.nome}>
        <div className="flex flex-col gap-5 text-sm">
          <p className="text-tinta-suave">{certidao.orgao}</p>

          <div>
            <h3 className="rotulo text-ambar-fundo">Tenha em mãos</h3>
            <ul className="mt-2 flex flex-col gap-1">
              {certidao.precisaDe.map((item) => (
                <li key={item} className="flex gap-2 text-tinta-suave">
                  <span aria-hidden className="text-ambar-fundo">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="rotulo text-ambar-fundo">No site do órgão</h3>
            <ol className="mt-2 flex flex-col gap-2">
              {certidao.passos.map((passo, i) => (
                <li key={passo} className="flex gap-3 text-tinta-suave">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ambar text-[11px] font-bold text-fixed-tinta">
                    {i + 1}
                  </span>
                  {passo}
                </li>
              ))}
            </ol>
          </div>

          <p className="border-l-2 border-terracota pl-3 text-tinta-suave">
            <span className="font-semibold text-tinta">Validade:</span> {certidao.validade}
          </p>

          <div className="flex flex-wrap gap-2 border-t border-linha pt-4">
            <TrackedLink
              href={certidao.link}
              eventName="clique_certidao"
              eventParams={{ certidao_id: certidao.id, esfera: certidao.esfera }}
              className="rounded-sm bg-fixed-ambar px-5 py-2.5 font-semibold text-fixed-tinta transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Abrir site oficial ↗
            </TrackedLink>
            <button
              type="button"
              onClick={copiarLink}
              className="rounded-sm border border-linha px-5 py-2.5 font-medium text-tinta transition hover:bg-superficie-alt"
            >
              {copiado ? "Link copiado" : "Copiar link"}
            </button>
          </div>

          <p className="text-xs text-tinta-fraca">
            O site oficial abre em outra aba — esta página do Comitê continua aberta aqui atrás.
          </p>
        </div>
      </Modal>
    </div>
  );
}
