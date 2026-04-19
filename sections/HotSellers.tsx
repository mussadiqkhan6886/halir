'use client';

import { hotSellers } from '@/lib/constants'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ekate, magdaLig } from '@/lib/font'

const HotSellers = () => {
  return (
    <section className='bg-black py-32 px-6 overflow-hidden relative'>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-9xl lg:text-[20rem] font-black uppercase text-white leading-none">HALIR</h2>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto mb-20 md:mb-32'>
        <h3 className='text-6xl text-center tracking-tighter text-white'>
          <span className={`${ekate.className} mr-5 block capitalize text-5xl sm:text-6xl md:text-7xl leading-0 `}>Favourites</span>
          <span className={` block uppercase text-3xl sm:text-5xl lg:text-6xl`}>popular fragrance.</span>
        </h3>
      </div>

      {/* 3. THE KINETIC CARDS */}
      <div className='max-w-6xl mx-auto flex flex-col gap-10 md:gap-0 relative'>
        {hotSellers.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full md:w-[650px] group transition-all duration-700 ${
              index % 2 === 0 ? 'self-start' : 'self-end md:-mt-40'
            }`}
          >
            {/* The Image Wrapper with a Tilt Effect */}
            <div className={`relative aspect-[16/10] overflow-hidden rounded-sm border border-white/5 group-hover:border-red-600/40 transition-all duration-700 shadow-2xl ${
                index % 2 === 0 ? 'md:rotate-[-2deg] group-hover:rotate-0' : 'md:rotate-[2deg] group-hover:rotate-0'
            }`}>
              <Image 
                src={item.image} 
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className='object-cover md:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out'
              />
              
              {/* Red Scanline Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Float-over Text Labels */}
            <div className={`absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none ${
                index % 2 === 0 ? '-right-4 md:-right-0 text-right' : '-left-4 md:-left-0 text-left'
            }`}>
                <h4 className='text-white text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tighter drop-shadow-2xl'>
                    {item.name}
                </h4>
               
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. FIREY DECORATION */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-600/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-900/10 blur-[150px] rounded-full" />

    </section>
  )
}

export default HotSellers