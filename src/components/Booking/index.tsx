'use client'

import { useState, useEffect, useRef } from 'react'
import Book from '../Book'
interface size {
  width: number
}

const Booking: React.FC<size> = ({ width }) => {

  return (
    <>
      <div className="relative w-full h-auto relative z-30">
        <h1  className="text-4xl text-center pb-10 moto">Booking</h1>
        <div className="relative top-[30%] w-full h-auto flex justify-center text-center">
          <h3>Check my schedule and book time at <a href="#" className='underline'>calendly.com</a></h3>
        </div>
      </div>
    </>
  );
}

export default Booking