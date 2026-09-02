import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EditalCard } from "@/components/EditalCard";
import { PageHero } from "@/components/PageHero";
import { editais, fontesOficiais } from "@/content/editais";
import { esferaLabel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editais abertos",
  description:
    "Editais estaduais (Maranhão) e municipais (São Luís) da Lei Paulo Gustavo, com link direto para a fonte oficial.",
};

export default function EditaisPage() {
  return (
    <>
      <PageHero
        eyebrow="Fomento à cultura"
        title="Editais abertos"
        description="Aqui estão os editais de fomento à cultura abertos no Estado do Maranhão e na capital São Luís — da Lei Paulo Gustavo e da Política Nacional Aldir Blanc (PNAB), o programa federal irmão, administrado pelas mesmas secretarias. Por enquanto é só SECMA e SECULT-SL; outros municípios entram assim que o Comitê conseguir cobrir. O botão de cada edital leva direto à publicação oficial — a inscrição é sempre por lá, nunca aqui."
      />
      <Container className="flex flex-col gap-8 py-14">
        <div className="grid gap-5 sm:grid-cols-2">
          {editais.map((edital) => (
            <EditalCard key={edital.id} edital={edital} />
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-surface-alt p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            Fonte oficial, pra conferir sempre que bater dúvida
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Edital abre e fecha sem avisar o Comitê. Antes de se inscrever, confirme prazo, valor e
            regulamento direto na fonte de cada esfera:
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {Object.entries(fontesOficiais).map(([esfera, fonte]) => (
              <li key={esfera}>
                <a href={fonte.url} className="text-sm font-medium text-turquoise hover:underline">
                  {esferaLabel[esfera as keyof typeof esferaLabel]} — {fonte.nome} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
