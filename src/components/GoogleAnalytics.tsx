"use client";

import Script from "next/script";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { gaMeasurementId } from "@/lib/site";

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaMeasurementId || typeof window.gtag !== "function") return;
    const url = searchParams.size ? `${pathname}?${searchParams.toString()}` : pathname;
    window.gtag("event", "page_view", { page_path: url });
  }, [pathname, searchParams]);

  return null;
}

/**
 * Carrega o GA4 só se NEXT_PUBLIC_GA_MEASUREMENT_ID estiver configurado
 * (Vercel → Project Settings → Environment Variables). Sem a variável, o
 * site funciona normalmente, apenas sem analytics.
 */
export function GoogleAnalytics() {
  if (!gaMeasurementId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ window.dataLayer.push(arguments); }
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}', { page_path: window.location.pathname });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
    </>
  );
}
