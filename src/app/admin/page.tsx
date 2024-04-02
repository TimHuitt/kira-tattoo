'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import Panel from '../../components/Panel'

export default function Admin() {  
  return (
    <div className="relative h-full z-30">
      <div className='w-5/6 max-h-60 min-h-20 md:min-h-40 md:min-h-56'>
        <h1 className="text-4xl text-start">Admin Panel</h1>
      </div>
      
      <Panel />
      <Panel />
      <Panel />

    </div>
  )
}
