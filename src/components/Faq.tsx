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
    <section className="border-t border-linha py-14">
      <Container className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-tinta">Perguntas frequentes</h2>
        <dl className="flex flex-col gap-6">
          {faq.map((item) => (
            <div key={item.pergunta}>
              <dt className="font-display font-semibold text-tinta">{item.pergunta}</dt>
              <dd className="mt-1.5 text-sm text-tinta-suave">{item.resposta}</dd>
            </div>
          ))}
        </dl>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Container>
    </section>
  );
}
