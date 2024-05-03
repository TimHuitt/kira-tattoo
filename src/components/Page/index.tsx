import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { useModalContext } from '../../app/ModalContext'
import RingLoader from 'react-spinners/RingLoader'

type PageProp = {
  folder: string
}

const Page: React.FC<PageProp> = ({ folder }) => {
  const { setShowPage } = useModalContext()
  const [ images, setImages ] = useState<string[]>([])
  const folderRef = useRef<string>(folder)
  const [ loading, setLoading ] = useState(true)
    
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dqty1eboa"
    }
  })

  useEffect(() => {
    async function fetchImages() {
      try {
        const folderPath = new URLSearchParams({path: folderRef.current || 'main-images'}).toString()
        const res = await fetch(`/api/cloudinary/get-images?${folderPath}`)
        const data = await res.json()
        if (data) {
          const finalData = data.data.map((resource: { public_id: string }) => resource.public_id)
          setImages(finalData)
        }
      } catch (e) {
        console.error("Fetch Error:", e)
      }
    }
    fetchImages()
  },[])


  const handleClick = () => {
    setShowPage(false)
  }  

  const handleLoading = () => {
    setLoading(false)
  }

  


  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-gray-900 overflow-y-auto z-50' onClick={handleClick}>
      {/* {loading && (
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none'>
          <RingLoader
            // color={color}
            // cssOverride={override}
            loading={loading}
            size={150}
          />
        </div>
      )} */}
      <div className='fixed top-20 right-5 md:right-10 w-10 h-10 flex justify-center items-center bg-red-400 hover:bg-red-800 border-2 border-red-800 rounded-full cursor-pointer'>
        <h1 className='text-3xl text-red-500'>
          <Image
            src="back.svg"
            alt=""
            width={20}
            height={20}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </h1>
      </div>
      <div className='w-full flex flex-col items-center gap-5 mt-40 overflow-y-auto'>
        {images.map((src) => {
          const currentImg = cld.image(src);
          return (
            <div key={src} className='max-w-[90%] rounded-lg overflow-hidden'>
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
          );
        })}
      </div>
    </div>
  );
  
}

export default Page
