import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='flex items-center justify-center bg-light border-b border-zinc-500 py-3'>
      <h1 className='font-bold text-3xl uppercase'>
        <Link href={"/"}>Checkout</Link>
      </h1>
    </header>
  )
}

export default Header
