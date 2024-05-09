'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import Section from '@/components/Section'
import { useModalContext } from '@/context/ModalContext'
import Modal from '@/components/Modal'

export default function Portfolio() {
  const { showModal, currentImage } = useModalContext()
  
  return (
    <>
      <div className="relative z-30">
        <h1 className="text-4xl text-center pb-10 moto">Portfolio</h1>
        <p>
        Sapien, pulvinar nostra integer sociosqu dignissim ultrices tincidunt ad penatibus sed! Mus porttitor felis et.
        </p>
        <Section 
          id={'tattoo'}
          header={'Tattoos'}
          description={'Examples of my completed tattoos'}
          folder='main-images/tattoo-featured'
          swipeDelay={1300}
        />
        <Section 
          id={'illustration'}
          header={'Illustrations'}
          description={'Illustrations in a variety of mediums'}
          folder='main-images/illustration-featured'
          swipeDelay={1500}
        />
        <Section 
          id={'painting'}
          header={'Paintings'}
          description={'Collection of acrylic and oil paintings'}
          folder='main-images/painting'
          swipeDelay={1700}
        />
        <Section 
          id={'other'}
          header={'Other'}
          description={'Everything else including sculpts, crafts, and MECHS!'}
          folder='main-images/other'
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

