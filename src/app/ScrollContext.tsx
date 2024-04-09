'use client'
 
import { createContext, useContext, useState, useRef, useMemo, Dispatch, SetStateAction } from 'react'

interface ScrollContextType {
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  scrollRef: React.RefObject<HTMLDivElement>
  updatesRef: React.RefObject<HTMLDivElement>
  portfolioRef: React.RefObject<HTMLDivElement>
  bookingRef: React.RefObject<HTMLDivElement>
  contactRef: React.RefObject<HTMLDivElement>
  currentRef: React.MutableRefObject<number>
}
 
export const ScrollContext = createContext<ScrollContextType | null>(null)
 
export const ScrollProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const [ selected, setSelected ] = useState<string>('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const updatesRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const bookingRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef<number>(0)

  const value = useMemo(() => ({
    selected,
    setSelected,
    scrollRef,
    updatesRef,
    portfolioRef,
    bookingRef,
    contactRef,
    currentRef,
  }),[selected])

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

export const useScrollContext = () => {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('No Provider')
  }
  return context
}