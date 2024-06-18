import { useEffect, useState } from "react"

interface NotifyTypes {
  message: string
  status: string
}

const Notify: React.FC<NotifyTypes> = ({ message, status }) => {

  useEffect(() => {
    console.log(message, status)
  },[message, status])


  return (
    <div className='fixed bottom-4 left-1/2 -translate-x-1/2 py-2 px-4 bg-slate-900 border-4 border-lime-400 rounded-xl z-[100]'>
      <p>{message} {status}</p>
    </div>
  )
}

export default Notify