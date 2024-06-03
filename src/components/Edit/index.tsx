
import { useState, useEffect } from 'react'
import { useAdminContext } from '@/context/AdminContext'

import Image from 'next/image'

import { getSession } from "next-auth/react"
import axios from 'axios'

interface EditProps {
  element: string
  data?: string | null
  type?: string | null
  isLeft?: boolean
  isBottom?: boolean
  image?: boolean
  size?: number
}

const Edit: React.FC<EditProps> = (
  { 
    element, 
    data = null, 
    type = 'edit', 
    isLeft = false, 
    isBottom = false, 
    image = false,
    size = 20,
  }
) => {
  const [ isAdmin, setIsAdmin ] = useState<boolean>(false)
  const { setEditData, setCurrentSelection, setShowAdmin, setIsImage, setUpdateFeatured, setUpdatePortfolio, setUpdatePosts } = useAdminContext()

  useEffect(() => {
    const currentSession = async () => {
      const current: any = await getSession()
      setIsAdmin(current !== null)
    }
    currentSession()
  },[])


  const handleClick = async(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    // handle post deletion
    if (data?.split('-').length === 5) {
      if (data) {
        axios.delete(`api/content`, {data: {id: data}})
        .then(res => {
          if (res.status === 200) {
            setUpdatePosts(prev => !prev)
            console.info('Post Deleted')
          }
        })
        .catch(err => {
          console.error('Error', err)
        })
      }

    // handle other edit requests
    } else {
      const section = element.split('/')[0]
      const area = element.split('/')[1]

      setEditData({
        section,
        area,
        input: '',
        currentData: data || '',
      })
      
      // handle image additions
      if (section !== 'remove') {
        const currentArea = area.charAt(0).toUpperCase() + area.split('/')[0].slice(1)
        const selection = section === 'add' ? 'Featured Images' : currentArea
        setIsImage(image)
        setCurrentSelection(selection)
        setShowAdmin(prev => !prev)
      
      // handle image removal
      } else {
        axios.delete('/api/cloudinary', {params: {file: 'main-images/' + area + '/' + data}})
          .then(res => {
            if (area === 'featured') {
              setUpdateFeatured(prev => !prev)
            } else {
              setUpdatePortfolio(prev => !prev)
            }
          })
          .catch(err => console.error('Error deleting image', err))
      }
    }
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