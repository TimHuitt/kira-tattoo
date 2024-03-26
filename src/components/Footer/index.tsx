import styles from './Footer.module.css'

const Footer: React.FC = () => {
  
  return (
    <footer className="fixed bottom-0 flex justify-center items-end w-full h-20 px-4 z-50">
      <div className="flex justify-between items-end space-x-20 max-w-2xl h-full">
        <button className='tab tab-hover'>Tattoos</button>
        <button className='tab tab-hover'>Illustration</button>
        <button className='tab tab-hover'>Painting</button>
        <button className='tab tab-hover'>Other</button>
      </div>
    </footer>
  )
}

export default Footer