import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CertidaoRow } from "@/components/CertidaoRow";
import { PageHero } from "@/components/PageHero";
import { TrackedLink } from "@/components/TrackedLink";
import { certidoes, guiaOficialSecultMA } from "@/content/certidoes";
import { esferaLabel, type Esfera } from "@/lib/site";

export const metadata: Metadata = {
  title: "Certidões negativas",
  description:
    "Links oficiais para emitir certidão negativa federal, estadual (Maranhão) e municipal (São Luís), pessoa física e jurídica, exigidas em editais culturais.",
};

const esferas: Esfera[] = ["federal", "estadual", "municipal"];

export default function CertidoesPage() {
  return (
    <>
      <PageHero
        eyebrow="Documentação"
        title="Certidões negativas"
        description="Quase todo edital da Lei Paulo Gustavo pede certidão de regularidade fiscal e trabalhista — pra pessoa física e, se você tiver empresa, também pra pessoa jurídica. Abaixo estão os links oficiais de emissão, separados por esfera, pra você não perder tempo caçando um por um."
      />
      <Container className="flex flex-col gap-10 py-14">
        {esferas.map((esfera) => {
          const grupo = certidoes.filter((c) => c.esfera === esfera);
          if (grupo.length === 0) return null;
          return (
            <div key={esfera} className="flex flex-col gap-1">
              <h2 className="font-mono text-xs uppercase tracking-wide text-amber-deep">
                {esferaLabel[esfera]}
              </h2>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                {grupo.map((certidao) => (
                  <CertidaoRow key={certidao.id} certidao={certidao} />
                ))}
              </div>
            </div>
          );
        })}

        <div className="rounded-2xl border border-border bg-surface-alt p-6">
          <p className="text-sm text-ink-soft">
            Link fora do ar ou mudou de endereço? A própria SECULT-MA mantém uma página com os
            links que ela cobra nos editais — vale como segunda fonte:
          </p>
          <TrackedLink
            href={guiaOficialSecultMA.url}
            eventName="clique_guia_certidoes"
            className="mt-2 inline-block text-sm font-medium text-turquoise hover:underline"
          >
            {guiaOficialSecultMA.nome} ↗
          </TrackedLink>
        </div>
      </Container>
    </>
  );
}
