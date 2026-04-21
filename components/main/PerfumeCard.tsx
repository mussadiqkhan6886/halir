import { magdaLig, magdaReg } from '@/lib/font'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    name: string
    label: string
    slug: string
    price: number
    images: string[]
    category: string
    perfume: string
    ml: number
}
const PerfumeCard = ({name, label, slug, price, images, category, perfume, ml }: Props) => {
  return (
    <Link className='block aspect-3/4 border border-zinc-200 text-sm' href={`/collections/${category}/${perfume}/${slug}`}>
      <div className='relative aspect-square'>
        <Image src={images[0]} alt={name + "Perfume Card"} fill className='object-cover object-bottom'  />
      </div>
      <div className='p-1.5 border-b border-zinc-200'>
        <h2 className='font-black text-lg uppercase'>{name}</h2>
      </div>
      <div  className={`${magdaLig.className} p-1.5`}>
        <h3>{label}</h3>
        <h3>{ml > 10 ? "eau de perfum" : "Tester"}</h3>
      </div>
      <div  className={`font-light tracking-tight text-zinc-700 border-t border-zinc-200 p-1.5 flex justify-between text-center`}>
        <button aria-label={`Add ${name} to cart`} className='hover:underline cursor-pointer'>Add to Cart</button>
        <h4 className={magdaReg.className}>{price} PKR</h4>
      </div>
    </Link>
  )
}

export default PerfumeCard
