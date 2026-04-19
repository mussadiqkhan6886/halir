import Collections from '@/sections/Collections'
import FAQ from '@/sections/FAQ'
import Gallery from '@/sections/Gallery'
import Hero from '@/sections/Hero'
import HotSellers from '@/sections/HotSellers'
import Inspiration from '@/sections/Inspiration'
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
      <Inspiration />
      <Gallery />
      <Reviews />
      <FAQ />
    </main>
  )
}

export default Home
