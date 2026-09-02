import { NextRequest, NextResponse } from "next/server";
import { redirectTargets } from "@/lib/redirects";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const target = redirectTargets[slug];

  if (!target) {
    return NextResponse.redirect(new URL("/participe", request.url));
  }

  // Ponto de instrumentação: registrar o clique aqui quando a ferramenta de
  // analytics do Comitê (GA4/Plausible) estiver conectada, antes do redirect.
  return NextResponse.redirect(target.destino);
}
