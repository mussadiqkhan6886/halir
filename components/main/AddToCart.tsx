'use client';

import { CartItem } from '@/context/CartContext';
import { useCart } from '@/hook/UseCart';
import React, { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const AddToCart = ({name, price, onSale, salePrice, quantity, image, selectedSize, stock, sku, personlized}: CartItem) => {
    const { addToCart } = useCart()
    const [status, setStatus] = useState<Status>('idle')
    const item = { name, price, onSale, salePrice, quantity, image, selectedSize, stock, sku, personlized }
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        setStatus('loading')

        const wasAdded = addToCart(item)
        setStatus(wasAdded ? 'success' : 'error')
        setTimeout(() => setStatus('idle'), 1500)
    }

    const label: Record<Status, string> = {
        idle: 'Add to Cart',
        loading: '',
        success: '✓ Added',
        error: '✗ Failed',
    }

    const colorClass: Record<Status, string> = {
        idle: '',
        loading: '',
        success: 'text-green-600',
        error: 'text-red-600',
    }

    return (
        <button
            disabled={status === 'loading'  || status === "success" || status === "error"}
            onClick={handleClick}
            aria-label={`Add ${name} to cart`}
            className={`disabled:no-underline hover:underline uppercase cursor-pointer transition-colors duration-200 ${colorClass[status]} disabled:cursor-not-allowed w-full whitespace-nowrap`}
        >
            {status === 'loading'
                ? <div className='w-3 h-3 border border-zinc-500 border-t-transparent rounded-full animate-spin' />
                : label[status]
            }
        </button>
    )
}

export default AddToCart