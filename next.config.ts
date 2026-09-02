import type { NextConfig } from "next";

// GitHub Pages serve o repositório em /<repo>/, não na raiz do domínio — a
// menos que um domínio próprio seja apontado via public/CNAME, e nesse caso
// basePath deve virar "". Ver README "Deploy — GitHub Pages".
const basePath = "/Comit-paulo-Gustav";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  // next/image não prefixa sozinho o src de <img> não otimizado com o
  // basePath no export estático — expõe pra código de app conseguir montar
  // o caminho certo à mão (ver src/lib/site.ts basePath).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
