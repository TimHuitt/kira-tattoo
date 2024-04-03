'use client'

import Image from "next/image";
import { useState, useEffect } from 'react'

export default function Booking() {
  const [ calendar, setCalendar ] = useState<number[]>()
  const [ startIndex, setStartIndex ] = useState<number>(0)

  useEffect(() => {
    setCalendar(Array.from({length: 30}, (key, i) => i + 1))
    setStartIndex(0)
  },[])

  return (
    <>
      <div className="relative w-full h-auto relative z-30">
        <h1  className="text-4xl text-center pb-10">Booking</h1>
        <div className="relative top-[30%] w-full h-auto">
          <div className="grid grid-rows-6 grid-cols-7 w-full h-auto rounded-xl border border-0 border-fuchsia-700 overflow-hidden">
            {calendar?.map((day, index) => (
              index >= startIndex ? (
                <div key={`${day}-${index}`} className="text-xs md:text-base h-14 md:h-20 lg:h-32 bg-slate-900 hover:bg-slate-800 border border-2 border-slate-700 md:border-0 hover:border hover:border-4 hover:border-lime-700 active:bg-slate-800 m-[.1rem] md:m-1 rounded-lg cursor-pointer">
                  <div className="p-2">
                    {day}
                  </div>
                </div>
              ) : (
                <div key={index}>
                  
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
