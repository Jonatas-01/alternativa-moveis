import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  // metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://alternativamoveis.com.br'),
  title: {
    default: "Alternativa Móveis | Móveis para Escritório e Escolas em Goiânia",
    template: "%s | Alternativa Móveis"
  },
  description: "Móveis de alta qualidade para escritórios e escolas em Goiânia. Cadeiras, mesas, armários, carteiras escolares. Venda, conserto e entrega. Atendemos empresas e instituições.",
  keywords: [
    "móveis para escritório",
    "móveis escolares",
    "cadeiras para escritório",
    "mesas para escritório",
    "móveis Goiânia",
    "carteiras escolares",
    "armários",
    "conserto de móveis",
    "móveis corporativos",
    "mobiliário escolar",
    "alternativa móveis"
  ],
  authors: [{ name: "Alternativa Móveis" }],
  creator: "Alternativa Móveis",
  publisher: "Alternativa Móveis",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    // url: 'https://alternativamoveis.com.br',
    siteName: 'Alternativa Móveis',
    title: 'Alternativa Móveis | Móveis para Escritório e Escolas em Goiânia',
    description: 'Móveis de alta qualidade para escritórios e escolas. Cadeiras, mesas, armários e carteiras escolares. Venda, conserto e entrega em Goiânia.',
    images: [
      {
        url: '/image/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alternativa Móveis - Móveis para Escritório e Escolas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alternativa Móveis | Móveis para Escritório e Escolas',
    description: 'Móveis de alta qualidade para escritórios e escolas em Goiânia.',
    images: ['/image/hero-image.jpg'],
  },
  alternates: {
    // canonical: 'https://alternativamoveis.com.br',
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-google-verification-code',
  },
};

// JSON-LD Structured Data for the business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  name: 'Alternativa Móveis',
  description: 'Móveis de alta qualidade para escritórios e escolas em Goiânia. Venda, conserto e entrega.',
  // url: 'https://alternativamoveis.com.br',
  telephone: '+55-62-3215-0996',
  email: 'leonardo.alternativamoveis@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av Alberto Miguel, 859',
    addressLocality: 'Goiânia',
    addressRegion: 'GO',
    addressCountry: 'BR',
    neighborhood: 'St. Campinas',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -16.6799,
    longitude: -49.2547,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '07:00',
      closes: '13:00',
    },
  ],
  priceRange: '$$',
  servesCuisine: undefined,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Catálogo de Móveis',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Móveis para Escritório',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Cadeiras para Escritório' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Mesas para Escritório' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Armários' } },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Móveis Escolares',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Carteiras Escolares' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Cadeiras Escolares' } },
        ],
      },
    ],
  },
  areaServed: {
    '@type': 'City',
    name: 'Goiânia',
  },
  sameAs: [
    'https://www.instagram.com/alternativamoveisgyn?igsh=MXB2OGd0NGd3djB3YQ=='
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${syne.variable} antialiased`}
      >
        <Header />
        {children}
        <div className="bg-[var(--primary)] text-white">
          <div className="container mx-auto px-6 md:px-0">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
