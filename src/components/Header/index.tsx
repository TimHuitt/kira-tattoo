import styles from './Header.module.css'

const Header: React.FC = () => {
  
  return (
    <header className="relative flex h-12 justify-between items-center bg-zinc-900 shadow-lg shadow-violet-500/50 z-50">
      <div className="flex items-center h-full px-4 bg-purple-600">
        <h1 className="text-4xl">Kira</h1>
      </div>
      <div className="flex space-x-4 px-4">
        <button>Portfolio</button>
        <button>Booking</button>
        <button>Contact</button>
      </div>
    </header>
  )
}

export default Header