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
    <Link href={`/collections/${category}/${perfume}/${slug}`}>
      <div className='relative aspect-[3/4]'>
        <Image src={images[0]} alt={name + "Perfume Card"} fill className='object-cover'  />
      </div>
      <div>
        <h2>{name}</h2>
      </div>
      <div>
        <h3>{label}</h3>
        <h3>{ml > 10 ? "eau de perfum" : "Tester"}</h3>
      </div>
      <div>
        <button>Add to Cart</button>
        <h4>{price} PKR</h4>
      </div>
    </Link>
  )
}

export default PerfumeCard
