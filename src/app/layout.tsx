import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import { ScreenProvider } from '@/context/ScreenContext';
import { ModalProvider } from '@/context/ModalContext';
import { ScrollProvider } from '@/context/ScrollContext'
import { AdminProvider } from "@/context/AdminContext";
import Header from '../components/Header'

import "./globals.css";
import 'react-tooltip/dist/react-tooltip.css'

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
    <html lang="en" className="overflow-hidden">
      <body className={`${comfortaa.className} overflow-hidden`}>
        <ScrollProvider>
        <ModalProvider>
        <ScreenProvider>
        <AdminProvider>
          <Header />
          <main className="fixed w-full h-full flex items-center mx-auto overflow-hidden z-10">
            {children}
            <div className='h-10 ' />
          </main>
        </AdminProvider>
        </ScreenProvider>
        </ModalProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
