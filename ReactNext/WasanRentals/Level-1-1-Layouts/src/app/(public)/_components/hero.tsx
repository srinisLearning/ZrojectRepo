import React from "react";

function Hero() {
  return (
    <div className="bg-primary grid grid-cols-1 lg:grid-cols-2 items-center px-20 h-[85vh]">
     
      <div className="col-span-1 flex flex-col gap-1">
        <div className="flex gap-5 text-3xl lg:text-5xl mb-6">
          <span className="font-bold text-secondary">WASAN</span>
          <span className="font-bold text-tertiary">VEHICLE</span>
          <span className="font-bold text-quaternary">RENTALS</span>
        </div>
        <p className="text-white text-sm">
          Experience the finest in vehicle rental services right here in the
          city with WASAN Vehicle Rentals! Whether you’re in need of a car for a
          business trip, a family vacation, or simply to get around town, we are
          committed to providing you with the highest quality vehicles and
          exceptional customer service. Our diverse fleet includes a wide range
          of vehicles to suit every need and budget, from compact cars for city
          driving to spacious SUVs and luxury vehicles for special occasions.
          Each vehicle in our collection is meticulously maintained, ensuring
          safety, comfort, and reliability on every journey.
        </p>
      </div>
       <div className="col-span-1 flex justify-center">
        <img
          className="w-[400px] h-[400px] object-cover rounded"
          src="/images/hero.jpg"
        />
      </div>
    </div>
  );
}

export default Hero;
