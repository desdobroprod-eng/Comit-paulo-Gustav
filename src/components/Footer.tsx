import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { MosaicLayer } from "./MosaicLayer";
import { basePath, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-border bg-surface-alt">
      <MosaicLayer />
      <Container className="relative flex flex-col gap-4 py-10 text-sm text-ink-soft">
        <Image
          src={`${basePath}/logo.png`}
          alt="Logotipo — Lei Paulo Gustavo"
          width={140}
          height={53}
          className="h-9 w-auto rounded-md"
        />
        <p className="font-medium text-ink">{site.nomeOficial}</p>
        <p>{site.tagline}</p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a href={site.redes.instagramMA} className="hover:text-ink">
            Instagram do Comitê
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
