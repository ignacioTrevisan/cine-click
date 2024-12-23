import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { inter, montserrat } from "./config/fonts";
import { verifyJWT } from "./core/use-cases/auth/verifyJWT";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "%s - CineClick",
  description: "Una cartelera de cine genial",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {



  return (
    <html lang="en">
      <body
        className={`${montserrat.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
