import type { Metadata } from "next";
import { Jockey_One } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
