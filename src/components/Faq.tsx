import { faq } from "@/content/faq";
import { Container } from "./Container";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
};

export function Faq() {
  return (
    <section className="border-t border-border py-14">
      <Container className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-ink">Perguntas frequentes</h2>
        <dl className="flex flex-col gap-6">
          {faq.map((item) => (
            <div key={item.pergunta}>
              <dt className="font-display font-semibold text-ink">{item.pergunta}</dt>
              <dd className="mt-1.5 text-sm text-ink-soft">{item.resposta}</dd>
            </div>
          ))}
        </dl>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Container>
    </section>
  );
}
