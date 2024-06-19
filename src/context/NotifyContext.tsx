'use client'
 
import { createContext, useContext, useState, useRef, useMemo, Dispatch, SetStateAction } from 'react'

interface NotifyContextType {
  showNotify: boolean
  setShowNotify: Dispatch<SetStateAction<boolean>>
  messageRef: React.RefObject<HTMLDivElement>
  statusRef: React.RefObject<HTMLDivElement>
  timerRef: React.RefObject<HTMLDivElement>
}
 
export const NotifyContext = createContext<NotifyContextType | null>(null)
 
export const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [ showNotify, setShowNotify ] = useState<boolean>(false)
  const messageRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<HTMLDivElement>(null)

  const value = useMemo(() => ({
    showNotify,
    setShowNotify,
    messageRef,
    statusRef,
    timerRef
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