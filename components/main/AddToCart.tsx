'use client';

import { CartItem } from '@/context/CartContext';
import { useCart } from '@/hook/UseCart';
import React from 'react'

const AddToCart = ({name, price, onSale, salePrice, quantity, image, selectedSize, stock, sku}: CartItem) => {

    const {addToCart, cart} = useCart()

    const item = {
        name, price, onSale, salePrice, quantity, image, selectedSize, stock, sku
    }
    
    console.log(cart)
  return (
    <div onClick={e => e.stopPropagation()}>
    <button onClick={() => addToCart(item)} aria-label={`Add ${name} to cart`} className='hover:underline cursor-pointer'>Add to Cart</button>
    </div>
  )
}

export default AddToCart
