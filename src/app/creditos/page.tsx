import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { TrackedLink } from "@/components/TrackedLink";
import { creditos } from "@/content/cultura";

export const metadata: Metadata = {
  title: "Créditos das imagens",
  description:
    "Autoria, licença e fonte de cada foto e vídeo de cultura popular maranhense usados neste site.",
};

export default function CreditosPage() {
  return (
    <>
      <PageHero
        eyebrow="Acervo"
        title="Créditos das imagens"
        description="As fotos e o vídeo deste site vêm do Wikimedia Commons, sob licença Creative Commons. A licença exige que autoria e licença apareçam — é o que está aqui."
        foto="tambor-1.jpg"
      />
      <Container className="flex flex-col gap-8 py-14">
        <ul className="flex flex-col divide-y divide-linha rounded-sm border border-linha bg-superficie">
          {creditos.map((c) => (
            <li key={c.arquivo} className="flex flex-col gap-1 p-5">
              <p className="font-mono text-xs text-tinta-fraca">{c.arquivo}</p>
              <p className="font-semibold text-tinta">{c.titulo}</p>
              <p className="text-sm text-tinta-suave">
                Autoria: {c.autor} · Licença: {c.licenca}
              </p>
              <TrackedLink
                href={c.fonte}
                eventName="clique_credito_imagem"
                eventParams={{ arquivo: c.arquivo }}
                className="w-fit text-sm font-medium text-turquesa hover:underline"
              >
                Ver no Wikimedia Commons ↗
              </TrackedLink>
            </li>
          ))}
        </ul>

        <p className="max-w-2xl text-sm text-tinta-suave">
          As licenças CC BY exigem atribuição; as CC BY-SA exigem, além disso, que trabalhos
          derivados sejam compartilhados sob a mesma licença. Nenhuma imagem foi alterada além de
          redimensionamento e compressão para a web.
        </p>
      </Container>
    </>
  );
}
