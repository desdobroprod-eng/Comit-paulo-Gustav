import Link from "next/link";
import { Container } from "@/components/Container";
import { EditalCard } from "@/components/EditalCard";
import { Faq } from "@/components/Faq";
import { MosaicLayer } from "@/components/MosaicLayer";
import { editais } from "@/content/editais";
import { site } from "@/lib/site";

export default function Home() {
  const destaques = editais.filter((e) => e.status !== "encerrado").slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden border-b border-fixed-ink/20 bg-fixed-amber py-20">
        <MosaicLayer />
        <Container className="relative flex flex-col gap-5">
          <span className="animate-fade-up font-mono text-xs uppercase tracking-wide text-fixed-ink/70">
            {site.nomeCurto}
          </span>
          <h1
            className="max-w-2xl animate-fade-up text-4xl font-semibold text-fixed-ink sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {site.tagline}
          </h1>
          <p
            className="max-w-xl animate-fade-up text-lg text-fixed-ink/80"
            style={{ animationDelay: "160ms" }}
          >
            {site.descricao}
          </p>
          <div
            className="flex flex-wrap gap-3 pt-2 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/editais"
              className="rounded-lg bg-fixed-ink px-5 py-3 font-display text-sm font-semibold text-fixed-amber transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Ver editais abertos
            </Link>
            <Link
              href="/certidoes"
              className="rounded-lg border border-fixed-ink/30 bg-fixed-amber px-5 py-3 text-sm font-medium text-fixed-ink transition hover:-translate-y-0.5 hover:border-fixed-ink hover:bg-fixed-ink/5"
            >
              Emitir certidões
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="flex flex-col gap-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold text-ink">Editais em destaque</h2>
            <Link href="/editais" className="text-sm font-medium text-turquoise hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {destaques.map((edital) => (
              <EditalCard key={edital.id} edital={edital} />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-border bg-surface-alt py-14">
        <MosaicLayer />
        <Container className="relative grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h3 className="font-display text-lg font-semibold text-ink">Articulação</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Juntamos fazedores e fazedoras de cultura de todo o Maranhão pra acompanhar, edital
              por edital, se a Lei Paulo Gustavo está saindo do papel.
            </p>
          </div>
          <div className="rounded-2xl bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h3 className="font-display text-lg font-semibold text-ink">Cobrança ao poder público</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Quando SECMA ou SECULT-SL atrasam prazo, resposta ou publicação de edital, é o
              Comitê que cobra — em ofício, em reunião ou nas redes.
            </p>
          </div>
          <div className="rounded-2xl bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h3 className="font-display text-lg font-semibold text-ink">Tudo num lugar só</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Edital aberto e link oficial de certidão, num só endereço — pra você não perder prazo
              correndo atrás de informação espalhada.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-fixed-ink/20 bg-fixed-amber p-8 sm:flex-row sm:items-center sm:justify-between">
          <MosaicLayer />
          <div className="relative">
            <h2 className="font-display text-xl font-semibold text-fixed-ink">
              Entre no Radar Cultural MA
            </h2>
            <p className="mt-1 max-w-xl text-sm text-fixed-ink/80">
              Produtores e curadores passam a te encontrar, e você recebe aviso assim que abrir
              edital da sua linguagem e da sua cidade.
            </p>
          </div>
          <Link
            href="/radar-cultural"
            className="relative shrink-0 rounded-lg bg-fixed-ink px-5 py-3 font-display text-sm font-semibold text-fixed-amber transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Cadastrar meu perfil
          </Link>
        </Container>
      </section>

      <Faq />
    </>
  );
}
