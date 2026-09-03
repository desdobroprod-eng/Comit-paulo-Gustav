"use client";

import { useEffect, useRef } from "react";
import { creditoDe, video } from "@/content/cultura";
import { basePath } from "@/lib/site";

/**
 * Vídeo de Tambor de Crioula. Toca sozinho, mudo e em laço — mas para de vez
 * se a pessoa pediu menos movimento no sistema; nesse caso fica o poster.
 */
export function VideoCultural({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const credito = creditoDe(video.creditoArquivo);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (menosMovimento) {
      el.pause();
      el.removeAttribute("autoplay");
    } else {
      el.play().catch(() => {
        /* alguns navegadores bloqueiam autoplay: fica o poster, sem quebrar */
      });
    }
  }, []);

  return (
    <figure className={`relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={`${basePath}/${video.poster}`}
        muted
        loop
        playsInline
        preload="none"
        aria-label={video.legenda}
      >
        <source src={`${basePath}/${video.webm}`} type="video/webm" />
        <source src={`${basePath}/${video.mp4}`} type="video/mp4" />
      </video>
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-3 pt-10 text-[11px] leading-snug text-white/90">
        {video.legenda}
        {credito && (
          <span className="block text-white/60">
            Vídeo: {credito.autor} · {credito.licenca}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
