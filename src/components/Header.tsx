import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
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
    <header className="border-b border-border bg-surface">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-85">
          <Image
            src={`${basePath}/logo.png`}
            alt="Logotipo — Lei Paulo Gustavo"
            width={160}
            height={60}
            className="h-10 w-auto rounded-lg sm:h-12"
            priority
          />
          <span className="hidden max-w-[14rem] font-display text-sm font-semibold leading-snug text-ink sm:block sm:max-w-xs">
            {site.nomeCurto}
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-ink-soft transition hover:bg-surface-alt hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
