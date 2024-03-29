import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { register } from 'swiper/element/bundle';
register();

type ImageProps = {
  images: [string, string][]
}

const ImageGallery: React.FC<ImageProps> = ({ images }) => {
  
  return (
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as any }
        spaceBetween={20}
        slidesPerView={2}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
      {images.map((image, index) => (
        <div key={index} className="swiper-slide">
          <SwiperSlide>
            <Image 
              src={image[0]} 
              alt={image[1]} 
              layout="fill"
              objectFit="contain"
            />
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  );
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
