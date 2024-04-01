import { useState, useEffect, ReactNode } from 'react'
import Image from 'next/image'

import Link from 'next/link'

interface MenuProps {
  selected: string
  toggleMenu: any
}

const Menu: React.FC<MenuProps> = ({ selected, toggleMenu }) => {


  return (
    <>
      <div className='absolute top-0 left-0 w-screen h-screen bg-gray-900 opacity-50 z-20' onClick={toggleMenu}>
      </div>
      <div className='fixed top-12 right-0 w-1/2 rounded-bl-lg flex flex-col justify-center items-center text-2xl bg-gray-900 overflow-auto z-40'>
        <>
          <Link href="/">
            <button className={`${selected === 'home' ? 'btn-selected' : ''} py-4`}>Home</button>
          </Link>
          <Link href="/portfolio">
            <button className={`${selected === 'portfolio' ? 'btn-selected' : ''} py-4`}>Portfolio</button>
          </Link>

          <Link href="/portfolio">
            <button className="py-2 text-lg opacity-60">Tattoo</button>
          </Link>
          <Link href="/portfolio">
            <button className="py-2 text-lg opacity-60">Illustration</button>
          </Link>
          <Link href="/portfolio">
            <button className="py-2 text-lg opacity-60">Painting</button>
          </Link>
          <Link href="/portfolio">
            <button className="py-2 text-lg opacity-60">Other</button>
          </Link>
          
          <Link href="/booking">
            <button className={`${selected === 'booking' ? 'btn-selected' : ''} py-4`}>Booking</button>
          </Link>
          <Link href="/contact">
            <button className={`${selected === 'contact' ? 'btn-selected' : ''} py-4`}>Contact</button>
          </Link>
        </>
      </div>
    </>
  )
}

export default Menu