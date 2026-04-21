import { perfumes } from '@/lib/constants'
import { magdaLig, ekate } from '@/lib/font'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductActions from '@/components/main/ProductAction'
import ImageGallery from '@/components/main/ImageGallery'

const Page = async ({params}: {params: Promise<{category: string, perfume: string, slug: string}>}) => {
  const {category, perfume, slug} = await params
  const currentProduct = perfumes.find(item => item.sizes.find(p => p.slug === slug))

  if(!currentProduct) return notFound();
  
  const sizeData = currentProduct.sizes.find(item => item.slug === slug)!

  return (
    <main className='bg-light min-h-screen border-x border-zinc-200 max-w-8xl mx-auto'>
      <section className='grid mx-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border border-zinc-200'>       
        <section className='xl:col-span-2 pt-5 md:border-r border-zinc-200 md:pl-3 lg:pl-12'>
          <nav className={`${magdaLig.className} pl-3 md:pl-0 flex gap-2 mb-5 items-center text-sm uppercase text-zinc-500`}>
             <Link href={"/"}>Home</Link>
            <span>/</span>
            <Link className='capitalize hover:text-black hover:underline' href={`collections/${category}`}>{category.replace("-", " ")}</Link>
            <span>/</span>
            <Link className='capitalize hover:text-black hover:underline' href={`collections/${category}/${perfume}`}>{perfume.replace("-", " ")}</Link>
            <span>/</span>
            <Link className='capitalize hover:text-black hover:underline' href={`collections/${category}/${perfume}/${slug}`}>{slug.replaceAll("-", " ")}</Link>
          </nav>

          <ImageGallery images={sizeData.images} alt={currentProduct.name} />
        </section>

        <section className='p-5 pt-14 md:border-r border-zinc-200 flex flex-col'>
          <div className=''>
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none '>
                {currentProduct.name}
              </h1>
              <p className={`font-light text-xl text-stone-700`}>
                PKR. {sizeData.price.toLocaleString()}
              </p>
            </div>

            <p className={`${magdaLig.className} mb-8 text-sm mt-2`}>{sizeData.ml > 10 ? "Eau de perfum" : "Tester"}</p>

            <ProductActions currentProduct={currentProduct} currentSlug={slug} category={category} perfume={perfume} />

            {/* Technical Specifications */}
            <div className='mt-6 space-y-6 border-t border-zinc-200 pt-8'>
              <div>
                <p className={`${magdaLig.className} text-black text-sm`}>
                  {currentProduct.description}
                </p>
              </div>

              <div className='grid grid-cols-3 gap-4 border-t border-zinc-200 pt-8'>
                {currentProduct.notes.top.map((note, i) => (
                  <div key={i} className='space-y-4'>
                    <div>
                      <span className='text-[9px] uppercase tracking-widest text-zinc-400 block mb-2'>Top</span>
                      <p className='text-xs font-bold uppercase'>{note.name}</p>
                    </div>
                  </div>
                ))}
                {currentProduct.notes.heart.map((note, i) => (
                  <div key={i} className='space-y-4'>
                    <div>
                      <span className='text-[9px] uppercase tracking-widest text-zinc-400 block mb-2'>Heart</span>
                      <p className='text-xs font-bold uppercase'>{note.name}</p>
                    </div>
                  </div>
                ))}
                {currentProduct.notes.base.map((note, i) => (
                  <div key={i} className='space-y-4'>
                    <div>
                      <span className='text-[9px] uppercase tracking-widest text-zinc-400 block mb-2'>Base</span>
                      <p className='text-xs font-bold uppercase'>{note.name}</p>
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
         <h4 className={`${ekate.className} text-center text-4xl mb-10`}>You may Like</h4>
         {/* Insert a simple horizontal product scroll here */}
      </section>
    </main>
  )
}

export default Page