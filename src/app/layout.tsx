import type { Metadata } from "next";
import { ModalProvider } from '@/app/provider';
import { Comfortaa } from "next/font/google";
import Image from "next/image";

import Header from '../components/Header'
import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: '--font-sans',
  weight: "400"
});

export const metadata: Metadata = {
  title: "Kira Lahman",
  description: "Artwork by Kira Lahman, including Tattoos, Illustrations, Paintings, and much more",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>
        <ModalProvider>
          <Header />
          <main className="fixed w-full h-full flex items-center mx-auto overflow-hidden z-10">
            <div className="relative w-[90%] max-w-5xl h-full text-white mx-auto mt-20 p-4 md:p-6 lg:p-8 rounded-xl bg-slate-800 shadow-xl shadow-slate-900 overflow-y-auto overflow-x-hidden">
              {children}
              <div>
                <div className="absolute w-[50vmin] max-w-60 h-[50vmin] max-h-60 top-4 right-2 flex justify-end z-10 rotate-180 border-none">
                  <Image
                    src="corner.svg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <div className='h-10 ' />
            </div>
          </main>
        </ModalProvider>
      </body>
    </html>
  );
}
