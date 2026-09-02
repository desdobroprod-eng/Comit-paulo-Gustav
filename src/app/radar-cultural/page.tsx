import type { Metadata } from "next";
import { Container } from "@/components/Container";

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
    <Container className="flex flex-col gap-8 py-14">
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-wide text-amber-deep">
          Radar Cultural MA
        </span>
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
          Entre no radar de quem faz cultura no Maranhão
        </h1>
        <p className="max-w-2xl text-lg text-ink-soft">
          Cadastre seu perfil e o Comitê passa a te indicar pra produtores e curadores, te avisar
          quando abrir edital da sua área e da sua cidade, e usar o seu cadastro — junto com o de
          tanta outra gente — como número na hora de cobrar política pública pra cultura no
          Estado.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="font-display font-semibold text-ink">Seja encontrado</p>
          <p className="mt-1 text-sm text-ink-soft">
            Antes de indicar um nome, produtor, curador e o próprio Comitê consultam o radar.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="font-display font-semibold text-ink">Receba o aviso certo</p>
          <p className="mt-1 text-sm text-ink-soft">
            Edital da sua linguagem e do seu município, direto pra você — sem ficar recarregando
            site de prefeitura.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="font-display font-semibold text-ink">Fortaleça a categoria</p>
          <p className="mt-1 text-sm text-ink-soft">
            Quanto mais gente cadastrada, mais peso tem o Comitê na hora de cobrar o poder
            público com números da cena cultural do MA, não só com discurso.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <iframe
          src={formularioUrl}
          title="Formulário Radar Cultural MA"
          className="h-[1400px] w-full"
          loading="lazy"
        />
      </div>

      <p className="max-w-2xl text-xs text-ink-faint">
        Seus dados ficam só com o Comitê e servem só pro que está descrito acima: te
        indicar pra oportunidades e te avisar de edital. Quer que a gente apague? É só chamar o
        Comitê no{" "}
        <a href="/participe" className="underline">
          WhatsApp ou Instagram
        </a>
        .
      </p>
    </Container>
  );
}
