import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/*
 * Cartão de compartilhamento, na mesma linguagem do site: fundo tinta, faixa
 * âmbar do manual de marca e a manchete de função (não o slogan) — é o que
 * aparece quando alguém cola o link no WhatsApp ou no Instagram.
 *
 * Os hexadecimais estão escritos à mão de propósito: o Satori renderiza sem
 * CSS, então ele não enxerga as custom properties do globals.css.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#221B14",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 132, height: 10, backgroundColor: "#FEA813" }} />
          <div
            style={{
              marginTop: 28,
              fontSize: 21,
              lineHeight: 1.35,
              maxWidth: 900,
              color: "#FEC44A",
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {site.nomeCurto}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 76,
              fontWeight: 700,
              color: "#FFF8EC",
              lineHeight: 1.05,
              maxWidth: 960,
            }}
          >
            Edital aberto e certidão em um lugar só
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#D8C9B2", maxWidth: 900 }}>
            Fomento à cultura no Maranhão e em São Luís, com o passo a passo de cada certidão.
          </div>
          <div
            style={{
              marginTop: 22,
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 24,
              color: "#FEA813",
              fontStyle: "italic",
            }}
          >
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
