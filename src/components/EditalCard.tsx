import { esferaLabel } from "@/lib/site";
import type { Edital } from "@/content/editais";
import { StatusBadge } from "./StatusBadge";
import { TrackedLink } from "./TrackedLink";

export function EditalCard({ edital }: { edital: Edital }) {
  return (
    <article className="flex flex-col gap-3 rounded-sm border border-linha bg-superficie p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-tinta-fraca">
          {esferaLabel[edital.esfera]}
        </span>
        <StatusBadge status={edital.status} />
      </div>
      <h3 className="text-lg font-semibold text-tinta">{edital.titulo}</h3>
      <p className="text-sm text-tinta-suave">{edital.orgao}</p>
      <p className="text-sm text-tinta-suave">{edital.resumo}</p>
      <div className="flex flex-wrap gap-2 pt-1">
        {edital.areas.map((area) => (
          <span key={area} className="rounded-full bg-superficie-alt px-2.5 py-1 text-xs text-tinta-suave">
            {area}
          </span>
        ))}
      </div>
      {edital.exemplo && (
        <p className="rounded-sm bg-superficie-alt px-3 py-2 text-xs text-tinta-fraca">
          Conteúdo de exemplo — confirme na fonte oficial antes de divulgar.
        </p>
      )}
      {edital.detectadoAutomaticamente && (
        <p className="rounded-sm bg-superficie-alt px-3 py-2 text-xs text-tinta-fraca">
          Detectado automaticamente na fonte oficial — confirme prazo e valor antes de divulgar.
        </p>
      )}
      {edital.confirmarNaFonte && (
        <p className="rounded-sm bg-superficie-alt px-3 py-2 text-xs text-tinta-fraca">
          Não confirmamos prazo e status em tempo real na fonte oficial — confira antes de
          divulgar.
        </p>
      )}
      <TrackedLink
        href={edital.linkOficial}
        eventName="clique_edital"
        eventParams={{ edital_id: edital.id, esfera: edital.esfera }}
        className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-sm bg-fixed-ambar px-4 py-2 font-display text-sm font-semibold text-fixed-tinta transition hover:-translate-y-0.5 hover:shadow-md"
      >
        {edital.linkRotulo ?? "Ver edital completo"} ↗
      </TrackedLink>
    </article>
  );
}
