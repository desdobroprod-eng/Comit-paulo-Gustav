import { redirectTargets } from "@/lib/redirects";
import { RedirectClient } from "./redirect-client";

/**
 * GitHub Pages só serve arquivo estático — sem servidor não dá pra fazer
 * redirect HTTP 302 (era isso que a antiga route.ts fazia). Em vez disso,
 * cada slug vira uma página estática que redireciona no navegador via JS
 * assim que carrega, com link visível como último recurso.
 */
export function generateStaticParams() {
  return Object.keys(redirectTargets).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function RedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const target = redirectTargets[slug];

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-3 px-6 py-24 text-center">
      <RedirectClient destino={target.destino} />
      <p className="text-tinta-suave">
        Redirecionando para {target.label}… se nada acontecer,{" "}
        <a href={target.destino} className="underline">
          toque aqui
        </a>
        .
      </p>
    </div>
  );
}
