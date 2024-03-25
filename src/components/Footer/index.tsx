import styles from './Footer.module.css'

const Footer: React.FC = () => {
  
  return (
    <footer className="fixed fixed bottom-0 flex justify-center w-full h-12 items-center px-4 z-50">
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