import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre o Comitê",
  description: site.descricao,
};

export default function SobrePage() {
  return (
    <Container className="flex flex-col gap-6 py-14">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-amber-deep">
          Nome oficial
        </span>
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{site.nomeOficial}</h1>
      </div>

      <p className="max-w-2xl text-lg text-ink-soft">{site.tagline}</p>

      <div className="flex max-w-2xl flex-col gap-4 text-ink-soft">
        <p>
          Somos um comitê de sociedade civil formado por fazedores e fazedoras de cultura do
          Maranhão. Não somos órgão público nem ONG contratada — atuamos de forma independente
          para acompanhar, articular e cobrar a execução da Lei Paulo Gustavo no Estado.
        </p>
        <p>Nossa atuação se organiza em três frentes:</p>
        <ul className="flex flex-col gap-2 pl-1">
          <li>
            <strong className="text-ink">Auxiliar</strong> — orientar fazedores e fazedoras de
            cultura sobre editais abertos e a documentação exigida para participar deles.
          </li>
          <li>
            <strong className="text-ink">Articular</strong> — conectar categorias e linguagens
            artísticas do Maranhão em torno de demandas comuns.
          </li>
          <li>
            <strong className="text-ink">Solicitar e cobrar</strong> — exigir do poder público
            estadual e municipal transparência, prazos e cumprimento da lei.
          </li>
        </ul>
        <p>
          Este comitê integra o Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura
          Paulo Gustavo, presente em outros estados do país.
        </p>
      </div>
    </Container>
  );
}
