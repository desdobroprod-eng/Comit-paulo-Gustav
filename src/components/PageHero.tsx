import { Container } from "./Container";
import { Figura } from "./Figura";

/**
 * Abertura das páginas internas: foto do acervo cultural ao fundo, com a
 * informação por cima. Cada página passa uma foto diferente.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  foto,
}: {
  eyebrow: string;
  title: string;
  description: string;
  foto: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-linha">
      <Figura
        arquivo={foto}
        priority
        mostrarLegenda={false}
        className="absolute inset-0 -z-10 h-full w-full"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/88 via-black/62 to-black/15" />

      <Container className="flex flex-col gap-3 py-16 sm:py-20">
        <span className="subir rotulo text-[#FEC44A]">{eyebrow}</span>
        <h1
          className="subir max-w-3xl text-3xl font-semibold text-white sm:text-5xl"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        <p
          className="subir max-w-2xl text-lg text-white/80"
          style={{ animationDelay: "160ms" }}
        >
          {description}
        </p>
      </Container>
    </section>
  );
}
