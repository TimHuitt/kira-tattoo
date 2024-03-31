
import React, { useState, useEffect, MouseEventHandler } from 'react';
import { useModalContext } from '../../app/provider'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { register } from 'swiper/element/bundle';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen/index';
import { fill } from '@cloudinary/url-gen/actions/resize';

import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'

register();

type ImageProps = {
  images: string[]
}

const ImageGallery = ({ images }: ImageProps) => {
  const { setShowModal, setCurrentImage } = useModalContext()
  const [ width, setWidth ] = useState<number>(0)

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
      window.addEventListener('onload', handleResize)
      window.addEventListener('resize', handleResize)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('onload', handleResize)
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
        className='my-8'
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as any }
        spaceBetween={20}
        slidesPerView={width > 500 ? 2 : 1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
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
          <SwiperSlide key={index}>
          <div className="swiper-slide cursor-pointer" onClick={handleClick}>
              <AdvancedImage
                cldImg={currentImg}
                alt={image}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
//   return (
// 
//     <div className="min-h-40 w-full my-10 px-4">
//       <div className="swiper-container">
//         <div className="swiper-wrapper">
//           {images.map((image, index) => (
//             <div key={index} className="swiper-slide">
//               <img src={image[0]} alt={image[1]} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
};

export default ImageGallery;

