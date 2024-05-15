'use client'

import { useEffect, createContext, useContext, useState, useMemo, ReactNode, SetStateAction, Dispatch } from 'react'

interface ChildProp {
  children: ReactNode
}

interface ScreenContextType {
  width: number
}

const ScreenContext = createContext<ScreenContextType | undefined>(undefined)

export const ScreenProvider = ({ children }: ChildProp) => {
  const [ width, setWidth ] = useState<number>(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth)
    } else {
      setWidth(1024)
    }

    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    const debounceResize = debounce(handleResize, 300);

    window.addEventListener('resize', debounceResize);
    return () => window.removeEventListener('resize', debounceResize);
  }, []);

  return (
    <ScreenContext.Provider value={{width}}>
      {children}
    </ScreenContext.Provider>
  )
}

function debounce<T extends (...args: any[]) => any>(func: T, timeout: number = 300) {
  let timer: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timer !== null) clearTimeout(timer);

    timer = setTimeout(() => { 
      func(...args)
    }, timeout);
  };
}

export const useScreenContext = (): ScreenContextType => {
  const context = useContext(ScreenContext)
  if (!context) {
    throw new Error('No Provider')
  }
  return context
}