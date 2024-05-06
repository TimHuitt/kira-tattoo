
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { getSession } from "next-auth/react"

const Edit: React.FC = () => {
  const [ isAdmin, setIsAdmin ] = useState<boolean>(false)

  useEffect(() => {
    const currentSession = async () => {
      const current: any = await getSession()
      setIsAdmin(current !== null)
    }
    currentSession()
  },[])

  return (
    <>
      { isAdmin && (
        <div className='absolute top-0 right-0 cursor-pointer z-50'>
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