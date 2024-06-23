import { useState, useEffect } from "react";
import {  signIn, signOut } from "next-auth/react"
import { getSession } from "next-auth/react";

const Login = () => {
  const [ session, setSession ] = useState(null)

  useEffect(() => {
    const fetchSession = async () => {
      const current: any = await getSession();
      setSession(current);
    }

    fetchSession();
  },[])

  const handleSignOut = () => {
    signOut()
  }
  

  if (session) {
    return (
      <>
      <div className="fixed top-18 right-6 cursor-pointer z-50">
        <div onClick={handleSignOut}>Sign Out</div>
      </div>
      </>
    )
  }

}

export default Login