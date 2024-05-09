import { useState, useEffect, ReactNode } from 'react'
import { useScrollContext } from '@/context/ScrollContext'
import Image from 'next/image'

import Link from 'next/link'

interface MenuProps {
  selected: string
  toggleMenu: any
  scrollToLoc: (ref: React.RefObject<HTMLDivElement>) => void
}

const Menu: React.FC<MenuProps> = ({ selected, toggleMenu, scrollToLoc }) => {
  const { updatesRef, portfolioRef, bookingRef, contactRef } = useScrollContext() 

  return (
    <>
      <div className='absolute top-0 left-0 w-screen h-screen bg-gray-900 opacity-50 z-20' onClick={toggleMenu}>
      </div>
      <div className='fixed top-12 right-0 w-1/2 pb-4 rounded-bl-lg flex flex-col justify-center items-center text-2xl bg-gray-900 overflow-auto z-40'>
        <>
          <div onClick={() => scrollToLoc(updatesRef)}>
            <button className={`${selected === 'home' ? 'btn-selected' : ''} py-4`}>Updates</button>
          </div>
          <div onClick={() => scrollToLoc(portfolioRef)}>
            <button className={`${selected === 'portfolio' ? 'btn-selected' : ''} py-4`}>Portfolio</button>
          </div>
          <div onClick={() => scrollToLoc(updatesRef)}>
            <button className="py-2 text-lg opacity-60">Tattoo</button>
          </div>
          <div onClick={() => scrollToLoc(updatesRef)}>
            <button className="py-2 text-lg opacity-60">Illustration</button>
          </div>
          <div onClick={() => scrollToLoc(updatesRef)}>
            <button className="py-2 text-lg opacity-60">Painting</button>
          </div>
          <div onClick={() => scrollToLoc(updatesRef)}>
            <button className="py-2 text-lg opacity-60">Other</button>
          </div>
          <div onClick={() => scrollToLoc(bookingRef)}>
            <button className={`${selected === 'booking' ? 'btn-selected' : ''} py-4`}>Contact</button>
          </div>
          {/* <div onClick={() => scrollToLoc(contactRef)}>
            <button className={`${selected === 'contact' ? 'btn-selected' : ''} py-4`}>Contact</button>
          </div> */}
        </>
      </div>
    </>
  )
}

export default Menu