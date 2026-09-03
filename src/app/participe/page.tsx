import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TrackedLink } from "@/components/TrackedLink";
import { basePath, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Participe",
  description: "Redes oficiais e grupos de WhatsApp do Comitê.",
};

export default function ParticipePage() {
  return (
    <>
      <PageHero
        eyebrow="Junte-se"
        title="Participe"
        description="Os grupos têm regras de convivência, pra manter o espaço seguro pra todo mundo. Antes de postar, leia as regras fixadas no grupo."
        foto="cacuria-2.jpg"
      />
      <Container className="flex flex-col gap-8 py-14">
      <Reveal className="grid gap-4 sm:grid-cols-2">
        <TrackedLink
          href={`${basePath}/r/grupo-whatsapp-1`}
          eventName="clique_grupo_whatsapp"
          eventParams={{ grupo: "1" }}
          className="rounded-sm border border-linha bg-superficie p-6 transition hover:-translate-y-1 hover:border-ambar-fundo hover:shadow-md"
        >
          <p className="font-display text-lg font-semibold text-tinta">Grupo de WhatsApp 1</p>
          <p className="mt-2 text-sm text-tinta-suave">Entrar no grupo geral do Comitê →</p>
        </TrackedLink>
        <TrackedLink
          href={`${basePath}/r/grupo-whatsapp-2`}
          eventName="clique_grupo_whatsapp"
          eventParams={{ grupo: "2" }}
          className="rounded-sm border border-linha bg-superficie p-6 transition hover:-translate-y-1 hover:border-ambar-fundo hover:shadow-md"
        >
          <p className="font-display text-lg font-semibold text-tinta">Grupo de WhatsApp 2</p>
          <p className="mt-2 text-sm text-tinta-suave">Entrar no grupo geral do Comitê →</p>
        </TrackedLink>
      </Reveal>

      <Link
        href="/radar-cultural"
        className="rounded-sm border border-ambar-fundo bg-superficie-alt p-6 transition hover:-translate-y-1 hover:shadow-md"
      >
        <p className="font-display text-lg font-semibold text-tinta">Entre no Radar Cultural MA</p>
        <p className="mt-2 text-sm text-tinta-suave">
          Cadastre seu perfil e receba aviso assim que abrir edital da sua área →
        </p>
      </Link>

      <Reveal className="rounded-sm border border-linha bg-superficie-alt p-6">
        <h2 className="font-display text-lg font-semibold text-tinta">Redes oficiais</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          <li>
            <TrackedLink
              href={site.redes.instagramMA}
              eventName="clique_rede_social"
              eventParams={{ rede: "instagram_ma" }}
              className="font-medium text-turquesa hover:underline"
            >
              Instagram do Comitê ↗
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href={site.redes.instagramNacional}
              eventName="clique_rede_social"
              eventParams={{ rede: "instagram_nacional" }}
              className="font-medium text-turquesa hover:underline"
            >
              Instagram — Movimento nacional ↗
            </TrackedLink>
          </li>
          <li>
            <TrackedLink
              href={site.redes.minc}
              eventName="clique_rede_social"
              eventParams={{ rede: "minc" }}
              className="font-medium text-turquesa hover:underline"
            >
              Lei Paulo Gustavo no gov.br ↗
            </TrackedLink>
          </li>
        </ul>
      </Reveal>
      </Container>
    </>
  );
}
