"use client";
import React from "react";
 
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    try {
      Cookies.remove("token");
      Cookies.remove("role");
      router.push("/?form=login");
      toast.success("Logout successful. Redirecting to login page...");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <Button onClick={handleLogout} className='w-max'>
      Logout
    </Button>
  );
}

export default LogoutButton;