'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      
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

      <div className="relative flex-grow w-screen h-screen  overflow-hidden">
          <div
            key={index}
            className="relative w-full h-full"
          >
            <Image
              src={images[index]}
              alt={alt}
              fill
              priority
              className="object-cover object-bottom"
            />
          </div>
      </div>
    </div>
  );
}