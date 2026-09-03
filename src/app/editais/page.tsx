import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EditalCard } from "@/components/EditalCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TrackedLink } from "@/components/TrackedLink";
import { editais, fontesOficiais } from "@/content/editais";
import { esferaLabel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editais abertos",
  description:
    "Editais de fomento à cultura abertos no Maranhão (SECMA) e em São Luís (SECULT-SL) — da Lei Paulo Gustavo quando houver, e da Política Nacional Aldir Blanc. Cada um identificado, com link para a fonte oficial.",
};

export default function EditaisPage() {
  const temLPG = editais.some((e) => !e.areas.includes("Política Nacional Aldir Blanc (PNAB)"));

  return (
    <>
      <PageHero
        eyebrow="Fomento à cultura"
        title="Editais abertos"
        description={
          temLPG
            ? "Aqui estão os editais de fomento à cultura abertos no Estado do Maranhão e na capital São Luís, cada um identificado por programa — Lei Paulo Gustavo ou Política Nacional Aldir Blanc (PNAB), o federal irmão administrado pelas mesmas secretarias. Por enquanto é só SECMA e SECULT-SL; outros municípios entram assim que o Comitê conseguir cobrir. O botão de cada edital leva direto à publicação oficial — a inscrição é sempre por lá, nunca aqui."
            : "Agora mesmo não há edital específico da Lei Paulo Gustavo aberto no Maranhão — o que está em andamento em SECMA e SECULT-SL é a Política Nacional Aldir Blanc (PNAB), o programa federal irmão, administrado pelas mesmas secretarias. Cada card abaixo diz exatamente de qual programa se trata, pra você nunca confundir um pelo outro. O botão de cada edital leva direto à publicação oficial — a inscrição é sempre por lá, nunca aqui."
        }
        foto="bumba-1.jpg"
      />
      <Container className="flex flex-col gap-8 py-14">
        <div className="grid gap-5 sm:grid-cols-2">
          {editais.map((edital, i) => (
            <Reveal key={edital.id} delay={i * 70}>
              <EditalCard edital={edital} />
            </Reveal>
          ))}
        </div>

        <Reveal className="rounded-sm border border-linha bg-superficie-alt p-6">
          <h2 className="font-display text-lg font-semibold text-tinta">
            Fonte oficial, pra conferir sempre que bater dúvida
          </h2>
          <p className="mt-2 text-sm text-tinta-suave">
            Edital abre e fecha sem avisar o Comitê. Antes de se inscrever, confirme prazo, valor e
            regulamento direto na fonte de cada esfera:
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {Object.entries(fontesOficiais).map(([esfera, fonte]) => (
              <li key={esfera}>
                <TrackedLink
                  href={fonte.url}
                  eventName="clique_fonte_oficial"
                  eventParams={{ esfera }}
                  className="text-sm font-medium text-turquesa hover:underline"
                >
                  {esferaLabel[esfera as keyof typeof esferaLabel]} — {fonte.nome} ↗
                </TrackedLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </>
  );
}
