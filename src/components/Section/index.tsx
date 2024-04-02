'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Gallery from '../Gallery'

type SectionProps = {
  header?: string,
  description?: string,
  folder?: string,
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
  },[])

  return (
    <div className='flex flex-col w-full mt-10'>
      <div className='flex flex-col items-start md:items-center w-full pt-2 hover:bg-zinc-600 rounded-lg cursor-pointer'>
        <div className='flex justify-between w-full md:w-3/5'>
          <h1 className="text-xl md:text-3xl text-start">{props.header}</h1>
          <div className='relative top-0'>
            <Image
              src="arrow.svg"
              alt=""
              width={30}
              height={30}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
        <small className='w-full md:w-3/5'>{props.description}</small>
      </div>
      <div className='max-w-full overflow-hidden'>
          <Gallery images={ images } />
        </div>
    </div>
  )
}

export default Section