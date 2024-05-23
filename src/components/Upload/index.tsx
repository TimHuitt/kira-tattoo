import Image from "next/image"

const Upload: React.FC<{isMultiple?: boolean | undefined}> = ({ isMultiple }) => {

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e.target.files ? e.target.files[0] : null
    const reader = new FileReader()
    reader.onloadend = () => {
      const baseData = ''
    }
    console.log(files)

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