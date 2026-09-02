import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Participe",
  description: "Redes oficiais e grupos de WhatsApp do Comitê Paulo Gustavo Maranhão.",
};

export default function ParticipePage() {
  return (
    <Container className="flex flex-col gap-8 py-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-ink">Participe</h1>
        <p className="max-w-2xl text-ink-soft">
          Por questões de privacidade e segurança dos grupos, seguimos algumas regras de
          participação. Ao entrar, leia as regras fixadas no grupo antes de postar.
        </p>
      </div>

      {/*
        /r/[slug] é um endpoint de redirect (302 para o WhatsApp), não uma página —
        precisa de navegação completa, por isso usa <a> em vez de <Link>.
      */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/r/grupo-whatsapp-1"
          className="rounded-2xl border border-border bg-surface p-6 hover:border-amber-deep"
        >
          <p className="font-display text-lg font-semibold text-ink">Grupo de WhatsApp 1</p>
          <p className="mt-2 text-sm text-ink-soft">Entrar no grupo geral do Comitê →</p>
        </a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/r/grupo-whatsapp-2"
          className="rounded-2xl border border-border bg-surface p-6 hover:border-amber-deep"
        >
          <p className="font-display text-lg font-semibold text-ink">Grupo de WhatsApp 2</p>
          <p className="mt-2 text-sm text-ink-soft">Entrar no grupo geral do Comitê →</p>
        </a>
      </div>

      <div className="rounded-2xl border border-border bg-surface-alt p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Redes oficiais</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          <li>
            <a href={site.redes.instagramMA} className="font-medium text-turquoise hover:underline">
              Instagram — Comitê Maranhão ↗
            </a>
          </li>
          <li>
            <a href={site.redes.instagramNacional} className="font-medium text-turquoise hover:underline">
              Instagram — Movimento nacional ↗
            </a>
          </li>
          <li>
            <a href={site.redes.minc} className="font-medium text-turquoise hover:underline">
              Lei Paulo Gustavo no gov.br ↗
            </a>
          </li>
        </ul>
      </div>
    </Container>
  );
}
