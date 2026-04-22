'use client';

import { CartItem } from '@/context/CartContext';
import { useCart } from '@/hook/UseCart';
import React, { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const AddToCart = ({name, price, onSale, salePrice, quantity, image, selectedSize, stock, sku}: CartItem) => {
    const { addToCart, cart } = useCart()
    const [status, setStatus] = useState<Status>('idle')

    const item = { name, price, onSale, salePrice, quantity, image, selectedSize, stock, sku }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        setStatus('loading')

        try {
            addToCart(item)

            // Since addToCart uses setCart (async state update),
            // we check on next tick whether the item is in the cart
            setTimeout(() => {
                setStatus((prev) => {
                    const inCart = cart.some(i => i.sku === sku)
                    // item was already in cart OR just added — both are success
                    return inCart ? 'success' : 'error'
                })
                setTimeout(() => setStatus('idle'), 2000)
            }, 50)

        } catch {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 2000)
        }
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
            className={`disabled:no-underline hover:underline cursor-pointer transition-colors duration-200 ${colorClass[status]} disabled:cursor-not-allowed`}
        >
            {status === 'loading'
                ? <div className='w-3 h-3 border border-zinc-500 border-t-transparent rounded-full animate-spin' />
                : label[status]
            }
        </button>
    )
}

export default AddToCart