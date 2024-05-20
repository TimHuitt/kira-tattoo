'use client'

import { createContext, useContext, useState, useMemo, ReactNode, SetStateAction, Dispatch } from 'react'


interface EditDataType {
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
  editData: EditDataType | null
  setEditData: Dispatch<SetStateAction<EditDataType | null>>
}


const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider = ({ children }: {children: ReactNode}) => {
  const [ showAdmin, setShowAdmin ] = useState<boolean>(false)
  const [ currentSelection, setCurrentSelection ] = useState<string>('')
  const [ editData, setEditData ] = useState<EditDataType | null>(null)

  const values = useMemo(() => ({
    showAdmin,
    setShowAdmin,
    currentSelection,
    setCurrentSelection,
    editData,
    setEditData,
  }), [showAdmin, currentSelection, editData])
  
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