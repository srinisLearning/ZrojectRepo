"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import RegisterForm from "./_components/register";
import LoginForm from "./_components/login";
import { useSearchParams } from "next/navigation";

function Homepage() {
  const [openSheet, setOpenSheet] = React.useState(false);
  const searchParams = useSearchParams();
  const formType = searchParams.get("form");
  return (
    <div className="flex flex-col">
      <div className="bg-primary flex justify-between items-center py-5 px-20">
        <h1 className="text-xl font-bold! text-white">S.H.E.Y</h1>
        <Button variant={"outline"} onClick={() => setOpenSheet(true)}>
          Login
        </Button>
      </div>
      <div className="grid lg:grid-cols-2 min-h-[80vh] items-center px-20">
        <div className="col-span-1 mt-5">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold! text-lg text-primary">
              Welcome to SHEY-AUCTION-PLATFORM
            </h1>
            <p className="text-gray-600 font-semibold text-sm">
              SHEY is a platform that allows users to buy and sell listings
              through auctions. It provides a user-friendly interface for
              listing listings, placing bids, and managing transactions. Whether
              you're looking to sell your old listings or find great deals on
              new ones, SHEY has got you covered.
            </p>
            <Button className="w-max">Get Started</Button>
          </div>
        </div>
        <div className="col-span-1 justify-center flex">
          <img
            src={
              "https://dbv47yu57n5vf.cloudfront.net/s3fs-public/editorial/my/2018/April/6/Auction-123RF.jpg"
            }
            className="h-96 object-contain"
          />
        </div>
      </div>

      <Sheet open={openSheet} onOpenChange={(open) => setOpenSheet(open)}>
        <SheetContent className="lg:max-w-[500px]">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <div className="flex justify-center items-center p-5 h-full">
            {formType === "register" ? <RegisterForm /> : <LoginForm />}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Homepage;
