import { Metadata } from 'next'
import Script from 'next/script'
import { ekate, magdaLig } from '@/lib/font'
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Read the Terms & Conditions for Halir — Pakistan\'s luxury perfume brand. Understand our purchase policies, intellectual property rights, delivery terms, and governing law.',
  alternates: {
    canonical: 'https://halirperfumerypk.com/terms-and-conditions',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms & Conditions | Halir',
    description:
      'Read the Terms & Conditions for Halir — Pakistan\'s luxury perfume brand.',
    url: 'https://halirperfumerypk.com/terms-and-conditions',
    type: 'website',
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
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Terms & Conditions',
      item: 'https://halirperfumerypk.com/terms-and-conditions',
    },
  ],
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms & Conditions — Halir',
  url: 'https://halirperfumerypk.com/terms-and-conditions',
  description:
    'Terms & Conditions for Halir, Pakistan\'s luxury perfume brand. Covers purchases, intellectual property, delivery, returns, and governing law.',
  inLanguage: 'en-PK',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Halir',
    url: 'https://halirperfumerypk.com',
  },
  breadcrumb: breadcrumbSchema,
  dateModified: new Date().toISOString().split('T')[0],
}

// ── Page ─────────────────────────────────────────────────────────────────────
const TermsAndConditions = () => {
  return (
    <>
      <Script
        id="schema-breadcrumb-terms"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-webpage-terms"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        strategy="beforeInteractive"
      />

      <main className="bg-light text-zinc-900 py-10 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Semantic breadcrumb — visible to crawlers, hidden visually */}
          <nav aria-label="Breadcrumb" className="sr-only">
            <ol>
              <li><a href="https://halirperfumerypk.com">Home</a></li>
              <li><a href="https://halirperfumerypk.com/terms-and-conditions">Terms &amp; Conditions</a></li>
            </ol>
          </nav>

          <div className="mb-10 border-b border-zinc-100">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter uppercase">
              Terms &amp; Condition
            </h1>
          </div>

          <article
            className={`space-y-12 ${magdaLig.className} text-zinc-600 leading-relaxed text-sm md:text-base`}
            itemScope
            itemType="https://schema.org/WebPageElement"
          >
            <section aria-labelledby="acceptance">
              <h2 id="acceptance" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-4">01. Acceptance</h2>
              <p>
                By accessing the <strong>Halir</strong> studio (halirperfumerypk.com), you agree to be bound by these Terms of Service.
                These terms govern your use of our platform and the purchase of our premium fragrances. If you do not
                agree with any part of these terms, we kindly ask you to discontinue use of our services.
              </p>
            </section>

            <section aria-labelledby="purchases">
              <h2 id="purchases" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-4">02. Purchases &amp; Payments</h2>
              <p className="mb-4">
                When making a purchase, you agree to provide accurate and complete information.
                We reserve the right to refuse or cancel any order for reasons including:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Limited product availability or stock depletion.</li>
                <li>Discrepancies in pricing or product descriptions.</li>
                <li>Suspicion of unauthorized or fraudulent transactions.</li>
              </ul>
            </section>

            <section aria-labelledby="ip">
              <h2 id="ip" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-4">03. Intellectual Property</h2>
              <p>
                All aesthetic content, including imagery, custom fonts, brand identity, and the fragrances themselves,
                are the exclusive property of <strong>Halir</strong>. You may not distribute, modify, or use our digital
                assets for commercial gain without express written permission from our studio.
              </p>
            </section>

            <section aria-labelledby="delivery">
              <h2 id="delivery" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-4">04. Delivery &amp; Returns</h2>
              <p>
                We aim for excellence in fulfillment. Standard delivery within Pakistan is typically completed
                within 3 working days. For information regarding our 10hr+ scent longevity guarantee and our
                return protocols, please refer to our dedicated Exchange &amp; Return page.
              </p>
            </section>

            <section aria-labelledby="liability">
              <h2 id="liability" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">05. Limitation of Liability</h2>
              <p>
                Halir provides its services on an &quot;as is&quot; basis. While we strive for perfection in every bottle,
                our total liability is limited to the amount paid for the products purchased. We are not responsible
                for any indirect damages resulting from the use of our website or products.
              </p>
            </section>

            <section aria-labelledby="law" className="bg-zinc-50 p-8 md:p-12 border border-zinc-100">
              <h2 id="law" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">06. Governing Law</h2>
              <p className="mb-6">
                These Terms are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan.
              </p>
              <div className="space-y-2">
                <Link
                  href="mailto:halirperfumery@gmail.com"
                  className="text-zinc-900 font-bold italic underline underline-offset-4 tracking-tighter"
                  aria-label="Contact Halir by email"
                >
                  halirperfumery@gmail.com
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  )
}

export default TermsAndConditions