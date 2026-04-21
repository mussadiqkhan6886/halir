'use client';

import React, { useState } from 'react';
import { magdaLig } from '@/lib/font';
import { useRouter } from 'next/navigation';

export default function ProductActions({ currentProduct, currentSlug, category, perfume }: any) {
  const [qty, setQty] = useState(1);
  const router = useRouter();

  return (
    <div className='space-y-8'>
      {/* Size Selection - Custom buttons instead of select for luxury feel */}
      <div>
        <p className='text-[10px] font-bold uppercase tracking-widest mb-4'>Select Volume</p>
        <div className='flex gap-3'>
          {currentProduct.sizes.map((s: any) => (
            <button
              key={s.slug}
              onClick={() => router.push(`/collections/${category}/${perfume}/${s.slug}`)}
              className={`px-6 py-3 text-xs font-bold border transition-all ${
                currentSlug === s.slug ? 'border-black bg-black text-white' : 'border-zinc-200 hover:border-zinc-400'
              }`}
            >
              {s.ml}ML
            </button>
          ))}
        </div>
      </div>

      {/* Personalization & Quantity Grid */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='border border-zinc-200 p-4'>
            <p className='text-[9px] uppercase tracking-widest text-zinc-400 mb-2'>Quantity</p>
            <div className='flex items-center justify-between'>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className='hover:text-red-600'>—</button>
                <span className='font-bold text-sm'>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className='hover:text-red-600'>+</button>
            </div>
        </div>
        <div className='border border-zinc-200 p-4'>
            <p className='text-[9px] uppercase tracking-widest text-zinc-400 mb-2'>Engraving / For</p>
            <input 
              type="text" 
              placeholder='Add Name' 
              className='w-full bg-transparent text-xs uppercase font-bold focus:outline-none placeholder:text-zinc-300'
              maxLength={23} 
            />
        </div>
      </div>

      {/* CTA */}
      <button className='w-full bg-black text-white py-6 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-red-700 transition-colors duration-500'>
        Acquire – Add to Collection
      </button>
      <p className={`${magdaLig.className} text-center text-[10px] text-zinc-400 italic uppercase`}>
        A complimentary sample is included with your order
      </p>
    </div>
  );
}