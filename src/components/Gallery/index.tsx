'use client'

import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useModalContext } from '../../context/ModalContext'
import { useScreenContext } from '@/context/ScreenContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import { register } from 'swiper/element/bundle'
import { Pagination, Navigation } from 'swiper/modules';
import { Cloudinary } from '@cloudinary/url-gen/index'
import { AdvancedImage, lazyload } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'
import CircleLoader from 'react-spinners/CircleLoader'
import Edit from '@/components/Edit';

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

register()

type ImageProps = {
  images: string[],
  autoplay?: boolean,
  swipeDelay?: number,
  area: string,
}

interface MemoTypes {
  src: string
  alt: string
}

const cld = new Cloudinary({
  cloud: {
    cloudName: "dqty1eboa"
  }
})

const MemoizedImage: React.FC<MemoTypes> = React.memo(({ src, alt }) => {
  const image = cld.image(src);
  image.resize(fill().width(250).height(250));

  return (
    <AdvancedImage
      className="block w-auto h-full max-w-full my-0 rounded mx-auto"
      cldImg={image}
      alt={alt}
      plugins={[lazyload({threshold: 1})]}
    />
  );
});
MemoizedImage.displayName = 'MemoizedImage'

const ImageGallery: React.FC<ImageProps> = ({ images, swipeDelay, area }) => {
  const { width } = useScreenContext()
  const { setShowModal, setCurrentImage } = useModalContext()
  const [ viewConfig, setViewConfig] = useState<number>(1)
  swipeDelay = swipeDelay ? swipeDelay : 1500

  useEffect(() => {
    console.log(images.length)
    let slides
    if (images.length === 2) {
        slides = 2
    } else if (images.length === 1) {
        slides = 1
    } else if (width > 900) {
        slides = 3
    } else if (width > 768) {
        slides = 2
    } else {
        slides = 1
    }
    setViewConfig(slides)
  },[images, width])

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLImageElement
    setShowModal(true)
    setCurrentImage(target.alt)
  }

  return (
      <Swiper
        className='relative w-full z-30'
        style={{
          '--swiper-pagination-color': '#A21CAF',
          '--swiper-navigation-color': '#A21CAF',
        } as any }
        spaceBetween={10}
        slidesPerView={viewConfig}
        loop={true}
        autoplay={{
          delay: swipeDelay,
          pauseOnMouseEnter: true,
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
        const imageName = image.split('/').pop() || 'image'

        return (
          <SwiperSlide key={`${imageName}-${index}`}>
            <div className="swiper-slide py-5 cursor-pointer" onClick={handleClick}>
              
              <div className='h-[90%]'>
                <AdvancedImage
                  className="block w-auto h-full max-w-full my-0 rounded mx-auto"
                  cldImg={currentImg}
                  alt={image}
                  plugins={[lazyload({threshold: 1})]}
                />
                {/* <div className="swiper-lazy-preloader">
                  <CircleLoader
                    // color={color}
                    // cssOverride={override}
                    size={75}
                  />
                </div> */}
              </div>
              {/* <p className='text-center'>{ imageName }</p> */}
              <Edit element={`remove/${area}`} data={imageName} type={'remove'} />
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
};

export default ImageGallery

