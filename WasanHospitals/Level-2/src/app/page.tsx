import { Button } from "antd";
import Link from "next/link";
import React from "react";

function Homepage() {
  return (
    <div>
      <div className="flex justify-between items-center py-5 px-10 bg-primary">
        <Link className="text-white text-2xl font-bold" href="/">
          WASAN HOSPITALS
        </Link>
        <Link className="text-sm text-white underline" href="/sign-in">
          Sign-in
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-20">
        <div className="px-10 flex flex-col gap-7 justify-center">
          <h1 className="text-4xl font-bold text-primary">
            Welcome to Wasan Hospitals
          </h1>
          <p className="text-sm">
            We are committed to providing exceptional medical care to all our patients. Our team of highly skilled doctors and dedicated nurses is here to support your health and well-being around the clock. Open 24/7, we are always ready to serve you with compassion and professionalism. Your care is our priority.
          </p>
          <div className="flex gap-5">
            <Button>
              <Link href="/services">View Services</Link>
            </Button>
            <Button type="primary">
              <Link href="/book-appointment">Book an Appointment</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <img src="./logo.jpg" 
           className="h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;