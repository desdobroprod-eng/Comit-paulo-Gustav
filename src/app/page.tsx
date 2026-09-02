import Link from "next/link";
import { Container } from "@/components/Container";
import { EditalCard } from "@/components/EditalCard";
import { Faq } from "@/components/Faq";
import { editais } from "@/content/editais";
import { site } from "@/lib/site";

export default function Home() {
  const destaques = editais.filter((e) => e.status !== "encerrado").slice(0, 2);

  return (
    <>
      <section className="border-b border-border bg-surface-alt py-16">
        <Container className="flex flex-col gap-5">
          <span className="font-mono text-xs uppercase tracking-wide text-amber-deep">
            {site.nomeCurto}
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold text-ink sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="max-w-xl text-lg text-ink-soft">{site.descricao}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/editais"
              className="rounded-lg bg-amber px-5 py-3 font-display text-sm font-semibold text-ink hover:brightness-95"
            >
              Ver editais abertos
            </Link>
            <Link
              href="/certidoes"
              className="rounded-lg border border-border bg-surface px-5 py-3 text-sm font-medium text-ink hover:border-amber-deep"
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

      <section className="border-t border-border bg-surface-alt py-14">
        <Container className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">Articulação</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Juntamos fazedores e fazedoras de cultura de todo o Maranhão pra acompanhar, edital
              por edital, se a Lei Paulo Gustavo está saindo do papel.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">Cobrança ao poder público</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Quando SECMA ou SECULT-SL atrasam prazo, resposta ou publicação de edital, é o
              Comitê que cobra — em ofício, em reunião ou nas redes.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">Tudo num lugar só</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Edital aberto e link oficial de certidão, num só endereço — pra você não perder prazo
              correndo atrás de informação espalhada.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="flex flex-col items-start gap-4 rounded-2xl border border-amber-deep bg-surface-alt p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              Entre no Radar Cultural MA
            </h2>
            <p className="mt-1 max-w-xl text-sm text-ink-soft">
              Produtores e curadores passam a te encontrar, e você recebe aviso assim que abrir
              edital da sua linguagem e da sua cidade.
            </p>
          </div>
          <Link
            href="/radar-cultural"
            className="shrink-0 rounded-lg bg-amber px-5 py-3 font-display text-sm font-semibold text-ink hover:brightness-95"
          >
            Cadastrar meu perfil
          </Link>
        </Container>
      </section>

      <Faq />
    </>
  );
}
