'use client';

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ekate } from '@/lib/font'
import React from 'react'
import Link from 'next/link';

interface Props {
    name: string
    image: string
    index: number
}

const MainCard = ({name, image, index}: Props) => {
  return (
    <Link href={"/collections/"}>
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='relative w-full h-[30vh] md:h-[50vh] lg:h-[80vh] xl:h-screen group overflow-hidden bg-zinc-100'
    >
        <Image 
            src={image} 
            alt={name}
            fill 
            priority={index < 2}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className='object-cover object-center lg:grayscale group-hover:grayscale-0 transition-all duration-[1.2s] ease-in-out group-hover:scale-105'
        />

       
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />

        <div className='absolute inset-0 flex items-center justify-center p-4'>
            <motion.h4 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
               
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-white text-3xl sm:text-5xl md:text-8xl font-bold tracking-tighter uppercase text-center drop-shadow-2xl"
            >
                <span className={`${ekate.className} lowercase text-2xl sm:text-3xl md:text-5xl block mb-5 md:-mb-6 opacity-90`}>
                    the 
                </span>
                 { name}
            </motion.h4>
        </div>
    </motion.div>
    </Link>
  )
}

export default MainCard