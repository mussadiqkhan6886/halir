'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      
      {/* Thumbnails (Left side on Desktop) */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible no-scrollbar">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`relative flex-shrink-0 w-20 h-24 border transition-all duration-500 ${
              index === i ? 'border-black' : 'border-zinc-100 hover:border-zinc-300'
            }`}
          >
            <Image 
              src={img} 
              alt={`${alt} view ${i}`} 
              fill 
              className="object-cover p-1" 
            />
          </button>
        ))}
      </div>

      {/* Main Feature Image */}
      <div className="relative flex-grow aspect-[4/5] bg-zinc-50 overflow-hidden cursor-zoom-in">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={images[index]}
              alt={alt}
              fill
              priority
              className="object-contain p-8 md:p-16 mix-blend-multiply"
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating Perspective Label */}
        <div className="absolute bottom-6 right-6">
           <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-zinc-300 vertical-text">
             Perspective {index + 1} / {images.length}
           </span>
        </div>
      </div>
    </div>
  );
}