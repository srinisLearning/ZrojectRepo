import type { Metadata } from "next";
import { connectToDB } from "@/config/dbConnect";
 
import "./globals.css";
import AntdThemeProvider from "@/providers/AntdThemeProvider";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

 
export const metadata: Metadata = {
  title: "Wasan Hospitals",
  description: "An App for Doctor Appointment Booking",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   connectToDB();
  return (
   <ClerkProvider>
      <html lang="en">
        <body>
           
          <AntdThemeProvider>
          {children}
          </AntdThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
