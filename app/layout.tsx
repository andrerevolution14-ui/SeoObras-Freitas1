import type { Metadata } from "next";
import { Inter, Inter_Tight, Libre_Caslon_Text } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { MotionObserver } from "@/components/motion-observer";
import { CONTRACTOR_INFO, SERVICES, PARISHES } from "@/lib/constants";

// Load Inter via next/font — zero layout shift, self-hosted, no external request
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

// Serifa editorial — títulos de destaque
const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

// Display font — títulos de marca (Freitas Renovações)
const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Remodelações em Aveiro | Freitas Renovações",
    template: "%s | Freitas Renovações",
  },
  description:
    "Empresa de remodelações e obras gerais em Aveiro e concelhos vizinhos. Chave na mão, casas de banho, cozinhas, apartamentos e moradias. Alvará IMPIC, orçamentos discriminados e acompanhamento direto pelo Empreiteiro Jorge Freitas.",
  authors: [{ name: "Jorge Freitas", url: "https://www.grupofreitasrenovacoes.pt" }],
  creator: "Freitas Renovações LDA",
  publisher: "Freitas Renovações LDA",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://www.grupofreitasrenovacoes.pt"),
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
        width: 636,
        height: 608,
      },
      image: [
        {
          "@type": "ImageObject",
          url: "https://www.grupofreitasrenovacoes.pt/og-image.jpg",
          width: 1200,
          height: 630,
        },
        "https://www.grupofreitasrenovacoes.pt/brand/obra/fase-7.webp",
        "https://www.grupofreitasrenovacoes.pt/brand/antes-depois/bathroom-depois.webp",
        "https://www.grupofreitasrenovacoes.pt/brand/antes-depois/kitchen-depois.webp",
      ],
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
      // Google Business Profile & Redes Oficiais
      sameAs: [
        CONTRACTOR_INFO.socialLinks.google,
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
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: CONTRACTOR_INFO.googleRating,
        reviewCount: CONTRACTOR_INFO.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
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
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${inter.variable} ${interTight.variable} ${caslon.variable}`}>
      <head>
        {/* Geographic meta tags — reinforce local SEO */}
        <meta name="geo.region" content="PT-01" />
        <meta name="geo.placename" content="Aveiro, Portugal" />
        <meta name="geo.position" content={`${CONTRACTOR_INFO.geo.latitude};${CONTRACTOR_INFO.geo.longitude}`} />
        <meta name="ICBM" content={`${CONTRACTOR_INFO.geo.latitude}, ${CONTRACTOR_INFO.geo.longitude}`} />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />

        {/* Early dataLayer initialization — lightweight, no external requests */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                  'send_to': 'AW-17936797026/_-fvCOmXk5YdEOKa9-hC',
                  'event_callback': callback
                });
                return false;
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Ads (gtag) — carregado na 1.ª interação ou ao fim de 4 s, para não atrasar o carregamento.
            Os eventos enviados antes ficam em fila no dataLayer e são processados quando o script chega. */}
        <Script id="google-tag-aw-17936797026" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', 'AW-17936797026');
            (function () {
              var done = false;
              var evs = ['scroll', 'pointerdown', 'keydown', 'touchstart'];
              function load() {
                if (done) return; done = true;
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17936797026';
                document.head.appendChild(s);
                evs.forEach(function (e) { window.removeEventListener(e, load); });
              }
              evs.forEach(function (e) { window.addEventListener(e, load, { once: true, passive: true }); });
              if (document.readyState === 'complete') setTimeout(load, 4000);
              else window.addEventListener('load', function () { setTimeout(load, 4000); });
            })();
          `}
        </Script>

        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileCtaBar />
        <MotionObserver />
      </body>
    </html>
  );
}
