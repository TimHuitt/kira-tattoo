'use client'

import axios from "axios"
import Image from "next/image"

import { SetStateAction, useState } from "react"

interface UploadProps {
  isMultiple?: boolean | undefined
  preset: string
  setPreset: React.Dispatch<SetStateAction<string>>
  uploadFiles: any
  setUploadFiles: any
}

const Upload: React.FC<UploadProps> = ({ isMultiple, preset, setPreset, uploadFiles, setUploadFiles }) => {

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files: FileList | null = e.target.files  
    
    if (files) {
      setPreset(preset)
      setUploadFiles(Array.from(files))
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
        <div 
          className={`
            ${uploadFiles.length > 2 
              ? 'grid-cols-3' 
              : uploadFiles.length > 1
                ? 'grid-cols-2'
                : 'grid-cols-1'}
            grid gap-3 justify-center items-center
          `}>
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