"use client";
import Image from "next/image";
import react, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignUp, SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { ArrowDownToLine } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Home() {
  const [openSheet, setOpenSheet] = useState(false);
  const queryStrings = useSearchParams();
  const form = queryStrings.get("form");
  return (
    <>
      <div className="home-parent py-10 px-20">
        <div className="flex justify-between items-center">
          <h1 className="Wasan Fitness text-2xl font-bold text-primary uppercase">
            <b>Wasan <span className="text-red-600">Fitness</span></b>
          </h1>
          <Button variant={"outline"} onClick={() => setOpenSheet(true)}>
            Sign-in
          </Button>
        </div>
              <div className="flex flex-col justify-center items-center h-[80vh] gap-7 mt-20">
        <h1 className="text-6xl font-bold text-center">
          <b className="text-white">Wasan</b>
          <b className="text-red-600">Fitness</b>
        </h1>

        <p className="text-sm font-semibold text-white text-center">
          A perfect gym for you to get fit and healthy with the best trainers
          and equipment.
        </p>

        <Button
          variant={"outline"}
          onClick={() => {
            const plansDiv = document.getElementById("plans");
            plansDiv?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Explore Plans
        </Button>

        <ArrowDownToLine
          size={20}
          color="gray"
          className="animate-bounce cursor-pointer mt-20"
        />
      </div>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="lg:min-w-[500px] flex items-center justify-center min-h-screen auth-parent">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>

          {form === "sign-up" ? (
            <SignUp
              routing="hash"
              signInUrl="/?form=sign-in"
              fallbackRedirectUrl={"/account"}
            />
          ) : (
            <SignIn
              routing="hash"
              signUpUrl="/?form=sign-up"
              fallbackRedirectUrl={"/account"}
            />
          )}
        </SheetContent>
      </Sheet>
      </div>
    </>
  );
}
