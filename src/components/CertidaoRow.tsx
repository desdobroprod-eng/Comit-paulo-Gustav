import type { Certidao } from "@/content/certidoes";
import { TrackedLink } from "./TrackedLink";

const rotuloPara: Record<Certidao["paraQuem"][number], string> = {
  "pessoa-fisica": "Pessoa física",
  "pessoa-juridica": "Pessoa jurídica",
};

export function CertidaoRow({ certidao }: { certidao: Certidao }) {
  return (
    <div className="flex flex-col gap-2 border-b border-border py-5 last:border-none sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="max-w-2xl">
        <p className="font-semibold text-ink">{certidao.nome}</p>
        <p className="mt-1 text-sm text-ink-soft">{certidao.orgao}</p>
        <p className="mt-1 text-sm text-ink-soft">{certidao.paraQueServe}</p>
        <div className="mt-2 flex gap-2">
          {certidao.paraQuem.map((p) => (
            <span key={p} className="rounded-full bg-surface-alt px-2.5 py-1 text-xs text-ink-soft">
              {rotuloPara[p]}
            </span>
          ))}
        </div>
      </div>
      <TrackedLink
        href={certidao.link}
        eventName="clique_certidao"
        eventParams={{ certidao_id: certidao.id, esfera: certidao.esfera }}
        className="inline-flex h-fit shrink-0 items-center gap-1.5 rounded-lg border border-border bg-surface-alt px-4 py-2 text-sm font-medium text-ink hover:border-amber-deep"
      >
        Emitir certidão ↗
      </TrackedLink>
    </div>
  );
}
