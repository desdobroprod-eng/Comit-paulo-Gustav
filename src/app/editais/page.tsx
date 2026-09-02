import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EditalCard } from "@/components/EditalCard";
import { editais, fontesOficiais } from "@/content/editais";
import { esferaLabel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editais abertos",
  description:
    "Editais estaduais (Maranhão) e municipais (São Luís) da Lei Paulo Gustavo, com link direto para a fonte oficial.",
};

export default function EditaisPage() {
  return (
    <Container className="flex flex-col gap-8 py-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-ink">Editais abertos</h1>
        <p className="max-w-2xl text-ink-soft">
          Reunimos aqui os editais de fomento à cultura do Estado do Maranhão e da capital São
          Luís — da Lei Paulo Gustavo e da Política Nacional Aldir Blanc (PNAB), programa
          federal irmão, administrado pelas mesmas secretarias. Em breve ampliamos para outros
          municípios. O botão de cada edital leva direto à publicação oficial — inscreva-se
          sempre por lá.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {editais.map((edital) => (
          <EditalCard key={edital.id} edital={edital} />
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface-alt p-6">
        <h2 className="font-display text-lg font-semibold text-ink">
          Fontes oficiais para conferir a todo momento
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Editais abrem e encerram fora do nosso controle. Sempre que precisar confirmar prazo,
          valor ou regulamento, use a fonte oficial de cada esfera:
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
  );
}
