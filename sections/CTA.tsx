import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ekate } from '@/lib/font'

const CTA = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 min-h-[80vh] border-t border-zinc-200'>
      
      <div className='flex flex-col items-center justify-center bg-light p-10 lg:p-20 relative overflow-hidden'>
        <h4 className='uppercase text-[44px] sm:text-6xl lg:px-10 font-medium leading-tight tracking-tight text-center'>Want to be unique?</h4>
      </div>

      <div className='relative h-[80vh]'>
        <Image 
          src="/unique.jpg" 
          alt='Halir unique collection' 
          fill 
          sizes="(max-width: 768px) 100vw, 50vw"
          className='object-cover object-center h-full grayscale-[0.2]' 
        />
        
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

        <div className='absolute flex flex-col justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-sm px-3'>

            <h5 className={`${ekate.className} text-white text-6xl mb-18 md:-mb-1 text-center`}>Order</h5>
            <p className='text-zinc-200 text-sm text-justify max-w-sm mx-auto uppercase leading-relaxed mb-8 tracking-tight'>
                Experience premium, 20hr+ long-lasting scents delivered to your doorstep within 3 days.
            </p>

            <Link 
              href="/collections/all" 
              className='block w-full py-2 text-center text-sm font-light uppercase border border-zinc-300 text-white relative overflow-hidden'
            >
               Order now
            </Link>
        </div>
      </div>
    </section>
  )
}

export default CTA