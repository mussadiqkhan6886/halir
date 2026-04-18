'use client';

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { ekate, magdaLig } from '@/lib/font'
import Link from 'next/link';

const Hero = () => {
  // Master Timeline Animation
  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants : Variants= {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        damping: 18,
        stiffness: 100
      }
    }
  }

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full h-screen bg-[#0c0c0e] overflow-hidden"
    >
      
      {/* 1. Full-Bleed Evocative Background (The Atmosphere) */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 h-[74vh]"
      >
        <Image 
          
          src="/hero.png"
          alt="Halir Perfumery - The Scent of Presence"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center grayscale-[20%] contrast-[1.1] "
        />
      
        <div className="absolute inset-0 z-50 bg-linear-to-t from-amber-900/20  to-black/20" />
      </motion.div>

      <div className="relative h-full flex flex-col justify-end lg:justify-center z-10 px-6 md:px-16 lg:px-24 pb-12">
       
        <motion.h1 variants={itemVariants} className={`text-6xl md:text-8xl leading-[0.9] tracking-tighter text-white mb-8`}>
            <span className={`${ekate.className}`}>Capturing</span><br />
            <span className='uppercase tracking-[-0.1em] '>Emotions</span>.
        </motion.h1>

        {/* The CTA (Integrated) */}
        <motion.div variants={itemVariants} className="flex gap-4 lg:my-3 mb-35 lg:mb-15 items-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black px-8 py-4 uppercase text-[10px] tracking-[0.2em] flex items-center gap-3 font-semibold group rounded-full"  
            >
              EXPLORE COLLECTIONS
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <HiOutlineArrowNarrowRight size={18} className="text-black/60 group-hover:text-black group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.button>
            <Link href="/brand" className={`${magdaLig.className} text-sm text-white/70 border-b border-white/20 pb-1 hover:text-white hover:border-white transition-colors hidden lg:block`}>
              OUR STORY
            </Link>
        </motion.div>
       <motion.div
          initial={{ opacity: 0.3 }} // Start invisible and slightly lower
          whileInView={{ opacity: 1 }} // Animate to full opacity and original position
          viewport={{ 
            once: true,      // Set to false if you want it to re-animate when scrolling back up
            amount: 0.8      // Trigger only when 80% of the element is in view
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] // A smooth "out-expo" curve for a premium feel
          }}
          className='text-white absolute bottom-5 sm:bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 w-full text-center px-4'
        >
          <h2 className='font-semibold text-xl sm:text-3xl md:text-4xl mb-4 tracking-tight uppercase'>
            A perfume that reflects your aesthetic of feelings
          </h2>
          <p className={`${magdaLig.className} text-zinc-400 text-sm tracking-[0.1em] uppercase`}>
            Esthetique is the aesthetics <br />
            contained in scent
          </p>
        </motion.div>
      </div>

      {/* 4. Subtle Page Reveal Animation (Final Touch) */}
      <motion.div
        initial={{ height: "100%" }}
        animate={{ height: "0%" }}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-0 bg-black z-50 pointer-events-none"
      />

    </motion.section>
  )
}

export default Hero