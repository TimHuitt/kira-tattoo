import styles from './Footer.module.css'

const Footer: React.FC = () => {
  
  return (
    <footer className="fixed fixed bottom-0 flex justify-center w-full h-12 items-center px-4 z-50">
      <div className="flex justify-between space-x-20 max-w-">
        <button className='pt-4 pb-2 px-6 border-4 border-pink-900 rounded-xl rounded-b-none bg-zinc-900 bg-opacity-75'>Tattoos</button>
        <button className='pt-4 pb-2 px-6 border-4 border-pink-900 rounded-xl rounded-b-none bg-zinc-900 bg-opacity-75'>Illustration</button>
        <button className='pt-4 pb-2 px-6 border-4 border-pink-900 rounded-xl rounded-b-none bg-zinc-900 bg-opacity-75'>Painting</button>
        <button className='pt-4 pb-2 px-6 border-4 border-pink-900 rounded-xl rounded-b-none bg-zinc-900 bg-opacity-75'>Other</button>
      </div>
    </footer>
  )
}

export default Footer