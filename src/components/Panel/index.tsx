import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import { useEffect, useState } from 'react'
import { useAdminContext } from '@/context/AdminContext'
import Upload from '@/components/Upload'

type PanelProp = {
  header: string,
  description: string,
  categories: string[],
  inputType: string,
}

interface PostTypes {
  title?: string | ''
  header?: string | ''
  content?: string | ''
  id?: string | ''
  date?: string | ''
}

const Panel: React.FC<PanelProp> = (props) => {
  const { currentSelection, setShowAdmin, editData, setProcessed, setImageKey, setUpdateFeatured, setUpdatePosts } = useAdminContext()
  const [ postInput, setPostInput ] = useState<PostTypes>()
  const [ input, setInput ] = useState<string>(editData?.currentData || '')
  const [ uploadFiles, setUploadFiles ] = useState<File[]>([])
  const [ preset, setPreset ] = useState<string>('')
  const [ portfolioType, setPortfolioType ] = useState<string>('featured')

  const panelTitle = editData?.section === 'header' ? 'Updating' : 'Adding'
  const saveType = editData?.area === 'post' ? 'New Post' : 'Changes'

  useEffect(() => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const date = month + '-' + day + '-' + year

    setPostInput({
      title: '',
      header: '',
      content: '',
      id: uuidv4(),
      date: date
    })
  },[])

  const uploadImage = (base64: string, preset: string, folder: string = '') => {
    axios.post('/api/cloudinary', {image: base64, preset, folder})
      .then(res => {
        if (res.status === 200) {
          console.info('Upload Successful')
        } else {
          throw(res.status)
        }

        if (preset === 'profile') {
          setImageKey(Date.now().toString())
        } else if (preset === 'featured') {
          setUpdateFeatured(prev => !prev)
        }
        
      })
      .catch(err => console.error('Error uploading image', err))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    // edit header items
    if (editData?.section === 'header' && editData?.area !== 'photo') {
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

    // add images
    } else if (editData?.section !== 'remove') {
      if (uploadFiles) {
        Array.from(uploadFiles).forEach((file: File) => {
          const reader = new FileReader()
          const folder = preset === 'posts' ? postInput?.id : ''
          
          reader.onloadend = async(e) => {
            const baseData = reader.result as string
            uploadImage(baseData, preset, folder)
          }
          
          reader.onerror = (err) => {
            console.error('Error reading file:', err);
          }

          setUpdateFeatured(prev => !prev)
          setShowAdmin(false)
          reader.readAsDataURL(file)
        })
      }
    }
    
    if (editData?.section === 'add') {
      // add posts
      if (editData?.area === 'post') {
        axios.post(`api/content`, postInput)
        .then(res => {
          if (res.status === 200) {
            setUpdatePosts(prev => !prev)
            console.info('Post Added')
          }
        })
        .catch(err => {
          console.error('Error', err)
        })
      } else if (editData?.area === 'section') {
        console.log('test')
      }
    }

    setUploadFiles([])
  }

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id
    const val = e.target.value
    setPostInput(current => ({
      ...current,
      [field]: val
    }))
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }

  const handleCancel = () => {
    setShowAdmin(false)
  }

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPortfolioType(e.target.value)
  }

  useEffect(() => {
    console.log(portfolioType)
  },[portfolioType])

  return (
    <div className='w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 p-4 pt-2 mb-6 rounded border border-4 border-slate-700 bg-slate-800' onClick={handleClick}>
        <div className='w-full'>
          <h2 className="text-base md:text-xl py-2">{panelTitle} {currentSelection}</h2>
          {/* <h4 className="text-xs md:text-base text-end pl-4">{props.description}</h4> */}
        </div>
        <div className="w-full flex justify-center my-4">
          <div className="w-5/6 h-1 rounded border border-1 border-slate-500" />
        </div>
        { editData?.area === 'photo' && (
          <div className="w-full flex flex-col items-center justify-center">
            <h1>Select a new profile image</h1>
            <Upload setPreset={setPreset} preset={'profile'} uploadFiles={uploadFiles} setUploadFiles={setUploadFiles} />
          </div>
        )}
        { editData?.section === 'add' && editData?.area === 'featured' && (
          <div className="w-full flex flex-col items-center justify-center">
            <h1>Select images for upload</h1>
            <Upload setPreset={setPreset} preset={'featured'} isMultiple={true} uploadFiles={uploadFiles} setUploadFiles={setUploadFiles}  />
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
            <input value={postInput?.title} onChange={handleContent} id="title" type="text" className='w-full h-auto mb-4 p-2 rounded bg-slate-900 hover:bg-slate-500 resize-none' />
            
            <label htmlFor="header">Header</label>
            <input value={postInput?.header} onChange={handleContent} id="header" type="text" className='w-full h-auto mb-4 p-2 rounded bg-slate-900 hover:bg-slate-500 resize-none' />
            
            <label htmlFor="content">Content</label>
            <textarea value={postInput?.content} onChange={handleContent} id="content" rows={3} className='w-full h-auto mb-4 p-2 rounded bg-slate-900 hover:bg-slate-500 resize-none' />
            
            <h1>Select images for upload</h1>
            <Upload setPreset={setPreset} preset={'posts'} isMultiple={true} uploadFiles={uploadFiles} setUploadFiles={setUploadFiles} />
          </div>
        )}
        { editData?.area === 'section' && (
          <div className='flex flex-col items-center justify-center'>
            <label htmlFor="content">Display As</label>
            <select defaultValue={portfolioType} onChange={handleType} className='w-full h-auto mb-4 p-2 rounded bg-slate-900 hover:bg-slate-500 resize-none'>
              <option value={'featured'}>Featured</option>
              <option value={'main'}>Main</option>
              <option value={'main'}>Both</option>
            </select>

            
            <h1>Select images for upload</h1>
            <Upload setPreset={setPreset} preset={'portfolio'} isMultiple={true} uploadFiles={uploadFiles} setUploadFiles={setUploadFiles} />
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