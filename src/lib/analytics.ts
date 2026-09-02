declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara um evento GA4. Não faz nada se o gtag não estiver carregado
 * (NEXT_PUBLIC_GA_MEASUREMENT_ID ausente, ou consentimento não dado no futuro).
 */
export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
