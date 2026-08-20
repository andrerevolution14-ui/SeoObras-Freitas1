import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { CONTRACTOR_INFO, SERVICES, PARISHES } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Freitas Renovações LDA | Obras e Remodelações em Aveiro",
    template: "%s | Freitas Renovações LDA",
  },
  description:
    "Empresa de obras, remodelações e reparações em Aveiro. Empresa licenciada IMPIC, liderada pelo Empreiteiro Jorge Freitas. Orçamento gratuito. Resposta em < 1h. ⭐ 4.9/5 no Google.",
  keywords: [
    "obras aveiro",
    "remodelações aveiro",
    "empreiteiro aveiro",
    "canalizador aveiro",
    "eletricista aveiro",
    "reparações aveiro",
    "freitas renovações",
    "jorge freitas empreiteiro",
  ],
  authors: [{ name: "Jorge Freitas", url: "https://freitasrenovacoes.pt" }],
  creator: "Freitas Renovações LDA",
  publisher: "Freitas Renovações LDA",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://freitasrenovacoes.pt"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://freitasrenovacoes.pt",
    siteName: "Freitas Renovações LDA",
    title: "Freitas Renovações LDA | Obras e Remodelações em Aveiro",
    description:
      "Empresa licenciada de obras, remodelações e reparações em Aveiro. ⭐ 4.9/5 Google · +500 obras · Empreiteiro Jorge Freitas",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Freitas Renovações LDA — Obras em Aveiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freitas Renovações LDA | Obras em Aveiro",
    description: "Empresa licenciada de obras e remodelações em Aveiro. Orçamento gratuito.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: "google-site-verification-placeholder" },
};

// Global Schema.org JSON-LD
const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://freitasrenovacoes.pt/#organization",
      name: CONTRACTOR_INFO.companyName,
      url: CONTRACTOR_INFO.website,
      logo: {
        "@type": "ImageObject",
        url: "https://freitasrenovacoes.pt/logo.png",
        width: 200,
        height: 60,
      },
      image: "https://freitasrenovacoes.pt/og-image.jpg",
      description:
        "Empresa de obras, remodelações e reparações em Aveiro, Portugal. Licenciada IMPIC.",
      founder: {
        "@type": "Person",
        name: CONTRACTOR_INFO.contractorName,
        jobTitle: CONTRACTOR_INFO.jobTitle,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTRACTOR_INFO.address.street,
        addressLocality: CONTRACTOR_INFO.address.city,
        postalCode: CONTRACTOR_INFO.address.postalCode,
        addressCountry: CONTRACTOR_INFO.address.countryCode,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: CONTRACTOR_INFO.geo.latitude,
        longitude: CONTRACTOR_INFO.geo.longitude,
      },
      telephone: CONTRACTOR_INFO.phone,
      email: CONTRACTOR_INFO.email,
      areaServed: PARISHES.map((p) => ({
        "@type": "City",
        name: p.name,
        containedInPlace: { "@type": "City", name: "Aveiro" },
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de Construção e Renovação",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            url: `https://freitasrenovacoes.pt/servicos/${s.slug}`,
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
    },
    {
      "@type": "WebSite",
      "@id": "https://freitasrenovacoes.pt/#website",
      url: "https://freitasrenovacoes.pt",
      name: CONTRACTOR_INFO.companyName,
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
    <html lang="pt-PT">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-700 antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
