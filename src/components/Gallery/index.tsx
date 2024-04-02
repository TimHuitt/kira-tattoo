
import React, { useState, useEffect, MouseEventHandler } from 'react'
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
  const { setShowModal, setCurrentImage } = useModalContext()
  const [ width, setWidth ] = useState<number>(0)
  const [ loadingImages, setLoadingImages ] = useState<boolean[]>(new Array(images.length).fill(true))

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
        slidesPerView={width > 850 ? 3 : width > 650 ? 2 : 1}
        loop={true}
        autoplay={{
          delay: swipeDelay,
        }}
        navigation={width > 650 ? true : false}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
      {images?.map((image, index) => {
        const currentImg = cld.image(image)
        currentImg.resize(fill().width(250).height(250))

        return (
          <SwiperSlide key={`${image}-index`} lazy>
            <div className="swiper-slide flex justify-center overflow-hidden cursor-pointer" onClick={handleClick}>
              
              <div className='w-full h-full flex justify-center items-center'>
                <AdvancedImage
                  cldImg={currentImg}
                  alt={image}
                  style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', borderRadius: '20px' }}
                  plugins={[lazyload()]}
                />
                <div className="swiper-lazy-preloader">
                  {/* <CircleLoader
                    // color={color}
                    // cssOverride={override}
                    loading={!loadingImages[index]}
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

