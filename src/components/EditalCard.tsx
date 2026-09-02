import { esferaLabel } from "@/lib/site";
import type { Edital } from "@/content/editais";
import { StatusBadge } from "./StatusBadge";

export function EditalCard({ edital }: { edital: Edital }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">
          {esferaLabel[edital.esfera]}
        </span>
        <StatusBadge status={edital.status} />
      </div>
      <h3 className="text-lg font-semibold text-ink">{edital.titulo}</h3>
      <p className="text-sm text-ink-soft">{edital.orgao}</p>
      <p className="text-sm text-ink-soft">{edital.resumo}</p>
      <div className="flex flex-wrap gap-2 pt-1">
        {edital.areas.map((area) => (
          <span key={area} className="rounded-full bg-surface-alt px-2.5 py-1 text-xs text-ink-soft">
            {area}
          </span>
        ))}
      </div>
      {edital.exemplo && (
        <p className="rounded-lg bg-surface-alt px-3 py-2 text-xs text-ink-faint">
          Conteúdo de exemplo — confirme na fonte oficial antes de divulgar.
        </p>
      )}
      <a
        href={edital.linkOficial}
        className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-lg bg-amber px-4 py-2 font-display text-sm font-semibold text-ink hover:brightness-95"
      >
        Ver edital completo ↗
      </a>
    </article>
  );
}
