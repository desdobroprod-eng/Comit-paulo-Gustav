"use client";

import { useEffect, useRef, useState } from "react";
import { SeletorLocal } from "./SeletorLocal";
import { linguagens, rotuloTipo, type TipoPerfil } from "@/content/radar";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

interface Cadastro {
  tipo: TipoPerfil;
  nome: string;
  atuaDesde: string;
  linguagens: string[];
  sobre: string;
  fotoBase64: string;
  municipio: string;
  bairro: string;
  ponto: { lat: number; lng: number } | null;
  whatsapp: string;
  instagram: string;
  siteLink: string;
  email: string;
  consentimento: boolean;
  /** Campo-armadilha: fica invisível, então só robô preenche. */
  apelido: string;
}

const VAZIO: Cadastro = {
  tipo: "pessoa",
  nome: "",
  atuaDesde: "",
  linguagens: [],
  sobre: "",
  fotoBase64: "",
  municipio: "",
  bairro: "",
  ponto: null,
  whatsapp: "",
  instagram: "",
  siteLink: "",
  email: "",
  consentimento: false,
  apelido: "",
};

const ETAPAS = ["Quem é você", "O que você faz", "Onde te achar", "Como te chamar"];
const LIMITE_SOBRE = 280;

/** Reduz a foto no próprio navegador antes de subir: 512px, JPEG. */
async function prepararFoto(arquivo: File): Promise<string> {
  const bitmap = await createImageBitmap(arquivo);
  const lado = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("sem canvas");
  // Recorta o quadrado central — o pino é redondo, então é o centro que importa.
  ctx.drawImage(
    bitmap,
    (bitmap.width - lado) / 2,
    (bitmap.height - lado) / 2,
    lado,
    lado,
    0,
    0,
    512,
    512,
  );
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.82);
}

