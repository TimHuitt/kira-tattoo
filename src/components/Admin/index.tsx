'use client'

interface AdminProps {
  setShowAdmin: (showAdmin: boolean) => void
}

const Admin: React.FC<AdminProps> = ({ setShowAdmin }) => {
  
  const handleClick = () => {
    setShowAdmin(false)
  }
  
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-slate-700 z-50" onClick={handleClick}>

    </div>
  )
}

export default Admin