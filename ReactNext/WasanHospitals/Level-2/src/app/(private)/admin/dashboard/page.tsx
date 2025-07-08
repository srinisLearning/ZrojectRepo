import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUserDataFromMongoDB } from "@/server-actions/user";
import { UserButton } from "@clerk/nextjs";

const DashboardPage = async () => {
  const userId = await auth();
  if (!userId) {
    return <div>Sign in to view this page</div>;
  }
  const user = await currentUser();
  const mongoUserResponse = await getUserDataFromMongoDB();
  if (!mongoUserResponse?.success) {
    console.log(mongoUserResponse?.message);
  }
  return (
    <>
      <div>DashboardPage</div>
      <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto p-4 items-center">
        <div>
          <h1>Name : {mongoUserResponse?.data?.name}</h1>

          <h1>Id : {mongoUserResponse?.data?._id}</h1>

          <h1>Email : {mongoUserResponse?.data?.email}</h1>
        </div>

        <div>
          {" "}
          <UserButton />{" "}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
