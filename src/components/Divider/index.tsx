import Image from 'next/image'

interface refType {
  sectionRef: React.RefObject<HTMLDivElement>
}

const Divider: React.FC<refType> = ({sectionRef}) => {
  return (
    <div className='flex justify-center w-full py-10 overflow-hidden'>
      <div ref={sectionRef}>
        <Image
            src="divider.svg"
            alt="divider"
            height={10}
            width={400}
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
    </div>
  )
}

export default Divider