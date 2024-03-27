import Link from 'next/link'

const Header: React.FC = () => {
  
  return (
    <header className="fixed w-full flex h-12 justify-between items-center bg-zinc-900 shadow-md shadow-violet-500/50 z-50">
      <Link href="/" className='h-full'>
        <div className="flex items-center h-full px-4 bg-purple-600">
          <h1 className="text-4xl">Kira</h1>
        </div>
      </Link>
      <div className="flex space-x-4 px-4 text-xl">
        <Link href="/portfolio">
          <button className='btn btn-hover btn-selected'>Portfolio</button>
        </Link>
        <Link href="/booking">
          <button className='btn btn-hover'>Booking</button>
        </Link>
        <Link href="/contact">
          <button className='btn btn-hover'>Contact</button>
        </Link>
      </div>
    </header>
  )
}

export default Header