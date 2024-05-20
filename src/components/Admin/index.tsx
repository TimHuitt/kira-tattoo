'use client'

import Panel from "@/components/Panel"

interface AdminProps {
  setShowAdmin: (showAdmin: boolean) => void
}

const Admin: React.FC<AdminProps> = ({ setShowAdmin }) => {
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    
    setShowAdmin(false)
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-950 bg-opacity-75 backdrop-blur-sm z-50" onClick={handleClick}>
      <Panel
        header={'text'}
        description={'Create a new post'}
        image={false}
        categories={[
          'updates', 
          'events'
        ]}
        inputType={'post'}
      />
    </div>
  )
}

export default Admin