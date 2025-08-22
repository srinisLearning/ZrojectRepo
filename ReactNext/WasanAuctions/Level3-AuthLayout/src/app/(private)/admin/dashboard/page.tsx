"use client";
import React, { useEffect } from "react";
import { getLoggedInUser } from "@/server-actions/users";
import { IUser } from "@/interfaces";
import toast from "react-hot-toast";
import LogoutButton from "@/components/ui/functional/logout-button";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";

const AdminDashboardPage = () => {
  const {user} = usersGlobalStore() as IUsersStore


  return (
    <>
      <div>User Dashboard Page</div>
      <div className="flex flex-col gap-5 p-5">
        {user && (
          <>
            <h2>ID: {user.id}</h2>
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
