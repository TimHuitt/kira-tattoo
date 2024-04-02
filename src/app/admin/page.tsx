'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import Panel from '../../components/Panel'

export default function Admin() {  
  return (
    <div className="relative h-full z-30">
      <div className='flex justify-start items-center w-5/6 max-h-60 min-h-40 md:min-h-40 md:min-h-56'>
        <h1 className="text-xl md:text-4xl text-start">Admin Panel</h1>
      </div>
      <div className='flex justify-center items-center py-4'>
        <h1 className="text-xl md:text-4xl text-start">Add New</h1>
      </div>
      <Panel
        header={'Image'}
        description={'Upload an image'}
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
        header={'Post'}
        description={'Create a new post'}
        image={false}
        categories={[
          'updates', 
          'events'
        ]}
        inputType={'post'}
      />

      <div className='flex justify-center items-center py-4'>
        <h1 className="text-xl md:text-4xl text-start">Manage</h1>
      </div>

      <Panel
        header={'Images'}
        description={'Browse, Edit, and Remove'}
        image={false}
        categories={[
          'updates', 
          'events'
        ]}
        inputType={'post'}
      />
      <Panel
        header={'Posts'}
        description={'Browse, Edit, and Remove'}
        image={false}
        categories={[
          'updates', 
          'events'
        ]}
        inputType={'post'}
      />
      <Panel
        header={'Users'}
        description={'Manage authorized admins'}
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
