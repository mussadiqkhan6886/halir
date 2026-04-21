'use client';

import React, { useState, useTransition } from 'react';
import { magdaLig } from '@/lib/font';
import { useRouter } from 'next/navigation';

export default function ProductActions({ currentProduct, currentSlug, category, perfume }: any) {
  const [qty, setQty] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const router = useRouter();

  const handleRoute = (s: { slug: string }) => {
    if (s.slug === currentSlug) return;
    
    setLoadingSlug(s.slug); // Track which specific button is loading
    startTransition(() => {
      router.push(`/collections/${category}/${perfume}/${s.slug}`);
    });
  };

  return (
    <div className='space-y-5'>
      <div>
        <p className='text-[10px] font-bold uppercase tracking-widest mb-3 text-zinc-400'>Select Volume</p>
        <div className='flex gap-3'>
          {currentProduct.sizes.map((s: { slug: string, ml: number }) => {
            const isLoading = isPending && loadingSlug === s.slug;
            const isActive = currentSlug === s.slug;

            return (
              <button
                key={s.slug}
                disabled={isPending}
                onClick={() => handleRoute(s)}
                className={`relative px-6 py-3 text-xs font-bold transition-all min-w-[100px] flex items-center justify-center border ${
                  isActive 
                    ? 'border-black bg-black text-white' 
                    : 'border-zinc-200 hover:border-zinc-400 text-zinc-900'
                } ${isPending ? 'cursor-wait' : 'cursor-pointer'}`}
              >
                {/* Minimal Loader Overlay */}
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-inherit">
                    <div className="w-4 h-4 border-2 border-zinc-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <span>{s.ml}ML</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className='grid grid-cols-3 w-full gap-3'>
        <div className='border border-zinc-200 p-3 col-span-1'>
          <p className='text-[9px] uppercase tracking-widest text-zinc-600 mb-1'>Quantity</p>
          <div className='flex items-center justify-between'>
            <button onClick={() => setQty(Math.max(1, qty - 1))} className='hover:text-red-600 transition-colors'>-</button>
            <span className='font-bold text-sm'>{qty}</span>
            <button onClick={() => setQty(qty + 1)} className='hover:text-red-600 transition-colors'>+</button>
          </div>
        </div>
        <div className='border col-span-2 w-full border-zinc-200 p-3'>
          <p className='text-[9px] uppercase tracking-widest text-zinc-600 mb-1'>Engraving / For</p>
          <input 
            type="text" 
            placeholder='Add Name (max 23 chars)' 
            className={`${magdaLig.className} w-full bg-transparent text-xs uppercase font-bold focus:outline-none placeholder:text-zinc-400`}
            maxLength={23} 
          />
        </div>
      </div>

      <button className='w-full bg-stone-700 text-white py-4 text-sm font-black uppercase tracking-[0.2em] hover:bg-black transition-colors'>
        add to cart
      </button>
      
      <p className={`${magdaLig.className} text-center text-[10px] text-zinc-500 italic uppercase tracking-wider`}>
        A complimentary Gift is included with your order
      </p>
    </div>
  );
}