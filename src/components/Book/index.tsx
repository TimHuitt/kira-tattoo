import { useEffect } from 'react'

interface dates {
  date: string
  handleClick: React.MouseEventHandler<HTMLDivElement>
}

const Book: React.FC<dates> = ({date, handleClick}) => {
  useEffect(() => {
    console.log('test booking')
  })
  return (
    <>
      <div 
        className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-slate-900 bg-opacity-70 backdrop-blur-sm overflow-y-hidden z-40"
        onClick={handleClick}
      >
        <div 
          className="relative w-[90%] md:w-3/5 h-5/6 max-h-5/6 flex flex-col items-center bg-slate-800 border border-2 border-slate-500 rounded-lg overflow-y-auto z-50"
          onClick={(e) => e.stopPropagation()} 
        >
          <div className='absolute top-2 right-2 px-2 bg-fuchsia-900 rounded-full cursor-pointer' onClick={handleClick}>x</div>
          <h1 className='py-8'>Book Some Time!</h1>
          <div className="relative w-5/6 h-fill flex flex-col items-center text-center">

            <p className="book-label">Name</p>
            <input type="text" className="book-input"></input>

            <p className="book-label">Email</p>
            <input type="text" className="book-input"></input>

            <p className="book-label">Comments</p>
            <textarea className="input text-area"></textarea>
            
            <div className="w-full p-4 my-4">
              <button className="form-button submit">Submit</button>
              <button className="form-button cancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Book