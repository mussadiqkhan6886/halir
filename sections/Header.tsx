import UpperHeader from '@/components/main/UpperHeader'
import Image from 'next/image'
import React from 'react'
import {HiOutlineSearch, HiOutlineShoppingBag} from "react-icons/hi"
import {FaInstagram} from "react-icons/fa"
import { menu } from '@/lib/constants'
import Link from 'next/link'
import { magdaLig } from '@/lib/font'

const Header = () => {
  return (
    <header className=''>

        {/* upper header */}
        <UpperHeader />

        {/* lower header */}
      
      <div className='flex border-zinc-200 border-b'>
        {/* mobile size menu */}
        <div className='flex md:hidden'>
            {/* menu mobile */}
            <div></div>
            {/* search */}
            <div></div>
        </div>

        {/* logo */}
        <div className='border-zinc-200 border-r p-4 flex justify-center items-center'>
            <Image src={"/halirLogo.png"} alt='halir logo image in header' width={120} height={120} />
        </div>

        {/* nav bigger screen */}
        <div className='hidden md:flex flex-col flex-2'>
            {/* search bar */}
            <div className='flex border-zinc-200 border-b'>
                {/* search */}
                <div className='flex pl-5 w-full gap-4 items-center p-3 '>
                    <HiOutlineSearch />
                    <input type='text' placeholder='Search for products' className={`placeholder:${magdaLig.className} ${magdaLig.className} text-sm w-full outline-none `} />
                </div>
                {/* icons */}
                <div className='border-zinc-200 border-l p-2 px-3 flex justify-center items-center'>
                    <FaInstagram />
                </div>  
            </div>
            {/* menu */}
            <div className='text-center p-2'>
                <ul className='flex justify-center items-center gap-7'>
                {menu.map((item, ind) => (
                    <li className='font-[700] hover:border-b-2 border-b-2 transition-all duration-300 border-transparent hover:border-black text-[12px] uppercase' key={ind}><Link href={item.link}>{item.name}</Link></li>
                ))}
                </ul>
            </div>
        </div>

        {/* cart */}
        <div className='flex border-zinc-200 border-l items-center justify-center gap-1 p-2 px-7'>
            <HiOutlineShoppingBag size={26} />
            <p className='font-light text-sm'>(0)</p>
        </div>
      </div>
    </header>
  )
}

export default Header
