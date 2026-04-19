import React from 'react'
import { ekate, magdaLig } from '@/lib/font'

const trustPoints = [
  {
    title: "24HR PERSISTENCE",
    desc: "Engineered for longevity. Our high-concentration oils ensure your signature scent stays with you from dawn until long after dusk.",
    tag: "Performance"
  },
  {
    title: "BESPOKE GIFTING",
    desc: "Customizable packaging for gifts and presents. Make every unboxing a personal ceremony for your loved ones.",
    tag: "Service"
  },
  {
    title: "LUXURY BY DESIGN",
    desc: "Every order arrives in a luxurious packaging design, complemented by a curated surprise gift to enhance your experience.",
    tag: "Aesthetic"
  },
  {
    title: "30-DAY ASSURANCE",
    desc: "Shop with total confidence. We offer a 30 days return and exchange policy for a completely risk-free discovery.",
    tag: "Policy"
  }
]

const WhyUs = () => {
  return (
    <section className='bg-zinc-100 py-24 px-6 border-t border-zinc-100'>
      <div className='max-w-7xl mx-auto'>
        
        <div className='flex flex-col md:flex-row justify-between items-end mb-20 gap-6'>
          <div className='max-w-xl'>
            <h3 className='text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none'>
              THE HALIR <br /> 
              <span className={`${ekate.className} text-zinc-700 capitalize font-light`}>standard.</span>
            </h3>
          </div>
          <p className={`${magdaLig.className} text-zinc-500 text-[10px] uppercase tracking-[0.2em]`}>
            Beyond the Scent / Excellence in Every Detail
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200'>
          {trustPoints.map((point, i) => (
            <div 
              key={i}
              className='bg-white p-10 md:p-16 flex flex-col justify-between hover:bg-zinc-50 transition-colors duration-500 min-h-[300px]'
            >
              <div>
                <span className='text-[9px] font-bold tracking-[0.4em] text-red-600 uppercase block mb-6'>
                  {point.tag}
                </span>
                <h4 className='text-3xl font-bold tracking-tight uppercase mb-4'>
                  {point.title}
                </h4>
                <p className={`${magdaLig.className} text-zinc-500 text-sm md:text-base leading-relaxed max-w-md`}>
                  {point.desc}
                </p>
              </div>
              
              <div className='flex justify-end mt-8'>
                <div className='w-2 h-2 bg-zinc-100 group-hover:bg-red-600 transition-colors' />
              </div>
            </div>
          ))}
        </div>

        <div 
          className='mt-12 bg-black text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between rounded-sm'
        >
          <div className='flex items-center gap-6 mb-6 md:mb-0'>
            <div className='w-12 h-12 rounded-full border border-white/20 flex items-center justify-center italic text-xl'>+</div>
            <p className='text-lg md:text-xl font-bold tracking-tight uppercase'>
                A surprise gift awaits in every order
            </p>
          </div>
          <button className={`${magdaLig.className} text-[10px] tracking-[0.4em] uppercase border border-white/20 px-8 py-4 bg-white text-black`}>
            Order Now
          </button>
        </div>

      </div>
    </section>
  )
}

export default WhyUs