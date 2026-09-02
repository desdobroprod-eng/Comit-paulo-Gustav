import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FFF8EC",
        }}
      >
        <div
          style={{
            fontSize: 22,
            lineHeight: 1.3,
            maxWidth: 780,
            color: "#A8620A",
            fontWeight: 600,
          }}
        >
          {site.nomeCurto}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 700,
            color: "#221B14",
            lineHeight: 1.1,
          }}
        >
          {site.tagline}
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#5C4F3F", maxWidth: 900 }}>
          Editais de fomento à cultura e certidões negativas no Maranhão
        </div>
        <div
          style={{
            marginTop: 48,
            width: 120,
            height: 12,
            borderRadius: 6,
            backgroundColor: "#FEA813",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
