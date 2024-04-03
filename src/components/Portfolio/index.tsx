'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import { useModalContext } from '@/app/provider'
import Modal from '@/components/Modal'

export default function Portfolio() {
  const { showModal, currentImage } = useModalContext()
  
  return (
    <>
      <div className="relative z-30">
        <h1  className="text-4xl text-start pb-10">Portfolio</h1>
        <p>
        Sapien, pulvinar nostra integer sociosqu dignissim ultrices tincidunt ad penatibus sed! Mus porttitor felis et.
        </p>
        <Section 
          header={'Tattoos'}
          description={'Examples of my completed tattoos'}
          folder='samples/'
          swipeDelay={1300}
        />
        <Section 
          header={'Illustrations'}
          description={'Illustrations in a variety of mediums'}
          folder='samples/'
          swipeDelay={1500}
        />
        <Section 
          header={'Paintings'}
          description={'Collection of acrylic and oil paintings'}
          folder='samples/'
          swipeDelay={1700}
        />
        <Section 
          header={'Other'}
          description={'Everything else including sculpts, crafts, and MECHS!'}
          folder='samples/'
          swipeDelay={1900}
        />
      </div>
      {/* <Footer /> */}
      { showModal &&
        <Modal src={currentImage}/>
      }
    </>
  );
}

// export async function getStaticProps() {
//   return {
//     props: {
// 
//     }
//   }
// 
//   const res = await fetch('/api/route');
//   const data = await res.json();
// 
//   console.log(data)
// 
// 
// }
