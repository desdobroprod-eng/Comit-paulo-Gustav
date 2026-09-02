import { Container } from "./Container";
import { MosaicLayer } from "./MosaicLayer";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-alt py-14">
      <MosaicLayer />
      <Container className="relative flex flex-col gap-3">
        <span className="animate-fade-up font-mono text-xs uppercase tracking-wide text-amber-deep">
          {eyebrow}
        </span>
        <h1
          className="animate-fade-up text-3xl font-semibold text-ink sm:text-4xl"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        <p className="max-w-2xl animate-fade-up text-lg text-ink-soft" style={{ animationDelay: "160ms" }}>
          {description}
        </p>
      </Container>
    </section>
  );
}
