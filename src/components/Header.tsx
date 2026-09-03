import Image from "next/image";
import Link from "next/link";
import { BotaoTema } from "./BotaoTema";
import { Container } from "./Container";
import { MenuMobile } from "./MenuMobile";
import { basePath, site } from "@/lib/site";

const links = [
  { href: "/editais", label: "Editais" },
  { href: "/certidoes", label: "Certidões" },
  { href: "/radar-cultural", label: "Radar Cultural" },
  { href: "/sobre", label: "Sobre o Comitê" },
  { href: "/participe", label: "Participe" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-linha bg-papel/92 backdrop-blur">
      <Container className="flex items-center justify-between gap-3 py-3">
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-85">
          <Image
            src={`${basePath}/logo.png`}
            alt="Logotipo — Lei Paulo Gustavo"
            width={160}
            height={60}
            className="h-9 w-auto rounded-sm sm:h-11"
            priority
          />
          <span className="hidden max-w-xs font-display text-[13px] font-semibold leading-snug text-tinta xl:block">
            {site.nomeCurto}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-sm px-3 py-2 text-sm text-tinta-suave transition hover:bg-superficie-alt hover:text-tinta"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <BotaoTema />
          <MenuMobile links={links} />
        </div>
      </Container>
    </header>
  );
}
