import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { AdvancedImage, placeholder } from '@cloudinary/react';

import { useState, useEffect } from 'react'

interface ImgProps {
  images: string[]
}

const ImgCloud: React.FC<ImgProps> = ({ images }) => {

  return (
    <div>
      <p></p>
    </div>
  )

}



export default ImgCloud