"use client";

import { trackEvent } from "@/lib/analytics";

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
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </a>
  );
}
