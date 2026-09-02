import type { Metadata } from "next";
import { Fredoka, Work_Sans, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nomeCurto} — Editais e certidões da Lei Paulo Gustavo`,
    template: `%s | ${site.nomeCurto}`,
  },
  description: site.descricao,
  keywords: [
    "Lei Paulo Gustavo",
    "Comitê Paulo Gustavo Maranhão",
    "editais de cultura Maranhão",
    "editais São Luís",
    "certidão negativa cultura",
    "SECULT MA",
  ],
  openGraph: {
    title: site.nomeCurto,
    description: site.descricao,
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.nomeOficial,
  alternateName: site.nomeCurto,
  slogan: site.tagline,
  url: site.url,
  sameAs: [site.redes.instagramMA, site.redes.instagramNacional],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fredoka.variable} ${workSans.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
