'use client'

import { createContext, useContext, useState, useMemo, ReactNode, SetStateAction, Dispatch } from 'react'

interface ChildProp {
  children: ReactNode
}

interface modalContextType {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  currentImage: string
  setCurrentImage: Dispatch<SetStateAction<string>>
  showImages: boolean
  setShowImages: Dispatch<SetStateAction<boolean>>
  currentPage: string
  setCurrentPage: Dispatch<SetStateAction<string>>
}

const ModalContext = createContext<modalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: ChildProp) => {
  const [ showModal, setShowModal ] = useState(false)
  const [ currentImage, setCurrentImage ] = useState('')
  const [ showImages, setShowImages ] = useState(false)
  const [ currentPage, setCurrentPage ] = useState('')
  
  const value = useMemo(() => ({
    showModal,
    setShowModal,
    currentImage,
    setCurrentImage,
    showImages,
    setShowImages,
    currentPage,
    setCurrentPage,
  }), [showModal, currentImage, showImages, currentPage])

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = (): modalContextType => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('No Provider')
  }
  return context
}