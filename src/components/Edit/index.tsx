// Adds edit button to relative container
// 


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


  const handleClick = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    // handle post deletion
    if (data?.split('-').length === 5) {
      if (data) {
        axios.delete(`api/cloudinary`, {params: {folder: data}})
          .then(res => {
            console.info('Images Folder Removed')
          })
          .catch(err => {
            console.error('Error Removing Images Folder', err)
          })
        axios.delete(`api/content`, {data: {id: data}})
          .then(res => {
            if (res.status === 200) {
              setUpdatePosts(prev => !prev)
              console.info('Post Deleted')
            }
          })
          .catch(err => {
            console.error('Error Removing Post', err)
          })
      }

    // handle other edit requests
    } else {
      const editType = element.split('/')[0]
      const editArea = element.split('/')[1]

      setEditData({
        editType,
        editArea,
        input: '',
        currentData: data || '',
      })
      
      // handle image additions
      if (editType !== 'remove') {
        let selection: string = ''
        const currentArea = editArea.charAt(0).toUpperCase() + editArea.split('/')[0].slice(1)
        
        if (editType === 'add') {
          if (editArea === 'header') {
            selection = 'Featured Images'
          } else if (editArea === 'post') {
            selection = 'New Post'
          }
        } else if (editArea === 'section') {
          selection = 'Portfolio Images'
        } else {
          selection = currentArea
        }

        setIsImage(image)
        setCurrentSelection(selection)
        setShowAdmin(prev => !prev)
      
      // handle image removal
      } else {
        axios.delete('/api/cloudinary', {params: {file: 'main-images/' + editArea + '/' + data}})
          .then(res => {
            if (editArea === 'featured') {
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
          <button 
            className={`absolute ${isBottom ? 'bottom-0' : 'top-0'} ${isLeft ? 'left-0' : 'right-0'} m-1 cursor-pointer z-40`}
            onClick={handleClick}
          >
            <Image
              src={type === 'remove' ? "/remove.svg" : type === 'add' ? "/add.svg" : "/edit.svg"}
              alt={type === 'remove' ? "Edit Button - Remove" : type === 'add' ? "Edit Button - Add" : "Edit Button - Update"}
              style={{
                objectFit: 'contain',
              }}
              width={size}
              height={size}
            />
          </button>
        </>
      )}      
    </>
  )
}

export default Edit