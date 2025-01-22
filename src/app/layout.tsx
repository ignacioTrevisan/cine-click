import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "./config/fonts";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Toaster } from "sonner";
import { PaypalProvider } from "./components/providers/paypalProvider";
import 'animate.css';



export const metadata: Metadata = {
  title: "%s - CineClick",
  description: "Una cartelera de cine genial",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {



  return (
    <html lang="en">
      <body>

        <main
          className={`${montserrat.className}  antialiased min-h-screen bg-gradient-to-br from-rose-50 to-teal-50`}>

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
