import PerfumeCard from '@/components/main/PerfumeCard'
import { perfumes } from '@/lib/constants'
import { magdaLig } from '@/lib/font'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const page = async ({params}: {params: Promise<{perfume: string, category: string}>}) => {
  const {perfume, category} = await params
  const currentPerfume = perfumes.find(item => item.slug === perfume)

  if(!currentPerfume) return notFound();
  
  return (
    <main className='max-w-6xl pb-3 mx-auto'>
      <section className='bg-light px-4 lg:px-0'>
        {/* breadcrumps */}
       <nav className={`${magdaLig.className}  pt-3 flex gap-1 items-center text-sm`}>
          <Link href={"/"}>Home</Link>
          <span>/</span>
          <Link className='capitalize hover:underline' href={`/${category}`}>{category.replace("-", " ")}</Link>
          <span>/</span>
          <Link className='capitalize hover:underline' href={`/${category}/${perfume}`}>{perfume.replace("-", " ")}</Link>
        </nav>
        <div className='py-3'>
          <h1 className='uppercase font-black tracking-wide text-2xl md:text-xl'>{currentPerfume?.name}</h1>
          <p className={`${magdaLig.className} text-stone-600 text-sm`}>{currentPerfume?.description}</p>
        </div>
      </section>
      <section className='relative max-w-6xl mx-auto w-full h-[250px] md:h-[350px]'>
        <Image src={currentPerfume?.mainImage as string} alt={currentPerfume?.name as string} fill className='object-center object-cover' />
        <h2 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-black uppercase text-xl md:text-2xl'>{currentPerfume?.name}</h2>
      </section>
      <section className='grid py-24 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-5'>
        {currentPerfume?.sizes.map(item => (
          <PerfumeCard key={item.sku} category={category} perfume={perfume} name={currentPerfume.name} {...item} />
        ))}
      </section>
    </main>
  )
}

export default page
