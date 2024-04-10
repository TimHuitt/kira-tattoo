'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Gallery from '../Gallery'

type SectionProps = {
  header?: string,
  description?: string,
  folder?: string,
  swipeDelay?: number,
}

const Section: React.FC<SectionProps> = (props) => {
  const [ images, setImages ] = useState<string[]>([])
  
  useEffect(() => {
    async function fetchImages() {
      try {
        const folderPath = new URLSearchParams({path: props.folder || 'main-images'}).toString()
        const res = await fetch(`/api/route?${folderPath}`)
        const data = await res.json()

        if (data) {
          const finalData = data.data.map((resource: { public_id: string }) => resource.public_id)
          setImages(finalData);
        }
      } catch (e) {
        console.error("Fetch Error:", e)
      }
    }
    fetchImages()
  },[props.folder])

  return (
    <div className='flex flex-col w-full mt-10 p-4 rounded-lg bg-pink-500 bg-opacity-20 border border-2 border-fuchsia-900'>
      <div className='flex flex-col items-start w-full p-2 hover:bg-slate-800 border border-2 border-fuchsia-800 border-opacity-50 rounded-lg cursor-pointer'>
        <div className='flex justify-between w-full md:full'>
          <h1 className="text-xl md:text-3xl text-start">{props.header}</h1>
          <div className='relative top-0 opacity-30'>
            <Image
              src="arrow.svg"
              alt=""
              width={30}
              height={30}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
        <small className='w-full md:w-3/5 opacity-50'>{props.description}</small>
      </div>
      <div className='max-w-full h-[320px] overflow-hidden'>
          <Gallery images={ images } swipeDelay={props.swipeDelay}/>
        </div>
    </div>
  )
}

export default Section