'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { useScrollContext } from '@/app/api/middleware/ScrollContext'
import Menu from '../../components/Menu'


const Header: React.FC = () => {
  const [ showMenu, setShowMenu ] = useState<boolean>(false)
  const [width, setWidth] = useState<number>(1024);
  const { scrollRef, updatesRef, portfolioRef, bookingRef, contactRef, currentRef, selected, setSelected } = useScrollContext() 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth)
    } else {
      setWidth(1024)
    }

    const handleResize = () => {
      setWidth(window.innerWidth)
    }
  
    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('onload', handleResize)
      window.addEventListener('resize', handleResize)
    }
    
    setShowMenu(false)

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('onload', handleResize)
        window.removeEventListener('resize', handleResize)
      }
    }
  },[])

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
  }

  const scrollToLoc = (ref?: React.RefObject<HTMLDivElement>) => {
    if (scrollRef && ref && scrollRef.current && ref.current) {
      const top = ref.current.offsetTop + ref.current.offsetHeight
      scrollRef.current.scrollTo({top,behavior: "smooth"})
    } else if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({top: 0, behavior: "smooth"})
    }
    setShowMenu(false)
  }
  
  return (
    <>
      <header className="fixed w-full flex h-12 justify-between items-center bg-zinc-900 shadow-md shadow-violet-500/50 z-50">
        
          <div className="flex items-center h-full px-4 bg-purple-600 cursor-pointer" onClick={() => scrollToLoc()}>
            <h1 className="text-4xl pointer-events-none user-select-none moto text-lime-300">Kira.</h1>
          </div>
        <div className="flex items-center space-x-4 h-full px-4 text-base lg:text-xl">
          { width > 500 ? (
            <>
              <div onClick={() => scrollToLoc(updatesRef)}>
                <button className={`${selected === 'updates' ? 'btn-selected' : ''} btn btn-hover`}>Updates</button>
              </div>
              <div onClick={() => scrollToLoc(portfolioRef)}>
                <button className={`${selected === 'portfolio' ? 'btn-selected' : ''} btn btn-hover`}>Portfolio</button>
              </div>
              <div onClick={() => scrollToLoc(bookingRef)}>
                <button className={`${selected === 'booking' ? 'btn-selected' : ''} btn btn-hover`}>Contact</button>
              </div>
              {/* <div onClick={() => scrollToLoc(contactRef)}>
                <button className={`${selected === 'contact' ? 'btn-selected' : ''} btn btn-hover`}>Contact</button>
              </div> */}
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
        <Menu 
          toggleMenu={toggleMenu} 
          selected={selected} 
          scrollToLoc={scrollToLoc}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default Header