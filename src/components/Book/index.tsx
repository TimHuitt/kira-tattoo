import { useEffect, useState } from 'react'

interface dates {
  date: string
  day: number
  dayName: string
  month: string
  year: number
  handleClick: React.MouseEventHandler<HTMLDivElement>
}

const Book: React.FC<dates> = ({date, day, dayName, month, year, handleClick}) => {
  const [ dates, setDates ] = useState<{key: string[]}>()
  const [ time, setTime ] = useState<string>('')

  useEffect(() => {
    
  },[])

  const handleTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(e.target.value)
  }

  return (
    <>
      <div 
        className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-slate-900 bg-opacity-70 backdrop-blur-sm overflow-y-hidden z-40"
        onClick={handleClick}
      >
        <div 
          className="relative w-[90%] md:w-3/5 h-auto max-h-5/6 flex flex-col items-center bg-slate-800 border border-2 border-slate-500 rounded-lg overflow-y-auto z-50"
          onClick={(e) => e.stopPropagation()} 
        >
          <div className='absolute top-2 right-2 px-2 bg-fuchsia-900 rounded-full cursor-pointer' onClick={handleClick}>x</div>
          <h1 className='mt-8 text-xl'>Book Some Time!</h1>
          <div className="w-full flex justify-center my-4">
            <div className="w-5/6 h-1 rounded-xl border border-1 border-slate-500" />
          </div>
          <div className="relative w-5/6 h-fill flex flex-col items-center text-center">
            <div className='w-full md:max-w-3/5 flex flex-col items-center text-gray-400'>
              <h2>{dayName}</h2>

              <div className='flex'>
                <h2>{month},&nbsp;</h2>
                <h2>{day}&nbsp;</h2>
                <h2>{year}</h2>
              </div>
            </div>
            <div className="w-full flex justify-center my-4">
              <div className="w-5/6 h-1 rounded-xl border border-1 border-slate-500" />
            </div>
            <div className='mb-4'>
              <small className='text-gray-500'>Available Times</small>
              <div className=''>
                <select 
                  className='p-2 rounded-lg bg-gray-900'
                  value={time} 
                  defaultValue={"9:30"}
                  onChange={handleTime}
                >
                  <option>9:30am</option>
                  <option>10:00am</option>
                  <option>10:30am</option>
                  <option>11:00am</option>
                </select>
              </div>
            </div>
            <p className="book-label">Name</p>
            <input type="text" className="book-input"></input>

            <p className="book-label">Email</p>
            <input type="text" className="book-input"></input>

            <p className="book-label">Comments</p>
            <textarea className="input text-area"></textarea>
            
            <div className="w-full p-4 my-4">
              <button className="form-button submit">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Book