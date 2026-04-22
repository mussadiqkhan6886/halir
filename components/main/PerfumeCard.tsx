import { magdaLig, magdaReg } from '@/lib/font'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddToCart from './AddToCart'

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
    onSale: boolean
    sku: string
  salePrice: number
}

interface Props2 {
  name: string
  label: string
  price: number
  images: string[]
  ml: number
  stock: number
  onSale: boolean
  salePrice: number
  sku: string
}

const Card = ({name, label, price, images, ml, stock, onSale, salePrice, sku}: Props2) => {
  return (<>
    <div className='relative aspect-square'>
        <Image src={images[0]} alt={name + "Perfume Card"} fill className='object-cover object-bottom'  />
        {onSale && <div className={`${magdaReg.className} w-20 h-7 flex items-center justify-center text-center bg-red-700 text-white uppercase text-sm absolute z-50 top-0 right-0`}>on sale</div>}
      </div>
      <div className='p-1.5 border-b border-zinc-200'>
        <h2 className='font-black text-lg uppercase  group-hover:underline'>{name}</h2>
      </div>
      <div  className={`${magdaLig.className} p-1.5`}>
        <h3 className='text-xs sm:text-sm'>{label}</h3>
        <h3 className='text-xs sm:text-sm'>{ml > 10 ? "eau de perfum" : "Tester"}</h3>
      </div>
      <div className={`font-light tracking-tight text-zinc-700 border-t border-zinc-200 p-1.5 grid grid-cols-4 justify-between text-center items-center place-content-center`}>
        {stock > 0 ?
          <AddToCart name={name} price={price} onSale={onSale} salePrice={salePrice} quantity={1} image={images[0]} selectedSize={ml} stock={stock} sku={sku} />
        :
          <button aria-label={`Out of stock ${name}`} className=' cursor-not-allowed'>Out of stock</button>
        }
       <h4 className={`${magdaReg.className} w-full col-span-3 text-right`}>
          {onSale ? (
            <>
              {salePrice.toLocaleString()} 
              <span className="line-through ml-2 text-xs text-zinc-500">{price.toLocaleString()}</span>
            </>
          ) : (
            price.toLocaleString()
          )} 
          {" "}PKR
        </h4>
      </div>
  </>)
}
const PerfumeCard = ({name, label, price, images, ml, category, perfume, slug,stock, onSale, salePrice, sku}: Props) => {
  return (stock > 0 ? 
    <Link className='block group aspect-3/4 border border-zinc-200 text-sm' href={`/collections/${category}/${perfume}/${slug}`}>
      <Card stock={stock} name={name} label={label} price={price} images={images} ml={ml} onSale={onSale} salePrice={salePrice} sku={sku}  />
    </Link>
    : 
    <div className='aspect-3/4 border border-zinc-200 text-sm relative opacity-60'>
      <div className='absolute z-20 text-center py-2 font-black w-full bg-light/80 left-1/2 top-[37%] text-black -translate-x-1/2 -translate-y-1/2'>OUT OF STOCK</div>
      <Card stock={stock} name={name} label={label} price={price} images={images} ml={ml} onSale={onSale} salePrice={salePrice} sku={sku}  />
    </div>
    )
}

export default PerfumeCard
