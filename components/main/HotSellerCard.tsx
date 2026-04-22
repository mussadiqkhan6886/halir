'use client';

import React from 'react'
import {motion} from "framer-motion"
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    index: number
    slug: string
    mainImage: string
    name: string
}

const HotSellerCard = ({index, slug, mainImage, name}: Props) => {
  return (
    <motion.div 
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full md:w-[650px] group transition-all duration-700 ${
            index % 2 === 0 ? 'self-start' : 'self-end md:-mt-40'
        }`}
        >
        <Link href={`/collections/hot-sellers/${slug}`} className={`relative block aspect-[16/10] overflow-hidden rounded-sm border border-white/5 group-hover:border-red-600/40 transition-all duration-700 shadow-2xl ${
            index % 2 === 0 ? 'md:rotate-[-2deg] group-hover:rotate-0' : 'md:rotate-[2deg] group-hover:rotate-0'
        }`}>
            <Image 
            src={mainImage} 
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className='object-cover md:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out'
            />
            
            <div className="absolute inset-0 bg-gradient-to-tr from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </Link>

        <div className={`absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none ${
            index % 2 === 0 ? '-right-4 md:-right-0 text-right' : '-left-4 md:-left-0 text-left'
        }`}>
            <h4 className='text-white text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tighter drop-shadow-2xl'>
                {name}
            </h4>
            
        </div>
        </motion.div>
  )
}

export default HotSellerCard
