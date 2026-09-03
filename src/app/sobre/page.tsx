import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre o Comitê",
  description: site.descricao,
};

export default function SobrePage() {
  return (
    <>
      <PageHero eyebrow="Nome oficial" title={site.nomeOficial} description={site.tagline}
        foto="bumba-2.jpg" />
      <Container className="flex flex-col gap-6 py-14">
        <Reveal className="flex max-w-2xl flex-col gap-4 text-tinta-suave">
          <p>
            Somos um comitê de sociedade civil, formado por fazedores e fazedoras de cultura do
            Maranhão. Não somos órgão público, nem fomos contratados por nenhum. Acompanhamos,
            articulamos e cobramos a execução da Lei Paulo Gustavo no Estado por conta própria, sem
            pedir licença a ninguém.
          </p>
          <p>Na prática, isso significa três coisas:</p>
          <ul className="flex flex-col gap-2 pl-1">
            <li>
              <strong className="text-tinta">Orientar</strong> — explicar edital aberto e a papelada
              que ele exige, na linguagem de quem faz cultura, não de quem escreve edital.
            </li>
            <li>
              <strong className="text-tinta">Articular</strong> — colocar categorias e linguagens
              artísticas diferentes do Maranhão numa mesma mesa, em torno das mesmas demandas.
            </li>
            <li>
              <strong className="text-tinta">Cobrar</strong> — ir atrás do poder público estadual e
              municipal até sair prazo, transparência e a lei valendo de verdade.
            </li>
          </ul>
          <p>
            Este comitê faz parte do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura
            Paulo Gustavo, que também tem comitês em outros estados do país.
          </p>
        </Reveal>
      </Container>
    </>
  );
}
