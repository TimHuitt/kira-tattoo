import { useState } from 'react'
import { useModalContext } from '../../app/api/middleware/ModalContext'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index'
import RingLoader from 'react-spinners/RingLoader'

type imageProp = {
  src: string
}

const Modal: React.FC<imageProp> = ({ src }) => {
  const { setShowModal } = useModalContext()
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
      <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center pointer-events-none z-50'>
        <RingLoader
          // color={color}
          // cssOverride={override}
          loading={loading}
          size={150}
        />
      </div>
      
      <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-900 z-40' onClick={handleClick}>
        <AdvancedImage
          cldImg={currentImg}
          alt={src}
          onLoad={handleLoading}
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            display: 'block', 
            margin: '0 auto',
          }}
        />
      </div>
    </>
  )
}

export default Modal