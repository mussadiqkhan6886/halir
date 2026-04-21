import { perfumes } from '@/lib/constants'
import React from 'react'

const page = async ({params}: {params: Promise<{perfume: string}>}) => {
  const {perfume} = await params
  const currentPerfume = perfumes.find(item => item.slug === perfume)
  return (
    <div>
      
    </div>
  )
}

export default page
