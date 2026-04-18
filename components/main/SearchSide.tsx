'use client';

import React from 'react'
import { FiSearch, FiX } from "react-icons/fi"
import { motion, Variants } from 'framer-motion';
import { magdaLig } from '@/lib/font';

const SearchSide = ({ setIsSearchOpen }: { setIsSearchOpen: (s: boolean) => void }) => {

  const containerVariants: Variants = {
    hidden: {
      x: '-100%', // Start completely off-screen to the left
      transition: {
        duration: 0.4,
        ease: [0.32, 0, 0.67, 0], // Ease in for exit
      }
    },
    visible: {
      x: 0, // Slide into view
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Smooth "out-back" ease for entry
      }
    }
  }

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
     
      className='fixed top-0 left-0 w-full h-screen bg-white z-50 p-4 shadow-2xl'
    >
      <div className='flex items-center gap-5'>
        <div className={`border border-zinc-200 flex items-center gap-4 ${magdaLig.className} px-3 text-sm w-full py-2 outline-none `}>
          <FiSearch />
          <input 
            type="text" 
            placeholder='Search...' 
            className="w-full outline-none bg-transparent"
            autoFocus 
          />
        </div>
        <button onClick={() => setIsSearchOpen(false)} className='cursor-pointer p-1 hover:bg-zinc-100 rounded-full transition-colors'>
          <FiX size={25} />
        </button>
      </div>

      <div className='py-10'>
        <div>
          <h2 className='font-bold mb-3 tracking-wider'>POPULAR SEARCHES</h2>
          <ul className={`${magdaLig.className} text-sm flex gap-1 flex-col`}>
            {['Farenheit', 'Tom Ford', 'Blue d Channel', 'Ambassador'].map((item) => (
              <li key={item} className="cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.aside>
  )
}

export default SearchSide