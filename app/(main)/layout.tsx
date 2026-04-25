import type { Metadata, Viewport } from "next";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";


const BASE_URL = 'https://halir-seven.vercel.app'

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Defaults (pages override these) ──────────────────────────────────────
  title: {
    default: 'Halir — Luxury Perfumes Pakistan',
    template: '%s | Halir',
  },
  description:
    'Halir is Pakistan\'s premium luxury perfume brand. Shop signature fragrances, exclusive collections, and long lasting scents. Delivered across Pakistan.',

  // ── Keywords ──────────────────────────────────────────────────────────────
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

  // ── Robots ────────────────────────────────────────────────────────────────
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

  // ── Open Graph ────────────────────────────────────────────────────────────
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
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Halir — Luxury Perfumes Pakistan',
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Halir — Luxury Perfumes Pakistan',
    description: 'Pakistan\'s premium fragrance brand.',
    images: ['/hero.png'],
    // creator: '@halirpk',  // add when you have a Twitter handle
  },

  // ── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },

  // ── Verification (add when ready) ────────────────────────────────────────
  // verification: {
  //   google: 'your-google-verification-code',
  // },
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
