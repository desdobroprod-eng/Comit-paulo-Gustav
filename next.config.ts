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
};

export default nextConfig;
