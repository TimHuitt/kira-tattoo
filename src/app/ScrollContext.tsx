'use client'
 
import { createContext, useRef, useMemo } from 'react'

interface scrollTypes {
  
}
 
export const ScrollContext = createContext({})
 
export default function ScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {

  const portfolioRef = useRef(null)
  const bookingRef = useRef(null)
  const contactRef = useRef(null)
  const currentRef = useRef(null)

  const value = useMemo(() => ({
    portfolioRef,
    bookingRef,
    contactRef,
    currentRef,
  }), [portfolioRef, bookingRef, contactRef, currentRef])



  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}