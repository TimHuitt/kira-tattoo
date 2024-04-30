'use client'

import { useState } from 'react'

export default function Contact() {
  const [ submitted, setSubmitted ] = useState<boolean>(false)
  const [ error, setError ] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch("https://formcarry.com/s/d1l-a8exs6G", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setSubmitted(true)
        } else {
          setError(res.message)
        }
      })
      .catch((err) => setError(err))
  }

  return (
    <>
      <div className="relative w-full z-30 text-lg">
        <h1  className="text-4xl text-center py-10 moto">Contact</h1>
          <div className="w-full flex justify-center mb-40">
            <form onSubmit={handleSubmit} className="w-full md:w-5/6 flex flex-col items-center text-center">
              <label className="label" htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name"
                className="input">
              </input>
              <label className="label" htmlFor="email">Email</label>
              <input type="email" className="input" name="email" />
              <label className="label" htmlFor="message">Message</label>
              <textarea className="input text-area" name="message"></textarea>
              
              <div className="w-full p-4 my-4">
                <button type="submit" className="form-button">Submit</button>
                <button className="form-button">Clear</button>
              </div>
            </form>
          </div>
          <div className='h-20 ' />
        </div>
    </>
  );
}
