
import { getServerSession } from 'next-auth';
import {  signIn, signOut } from "next-auth/react"

const Login = () => {
  
  if (true) {
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