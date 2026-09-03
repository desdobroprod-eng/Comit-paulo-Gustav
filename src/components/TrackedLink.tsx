"use client";

import { trackEvent } from "@/lib/analytics";

/**
 * Link com evento de analytics. É o ponto único de saída do site: todo link
 * que aponta para fora abre em nova aba, para o site do Comitê nunca ser
 * fechado (decisão do Comitê — retenção).
 *
 * "Externo" é decidido pelo protocolo, não pela string: `/r/grupo-whatsapp-1`
 * é interno (redireciona para o WhatsApp só depois), enquanto
 * `https://prosas.com.br/...` é externo.
 */
function ehExterno(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function TrackedLink({
  href,
  eventName,
  eventParams,
  className,
  children,
}: {
  href: string;
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
  className?: string;
  children: React.ReactNode;
}) {
  const externo = ehExterno(href);

  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent(eventName, eventParams)}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {externo && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}
