import type { Metadata } from "next";
 
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import CustomLayout from "@/custom-layout";
import { Toaster } from "react-hot-toast";
 

export const metadata: Metadata = {
  title: "Wasan Fitness & Gym",
  description: "Gym and Fitness Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>      
        <CustomLayout>
        {children}
        </CustomLayout>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
    </ClerkProvider>
  );
}
