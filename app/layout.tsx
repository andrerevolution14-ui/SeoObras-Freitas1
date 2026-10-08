import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
    default: "Freitas Renovações LDA | Empresa de Obras & Remodelações em Aveiro",
    template: "%s | Freitas Renovações LDA",
  },
  description:
    "Empresa de remodelações e obras gerais em Aveiro e concelhos vizinhos. Chave na mão, casas de banho, cozinhas, apartamentos, moradias, capoto e telhados. Alvará IMPIC. Empreiteiro Jorge Freitas. Orçamento grátis em <12h. ⭐ 4.9/5 Google.",
  keywords: [
    // 1. Termos Gerais de Elevada Intenção
    "remodelações aveiro",
    "empresa de remodelações aveiro",
    "obras aveiro",
    "empresa de obras aveiro",
    "obras e remodelações aveiro",
    "empreiteiros aveiro",
    "remodelações gerais aveiro",
    "empresa de construção e remodelação aveiro",
    "obras chave na mão aveiro",
    // 2. Remodelações por Divisão e Tipologia
    "remodelação de casas de banho aveiro",
    "remodelação wc aveiro",
    "remodelação de cozinhas aveiro",
    "remodelação de apartamentos aveiro",
    "remodelação de moradias aveiro",
    "remodelação de interiores aveiro",
    "obras em apartamentos aveiro",
    "recuperação de casas velhas aveiro",
    // 3. Serviços Técnicos e Especialidades
    "isolamento térmico aveiro",
    "aplicação de capoto aveiro",
    "impermeabilização de telhados aveiro",
    "reparação de infiltrações aveiro",
    "pladur e tetos falsos aveiro",
    "pinturas de interiores e exteriores aveiro",
    "substituição de caixilharia aveiro",
    "janelas aveiro",
    // 4. Pesquisas de Orçamento e Custo
    "orçamento remodelação aveiro",
    "quanto custa remodelar uma casa em aveiro",
    "preço m2 remodelação aveiro",
    "orçamento obras aveiro",
    // 5. Expansão Geográfica Próxima
    "remodelações ílhavo",
    "remodelações águeda",
    "remodelações estarreja",
    "remodelações vagos",
    "remodelações praia da barra",
    "remodelações costa nova",
    // Entidades & Confiança
    "freitas renovações lda",
    "jorge freitas empreiteiro",
    "obras remodelações aveiro preço justo",
  ],
  authors: [{ name: "Jorge Freitas", url: "https://www.grupofreitasrenovacoes.pt" }],
  creator: "Freitas Renovações LDA",
  publisher: "Freitas Renovações LDA",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://www.grupofreitasrenovacoes.pt"),
  alternates: {
    canonical: "https://www.grupofreitasrenovacoes.pt/",
    languages: { "pt-PT": "https://www.grupofreitasrenovacoes.pt/" },
  },
  category: "construction",
  // Favicon & Touch Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://www.grupofreitasrenovacoes.pt",
    siteName: "Freitas Renovações LDA",
    title: "Freitas Renovações LDA | Empresa de Obras & Remodelações em Aveiro",
    description:
      "Empresa licenciada de obras, remodelações gerais e chave na mão em Aveiro. ⭐ 4.9/5 Google · +100 obras · Empreiteiro Jorge Freitas · Preços Justos · Orçamento Grátis",
    images: [
      {
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Freitas Renovações LDA — Obras e Remodelações em Aveiro",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freitas Renovações LDA | Obras & Remodelações em Aveiro",
    description: "Empresa licenciada de obras e remodelações em Aveiro. ⭐ 4.9/5 Google · Orçamento gratuito · Preços Justos.",
    images: ["https://www.grupofreitasrenovacoes.pt/og-image.jpg"],
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
      "@id": "https://www.grupofreitasrenovacoes.pt/#organization",
      name: CONTRACTOR_INFO.companyName,
      legalName: CONTRACTOR_INFO.companyName,
      url: CONTRACTOR_INFO.website,
      logo: {
        "@type": "ImageObject",
        url: "https://www.grupofreitasrenovacoes.pt/logo.png",
        width: 200,
        height: 60,
      },
      image: {
        "@type": "ImageObject",
        url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
        width: 1200,
        height: 630,
      },
      description:
        "Empresa de obras, remodelações gerais e reparações em Aveiro e concelhos limítrofes. Licenciada pelo IMPIC. Empreiteiro Jorge Freitas. Preços justos e garantia formal.",
      knowsAbout: [
        "Remodelações Gerais",
        "Obras Chave na Mão",
        "Remodelação de Casas de Banho",
        "Remodelação de Cozinhas",
        "Remodelação de Apartamentos",
        "Remodelação de Moradias",
        "Recuperação de Casas Velhas",
        "Aplicação de Capoto ETICS",
        "Isolamento Térmico e Acústico",
        "Impermeabilização de Telhados",
        "Reparação de Infiltrações",
        "Pladur e Tetos Falsos",
        "Pintura de Interiores e Exteriores",
        "Substituição de Caixilharia e Janelas",
      ],
      founder: {
        "@type": "Person",
        "@id": "https://www.grupofreitasrenovacoes.pt/#jorge-freitas",
        name: CONTRACTOR_INFO.contractorName,
        jobTitle: CONTRACTOR_INFO.jobTitle,
        worksFor: { "@id": "https://www.grupofreitasrenovacoes.pt/#organization" },
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
          name: p.isNeighboringCounty ? p.name : "Aveiro",
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
        geoRadius: "45000",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de Obras e Remodelações em Aveiro",
        itemListElement: SERVICES.map((s, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            url: `https://www.grupofreitasrenovacoes.pt/servicos/${s.slug}`,
            provider: { "@id": "https://www.grupofreitasrenovacoes.pt/#organization" },
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
      "@id": "https://www.grupofreitasrenovacoes.pt/#website",
      url: "https://www.grupofreitasrenovacoes.pt",
      name: CONTRACTOR_INFO.companyName,
      description: "Empresa de obras e remodelações em Aveiro — Freitas Renovações LDA",
      inLanguage: "pt-PT",
      publisher: { "@id": "https://www.grupofreitasrenovacoes.pt/#organization" },
    },
    {
      "@type": "HowTo",
      name: "Como Remodelar uma Casa de Banho em Aveiro — Passos Essenciais",
      description: "Guia técnico passo a passo para remodelar a casa de banho em Aveiro com preços justos, desde a demolição à vistoria final.",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "EUR",
        value: "3450",
      },
      step: [
        {
          "@type": "HowToStep",
          name: "Diagnóstico e Medições",
          text: "Medir área útil, verificar prumadas e inspecionar canos antigos de ferro ou chumbo.",
        },
        {
          "@type": "HowToStep",
          name: "Seleção de Materiais e Loiças",
          text: "Escolher base de duche plana, torneiras economizadoras e cerâmica porcelânica retificada.",
        },
        {
          "@type": "HowToStep",
          name: "Demolição e Preparação Segura",
          text: "Remover banheira antiga, resguardos e azulejos com transporte a vazadouro licenciado em Aveiro.",
        },
        {
          "@type": "HowToStep",
          name: "Canalização Multicamada e Impermeabilização",
          text: "Instalar tubagens PEX/Multicamada sem uniões no chão e aplicar membrana líquida impermeabilizante armada.",
        },
        {
          "@type": "HowToStep",
          name: "Assentamento de Cerâmica e Acabamentos",
          text: "Colocar revestimentos com cimento-cola C2TE e betume hidrófugo resistente ao clima húmido de Aveiro.",
        },
        {
          "@type": "HowToStep",
          name: "Montagem de Equipamentos e Vistoria Final",
          text: "Instalação de resguardo em vidro temperado 8mm, sanita compacta e entrega da garantia contratual.",
        },
      ],
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
        <link rel="alternate" hrefLang="pt-PT" href="https://www.grupofreitasrenovacoes.pt/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.grupofreitasrenovacoes.pt/" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17936797026"
          strategy="afterInteractive"
        />
        <Script id="google-tag-aw-17936797026" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17936797026');
          `}
        </Script>
        {/* Google Ads Conversion: Enviar formulário de leads */}
        <Script id="google-ads-conversion-lead" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-17936797026/T7aMCMK23LUcEOKa9-hC',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
