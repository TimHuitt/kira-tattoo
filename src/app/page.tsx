import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-full items-center mx-auto z-10">
      <div className="flex justify-center pt-12 w-11/12 max-w-lg min-h-screen text-white mx-auto bg-zinc-800 shadow-xl overflow-auto">
        Hello!
      </div>
    </main>
  );
}
