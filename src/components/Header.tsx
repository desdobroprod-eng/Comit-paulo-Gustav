import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/lib/site";

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
      <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="max-w-xs font-display text-sm font-semibold leading-snug text-ink sm:max-w-sm sm:text-base"
        >
          {site.nomeCurto}
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
