'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useModalContext } from '../../app/ModalContext'
import Gallery from '../Gallery'

type SectionProps = {
  id: string,
  header?: string,
  description?: string,
  folder?: string,
  swipeDelay?: number,
}

const Section: React.FC<SectionProps> = (props) => {
  const { setShowPage, setCurrentPage } = useModalContext()
  const [ images, setImages ] = useState<string[]>([])
  
  useEffect(() => {
    async function fetchImages() {
      try {
        const folderPath = new URLSearchParams({path: props.folder || 'main-images'}).toString()
        
        const res = await fetch(`/api/cloudinary/route?${folderPath}`)
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

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement
    setShowPage(true)
    setCurrentPage(target.id)
  }

  return (
    <div className='flex flex-col w-full mt-10 p-4 rounded bg-pink-500 bg-opacity-20 border border-2 border-fuchsia-900'>
      <div className='flex flex-col items-start w-full p-2 hover:bg-slate-800 hover:text-lime-300 border border-2 border-fuchsia-800 border-opacity-50 rounded cursor-pointer' onClick={handleClick}>
        <div className='flex justify-between w-full md:full' id={props.id}>
          <h1 className="text-xl md:text-3xl text-start moto">{props.header}</h1>
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
        {/* <small className='w-full md:w-3/5 opacity-50'>{props.description}</small> */}
      </div>
      <div className='max-w-full h-[320px] overflow-hidden'>
          <Gallery images={ images } swipeDelay={props.swipeDelay}/>
        </div>
    </div>
  )
}

export default Section