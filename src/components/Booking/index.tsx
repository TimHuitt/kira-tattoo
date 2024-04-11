'use client'

import { useState, useEffect, useRef } from 'react'
import Book from '../Book'
interface size {
  width: number
}

const Booking: React.FC<size> = ({ width }) => {
  const [ days, setDays ] = useState<string[]>([])
  const [ calendar, setCalendar ] = useState<number[]>()
  const [ startIndex, setStartIndex ] = useState<number>(0)
  const [ year, setYear ] = useState<number>(0)
  const [ monthNum, setMonthNum ] = useState<number>(0)
  const [ month, setMonth ] = useState<string>('')
  const [ showBook, setShowBook ] = useState<boolean>(false)
  const currentID = useRef<string>('')

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    currentID.current = target.id
    setShowBook(prev => !prev)
  }

  useEffect(() => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date()

    setYear(date.getFullYear())
    setMonthNum(date.getMonth())
    setMonth(months[date.getMonth()])

    const first = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    const last = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
    const days = first + last

    setCalendar(Array.from({length: days}, (_, i) => i - first + 1))
    setStartIndex(first)

    const daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    setDays(width > 678 ? daysLong : daysShort)
  },[width])

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
                  className="text-xs text-start md:text-base text-slate-400 h-14 md:h-20 lg:h-32 bg-gray-900 hover:bg-gray-700 border border-2 border-slate-700 md:border-0 hover:border hover:border-4 hover:border-lime-700 active:bg-slate-800 m-[.1rem] md:m-1 rounded-lg cursor-pointer"
                >
                  <div 
                    className="w-full h-full p-2" 
                    id={`${monthNum}-${day}-${year}`}  
                    onClick={handleClick}
                  >
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
      {showBook && (
        <Book date={currentID.current} month={month} year={year} handleClick={handleClick}/>
      )}
    </>
  );
}

export default Booking