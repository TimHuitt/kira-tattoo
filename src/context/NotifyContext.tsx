'use client'
 
import { createContext, useContext, useState, useRef, useMemo, Dispatch, SetStateAction } from 'react'

interface NotifyContextType {
  showNotify: boolean
  setShowNotify: Dispatch<SetStateAction<boolean>>
  message: string
  setMessage: Dispatch<SetStateAction<string>>
  status: boolean
  setStatus: Dispatch<SetStateAction<boolean>>
}
 
export const NotifyContext = createContext<NotifyContextType | null>(null)
 
export const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [ showNotify, setShowNotify ] = useState<boolean>(false)
  const [ message, setMessage ] = useState<string>('')
  const [ status, setStatus ] = useState<boolean>(false)
  
  const activateNotify = (message: string, status: string) => {
    console.log(message, status)
  }

  const value = useMemo(() => ({
    showNotify,
    setShowNotify,
    message,
    setMessage,
    status,
    setStatus,
    activateNotify,
  }),[message, showNotify, status])

  return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
}

export const useNotifyContext = () => {
  const context = useContext(NotifyContext)
  if (!context) {
    throw new Error('No Provider')
  }
  return context
}