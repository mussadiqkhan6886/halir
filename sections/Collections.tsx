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
    <section className='max-w-350 mx-auto py-16 px-6 min-h-screen flex flex-col'>
      
      <div className='flex justify-between items-end mb-10 border-b border-zinc-200 pb-8'>
        <h3 className='text-5xl md:text-7xl font-bold tracking-tighter text-center'>COLLECTIONS</h3>
        <p className={`${magdaLig.className} hidden md:block text-zinc-500 max-w-[200px] text-xs uppercase tracking-widest leading-loose text-right`}>
            Explore the diverse world of Halir fragrances
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow'>
        {categories.map((cat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className='relative group cursor-pointer overflow-hidden aspect-[3/4] bg-zinc-100'
          >
            <Image 
              src={cat.src} 
              alt={cat.title} 
              fill
              className='object-cover lg:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1s] ease-out' 
            />

            <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500' />

            <div className='absolute inset-0 p-8 flex flex-col justify-end text-white'>
                <span className={`${ekate.className} text-4xl text-white/70 md:opacity-0 group-hover:opacity-100 md:translate-y-4 group-hover:translate-y-0 transition-all duration-500`}>
                    {cat.subtitle}
                </span>
                <div className='flex justify-between items-center border-t border-white/20 md:border-white/0 group-hover:border-white/20 pt-4 transition-all duration-500'>
                    <h4 className='text-2xl md:text-3xl font-bold tracking-tight uppercase'>{cat.title}</h4>
                    <motion.div 
                        whileHover={{ x: 5 }}
                        className='md:opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                        <HiOutlineArrowRight size={24} />
                    </motion.div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='mt-12 flex justify-center'>
         <button className={`${magdaLig.className} text-[10px] uppercase tracking-[0.3em] border-b border-zinc-200 pb-2 hover:border-black transition-colors`}>
            View All Categories
         </button>
      </div>
    </section>
  )
}

export default Collections