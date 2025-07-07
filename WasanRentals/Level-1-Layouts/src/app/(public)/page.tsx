'use client'
import Image from "next/image";
import { Button, Input } from "antd";
import Header from "./_components/header";
import Authentication from "./_components/authentication";
import Hero from "./_components/hero";
import { useState } from "react";

export default function Home() {
   const [showAuthentication, setShowAuthentication] = useState(false);
  return (
   
    <>
      <div className="flex flex-col gap-1 min-h-screen">
        <Header setShowAuthentication={setShowAuthentication} />
        <Hero />
         {showAuthentication && (
        <Authentication
          showAuthentication={showAuthentication}
          setShowAuthentication={setShowAuthentication} 
          />
        )}
      </div>

      
    </>
  );
}




      
 