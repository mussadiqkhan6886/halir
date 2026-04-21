import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { magdaLig } from '@/lib/font'
import { COLLECTIONS } from '@/lib/constants'


const CollectionsPage = () => {
  return (
    <main className="bg-white min-h-screen py-14 px-6 md:px-12">
      <section className="max-w-7xl mx-auto pb-10 md:mb-20">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
          Collections
        </h1>
      </section>

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {COLLECTIONS.map((col, index) => (
          <Link 
            key={col.slug} 
            href={`/collections/${col.slug}`}
            className={`group relative overflow-hidden flex flex-col`}
          >
            {/* Image Container */}
            <div className={`relative w-full aspect-square md:aspect-[3/4] overflow-hidden bg-zinc-100`}>
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-[0.5]"
              />
              
              <div className="absolute top-6 left-6 z-20">
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
              
              <div className="pt-4 flex items-center gap-2 overflow-hidden">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Shop Collection</span>
                <div className="h-[1px] w-8 bg-black transform translate-x-[-10px] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}

export default CollectionsPage