import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Participe",
  description: "Redes oficiais e grupos de WhatsApp do Comitê Maranhão do Movimento Paulo Gustavo.",
};

export default function ParticipePage() {
  return (
    <Container className="flex flex-col gap-8 py-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-ink">Participe</h1>
        <p className="max-w-2xl text-ink-soft">
          Os grupos têm regras de convivência, pra manter o espaço seguro pra todo mundo. Antes
          de postar, leia as regras fixadas no grupo.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TrackedLink
          href="/r/grupo-whatsapp-1"
          eventName="clique_grupo_whatsapp"
          eventParams={{ grupo: "1" }}
          className="rounded-2xl border border-border bg-surface p-6 hover:border-amber-deep"
        >
          <p className="font-display text-lg font-semibold text-ink">Grupo de WhatsApp 1</p>
          <p className="mt-2 text-sm text-ink-soft">Entrar no grupo geral do Comitê →</p>
        </TrackedLink>
        <TrackedLink
          href="/r/grupo-whatsapp-2"
          eventName="clique_grupo_whatsapp"
          eventParams={{ grupo: "2" }}
          className="rounded-2xl border border-border bg-surface p-6 hover:border-amber-deep"
        >
          <p className="font-display text-lg font-semibold text-ink">Grupo de WhatsApp 2</p>
          <p className="mt-2 text-sm text-ink-soft">Entrar no grupo geral do Comitê →</p>
        </TrackedLink>
      </div>

      <Link
        href="/radar-cultural"
        className="rounded-2xl border border-amber-deep bg-surface-alt p-6 hover:brightness-95"
      >
        <p className="font-display text-lg font-semibold text-ink">Entre no Radar Cultural MA</p>
        <p className="mt-2 text-sm text-ink-soft">
          Cadastre seu perfil e receba aviso assim que abrir edital da sua área →
        </p>
      </Link>

      <div className="rounded-2xl border border-border bg-surface-alt p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Redes oficiais</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          <li>
            <TrackedLink
              href={site.redes.instagramMA}
              eventName="clique_rede_social"
              eventParams={{ rede: "instagram_ma" }}
              className="font-medium text-turquoise hover:underline"
            >
              Instagram — Comitê Maranhão ↗
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href={site.redes.instagramNacional}
              eventName="clique_rede_social"
              eventParams={{ rede: "instagram_nacional" }}
              className="font-medium text-turquoise hover:underline"
            >
              Instagram — Movimento nacional ↗
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href={site.redes.minc}
              eventName="clique_rede_social"
              eventParams={{ rede: "minc" }}
              className="font-medium text-turquoise hover:underline"
            >
              Lei Paulo Gustavo no gov.br ↗
            </TrackedLink>
          </li>
        </ul>
      </div>
    </Container>
  );
}
