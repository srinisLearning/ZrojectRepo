"use client";
import { getListingById } from "@/server-actions/listings";
import { getStripePaymentIntent } from "@/server-actions/payments";
import { Button } from "@/components/ui/button";
import InfoMessage from "@/components/ui/info-message";
import { Input } from "@/components/ui/input";
import PageTitle from "@/components/ui/page-title";
import Spinner from "@/components/ui/spinner";
 
import { IListing } from "@/interfaces";
import React, { use } from "react";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../_components/checkout-form";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import { addNewBid } from "@/server-actions/bids";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { getDateTimeFormat } from "@/helpers/date-format";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface SingleListingPageProps {
  params: Promise<{
    id: string;
  }>;
}
function SingleListingPage({ params }: SingleListingPageProps) {
  const { id } = use(params);
  const [loading, setLoading] = React.useState(true);
  const [disablePlaceBidButton, setDisablePlaceBidButton] =
    React.useState(false);
  const [listing, setListing] = React.useState<IListing | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [bidPrice, setBidPrice] = React.useState<number>(0);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [openCheckoutForm, setOpenCheckoutForm] = React.useState(false);
  const { user } = usersGlobalStore() as IUsersStore;
  const router = useRouter();
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getListingById(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      setListing(response.data);
      setSelectedImage(response.data.images[0] || null);
      setBidPrice(response.data.minimum_bid || 0);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getClientSecret = async () => {
    try {
      setDisablePlaceBidButton(true);
      const response = await getStripePaymentIntent();
      if (!response.success) {
        throw new Error(response.message);
      }
      console.log("Client Secret:", response.clientSecret);
      setClientSecret(response.clientSecret);
      setOpenCheckoutForm(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDisablePlaceBidButton(false);
    }
  };

  const getListingProperty = (label: string, value: any) => {
    return (
      <div className="text-sm text-gray-700 flex  justify-between">
        <span>{label}:</span>
        <span className="font-bold!">{value}</span>
      </div>
    );
  };

  const onPaymentSuccess = async (paymentId: string) => {
    try {
      if (!listing) {
        toast.error("Listing not found.");
        return;
      }
      const payload: any = {
        user_id: user?.id,
        listing_id: listing.id,
        bid_amount: bidPrice,
        platform_fee: 10,
        status: "active",
        payment_id: paymentId,
      };
      const response = await addNewBid(payload);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success("Payment successful! Your bid has been placed.");
      router.push("/user/bids-placed");
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while processing payment"
      );
    }
  };

  React.useEffect(() => {
    getData();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!loading && !listing) {
    return <InfoMessage message="Listing not found." />;
  }

  return (
    <div>
      <PageTitle title={listing?.name || ""} />

      <div className="lg:grid lg:grid-cols-5 gap-10 mt-7">
        <div className="col-span-3 flex flex-col gap-5">
          <img
            src={selectedImage || "/placeholder-image.png"}
            className="w-full h-96 object-contain rounded mb-5"
            alt="Selected listing"
          />

          <div className="flex flex-wrap gap-5">
            {listing?.images.map((image, index) => (
              <div
                className={`p-2 ${
                  selectedImage === image ? "border border-primary" : ""
                }`}
                key={index}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  className="w-16 h-16 object-cover rounded cursor-pointer"
                  src={image}
                  alt={`Listing image ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-700">{listing!.description}</p>
        </div>
        <div className="w-full! lg:col-span-2 p-5 flex flex-col gap-2 border border-gray-500 h-max mt-5">
          {getListingProperty("Category", listing!.category?.name)}
          {getListingProperty(
            "Auction Start At ",
            getDateTimeFormat(listing!.auction_start_at)
          )}
          {getListingProperty(
            "Auction End At",
            getDateTimeFormat(listing!.auction_end_at)
          )}
          {getListingProperty(
            "Result Announcement At",
            getDateTimeFormat(listing!.result_announcement_at)
          )}
          {getListingProperty(
            "Minimum / Starting Bid",
            `$${listing!.minimum_bid}`
          )}

          {dayjs(listing!.auction_start_at).isBefore(dayjs()) && (
            <div className="flex gap-5 mt-5 items-end">
              <div className="w-full">
                <label className="text-gray-700 text-sm">Your bid amount</label>
                <Input
                  type="number"
                  value={bidPrice}
                  onChange={(e) => setBidPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <Button
                disabled={disablePlaceBidButton}
                onClick={getClientSecret}
              >
                Place Bid
              </Button>
            </div>
          )}
        </div>
      </div>

      {clientSecret && openCheckoutForm && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <CheckoutForm
            openCheckoutForm={openCheckoutForm}
            setOpenCheckoutForm={setOpenCheckoutForm}
            onPaymentSuccess={(paymentId) => onPaymentSuccess(paymentId)}
          />
        </Elements>
      )}
    </div>
  );
}

export default SingleListingPage;