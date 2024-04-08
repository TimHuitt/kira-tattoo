'use client'

import { useState, useEffect } from 'react'
import { useModalContext } from './provider'
import { useScrollContext } from '@/app/ScrollContext'
import Gallery from '../components/Gallery'
import Divider from '../components/Divider'
import Modal from '../components/Modal'
import Post from '../components/Post'
import Portfolio from '@/components/Portfolio'
import Booking from '@/components/Booking'
import Contact from '@/components/Contact'
import Image from 'next/image'

export default function Home() { 
  const [ images, setImages ] = useState<string[]>(([]))
  const { showModal, currentImage } = useModalContext()
  const { scrollRef, updatesRef, portfolioRef, bookingRef, contactRef, setCurrent } = useScrollContext()


  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch('/api/route')
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

  useEffect(() => {
    scrollRef.current?.addEventListener('scroll', handleScroll);
  })

  const handleScroll = () => {
    // determine scroll pos and set selection for header highlighting
    console.log(scrollRef.current?.scrollTop)
    // setCurrent(scrollRef.current?.offsetTop)
  }

  return (
    <div ref={scrollRef} className="relative w-[90%] max-w-5xl h-full text-white mx-auto mt-20 p-4 md:p-6 lg:p-8 rounded-xl bg-slate-800 shadow-xl shadow-slate-900 overflow-y-auto overflow-x-hidden">
      <div className="relative z-30">
        <div className='w-5/6 max-h-60 min-h-20 md:min-h-40 md:min-h-56'>
          <div className='w-[75px] h-[75px] mb-4 rounded-full overflow-hidden'>
            <Image
              src="/images/1.webp"
              alt="Profile Image"
              style={{
                objectFit: 'contain',
              }}
              width={75}
              height={75}
            />
          </div>
          <h1 className="text-4xl text-start">Hi, I&apos;m Kira!</h1>
          <p className='text-sm md:text-base opacity-60'>And here&apos;s something about me or something</p>
        </div>
        <div className='max-w-full overflow-hidden'>
          <Gallery images={ images } />
        </div>
        <Divider />
        <div ref={updatesRef}>
          <h1 className="text-4xl text-center p-4">News</h1>
        </div>
        <Post />
        <Post />
        <Post />
        <Divider />
        <div ref={portfolioRef}>
        <Portfolio />
        </div>
        <Divider />
        <div ref={bookingRef}>
          <Booking />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
      </div>
      { showModal &&
        <Modal src={currentImage}/>
      }
    </div>
  );
}
