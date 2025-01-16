import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { montserrat } from "./config/fonts";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Toaster } from "sonner";
import { PaypalProvider } from "./components/providers/paypalProvider";

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
      <body>

        <main
          className={`${montserrat.className}  antialiased min-h-screen h-screen `}>

          <div className="relative w-full h-min-screen">
            <Toaster />

          </div>
          <PaypalProvider>

            {children}
          </PaypalProvider>
        </main>
      </body>


    </html>
  );
}
