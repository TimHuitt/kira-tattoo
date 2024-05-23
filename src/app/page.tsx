'use client'

import { useState, useEffect, useCallback } from 'react'
import { useModalContext } from '@/context/ModalContext'
import { useScrollContext } from '@/context/ScrollContext'
import { useScreenContext } from '@/context/ScreenContext'
import { useAdminContext } from '@/context/AdminContext'
import { Cloudinary } from '@cloudinary/url-gen/index'
import axios from 'axios'

import Login from '@/components/Login'
import Gallery from '@/components/Gallery'
import Divider from '@/components/Divider'
import Modal from '@/components/Modal'
import Page from '@/components/Page'
import Updates from '@/components/Updates'
import Portfolio from '@/components/Portfolio'
import Booking from '@/components/Booking'
import Contact from '@/components/Contact'
import Edit from '@/components/Edit'
import Admin from '@/components/Admin'
import Image from 'next/image'
import { AdvancedImage, lazyload } from '@cloudinary/react'

interface HeaderData {
  header: string
  statement: string
  photo: string
  images: string
}


const cld = new Cloudinary({
  cloud: {
    cloudName: "dqty1eboa"
  }
})

const Home = () => { 
  const [ images, setImages ] = useState<string[]>(([]))
  const { width } = useScreenContext()
  const { showAdmin, setShowAdmin, processed, setProcessed } = useAdminContext()
  const { showModal, currentImage, showPage, currentPage } = useModalContext()
  const { scrollRef, updatesRef, portfolioRef, bookingRef, contactRef, selected, setSelected } = useScrollContext()
  const [ headerData, setHeaderData ] = useState<HeaderData | null>(null)

  useEffect(() => {
    const getHeader = async () => {
      try {
        const res = await axios.get('api/header')
        const resData = res.data.rowData
        setHeaderData(resData)
      } catch (err) {
        console.error(err)
      }
    }
    getHeader()
    setProcessed(false)
  },[processed, setProcessed])

  useEffect(() => {
    async function fetchImages() {      
      try {

        const folderPath = new URLSearchParams({path: 'main-images/featured' || 'main-images'}).toString()
        
        const res = await fetch(`/api/cloudinary?${folderPath}`)
        const data = await res.json()
        if (data) {
          const imagesList = data.data.map((resource: { public_id: string }) => resource.public_id)
          setImages(imagesList);
        }
      } catch (err) {
        console.error("Error fetching featured images:", err)
      }
    }
    fetchImages()

  },[])

  const profileImage = cld.image(`main-images/profile/profile-image`)

  const handleScroll = useCallback(() => {
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
  },[bookingRef, contactRef, portfolioRef, scrollRef, setSelected, updatesRef])

  useEffect(() => {
    const scrollEl = scrollRef.current
    scrollEl?.addEventListener('scroll', handleScroll);

    return () => {
      scrollEl?.removeEventListener('scroll', handleScroll);
    }
  },[handleScroll, scrollRef])

  return (
    <div ref={scrollRef} className="relative w-full h-full mt-20 overflow-y-auto">
      <div className='h-auto w-[90%] max-w-5xl text-white mx-auto  p-4 pt-10 md:p-6 lg:p-8 rounded bg-slate-800 shadow-xl shadow-slate-900 overflow-x-hidden'>
        <div className="relative">
          <Login />
          <div className='relative max-h-60 min-h-20 pt-0 md:pt-6 md:min-h-40 md:min-h-56'>
            <div className='w-[100px] h-[100px] mb-6 rounded-full overflow-hidden'>
                <AdvancedImage
                  className="block w-auto h-full max-w-full my-0 rounded mx-auto"
                  cldImg={profileImage}
                  alt={'profile-image'}
                  plugins={[lazyload({threshold: 1})]}
                />
            </div>
            <Edit element={'header/photo'} data={headerData?.photo} isLeft={true} image={true} />
            <div className='inline-flex relative'>
              <h1 className="text-4xl text-start pe-10">{headerData?.header}</h1>
              <Edit element={'header/header'} data={headerData?.header} />
            </div>
            <div></div>
            <div className='inline-flex relative w-5/6 md:w-auto'>
              <p className='text-sm md:text-base pb-20 md:pb-30 pe-10 opacity-60'>{headerData?.statement}</p>
              <Edit element={'header/statement'} data={headerData?.statement} />
            </div>
          </div>
          <div className='relative max-w-full h-[300px] flex items-center'>
            <Gallery images={ images } />
            <Edit element={'header/images'} type={'add'} isBottom={true} size={30} />
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
        { showAdmin && (
          <Admin setShowAdmin={setShowAdmin} />
        )}
      </div>
    </div>
  );
}

export default Home