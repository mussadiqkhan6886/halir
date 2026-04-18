import UpperHeader from '@/components/main/UpperHeader'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className=''>

        {/* upper header */}
        <UpperHeader />

      {/* lower header */}
      
        {/* mobile size menu */}
        <div className='flex md:hidden'>
            {/* menu mobile */}
            <div></div>
            {/* search */}
            <div></div>
        </div>

      {/* logo */}
      <div>
        <Image src={"/halirLogo.png"} alt='halir logo image in header' width={100} height={100} />
      </div>

      {/* nav bigger screen */}
      <div className='hidden md:flex'>
        {/* search bar */}
        <div>
            {/* search */}
            <div>

            </div>
            {/* icons */}
            <div>

            </div>
        </div>
        {/* menu */}
        <div>

        </div>
      </div>

      {/* cart */}
      <div>

      </div>
    </header>
  )
}

export default Header
