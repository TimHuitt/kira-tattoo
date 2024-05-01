import { useState, useEffect } from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { useModalContext } from '../../app/ModalContext'
import RingLoader from 'react-spinners/RingLoader'

const Page: React.FC = () => {
  const { currentPage, setShowPage } = useModalContext()
  const [ images, setImages ] = useState<string[]>(([]))
  const [ loading, setLoading ] = useState(true)
    
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: "dqty1eboa"
  //   }
  // })

  useEffect(() => {
    async function fetchImages() {
      try {
        const folderPath = new URLSearchParams({path: `main-image/${currentPage}-featured` || 'main-images'}).toString()
        
        const res = await fetch(`/api/route?${folderPath}`)
        const data = await res.json()
        
        if (data) {
          const finalData = data.data.map((resource: { public_id: string }) => resource.public_id)
          
          setImages(finalData);
        }
      } catch (e) {
        console.error("Fetch Error:", e)
      }
    }
    fetchImages()
  },[currentPage])

  const handleClick = () => {
    setShowPage(false)
  }  

  const handleLoading = () => {
    setLoading(false)
  }

  


  return (
    <div className='flex flex-col overflow-y-auto'>
      { images.map((src) => {
        // const currentImg = cld.image(src)
        // currentImg.resize(fill().width(250).height(250))
        return (
          <>
            {/* <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center pointer-events-none z-50'>
              <RingLoader
                // color={color}
                // cssOverride={override}
                loading={loading}
                size={150}
              />
            </div> */}
            <div className='w-screen flex justify-center items-center bg-gray-900 z-40' onClick={handleClick}>
              {/* <AdvancedImage
                cldImg={currentImg}
                alt={src}
                onLoad={handleLoading}
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  display: 'block', 
                  margin: '0 auto',
                }}
              /> */}
              <div className='w-screen h-[500px] bg-black z-50'></div>
            </div>
          </>
        )
      })}
      
    </div>
  )
}

export default Page