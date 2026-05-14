import Collections from '@/sections/Collections'
import CTA from '@/sections/CTA'
import FAQ from '@/sections/FAQ'
import Hero from '@/sections/Hero'
import HotSellers from '@/sections/HotSellers'
import NewArrival from '@/sections/NewArrival'
import Reviews from '@/sections/Reviews'
import Story from '@/sections/Story'
import WhyUs from '@/sections/WhyUs'
import { Metadata } from 'next'
import Script from 'next/script'
import React from 'react'

export const revalidate = 60

// ── Page-level metadata (extends layout defaults) ─────────────────────────────
export const metadata: Metadata = {
  title: 'Halir — Luxury Perfumes & Fragrances in Pakistan',
  description:
    'Halir Pakistan\'s finest luxury perfumery. Discover handcrafted eau de parfums, rare oud & signature scents inspired by the soul of the East. Shop exclusive fragrances online. Free delivery across Pakistan.',
  alternates: {
    canonical: 'https://www.halir.pk',
  },
  openGraph: {
    title: 'Halir — Luxury Perfumes & Fragrances in Pakistan',
    description:
      'Pakistan\'s premium fragrance brand. Shop luxury perfumes and exclusive scents crafted for the modern Pakistani.',
    url: 'https://www.halir.pk',
    type: 'website',
    images: [
      {
        url: 'https://www.halir.pk/og-home.jpg', // replace with real image
        width: 1200,
        height: 630,
        alt: 'Halir — Luxury Perfumes Pakistan',
      },
    ],
  },
}

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Halir',
  url: 'https://www.halir.pk',
  logo: 'https://www.halir.pk/logo.png', // replace with real logo
  description:
    'Halir is a luxury perfume brand based in Pakistan, offering premium fragrances and signature scents.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
    addressRegion: 'Punjab',
    addressLocality: 'Lahore', // update to your city
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Urdu'],
  },
  sameAs: [
    'https://www.instagram.com/halir.pk',   // update with real handles
    'https://www.facebook.com/halir.pk',
    'https://www.tiktok.com/@halir.pk',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Halir',
  url: 'https://www.halir.pk',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.halir.pk/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.halir.pk',
    },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Halir',
  image: 'https://www.halir.pk/og-home.jpg',
  url: 'https://www.halir.pk',
  description:
    'Premium luxury perfumes and fragrances brand based in Pakistan.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
    addressRegion: 'Punjab',
    addressLocality: 'Lahore',
  },
  priceRange: '₨₨₨',
  currenciesAccepted: 'PKR',
  paymentAccepted: 'Cash, Credit Card, JazzCash, EasyPaisa',
  areaServed: {
    '@type': 'Country',
    name: 'Pakistan',
  },
}

// ── Page ─────────────────────────────────────────────────────────────────────
const Home = () => {
  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        strategy="beforeInteractive"
      />

      <main className="overflow-x-hidden">
        <Hero />
        <Story />
        <Collections />
        <NewArrival />
        <HotSellers />
        <WhyUs />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
    </>
  )
}

export default Home