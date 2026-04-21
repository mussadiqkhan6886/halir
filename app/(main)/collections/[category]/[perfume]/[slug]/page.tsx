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
    <main className='bg-white min-h-screen border-x border-zinc-200 max-w-[1440px] mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-12'>
        
        {/* Left: Visuals (7 Columns) */}
        <section className='lg:col-span-7 border-r border-zinc-200 p-6 md:p-12'>
          <nav className={`${magdaLig.className} flex gap-2 mb-12 items-center text-[10px] uppercase tracking-[0.2em] text-zinc-400`}>
            <Link href="/" className='hover:text-black transition-colors'>Atelier</Link>
            <span>/</span>
            <Link href={`/${category}`} className='hover:text-black transition-colors'>{category.replace("-", " ")}</Link>
            <span>/</span>
            <span className='text-zinc-900'>{currentProduct.name}</span>
          </nav>

          <ImageGallery images={sizeData.images} alt={currentProduct.name} />
        </section>

        {/* Right: Details (5 Columns) */}
        <section className='lg:col-span-5 p-6 md:p-12 flex flex-col'>
          <div className='sticky top-32'>
            <header className='mb-10'>
              <h1 className='text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4'>
                {currentProduct.name}
              </h1>
              <p className={`${ekate.className} text-2xl text-red-600`}>
                Rs. {sizeData.price.toLocaleString()}
              </p>
            </header>

            <ProductActions currentProduct={currentProduct} currentSlug={slug} category={category} perfume={perfume} />

            {/* Technical Specifications */}
            <div className='mt-12 space-y-10 border-t border-zinc-100 pt-10'>
              <div>
                <h6 className='text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-zinc-400'>The Scent Profile</h6>
                <p className={`${magdaLig.className} text-zinc-600 leading-relaxed`}>
                  {currentProduct.description}
                </p>
              </div>

              <div className='grid grid-cols-3 gap-4'>
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

              <div className='bg-zinc-50 p-6 flex items-center justify-between group cursor-pointer'>
                <span className='text-[10px] font-bold uppercase tracking-widest'>Need Expert Guidance?</span>
                <Link href="/contact" className='text-xs border-b border-black pb-1'>Contact Concierge</Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Cross-Sell Section */}
      <section className='border-t border-zinc-200 p-12'>
         <h4 className={`${ekate.className} text-4xl mb-10`}>You may also find interest in</h4>
         {/* Insert a simple horizontal product scroll here */}
      </section>
    </main>
  )
}

export default Page