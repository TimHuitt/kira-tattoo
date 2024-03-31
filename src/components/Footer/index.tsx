'use client'

import Link from 'next/link'

const Footer: React.FC = () => {
  
  return (
    <footer className="fixed bottom-0 left-0 flex justify-center items-end w-screen max-w-screen h-20 z-50">
      <div className="flex justify-between items-end w-full max-w-4xl h-full px-4">
        <Link href='/portfolio/tattoo' className='tab tab-hover'>
          <button >Tattoos</button>
        </Link>
        <Link href='/portfolio/illustration' className='tab tab-hover'>
          <button >Illustration</button>
        </Link>
        <Link href='/portfolio/painting' className='tab tab-hover'>
          <button >Painting</button>
        </Link>
        <Link href='/portfolio/other' className='tab tab-hover'>
          <button >Other</button>
        </Link>
      </div>
    </footer>
  )
}

export default Footer