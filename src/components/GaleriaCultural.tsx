import Link from "next/link";
import { Container } from "./Container";
import { Figura } from "./Figura";
import { Reveal } from "./Reveal";
import { fotos } from "@/content/cultura";

/**
 * A cena que o Comitê defende, em imagem. Bumba meu boi, Tambor de Crioula e
 * Cacuriá — acervo Creative Commons, com crédito em cada foto e a lista
 * completa em /creditos.
 */
export function GaleriaCultural() {
  return (
    <section className="border-t border-linha bg-superficie-alt py-16">
      <Container className="flex flex-col gap-8">
        <Reveal className="flex flex-col gap-3">
          <span className="rotulo text-ambar-fundo">A cultura que a lei financia</span>
          <h2 className="max-w-2xl text-3xl font-semibold text-tinta sm:text-4xl">
            Não é papel de edital. É isso aqui.
          </h2>
          <p className="max-w-2xl text-tinta-suave">
            Bumba meu boi, Tambor de Crioula, Cacuriá — o que está em jogo quando um edital
            atrasa, ou quando o dinheiro da Lei Paulo Gustavo não chega em quem faz.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fotos.map((foto, i) => (
            <Reveal key={foto.arquivo} delay={i * 60}>
              <Figura
                arquivo={foto.arquivo}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="relative h-64 w-full rounded-sm border border-linha"
              />
            </Reveal>
          ))}
        </div>

        <p className="text-xs text-tinta-fraca">
          Imagens do Wikimedia Commons sob licença Creative Commons.{" "}
          <Link href="/creditos" className="underline hover:text-tinta">
            Ver autoria e licença de cada uma
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
