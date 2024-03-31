'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Header: React.FC = () => {
  const path: string = usePathname()
  let [ selected, setSelected ] = useState<string>('')

  useEffect(() => {
    switch(path) {
      case '/':
        setSelected('home')
        break
      case '/portfolio':
        setSelected('portfolio')
        break
      case '/booking':
        setSelected('booking')
        break
      case '/contact':
        setSelected('contact')
        break
      default:
        setSelected('')
        break
    }
    
  },[path])
  
  return (
    <header className="fixed w-full flex h-12 justify-between items-center bg-zinc-900 shadow-md shadow-violet-500/50 z-50">
      <Link href="/" className='h-full'>
        <div className="flex items-center h-full px-4 bg-purple-600">
          <h1 className="text-4xl">Kira.</h1>
        </div>
      </Link>
      <div className="flex items-center space-x-4 h-full px-4 text-xl">
        <Link href="/portfolio">
          <button className={`${selected === 'portfolio' ? 'btn-selected' : ''} btn btn-hover`}>Portfolio</button>
        </Link>
        <Link href="/booking">
          <button className={`${selected === 'booking' ? 'btn-selected' : ''} btn btn-hover`}>Booking</button>
        </Link>
        <Link href="/contact">
          <button className={`${selected === 'contact' ? 'btn-selected' : ''} btn btn-hover`}>Contact</button>
        </Link>
      </div>
    </header>
  )
}

export default Header