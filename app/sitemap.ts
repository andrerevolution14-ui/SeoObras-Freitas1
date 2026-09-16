import { MetadataRoute } from "next";
import { SERVICES, PARISHES } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.grupofreitasrenovacoes.pt";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/servicos`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/areas-atuacao`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/orcamento`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${baseUrl}/credito-obras`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/precos-reais`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/precos-m2`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/planificador`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/verdemont`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projetos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${baseUrl}/servicos/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const parishPages: MetadataRoute.Sitemap = PARISHES.map((p) => ({
    url: `${baseUrl}/areas-atuacao/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...parishPages, ...blogPages];
}
