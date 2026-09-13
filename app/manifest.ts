import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Freitas Renovações LDA",
    short_name: "Freitas Renovações",
    description: "Empresa de obras, remodelações e reparações em Aveiro.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d2855",
    theme_color: "#0d2855",
    icons: [
      {
        src: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
