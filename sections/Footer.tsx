import { clientCare, pages } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='flex flex-col gap-5 px-10 border-t bg-zinc-100 border-zinc-300 pt-4'>
      <div className='flex gap-10  justify-between'>
        <div>
          <h5 className='font-semibold mb-3 uppercase'>Client Care</h5>
          <div>
            <ul className='flex flex-col gap-2 text-sm text-stone-900'>
              {clientCare.map(item => (
                <li><Link href={item.link}>{item.name}</Link></li>
              ))}
              <li className='mt-4 text-stone-500'>Design & Developed: <Link className='underline text-stone-600 italic' href={"https://scrupulous.vercel.app"}>Scrupulous</Link></li>
            </ul>
          </div>
        </div>
        <div>
          <h5 className='font-semibold mb-3 uppercase'>Pages</h5>
          <div>
            <ul className='flex flex-col gap-2 text-sm text-stone-900'>
              {pages.map(item => (
                <li><Link href={item.link}>{item.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex gap-5'>
          <h5 className='font-semibold uppercase'>Instagram</h5>
          <div>
            <div className='flex'>
              <Image className='w-42 h-50' src={"/men.jpg"} alt='men in footer instagram image' width={300} height={400}  />
              <Image className='w-42 h-50' src={"/women.jpg"} alt='women in footer instagram image' width={300} height={400}  />
              <Image className='w-42 h-50' src={"/hot.jpg"} alt='hot in footer instagram image' width={300} height={400}  />
            </div>
            <p className='font-semibold text-sm mt-1'>@halirperfumery</p>
          </div>
        </div>
      </div>
      <div className='-mb-10'>
        <Image src={"/halirLogo.png"} alt='halir logo in footer' width={1000} height={400} className='w-full h-full object-center object-cover' />
      </div>
      <div className='p-2 text-center border-t border-zinc-300 text-sm text-stone-600 capitalize'>
        <p>All rights reserved &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer
