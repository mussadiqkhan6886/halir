import { hotSellers } from '@/lib/constants'
import { ekate, magdaLig } from '@/lib/font'
import HotSellerCard from '@/components/main/HotSellerCard';
import { connectDB } from '@/lib/config/db';
import Perfume from '@/lib/models/ProductSchema';
import Link from 'next/link';
import { PerfumeType } from '@/type';

export const revalidate = 60;

const HotSellers = async () => {

  await connectDB()

  const res = await Perfume.find({categories: {$in: ["hot-sellers"]}}).limit(4).lean()

  const hotSellers = JSON.parse(JSON.stringify(res))

  return (
    <section className='bg-black py-32 px-6 overflow-hidden relative'>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-9xl lg:text-[20rem] font-black uppercase text-white leading-none">HALIR</h2>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto mb-20 md:mb-32'>
        <h3 className='text-6xl text-center tracking-tighter text-white'>
          <span className={`${ekate.className} mr-5 block capitalize text-5xl sm:text-6xl md:text-7xl leading-0 `}>Favourites</span>
          <span className={` block uppercase text-3xl sm:text-5xl lg:text-6xl`}>popular fragrance.</span>
        </h3>
      </div>

      <div className='max-w-6xl mx-auto flex flex-col gap-10 md:gap-0 relative'>
        {hotSellers.map((item: PerfumeType, index: number) => (
          <HotSellerCard key={index} index={index} {...item} />
        ))}
      </div>

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-900/15 blur-[150px] pointer-events-none rounded-full" />
      <Link className={`${magdaLig.className} text-white text-center text-sm uppercase absolute bottom-8 hover:underline left-1/2 -translate-x-1/2`} href="/collections/hot-sellers">Explore All Hot Sellers</Link>
    </section>  
  )
}

export default HotSellers