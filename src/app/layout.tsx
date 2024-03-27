import type { Metadata } from "next";
import { Jockey_One } from "next/font/google";
import Header from '../components/Header'
import "./globals.css";
import Image from "next/image";
import Footer from '../components/Footer'

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
          <div className="relative pt-12 w-5/6 max-w-3xl h-full text-white mx-auto pb-40 p-6 bg-zinc-800 shadow-lg overflow-auto">
            {children}
            <div className="absolute w-60 h-60 top-4 right-0 z-10 rotate-180">
              <Image
                src="corner.svg"
                alt=""
                fill
                className="max-w-60 max-h-60"
              />
            </div>
          </div>

          <Footer />
        </main>
      </body>
    </html>
  );
}
