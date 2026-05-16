import { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import React from 'react'
import { ekate, magdaLig } from '@/lib/font'

const BASE_URL = 'https://halirperfumerypk.com'

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Halir is committed to protecting your privacy. Learn how we collect, use, and safeguard your personal data when you shop our luxury fragrances online in Pakistan.',
  alternates: {
    canonical: `${BASE_URL}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | Halir',
    description:
      'Learn how Halir collects, uses, and protects your personal data. Your privacy is our priority.',
    url: `${BASE_URL}/privacy-policy`,
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
      name: 'Privacy Policy',
      item: `${BASE_URL}/privacy-policy`,
    },
  ],
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy — Halir',
  url: `${BASE_URL}/privacy-policy`,
  description:
    'Halir privacy policy covering data collection, usage, payment security, and your rights under GDPR, CCPA, and Pakistani law.',
  inLanguage: 'en-PK',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Halir',
    url: BASE_URL,
  },
  breadcrumb: breadcrumbSchema,
  dateModified: new Date().toISOString().split('T')[0],
}

// ── Page ─────────────────────────────────────────────────────────────────────
const PrivacyPolicy = () => {
  return (
    <>
      <Script
        id="schema-breadcrumb-privacy"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-webpage-privacy"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        strategy="beforeInteractive"
      />

      <main className="bg-light text-zinc-900 py-10 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Semantic breadcrumb — visible to crawlers, hidden visually */}
          <nav aria-label="Breadcrumb" className="sr-only">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ol>
          </nav>

          <section className="mb-10 border-b border-zinc-100">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter uppercase">
              Privacy Policy.
            </h1>
          </section>

          <article className={`space-y-16 ${magdaLig.className} text-zinc-600 leading-relaxed text-sm md:text-base`}>

            <section aria-labelledby="introduction">
              <h2 id="introduction" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">
                01. Introduction
              </h2>
              <p>
                Welcome to <strong>Halir</strong>. We respect your privacy and are committed to protecting your personal data.
                This policy explains how we handle your information when you visit our studio online at{' '}
                <Link
                  href="/"
                  className="font-bold text-zinc-900 underline underline-offset-2"
                  aria-label="Halir homepage"
                >
                  halirperfumerypk.com
                </Link>{' '}
                and your rights regarding that data.
              </p>
            </section>

            <section aria-labelledby="data-collection">
              <h2 id="data-collection" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">
                02. Data Collection
              </h2>
              <p className="mb-4">We collect only what is necessary to provide you with the Halir experience:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Contact Details:</strong> Name, email, phone number, and shipping address.</li>
                <li><strong>Usage Data:</strong> IP address, browser type, and interaction with our aesthetic visuals.</li>
              </ul>
            </section>

            <section aria-labelledby="use-of-information">
              <h2 id="use-of-information" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">
                03. Use of Information
              </h2>
              <p>Your data allows us to:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Process and deliver your bespoke fragrance orders.</li>
                <li>Notify you of new olfactory releases (if opted in).</li>
                <li>Ensure the security and technical integrity of our platform.</li>
              </ul>
            </section>

            <section aria-labelledby="payments-security">
              <h2 id="payments-security" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">
                04. Payments &amp; Security
              </h2>
              <p>
                Security is paramount. We use third-party payment processors to handle your transactions.
                <strong> Halir does not store your credit card or bank details.</strong>
                
              </p>
            </section>

            <section aria-labelledby="your-rights">
              <h2 id="your-rights" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">
                05. Your Rights
              </h2>
              <p>
                Whether you are in Pakistan, the EU (GDPR), or California (CCPA), you have the right to access,
                correct, or request the deletion of your personal data at any time. Simply reach out to our concierge.
              </p>
            </section>

            <section aria-labelledby="contact" className="bg-zinc-50 p-8 md:p-12 border border-zinc-100">
              <h2 id="contact" className="text-zinc-900 font-bold uppercase tracking-widest text-xs mb-6">
                06. Contact the Concierge
              </h2>
              <p className="mb-6">For any inquiries regarding your data privacy, please contact us directly:</p>
              <div className="space-y-2">
                <p className="text-zinc-900 font-bold">
                  Email:{' '}
                  <Link
                    href="mailto:halirperfumery@gmail.com"
                    className="underline underline-offset-2 hover:text-zinc-600 transition-colors"
                    aria-label="Email Halir privacy support"
                  >
                    halirperfumery@gmail.com
                  </Link>
                </p>
                <p className="text-zinc-900 font-bold">
                  Phone:{' '}
                  <Link
                    href="tel:+923339941336"
                    className="underline underline-offset-2 hover:text-zinc-600 transition-colors"
                    aria-label="Call Halir customer support"
                  >
                    03339941336
                  </Link>
                </p>
              </div>
            </section>

          </article>
        </div>
      </main>
    </>
  )
}

export default PrivacyPolicy