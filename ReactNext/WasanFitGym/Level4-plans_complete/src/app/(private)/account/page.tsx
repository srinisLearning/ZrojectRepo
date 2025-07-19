'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageTitle from "@/components/page-title";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";
 

const AccountPage =  () => {
  const { user  } = usersGlobalStore() as IUsersGlobalStore;
  return (
    <>
           <PageTitle title={`Welcome ${user?.name}`} />
           <div className="flex flex-col gap-5">
          <p className="mt-5 text-sm text-gray-600">
            You do not any active subscription at the moment. Please subscribe
            to enjoy our services.
          </p>

          <Button className="w-max">
            <Link href={"account/user/purchase-plan"}>
              View Subscription Plans
            </Link>
          </Button>
        </div>
    </>
  );
};

export default AccountPage;
