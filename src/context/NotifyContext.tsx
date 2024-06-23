'use client'
 
import { createContext, useContext, useState, useRef, useMemo, Dispatch, SetStateAction, useEffect } from 'react'

interface NotifyContextType {
  showNotify: boolean
  setShowNotify: Dispatch<SetStateAction<boolean>>
  message: string
  setMessage: Dispatch<SetStateAction<string>>
  status: boolean
  setStatus: Dispatch<SetStateAction<boolean>>
  activateNotify: any
}
 
export const NotifyContext = createContext<NotifyContextType | null>(null)
 
export const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [ showNotify, setShowNotify ] = useState<boolean>(false)
  const [ message, setMessage ] = useState<string>('')
  const [ status, setStatus ] = useState<boolean>(false)
  const [ timer, setTimer ] = useState<number>(0)
  
  const activateNotify = (message: string, status: boolean, timer?: number) => {
    console.log(message, status)
    setMessage(message)
    setStatus(status)

    if (timer) {
      setTimer(timer)
    } else {
      setTimer(3000)
    }
    
    setShowNotify(true)
  }
  useEffect(() => {
    setTimeout(() => {
      setShowNotify(false)
    },timer > 100 ? timer : 3000)
  },[timer])

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