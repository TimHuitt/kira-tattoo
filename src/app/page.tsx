'use client'

import { useState, useEffect } from 'react'
import Gallery from '../components/Gallery'

export default function Home() {
  const [ images, setImages ] = useState<[string, string][]>(([]))
  
  useEffect(() => {
    setImages([['/stars2.png', 'stars2.png'], ['/stars.png', 'stars'], ['/corner.svg', 'corner'], ['/stars2.png', 'stars2.png'], ['/stars.png', 'stars'], ['/corner.svg', 'corner']])
  },[])

  return (
    <div className="relative z-30">
      <h1 className="text-4xl text-center pt-20 pb-32">Welcome!</h1>
      <p>
      Sapien, pulvinar nostra integer sociosqu dignissim ultrices tincidunt ad penatibus sed! Mus porttitor felis et; pellentesque diam. Blandit quisque, posuere pretium vivamus. Metus urna mattis taciti pharetra nascetur maecenas. Justo placerat lacus ipsum. Ad sed ante eu eleifend massa aenean aptent curae; justo placerat. Proin sollicitudin dui dictum parturient fusce felis ad felis montes. Ante arcu porta laoreet; mus porttitor eros cras arcu vestibulum imperdiet. Tempor primis molestie nisl litora rhoncus. Mus commodo taciti fames. Tortor tincidunt nascetur ac netus curabitur nisl volutpat varius.
      </p>
      <div className='max-w-full overflow-hidden'>
        <Gallery images={ images } />
      </div>
      <p>
      Fusce orci nostra suspendisse velit taciti iaculis congue aenean mattis. Nulla sollicitudin neque tristique nostra dictumst? Lobortis curabitur dui molestie magnis vehicula ultrices dictumst. Facilisis curabitur montes pulvinar gravida eu tristique vel parturient, duis ligula. Facilisi porttitor dignissim nisi massa integer. Interdum per porta, quisque dictumst nec amet nostra nunc! Nisl, nisi etiam lacinia iaculis dictumst iaculis facilisi! Tempor id urna condimentum id inceptos praesent. Ultrices vulputate phasellus tincidunt vitae lorem ac nullam eleifend iaculis penatibus. Vivamus parturient ante enim amet risus, nec quam vehicula! Consequat.
      </p>
    </div>
  );
}
