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
    stock: number
}

interface Props2 {
  name: string
  label: string
  price: number
  images: string[]
  ml: number
  stock: number
}

const Card = ({name, label, price, images, ml, stock}: Props2) => {
  return (<>
    <div className='relative aspect-square'>
        <Image src={images[0]} alt={name + "Perfume Card"} fill className='object-cover object-bottom'  />
      </div>
      <div className='p-1.5 border-b border-zinc-200'>
        <h2 className='font-black text-lg uppercase  group-hover:underline'>{name}</h2>
      </div>
      <div  className={`${magdaLig.className} p-1.5`}>
        <h3 className='text-xs sm:text-sm'>{label}</h3>
        <h3 className='text-xs sm:text-sm'>{ml > 10 ? "eau de perfum" : "Tester"}</h3>
      </div>
      <div  className={`font-light tracking-tight text-zinc-700 border-t border-zinc-200 p-1.5 flex justify-between text-center`}>
        {stock > 0 ?
          <button aria-label={`Add ${name} to cart`} className='hover:underline cursor-pointer'>Add to Cart</button>
        :
          <button aria-label={`Out of stock ${name}`} className=' cursor-not-allowed'>Out of stock</button>
        }
        <h4 className={magdaReg.className}>{price} PKR</h4>
      </div>
  </>)
}
const PerfumeCard = ({name, label, price, images, ml, category, perfume, slug,stock}: Props) => {
  return (stock > 0 ? 
    <Link className='block group aspect-3/4 border border-zinc-200 text-sm' href={`/collections/${category}/${perfume}/${slug}`}>
      <Card stock={stock} name={name} label={label} price={price} images={images} ml={ml}  />
    </Link>
    : 
    <div className='aspect-3/4 border border-zinc-200 text-sm relative opacity-60'>
      <div className='absolute z-20 text-center py-2 font-black w-full bg-light/80 left-1/2 top-[37%] text-black -translate-x-1/2 -translate-y-1/2'>OUT OF STOCK</div>
      <Card stock={stock} name={name} label={label} price={price} images={images} ml={ml}  />
    </div>
    )
}

export default PerfumeCard
