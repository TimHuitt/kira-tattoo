'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import { useScrollContext } from '@/app/ScrollContext'
import Panel from '../../components/Panel'

export default function Admin() {  

  const { scrollRef } = useScrollContext()

  return (

    <div ref={scrollRef} className="relative w-full h-full mt-20 overflow-y-auto">
      <div className='h-auto w-[90%] max-w-5xl text-white mx-auto  p-4 pt-10 md:p-6 lg:p-8 rounded-xl bg-slate-800 shadow-xl shadow-slate-900 overflow-x-hidden'>
      
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

          
          <div className='h-20 ' />
        </div>
      </div>
    </div>
  )
}
