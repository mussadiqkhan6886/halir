'use client';

import { menu } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'
import { AnimatePresence, motion, Variants } from "framer-motion"

const Menu = () => {
  // Animation Variants
  const containerVariants: Variants = {
    hidden: { 
      height: 0, 
      opacity: 0,
      transition: {
        when: "afterChildren", // Closes items before the height shrinks
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      height: "100vh", 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0], // Custom cubic-beizer for a smooth "drop"
        staggerChildren: 0.1, 
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.ul 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Works if wrapped in AnimatePresence in the parent
      className='fixed top-20 left-0 w-full flex flex-col bg-white z-50 overflow-hidden pt-10 px-10 gap-5'
    >
      {menu.map((item, i) => (
        <motion.li 
          variants={itemVariants}
          key={i} 
          className='text-lg font-semibold border-b border-zinc-200 pb-3'
        >
          <Link href={item.link} className="block w-full">
            {item.name}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default Menu