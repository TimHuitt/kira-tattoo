'use client'
 
import { createContext, useContext, useState, useRef, useMemo, Dispatch, SetStateAction } from 'react'

interface ScrollContextType {
  scrollRef: React.RefObject<HTMLDivElement>
  updatesRef: React.RefObject<HTMLDivElement>
  portfolioRef: React.RefObject<HTMLDivElement>
  bookingRef: React.RefObject<HTMLDivElement>
  contactRef: React.RefObject<HTMLDivElement>
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
}
 
export const ScrollContext = createContext<ScrollContextType | null>(null)
 
export const ScrollProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const scrollRef = useRef<HTMLDivElement>(null)
  const updatesRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const bookingRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const [ current, setCurrent ] = useState(0)

  const value = useMemo(() => ({
    scrollRef,
    updatesRef,
    portfolioRef,
    bookingRef,
    contactRef,
    current,
    setCurrent,
  }),[])

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

export const useScrollContext = () => {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('No Provider')
  }
  return context
}