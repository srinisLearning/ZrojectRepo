'use client'
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import React from "react";

function UserDashboardPage() {
  const { user } = usersGlobalStore() as IUsersStore;
  return (
    <div className="flex flex-col gap-5">
      {user && (
        <>
          {" "}
          <h1>Dashboard Page</h1>
          <h1>User ID : {user.id}</h1>
          <h1>Name : {user.name}</h1>
          <h1>Email : {user.email}</h1>
          <h1>Role : {user.role}</h1>
        </>
      )}
    </div>
  );
}

export default UserDashboardPage;
