"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "./Modal";
import { TrackedLink } from "./TrackedLink";
import {
  centroPadrao,
  corDaLinguagem,
  linkWhatsapp,
  linguagens,
  municipiosDosPerfis,
  rotuloTipo,
  urlDaFoto,
  type PerfilRadar,
} from "@/content/radar";
import { camadaComTema } from "@/lib/mapa";
import { site } from "@/lib/site";

/** Primeiras letras, pro pino de quem não mandou foto. */
function iniciais(nome: string): string {
  return nome
    .split(/\s+/)
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function htmlDoPino(perfil: PerfilRadar): string {
  const cor = corDaLinguagem(perfil.linguagens[0]);
  const miolo = perfil.foto
    ? `<img src="${urlDaFoto(perfil.foto)}" alt="" loading="lazy" />`
    : `<span>${iniciais(perfil.nome)}</span>`;
  return `<div class="pino-radar" style="--pino-cor:${cor}">${miolo}</div>`;
}

export function MapaRadar({ perfisIniciais }: { perfisIniciais: PerfilRadar[] }) {
  const caixa = useRef<HTMLDivElement>(null);
  const mapaRef = useRef<import("leaflet").Map | null>(null);
  const camadaPinos = useRef<import("leaflet").LayerGroup | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);

  const [perfis, setPerfis] = useState(perfisIniciais);
  const [linguagem, setLinguagem] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [selecionado, setSelecionado] = useState<PerfilRadar | null>(null);
  /*
   * O mapa nasce dentro de uma função async (o Leaflet é carregado sob
   * demanda), então na primeira passada ele ainda não existe. Sem este aviso,
   * o efeito que desenha os pinos rodava com o mapa nulo, desistia, e como a
   * lista filtrada não mudava depois, não desenhava nunca mais.
   */
  const [mapaPronto, setMapaPronto] = useState(false);

  /*
   * Os perfis assados no build pintam na hora e são o que o Google indexa.
   * Este fetch só acrescenta quem se cadastrou depois do último build — é o
   * que faz o pino aparecer "na hora", como o Comitê pediu. Se falhar (Google
   * fora do ar, rede da pessoa bloqueando), falha calado: o mapa continua com
   * o que veio assado.
   */
  useEffect(() => {
    if (!site.radarEndpoint) return;
    const corta = new AbortController();
    (async () => {
      try {
        const r = await fetch(site.radarEndpoint, { signal: corta.signal });
        const novos = (await r.json()) as PerfilRadar[];
        if (!Array.isArray(novos)) return;
        setPerfis((atuais) => {
          const conhecidos = new Set(atuais.map((p) => p.id));
          const extras = novos.filter((p) => p && p.id && !conhecidos.has(p.id) && p.lat && p.lng);
          return extras.length ? [...atuais, ...extras] : atuais;
        });
      } catch {
        // silêncio proposital — ver comentário acima
      }
    })();
    return () => corta.abort();
  }, []);

  const visiveis = useMemo(
    () =>
      perfis.filter(
        (p) =>
          (!linguagem || p.linguagens.includes(linguagem)) &&
          (!municipio || p.municipio === municipio),
      ),
    [perfis, linguagem, municipio],
  );

  // Monta o mapa uma vez.
  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    let vivo = true;
    let desligarTema: (() => void) | null = null;

    (async () => {
      const L = await import("leaflet");
      if (!vivo || !el) return;
      leafletRef.current = L;
      const mapa = L.map(el, { scrollWheelZoom: false }).setView(
        [centroPadrao.lat, centroPadrao.lng],
        centroPadrao.zoom,
      );
      desligarTema = camadaComTema(L, mapa);
      camadaPinos.current = L.layerGroup().addTo(mapa);
      mapaRef.current = mapa;
      // força o redesenho: o mapa nasce dentro de um bloco que pode ter mudado
      // de tamanho enquanto o Leaflet carregava
      setTimeout(() => mapa.invalidateSize(), 100);
      setMapaPronto(true);
    })();

    return () => {
      vivo = false;
      desligarTema?.();
      mapaRef.current?.remove();
      mapaRef.current = null;
      setMapaPronto(false);
    };
  }, []);

  // Redesenha os pinos quando a lista filtrada muda.
  useEffect(() => {
    const L = leafletRef.current;
    const mapa = mapaRef.current;
    const camada = camadaPinos.current;
    if (!L || !mapa || !camada) return;

    camada.clearLayers();
    for (const perfil of visiveis) {
      L.marker([perfil.lat, perfil.lng], {
        title: perfil.nome,
        alt: `${perfil.nome} — ${perfil.municipio}`,
        icon: L.divIcon({
          html: htmlDoPino(perfil),
          className: "",
          iconSize: [48, 48],
          iconAnchor: [24, 48],
        }),
      })
        .on("click", () => setSelecionado(perfil))
        .addTo(camada);
    }

    if (visiveis.length > 0) {
      mapa.fitBounds(
        L.latLngBounds(visiveis.map((p) => [p.lat, p.lng] as [number, number])).pad(0.25),
        { maxZoom: 14 },
      );
    }
  }, [visiveis, mapaPronto]);

  const municipios = municipiosDosPerfis(perfis);
  const classeFiltro =
    "rounded-sm border border-linha bg-superficie px-3 py-2 text-sm text-tinta outline-none focus:border-ambar-fundo";

  return (
    <div id="mapa-radar" className="flex flex-col gap-4 scroll-mt-24">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-tinta-suave">
          Linguagem
          <select
            className={classeFiltro}
            value={linguagem}
            onChange={(e) => setLinguagem(e.target.value)}
          >
            <option value="">Todas</option>
            {linguagens.map((l) => (
              <option key={l.id} value={l.nome}>
                {l.nome}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-tinta-suave">
          Município
          <select
            className={classeFiltro}
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
          >
            <option value="">Todos</option>
            {municipios.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <span className="text-sm text-tinta-fraca">
          {visiveis.length === perfis.length
            ? `${perfis.length} no mapa`
            : `${visiveis.length} de ${perfis.length}`}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div
          ref={caixa}
          /* Sem ninguém no mapa ainda, 34rem de vazio parecem defeito — o mapa
             entra baixinho e cresce quando tiver pino pra mostrar. */
          className={`isolate w-full overflow-hidden rounded-sm border border-linha ${
            perfis.length === 0 ? "h-56" : "h-[26rem] lg:h-[34rem]"
          }`}
          aria-label="Mapa dos fazedores e fazedoras de cultura cadastrados"
        />

        {/*
          A mesma lista do mapa, em texto. Não é redundância: mapa sozinho não
          se navega por teclado nem por leitor de tela, e é esta lista que sai
          no HTML pro Google e pras buscas por IA acharem quem faz cultura no MA.
        */}
        <ul
          className={`flex flex-col gap-2 overflow-y-auto ${
            perfis.length === 0 ? "" : "max-h-[26rem] lg:max-h-[34rem]"
          }`}
        >
          {visiveis.length === 0 && (
            <li className="rounded-sm border border-dashed border-linha p-6 text-sm text-tinta-suave">
              {perfis.length === 0
                ? "Ninguém no mapa ainda. O primeiro pino pode ser o seu — o cadastro está logo abaixo."
                : "Nenhum perfil com esses filtros."}
            </li>
          )}
          {visiveis.map((perfil) => (
            <li key={perfil.id}>
              <button
                type="button"
                onClick={() => {
                  setSelecionado(perfil);
                  mapaRef.current?.setView([perfil.lat, perfil.lng], 15);
                }}
                className="flex w-full items-center gap-3 rounded-sm border border-linha bg-superficie p-3 text-left transition hover:border-ambar-fundo hover:bg-superficie-alt"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 text-xs font-bold text-tinta"
                  style={{ borderColor: corDaLinguagem(perfil.linguagens[0]) }}
                >
                  {perfil.foto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlDaFoto(perfil.foto)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    iniciais(perfil.nome)
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-tinta">{perfil.nome}</span>
                  <span className="block truncate text-xs text-tinta-suave">
                    {rotuloTipo[perfil.tipo]} · {perfil.linguagens[0]} · {perfil.municipio}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-tinta-fraca">
        Cada pino foi marcado pela própria pessoa ou grupo, que autorizou a publicação. Pra sair do
        mapa ou corrigir algo, chame o Comitê no WhatsApp ou no Instagram.
      </p>

      <Modal
        aberto={!!selecionado}
        aoFechar={() => setSelecionado(null)}
        titulo={selecionado?.nome ?? ""}
      >
        {selecionado && (
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-4">
              <span
                className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 font-display text-xl font-bold text-tinta"
                style={{ borderColor: corDaLinguagem(selecionado.linguagens[0]) }}
              >
                {selecionado.foto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={urlDaFoto(selecionado.foto)}
                    alt={`Foto de ${selecionado.nome}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  iniciais(selecionado.nome)
                )}
              </span>
              <div>
                <p className="font-semibold text-tinta">{rotuloTipo[selecionado.tipo]}</p>
                <p className="text-tinta-suave">
                  {selecionado.bairro ? `${selecionado.bairro}, ` : ""}
                  {selecionado.municipio}
                </p>
                {selecionado.atuaDesde && (
                  <p className="text-tinta-fraca">Atua desde {selecionado.atuaDesde}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {selecionado.linguagens.map((l) => (
                <span
                  key={l}
                  className="rounded-full bg-superficie-alt px-2.5 py-1 text-xs text-tinta-suave"
                >
                  {l}
                </span>
              ))}
            </div>

            <p className="text-tinta-suave">{selecionado.sobre}</p>

            <div className="flex flex-wrap gap-2 border-t border-linha pt-4">
              {selecionado.whatsapp && (
                <TrackedLink
                  href={linkWhatsapp(selecionado.whatsapp, selecionado.nome)}
                  eventName="clique_whatsapp_radar"
                  eventParams={{ perfil_id: selecionado.id }}
                  className="rounded-sm bg-fixed-ambar px-5 py-2.5 font-semibold text-fixed-tinta transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Falar no WhatsApp ↗
                </TrackedLink>
              )}
              {selecionado.instagram && (
                <TrackedLink
                  href={`https://instagram.com/${selecionado.instagram.replace(/^@/, "")}`}
                  eventName="clique_instagram_radar"
                  eventParams={{ perfil_id: selecionado.id }}
                  className="rounded-sm border border-linha px-5 py-2.5 font-medium text-tinta transition hover:bg-superficie-alt"
                >
                  Instagram ↗
                </TrackedLink>
              )}
              {selecionado.site && (
                <TrackedLink
                  href={selecionado.site.startsWith("http") ? selecionado.site : `https://${selecionado.site}`}
                  eventName="clique_site_radar"
                  eventParams={{ perfil_id: selecionado.id }}
                  className="rounded-sm border border-linha px-5 py-2.5 font-medium text-tinta transition hover:bg-superficie-alt"
                >
                  Site ↗
                </TrackedLink>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
