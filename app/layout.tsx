import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { CONTRACTOR_INFO, SERVICES, PARISHES } from "@/lib/constants";

// Load Inter via next/font — zero layout shift, self-hosted, no external request
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Freitas Renovações LDA | Obras e Remodelações em Aveiro",
    template: "%s | Freitas Renovações LDA",
  },
  description:
    "Empresa de obras, remodelações e reparações em Aveiro. Empresa licenciada IMPIC, liderada pelo Empreiteiro Jorge Freitas. Orçamento gratuito. Resposta em < 12h. ⭐ 4.9/5 no Google. Preços justos.",
  keywords: [
    "obras aveiro",
    "remodelações aveiro",
    "empreiteiro aveiro",
    "canalizador aveiro",
    "eletricista aveiro",
    "reparações aveiro",
    "empresa construção aveiro",
    "telhados aveiro",
    "pintura aveiro",
    "capoto aveiro",
    "isolamentos aveiro",
    "freitas renovações",
    "jorge freitas empreiteiro",
    "obras remodelações aveiro preço justo",
  ],
  authors: [{ name: "Jorge Freitas", url: "https://freitasrenovacoes.pt" }],
  creator: "Freitas Renovações LDA",
  publisher: "Freitas Renovações LDA",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://freitasrenovacoes.pt"),
  alternates: {
    canonical: "https://freitasrenovacoes.pt/",
    languages: { "pt-PT": "https://freitasrenovacoes.pt/" },
  },
  category: "construction",
  // Favicon via metadata API (Next.js 13+)
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://freitasrenovacoes.pt",
    siteName: "Freitas Renovações LDA",
    title: "Freitas Renovações LDA | Obras e Remodelações em Aveiro",
    description:
      "Empresa licenciada de obras, remodelações e reparações em Aveiro. ⭐ 4.9/5 Google · +100 obras · Empreiteiro Jorge Freitas · Preços Justos · Orçamento Grátis",
    images: [
      {
        url: "https://freitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Freitas Renovações LDA — Obras e Remodelações em Aveiro",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freitas Renovações LDA | Obras em Aveiro",
    description: "Empresa licenciada de obras e remodelações em Aveiro. ⭐ 4.9/5 Google · Orçamento gratuito · Preços Justos.",
    images: ["https://freitasrenovacoes.pt/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// ── Global Schema.org JSON-LD ─────────────────────────────────
const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://freitasrenovacoes.pt/#organization",
      name: CONTRACTOR_INFO.companyName,
      legalName: CONTRACTOR_INFO.companyName,
      url: CONTRACTOR_INFO.website,
      logo: {
        "@type": "ImageObject",
        url: "https://freitasrenovacoes.pt/logo.png",
        width: 200,
        height: 60,
      },
      image: {
        "@type": "ImageObject",
        url: "https://freitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
      },
      description:
        "Empresa de obras, remodelações e reparações em Aveiro, Portugal. Licenciada IMPIC. Empreiteiro Jorge Freitas. Preços justos e orçamento transparente.",
      founder: {
        "@type": "Person",
        "@id": "https://freitasrenovacoes.pt/#jorge-freitas",
        name: CONTRACTOR_INFO.contractorName,
        jobTitle: CONTRACTOR_INFO.jobTitle,
        worksFor: { "@id": "https://freitasrenovacoes.pt/#organization" },
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTRACTOR_INFO.address.street,
        addressLocality: CONTRACTOR_INFO.address.city,
        postalCode: CONTRACTOR_INFO.address.postalCode,
        addressRegion: "Aveiro",
        addressCountry: CONTRACTOR_INFO.address.countryCode,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: CONTRACTOR_INFO.geo.latitude,
        longitude: CONTRACTOR_INFO.geo.longitude,
      },
      telephone: CONTRACTOR_INFO.phone,
      email: CONTRACTOR_INFO.email,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: CONTRACTOR_INFO.phone,
        contactType: "customer service",
        areaServed: "PT",
        availableLanguage: "Portuguese",
      },
      // Google Business Profile URL — verified Place ID
      sameAs: [
        "https://maps.app.goo.gl/FreitasRenovacoes",
        "https://www.google.com/maps/place/?q=place_id:ChIJbnyBD_bGxkYRiViYJrwZFsE",
        CONTRACTOR_INFO.socialLinks.facebook,
      ],
      areaServed: PARISHES.map((p) => ({
        "@type": "City",
        name: p.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Aveiro",
          containedInPlace: { "@type": "Country", name: "Portugal" },
        },
      })),
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: CONTRACTOR_INFO.geo.latitude,
          longitude: CONTRACTOR_INFO.geo.longitude,
        },
        geoRadius: "30000",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de Construção e Renovação em Aveiro",
        itemListElement: SERVICES.map((s, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            url: `https://freitasrenovacoes.pt/servicos/${s.slug}`,
            provider: { "@id": "https://freitasrenovacoes.pt/#organization" },
          },
        })),
      },
      priceRange: "$$",
      paymentAccepted: "Transferência Bancária, MBWay, Multibanco",
      currenciesAccepted: "EUR",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "13:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: CONTRACTOR_INFO.googleRating.toString(),
        reviewCount: CONTRACTOR_INFO.reviewCount.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Maria Sousa" },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody:
            "Excelente trabalho! O Jorge e a sua equipa remodelaram a nossa moradia em tempo record. Materiais de qualidade, limpeza impecável e preço justo. Recomendo a 100%!",
          datePublished: "2025-01-15",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "António Costa" },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody:
            "Limpeza de telhado impecável. O telhado ficou como novo e o Jorge deu uma resposta muito rápida com um preço justo.",
          datePublished: "2024-10-08",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Pedro Rodrigues" },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody:
            "Infiltrações no telhado resolvidas definitivamente. Excelente relação qualidade/preço e total profissionalismo do Empreiteiro Jorge Freitas.",
          datePublished: "2024-08-14",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://freitasrenovacoes.pt/#website",
      url: "https://freitasrenovacoes.pt",
      name: CONTRACTOR_INFO.companyName,
      description: "Empresa de obras e remodelações em Aveiro — Freitas Renovações LDA",
      inLanguage: "pt-PT",
      publisher: { "@id": "https://freitasrenovacoes.pt/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://freitasrenovacoes.pt/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={inter.variable}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Geographic meta tags — reinforce local SEO */}
        <meta name="geo.region" content="PT-01" />
        <meta name="geo.placename" content="Aveiro, Portugal" />
        <meta name="geo.position" content={`${CONTRACTOR_INFO.geo.latitude};${CONTRACTOR_INFO.geo.longitude}`} />
        <meta name="ICBM" content={`${CONTRACTOR_INFO.geo.latitude}, ${CONTRACTOR_INFO.geo.longitude}`} />

        {/* hreflang — signal language/region to Google */}
        <link rel="alternate" hrefLang="pt-PT" href="https://freitasrenovacoes.pt/" />
        <link rel="alternate" hrefLang="x-default" href="https://freitasrenovacoes.pt/" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
