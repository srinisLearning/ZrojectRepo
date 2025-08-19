"use client";
 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
 
import {
  IPlansGlobalStore,
  plansGlobalStore,
} from "@/store/plans-store";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/checkout-form";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/store/users-store";
import { createNewSubscription } from "@/server-actions/subscriptions";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/page-title";
import { getStripePaymentIntent } from "@/server-actions/payment";


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

function ChecoutPage() {
  const { selectedPaymentPlan, setSelectedPaymentPlan } =
    plansGlobalStore() as IPlansGlobalStore;
  const [startDate, setStartDate] = React.useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [loading, setLoading] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = React.useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const router = useRouter();

  const renderProperty = (key: string, value: any) => {
    try {
      return (
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{key}</span>
          <span className="text-gray-700 font-semibold text-sm">{value}</span>
        </div>
      );
    } catch (error) {
      return <></>;
    }
  };

  const endDate = useMemo(() => {
    return dayjs(startDate)
      .add(selectedPaymentPlan?.paymentPlan?.duration, "day")
      .format("YYYY-MM-DD");
  }, [startDate]);

  const paymentIntentHandler = async () => {
    try {
      setLoading(true);
      const response = await getStripePaymentIntent(
        selectedPaymentPlan?.paymentPlan?.price
      );
      if (response.success) {
        setClientSecret(response.data);
        setShowCheckoutForm(true);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret!,
  };

  const onPaymentSuccess = async (paymentId: string) => {
    try {
      const payload = {
        user_id: user?.id,
        plan_id: selectedPaymentPlan?.mainPlan?.id,
        start_date: startDate,
        end_date: endDate,
        payment_id: paymentId,
        amount: Number(selectedPaymentPlan?.paymentPlan?.price),
        total_duration: Number(selectedPaymentPlan?.paymentPlan?.duration),
        is_active: true,
      };
      const response = await createNewSubscription(payload);
      if (response.success) {
        toast.success(
          "Congratulations! Your payment was successful , Your subscription has been activated"
        );
        router.push("/account/user/subscriptions");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while processing your payment");
    }
  };

  return (
    <div>
      <PageTitle title="Checkout" />

      {selectedPaymentPlan && (
        <div className = 'flex max-w-4xl mx-auto'>
        <div className="grid grid-cols-2 mt-7">
          <div className="col-span-1 p-5 border border-gray-500 flex flex-col gap-2 rounded-lg">
            {renderProperty("Plan Name", selectedPaymentPlan?.mainPlan?.name)}
            {renderProperty(
              "Amount",
              "$" + selectedPaymentPlan?.paymentPlan?.price
            )}
            {renderProperty(
              "Duration",
              selectedPaymentPlan?.paymentPlan?.duration + " days"
            )}
            {renderProperty(
              "Start Date",
              <Input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
              />
            )}

            {startDate && renderProperty("End Date", endDate)}

            <Button
              className="mt-7"
              onClick={paymentIntentHandler}
              disabled={loading}
            >
              Pay Now
            </Button>
          </div>
        </div>
        </div>
      )}

      {!selectedPaymentPlan && (
        <div className="mt-5 text-sm">
          <p>Please select a payment plan</p>
        </div>
      )}

      {showCheckoutForm && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
            onPaymentSuccess={onPaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
}

export default ChecoutPage;