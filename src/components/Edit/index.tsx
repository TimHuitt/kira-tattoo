
import { useState, useEffect } from 'react'
import { useAdminContext } from '@/context/AdminContext'

import Image from 'next/image'

import { getSession } from "next-auth/react"

interface HeaderData {
  header: string
  statement: string
  photo: string
  images: string
}

interface EditProps {
  element: string
  data?: string | null
  type?: string | null
  isLeft?: boolean
  isBottom?: boolean
  size?: number
}

const Edit: React.FC<EditProps> = (
  { 
    element, 
    data, 
    type = 'edit', 
    isLeft = false, 
    isBottom = false, 
    size = 20,
  }
) => {
  const [ isAdmin, setIsAdmin ] = useState<boolean>(false)
  const { setEditData, setCurrentSelection, setShowAdmin } = useAdminContext()

  useEffect(() => {
    const currentSession = async () => {
      const current: any = await getSession()
      setIsAdmin(current !== null)
    }
    currentSession()
  },[])


  const handleClick = async(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
      const section = element.split('/')[0]
      const area = element.split('/')[1]
      
      setEditData({
        section,
        area,
        input: '',
        currentData: data || '',
      })
      
      setCurrentSelection(area.charAt(0).toUpperCase() + area.split('/')[0].slice(1))
      setShowAdmin(prev => !prev)
  }

  return (
    <>
      { isAdmin && (
        <>
          <div 
            className={`absolute ${isBottom ? 'bottom-0' : 'top-0'} ${isLeft ? 'left-0' : 'right-0'} m-1 cursor-pointer z-40`}
            onClick={handleClick}
          >
            <Image
              src={type === 'remove' ? "/remove.svg" : type === 'add' ? "/add.svg" : "/edit.svg"}
              alt="Profile Image"
              style={{
                objectFit: 'contain',
              }}
              width={size}
              height={size}
            />
          </div>
        </>
      )}      
    </>
  )
}

export default Edit