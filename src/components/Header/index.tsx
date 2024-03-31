'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Menu from '../../components/Menu'


const Header: React.FC = () => {
  const path: string = usePathname()
  const [ selected, setSelected ] = useState<string>('')
  const [ width, setWidth ] = useState<number>(0)
  const [ showMenu, setShowMenu ] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
  
    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('onload', handleResize)
      window.addEventListener('resize', handleResize)
    }
  
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('onload', handleResize)
        window.removeEventListener('resize', handleResize)
      }
    }
    setShowMenu(false)
  },[])

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
    setShowMenu(false)
  },[path])

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
  }
  
  return (
    <>
      <header className="fixed w-full flex h-12 justify-between items-center bg-zinc-900 shadow-md shadow-violet-500/50 z-50">
        <Link href="/" className='h-full'>
          <div className="flex items-center h-full px-4 bg-purple-600">
            <h1 className="text-4xl">Kira.</h1>
          </div>
        </Link>
        <div className="flex items-center space-x-4 h-full px-4 text-xl">
          { width > 500 ? (
            <>
              <Link href="/portfolio">
                <button className={`${selected === 'portfolio' ? 'btn-selected' : ''} btn btn-hover`}>Portfolio</button>
              </Link>
              <Link href="/booking">
                <button className={`${selected === 'booking' ? 'btn-selected' : ''} btn btn-hover`}>Booking</button>
              </Link>
              <Link href="/contact">
                <button className={`${selected === 'contact' ? 'btn-selected' : ''} btn btn-hover`}>Contact</button>
              </Link>
            </>
          ) : (
            <div className='max-w-10' onClick={toggleMenu}>
              <Image
                src='menu.svg'
                alt=''
                width={50}
                height={50}
              />
            </div>
          )}
        </div>
      </header>
      { showMenu ? (
        <Menu toggleMenu={toggleMenu} selected={selected} />
      ) : (
        ''
      )}
    </>
  )
}

export default Header