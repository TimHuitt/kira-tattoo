
import React, { useState, useEffect, MouseEventHandler } from 'react'
import { useModalContext } from '../../app/provider'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { register } from 'swiper/element/bundle'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { fill } from '@cloudinary/url-gen/actions/resize'
import CircleLoader from 'react-spinners/CircleLoader'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

register()

type ImageProps = {
  images: string[]
}

const ImageGallery = ({ images }: ImageProps) => {
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

  const handleLoading = (index: number) => {
    console.log(loadingImages)
    setLoadingImages(loading => loading.map((state, i) => i === index ? false : state))
  }
      
  return (
      <Swiper
        className='my-8'
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as any }
        spaceBetween={20}
        slidesPerView={width > 500 ? 2 : 1}
        // loop={true}
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={width > 500 ? true : false}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
      {images?.map((image, index) => {
        const currentImg = cld.image(image)
        currentImg.resize(fill().width(250).height(250))

        return (
          <SwiperSlide key={`${image}-index`}>
            <div className="swiper-slide flex justify-center cursor-pointer" onClick={handleClick}>
            <div className='w-full h-full flex justify-center items-center'>
              <CircleLoader
                // color={color}
                // cssOverride={override}
                loading={loadingImages[index]}
                size={75}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
              <AdvancedImage
                cldImg={currentImg}
                alt={image}
                onLoad={() => handleLoading(index)}
                style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
              />
              {/* <p className='text-center'>{ image }</p> */}
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
};

export default ImageGallery;

