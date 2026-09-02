import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Radar Cultural MA",
  description:
    "Entre no Radar Cultural do Maranhão: apareça para produtores e curadores e receba aviso quando abrir edital da sua área.",
};

export default function RadarCulturalPage() {
  return (
    <Container className="flex flex-col gap-8 py-14">
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-wide text-amber-deep">
          Radar Cultural MA
        </span>
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
          Apareça no radar de quem produz cultura no Maranhão
        </h1>
        <p className="max-w-2xl text-lg text-ink-soft">
          Cadastre seu perfil e o Comitê passa a te indicar para produtores e curadores, te avisar
          quando abrir edital da sua área e da sua cidade — e ajuda a mostrar, com dados reais, o
          tamanho da cena cultural maranhense para quem decide política pública.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="font-display font-semibold text-ink">Seja encontrado</p>
          <p className="mt-1 text-sm text-ink-soft">
            Produtores, curadores e o próprio Comitê consultam o radar antes de indicar nomes.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="font-display font-semibold text-ink">Receba o aviso certo</p>
          <p className="mt-1 text-sm text-ink-soft">
            Editais da sua linguagem artística e do seu município, sem precisar ficar checando site
            de prefeitura.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="font-display font-semibold text-ink">Fortaleça a categoria</p>
          <p className="mt-1 text-sm text-ink-soft">
            Cada perfil ajuda o Comitê a cobrar o poder público com números reais da cena cultural
            do MA.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <iframe
          src="https://form.jotform.com/262445470043048"
          title="Formulário Radar Cultural MA"
          className="h-[1400px] w-full"
          loading="lazy"
        />
      </div>

      <p className="max-w-2xl text-xs text-ink-faint">
        Seus dados ficam com o Comitê Paulo Gustavo Maranhão e são usados só para o que está
        descrito acima: te indicar para oportunidades e te avisar de editais. Você pode pedir a
        remoção deles quando quiser, falando com o Comitê pelo{" "}
        <a href="/participe" className="underline">
          WhatsApp ou Instagram
        </a>
        .
      </p>
    </Container>
  );
}
