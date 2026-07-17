import { Metadata } from 'next'
import Script from 'next/script'
import { magdaLig, ekate } from '@/lib/font'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductActions from '@/components/main/ProductAction'
import ImageGallery from '@/components/main/ImageGallery'
import PerfumeCard from '@/components/main/PerfumeCard'
import { connectDB } from '@/lib/config/db'
import Perfume from '@/lib/models/ProductSchema'
import { PerfumeNote, PerfumeSize } from '@/type'
import Image from 'next/image'

const BASE_URL = 'https://halirperfumerypk.com'

export const revalidate = 60

export const generateStaticParams = async () => {
  await connectDB()

  const perfumes = await Perfume.find(
    {},
    { slug: 1, categories: 1, 'sizes.slug': 1 }
  ).lean()

  const paths: { category: string; perfume: string; slug: string }[] = []

  perfumes.forEach((item) => {
    item.categories.forEach((category: string) => {
      item.sizes.forEach((size: any) => {
        paths.push({ category, perfume: item.slug, slug: size.slug })
      })
    })
  })

  return paths
}

// ── Dynamic Metadata ──────────────────────────────────────────────────────────
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: string; perfume: string; slug: string }>
}): Promise<Metadata> => {
  const { category, perfume, slug } = await params

  await connectDB()

  const res = await Perfume.findOne({ 'sizes.slug': slug }).lean()
  const product = JSON.parse(JSON.stringify(res))

  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false },
    }
  }

  const sizeData: PerfumeSize = product.sizes.find((s: PerfumeSize) => s.slug === slug)
  const categoryLabel = category.replace('-', ' ')
  const sizeLabel = sizeData?.ml > 10 ? `${sizeData.ml}ml Eau de Parfum` : `${sizeData.ml}ml Tester`
  const price = sizeData?.onSale ? sizeData.salePrice : sizeData?.price

  const title = `${product.name} — ${sizeLabel}`
  const description = `${product.description ?? `Shop ${product.name} by Halir`} ${sizeLabel} available for PKR ${price?.toLocaleString()}. Free shipping above PKR 4,000 across Pakistan.`

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/collections/${category}/${perfume}/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${title} | Halir`,
      description,
      url: `${BASE_URL}/collections/${category}/${perfume}/${slug}`,
      type: 'website',
      images: [
        {
          url: sizeData?.images?.[0] ?? product.mainImage,
          width: 1200,
          height: 630,
          alt: `${product.name} ${sizeLabel} — Halir luxury perfume`,
        },
      ],
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
const Page = async ({
  params,
}: {
  params: Promise<{ category: string; perfume: string; slug: string }>
}) => {
  const { category, perfume, slug } = await params

  await connectDB()

  const res = await Perfume.findOne({ 'sizes.slug': slug }).lean()
  const currentProduct = JSON.parse(JSON.stringify(res))

  if (!currentProduct) return notFound()

  const sizeData: PerfumeSize = currentProduct.sizes.find(
    (item: PerfumeSize) => item.slug === slug
  )!

  const categoryLabel = category.replace('-', ' ')
  const sizeLabel = sizeData.ml > 10 ? `${sizeData.ml}ml Eau de Parfum` : `${sizeData.ml}ml Tester`
  const displayPrice = sizeData.onSale ? sizeData.salePrice : sizeData.price
  const allNotes = [
    ...currentProduct.notes.top.map((n: PerfumeNote) => n.name),
    ...currentProduct.notes.heart.map((n: PerfumeNote) => n.name),
    ...currentProduct.notes.base.map((n: PerfumeNote) => n.name),
  ]

  // ── JSON-LD ───────────────────────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Collections', item: `${BASE_URL}/collections` },
      { '@type': 'ListItem', position: 3, name: categoryLabel, item: `${BASE_URL}/collections/${category}` },
      { '@type': 'ListItem', position: 4, name: currentProduct.name, item: `${BASE_URL}/collections/${category}/${perfume}` },
      { '@type': 'ListItem', position: 5, name: sizeLabel, item: `${BASE_URL}/collections/${category}/${perfume}/${slug}` },
    ],
  }

  // Full Product schema — this page is the deepest product variant
  // Google uses this for Shopping tab, price drops, availability alerts
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${currentProduct.name} — ${sizeLabel}`,
    description: currentProduct.description ?? '',
    image: sizeData.images?.length ? sizeData.images : [currentProduct.mainImage],
    url: `${BASE_URL}/collections/${category}/${perfume}/${slug}`,
    sku: sizeData.sku,
    brand: {
      '@type': 'Brand',
      name: 'Halir',
    },
    category: categoryLabel,
    // Fragrance-specific: notes listed as keywords help semantic search
    keywords: allNotes.join(', '),
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Volume',
        value: `${sizeData.ml}ml`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Longevity',
        value: currentProduct.longevity ?? '',
      },
      {
        '@type': 'PropertyValue',
        name: 'Type',
        value: sizeData.ml > 10 ? 'Eau de Parfum' : 'Tester',
      },
    ],
    offers: {
      '@type': 'Offer',
      sku: sizeData.sku,
      price: displayPrice,
      priceCurrency: 'PKR',
      availability: sizeData.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: `${BASE_URL}/collections/${category}/${perfume}/${slug}`,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnShippingFees',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: 'PKR',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 4,
            maxValue: 6,
            unitCode: 'DAY',
          },
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'PK',
        },
      },
      seller: {
        '@type': 'Organization',
        name: 'Halir',
        url: BASE_URL,
      },
    },
    // Sale price as a separate signal if on sale
    ...(sizeData.onSale && {
      offers: {
        '@type': 'Offer',
        sku: sizeData.sku,
        price: sizeData.salePrice,
        priceCurrency: 'PKR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: sizeData.salePrice,
          priceCurrency: 'PKR',
        },
        availability: sizeData.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        url: `${BASE_URL}/collections/${category}/${perfume}/${slug}`,
      },
    }),
  }

  return (
    <>
      <Script
        id={`schema-breadcrumb-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id={`schema-product-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        strategy="afterInteractive"
      />

      <main className="bg-light min-h-screen border-x border-zinc-200 max-w-8xl mx-auto w-full">
        <section className="grid mx-4 sm:mx-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border border-zinc-200">

          <section className="xl:col-span-2 pt-5 md:border-r border-zinc-200 md:pl-3 lg:pl-12">

            {/* Breadcrumb */}
            <nav
              className={`${magdaLig.className} pl-3 md:pl-0 flex gap-2 mb-5 items-center text-[11px] sm:text-sm uppercase text-zinc-500`}
              aria-label="Breadcrumb"
            >
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link className="capitalize hover:text-black hover:underline" href={`/collections/${category}`}>
                {categoryLabel}
              </Link>
              <span aria-hidden="true">/</span>
              <Link className="capitalize hover:text-black hover:underline" href={`/collections/${category}/${perfume}`}>
                {perfume.replace('-', ' ')}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="capitalize text-zinc-400" aria-current="page">
                {slug.replaceAll('-', ' ')}
              </span>
            </nav>

            {/* Mobile title + price */}
            <div className="flex md:hidden px-3 justify-between items-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                {currentProduct.name}
              </h1>
              <p className="font-light text-md text-stone-700" aria-label={`Price: PKR ${displayPrice?.toLocaleString()}`}>
                PKR. {sizeData.onSale ? (
                  <>
                    {sizeData.salePrice.toLocaleString()}
                    <span className="line-through ml-2 text-xs text-zinc-500" aria-label={`Original price: PKR ${sizeData.price.toLocaleString()}`}>
                      {sizeData.price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  sizeData.price.toLocaleString()
                )}
              </p>
            </div>

            <p className={`${magdaLig.className} block md:hidden px-3 mb-3 text-xs mt-1`}>
              {sizeLabel}
            </p>

            <ImageGallery images={sizeData.images} stock={sizeData.stock} alt={`${currentProduct.name} ${sizeLabel}`} />
          </section>

          <section className="p-3 sm:p-5 pt-8 md:pt-14 flex flex-col">
            <div>
              {/* Desktop title + price */}
              <div className="hidden md:flex justify-between items-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                  {currentProduct.name}
                </h1>
                <p className={`font-light text-xl text-stone-700`} aria-label={`Price: PKR ${displayPrice?.toLocaleString()}`}>
                  PKR. {sizeData.onSale ? (
                    <>
                      {sizeData.salePrice.toLocaleString()}
                      <span className="line-through ml-2 text-xs text-zinc-500" aria-label={`Original price: PKR ${sizeData.price.toLocaleString()}`}>
                        {sizeData.price.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    sizeData.price.toLocaleString()
                  )}
                </p>
              </div>

              <p className={`${magdaLig.className} mb-8 hidden md:block text-sm mt-2`}>
                {sizeLabel}
              </p>

              <ProductActions
                name={currentProduct.name}
                price={sizeData.price}
                onSale={sizeData.onSale}
                salePrice={sizeData.salePrice}
                quantity={1}
                image={sizeData.images[0]}
                selectedSize={sizeData.ml}
                stock={sizeData.stock}
                sku={sizeData.sku}
                currentProduct={currentProduct}
                currentSlug={slug}
                category={category}
                perfume={perfume}
              />

              {/* Technical Specifications */}
              <div className="mt-6 border-t border-zinc-200 pt-7">
                <p className={`${magdaLig.className} pb-3 text-black text-sm`}>
                  {currentProduct.description}
                </p>

                <p className={`${magdaLig.className} border-t border-zinc-200 py-3 text-black text-sm`}>
                  {currentProduct.tagline}
                </p>

                <p className={`${magdaLig.className} border-t border-zinc-200 py-3 text-black text-sm`}>
                  <span className="font-medium">Timing:</span> {currentProduct.longevity}
                </p>

                {/* Fragrance Notes */}
                <div
                  className="grid grid-cols-3 gap-4 border-t border-zinc-200 pt-7 pb-3"
                  aria-label="Fragrance notes"
                >
                  {(['top', 'heart', 'base'] as const).map((layer) =>
                    currentProduct.notes[layer].map((note: PerfumeNote, i: number) => (
                      <div key={`${layer}-${i}`} className="space-y-4">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-2">
                            {layer}
                          </span>
                          <p className="text-xs font-bold uppercase">{note.name}</p>
                          <div className="relative aspect-square mt-1">
                            <Image
                              src={note.image}
                              fill
                              alt={`${note.name} — ${layer} note`}
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-zinc-200 pt-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Need Help?</span>
                  <Link href="/contact-us" className="text-xs border-b border-black pb-1">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* You May Like */}
        <section className="border-t border-zinc-200 p-12" aria-label="You may also like">
          <h2 className={`${ekate.className} text-center text-4xl mb-13 z-20 md:mb-10`}>
            You may Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentProduct.sizes
              .slice(0, 3)
              .filter((item: PerfumeSize) => item.slug !== slug)
              .map((item: PerfumeSize) => (
                <PerfumeCard
                  key={item.sku}
                  {...item}
                  name={currentProduct.name}
                  category={category}
                  perfume={perfume}
                />
              ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default Page