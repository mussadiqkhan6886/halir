import { magdaLig, ekate } from '@/lib/font'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductActions from '@/components/main/ProductAction'
import ImageGallery from '@/components/main/ImageGallery'
import PerfumeCard from '@/components/main/PerfumeCard'
import { connectDB } from '@/lib/config/db'
import Perfume from '@/lib/models/ProductSchema'
import { PerfumeNote, PerfumeSize } from '@/type'
import Image from 'next/image'

export const revalidate = 60;

const Page = async ({params}: {params: Promise<{category: string, perfume: string, slug: string}>}) => {
  const {category, perfume, slug} = await params
  await connectDB()

  const res = await Perfume.findOne({"sizes.slug": slug}).lean()

  const currentProduct = JSON.parse(JSON.stringify(res))

  if(!currentProduct) return notFound();
  
  const sizeData = currentProduct.sizes.find((item: PerfumeSize) => item.slug === slug)!

  return (
    <main className='bg-light min-h-screen border-x border-zinc-200 max-w-8xl mx-auto w-full'>
      <section className='grid mx-4 sm:mx-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border border-zinc-200'>       
        <section className='xl:col-span-2 pt-5 md:border-r border-zinc-200 md:pl-3 lg:pl-12'>
          <nav className={`${magdaLig.className} pl-3 md:pl-0 flex gap-2 mb-5 items-center text-[11px] sm:text-sm uppercase text-zinc-500`}>
             <Link href={"/"}>Home</Link>
            <span>/</span>
            <Link className='capitalize hover:text-black hover:underline' href={`collections/${category}`}>{category.replace("-", " ")}</Link>
            <span>/</span>
            <Link className='capitalize hover:text-black hover:underline' href={`collections/${category}/${perfume}`}>{perfume.replace("-", " ")}</Link>
            <span>/</span>
            <Link className='capitalize hover:text-black hover:underline' href={`collections/${category}/${perfume}/${slug}`}>{slug.replaceAll("-", " ")}</Link>
          </nav>
          <div className='flex md:hidden px-3 justify-between items-center'>
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none '>
                {currentProduct.name}
              </h1>
              <h2 className="font-light text-md text-stone-700">
                PKR. {sizeData.onSale ? (
                  <>
                    {sizeData.salePrice.toLocaleString()}
                    <span className="line-through ml-2 text-xs text-zinc-500">
                      {sizeData.price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  sizeData.price.toLocaleString()
                )}  
              </h2>
          </div>
              <p className={`${magdaLig.className} block md:hidden px-3 mb-3 text-xs mt-1`}>{sizeData.ml > 10 ? "Eau de perfum" : "Tester"}</p>
          <ImageGallery images={sizeData.images} stock={sizeData.stock} alt={currentProduct.name} />
        </section>

        <section className='p-3 sm:p-5 pt-8 md:pt-14  flex flex-col'>
          <div className=''>
            <div className='hidden md:flex justify-between items-center'>
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none '>
                {currentProduct.name}
              </h1>
              <h2 className={`font-light text-xl text-stone-700`}>
                 PKR. {sizeData.onSale ? (
                  <>
                    {sizeData.salePrice.toLocaleString()}
                    <span className="line-through ml-2 text-xs text-zinc-500">
                      {sizeData.price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  sizeData.price.toLocaleString()
                )} 
              </h2>
            </div>

            <p className={`${magdaLig.className} mb-8 hidden md:block text-sm mt-2`}>{sizeData.ml > 10 ? "Eau de perfum" : "Tester"}</p>

            <ProductActions name={currentProduct.name} price={sizeData.price} onSale={sizeData.onSale} salePrice={sizeData.salePrice} quantity={1} image={sizeData.images[0]} selectedSize={sizeData.ml} stock={sizeData.stock} sku={sizeData.sku} currentProduct={currentProduct} currentSlug={slug} category={category} perfume={perfume} />

            {/* Technical Specifications */}
            <div className='mt-6 border-t border-zinc-200 pt-7'>
              <div>
                <p className={`${magdaLig.className} pb-3 text-black text-sm`}>
                  {currentProduct.description}
                </p>
              </div>
              <div>
                <p className={`${magdaLig.className} border-t border-zinc-200 py-3 text-black text-sm`}>
                  {currentProduct.tagline}
                </p>
              </div>
              <div>
                <p className={`${magdaLig.className} border-t border-zinc-200 py-3 text-black text-sm`}>
                 <span className='font-medium'>Timing:</span>  {currentProduct.longevity}
                </p>
              </div>

              <div className='grid grid-cols-3 gap-4 border-t border-zinc-200 pt-7 pb-3'>
                {currentProduct.notes.top.map((note: PerfumeNote, i: number) => (
                  <div key={i} className='space-y-4'>
                    <div>
                      <span className='text-[9px] uppercase tracking-widest text-zinc-400 block mb-2'>Top</span>
                      <p className='text-xs font-bold uppercase'>{note.name}</p>
                      <div className="relative aspect-square mt-1">
                        <Image src={note.image} fill alt={note.name} className="object-cover" />
                      </div>
                    </div>
                  </div>
                ))}
                {currentProduct.notes.heart.map((note: PerfumeNote, i: number) => (
                  <div key={i} className='space-y-4'>
                    <div>
                      <span className='text-[9px] uppercase tracking-widest text-zinc-400 block mb-2'>Heart</span>
                      <p className='text-xs font-bold uppercase'>{note.name}</p>
                      <div className="relative aspect-square mt-1">
                        <Image src={note.image} fill alt={note.name} className="object-cover" />
                      </div>
                    </div>
                  </div>
                ))}
                {currentProduct.notes.base.map((note: PerfumeNote, i: number) => (
                  <div key={i} className='space-y-4'>
                    <div>
                      <span className='text-[9px] uppercase tracking-widest text-zinc-400 block mb-2'>Base</span>
                      <p className='text-xs font-bold uppercase'>{note.name}</p>
                      <div className="relative aspect-square mt-1">
                        <Image src={note.image} fill alt={note.name} className="object-cover" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='border-t border-zinc-200 pt-4 flex items-center justify-between '>
                <span className='text-[10px] font-bold uppercase tracking-widest'>Need Help?</span>
                <Link href="/contact-us" className='text-xs border-b border-black pb-1'>Contact Us</Link>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className='border-t border-zinc-200 p-12'>
         <h4 className={`${ekate.className} text-center text-4xl mb-13 z-20 md:mb-10`}>You may Like</h4>
         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {currentProduct.sizes.slice(0,3).filter((item: PerfumeSize) => item.slug !== slug).map((item: PerfumeSize) => (
            <PerfumeCard key={item.sku} {...item} name={currentProduct.name} category={category} perfume={perfume} />
          ))}
         </div>
      </section>
    </main>
  )
}

export default Page