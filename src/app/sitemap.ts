import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ["", "/editais", "/certidoes", "/radar-cultural", "/sobre", "/participe"];

  return paginas.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/editais" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
