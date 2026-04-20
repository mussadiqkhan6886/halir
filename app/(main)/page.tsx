import Collections from '@/sections/Collections'
import CTA from '@/sections/CTA'
import FAQ from '@/sections/FAQ'
import Gallery from '@/sections/Gallery'
import Hero from '@/sections/Hero'
import HotSellers from '@/sections/HotSellers'
import NewArrival from '@/sections/NewArrival'
import Reviews from '@/sections/Reviews'
import Story from '@/sections/Story'
import WhyUs from '@/sections/WhyUs'
import React from 'react'

const Home = () => {
  return (
    <main className='overflow-x-hidden'>
      <Hero />
      <Story />
      <Collections />
      <NewArrival />
      <HotSellers />
      <WhyUs />
      {/* <Gallery /> */}
      <Reviews />
      <FAQ />
      <CTA />
    </main>
  )
}

export default Home
