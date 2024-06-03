'use client'

import { createContext, useContext, useState, useMemo, ReactNode, SetStateAction, Dispatch, useEffect } from 'react'


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
  processed: boolean
  setProcessed: Dispatch<SetStateAction<boolean>>
  editData: EditDataType | null
  setEditData: Dispatch<SetStateAction<EditDataType | null>>
  isImage: boolean
  setIsImage: Dispatch<SetStateAction<boolean>>
  imageKey: string
  setImageKey: Dispatch<SetStateAction<string>>
  updateFeatured: boolean
  setUpdateFeatured: Dispatch<SetStateAction<boolean>>
  updatePortfolio: boolean
  setUpdatePortfolio: Dispatch<SetStateAction<boolean>>
  updatePosts: boolean
  setUpdatePosts: Dispatch<SetStateAction<boolean>>
}


const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider = ({ children }: {children: ReactNode}) => {
  const [ showAdmin, setShowAdmin ] = useState<boolean>(false)
  const [ currentSelection, setCurrentSelection ] = useState<string>('')
  const [ editData, setEditData ] = useState<EditDataType | null>(null)
  const [ processed, setProcessed ] = useState<boolean>(false)
  const [ isImage, setIsImage ] = useState<boolean>(false)
  const [ imageKey, setImageKey ] = useState<string>(Date.now().toString())
  const [ updateFeatured, setUpdateFeatured ] = useState<boolean>(false)
  const [ updatePosts, setUpdatePosts ] = useState<boolean>(false)
  const [ updatePortfolio, setUpdatePortfolio ] = useState<boolean>(false)

  const values = useMemo(() => ({
    showAdmin,
    setShowAdmin,
    currentSelection,
    setCurrentSelection,
    editData,
    setEditData,
    processed,
    setProcessed,
    isImage,
    setIsImage,
    imageKey,
    setImageKey,
    updateFeatured, 
    setUpdateFeatured,
    updatePortfolio,
    setUpdatePortfolio,
    updatePosts, 
    setUpdatePosts
  }), [showAdmin, currentSelection, editData, processed, isImage, imageKey, updateFeatured, updatePortfolio, updatePosts])
  
  useEffect(() => {
    setShowAdmin(false)
  },[updateFeatured, updatePortfolio, updatePosts])

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