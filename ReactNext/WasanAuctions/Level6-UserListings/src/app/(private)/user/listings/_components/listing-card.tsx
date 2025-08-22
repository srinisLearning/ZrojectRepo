"use client";
 
import { getDateTimeFormat } from "@/helpers/date-format";
import { IListing } from "@/interfaces";
import { useRouter } from "next/navigation";
import React from "react";

function ListingCard({ listing }: { listing: IListing }) {
  const router = useRouter();
  return (
    <div
      className="p-5 border rounded flex flex-col gap-5 hover:border-primary transition-all duration-300 cursor-pointer"
      onClick={() => router.push(`/user/listings/${listing.id}`)}
    >
      <img
        src={listing.images[0]}
        className="w-full h-40 object-contain rounded"
      />
      <div>
        <h1 className="text-sm font-bold! text-gray-800">{listing.name}</h1>
        <p className="text-xs text-gray-600 mt-1">
          Auction start at : {getDateTimeFormat(listing.auction_start_at)}
        </p>
      </div>
      <h1 className="text-sm font-bold! text-primary">
        Starting Bid : $ {listing.minimum_bid.toFixed(2)}
      </h1>
    </div>
  );
}

export default ListingCard;
