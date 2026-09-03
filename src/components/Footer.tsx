import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { MosaicLayer } from "./MosaicLayer";
import { TrackedLink } from "./TrackedLink";
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
          className="h-9 w-auto self-start rounded-md"
        />
        <p className="font-medium text-ink">{site.nomeOficial}</p>
        <p>{site.tagline}</p>
        <div className="flex flex-wrap gap-4 pt-2">
          <TrackedLink
            href={site.redes.instagramMA}
            eventName="clique_rede_social"
            eventParams={{ rede: "instagram_ma", origem: "rodape" }}
            className="hover:text-ink"
          >
            Instagram do Comitê
          </TrackedLink>
          <TrackedLink
            href={site.redes.instagramNacional}
            eventName="clique_rede_social"
            eventParams={{ rede: "instagram_nacional", origem: "rodape" }}
            className="hover:text-ink"
          >
            Instagram — Movimento nacional
          </TrackedLink>
          <TrackedLink
            href={site.redes.minc}
            eventName="clique_rede_social"
            eventParams={{ rede: "minc", origem: "rodape" }}
            className="hover:text-ink"
          >
            Lei Paulo Gustavo no gov.br
          </TrackedLink>
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
