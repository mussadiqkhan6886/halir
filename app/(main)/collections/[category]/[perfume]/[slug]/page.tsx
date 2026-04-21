import React from 'react'

const page = async ({params}: {params: Promise<{category: string, perfume: string, slug: string}>}) => {
  const {category, perfume, slug} = await params

  return (
    <main className='bg-light'>
      
    </main>
  )
}

export default page
