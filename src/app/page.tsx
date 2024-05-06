'use client'

// http://localhost:3000/api/add-content?name=John&number=6548152255

import { useState, useEffect } from 'react'
import { useModalContext } from './api/middleware/ModalContext'
import { useScrollContext } from '@/app/api/middleware/ScrollContext'
import axios from 'axios'

import Login from '../components/Login'
import Gallery from '../components/Gallery'
import Divider from '../components/Divider'
import Modal from '../components/Modal'
import Page from '../components/Page'
import Updates from '../components/Updates'
import Portfolio from '@/components/Portfolio'
import Booking from '@/components/Booking'
import Contact from '@/components/Contact'
import Edit from '@/components/Edit'
import Image from 'next/image'

interface HeaderData {
  header: string
  statement: string
}

const Home = () => { 
  const [ images, setImages ] = useState<string[]>(([]))
  const { showModal, currentImage, showPage, currentPage } = useModalContext()
  const { scrollRef, updatesRef, portfolioRef, bookingRef, contactRef, selected, setSelected } = useScrollContext()
  const [ width, setWidth ] = useState<number>(0)
  const [ headerData, setHeaderData ] = useState<HeaderData | null>(null)

  useEffect(() => {
    async function fetchImages() {      
      try {
        const res = await fetch('/api/cloudinary/route')
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


    const getHeader = async () => {
      try {
        const res = await axios.get('api/header')
        const resData = res.data.rowData
        setHeaderData(resData)
      } catch (err) {

      }
    }

    getHeader()

  },[])


  useEffect(() => {
    scrollRef.current?.addEventListener('scroll', handleScroll);
  })

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('load', handleResize)
      window.addEventListener('resize', handleResize)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleResize)
        window.removeEventListener('resize', handleResize)
      }
    }

  })

  const handleScroll = () => {
    // determine if scrolled to bottom
    if (!scrollRef.current) return

    const offsets = {
      home: 0,
      updates: updatesRef.current?.offsetTop || 0,
      portfolio: portfolioRef.current?.offsetTop || 0,
      booking: bookingRef.current?.offsetTop || 0,
      contact: contactRef.current?.offsetTop || 0,
      clientHeight: scrollRef.current?.clientHeight || 0,
      scrollHeight: scrollRef.current?.scrollHeight || 0,
      currentScroll: scrollRef.current?.scrollTop || 0,
    }

    if (offsets.currentScroll >= offsets.home && offsets.currentScroll < offsets.updates) {
      setSelected('home')
    } else if (offsets.currentScroll < offsets.portfolio) {
      setSelected('updates')
    } else if (offsets.currentScroll >= offsets.portfolio && offsets.currentScroll < offsets.booking) {
      setSelected('portfolio')
    } else if (offsets.currentScroll >= offsets.booking && offsets.currentScroll < offsets.contact) {
      setSelected('booking')
    } else if (offsets.currentScroll + offsets.clientHeight >= offsets.scrollHeight || offsets.currentScroll >= offsets.contact) {
      setSelected('contact')
    }
  }

  return (
    <div ref={scrollRef} className="relative w-full h-full mt-20 overflow-y-auto">
      <div className='h-auto w-[90%] max-w-5xl text-white mx-auto  p-4 pt-10 md:p-6 lg:p-8 rounded bg-slate-800 shadow-xl shadow-slate-900 overflow-x-hidden'>
        <div className="relative">
          <Login />
          <div className='relative max-h-60 min-h-20 pt-0 md:pt-6 md:min-h-40 md:min-h-56'>
            <div className='w-[100px] h-[100px] mb-6 rounded-full overflow-hidden'>
              <Image
                src="/images/1.webp"
                alt="Profile Image"
                style={{
                  objectFit: 'contain',
                }}
                width={100}
                height={100}
              />
            </div>
            <Edit />
            <div className='relative '>
              <h1 className="text-4xl text-start">{headerData?.header}</h1>
              <Edit />
            </div>
            <div className='relative'>
              <p className='text-sm md:text-base pb-20 md:pb-30 opacity-60'>{headerData?.statement}</p>
              <Edit />
            </div>
          </div>
          <div className='max-w-full h-[300px] flex items-center overflow-hidden'>
            <Gallery images={ images } />
          </div>
          <Divider sectionRef={updatesRef}/>
          <Updates />
          <Divider sectionRef={portfolioRef} />
          <Portfolio />
          <Divider sectionRef={bookingRef} />
          <Booking width={width}/>
          <Divider sectionRef={contactRef} />
          <Contact />
          <div className="absolute w-[50vmin] max-w-60 h-[50vmin] max-h-60 top-[-1.25rem] right-[-.75rem] md:top-[-.5rem] md:right-[-1.25rem] lg:top-[-1rem] lg:right-[-1.5rem] flex justify-end z-10 rotate-180 border-none z-10">
            <Image
              src="corner.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
        { showModal &&
          <Modal src={currentImage}/>
        }
        { showPage &&
          <Page folder={`main-images/${currentPage}-featured`}/>
        }
        
      </div>
    </div>
  );
}

export default Home