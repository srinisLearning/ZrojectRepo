import PageTitle from "@/components/ui/page-title";
import React, { Suspense } from "react";
import ListingForm from "../../_components/listing-form";
import InfoMessage from "@/components/ui/info-message";
import { getListingById } from "@/actions/listings";
import Spinner from "@/components/ui/spinner";

interface IParams {
  params: Promise<{
    id: string;
  }>;
}

async function EditListingPage({ params }: IParams) {
  const { id } = await params;
  if (!id) {
    return <InfoMessage message="Listing ID is required to edit a listing." />;
  }

  const response = await getListingById(id);
  if (!response.success) {
    return (
      <InfoMessage
        message={response.message || "Failed to fetch listing details."}
      />
    );
  }

  const listing = response.data;
  return (
    <div>
      <PageTitle title="Edit Listing" />
      <ListingForm formType="edit" listingData={listing} />
    </div>
  );
}

export default function Page(props: IParams) {
  return <Suspense fallback={<Spinner />}>
    <EditListingPage {...props} />
  </Suspense>;
}
