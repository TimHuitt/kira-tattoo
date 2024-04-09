import Image from "next/image";


export default function Contact() {
  return (
    <>
      <div className="relative z-30">
        <h1  className="text-4xl text-center py-10">Contact</h1>
        <div className="w-full flex justify-center mb-40">
          <div className="w-5/6 flex flex-col items-center text-center">

            <p className="label">Name</p>
            <input type="text" className="input"></input>

            <p className="label">Email</p>
            <input type="text" className="input"></input>

            <p className="label">Comments</p>
            <textarea className="input text-area"></textarea>
            
          </div>
          <div className='h-20 ' />
        </div>
      </div>
    </>
  );
}
