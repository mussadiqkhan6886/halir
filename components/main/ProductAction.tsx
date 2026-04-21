'use client';

import React, { useState } from 'react';
import { magdaLig } from '@/lib/font';
import { useRouter } from 'next/navigation';

export default function ProductActions({ currentProduct, currentSlug, category, perfume }: any) {
  const [qty, setQty] = useState(1);
  const router = useRouter();

  return (
    <div className='space-y-5'>
      <div>
        <p className='text-[10px] font-bold uppercase tracking-widest mb-3'>Select Volume</p>
        <div className='flex gap-3'>
          {currentProduct.sizes.map((s: any) => (
            <button
              key={s.slug}
              onClick={() => router.push(`/collections/${category}/${perfume}/${s.slug}`)}
              className={`px-6 py-3 text-xs font-bold cursor-pointer border transition-all ${
                currentSlug === s.slug ? 'border-black bg-black text-white' : 'border-zinc-200 hover:border-zinc-400'
              }`}
            >
              {s.ml}ML
            </button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-3 w-full gap-3'>
        <div className='border grid-cols-1 border-zinc-200 p-3'>
            <p className='text-[9px] uppercase tracking-widest text-zinc-600 mb-1'>Quantity</p>
            <div className='flex items-center justify-between'>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className='hover:text-red-600'>-</button>
                <span className='font-bold text-sm'>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className='hover:text-red-600'>+</button>
            </div>
        </div>
        <div className='border col-span-2 w-full border-zinc-200 p-3'>
            <p className='text-[9px] uppercase tracking-widest text-zinc-600 mb-1'>Engraving / For</p>
            <input 
              type="text" 
              placeholder='Add Name ( max word 23 )' 
              className={`${magdaLig.className} w-full bg-transparent text-xs uppercase font-bold focus:outline-none placeholder:text-zinc-400`}
              maxLength={23} 
            />
        </div>
      </div>

      <button className='w-full bg-stone-700 text-white py-4 text-md font-black uppercase cursor-pointer'>
        add to cart
      </button>
      <p className={`${magdaLig.className} text-center text-xs text-zinc-500 italic uppercase`}>
        A complimentary Gift is included with your order
      </p>
    </div>
  );
}