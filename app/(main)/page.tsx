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

export const metadata: Metadata = {
  title: 'Halir | Long lasting Perfumes in Affordable Prices in Pakistan',
  description:
    'Halir Pakistan\'s finest long lasting luxury perfumery. Discover handcrafted eau de parfums, rare oud & signature scents inspired by the soul of the East. Shop exclusive fragrances online. Free delivery across Pakistan.',
  alternates: {
    canonical: 'https://halirperfumerypk.com',
  },
  openGraph: {
    title: 'Halir | Long lasting Perfumes in Affordable Prices in Pakistan',
    description:
      'Pakistan\'s premium fragrance brand. Shop luxury perfumes and exclusive scents crafted for the modern Pakistani.',
    url: 'https://halirperfumerypk.com',
    type: 'website',
    images: [
      {
        url: 'https://halirperfumerypk.com/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Halir — Luxury Perfumes Pakistan',
      },
    ],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Halir',
  url: 'https://halirperfumerypk.com',
  logo: 'https://halirperfumerypk.com/favicon.ico', 
  description:
    'Halir is a luxury perfume brand based in Pakistan, offering premium fragrances and signature scents.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
    addressRegion: 'Islamabad Capital Territory',
    addressLocality: 'Islamabad', 
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Urdu', 'Pashto'],
  },
  sameAs: [
    'https://www.instagram.com/halirperfumery/?__pwa=1', 
    'https://www.facebook.com/halir.pk', 
    'https://www.tiktok.com/@halir.pk',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Halir',
  url: 'https://halirperfumerypk.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://halirperfumerypk.com/search?q={search_term_string}',
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
      item: 'https://halirperfumerypk.com',
    },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Halir',
  image: 'https://halirperfumerypk.com/hero.webp',
  url: 'https://halirperfumerypk.com',
  description:
    'Premium luxury perfumes and fragrances brand based in Pakistan.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
    addressRegion: 'Islamabad Capital Territory',
    addressLocality: 'Islamabad',
  },
  priceRange: '₨₨₨',
  currenciesAccepted: 'PKR',
  paymentAccepted: 'Cash, Credit Card, JazzCash, EasyPaisa',
  areaServed: {
    '@type': 'Country',
    name: 'Pakistan',
  },
}

const mainEntitySchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Halir',
  url: 'https://halirperfumerypk.com',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Collections',
        url: 'https://halirperfumerypk.com/collections',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Men Perfumes',
        url: 'https://halirperfumerypk.com/collections/men',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Hot Sellers',
        url: 'https://halirperfumerypk.com/collections/hot-sellers',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact Us',
        url: 'https://halirperfumerypk.com/contact-us',
      },
    ],
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
      <Script
        id="schema-mainentity"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mainEntitySchema),
        }}
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