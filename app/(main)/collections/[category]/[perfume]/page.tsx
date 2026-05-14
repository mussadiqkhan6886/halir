import { Metadata } from 'next'
import Script from 'next/script'
import PerfumeCard from '@/components/main/PerfumeCard'
import { connectDB } from '@/lib/config/db'
import { magdaLig } from '@/lib/font'
import Perfume from '@/lib/models/ProductSchema'
import { PerfumeSize } from '@/type'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const BASE_URL = 'https://halirperfumerypk.com'

export const revalidate = 60

export const generateStaticParams = async () => {
  await connectDB()

  const perfumes = await Perfume.find({}, { slug: 1, categories: 1 }).lean()

  const paths: { category: string; perfume: string }[] = []

  perfumes.forEach((item) => {
    item.categories.forEach((category: string) => {
      paths.push({ category, perfume: item.slug })
    })
  })

  return paths
}

// ── Dynamic Metadata ──────────────────────────────────────────────────────────
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ perfume: string; category: string }>
}): Promise<Metadata> => {
  const { perfume, category } = await params

  await connectDB()

  const res = await Perfume.findOne({ slug: perfume }).lean()
  const product = JSON.parse(JSON.stringify(res))

  if (!product) {
    return {
      title: 'Perfume Not Found',
      robots: { index: false, follow: false },
    }
  }

  const lowestPrice = product.sizes?.length
    ? Math.min(...product.sizes.map((s: PerfumeSize) => s.price))
    : null

  const priceStr = lowestPrice ? ` Starting from PKR ${lowestPrice}.` : ''
  const categoryLabel = category.replace('-', ' ')

  return {
    title: product.name,
    description: `${product.description ?? `Shop ${product.name} by Halir — a luxury ${categoryLabel} fragrance.`}${priceStr} Free shipping across Pakistan.`,
    alternates: {
      canonical: `${BASE_URL}/collections/${category}/${perfume}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${product.name} | Halir`,
      description: product.description ?? `Shop ${product.name} — a luxury ${categoryLabel} fragrance by Halir Pakistan.`,
      url: `${BASE_URL}/collections/${category}/${perfume}`,
      type: 'website',
      images: [
        {
          url: product.mainImage,
          width: 1200,
          height: 630,
          alt: `${product.name} — Halir luxury perfume`,
        },
      ],
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
const Page = async ({
  params,
}: {
  params: Promise<{ perfume: string; category: string }>
}) => {
  const { perfume, category } = await params

  await connectDB()

  const res = await Perfume.findOne({ slug: perfume }).lean()
  const currentPerfume = JSON.parse(JSON.stringify(res))

  if (!currentPerfume) return notFound()

  const categoryLabel = category.replace('-', ' ')
  const lowestPrice = currentPerfume.sizes?.length
    ? Math.min(...currentPerfume.sizes.map((s: PerfumeSize) => s.price))
    : null
  const highestPrice = currentPerfume.sizes?.length
    ? Math.max(...currentPerfume.sizes.map((s: PerfumeSize) => s.price))
    : null

  // ── JSON-LD ───────────────────────────────────────────────────────────────
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
        name: categoryLabel,
        item: `${BASE_URL}/collections/${category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: currentPerfume.name,
        item: `${BASE_URL}/collections/${category}/${perfume}`,
      },
    ],
  }

  // Product schema — enables Google Shopping rich results
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: currentPerfume.name,
    description: currentPerfume.description ?? '',
    image: [currentPerfume.mainImage],
    url: `${BASE_URL}/collections/${category}/${perfume}`,
    brand: {
      '@type': 'Brand',
      name: 'Halir',
    },
    category: categoryLabel,
    offers: currentPerfume.sizes?.length
      ? {
          '@type': 'AggregateOffer',
          priceCurrency: 'PKR',
          lowPrice: lowestPrice,
          highPrice: highestPrice,
          offerCount: currentPerfume.sizes.length,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: 'Halir',
          },
          offers: currentPerfume.sizes.map((size: PerfumeSize) => ({
            '@type': 'Offer',
            sku: size.sku,
            name: `${currentPerfume.name} — ${size.ml} ml`,
            price: size.price,
            priceCurrency: 'PKR',
            availability: size.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            url: `${BASE_URL}/collections/${category}/${perfume}`,
            seller: {
              '@type': 'Organization',
              name: 'Halir',
            },
          })),
        }
      : undefined,
  }

  return (
    <>
      <Script
        id={`schema-breadcrumb-${perfume}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id={`schema-product-${perfume}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        strategy="beforeInteractive"
      />

      <main className="max-w-6xl pb-3 mx-auto">

        <section className="bg-light px-4 lg:px-0">
          {/* Breadcrumb */}
          <nav
            className={`${magdaLig.className} pt-3 flex gap-1 items-center text-sm`}
            aria-label="Breadcrumb"
          >
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link className="capitalize hover:underline" href={`/collections/${category}`}>
              {categoryLabel}
            </Link>
            <span aria-hidden="true">/</span>
            <span
              className="capitalize text-zinc-500"
              aria-current="page"
            >
              {perfume.replace('-', ' ')}
            </span>
          </nav>

          <div className="py-3">
            <h1 className="uppercase font-black tracking-wide text-2xl md:text-xl">
              {currentPerfume.name}
            </h1>
            <p className={`${magdaLig.className} text-stone-600 text-sm`}>
              {currentPerfume.description}
            </p>
            {lowestPrice && (
              <p className="sr-only">
                Starting from PKR {lowestPrice}
              </p>
            )}
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative max-w-6xl mx-auto w-full h-[250px] md:h-[350px]">
          <Image
            src={currentPerfume.mainImage as string}
            alt={`${currentPerfume.name} — Halir luxury perfume`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-center object-cover"
          />
          <h2
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-black uppercase text-xl md:text-2xl"
            aria-hidden="true"
          >
            {currentPerfume.name}
          </h2>
        </section>

        {/* Size variants */}
        <section
          className="grid py-24 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-5"
          aria-label={`Available sizes for ${currentPerfume.name}`}
        >
          {currentPerfume.sizes.map((item: PerfumeSize) => (
            <PerfumeCard
              key={item.sku}
              category={category}
              perfume={perfume}
              name={currentPerfume.name}
              {...item}
            />
          ))}
        </section>

      </main>
    </>
  )
}

export default Page