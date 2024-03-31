import Image from 'next/image'

const Divider: React.FC = () => {
  return (
    <div className='flex justify-center w-full h-10 overflow-hidden'>
      <Image
          src="divider.svg"
          alt="divider"
          objectFit="contain"
          height={10}
          width={400}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
    </div>
  )
}

export default Divider