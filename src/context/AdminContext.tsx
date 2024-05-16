'use client'

import { useEffect, createContext, useContext, useState, useMemo, ReactNode, SetStateAction, Dispatch } from 'react'


interface EditDataTypes {
  section: string
  area: string
  input: string
  currentData: string
}

interface AdminContextType {
  showAdmin: boolean
  setShowAdmin: Dispatch<SetStateAction<boolean>>
  currentSelection: string
  setCurrentSelection: Dispatch<SetStateAction<string>>
  editData: EditDataTypes | null
  setEditData: Dispatch<SetStateAction<EditDataTypes | null>>
}


const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider = ({ children }: {children: ReactNode}) => {
  const [ showAdmin, setShowAdmin ] = useState<boolean>(false)
  const [ currentSelection, setCurrentSelection ] = useState<string>('')
  const [ editData, setEditData ] = useState<EditDataTypes | null>(null)

  const values = {
    showAdmin, 
    setShowAdmin, 
    currentSelection, 
    setCurrentSelection,
    editData,
    setEditData,
  }
  
  return (
    <AdminContext.Provider value={values}>
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