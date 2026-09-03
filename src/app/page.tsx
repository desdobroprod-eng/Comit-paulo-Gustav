import Link from "next/link";
import { Container } from "@/components/Container";
import { EditalCard } from "@/components/EditalCard";
import { Faq } from "@/components/Faq";
import { Figura } from "@/components/Figura";
import { GaleriaCultural } from "@/components/GaleriaCultural";
import { Reveal } from "@/components/Reveal";
import { VideoCultural } from "@/components/VideoCultural";
import { editais } from "@/content/editais";
import { site } from "@/lib/site";

export default function Home() {
  const abertos = editais.filter((e) => e.status !== "encerrado");
  const destaques = abertos.slice(0, 2);

  // Situação em frase, tirada do próprio conteúdo — não é painel de números.
  const situacao =
    abertos.length === 0
      ? "Nenhum chamamento aberto agora — o Comitê avisa assim que abrir."
      : abertos.length === 1
        ? "1 chamamento aberto agora no Maranhão e em São Luís."
        : `${abertos.length} chamamentos abertos agora no Maranhão e em São Luís.`;

  return (
    <>
      {/* HERO — foto de gente fazendo cultura, e na frente o que o site resolve */}
      <section className="relative isolate overflow-hidden border-b border-linha">
        <Figura
          arquivo="bumba-1.jpg"
          priority
          mostrarLegenda={false}
          className="absolute inset-0 -z-10 h-full w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />

        <Container className="flex flex-col gap-6 py-20 sm:py-28">
          <p className="subir rotulo max-w-3xl text-[#FEC44A]">{site.nomeOficial}</p>

          <h1
            className="subir max-w-3xl text-4xl font-semibold leading-[1.05] text-white sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Edital aberto e certidão em um lugar só
          </h1>

          <p
            className="subir max-w-xl text-lg text-white/80"
            style={{ animationDelay: "160ms" }}
          >
            {situacao} Aqui você vê o que está valendo agora e emite, na hora, a papelada que o
            edital exige.
          </p>

          <div className="subir flex flex-wrap gap-3 pt-2" style={{ animationDelay: "240ms" }}>
            <Link
              href="/editais"
              className="rounded-sm bg-fixed-ambar px-6 py-3 font-semibold text-fixed-tinta transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Ver editais abertos
            </Link>
            <Link
              href="/certidoes"
              className="rounded-sm border border-white/40 px-6 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
            >
              Emitir certidões
            </Link>
          </div>

          <p className="subir pt-4 text-sm italic text-white/55" style={{ animationDelay: "320ms" }}>
            {site.tagline}
          </p>
        </Container>
      </section>

      {/* EDITAIS */}
      <section className="py-16">
        <Container className="flex flex-col gap-7">
          <Reveal className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="rotulo text-ambar-fundo">Fomento à cultura</span>
              <h2 className="text-3xl font-semibold text-tinta">Aberto agora</h2>
            </div>
            <Link
              href="/editais"
              className="shrink-0 text-sm font-medium text-turquesa hover:underline"
            >
              Ver todos →
            </Link>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {destaques.map((edital, i) => (
              <Reveal key={edital.id} delay={i * 80}>
                <EditalCard edital={edital} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* O QUE O COMITÊ FAZ — com o vídeo de tambor ao lado */}
      <section className="border-t border-linha bg-superficie-alt py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="rotulo text-ambar-fundo">Quem faz esse site</span>
              <h2 className="text-3xl font-semibold text-tinta">
                Um comitê de quem faz cultura, não um órgão público
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              <div className="border-l-2 border-ambar pl-4">
                <h3 className="font-display text-lg font-semibold text-tinta">Orientar</h3>
                <p className="mt-1 text-sm text-tinta-suave">
                  Explicar edital aberto e a papelada que ele exige, na linguagem de quem faz
                  cultura — não na de quem escreve edital.
                </p>
              </div>
              <div className="border-l-2 border-turquesa pl-4">
                <h3 className="font-display text-lg font-semibold text-tinta">Articular</h3>
                <p className="mt-1 text-sm text-tinta-suave">
                  Colocar linguagens artísticas diferentes do Maranhão numa mesma mesa, em torno
                  das mesmas demandas.
                </p>
              </div>
              <div className="border-l-2 border-terracota pl-4">
                <h3 className="font-display text-lg font-semibold text-tinta">Cobrar</h3>
                <p className="mt-1 text-sm text-tinta-suave">
                  Quando SECMA ou SECULT-SL atrasam prazo, resposta ou publicação, é o Comitê que
                  cobra — em ofício, em reunião ou nas redes.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <VideoCultural className="h-80 w-full rounded-sm border border-linha lg:h-[26rem]" />
          </Reveal>
        </Container>
      </section>

      <GaleriaCultural />

      {/* RADAR CULTURAL */}
      <section className="py-16">
        <Container>
          <Reveal className="relative isolate overflow-hidden rounded-sm border border-linha">
            <Figura
              arquivo="cacuria-1.jpg"
              mostrarLegenda={false}
              className="absolute inset-0 -z-10 h-full w-full"
              sizes="(min-width: 1024px) 60rem, 100vw"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/88 via-black/70 to-black/30" />
            <div className="flex flex-col items-start gap-5 p-8 sm:p-12">
              <span className="rotulo text-[#FEC44A]">Radar Cultural MA</span>
              <h2 className="max-w-xl text-2xl font-semibold text-white sm:text-3xl">
                Um mapa de quem faz cultura no Maranhão
              </h2>
              <p className="max-w-xl text-white/80">
                Ache quem toca, filma, dança e produz perto de você e fale direto no WhatsApp da
                pessoa. Bote seu pino no mapa e passe a ser encontrado — e a receber aviso quando
                abrir edital da sua linguagem e da sua cidade.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/radar-cultural"
                  className="rounded-sm bg-fixed-ambar px-6 py-3 font-semibold text-fixed-tinta transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Abrir o mapa
                </Link>
                <Link
                  href="/radar-cultural#cadastro"
                  className="rounded-sm border border-white/40 px-6 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
                >
                  Bota meu pino
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Faq />
    </>
  );
}
