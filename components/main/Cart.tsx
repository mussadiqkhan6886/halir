'use client';

import Image from 'next/image';
import React, { useState } from 'react'
import { FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { magdaLig, magdaReg } from '@/lib/font';

const Cart = ({ setIsCartOpen }: { setIsCartOpen: (b: boolean) => void }) => {
    const [cart, setCart] = useState(1)

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className='fixed md:absolute bg-white shadow-2xl top-0 md:top-20 right-0 md:right-10 w-full md:w-[420px] h-screen md:h-auto md:min-h-[300px] z-[999] flex flex-col'
        >
            {/* Header */}
            <div className='flex justify-between items-center border-b border-zinc-100 p-6'>
                <h5 className='uppercase font-bold text-md'>My Cart</h5>
                <button 
                    className='p-2 hover:bg-zinc-50 rounded-full transition-colors cursor-pointer' 
                    onClick={() => setIsCartOpen(false)}
                >
                    <FiX size={18} />
                </button>
            </div>

            {cart === 0 ? (
                <div className='flex-grow flex flex-col items-center justify-center p-10 py-20'>
                    <h6 className='font-bold text-zinc-400 tracking-widest uppercase'>The cart is empty</h6>
                    <button 
                        onClick={() => setIsCartOpen(false)}
                        className='mt-4 text-[10px] underline uppercase tracking-widest text-zinc-500 hover:text-black'
                    >
                        Continue Exploring
                    </button>
                </div>
            ) : (
                <div className='flex flex-col h-full'>
                    <div className='p-6 flex-grow overflow-y-auto max-h-[60vh] md:max-h-[450px]'>
                        <div className='flex gap-5 border-b border-zinc-50 pb-6 mb-6'>
                            <div className='relative w-24 h-30 flex-shrink-0 bg-zinc-50 overflow-hidden'>
                                <Image 
                                    src="/men.jpg" 
                                    alt='cart product' 
                                    fill 
                                    className='object-cover ' 
                                />
                            </div>
                            
                            <div className='flex flex-col justify-between flex-grow'>
                                <div>
                                    <div className='flex justify-between items-start'>
                                        <h6 className='font-bold text-md tracking-tight uppercase'>VIOLETTE 30</h6>
                                        <button className='text-zinc-400 hover:text-red-500 transition-colors'>
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                    <p className={`${magdaLig.className} text-xs text-zinc-500  tracking-widest `}>Parfum</p>
                                </div>

                                <div className='space-y-1 pr-10 mt-4'>
                                    <div className='flex justify-between text-sm'>
                                        <span className='text-zinc-600'>Size:</span>
                                        <span className={`${magdaLig.className} text-stone-500`}>50ml</span>
                                    </div>
                                    <div className='flex justify-between text-sm'>
                                        <span className='text-zinc-600'>Price:</span>
                                        <span className={`${magdaLig.className} text-stone-500`}>2,500 PKR</span>
                                    </div>
                                </div>

                                {/* Quantity Control */}
                                <div className='flex items-center gap-4 mt-4'>
                                    <div className='flex items-center border border-zinc-200 rounded-sm'>
                                        <button className='p-1 hover:bg-zinc-50'><FiMinus size={12} /></button>
                                        <span className={`${magdaLig.className} px-4 text-xs`}>1</span>
                                        <button className='p-1 hover:bg-zinc-50'><FiPlus size={12} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className='p-6 pb-10 bg-zinc-50 mt-auto'>
                        <div className='flex justify-between items-center mb-6'>
                            <p className='text-xs uppercase tracking-widest'>Sub total</p>
                            <p className={`${magdaReg.className} text-xl tracking-tighter`}>PKR 2,500</p>
                        </div>
                        
                        <button className='w-full bg-black text-white py-5 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-zinc-800 transition-all duration-500 shadow-xl'>
                            Secure Checkout
                        </button>
                        
                        <p className={`${magdaLig.className} text-[9px] text-center text-zinc-400 uppercase mt-4 tracking-widest`}>
                            Tax included. Shipping calculated at checkout.
                        </p>
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default Cart