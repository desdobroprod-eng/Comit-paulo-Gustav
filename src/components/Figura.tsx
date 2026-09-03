import Image from "next/image";
import { creditoDe, fotoDe } from "@/content/cultura";
import { basePath } from "@/lib/site";

/**
 * Foto do acervo com o crédito que a licença Creative Commons exige.
 * `arquivo` é o nome dentro de public/cultura (ex.: "tambor-1.jpg").
 */
export function Figura({
  arquivo,
  className = "",
  priority = false,
  sizes = "100vw",
  mostrarLegenda = true,
}: {
  arquivo: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  mostrarLegenda?: boolean;
}) {
  const foto = fotoDe(arquivo);
  const credito = creditoDe(arquivo);

  /*
   * Sem `relative` fixo aqui: quem usa decide o posicionamento pelo className
   * (o hero passa `absolute inset-0`, a galeria passa `relative`). Fixar
   * `relative` no componente competia com o `absolute` de quem chama — e como
   * as duas classes têm a mesma especificidade, quem ganhava era a ordem do
   * CSS do Tailwind, não a intenção.
   */
  return (
    <figure className={`overflow-hidden ${className}`}>
      <Image
        src={`${basePath}/cultura/${arquivo}`}
        alt={foto?.alt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {mostrarLegenda && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-3 pt-10 text-[11px] leading-snug text-white/90">
          <span className="font-semibold">{foto?.manifestacao}</span>
          {foto?.legenda ? ` — ${foto.legenda}` : ""}
          {credito && (
            <span className="block text-white/60">
              Foto: {credito.autor} · {credito.licenca}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
