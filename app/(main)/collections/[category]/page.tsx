import MainCard from '@/components/main/MainCard'
import { COLLECTIONS, perfumes } from '@/lib/constants'
import { magdaLig, magdaReg } from '@/lib/font'
import Link from 'next/link'
import React from 'react'

const page = async ({params}: {params: Promise<{category: string}>}) => {
  const {category} = await params
  const currentCollection = COLLECTIONS.find(item => item.slug === category)
  const currentProducts = category === "all" ? perfumes : perfumes.filter(item => item.categories.includes(category))
  return (
    <main className='max-w-6xl mx-auto py-4 w-full'>
      {/* breadcrumps */}
      <section className='px-5 mb-3'>
        <div className={`${magdaLig.className} flex gap-1 items-center text-sm`}>
          <Link href={"/"}>Home</Link>
          <span>/</span>
          <Link className='capitalize' href={`/${category}`}>{currentCollection?.title}</Link>
        </div>
      </section>
      {/* title */}
      <section className='px-5 mb-3'>
        <h1 className='uppercase font-black tracking-wide text-2xl md:text-xl'>{currentCollection?.title}</h1>
        <p className={`${magdaLig.className} text-stone-600 text-sm`}>{currentCollection?.desc}</p>
      </section>
      {/* products */}
      {currentProducts.length > 0 ? 
      (<section className='flex flex-col p-3 md:p-5 gap-3'>
        {currentProducts.map((item, index) => (
          <MainCard key={index} index={index} name={item.name} image={item.mainImage} slug={item.slug} category={category}  />
        ))} </section>)
         : 
         (<section className='flex items-center border-t border-zinc-300 pt-8 justify-center my-10 flex-col'>
            <h2 className='font-semibold uppercase text-lg'>No Perfumes Found</h2>
            <div className='flex gap-3 my-4'>
              <Link className={`${magdaLig.className} border border-zinc-300 text-sm px-6 py-2`} href='/collections/men'>Explore Men</Link>
              <Link className={`${magdaLig.className} border border-zinc-300 text-sm px-6 py-2`} href='/collections/women'>Explore Women</Link>
            </div>
          </section>)}
    </main>
  )
}

export default page
