import { useState, useEffect } from 'react'
import { useModalContext } from '../../app/provider'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { fill } from '@cloudinary/url-gen/actions/resize'

type imageProp = {
  src: string
}

const Modal: React.FC<imageProp> = ({ src }) => {
  const { showModal, setShowModal } = useModalContext()
  const [ loading, setLoading ] = useState(true)
  
  const handleClick = () => {
    setShowModal(false)
  }  
  
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dqty1eboa"
    }
  })

  const handleLoading = () => {
    setLoading(false)
  }
  

  const currentImg = cld.image(src)
  // currentImg.resize(fill().width(250).height(250))
  return (
    <>
      { loading && (
        <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-900 z-50'>
          <h1>Loading...</h1>
        </div>
      )}
      <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-900 z-50'>
        <h1>Loading...</h1>
      </div>
      
      <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-900 z-40' onClick={handleClick}>
        <AdvancedImage
          cldImg={currentImg}
          alt={src}
          onLoad={handleLoading}
          style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
        />
      </div>
    </>
  )
}

export default Modal