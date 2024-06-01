'use client'

import axios from "axios"
import Image from "next/image"

import { useState } from "react"

interface UploadProps {
  isMultiple?: boolean | undefined
  preset: string
  uploadFiles: any
  setUploadFiles: any
}

const Upload: React.FC<UploadProps> = ({ isMultiple, uploadFiles, setUploadFiles }) => {

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files: FileList | null = e.target.files  
    
    if (files) {
      setUploadFiles(Array.from(files))

//       Array.from(files).forEach((file: File) => {
//         const reader = new FileReader()
//         const filesList: (string | ArrayBuffer | null)[] = []
//         
//         // reader.onloadend = async(e) => {
//         //   const baseData = reader.result as string
//         //   setUploadFiles(fileArray)
//         //   // uploadImage(baseData, preset)
//         // }
//         
//         reader.onerror = (err) => {
//           console.error('Error reading file:', err);
//         }
// 
//         reader.readAsDataURL(file)
//       })

    }
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
        <div className="grid gap-3 grid-cols-3">
          { uploadFiles?.map((file: File, index: number) => (
              <Image 
                key={`file-${index}`} 
                src={URL.createObjectURL(file)} 
                width={100}
                height={100}
                alt={''} />
          ))}
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