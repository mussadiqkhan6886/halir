import PerfumeCard from '@/components/main/PerfumeCard'
import { perfumes } from '@/lib/constants'
import { magdaLig } from '@/lib/font'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({params}: {params: Promise<{perfume: string, category: string}>}) => {
  const {perfume, category} = await params
  const currentPerfume = perfumes.find(item => item.slug === perfume)
  return (
    <main className='max-w-6xl mx-auto'>
      <section className='bg-zinc-200 max-w-8xl mx-auto'>
        {/* breadcrumps */}
       <div className={`${magdaLig.className} flex gap-1 items-center text-sm`}>
          <Link href={"/"}>Home</Link>
          <span>/</span>
          <Link className='capitalize' href={`/${category}`}>{category.replace("-", " ")}</Link>
          <span>/</span>
          <Link className='capitalize' href={`/${category}/${perfume}`}>{perfume.replace("-", " ")}</Link>
        </div>
        <div>
          <h1>{currentPerfume?.name}</h1>
          <p>{currentPerfume?.description}</p>
        </div>
      </section>
      <section className='relative max-w-6xl mx-auto w-full h-[350px]'>
        <Image src={currentPerfume?.mainImage as string} alt={currentPerfume?.name as string} fill className='object-center object-cover' />
      </section>
      <section className='grid py-24 grid-cols-4 gap-5'>
        {currentPerfume?.sizes.map(item => (
          <PerfumeCard key={item.sku} category={category} perfume={perfume} name={currentPerfume.name} {...item} />
        ))}
      </section>
    </main>
  )
}

export default page
