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
}
const PerfumeCard = ({name, label, slug, price, images, category, perfume }: Props) => {
  return (
    <Link href={`/collections/${category}/${perfume}/${slug}`}>
      
    </Link>
  )
}

export default PerfumeCard
