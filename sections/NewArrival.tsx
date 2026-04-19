'use client';

import { newArrivals } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { ekate } from '@/lib/font'

const NewArrival = () => {
  return (
    <section className='bg-white'>
      <h3 className='text-center font-bold uppercase text-5xl mb-8'>New Arrivals</h3>
      <div className='flex flex-col p-3 md:p-5 gap-3'>
        {newArrivals.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5 }}
            className='relative w-full h-full group overflow-hidden'
          >
            <Image 
              src={item.image} 
              alt={item.name}
              width={1000}
              height={1000}
              priority={index === 0}
              className='object-cover h-full w-full object-center lg:grayscale group-hover:grayscale-0 transition-all duration-[2s] ease-in-out scale-105 group-hover:scale-100'
            />

            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />

            <div className='absolute inset-0 flex items-center justify-center'>
              <motion.h4 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className={`text-white text-3xl sm:text-6xl md:text-8xl font-bold tracking-[ -0.05em] uppercase pointer-events-none drop-shadow-2xl`}
              >
                <span className={`${ekate.className} lowercase text-3xl sm:text-4xl md:text-5xl block text-center -mb-1 md:mb-[-2rem] opacity-80`}>
                  the
                </span>
                {item.name}
              </motion.h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default NewArrival