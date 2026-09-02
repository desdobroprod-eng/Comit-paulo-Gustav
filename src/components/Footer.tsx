import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface-alt">
      <Container className="flex flex-col gap-3 py-8 text-sm text-ink-soft">
        <p className="font-medium text-ink">{site.nomeOficial}</p>
        <p>{site.tagline}</p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a href={site.redes.instagramMA} className="hover:text-ink">
            Instagram — Comitê MA
          </a>
          <a href={site.redes.instagramNacional} className="hover:text-ink">
            Instagram — Movimento nacional
          </a>
          <a href={site.redes.minc} className="hover:text-ink">
            Lei Paulo Gustavo no gov.br
          </a>
          <Link href="/participe" className="hover:text-ink">
            Participe
          </Link>
          <Link href="/radar-cultural" className="hover:text-ink">
            Radar Cultural
          </Link>
        </div>
        <p className="mt-4 border-t border-border pt-4 text-xs text-ink-faint">
          Site idealizado por {site.idealizadores.pessoa} e {site.idealizadores.agencia}
          {site.idealizadores.url && (
            <>
              {" "}
              —{" "}
              <a href={site.idealizadores.url} className="underline hover:text-ink">
                {site.idealizadores.agencia}
              </a>
            </>
          )}
        </p>
      </Container>
    </footer>
  );
}
