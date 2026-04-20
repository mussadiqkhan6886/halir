'use client';

import Image from 'next/image';
import React, { useState } from 'react'
import { FiX } from 'react-icons/fi';

const Cart = ({setIsCartOpen}: {setIsCartOpen: (b: boolean) => void}) => {
    const [cart, setCart] = useState(1)
  return (
    <div className='absolute bg-white shadow-xl top-20 right-10 min-w-[280px] min-h-[200px]'>
      <div className='flex justify-between items-center mb-10 border-b border-zinc-200 p-3'>
        <h5 className='uppercase font-bold text-sm'>My cart</h5>
        <button className='cursor-pointer' onClick={() => setIsCartOpen(false)}>
            <FiX  />
        </button>
      </div>
     {cart == 0 ?
        <div className='p-2'>
            <h6 className='font-semibold text-center'>CART IS EMPTY</h6>
        </div>
     : (
        <>
        <div>
            <div>
                <Image src={"/men.jpg"} alt='cart' width={200} height={200} />
            </div>
            <div>
                <div>
                    <h6>VIOLETTE 30</h6>
                    <p>Perfume</p>
                </div>
                <div>   
                    <p>Price: <span>2500 PKR</span></p>
                    <p>Size: <span>50ml</span></p>
                    <p>Quantity: <button>-</button><span>1</span><button>+</button></p>
                </div>
            </div>
        </div>
        <div>
            <div>
                <p>Sub total:</p>
                <p>PKR 2500</p>
            </div>
            <div>
                <button>CHECKOUT</button>
            </div>
        </div>
        </>
     )}
    </div>
  )
}

export default Cart
