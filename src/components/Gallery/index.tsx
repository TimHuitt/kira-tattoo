
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

const ImageGallery: React.FC<ImageProps> = ({ images, swipeDelay }) => {
  const { width } = useScreenContext()
  const { setShowModal, setCurrentImage } = useModalContext()
  swipeDelay = swipeDelay ? swipeDelay : 1500

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
        slidesPerView={width > 900 ? 3 : width > 768 ? 2 : 1}
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
        console.log(imageName)

        return (
          <SwiperSlide key={`${imageName}-${index}`}>
            <div className="swiper-slide flex justify-center py-5 cursor-pointer" onClick={handleClick}>
              
              <div className='h-[90%] flex justify-center items-center'>
                <AdvancedImage
                  className="block w-auto h-full max-w-full my-0 rounded mx-auto"
                  cldImg={currentImg}
                  alt={image}
                  plugins={[lazyload({threshold: 1})]}
                />
                <div className="swiper-lazy-preloader">
                  <CircleLoader
                    // color={color}
                    // cssOverride={override}
                    size={75}
                  />
                </div>
              </div>
              {/* <p className='text-center'>{ imageName }</p> */}
              <Edit element={`${imageName}-${index}`} type={'remove'} />
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
};

export default ImageGallery

