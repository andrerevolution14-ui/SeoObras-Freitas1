import { MetadataRoute } from "next";
import { SERVICES, PARISHES } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.grupofreitasrenovacoes.pt";
  const baseUpdate = new Date("2026-10-15T00:00:00Z");

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: baseUpdate },
    { url: `${baseUrl}/servicos`, lastModified: new Date("2026-10-12T00:00:00Z") },
    { url: `${baseUrl}/areas-atuacao`, lastModified: new Date("2026-10-10T00:00:00Z") },
    { url: `${baseUrl}/orcamento`, lastModified: baseUpdate },
    { url: `${baseUrl}/credito-obras`, lastModified: new Date("2026-10-08T00:00:00Z") },
    { url: `${baseUrl}/precos-reais`, lastModified: baseUpdate },
    { url: `${baseUrl}/precos-m2`, lastModified: baseUpdate },
    { url: `${baseUrl}/planificador`, lastModified: new Date("2026-09-25T00:00:00Z") },
    { url: `${baseUrl}/verdemont`, lastModified: new Date("2026-09-20T00:00:00Z") },
    { url: `${baseUrl}/sobre`, lastModified: new Date("2026-10-01T00:00:00Z") },
    { url: `${baseUrl}/projetos`, lastModified: baseUpdate },
    { url: `${baseUrl}/blog`, lastModified: baseUpdate },
    { url: `${baseUrl}/privacidade`, lastModified: baseUpdate },
    { url: `${baseUrl}/termos`, lastModified: baseUpdate },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s, idx) => ({
    url: `${baseUrl}/servicos/${s.slug}`,
    lastModified: new Date(new Date("2026-10-01").getTime() + idx * 86400000),
  }));

  const parishPages: MetadataRoute.Sitemap = PARISHES.map((p, idx) => ({
    url: `${baseUrl}/areas-atuacao/${p.slug}`,
    lastModified: new Date(new Date("2026-09-15").getTime() + (idx % 10) * 86400000),
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(`${b.date}T10:00:00Z`),
  }));

  return [...staticPages, ...servicePages, ...parishPages, ...blogPages];
}
