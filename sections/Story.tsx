import { ekate } from '@/lib/font'
import Image from 'next/image'
import React from 'react'

const Story = () => {
  return (
    <section className='bg-light relative max-w-8xl mx-auto'>
      <Image src={"/story2.jpg"} alt='story image' width={300} height={400} className='object-cover object-left lg:h-[300px] w-full lg:w-[250px] lg:absolute lg:left-0 lg:top-[70%] lg:-translate-y-1/2' />
      <Image src={"/story3.jpg"} alt='perfume image' width={200} height={300} className='object-cover object-center hidden lg:block absolute top-0 right-0' />

      <div className='flex justify-center'>
        <h3 className='text-3xl md:text-5xl px-2 pt-7 sm:pt-10 md:pt-20 relative leading-10 tracking-tight'> 
          <span className='inline-block md:ml-30'>WE <span className={`${ekate.className} md:text-8xl text-5xl`}>Create </span> NOT JUST </span>
          <br />
          A PERFUME, <span className='inline md:hidden'>BUT A</span> <span className='hidden md:inline-block ml-28 md:ml-36'>BUT A</span> <br />
           <span className='inline md:hidden'>STORY</span> <span className={`${ekate.className} hidden md:inline-block ml-40 md:ml-60 md:text-8xl text-5xl`}>Story</span> THAT <br className='block md:hidden' /> SOUNDS ON <br className='hidden md:block' /> <span className='md:inline-block right-45 -bottom-3 md:absolute'>
            <span className={`${ekate.className} capitalize md:hidden inline-block mx-2`}>Your</span>
            <span className='hidden md:inline'>YOUR</span> SKIN
           </span>
         </h3>
      </div>
      <div className='grid p-3 text-zinc-700 grid-cols-1 md:grid-cols-2  gap-10 text-sm max-w-3xl mx-auto my-10 text-justify'>
        <div>
          <p>Halir was born from a deep passion for refined, premium fragrances a passion to create scents that do more than just smell good. We believe a fragrance is a personal signature, an invisible expression of identity that leaves a lasting impression.

From the beginning, our vision has been clear:
to craft fragrances that embody luxury in every detail.</p>
        </div>
        <div>
          <p>At Halir, we focus not only on the scent itself, but on the complete experience. Each fragrance is carefully developed to deliver depth, character, and longevity, while every bottle and box is designed with a modern, aesthetic touch that reflects true elegance.

We believe that premium should be felt before it is even experienced in the way it looks, the way it is held, and the way it becomes part of your lifestyle.
</p>
        </div>
        {/* <div className='col-span-2'>
          Today, Halir offers a growing range of fragrances for both men and women, each created to complement individuality and confidence. As we continue to evolve, our vision extends beyond perfumes into a complete world of fragrance.

Our goal is to redefine how fragrance is experienced across Pakistan making luxury more accessible, more refined, and more personal.

At Halir, we are not just creating perfumes.
We are creating identity.
        </div> */}
      </div>
      <div className='flex justify-center gap-3 flex-col items-center my-15'>
        <h3 className={`${ekate.className} mb-10 sm:mb-0 text-4xl`}>
          Halir
        </h3>
        <p className='font-semibold text-sm'>Where scent becomes identity</p>
      </div>
    </section>
  )
}

export default Story
