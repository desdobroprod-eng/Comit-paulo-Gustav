import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Tipografia editorial: serifa de alto contraste nos títulos, sem serifa no
 * corpo — a mesma dupla do transparencia10. A Fredoka arredondada saiu: era
 * boa parte da cara de genérico que o Comitê rejeitou.
 */
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/**
 * Aplica o tema salvo antes da primeira pintura. Sem isso o site pisca no
 * tema errado ao carregar — o problema clássico de troca de tema em site
 * estático.
 */
const scriptTema = `(function(){try{var t=localStorage.getItem("tema");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nomeCurto} — Editais de fomento à cultura e certidões`,
    template: `%s | ${site.nomeCurto}`,
  },
  description: site.descricao,
  keywords: [
    "Lei Paulo Gustavo",
    "Comitê Maranhão do Movimento Nacional de Trabalhadoras e Trabalhadores da Cultura Paulo Gustavo",
    "editais de cultura Maranhão",
    "editais São Luís",
    "certidão negativa cultura",
    "SECULT MA",
    "radar cultural Maranhão",
  ],
  authors: [{ name: site.idealizadores.pessoa }, { name: site.idealizadores.agencia }],
  creator: `${site.idealizadores.pessoa} / ${site.idealizadores.agencia}`,
  publisher: site.nomeCurto,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.nomeCurto,
    description: site.descricao,
    locale: "pt_BR",
    type: "website",
    siteName: site.nomeCurto,
  },
  twitter: {
    card: "summary_large_image",
    title: site.nomeCurto,
    description: site.descricao,
  },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.nomeOficial,
    alternateName: site.nomeCurto,
    slogan: site.tagline,
    url: site.url,
    sameAs: [site.redes.instagramMA, site.redes.instagramNacional],
    description: site.descricao,
    creator: [
      { "@type": "Person", name: site.idealizadores.pessoa },
      { "@type": "Organization", name: site.idealizadores.agencia, url: site.idealizadores.url || undefined },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.nomeCurto,
    url: site.url,
    inLanguage: "pt-BR",
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
