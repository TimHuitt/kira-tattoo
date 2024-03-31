'use client'

import { useState, useEffect } from 'react'
import Gallery from '../components/Gallery'
import Image from 'next/image'

export default function Home() {
  const [ images, setImages ] = useState<string[]>(([]))
  
  useEffect(() => {
    setImages(['/images/1.webp', '/images/2.webp', '/images/6.webp', '/images/7.webp', '/images/8.webp', '/images/9.jpg', '/images/10.webp', '/images/11.jpg', '/images/12.jpg', '/images/13.webp', '/images/14.webp', '/images/15.webp', '/images/16.webp', '/images/17.jpg', ])
  },[])

  return (
    <div className="relative z-30">
      <div className='w-5/6 h-[50vmin] max-h-60'>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
          <Image
            src="/images/1.webp"
            alt=""
            objectFit="contain"
            width={50}
            height={50}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <br />
        <h1 className="text-4xl text-start">Hi, I&apos;m Kira!</h1>
        <br />
        <small>Learn more about me, browse my works, set appointments.</small>
      </div>
      <div className='max-w-full overflow-hidden'>
        <Gallery images={ images } />
      </div>
      <p>
      Sapien, pulvinar nostra integer sociosqu dignissim ultrices tincidunt ad penatibus sed! Mus porttitor felis et; pellentesque diam. Blandit quisque, posuere pretium vivamus. Metus urna mattis taciti pharetra nascetur maecenas. Justo placerat lacus ipsum. Ad sed ante eu eleifend massa aenean aptent curae; justo placerat. Proin sollicitudin dui dictum parturient fusce felis ad felis montes. Ante arcu porta laoreet; mus porttitor eros cras arcu vestibulum imperdiet. Tempor primis molestie nisl litora rhoncus. Mus commodo taciti fames. Tortor tincidunt nascetur ac netus curabitur nisl volutpat varius.
      </p>
      <p>
      Fusce orci nostra suspendisse velit taciti iaculis congue aenean mattis. Nulla sollicitudin neque tristique nostra dictumst? Lobortis curabitur dui molestie magnis vehicula ultrices dictumst. Facilisis curabitur montes pulvinar gravida eu tristique vel parturient, duis ligula. Facilisi porttitor dignissim nisi massa integer. Interdum per porta, quisque dictumst nec amet nostra nunc! Nisl, nisi etiam lacinia iaculis dictumst iaculis facilisi! Tempor id urna condimentum id inceptos praesent. Ultrices vulputate phasellus tincidunt vitae lorem ac nullam eleifend iaculis penatibus. Vivamus parturient ante enim amet risus, nec quam vehicula! Consequat.
      </p>
    </div>
  );
}
