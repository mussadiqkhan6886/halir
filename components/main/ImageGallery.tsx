'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  alt: string;
  stock: number
}

export default function ImageGallery({ images, alt, stock }: Props) {
  const [index, setIndex] = useState(0);

  return (  
    <div className="flex flex-col-reverse border-b md:border-0 border-zinc-200 lg:flex-row gap-6 md:gap-3 xl:gap-6">
      
      <div className="flex md:flex-col pl-3 pb-4 md:pb-0 md:pl-0 gap-3 overflow-x-auto lg:overflow-visible no-scrollbar">
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

      <div className="relative flex-grow h-screen  overflow-hidden">
          <div
            key={index}
            className="relative w-full h-full"
          >
            <Image
              src={images[index]}
              alt={alt}
              fill
              priority
              className={`${stock <= 0 ? "opacity-40" : "opacity-100"} object-cover object-bottom`}
            />
            {stock <= 0 && <div className='bg-red-600 text-white w-full text-lg absolute top-0 right-0 text-center font-bold py-7'>OUT OF STOCK</div>}
          </div>
      </div>
    </div>
  );
}