export function RadarForm() {
  const [etapa, setEtapa] = useState(0);
  const [dados, setDados] = useState<Cadastro>(VAZIO);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");
  // Marcado depois da montagem: ler o relógio durante o render é impuro (o
  // valor mudaria a cada re-render). Serve pra armadilha de tempo — robô
  // preenche formulário em menos de um segundo, gente não.
  const abertoEm = useRef(0);
  useEffect(() => {
    abertoEm.current = Date.now();
  }, []);
  const topo = useRef<HTMLDivElement>(null);

  const endpoint = site.radarEndpoint;

  function definir<C extends keyof Cadastro>(campo: C, valor: Cadastro[C]) {
    setDados((d) => ({ ...d, [campo]: valor }));
    setErros((e) => (e[campo] ? { ...e, [campo]: "" } : e));
  }

  function validar(qual: number): boolean {
    const e: Record<string, string> = {};
    if (qual === 0) {
      if (dados.nome.trim().length < 2) e.nome = "Escreva o nome como você quer aparecer no mapa.";
      if (dados.atuaDesde) {
        const ano = Number(dados.atuaDesde);
        const agora = new Date().getFullYear();
        if (!Number.isInteger(ano) || ano < 1900 || ano > agora)
          e.atuaDesde = `Ano entre 1900 e ${agora}, ou deixe em branco.`;
      }
    }
    if (qual === 1) {
      if (dados.linguagens.length === 0) e.linguagens = "Escolha pelo menos uma linguagem.";
      if (dados.sobre.trim().length < 20)
        e.sobre = "Conte pelo menos umas linhas sobre o seu trabalho.";
      if (dados.sobre.length > LIMITE_SOBRE) e.sobre = `No máximo ${LIMITE_SOBRE} caracteres.`;
    }
    if (qual === 2) {
      if (dados.municipio.trim().length < 2) e.municipio = "Diga o município.";
      if (!dados.ponto) e.ponto = "Mova o mapa até o ponto onde você quer ser encontrado.";
    }
    if (qual === 3) {
      const digitos = dados.whatsapp.replace(/\D/g, "");
      if (digitos && (digitos.length < 10 || digitos.length > 13))
        e.whatsapp = "WhatsApp com DDD, ex.: (98) 99123-4567.";
      if (!digitos && !dados.instagram.trim())
        e.whatsapp = "Deixe pelo menos um contato: WhatsApp ou Instagram.";
      if (dados.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(dados.email))
        e.email = "E-mail parece incompleto.";
      if (!dados.consentimento)
        e.consentimento = "Precisamos da sua autorização pra publicar seu perfil.";
    }
    setErros(e);
    return Object.keys(e).length === 0;
  }

  function avancar() {
    if (!validar(etapa)) return;
    setEtapa((n) => n + 1);
    topo.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function voltar() {
    setEtapa((n) => Math.max(0, n - 1));
    topo.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function enviar() {
    if (!validar(3)) return;
    if (!endpoint) {
      setErroEnvio("sem-endpoint");
      return;
    }
    setEnviando(true);
    setErroEnvio("");
    try {
      const resposta = await fetch(endpoint, {
        method: "POST",
        // text/plain de propósito: com application/json o navegador manda um
        // OPTIONS de preflight, e o Apps Script não responde OPTIONS.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...dados,
          whatsapp: dados.whatsapp.replace(/\D/g, ""),
          linguagens: dados.linguagens,
          lat: dados.ponto?.lat,
          lng: dados.ponto?.lng,
          segundosPreenchendo: abertoEm.current
            ? Math.round((Date.now() - abertoEm.current) / 1000)
            : 0,
        }),
      });
      const corpo = (await resposta.json()) as { ok?: boolean; erro?: string };
      if (!resposta.ok || !corpo.ok) throw new Error(corpo.erro || "falha");
      setEnviado(true);
      trackEvent("cadastro_radar", { tipo: dados.tipo, municipio: dados.municipio });
    } catch {
      setErroEnvio("falha");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="rounded-sm border border-ambar-fundo bg-superficie-alt p-8 text-center">
        <p className="font-display text-2xl font-semibold text-tinta">Pronto, você está no mapa.</p>
        <p className="mx-auto mt-3 max-w-md text-tinta-suave">
          Seu pino já aparece pra quem abrir o Radar. Pra mudar alguma coisa ou sair do mapa,
          é só chamar o Comitê no WhatsApp ou no Instagram.
        </p>
        <a
          href="#mapa-radar"
          className="mt-6 inline-block rounded-sm bg-fixed-ambar px-6 py-3 font-semibold text-fixed-tinta transition hover:-translate-y-0.5 hover:shadow-md"
        >
          Ver o mapa
        </a>
      </div>
    );
  }

  const rotuloErro = (campo: string) =>
    erros[campo] ? (
      <p id={`erro-${campo}`} className="mt-1 text-sm text-terracota">
        {erros[campo]}
      </p>
    ) : null;

  const classeCampo =
    "w-full rounded-sm border border-linha bg-superficie px-4 py-3 text-tinta outline-none transition focus:border-ambar-fundo focus:ring-2 focus:ring-ambar/40";

  return (
    <div ref={topo} className="scroll-mt-28 rounded-sm border border-linha bg-superficie p-6 sm:p-8">
      {/* Onde a pessoa está no caminho */}
      <ol className="mb-7 flex flex-wrap gap-x-2 gap-y-1 text-xs">
        {ETAPAS.map((nome, i) => (
          <li
            key={nome}
            aria-current={i === etapa ? "step" : undefined}
            className={
              i === etapa
                ? "rounded-full bg-ambar px-3 py-1 font-semibold text-fixed-tinta"
                : i < etapa
                  ? "rounded-full px-3 py-1 text-ambar-fundo"
                  : "rounded-full px-3 py-1 text-tinta-fraca"
            }
          >
            {i + 1}. {nome}
          </li>
        ))}
      </ol>

      {etapa === 0 && (
        <fieldset className="flex flex-col gap-5">
          <legend className="mb-1 font-display text-xl font-semibold text-tinta">Quem é você</legend>

          <div>
            <span className="mb-2 block text-sm font-medium text-tinta">Você se cadastra como</span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(rotuloTipo) as TipoPerfil[]).map((t) => (
                <label
                  key={t}
                  className={`cursor-pointer rounded-sm border px-4 py-2 text-sm transition ${
                    dados.tipo === t
                      ? "border-ambar-fundo bg-ambar font-semibold text-fixed-tinta"
                      : "border-linha text-tinta-suave hover:bg-superficie-alt"
                  }`}
                >
                  <input
                    type="radio"
                    name="tipo"
                    className="sr-only"
                    checked={dados.tipo === t}
                    onChange={() => definir("tipo", t)}
                  />
                  {rotuloTipo[t]}
                </label>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-tinta">
              Nome que aparece no mapa
            </span>
            <input
              className={classeCampo}
              value={dados.nome}
              onChange={(ev) => definir("nome", ev.target.value)}
              aria-invalid={!!erros.nome}
              aria-describedby={erros.nome ? "erro-nome" : undefined}
              placeholder="Ex.: Boi de Maracanã, Dona Tereza, Coletivo Casarão"
            />
            {rotuloErro("nome")}
          </label>

          <label className="block sm:w-56">
            <span className="mb-1 block text-sm font-medium text-tinta">
              Atua desde <span className="font-normal text-tinta-fraca">(opcional)</span>
            </span>
            <input
              className={classeCampo}
              inputMode="numeric"
              value={dados.atuaDesde}
              onChange={(ev) => definir("atuaDesde", ev.target.value)}
              aria-invalid={!!erros.atuaDesde}
              aria-describedby={erros.atuaDesde ? "erro-atuaDesde" : undefined}
              placeholder="1998"
            />
            {rotuloErro("atuaDesde")}
          </label>
        </fieldset>
      )}

      {etapa === 1 && (
        <fieldset className="flex flex-col gap-5">
          <legend className="mb-1 font-display text-xl font-semibold text-tinta">O que você faz</legend>

          <div>
            <span className="mb-2 block text-sm font-medium text-tinta">
              Linguagens (pode marcar mais de uma)
            </span>
            <div className="flex flex-wrap gap-2">
              {linguagens.map((l) => {
                const marcada = dados.linguagens.includes(l.nome);
                return (
                  <label
                    key={l.id}
                    className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition ${
                      marcada
                        ? "border-ambar-fundo bg-ambar font-semibold text-fixed-tinta"
                        : "border-linha text-tinta-suave hover:bg-superficie-alt"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={marcada}
                      onChange={() =>
                        definir(
                          "linguagens",
                          marcada
                            ? dados.linguagens.filter((n) => n !== l.nome)
                            : [...dados.linguagens, l.nome],
                        )
                      }
                    />
                    {l.nome}
                  </label>
                );
              })}
            </div>
            {rotuloErro("linguagens")}
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-tinta">
              Seu trabalho em poucas linhas
            </span>
            <textarea
              className={`${classeCampo} min-h-32`}
              value={dados.sobre}
              maxLength={LIMITE_SOBRE}
              onChange={(ev) => definir("sobre", ev.target.value)}
              aria-invalid={!!erros.sobre}
              aria-describedby={erros.sobre ? "erro-sobre" : undefined}
              placeholder="O que você faz, há quanto tempo, com quem, onde costuma se apresentar."
            />
            <span className="mt-1 block text-right text-xs text-tinta-fraca">
              {dados.sobre.length}/{LIMITE_SOBRE}
            </span>
            {rotuloErro("sobre")}
          </label>

          <div className="block">
            <span className="mb-1 block text-sm font-medium text-tinta">
              Foto do pino <span className="font-normal text-tinta-fraca">(opcional)</span>
            </span>
            {/*
              O botão nativo de arquivo escreve "Choose File" no idioma do
              navegador, não no do site. Escondemos o input e usamos rótulo
              nosso — em português, e com a cara do resto do formulário.
            */}
            <label className="inline-flex cursor-pointer items-center gap-3 rounded-sm bg-ambar px-4 py-2 text-sm font-semibold text-fixed-tinta transition hover:-translate-y-0.5 hover:shadow-md">
              {dados.fotoBase64 ? "Trocar foto" : "Escolher foto"}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                  onChange={async (ev) => {
                  const arquivo = ev.target.files?.[0];
                  if (!arquivo) return;
                  try {
                    definir("fotoBase64", await prepararFoto(arquivo));
                  } catch {
                    setErros((e) => ({ ...e, fotoBase64: "Não consegui ler essa imagem." }));
                  }
                }}
              />
            </label>
            {rotuloErro("fotoBase64")}
            {dados.fotoBase64 && (
              <span className="mt-3 flex items-center gap-3 text-sm text-tinta-suave">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dados.fotoBase64}
                  alt="Prévia da sua foto no pino"
                  className="h-16 w-16 rounded-full border-2 border-ambar object-cover"
                />
                É assim que seu pino aparece no mapa.
              </span>
            )}
          </div>
        </fieldset>
      )}

      {etapa === 2 && (
        <fieldset className="flex flex-col gap-5">
          <legend className="mb-1 font-display text-xl font-semibold text-tinta">Onde te achar</legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-tinta">Município</span>
              <input
                className={classeCampo}
                value={dados.municipio}
                onChange={(ev) => definir("municipio", ev.target.value)}
                aria-invalid={!!erros.municipio}
                aria-describedby={erros.municipio ? "erro-municipio" : undefined}
                placeholder="São Luís"
              />
              {rotuloErro("municipio")}
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-tinta">
                Bairro <span className="font-normal text-tinta-fraca">(opcional)</span>
              </span>
              <input
                className={classeCampo}
                value={dados.bairro}
                onChange={(ev) => definir("bairro", ev.target.value)}
                placeholder="Madre Deus"
              />
            </label>
          </div>

          <SeletorLocal valor={dados.ponto} aoEscolher={(p) => definir("ponto", p)} />
          {rotuloErro("ponto")}
        </fieldset>
      )}

      {etapa === 3 && (
        <fieldset className="flex flex-col gap-5">
          <legend className="mb-1 font-display text-xl font-semibold text-tinta">
            Como te chamar
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-tinta">WhatsApp</span>
              <input
                className={classeCampo}
                inputMode="tel"
                value={dados.whatsapp}
                onChange={(ev) => definir("whatsapp", ev.target.value)}
                aria-invalid={!!erros.whatsapp}
                aria-describedby={erros.whatsapp ? "erro-whatsapp" : undefined}
                placeholder="(98) 99123-4567"
              />
              {rotuloErro("whatsapp")}
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-tinta">Instagram</span>
              <input
                className={classeCampo}
                value={dados.instagram}
                onChange={(ev) => definir("instagram", ev.target.value)}
                placeholder="@seuperfil"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-tinta">
                Site ou outro link <span className="font-normal text-tinta-fraca">(opcional)</span>
              </span>
              <input
                className={classeCampo}
                value={dados.siteLink}
                onChange={(ev) => definir("siteLink", ev.target.value)}
                placeholder="youtube.com/seucanal"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-tinta">
                E-mail <span className="font-normal text-tinta-fraca">(não vai pro site)</span>
              </span>
              <input
                className={classeCampo}
                inputMode="email"
                value={dados.email}
                onChange={(ev) => definir("email", ev.target.value)}
                aria-invalid={!!erros.email}
                aria-describedby={erros.email ? "erro-email" : undefined}
                placeholder="voce@email.com"
              />
              {rotuloErro("email")}
            </label>
          </div>

          {/* Armadilha de robô: fora da tela, sem foco, e o script recusa quem preencher. */}
          <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label>
              Apelido
              <input
                tabIndex={-1}
                autoComplete="off"
                value={dados.apelido}
                onChange={(ev) => definir("apelido", ev.target.value)}
              />
            </label>
          </div>

          <label className="flex cursor-pointer gap-3 rounded-sm border border-linha bg-superficie-alt p-4">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 accent-[#a8620a]"
              checked={dados.consentimento}
              onChange={(ev) => definir("consentimento", ev.target.checked)}
              aria-invalid={!!erros.consentimento}
              aria-describedby={erros.consentimento ? "erro-consentimento" : undefined}
            />
            <span className="text-sm text-tinta-suave">
              Autorizo o Comitê a publicar <strong className="text-tinta">no site</strong> meu nome,
              foto, município, apresentação e os contatos que preenchi acima. Entendo que ficam{" "}
              <strong className="text-tinta">visíveis pra qualquer pessoa</strong> e podem aparecer
              em buscas, e que posso pedir a remoção a qualquer momento pelo WhatsApp ou Instagram
              do Comitê. Meu e-mail não é publicado.
            </span>
          </label>
          {rotuloErro("consentimento")}

          {erroEnvio === "falha" && (
            <p className="rounded-sm border border-terracota bg-superficie-alt p-4 text-sm text-tinta">
              Não consegui salvar seu cadastro agora. Tente de novo em alguns minutos — se
              continuar, chame o Comitê no WhatsApp que a gente cadastra na mão.
            </p>
          )}
          {erroEnvio === "sem-endpoint" && (
            <p className="rounded-sm border border-ambar-fundo bg-superficie-alt p-4 text-sm text-tinta">
              O cadastro pelo site ainda está sendo ligado. Enquanto isso, dá pra se cadastrar
              pelo formulário antigo:{" "}
              <a
                href={site.radarFormularioAntigo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-turquesa underline"
              >
                abrir formulário
              </a>
              .
            </p>
          )}
        </fieldset>
      )}

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-linha pt-5">
        <button
          type="button"
          onClick={voltar}
          disabled={etapa === 0}
          className="rounded-sm px-4 py-2.5 font-medium text-tinta-suave transition hover:text-tinta disabled:invisible"
        >
          ← Voltar
        </button>
        {etapa < ETAPAS.length - 1 ? (
          <button
            type="button"
            onClick={avancar}
            className="rounded-sm bg-fixed-ambar px-6 py-3 font-semibold text-fixed-tinta transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Continuar →
          </button>
        ) : (
          <button
            type="button"
            onClick={enviar}
            disabled={enviando}
            className="rounded-sm bg-fixed-ambar px-6 py-3 font-semibold text-fixed-tinta transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60"
          >
            {enviando ? "Enviando…" : "Entrar no mapa"}
          </button>
        )}
      </div>
    </div>
  );
}
