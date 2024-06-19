import Image from 'next/image'

interface NotifyTypes {
  message: string
  status: string
}

const Notify: React.FC<NotifyTypes> = ({ message, status }) => {

  const Status = () => (
    <div className="">
      <Image
        src={`${status}.svg`}
        alt={`${status} icon`}
        width={25}
        height={25}
      />
    </div>  
  )

  return (
    <div className='fixed flex gap-2 items-center bottom-4 left-1/2 -translate-x-1/2 py-2 pe-4 ps-2 bg-slate-900 border-4 border-lime-400 rounded-xl z-[100]'>
      <div>{<Status />}</div>
      <div>{message}</div>
    </div>
  )
}

export default Notify