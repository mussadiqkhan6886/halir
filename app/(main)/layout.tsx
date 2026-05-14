import type { Metadata, Viewport } from "next";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";


const BASE_URL = 'https://halirperfumerypk.com'

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Halir | Long Lasting Perfumes Pakistan',
    template: '%s | Halir',
  },
 description:
  'Halir Pakistan\'s finest luxury perfumery. Discover handcrafted eau de parfums, rare oud & signature scents inspired by the soul of the East. Shop exclusive fragrances online. Free delivery across Pakistan.',

  keywords: [
    'perfume pakistan',
    'luxury perfume pakistan',
    'halir perfume',
    'fragrance pakistan',
    'buy perfume online pakistan',
    'attar pakistan',
    'premium scent pakistan',
    'pakistani perfume brand',
    'lahore perfume',
    'islamabad perfume',
    'mardan perfume',
    'kpk perfume',
    'peshawar perfume',
    'karachi perfume',
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_PK',
    siteName: 'Halir',
    url: BASE_URL,
    title: 'Halir — Luxury Perfumes Pakistan',
    description:
      'Pakistan\'s premium fragrance brand. Shop luxury perfumes, signature collections, and exclusive scents.',
    images: [
      {
        url: '/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Halir — Luxury Perfumes Pakistan',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Halir — Luxury Perfumes Pakistan',
    description: 'Pakistan\'s premium fragrance brand.',
    images: ['/hero.webp'],
    // creator: '@halirpk',  // add when you have a Twitter handle
  },

  // ── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },

  verification: {
    google: 'OOuOj7c-nDN2hjEuNR-iGSSfdzn5oNTwMYdMvRW8vTo',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
       {children}
      <Footer />
    </>
  );
}
