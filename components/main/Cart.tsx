'use client';

import Image from 'next/image';
import React, { useState } from 'react'
import { FiX } from 'react-icons/fi';

const Cart = () => {
    const [cart, setCart] = useState(false)
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h5>My cart</h5>
        <FiX />
      </div>
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
    </div>
  )
}

export default Cart
