
import { useState, useEffect } from 'react'
import { PlacesType, Tooltip } from 'react-tooltip'
import { useAdminContext } from '@/context/AdminContext'
import Image from 'next/image'
import axios from 'axios'

import { getSession } from "next-auth/react"

interface HeaderData {
  header: string
  statement: string
  photo: string
  images: string
}

interface EditProps {
  element: string
  data?: HeaderData | null
  type?: string | null
  isLeft?: boolean
  isBottom?: boolean
  size?: number
  tooltip?: string
  tooltipPlace?: PlacesType | undefined
}

const Edit: React.FC<EditProps> = (
  { 
    element, 
    data, 
    type = 'edit', 
    isLeft = false, 
    isBottom = false, 
    size = 20, 
    tooltip = '',
    tooltipPlace = 'top',
  }
) => {
  const [ isAdmin, setIsAdmin ] = useState<boolean>(false)
  const { setShowAdmin } = useAdminContext()

  useEffect(() => {
    const currentSession = async () => {
      const current: any = await getSession()
      setIsAdmin(current !== null)
    }
    currentSession()
  },[])

  const handleClick = async(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
      setShowAdmin(prev => !prev)


      // axios.post('api/header', {
      //   header: 'Testing',
      //   statement: 'oh, ok',
      // })
      // .then(res => {
      //   console.log(element)
      // })
      // .catch(err => {
      //   console.error('Error', err)
      // })

  }

  return (
    <>
      { isAdmin && (
        <>
          <div 
            className={`tooltip-${element} absolute ${isBottom ? 'bottom-0' : 'top-0'} ${isLeft ? 'left-0' : 'right-0'} m-1 cursor-pointer z-40`}
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
          <Tooltip anchorSelect={`.tooltip-${element}`} place={tooltipPlace}>
            {tooltip}
          </Tooltip>
        </>
      )}      
    </>
  )
}

export default Edit