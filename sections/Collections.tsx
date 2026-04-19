'use client';

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { ekate, magdaLig } from '@/lib/font'
import { HiOutlineArrowRight } from "react-icons/hi"

const categories = [
  { title: 'Hot Sellers', src: '/hot.jpg', subtitle: 'The Icons' },
  { title: 'For Him', src: '/men.jpg', subtitle: 'Raw & Bold' },
  { title: 'For Her', src: '/women.jpg', subtitle: 'Pure Elegance' },
]

const Collections = () => {
  return (
    <section className='max-w-[1500px] mx-auto py-20 px-6 min-h-screen flex flex-col'>
      
      <div className='flex justify-between items-end mb-10 border-b border-zinc-100 pb-10'>
        <h3 className='text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter uppercase'>Collections</h3>
        <p className={`${magdaLig.className} hidden lg:block text-zinc-400 max-w-[240px] text-[11px] uppercase tracking-widest leading-relaxed text-right`}>
            A journey through scent, identity, and the aesthetics of presence.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-full'>
        {categories.map((cat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
                duration: 1, 
                delay: index * 0.2, 
                ease: [0.215, 0.61, 0.355, 1] 
            }}
            className='relative group cursor-pointer overflow-hidden aspect-[4/5] md:aspect-auto md:h-[80vh]'
          >
            
            <Image 
              src={cat.src} 
              alt={cat.title} 
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 33vw"
              className='object-cover md:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out' 
            />

        
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700' />

            <div className='absolute inset-0 p-8  flex flex-col justify-end text-white'>
                <span className={`${ekate.className} text-3xl sm:text-4xl text-zinc-300 md:mb-2 transition-all duration-700 transform md:translate-y-8 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100`}>
                    {cat.subtitle}
                </span>

                <div className='flex justify-between items-center border-t border-white/20 pt-5'>
                    <h4 className='text-3xl font-bold tracking-tighter uppercase'>
                        {cat.title}
                    </h4>
                    <div className='w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500'>
                        <HiOutlineArrowRight size={20} className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visual Section Footer */}
      <div className='mt-15 flex flex-col items-center gap-4'>
          <button className={`${magdaLig.className} text-[11px] uppercase tracking-[0.4em] text-zinc-400 hover:text-black transition-colors`}>
             View Collections
          </button>
      </div>
    </section>
  )
}

export default Collections