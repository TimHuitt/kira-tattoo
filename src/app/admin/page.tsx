'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import Panel from '../../components/Panel'

export default function Admin() {  
  return (
    <div className="relative h-full z-30">
      <div className='flex justify-center items-center w-5/6 max-h-60 min-h-40 md:min-h-40 md:min-h-56'>
        <h1 className="text-4xl text-start">Admin Panel</h1>
      </div>
      
      <Panel
        header={'Upload Image'}
        description={'Select an image, select category, add details.'}
        image={true}
        categories={[
          'featured',
          'tattoo',
          'illustration',
          'painting',
          'other',
        ]}
        inputType={'image'}
      />

      <Panel
        header={'Create New Post'}
        description={'Select an image, select category, add details.'}
        image={false}
        categories={[
          'updates', 
          'events'
        ]}
        inputType={'post'}
      />

      <div className='h-10'></div>
    </div>
  )
}
