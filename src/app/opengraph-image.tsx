import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
            fontSize: 28,
            letterSpacing: 2,
            textTransform: "uppercase",
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
          Editais abertos e certidões da Lei Paulo Gustavo no Maranhão
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
