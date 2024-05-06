
import { useState, useEffect } from 'react'
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
  data: HeaderData | null
  isLeft?: boolean
}

const Edit: React.FC<EditProps> = ({ element, data, isLeft = false}) => {
  const [ isAdmin, setIsAdmin ] = useState<boolean>(false)
  const [ left ] = useState<boolean>(isLeft)

  useEffect(() => {
    const currentSession = async () => {
      const current: any = await getSession()
      setIsAdmin(current !== null)
    }
    currentSession()
  },[])

  const handleClick = async(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

      axios.post('api/header', {
        header: 'Testing',
        statement: 'oh, ok',
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error('Error', err)
      })

  }

  return (
    <>
      { isAdmin && (
        <div 
          className={`absolute top-0 ${left ? '-left-2' : '-right-10'} cursor-pointer z-50`}
          onClick={handleClick}
        >
          <Image
            src="/edit.svg"
            alt="Profile Image"
            style={{
              objectFit: 'contain',
            }}
            width={20}
            height={20}
          />
        </div>
      )}
    </>
  )
}

export default Edit