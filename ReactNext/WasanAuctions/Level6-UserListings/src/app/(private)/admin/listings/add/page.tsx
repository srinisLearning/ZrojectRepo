import PageTitle from "@/components/ui/page-title";
import React from "react";
import ListingForm from "../_components/listing-form";

function AddListingPage() {
  return (
    <div>
      <PageTitle title="Add Listing" />
      <ListingForm formType="add" />
    </div>
  );
}

export default AddListingPage;
