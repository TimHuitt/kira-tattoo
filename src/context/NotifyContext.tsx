'use client'
 
import { createContext, useContext, useState, useRef, useMemo, Dispatch, SetStateAction } from 'react'

interface NotifyContextType {
  showNotify: string
  setNotify: Dispatch<SetStateAction<string>>
  messageRef: React.RefObject<HTMLDivElement>
  statusRef: React.RefObject<HTMLDivElement>
}
 
export const NotifyContext = createContext<NotifyContextType | null>(null)
 
export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [ showNotify, setNotify ] = useState<string>('')
  const messageRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const value = useMemo(() => ({
    showNotify,
    setNotify,
    messageRef,
    statusRef
  }),[showNotify])

  return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
}

export const useNotifyContext = () => {
  const context = useContext(NotifyContext)
  if (!context) {
    throw new Error('No Provider')
  }
  return context
}