import styles from './Header.module.css'

const Header: React.FC = () => {
  
  return (
    <header className={`${styles.Header} flex h-12 justify-between items-center`}>
      <div className="flex items-center h-full px-4 bg-purple-600">
        <h1 className="text-4xl">Kira</h1>
      </div>
      <div className="flex space-x-4 px-4">
        <button>Home</button>
        <button>Portfolio</button>
        <button>Booking</button>
        <button>Contact</button>
      </div>
    </header>
  )
}

export default Header