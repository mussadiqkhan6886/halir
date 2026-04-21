'use client';

import UpperHeader from '@/components/main/UpperHeader'
import Image from 'next/image'
import React, { useState } from 'react'
import {HiOutlineMenu, HiOutlineSearch, HiOutlineShoppingBag, HiX} from "react-icons/hi"
import {FaInstagram} from "react-icons/fa"
import { menu } from '@/lib/constants'
import Link from 'next/link'
import { magdaLig } from '@/lib/font'
import Menu from '@/components/main/Menu';
import { AnimatePresence } from 'framer-motion';
import SearchSide from '@/components/main/SearchSide';
import Cart from '@/components/main/Cart';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <header className='shadow-md z-40'>

        {/* upper header */}
        <UpperHeader />

        {/* lower header */}
      <div className='flex border-zinc-200 justify-between items-center px-3 lg:border-b'>
        {/* mobile size menu */}
        <div className='flex lg:hidden relative gap-6 items-center'>
            {/* menu mobile */}
            <nav>
                {isMenuOpen ? <button className='cursor-pointer' onClick={() => setIsMenuOpen(false)} >
                    <HiX size={23} />
                </button> : <button className='cursor-pointer' onClick={() => setIsMenuOpen(true)}>
                    <HiOutlineMenu  size={23} />
                </button> }
                <AnimatePresence>
                    {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
                </AnimatePresence>
            </nav>
            {/* search */}
            <div>
                <button className='cursor-pointer' onClick={() => setIsSearchOpen(true)} >
                    <HiOutlineSearch size={20} />
                </button>
                <AnimatePresence>
                    {isSearchOpen && <SearchSide setIsSearchOpen={setIsSearchOpen} />}
                </AnimatePresence>
            </div>
        </div>

        {/* logo */}
        <Link href={"/"} className=' p-4 flex justify-center items-center'>
            <Image src={"/halirLogo.png"} alt='halir logo image in header' width={120} height={120} />
        </Link>

        {/* nav bigger screen */}
        <div className='border-l border-r border-zinc-200  hidden lg:flex flex-col flex-2'>
            {/* search bar */}
            <div className='flex border-zinc-200 lg:border-b'>
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
            <nav className='text-center p-2'>
                <ul className='flex justify-center items-center gap-7'>
                {menu.map((item, ind) => (
                    <li className='font-[700] hover:border-b-2 border-b-2 transition-all duration-300 border-transparent hover:border-black text-[12px] uppercase' key={ind}><Link href={item.link}>{item.name}</Link></li>
                ))}
                </ul>
            </nav>
        </div>

        {/* cart */}
        <div className='flex items-center justify-center gap-1 p-2 px-5 md:px-7 relative'>
            <button className='cursor-pointer' onClick={() => setIsCartOpen(true)}>
                <HiOutlineShoppingBag  size={26} />
            </button>
            <AnimatePresence>
                {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
            </AnimatePresence>
            <p className='font-light text-sm'>(0)</p>
        </div>
      </div>
    </header>
  )
}

export default Header
