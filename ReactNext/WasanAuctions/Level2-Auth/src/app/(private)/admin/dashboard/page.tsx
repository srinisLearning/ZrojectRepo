"use client";
import React, { useEffect } from "react";
import { getLoggedInUser } from "@/server-actions/users";
import { IUser } from "@/interfaces";
import toast from "react-hot-toast";
import LogoutButton from "@/components/ui/functional/logout-button";

const AdminDashboardPage = () => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const fetchUser = async () => {
    try {
      const response: any = await getLoggedInUser();
      if (!response.success) {
        throw new Error(
          response.message ||
            "Failed to fetch user data. Please try again later"
        );
      }
      setUser(response.data);
    } catch (error: any) {
      toast.error(
        error.message || "Failed to fetch data. Please try again later"
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div>User Dashboard Page</div>
      <div className="flex flex-col gap-5 p-5">
        {user && (
          <>
            <h2>ID: {user?.id}</h2>
            <h2>Name: {user?.name}</h2>
            <h2>Email: {user?.email}</h2>
            <h2>Role: {user?.role}</h2>
            <LogoutButton />
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboardPage;
