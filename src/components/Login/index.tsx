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

  if (session) {
    return (
      <>
      <div className="">
        <div onClick={() => signOut()}>Sign Out</div>
      </div>
      </>
    )
  }

  return (
    <div className="">
      {/* Not signed in <br /> */}
      <div onClick={() => signIn()}>Sign In</div>
    </div>
  )
}

export default Login