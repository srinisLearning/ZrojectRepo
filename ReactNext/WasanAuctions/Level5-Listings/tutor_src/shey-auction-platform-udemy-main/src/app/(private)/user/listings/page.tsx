import { getAllAvailableListings } from "@/actions/listings";
import InfoMessage from "@/components/ui/info-message";
import PageTitle from "@/components/ui/page-title";
import React, { Suspense } from "react";
import ListingCard from "./_components/listing-card";
import Spinner from "@/components/ui/spinner";
import Filters from "./_components/filters";

interface UserListingsPageProps {
  searchParams?: Promise<{
    category?: string;
    sortBy?: string;
  }>;
}

async function UserListingsPage({ searchParams }: UserListingsPageProps) {
  const { category = "", sortBy = "" }: any = await searchParams;
  console.log("Search Params:", { category, sortBy });
  const response = await getAllAvailableListings({ category, sortBy });
  if (!response.success) {
    return <InfoMessage message={response.message} />;
  }

  const listings = response.data;
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Available Listings" />

      {listings?.length === 0 && (
        <InfoMessage message="No listings available at the moment." />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-4 md:col-span-2">
          <Filters />
        </div>
        {listings?.map((listing: any) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default function Page(props: any) {
  return (
    <Suspense fallback={<Spinner />}>
      <UserListingsPage {...props} />
    </Suspense>
  );
}
