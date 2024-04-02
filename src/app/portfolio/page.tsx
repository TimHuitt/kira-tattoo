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
        <h1  className="text-4xl text-start pt-20 pb-20">Portfolio</h1>
        <p>
        Sapien, pulvinar nostra integer sociosqu dignissim ultrices tincidunt ad penatibus sed! Mus porttitor felis et.
        </p>
        <Section 
          header={'Tattoos'}
          description={'Browse examples of my completed tattoos'}
          folder='samples/'
        />
        <Section 
          header={'Illustrations'}
          description={'Browse my portfolio of illustrations in a variety of mediums'}
        />
        <Section 
          header={'Paintings'}
          description={'Browse my collection of acrylic and oil paintings'}
        />
        <Section 
          header={'Other'}
          description={'Browse everything else including sculpts, crafts, and MECHS!'}
        />

        <div className='h-10'></div>
      </div>
      <Footer />
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
