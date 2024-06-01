'use client'

import axios from "axios"
import Image from "next/image"

import { useAdminContext } from "@/context/AdminContext"

interface UploadProps {
  isMultiple?: boolean | undefined
  preset: string
}
const Upload: React.FC<UploadProps> = ({ isMultiple, preset }) => {
  const { setImageKey, setUpdateFeatured } = useAdminContext()

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault()
//     const files: any = e.target.files ? e.target.files[0] : undefined
//     const reader = new FileReader()
// 
//     reader.readAsDataURL(files)
// 
//     reader.onloadend = async() => {
//       const baseData = reader.result as string
//       uploadImage(baseData)
//     }
//   }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files: FileList | null = e.target.files  
    
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader()

        reader.onloadend = async() => {
          const baseData = reader.result as string
          uploadImage(baseData, preset)
        }
        
        reader.onerror = (err) => {
          console.error('Error reading file:', err);
        }

        reader.readAsDataURL(file)
      })
    }
  }

  const uploadImage = (base64: string, preset: string) => {
    axios.post('/api/cloudinary', {image: base64, preset: preset})
      .then(res => {
        console.info(res)
        if (preset === 'profile') {
          setImageKey(Date.now().toString())
        } else if (preset === 'featured') {
          setUpdateFeatured(prev => !prev)
        }
      })
      .catch(err => console.error('Error uploading image', err))
  }


  return (

    <div className="flex flex-col items-center justify-center">
      <label htmlFor="file-upload" className="flex flex-col items-center justify-center">
        <div className="h-10 flex justify-center m-4 rounded hover:bg-slate-500 cursor-pointer">
          <Image 
            src='/images/image.svg'
            height={50}
            width={50}
            alt={''} 
          />
        </div>
        <input 
          id="file-upload" 
          type="file" 
          accept="image/*"
          style={{ display: 'none' }}
          multiple={isMultiple ? true : false}
          onChange={handleFileSelect} 
        />
      </label>
    </div>
  )
}

export default Upload