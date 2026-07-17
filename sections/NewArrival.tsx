import MainCard from '@/components/main/MainCard';
import { connectDB } from '@/lib/config/db';
import Perfume from '@/lib/models/ProductSchema';

export const revalidate = 60;

const NewArrival = async () => {

  await connectDB()

  const pastWeek = new Date();
  pastWeek.setDate(pastWeek.getDate() - 7);

  const newArrivals = await Perfume.find({ createdAt: { $gte: pastWeek } })
    .limit(4)
    .lean();

    if(newArrivals.length <= 0){
      return null
    }

  return (
    <section className='bg-white'>
      <h3 className='text-center font-bold uppercase text-3xl sm:text-5xl mb-8 border-t border-b border-zinc-300 py-1.5 '>New Arrivals</h3>
      <div className='flex flex-col p-3 md:p-5 gap-3'>
        {newArrivals.map((item, index) => (
          <MainCard key={index} name={item.name} image={item.mainImage} index={index} slug={item.slug} category={item.categories[0]} />
        ))}
      </div>
    </section>
  )
}

export default NewArrival