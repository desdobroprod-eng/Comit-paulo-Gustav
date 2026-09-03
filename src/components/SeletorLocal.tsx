"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useRef, useState } from "react";
import { camadaComTema } from "@/lib/mapa";
import { centroPadrao } from "@/content/radar";

/**
 * Escolha do ponto no mapa, dentro do formulário.
 *
 * O pino fica fixo no centro da moldura e quem se move é o mapa. Parece
 * detalhe, mas é o que faz isso funcionar no dedo (não tem como arrastar um
 * alfinete de 30px com o polegar em cima dele) e no teclado — o Leaflet já
 * move o mapa com as setas, então a pessoa que não usa mouse marca o ponto do
 * mesmo jeito. Arrastar o pino não daria nenhuma das duas coisas.
 */
export function SeletorLocal({
  valor,
  aoEscolher,
}: {
  valor: { lat: number; lng: number } | null;
  aoEscolher: (ponto: { lat: number; lng: number }) => void;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  const [carregando, setCarregando] = useState(false);
  const [erroLocal, setErroLocal] = useState("");
  const irPara = useRef<((lat: number, lng: number) => void) | null>(null);

  // `aoEscolher` costuma ser uma função nova a cada render; guardar em ref
  // evita remontar o mapa inteiro a cada tecla digitada no formulário. A
  // atribuição vai num efeito porque mexer em ref durante o render é proibido.
  const aoEscolherRef = useRef(aoEscolher);
  useEffect(() => {
    aoEscolherRef.current = aoEscolher;
  });

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    let mapa: import("leaflet").Map | null = null;
    let desligarTema: (() => void) | null = null;
    let vivo = true;

    (async () => {
      const L = await import("leaflet");
      if (!vivo || !el) return;

      mapa = L.map(el, { zoomControl: true, attributionControl: true }).setView(
        [valor?.lat ?? centroPadrao.lat, valor?.lng ?? centroPadrao.lng],
        valor ? 15 : centroPadrao.zoom,
      );
      desligarTema = camadaComTema(L, mapa);

      mapa.on("moveend", () => {
        if (!mapa) return;
        const c = mapa.getCenter();
        aoEscolherRef.current({ lat: c.lat, lng: c.lng });
      });

      irPara.current = (lat, lng) => mapa?.setView([lat, lng], 16);
    })();

    return () => {
      vivo = false;
      desligarTema?.();
      mapa?.remove();
    };
    // Só na montagem: o mapa é imperativo e se recria sozinho lá dentro.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function usarMinhaLocalizacao() {
    if (!navigator.geolocation) {
      setErroLocal("Seu navegador não oferece localização. Mova o mapa até o ponto na mão.");
      return;
    }
    setCarregando(true);
    setErroLocal("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCarregando(false);
        irPara.current?.(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        setCarregando(false);
        setErroLocal("Não deu pra pegar sua localização. Mova o mapa até o ponto na mão.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative isolate h-72 overflow-hidden rounded-sm border border-linha">
        <div ref={caixa} className="h-full w-full" aria-label="Mapa para escolher seu ponto" />
        {/* Pino do centro: enfeite puro, por isso fora do fluxo e sem eventos. */}
        <div
          aria-hidden
          className="pino-centro pointer-events-none absolute left-1/2 top-1/2 z-[500]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={usarMinhaLocalizacao}
          className="rounded-sm border border-linha px-4 py-2 text-sm font-medium text-tinta transition hover:bg-superficie-alt"
        >
          {carregando ? "Procurando…" : "Usar minha localização"}
        </button>
        <p className="text-sm text-tinta-suave">
          {valor
            ? `Ponto marcado em ${valor.lat.toFixed(4)}, ${valor.lng.toFixed(4)}.`
            : "Mova o mapa até o ponto — o pino marca o centro."}
        </p>
      </div>

      {erroLocal && <p className="text-sm text-terracota">{erroLocal}</p>}

      <p className="text-xs text-tinta-fraca">
        Marque onde você quer ser encontrado, não necessariamente onde você mora. A praça do
        bairro, o ponto de cultura, a sede do grupo — vale mais e expõe menos.
      </p>
    </div>
  );
}
