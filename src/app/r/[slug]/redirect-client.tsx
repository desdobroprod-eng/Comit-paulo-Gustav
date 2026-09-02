"use client";

import { useEffect } from "react";

export function RedirectClient({ destino }: { destino: string }) {
  useEffect(() => {
    window.location.replace(destino);
  }, [destino]);

  return null;
}
