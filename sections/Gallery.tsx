'use client';

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { ekate } from '@/lib/font'
import { HiOutlineArrowsExpand } from "react-icons/hi"

const galleryItems = [
  { src: '/hot.jpg', span: 'col-span-12 md:col-span-6', aspectRatio: 'aspect-[16/10] md:aspect-auto', label: 'The Bestseller' },
  { src: '/p2.jpg', span: 'col-span-12 md:col-span-6', aspectRatio: 'aspect-[3/4]', label: 'Pure Essence' },
  { src: '/men.jpg', span: 'col-span-12 md:col-span-4', aspectRatio: 'aspect-[16/9] md:aspect-auto md:h-[600px]', label: 'Raw Masculinity' },
  { src: '/women.jpg', span: 'col-span-12 md:col-span-8', aspectRatio: 'aspect-[4/3] md:aspect-auto', label: 'Floral Divinity' },
  { src: '/p.png', span: 'col-span-12', aspectRatio: 'aspect-[16/9]', label: 'Signature Collection' },
]

const Gallery = () => {
  return (
    <section className='bg-zinc-50 py-24 md:py-32 px-4 md:px-10 overflow-hidden'>
      <div className='max-w-[1600px] mx-auto flex flex-col'>
        
        {/* 1. Subtle, Editorial Header */}
        <div className='flex justify-between items-baseline border-b border-zinc-200 pb-10 mb-16'>
          <h3 className='text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.85]'>
            THE <span className={`${ekate.className} text-zinc-300 lowercase font-light ml-8`}>mood.</span>
          </h3>
          <span className='text-[10px] tracking-[0.6em] uppercase text-zinc-400 font-semibold'>Halir Visuals / Vol. 1</span>
        </div>

        {/* 2. BENTO GRID: Defined 12-column structure */}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5 auto-rows-[300px] md:auto-rows-[auto]'>
          
          {galleryItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className={`relative ${item.span} ${item.aspectRatio} group overflow-hidden bg-white border border-zinc-100 rounded-sm shadow-inner`}
            >
              {/* Image with subtle hover blur/grayscale logic */}
              <Image 
                src={item.src} 
                alt={item.label} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className='object-cover grayscale hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-[2s] ease-in-out' 
              />

              {/* Minimal Darkening Overlay (faster than group-hover bg) */}
              <div className='absolute inset-0 bg-black/10 transition-colors duration-1000' />

              {/* 3. "Site of the Day" Micro-interactions */}
              {/* Bottom-left label - slide in */}
              <div className='absolute bottom-6 left-6 flex items-center gap-3 md:opacity-0 group-hover:opacity-100 md:translate-y-4 group-hover:translate-y-0 transition-all duration-500'>
                <div className='h-[1px] w-6 bg-white'></div>
                <h4 className='text-white text-xs tracking-widest uppercase font-semibold'>
                    {item.label}
                </h4>
              </div>

              {/* Top-right expand icon - rotate/reveal */}
              <div className='absolute top-6 right-6 text-white md:opacity-0 group-hover:opacity-100 md:-translate-y-4 group-hover:translate-y-0 md:rotate-90 group-hover:rotate-0 transition-all duration-500'>
                <HiOutlineArrowsExpand size={20} />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Gallery Footer/CTA */}
        <div className='mt-20 flex justify-center'>
            <button className='text-zinc-400 text-[11px] font-bold uppercase tracking-[0.5em] border-b border-zinc-100 hover:border-black hover:text-black transition-all pb-2'>
                Discover the Story Behind each Shot
            </button>
        </div>

      </div>
    </section>
  )
}

export default Gallery