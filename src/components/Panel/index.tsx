import { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
// import { Cloudinary } from '@cloudinary/url-gen/index'
import { useAdminContext } from '@/context/AdminContext'

type PanelProp = {
  header: string,
  description: string,
  image: boolean,
  categories: string[],
  inputType: string,
}

const Panel: React.FC<PanelProp> = (props) => {
  const { currentSelection, setShowAdmin, editData, setProcessed } = useAdminContext()
  const [ input, setInput ] = useState(editData?.currentData)

  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: "dqty1eboa"
  //   }
  // })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const file: File | null = e.target.files && e.target.files[0]
    const reader = new FileReader()    
    file && reader.readAsDataURL(file)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }

  const handleSubmit = () => {
    const tempData = {...editData, input}

    axios.put(`api/header`, tempData)
    .then(res => {
      if (res.data.message === "Data processed") {
        setProcessed(true)
        setShowAdmin(false)
      }
    })
    .catch(err => {
      console.error('Error', err)
    })
  }

  const handleCancel = () => {
    setShowAdmin(false)
  }

  return (
    <div className='w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 p-4 pt-2 mb-6 rounded border border-4 border-slate-700 bg-slate-800' onClick={handleClick}>
        <div className='w-full'>
          <h2 className="text-base md:text-xl py-2">Updating {currentSelection}</h2>
          {/* <h4 className="text-xs md:text-base text-end pl-4">{props.description}</h4> */}
        </div>
        <div className="w-full flex justify-center my-4">
          <div className="w-5/6 h-1 rounded border border-1 border-slate-500" />
        </div>
          { props.image && (
            <div className="w-full flex flex-col items-center justify-center">
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                <div className="h-20 flex justify-center m-4 rounded hover:bg-slate-500 cursor-pointer">
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
        {/* <div className='flex justify-center items-center w-full py-4'>
          <h2 className="text-xl mr-4">Category</h2>
          <select value={imgCategory} className='p-2 rounded bg-slate-900 hover:bg-slate-500' onChange={handleChange}>
            {props.categories.map((item, index) => {
              const itemName = item.charAt(0).toUpperCase() + item.slice(1)
              return (
                <option key={`${item}-${index}`} value={item}>{itemName}</option>
              )
            })}
          </select>
        </div> */}
        <div className='flex justify-center items-center w-full py-4'>
          {/* <h2 className="text-xl mr-4">Caption</h2> */}
          <textarea 
            className='p-2 w-full h-auto rounded bg-slate-900 hover:bg-slate-500 resize-none' 
            rows={3}
            value={input} 
            onChange={handleChange} 
          />
        </div>
        <div className='flex justify-around items-center w-full py-4'>
          <button className="border border-2 rounded p-2 hover:bg-slate-500" onClick={handleSubmit}>Save Changes</button>
          <button className="border border-2 rounded p-2 hover:bg-slate-500" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
  )
}

export default Panel