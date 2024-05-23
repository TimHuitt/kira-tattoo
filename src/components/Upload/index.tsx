import axios from "axios"
import Image from "next/image"

const Upload: React.FC<{isMultiple?: boolean | undefined}> = ({ isMultiple }) => {

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files: any = e.target.files ? e.target.files[0] : undefined
    const reader = new FileReader()
    let base64 = ''

    reader.onloadend = async() => {
      const baseData = reader.result as string
      base64 = baseData.replace("data:", "").replace(/^.+,/, "")
      uploadImage(base64)
    }
    reader.readAsDataURL(files)
  }

  const uploadImage = (base64: string) => {
    axios.post('/api/cloudinary', {image: base64})
      .then(res => console.log(res.data))
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
          style={{ display: 'none' }}
          multiple={isMultiple ? true : false}
          onChange={handleFileSelect} 
        />
      </label>
    </div>
  )
}

export default Upload