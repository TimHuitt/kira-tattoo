'use client'

import { useState, useEffect } from 'react'

export default function Booking() {
  const [ days ] = useState<string[]>(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
  const [ calendar, setCalendar ] = useState<number[]>()
  const [ startIndex, setStartIndex ] = useState<number>(0)
  const [year, setYear] = useState<number>(0)
  const [monthNum, setMonthNum] = useState<number>(0)
  const [month, setMonth] = useState<string>('')
  const [day, setDay] = useState<number>(0)

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    console.log(target.id);
  }


  useEffect(() => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date()

    setYear(date.getFullYear())
    setMonthNum(date.getMonth())
    setMonth(months[date.getMonth()])
    setDay(date.getDate())

    const first = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    const last = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
    const days = first + last

    setCalendar(Array.from({length: days}, (_, i) => i - first + 1))
    setStartIndex(first)
  },[])

  return (
    <>
      <div className="relative w-full h-auto relative z-30">
        <h1  className="text-4xl text-center pb-10">Booking</h1>
        <div className="relative top-[30%] w-full h-auto">
          <div className="flex justify-around py-4 text-2xl">
            <h2>{month}</h2>
            <h2>{year}</h2>
          </div>
          <div className="grid grid-rows-6 grid-cols-7 grid-rows-[40px,repeat(5,minmax(0,1fr))] text-center text-slate-600 w-full h-auto mb-20 rounded-xl border border-0 border-fuchsia-700 overflow-hidden">
            {days.map((day, index) => (
              <h3 key={`${days}-${index}-label`} className="days">{day}</h3>
            ))}
            {calendar?.map((day, index) => (
              index >= startIndex ? (
                <div 
                  key={`${day}-${index}`} 
                  id={`${monthNum}-${day}-${year}`} 
                  className="text-xs text-start md:text-base text-slate-400 h-14 md:h-20 lg:h-32 bg-gray-900 hover:bg-gray-700 border border-2 border-slate-700 md:border-0 hover:border hover:border-4 hover:border-lime-700 active:bg-slate-800 m-[.1rem] md:m-1 rounded-lg cursor-pointer"
                  onClick={handleClick}  
                >
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
