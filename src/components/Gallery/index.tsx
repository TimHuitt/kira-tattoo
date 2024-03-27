import Slider from "react-slick";
import Image from 'next/image'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ImageProps = {
  images: [string, string][]
}

const ImageGallery:React.FC<ImageProps> = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            }
        ]
    };

    return (
      <div className="min-h-40 w-full my-10 px-4">
        <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="relative min-h-40 w-40">
                <Image 
                  src={image[0]} 
                  alt={image[1]} 
                  fill 
                  objectFit="contain" 
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
        </Slider>
      </div>
    );
};

export default ImageGallery;
