import type { Metadata } from "next";
 
import "./globals.css";
import AntdThemeProvider from "@/providers/AntdThemeProvider";

 
export const metadata: Metadata = {
  title: "Wasan Doctor",
  description: "An App for Doctor Appointment Booking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>   
         <AntdThemeProvider>
            {children}
            </AntdThemeProvider>
      </body>
    </html>
  );
}
