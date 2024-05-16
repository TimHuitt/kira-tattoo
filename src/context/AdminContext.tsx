'use client'

import { useEffect, createContext, useContext, useState, useMemo, ReactNode, SetStateAction, Dispatch } from 'react'


interface AdminContextType {
  showAdmin: boolean
  setShowAdmin: Dispatch<SetStateAction<boolean>>
  currentSelection: string
  setCurrentSelection: Dispatch<SetStateAction<string>>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider = ({ children }: {children: ReactNode}) => {
  const [ showAdmin, setShowAdmin ] = useState<boolean>(false)
  const [ currentSelection, setCurrentSelection ] = useState<string>('')


  return (
    <AdminContext.Provider value={{showAdmin, setShowAdmin, currentSelection, setCurrentSelection}}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = (): AdminContextType => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('No Provider')
  }
  return context
}