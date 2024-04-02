import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AdvancedImage, lazyload } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen/index'
import { fill } from '@cloudinary/url-gen/actions/resize'

type PanelProp = {
  header: string,
  description: string,
  image: boolean,
  categories: string[],
  inputType: string,
}

const Panel: React.FC<PanelProp> = (props) => {
  const [ imgCategory, setImgCategory ] = useState<string>('')
  const [ hidden, setHidden ] = useState<string>('hidden')

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dqty1eboa"
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setImgCategory(e.target.value)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file: File | null = e.target.files && e.target.files[0]
    console.log(file)

    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      console.log(e.target?.result)
    }
    
    file && reader.readAsDataURL(file)
  }

  const handleClick = () => {
    setHidden(prev => prev === 'hidden' ? '' : 'hidden')
  }

  return (
    <div className='w-full p-4 pt-2 mb-6 rounded-xl border border-1 border-slate-700 bg-slate-800 hover:bg-slate-700'>
        <div className='w-full cursor-pointer' onClick={handleClick}>
          <h2 className="text-base md:text-xl py-2">{props.header}</h2>
          <h4 className="text-xs md:text-base text-end pl-4">{props.description}</h4>
        </div>
        <div className={hidden}>
          <div className="w-full flex justify-center my-4">
            <div className="w-5/6 h-1 rounded-xl border border-1 border-slate-500" />
          </div>
            { props.image && (
              <div className="w-full flex flex-col items-center justify-center">
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                  <div className="h-20 flex justify-center m-4 rounded-lg hover:bg-slate-500 cursor-pointer">
                    <Image 
                      src='/images/image.svg'
                      height={100}
                      width={100}
                      alt={''} 
                    />
                  </div>
                  <input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleFileSelect} />
                </label>
              </div>
            )}
          <div className='flex justify-center items-center w-full py-4'>
            <h2 className="text-xl mr-4">Category</h2>
            <select value={imgCategory} className='p-2 rounded-lg bg-slate-900 hover:bg-slate-500' onChange={handleChange}>
              {props.categories.map((item, index) => {
                const itemName = item.charAt(0).toUpperCase() + item.slice(1)
                return (
                  <option key={`${item}-${index}`} value={item}>{itemName}</option>
                )
              })}
            </select>
          </div>
          <div className='flex justify-center items-center w-full py-4'>
            <h2 className="text-xl mr-4">Caption</h2>
            <input type="text" placeholder="Something about this image" className='p-2 w-3/5 rounded-lg bg-slate-900 hover:bg-slate-500' />
          </div>
          <div className='flex justify-center items-center w-full py-4'>
            <button className="border border-2 rounded-lg p-2 hover:bg-slate-500">Add New Image</button>
          </div>
        </div>
      </div>
  )
}

export default Panel