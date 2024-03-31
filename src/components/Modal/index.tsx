import { useState, useEffect } from 'react'
import { useModalContext } from '../../app/provider'
import Image from 'next/image'

type imageProp = {
  src: string
}

const Modal: React.FC<imageProp> = ({ src }) => {
  const { showModal, setShowModal } = useModalContext()
  
  const handleClick = () => {
    setShowModal(false)
  }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-900 z-50' onClick={handleClick}>
      <Image 
        src={src}
        alt={src} 
        fill
        style={{
          objectFit: 'contain'
        }}
      />
    </div>
  )
}

export default Modal