import type { Metadata } from "next";
import { Jockey_One } from "next/font/google";
import { headers } from 'next/headers'
import { useState, useEffect } from 'react'
import Image from "next/image";

import Header from '../components/Header'
import "./globals.css";

const jockey = Jockey_One({
  subsets: ["latin"],
  variable: '--font-jockey',
  weight: "400"
});

export const metadata: Metadata = {
  title: "Kira Lahman",
  description: "Artwork by Kira Lahman, including Tattoos, Illustrations, Paintings, and much more",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={jockey.className}>
        <Header />
        <main className="fixed w-full h-full flex items-center mx-auto mt-10 overflow-hidden z-10">
          <div className="relative pt-12 w-5/6 max-w-3xl h-full text-white mx-auto pb-40 p-6 bg-zinc-800 shadow-lg overflow-y-auto overflow-x-hidden">
            {children}
            <div className="absolute w-[50vmin] max-w-60 h-[50vmin] max-h-60 top-5 right-2 flex justify-end z-10 rotate-180 border-none">
              <Image
                src="corner.svg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
