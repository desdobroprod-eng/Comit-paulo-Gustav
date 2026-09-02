import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CertidaoRow } from "@/components/CertidaoRow";
import { certidoes, guiaOficialSecultMA } from "@/content/certidoes";
import { esferaLabel, type Esfera } from "@/lib/site";

export const metadata: Metadata = {
  title: "Certidões negativas",
  description:
    "Links oficiais para emitir certidão negativa federal, estadual (Maranhão) e municipal (São Luís), pessoa física e jurídica, exigidas em editais culturais.",
};

const esferas: Esfera[] = ["federal", "estadual", "municipal"];

export default function CertidoesPage() {
  return (
    <Container className="flex flex-col gap-10 py-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-ink">Certidões negativas</h1>
        <p className="max-w-2xl text-ink-soft">
          A maioria dos editais da Lei Paulo Gustavo pede comprovação de regularidade fiscal e
          trabalhista, para pessoa física e, se for o caso, para sua empresa (pessoa jurídica).
          Reunimos os links oficiais de emissão por esfera, para você não precisar procurar cada
          um separadamente.
        </p>
      </div>

      {esferas.map((esfera) => {
        const grupo = certidoes.filter((c) => c.esfera === esfera);
        if (grupo.length === 0) return null;
        return (
          <div key={esfera} className="flex flex-col gap-1">
            <h2 className="font-mono text-xs uppercase tracking-wide text-amber-deep">
              {esferaLabel[esfera]}
            </h2>
            <div className="rounded-2xl border border-border bg-surface px-6">
              {grupo.map((certidao) => (
                <CertidaoRow key={certidao.id} certidao={certidao} />
              ))}
            </div>
          </div>
        );
      })}

      <div className="rounded-2xl border border-border bg-surface-alt p-6">
        <p className="text-sm text-ink-soft">
          Se algum link acima estiver fora do ar ou tiver mudado de endereço, a própria SECULT-MA
          mantém uma página com os links que ela exige nos editais — use como referência cruzada:
        </p>
        <a
          href={guiaOficialSecultMA.url}
          className="mt-2 inline-block text-sm font-medium text-turquoise hover:underline"
        >
          {guiaOficialSecultMA.nome} ↗
        </a>
      </div>
    </Container>
  );
}
