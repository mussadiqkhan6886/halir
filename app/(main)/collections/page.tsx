import { Metadata } from 'next'
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { magdaLig } from '@/lib/font'
import { COLLECTIONS } from '@/lib/constants'

const BASE_URL = 'https://halirperfumerypk.com'

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Collections',
  description:
    'Explore Halir\'s curated fragrance collections. Each collection is a chapter — crafted for depth, longevity, and the modern Pakistani. Shop signature scents online.',
  alternates: {
    canonical: `${BASE_URL}/collections`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Collections | Halir',
    description:
      'Explore Halir\'s curated fragrance collections — crafted for depth, longevity, and the modern Pakistani.',
    url: `${BASE_URL}/collections`,
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/story.jpg`, // replace with real OG image
        width: 1200,
        height: 630,
        alt: 'Halir Fragrance Collections',
      },
    ],
  },
}

// ── JSON-LD ───────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Collections',
      item: `${BASE_URL}/collections`,
    },
  ],
}

const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Halir Fragrance Collections',
  url: `${BASE_URL}/collections`,
  description:
    'Browse all Halir fragrance collections — luxury perfumes crafted in Pakistan for depth, longevity, and modern sensibility.',
  inLanguage: 'en-PK',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Halir',
    url: BASE_URL,
  },
  breadcrumb: breadcrumbSchema,
}

// ItemList schema — each collection as a ListItem with its own URL
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Halir Collections',
  url: `${BASE_URL}/collections`,
  itemListElement: COLLECTIONS.map((col, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: col.title,
    description: col.desc,
    url: `${BASE_URL}/collections/${col.slug}`,
    image: col.image,
  })),
}

// ── Page ─────────────────────────────────────────────────────────────────────
const CollectionsPage = () => {
  return (
    <>
      <Script
        id="schema-breadcrumb-collections"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-collectionpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-itemlist-collections"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        strategy="beforeInteractive"
      />

      <main className="bg-white min-h-screen py-14 px-6 md:px-12">

        {/* Semantic breadcrumb — crawlable, hidden visually */}
        <nav aria-label="Breadcrumb" className="sr-only">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/collections">Collections</Link></li>
          </ol>
        </nav>

        <section className="max-w-7xl mx-auto pb-10 md:mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
            Collections
          </h1>
        </section>

        {/* Collections grid — marked up as a list for accessibility + SEO */}
        <section
          className="max-w-7xl mx-auto"
          aria-label="Fragrance collections"
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start list-none">
            {COLLECTIONS.map((col, index) => (
              <li key={col.slug}>
                <Link
                  href={`/collections/${col.slug}`}
                  className="group relative overflow-hidden flex flex-col"
                  aria-label={`Shop ${col.title} collection`}
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-square md:aspect-[3/4] overflow-hidden bg-zinc-100">
                    <Image
                      src={col.image}
                      alt={`${col.title} — Halir fragrance collection`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-[0.5]"
                      // First 3 collections above fold — eager load; rest lazy
                      loading={index < 3 ? 'eager' : 'lazy'}
                      priority={index < 3}
                    />

                    <div className="absolute top-6 left-6 z-20" aria-hidden="true">
                      <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white drop-shadow-md">
                        0{index + 1}
                      </p>
                    </div>
                  </div>

                  <div className="py-6 space-y-1">
                    <h2 className="text-3xl font-bold uppercase tracking-tighter">
                      {col.title}
                    </h2>
                    <p className={`${magdaLig.className} text-zinc-500 text-sm max-w-xs leading-relaxed`}>
                      {col.desc}
                    </p>

                    <div className="pt-4 flex items-center gap-2 overflow-hidden" aria-hidden="true">
                      <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Shop Collection</span>
                      <div className="h-[1px] w-8 bg-black transform translate-x-[-10px] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </>
  )
}

export default CollectionsPage