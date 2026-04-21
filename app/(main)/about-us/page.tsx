import { Metadata } from 'next';
import Image from 'next/image';
import { ekate } from '@/lib/font';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Born from a passion for refined, premium fragrances in Pakistan. Halir crafts luxury scents that act as a personal signature and an invisible expression of identity.',
  openGraph: {
    title: 'About Halir | Crafting Fragrance Identity',
    description: "Discover the vision behind Pakistan's most aesthetic perfumery.",
    images: [{ url: '/hero.png' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'Halir Perfumery',
    description:
      'Premium luxury fragrance brand based in Pakistan specializing in Extrait de Parfum.',
    url: 'https://halir-seven.vercel.app',
    logo: 'https://halir.com/halirLogo.png',
  },
};

export default function Page() {
  return (
    <main className="bg-white md:px-10 py-2">
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="max-w-5xl mx-auto px-6 md:px-12"
        aria-labelledby="about-hero"
      >

        <h1
          id="about-hero"
          style={{background: `URL(${"/story.jpg"})`, backgroundPosition: "center"}}
          className="text-3xl md:text-5xl pb-26 p-5 font-bold uppercase leading-[1.1] tracking-tighter text-light"
        >
          We create not just a perfume,{' '}
          <span className="text-stone-700 italic">but a story</span>{' '}
          that sounds on your skin.
        </h1>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20 mt-10">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">

          {/* Left: pull-quote */}
          <aside className="flex flex-col justify-start pt-1">
            <blockquote className="border-l border-zinc-900 pl-5">
              <p className="text-sm leading-relaxed text-zinc-600 italic">
                "A fragrance is a personal signature an invisible expression
                of identity that leaves a lasting impression."
              </p>
            </blockquote>

            <div className="flex flex-wrap gap-2 mt-10">
              {['Extrait de Parfum', 'Pakistan', 'Luxury', 'Identity'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[9px] uppercase tracking-[0.35em] text-zinc-500 border border-zinc-200 px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </aside>

          {/* Right: prose */}
          <div className="space-y-6 text-zinc-600 text-[15px] leading-[1.85]">
            <p>
              Halir was born from a deep passion for refined, premium fragrances
             a mission to create scents that do more than just linger. We
              believe a fragrance is a{' '}
              <strong className="text-zinc-900 font-semibold">
                personal signature
              </strong>
              , an invisible expression of identity that leaves a lasting
              impression.
            </p>
            <p>
              From the beginning, our vision has been clear: to craft fragrances
              that embody luxury in every detail.
            </p>
            <p>
              At Halir, we focus not only on the scent itself, but on the
              complete sensory experience. Each fragrance is carefully developed
              to deliver depth, character, and longevity, while every bottle is
              designed with a modern touch that reflects true elegance.
            </p>
            <p>
              We believe that premium should be felt before it is even
              experienced in the weight of the glass, the texture of the box,
              and the way it becomes part of your lifestyle.
            </p>
            <p>
              Today, Halir offers a growing range of fragrances for both men and
              women. Our goal is to redefine how fragrance is experienced across
              Pakistan making luxury more{' '}
              <span className="text-zinc-400">
                accessible, refined, and deeply personal.
              </span>
            </p>
            <p className="text-zinc-900 font-semibold text-base">
              We are not just creating perfumes. We are creating identity.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-b border-zinc-100 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x divide-zinc-200">
          {[
            { number: '100%', label: 'Extrait de Parfum concentration' },
            { number: 'PK', label: 'Proudly crafted in Pakistan' },
            { number: '∞', label: 'Fragrances for every identity' },
          ].map(({ number, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center px-6 gap-2"
            >
              <span className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900">
                {number}
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 max-w-[200px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col justify-center items-center  pt-20 pb-10 bg-white select-none">
        <h2
          className={`${ekate.className} text-7xl text-zinc-400 leading-none`}
          aria-hidden="true"
        >
          Halir
        </h2>
      </div>
        <p className="font-bold text-[10px] text-center uppercase tracking-[0.5em] text-zinc-600">
          Where scent becomes identity
        </p>
    </main>
  );
}