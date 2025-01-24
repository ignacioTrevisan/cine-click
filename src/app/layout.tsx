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
    <html className="h-full">
      <body className="h-full">
        <div
          className="min-h-screen"
          style={{
            backgroundAttachment: "fixed",
          }}
        >
          <main className={`${montserrat.className} antialiased`}>
            <div className="relative w-full">
              <Toaster />
            </div>
            <PaypalProvider>{children}</PaypalProvider>
          </main>
        </div>
      </body>
    </html>



  );
}
