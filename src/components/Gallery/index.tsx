
import React, { useState, useEffect, useRef, MouseEventHandler } from 'react'
import { useModalContext } from '../../app/provider'
import { Swiper, SwiperSlide } from 'swiper/react'
import { register } from 'swiper/element/bundle'
import { Pagination, Navigation } from 'swiper/modules';
import { AdvancedImage, lazyload } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { fill } from '@cloudinary/url-gen/actions/resize'
import CircleLoader from 'react-spinners/CircleLoader'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

register()

type ImageProps = {
  images: string[],
  autoplay?: boolean,
  swipeDelay?: number,
}

const ImageGallery: React.FC<ImageProps> = ({ images, swipeDelay }) => {
  const top = useRef(null)
  const updates = useRef(null)
  const portfolio = useRef(null)
  const booking = useRef(null)
  const contact = useRef(null)
  const { setShowModal, setCurrentImage } = useModalContext()
  const [ width, setWidth ] = useState<number>(0)
  const [ loadingImages, setLoadingImages ] = useState<boolean[]>(new Array(images.length).fill(true))
  swipeDelay = swipeDelay ? swipeDelay : 1500
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dqty1eboa"
    }
  })
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('load', handleResize)
      window.addEventListener('resize', handleResize)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleResize)
        window.removeEventListener('resize', handleResize)
      }
    }

  },[])

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLImageElement
    setShowModal(true)
    setCurrentImage(target.alt)
  }

  return (
      <Swiper
        className=''
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as any }
        spaceBetween={10}
        slidesPerView={width > 900 ? 3 : width > 768 ? 2 : 1}
        loop={true}
        autoplay={{
          delay: swipeDelay,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
      >
      {images?.map((image, index) => {
        const currentImg = cld.image(image)
        currentImg.resize(fill().width(250).height(250))

        return (
          <SwiperSlide key={`${image}-index`}>
            <div className="swiper-slide flex justify-center py-5 overflow-hidden cursor-pointer" onClick={handleClick}>
              
              <div className='w-full h-full flex justify-center items-center'>
                <AdvancedImage
                  width="100%"
                  height="300px"
                  cldImg={currentImg}
                  alt={image}
                  style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', borderRadius: '20px' }}
                  // plugins={[lazyload({threshold: 1})]}
                />
                <div className="swiper-lazy-preloader">
                  {/* <CircleLoader
                    // color={color}
                    // cssOverride={override}
                    size={75}
                  /> */}
                </div>
              </div>
              {/* <p className='text-center'>{ image }</p> */}
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
};

export default ImageGallery;

