"use client";
import { usePathname } from "next/navigation";
import React from "react";
import PrivateLayout from "./private-layout";
import PublicLayout from "./public-layout";

function CustomLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPrivateRoute =
    pathname.startsWith("/user") || pathname.startsWith("/admin");

  if (isPrivateRoute) {
    return <PrivateLayout>{children}</PrivateLayout>;
  }
  return <PublicLayout>{children}</PublicLayout>;
}

export default CustomLayout;
