import { newArrivals } from '@/lib/constants'
import MainCard from '@/components/main/MainCard';

const NewArrival = () => {
  return (
    <section className='bg-white'>
      <h3 className='text-center font-bold uppercase text-3xl sm:text-5xl mb-8 border-t border-b border-zinc-300 py-1.5 '>New Arrivals</h3>
      <div className='flex flex-col p-3 md:p-5 gap-3'>
        {newArrivals.map((item, index) => (
          <MainCard key={index} name={item.name} image={item.image} index={index} slug={item.slug} category={item.category} />
        ))}
      </div>
    </section>
  )
}

export default NewArrival