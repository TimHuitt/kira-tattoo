import styles from './Footer.module.css'

const Footer: React.FC = () => {
  
  return (
    <footer className={`${styles.Footer} flex justify-center w-full h-12 items-center px-4`}>
      <div className="flex justify-between space-x-20 max-w-lg">
        <button>Tattoos</button>
        <button>Illustration</button>
        <button>Painting</button>
        <button>Other</button>
      </div>
    </footer>
  )
}

export default Footer