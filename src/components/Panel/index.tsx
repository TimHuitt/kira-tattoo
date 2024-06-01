import { useState } from 'react'
import axios from 'axios'

import { useAdminContext } from '@/context/AdminContext'
import Upload from '@/components/Upload'

type PanelProp = {
  header: string,
  description: string,
  categories: string[],
  inputType: string,
}

const Panel: React.FC<PanelProp> = (props) => {
  const { currentSelection, setShowAdmin, editData, setProcessed, isImage, setIsImage } = useAdminContext()
  const [ input, setInput ] = useState(editData?.currentData)

  const panelTitle = editData?.section === 'header' ? 'Updating' : 'Adding'
  const saveType = editData?.area === 'post' ? 'New Post' : 'Changes'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    if (editData?.section === 'header') {
      setShowAdmin(false)
      const tempData = {...editData, input}

      axios.put(`api/content`, tempData)
      .then(res => {
        if (res.status === 200) {
          setProcessed(true)
        }
      })
      .catch(err => {
        console.error('Error', err)
      })
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }

  const handleCancel = () => {
    setShowAdmin(false)
  }

  return (
    <div className='w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 p-4 pt-2 mb-6 rounded border border-4 border-slate-700 bg-slate-800' onClick={handleClick}>
        <div className='w-full'>
          <h2 className="text-base md:text-xl py-2">{panelTitle} {currentSelection}</h2>
          {/* <h4 className="text-xs md:text-base text-end pl-4">{props.description}</h4> */}
        </div>
        <div className="w-full flex justify-center my-4">
          <div className="w-5/6 h-1 rounded border border-1 border-slate-500" />
        </div>
        { currentSelection === 'Photo' && (
          <div className="w-full flex flex-col items-center justify-center">
            <h1>Select a new profile image</h1>
            <Upload preset={'profile'} />
          </div>
        )}
        { editData?.section === 'add' && editData?.area === 'featured' && (
          <div className="w-full flex flex-col items-center justify-center">
            <h1>Select images for upload</h1>
            <Upload preset={'featured'} isMultiple={true} />
          </div>
        )}
        { editData?.section === 'header' && editData?.area !== 'photo' && editData?.area !== 'images' && (
          <div className='flex justify-center items-center w-full py-4'>
            {/* <h2 className="text-xl mr-4">Caption</h2> */}
            <input 
              className='p-2 w-full h-auto rounded bg-slate-900 hover:bg-slate-500 resize-none' 
              value={input} 
              onChange={handleChange}
              onKeyDown={(e) => {
                e.code === 'Enter' && handleSubmit()
              }}
            />
          </div>
        )}
        { editData?.area === 'post' && (
          <div className='flex flex-col items-center justify-center'>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" className='w-full h-auto mb-4 p-2 rounded bg-slate-900 hover:bg-slate-500 resize-none' />
            <label htmlFor="header">Header</label>
            <input id="header" type="text" className='w-full h-auto mb-4 p-2 rounded bg-slate-900 hover:bg-slate-500 resize-none' />
            <label htmlFor="content">Content</label>
            <textarea id="content" rows={3} className='w-full h-auto mb-4 p-2 rounded bg-slate-900 hover:bg-slate-500 resize-none' />
            <h1>Select images for upload</h1>
            <Upload preset={'post'} isMultiple={true} />
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
        
        <div className='flex justify-around items-center w-full py-4'>
          <button className="border border-2 rounded p-2 hover:bg-slate-500" onClick={handleSubmit}>Save {saveType}</button>
          <button className="border border-2 rounded p-2 hover:bg-slate-500" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
  )
}

export default Panel