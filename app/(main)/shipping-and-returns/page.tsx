import { Metadata } from 'next'
import Script from 'next/script'
import React from 'react'
import { ekate, magdaLig } from '@/lib/font'
import Link from 'next/link'

const BASE_URL = "https://www.halirperfumerypk.com"

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description:
    'Halir offers free shipping on all orders across Pakistan. Learn about our delivery timelines, return policy, exchange process, and studio pickup in Karachi.',
  alternates: {
    canonical: `${BASE_URL}/shipping-and-returns`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Shipping & Returns | Halir',
    description:
      'Free shipping on all orders. Returns accepted within 10 days. Studio pickup available in Islamabad.',
    url: `${BASE_URL}/shipping-and-returns`,
    type: 'website',
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
      name: 'Shipping & Returns',
      item: `${BASE_URL}/shipping-and-returns`,
    },
  ],
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Shipping & Returns — Halir',
  url: `${BASE_URL}/shipping-and-returns`,
  description:
    'Halir shipping policy: free delivery on all orders, 4–6 working days nationwide. Returns accepted within 10 days in original packaging.',
  inLanguage: 'en-PK',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Halir',
    url: BASE_URL,
  },
  breadcrumb: breadcrumbSchema,
  dateModified: new Date().toISOString().split('T')[0],
}

// Shipping details as structured data — helps Google show rich snippets
const shippingSchema = {
  '@context': 'https://schema.org',
  '@type': 'ShippingDeliveryTime',
  handlingTime: {
    '@type': 'QuantitativeValue',
    minValue: 1,
    maxValue: 2,
    unitCode: 'DAY',
  },
  transitTime: {
    '@type': 'QuantitativeValue',
    minValue: 4,
    maxValue: 6,
    unitCode: 'DAY',
  },
}
// ── Page ─────────────────────────────────────────────────────────────────────
const ServiceProtocol = () => {
  return (
    <>
      <Script
        id="schema-breadcrumb-shipping"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="schema-webpage-shipping"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="schema-shipping-time"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shippingSchema) }}
        strategy="afterInteractive"
      />

      <main className="bg-light text-zinc-900 py-10 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Semantic breadcrumb — visible to crawlers, hidden visually */}
          <nav aria-label="Breadcrumb" className="sr-only">
            <ol>
              <li><a href="https://www.halirperfumerypk.com">Home</a></li>
              <li><a href="https://www.halirperfumerypk.com/shipping-and-returns">Shipping &amp; Returns</a></li>
            </ol>
          </nav>

          <div className="mb-20 border-b border-zinc-100">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter uppercase">
              Shipping &amp; Returns
            </h1>
          </div>

          <article className={`space-y-24 ${magdaLig.className} text-zinc-600 leading-relaxed text-sm md:text-base`}>

            {/* Section 1: Shipping */}
            <section className="space-y-8" aria-labelledby="delivery-logistics">
              <div className="flex items-center gap-4">
                <h2 id="delivery-logistics" className="text-zinc-900 font-bold uppercase tracking-widest text-xs">
                  01. Delivery Logistics
                </h2>
                <div className="h-px flex-grow bg-zinc-100" aria-hidden="true" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-zinc-900 font-bold text-sm mb-2 uppercase">Domestic Shipping</h3>
                  <p>
                    We offer <strong>Free Standard Shipping</strong> on all orders.
                  </p>
                </div>
                <div>
                  <h3 className="text-zinc-900 font-bold text-sm mb-2 uppercase">Timeline</h3>
                  <p>
                    Deliveries typically arrive within 4–6 working days. Please note that while
                    we strive for speed, these are estimates.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Returns & Exchanges */}
            <section className="space-y-8" aria-labelledby="returns-exchanges">
              <div className="flex items-center gap-4">
                <h2 id="returns-exchanges" className="text-zinc-900 font-bold uppercase tracking-widest text-xs">
                  02. Returns &amp; Exchanges
                </h2>
                <div className="h-px flex-grow bg-zinc-100" aria-hidden="true" />
              </div>

              <p>
                We accept returns of non-damaged, significantly unused perfume bottles in their
                original packaging within <strong>10 days</strong> of purchase.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ul className="space-y-3 list-none" aria-label="Return conditions">
                  <li className="flex gap-3"><span className="text-red-600" aria-hidden="true">/</span> Traceable courier returns are at the customer&apos;s expense.</li>
                  <li className="flex gap-3"><span className="text-red-600" aria-hidden="true">/</span> Delivery charges are non-refundable.</li>
                  <li className="flex gap-3"><span className="text-red-600" aria-hidden="true">/</span> Bundle packs must be returned in full.</li>
                </ul>
                <ul className="space-y-3 list-none" aria-label="Non-returnable items">
                  <li className="flex gap-3"><span className="text-zinc-400" aria-hidden="true">/</span> Sample Sets are non-refundable.</li>
                  <li className="flex gap-3"><span className="text-zinc-400" aria-hidden="true">/</span> &quot;Buy 2 Get 1&quot; deals are final sale.</li>
                  <li className="flex gap-3"><span className="text-zinc-400" aria-hidden="true">/</span> Refunds process within 7 working days.</li>
                </ul>
              </div>
            </section>

            {/* Section 3: Return Address */}
            <section className="bg-black text-white p-8 md:p-12 relative overflow-hidden" aria-labelledby="return-destination">
              <h2 id="return-destination" className="font-bold uppercase tracking-widest text-xs mb-8 text-zinc-500">
                03. Return Destination
              </h2>

              <address className="not-italic space-y-2" itemScope itemType="https://schema.org/PostalAddress">
                <p className="text-xl font-bold tracking-tight" itemProp="name">Halir Perfumes</p>
                <p className="text-zinc-400" itemProp="streetAddress">G-14/4 street 4 House #996</p>
                <p className="text-zinc-400">
                  <span itemProp="addressLocality">Islamabad</span>,{' '}
                  <span itemProp="addressCountry">Pakistan</span>
                </p>
              </address>

              <div className="mt-10 pt-10 border-t border-zinc-800">
                <p className="text-xs tracking-widest uppercase text-zinc-500 mb-4">Concierge Support</p>
                <Link
                  href="tel:+923339941336"
                  className="text-lg font-bold hover:text-zinc-300 transition-colors"
                  aria-label="Call Halir customer support"
                >
                  03339941336
                </Link>
              </div>

              <span
                className={`${ekate.className} absolute -right-4 -bottom-10 text-[12rem] opacity-[0.05] pointer-events-none select-none`}
                aria-hidden="true"
              >
                H
              </span>
            </section>

          </article>
        </div>
      </main>
    </>
  )
}

export default ServiceProtocol