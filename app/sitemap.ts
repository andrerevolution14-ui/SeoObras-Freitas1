import { MetadataRoute } from "next";
import { SERVICES, PARISHES } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.grupofreitasrenovacoes.pt";
  const baseUpdate = new Date("2026-11-07T00:00:00Z");
  const img = (...paths: string[]) => paths.map((p) => `${baseUrl}${p}`);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: baseUpdate,
      images: img(
        "/og-image.jpg",
        "/brand/obra/fase-0.webp",
        "/brand/obra/fase-3.webp",
        "/brand/obra/fase-7.webp",
        "/brand/antes-depois/bathroom-antes.webp",
        "/brand/antes-depois/bathroom-depois.webp",
        "/brand/antes-depois/kitchen-antes.webp",
        "/brand/antes-depois/kitchen-depois.webp",
        "/brand/equipa-em-obra.webp",
        "/brand/casa-renovada.webp",
        "/brand/casa-de-banho-noite.webp"
      ),
    },
    { url: `${baseUrl}/clientes`, lastModified: baseUpdate , images: img("/og/clientes.jpg", "/clientes/wc-madeira-espelho-led.jpg", "/clientes/wc-marmore-espelho-led.jpg", "/clientes/cozinha-cinza-janela.jpg", "/clientes/wc-suite-claraboia-branco.jpg") },
    { url: `${baseUrl}/servicos`, lastModified: new Date("2026-10-12T00:00:00Z") , images: img("/og/servicos.jpg") },
    { url: `${baseUrl}/areas-atuacao`, lastModified: new Date("2026-10-10T00:00:00Z") , images: img("/og/areas-atuacao.jpg") },
    { url: `${baseUrl}/orcamento`, lastModified: baseUpdate , images: img("/og/orcamento.jpg", "/brand/paginas/orcamento.webp") },
    { url: `${baseUrl}/credito-obras`, lastModified: new Date("2026-10-08T00:00:00Z") , images: img("/og/credito-obras.jpg", "/brand/paginas/credito.webp") },
    { url: `${baseUrl}/precos-reais`, lastModified: baseUpdate , images: img("/og/precos-reais.jpg", "/brand/paginas/precos.webp") },
    { url: `${baseUrl}/precos-m2`, lastModified: baseUpdate , images: img("/og/precos-m2.jpg") },
    { url: `${baseUrl}/planificador`, lastModified: new Date("2026-09-25T00:00:00Z") , images: img("/og/planificador.jpg") },
    { url: `${baseUrl}/verdemont`, lastModified: new Date("2026-09-20T00:00:00Z") },
    { url: `${baseUrl}/sobre`, lastModified: new Date("2026-10-01T00:00:00Z") , images: img("/og/sobre.jpg", "/brand/paginas/sobre.webp") },
    { url: `${baseUrl}/projetos`, lastModified: baseUpdate , images: img("/og/projetos.jpg", "/brand/paginas/projetos.webp") },
    { url: `${baseUrl}/blog`, lastModified: baseUpdate , images: img("/og/blog.jpg") },
    { url: `${baseUrl}/privacidade`, lastModified: baseUpdate },
    { url: `${baseUrl}/termos`, lastModified: baseUpdate },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s, idx) => ({
    url: `${baseUrl}/servicos/${s.slug}`,
    lastModified: new Date(new Date("2026-11-01").getTime() + idx * 3600000),
    images: img(`/og/servicos/${s.slug}.jpg`, `/brand/servicos/${s.slug}.webp`),
  }));

  const parishPages: MetadataRoute.Sitemap = PARISHES.map((p, idx) => ({
    url: `${baseUrl}/areas-atuacao/${p.slug}`,
    images: img(`/og/areas/${p.slug}.jpg`),
    lastModified: new Date(new Date("2026-09-15").getTime() + (idx % 10) * 86400000),
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(`${b.date}T10:00:00Z`),
  }));

  return [...staticPages, ...servicePages, ...parishPages, ...blogPages];
}
