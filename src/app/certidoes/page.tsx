import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CertidaoRow } from "@/components/CertidaoRow";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TrackedLink } from "@/components/TrackedLink";
import { certidoes, certidoesVerificadasEm, guiaOficialSecultMA } from "@/content/certidoes";
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
        description="Quase todo edital de cultura pede certidão de regularidade fiscal e trabalhista — pra pessoa física e, se você tiver empresa, também pra pessoa jurídica. Em cada uma abaixo, o Comitê mostra o que ter em mãos e o passo a passo antes de você abrir o site do órgão."
        foto="tambor-2.jpg"
      />
      <Container className="flex flex-col gap-10 py-14">
        {esferas.map((esfera) => {
          const grupo = certidoes.filter((c) => c.esfera === esfera);
          if (grupo.length === 0) return null;
          return (
            <Reveal key={esfera} className="flex flex-col gap-1">
              <h2 className="rotulo text-ambar-fundo">
                {esferaLabel[esfera]}
              </h2>
              <div className="overflow-hidden rounded-sm border border-linha bg-superficie shadow-sm">
                {grupo.map((certidao) => (
                  <CertidaoRow key={certidao.id} certidao={certidao} />
                ))}
              </div>
            </Reveal>
          );
        })}

        <Reveal className="rounded-sm border border-linha bg-superficie-alt p-6">
          <p className="text-sm text-tinta-suave">
            O Comitê conferiu estes links um por um em {certidoesVerificadasEm}. Se algum sair do
            ar ou mudar de endereço, a própria SECMA mantém uma página com os links que ela cobra
            nos editais — vale como segunda fonte:
          </p>
          <TrackedLink
            href={guiaOficialSecultMA.url}
            eventName="clique_guia_certidoes"
            className="mt-2 inline-block text-sm font-medium text-turquesa hover:underline"
          >
            {guiaOficialSecultMA.nome} ↗
          </TrackedLink>
        </Reveal>
      </Container>
    </>
  );
}
