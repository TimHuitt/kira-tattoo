import { useState, useEffect } from 'react'
import Image from 'next/image'

// type imageProp = {
//   src: string
// }

const Panel: React.FC = () => {
  const [ imgCategory, setImgCategory ] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setImgCategory(e.target.value)
  }

  return (
    <div className="w-full p-4 pt-6 mt-[10%] rounded-xl border border-1 border-slate-700 bg-slate-800">
        <h2 className="text-xl py-2">Upload Images</h2>
        <h4 className="text-base pl-4">Select an image, select category, add details.</h4>
        <div className="w-full flex justify-center my-4">
          <div className="w-5/6 h-1 rounded-xl border border-1 border-slate-500" />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="h-20 flex justify-center m-4 border border-2 border-slate-500 rounded-lg hover:bg-slate-700 cursor-pointer">
            <Image 
              src='/images/image.svg'
              height={100}
              width={100}
              alt={''} 
            />
          </div>
        </div>
        <div className='flex justify-center items-center w-full py-4'>
          <h2 className="text-xl mr-4">Category</h2>
          <select value={imgCategory} className='p-2 text-black rounded-lg' onChange={handleChange}>
            <option value={'featured'}>Featured</option>
            <option value={'tattoo'}>Tattoo</option>
            <option value={'illustration'}>Illustration</option>
            <option value={'painting'}>Painting</option>
            <option value={'other'}>Other</option>
          </select>
        </div>
        <div className='flex justify-center items-center w-full py-4'>
          <h2 className="text-xl mr-4">Caption</h2>
          <input type="text" placeholder="Something about this image" className='p-2 w-3/5 rounded-lg text-black'></input>
        </div>
        <div className='flex justify-center items-center w-full py-4'>
          <button className="border border-2 rounded-lg p-2 hover:bg-slate-600">Add New Image</button>
        </div>
      </div>
  )
}

export default Panel