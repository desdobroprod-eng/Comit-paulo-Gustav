"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Entrada no scroll. A base é SEMPRE visível: se o JS não rodar, o observer
 * não existir ou a pessoa pedir menos movimento, o conteúdo aparece do mesmo
 * jeito — a animação é puramente aditiva.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState<boolean | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    // só a partir daqui o elemento pode começar escondido
    setVisivel(false);

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            setVisivel(true);
            obs.unobserve(entrada.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`revelar ${className}`}
      data-visivel={visivel === null ? undefined : String(visivel)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
