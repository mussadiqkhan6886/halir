import { Metadata } from 'next'
import Script from 'next/script'
import MainCard from '@/components/main/MainCard'
import { connectDB } from '@/lib/config/db'
import { COLLECTIONS } from '@/lib/constants'
import { magdaLig } from '@/lib/font'
import Perfume from '@/lib/models/ProductSchema'
import { PerfumeType } from '@/type'
import Link from 'next/link'
import React from 'react'

const BASE_URL = 'https://www.halirperfumerypk.com'

export const revalidate = 60

export const generateStaticParams = async () => {
  return COLLECTIONS.map(item => ({
    category: item.slug,
  }))
}

// ── Dynamic Metadata ──────────────────────────────────────────────────────────
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> => {
  const { category } = await params
  const collection = COLLECTIONS.find(item => item.slug === category)

  const title = collection?.title ?? 'Collection'
  const description = collection?.desc
    ? `${collection.desc} Shop Halir's ${title} fragrance collection — premium scents crafted for Pakistan.`
    : `Shop Halir's ${title} fragrance collection. Premium luxury perfumes crafted for Pakistan.`

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/collections/${category}`,
    },
    openGraph: {
      title: `${title} | Halir`,
      description,
      url: `${BASE_URL}/collections/${category}`,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/${collection?.image}`,
          width: 1200,
          height: 630,
          alt: `Halir ${title} Collection`,
        },
      ],
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params

  await connectDB()

  const currentCollection = COLLECTIONS.find(item => item.slug === category)
  const res = await Perfume.find(
    category === 'all' ? {} : { categories: { $in: [category] } }
  ).lean()
  const currentProducts: PerfumeType[] = JSON.parse(JSON.stringify(res))

  // ── JSON-LD (built from live data) ─────────────────────────────────────────
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
      {
        '@type': 'ListItem',
        position: 3,
        name: currentCollection?.title ?? category,
        item: `${BASE_URL}/collections/${category}`,
      },
    ],
  }

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${currentCollection?.title ?? category} — Halir`,
    url: `${BASE_URL}/collections/${category}`,
    description: currentCollection?.desc ?? `Halir ${category} fragrance collection.`,
    inLanguage: 'en-PK',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Halir',
      url: BASE_URL,
    },
    breadcrumb: breadcrumbSchema,
  }

  // ProductCollection — each product as an Offer
  const itemListSchema = currentProducts.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Halir ${currentCollection?.title ?? category} Perfumes`,
        url: `${BASE_URL}/collections/${category}`,
        numberOfItems: currentProducts.length,
        itemListElement: currentProducts.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: `${BASE_URL}/collections/${category}/${item.slug}`,
          image: item.mainImage,
        })),
      }
    : null

  return (
    <>
      <Script
        id={`schema-breadcrumb-${category}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id={`schema-collectionpage-${category}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
        strategy="afterInteractive"
      />
      {itemListSchema && (
        <Script
          id={`schema-itemlist-${category}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
          strategy="afterInteractive"
        />
      )}

      <main className="max-w-6xl mx-auto py-4 w-full bg-light">

        {/* Breadcrumb */}
        <section className="px-5 mb-3">
          <nav
            className={`${magdaLig.className} flex gap-1 items-center text-sm`}
            aria-label="Breadcrumb"
          >
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/collections" className="capitalize">Collections</Link>
            <span aria-hidden="true">/</span>
            <span
              className="capitalize text-zinc-500"
              aria-current="page"
            >
              {currentCollection?.title ?? 'Not Found'}
            </span>
          </nav>
        </section>

        {/* Title */}
        <section className="px-5 mb-3">
          <h1 className="uppercase font-black tracking-wide text-2xl md:text-xl">
            {currentCollection?.title}
          </h1>
          <p className={`${magdaLig.className} text-stone-600 text-sm`}>
            {currentCollection?.desc}
          </p>
        </section>

        {/* Products */}
        {currentProducts.length > 0 ? (
          <section
            className="flex flex-col p-3 md:p-5 gap-3"
            aria-label={`${currentCollection?.title ?? category} perfumes`}
          >
            <p className="sr-only">
              {currentProducts.length} product{currentProducts.length !== 1 ? 's' : ''} found
            </p>
            {currentProducts.map((item: PerfumeType, index: number) => (
              <MainCard
                key={item.slug}
                index={index}
                name={item.name}
                image={item.mainImage}
                slug={item.slug}
                category={category}
              />
            ))}
          </section>
        ) : (
          <section
            className="flex items-center border-t border-zinc-300 pt-8 justify-center my-10 flex-col"
            aria-label="No products found"
          >
            <h2 className="font-semibold uppercase text-lg">No Perfumes Found</h2>
            <div className="flex gap-3 my-4">
              <Link
                className={`${magdaLig.className} border border-zinc-300 text-sm px-6 py-2`}
                href="/collections/men"
              >
                Explore Men
              </Link>
              <Link
                className={`${magdaLig.className} border border-zinc-300 text-sm px-6 py-2`}
                href="/collections/women"
              >
                Explore Women
              </Link>
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export default Page