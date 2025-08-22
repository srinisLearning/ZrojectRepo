import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Wasan Auctions",
  description: "A Website for Online Auctions",
};

export default function RootLayout({
  children,
}: {  children: React.ReactNode;}) {
  return (
    <>
    <html lang="en">
      <body  className={`
        ${montserrat.className}
        antialiased`}
        cz-shortcut-listen="true">   
       {children}
       
      </body>
       <Toaster />
        
    </html>
    </>
    
  );
}
