import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MapaRadar } from "@/components/MapaRadar";
import { PageHero } from "@/components/PageHero";
import { RadarForm } from "@/components/RadarForm";
import { Reveal } from "@/components/Reveal";
import { perfis } from "@/content/radar";

export const metadata: Metadata = {
  title: "Radar Cultural MA — mapa de quem faz cultura no Maranhão",
  description:
    "Mapa dos fazedores e fazedoras de cultura do Maranhão: veja quem faz cultura perto de você, fale direto no WhatsApp e cadastre seu próprio perfil para ser encontrado e receber aviso de edital.",
};

export default function RadarCulturalPage() {
  return (
    <>
      <PageHero
        eyebrow="Radar Cultural MA"
        title="Entre no radar de quem faz cultura no Maranhão"
        description="Cadastre seu perfil e o Comitê passa a te indicar pra produtores e curadores, te avisar quando abrir edital da sua área e da sua cidade, e usar o seu cadastro — junto com o de tanta outra gente — como número na hora de cobrar política pública pra cultura no Estado."
        foto="cacuria-1.jpg"
      />
      <Container className="flex flex-col gap-12 py-14">
        <Reveal className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-sm border border-linha bg-superficie p-5 transition hover:-translate-y-1 hover:shadow-md">
            <p className="font-display font-semibold text-tinta">Seja encontrado</p>
            <p className="mt-1 text-sm text-tinta-suave">
              Seu pino fica no mapa com foto, o que você faz e um botão que abre conversa direto no
              seu WhatsApp.
            </p>
          </div>
          <div className="rounded-sm border border-linha bg-superficie p-5 transition hover:-translate-y-1 hover:shadow-md">
            <p className="font-display font-semibold text-tinta">Ache quem faz junto</p>
            <p className="mt-1 text-sm text-tinta-suave">
              Procure por linguagem e por município: quem toca, quem filma, quem produz, quem tem
              espaço — perto de você.
            </p>
          </div>
          <div className="rounded-sm border border-linha bg-superficie p-5 transition hover:-translate-y-1 hover:shadow-md">
            <p className="font-display font-semibold text-tinta">Fortaleça a categoria</p>
            <p className="mt-1 text-sm text-tinta-suave">
              Quanto mais gente no mapa, mais peso tem o Comitê na hora de cobrar o poder público
              com números da cena cultural do MA, não só com discurso.
            </p>
          </div>
        </Reveal>

        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="rotulo text-ambar-fundo">O mapa</span>
            <h2 className="text-3xl font-semibold text-tinta">Quem faz cultura no Maranhão</h2>
            <p className="max-w-2xl text-tinta-suave">
              Cada pino é uma pessoa, um coletivo ou uma organização que se cadastrou. Toque na
              foto pra ver o que ela faz e falar direto com ela.
            </p>
          </div>
          <MapaRadar perfisIniciais={perfis} />
        </section>

        <section id="cadastro" className="flex flex-col gap-5 scroll-mt-24">
          <div className="flex flex-col gap-2">
            <span className="rotulo text-ambar-fundo">Seu perfil</span>
            <h2 className="text-3xl font-semibold text-tinta">Bota seu pino no mapa</h2>
            <p className="max-w-2xl text-tinta-suave">
              Leva uns três minutos. Seu perfil entra no mapa assim que você enviar.
            </p>
          </div>
          <RadarForm />
        </section>

        <p className="max-w-2xl text-xs text-tinta-fraca">
          O cadastro fica com o Comitê e serve pro que está descrito aqui: te colocar no mapa, te
          indicar pra oportunidades e te avisar de edital. Nome, foto, município, apresentação e os
          contatos que você preencher ficam públicos no site; seu e-mail, não. Quer sair do mapa ou
          corrigir alguma coisa? É só chamar o Comitê no{" "}
          <Link href="/participe" className="underline">
            WhatsApp ou Instagram
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
