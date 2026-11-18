import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["*", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow: ["/api/", "/admin/", "/obrigado", "/obrigada"],
      },
    ],
    sitemap: "https://www.grupofreitasrenovacoes.pt/sitemap.xml",
    host: "https://www.grupofreitasrenovacoes.pt",
  };
}
