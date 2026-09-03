import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Radar Cultural MA",
  description:
    "Cadastre-se no Radar Cultural: apareça pra produtores e curadores e receba aviso quando abrir edital da sua área.",
};

// Google Forms do Radar Cultural. NEXT_PUBLIC_RADAR_CULTURAL_FORM_URL (nas
// Variables do GitHub Actions) sobrescreve isso sem precisar de novo push,
// caso o formulário seja recriado ou movido pra outra conta no futuro.
const FORMULARIO_PADRAO =
  "https://docs.google.com/forms/d/e/1FAIpQLSfehHkoWMYNwNRVBDPTFN0pk_9Dfq9ocZyy5MT6XEjzMZmuoQ/viewform?embedded=true";

export default function RadarCulturalPage() {
  const formularioUrl = process.env.NEXT_PUBLIC_RADAR_CULTURAL_FORM_URL || FORMULARIO_PADRAO;

  return (
    <>
      <PageHero
        eyebrow="Radar Cultural MA"
        title="Entre no radar de quem faz cultura no Maranhão"
        description="Cadastre seu perfil e o Comitê passa a te indicar pra produtores e curadores, te avisar quando abrir edital da sua área e da sua cidade, e usar o seu cadastro — junto com o de tanta outra gente — como número na hora de cobrar política pública pra cultura no Estado."
        foto="cacuria-1.jpg"
      />
      <Container className="flex flex-col gap-8 py-14">
        <Reveal className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-sm border border-linha bg-superficie p-5 transition hover:-translate-y-1 hover:shadow-md">
            <p className="font-display font-semibold text-tinta">Seja encontrado</p>
            <p className="mt-1 text-sm text-tinta-suave">
              Antes de indicar um nome, produtor, curador e o próprio Comitê consultam o radar.
            </p>
          </div>
          <div className="rounded-sm border border-linha bg-superficie p-5 transition hover:-translate-y-1 hover:shadow-md">
            <p className="font-display font-semibold text-tinta">Receba o aviso certo</p>
            <p className="mt-1 text-sm text-tinta-suave">
              Edital da sua linguagem e do seu município, direto pra você — sem ficar recarregando
              site de prefeitura.
            </p>
          </div>
          <div className="rounded-sm border border-linha bg-superficie p-5 transition hover:-translate-y-1 hover:shadow-md">
            <p className="font-display font-semibold text-tinta">Fortaleça a categoria</p>
            <p className="mt-1 text-sm text-tinta-suave">
              Quanto mais gente cadastrada, mais peso tem o Comitê na hora de cobrar o poder
              público com números da cena cultural do MA, não só com discurso.
            </p>
          </div>
        </Reveal>

        <Reveal className="overflow-hidden rounded-sm border border-linha bg-superficie">
          <iframe
            src={formularioUrl}
            title="Formulário Radar Cultural MA"
            className="h-[1400px] w-full"
            loading="lazy"
          />
        </Reveal>

        <p className="max-w-2xl text-xs text-tinta-fraca">
          Seus dados ficam só com o Comitê e servem só pro que está descrito acima: te
          indicar pra oportunidades e te avisar de edital. Quer que a gente apague? É só chamar o
          Comitê no{" "}
          <Link href="/participe" className="underline">
            WhatsApp ou Instagram
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
