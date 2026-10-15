import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.grupofreitasrenovacoes.pt/sitemap.xml",
    host: "https://www.grupofreitasrenovacoes.pt",
  };
}
