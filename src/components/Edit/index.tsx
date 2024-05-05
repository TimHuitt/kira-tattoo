
import { useState, useEffect } from 'react'
import Image from 'next/image'

const Edit: React.FC = () => {
  const [ isAdmin, setIsAdmin ] = useState<boolean>(true)

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