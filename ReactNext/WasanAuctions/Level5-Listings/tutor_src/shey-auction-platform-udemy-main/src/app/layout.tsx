import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import CustomLayout from "@/custom-layouts";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Shey Auction Platform - Dev",
  description: "An online auction platform for digital assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
        ${montserrat.className}
        antialiased`}
        cz-shortcut-listen="true"
      >
        <Toaster />
        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
  );
}
