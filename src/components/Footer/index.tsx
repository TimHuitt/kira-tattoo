const Footer: React.FC = () => {
  
  return (
    <footer className="fixed bottom-0 flex justify-center items-end w-screen h-20 z-50">
      <div className="flex justify-between items-end w-full max-w-4xl h-full px-4">
        <button className='tab tab-hover'>Tattoos</button>
        <button className='tab tab-hover tab-selected'>Illustration</button>
        <button className='tab tab-hover'>Painting</button>
        <button className='tab tab-hover'>Other</button>
      </div>
    </footer>
  )
}

export default Footer