import { clientCare, pages } from '@/lib/constants'
import { magdaLig } from '@/lib/font'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowUpLong } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className='relative flex flex-col gap-10 px-6 md:px-10 border-t bg-zinc-100 border-zinc-300 pt-12 overflow-hidden'>
      
      <div className='flex flex-col md:flex-row gap-12 md:gap-10 justify-between'>
        
        <nav className='flex-1'>
          <h5 className='font-bold mb-6 uppercase text-sm tracking-[0.2em]'>Client Care</h5>
          <ul className={`${magdaLig.className} flex flex-col gap-2 text-sm text-stone-900`}>
            {clientCare.map((item, idx) => (
              <li key={idx} className='hover:text-stone-500 transition-colors'>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
            <li className='mt-10 text-[11px] text-stone-500 uppercase tracking-widest'>
              Design & Developed:  
              <Link className='underline text-stone-800 italic font-medium' href={"https://scrupulous.vercel.app"}>
                Scrupulous
              </Link>
            </li>
          </ul>
        </nav>

        <nav className='flex-1'>
          <h5 className='font-bold mb-6 uppercase text-sm tracking-[0.2em]'>Navigation</h5>
          <ul className={`${magdaLig.className} flex flex-col gap-2 text-sm text-stone-900`}>
            {pages.map((item, idx) => (
              <li key={idx} className='hover:text-stone-500 transition-colors'>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex-[2] flex flex-col md:items-end'>
          <div className='w-full md:max-w-sm'>
            <h5 className='font-bold mb-5 uppercase text-xs tracking-[0.2em] md:text-right'>Instagram</h5>
            <div className='flex mb-2'>
              <div className='relative w-full aspect-[3/4] overflow-hidden'>
                <Image src={"/men.jpg"} alt='men' fill className='object-cover md:grayscale hover:grayscale-0 transition-all' />
              </div>
              <div className='relative w-full aspect-[3/4] overflow-hidden'>
                <Image src={"/women.jpg"} alt='women' fill className='object-cover md:grayscale hover:grayscale-0 transition-all' />
              </div>
              <div className='relative w-full aspect-[3/4] overflow-hidden'>
                <Image src={"/hot.jpg"} alt='hot' fill className='object-cover md:grayscale hover:grayscale-0 transition-all' />
              </div>
            </div>
            <Link href={"https://www.instagram.com/halirperfumery/?__pwa=1"} className='font-bold text-sm tracking-tighter md:text-right block'>@halirperfumery</Link>
          </div>
        </div>
      </div>

      <div className='relative w-full mt-6 -mb-10 lg:-mb-16 select-none pointer-events-none'>
        <Image 
          src={"/halirLogo.png"} 
          alt='halir logo' 
          width={1800} 
          height={600} 
          className='w-full h-auto opacity-90' 
        />
      </div>

      <div className='py-4 text-center border-t border-zinc-200 text-[10px] tracking-[0.3em] text-stone-500 uppercase'>
        <p>All rights reserved &copy; {new Date().getFullYear()} — <Link href={"/"}>Halir Perfumery</Link>  Pakistan</p>
      </div>

      <Link className='absolute animate-bounce p-3 border border-black/40 rounded-full bottom-5 right-5' href={"#start"} >
        <FaArrowUpLong  size={20} />
      </Link>
    </footer>
  )
}

export default Footer