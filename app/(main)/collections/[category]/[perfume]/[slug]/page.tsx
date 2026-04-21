import { magdaLig } from '@/lib/font'
import Link from 'next/link'
import React from 'react'

const page = async ({params}: {params: Promise<{category: string, perfume: string, slug: string}>}) => {
  const {category, perfume, slug} = await params

  return (
    <main className='bg-light flex flex-col'>
      <section>
        <section className='border-l border-zinc-200'>
          {/* breadcrumps */}
          <div className={`${magdaLig.className}  pt-3 flex gap-1 items-center text-sm`}>
            <Link href={"/"}>Home</Link>
            <span>/</span>
            <Link className='capitalize hover:underline' href={`/${category}`}>{category.replace("-", " ")}</Link>
            <span>/</span>
            <Link className='capitalize hover:underline' href={`/${category}/${perfume}`}>{perfume.replace("-", " ")}</Link>
            <span>/</span>
            <Link className='capitalize hover:underline' href={`/${category}/${perfume}/${slug}`}>{slug.replace("-", " ")}</Link>
          </div>
          <div>
            {/* side images */}
            <div></div>
            {/* main image */}
            <div></div>
          </div>
        </section>
        <section className='border-r border-zinc-200'>
          <div>
            {/* name */}
            <div></div>
            {/* price */}
            <div></div>
          </div>
          <div>
            <div>
              <p>Size:</p>
              <div></div>
            </div>
            <div>
              <p>Quantity:</p>
              <div>
                <button>-</button>
                <p>0</p>
                <button>+</button>
              </div>
            </div>
            <div>
              <p>For:</p>
              <input type="text" placeholder='personalize here max (23 words)' maxLength={23} />
            </div>
          </div>
          <div className='border-b border-zinc-200'>
            <button>Add to Cart</button>
            <p>Enjoy free gift with every perfume</p>
          </div>
          {/* description */}
          <div className='border-b border-zinc-200'>
            <p>{}</p>
          </div>
          {/* ingredients */}
          <div className='border-b border-zinc-200'>

          </div>
          {/* not sure add sameple to cart */}
          <div className='border-b border-zinc-200'>

          </div>

          {/* need help */}
          <div>
            <p>Need Help? contact</p>
          </div>
        </section>
      </section>
      {/* you may like */}
      <section>

      </section>
    </main>
  )
}

export default page
