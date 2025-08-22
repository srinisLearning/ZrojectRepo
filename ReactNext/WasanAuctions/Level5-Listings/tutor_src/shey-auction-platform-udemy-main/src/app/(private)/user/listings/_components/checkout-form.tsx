import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ICheckoutFormProps {
  openCheckoutForm: boolean;
  setOpenCheckoutForm: (open: boolean) => void;
  onPaymentSuccess: (paymentId: string) => void;
}

function CheckoutForm({
  openCheckoutForm,
  setOpenCheckoutForm,
  onPaymentSuccess,
}: ICheckoutFormProps) {
  const [loading, setLoading] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result: any = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      toast.error(result.error.message || "Payment failed");
    } else {
      onPaymentSuccess(result.paymentIntent.id);
    }
    setLoading(false);
    setOpenCheckoutForm(false);
  };
  return (
    <Dialog open={openCheckoutForm} onOpenChange={setOpenCheckoutForm}>
      <DialogContent className="lg:max-w-[500px] h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Checkout</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <AddressElement
            options={{ mode: "billing", allowedCountries: ["us"] }}
          />
          <div className="flex justify-end gap-5 mt-5">
            <Button variant={"outline"}>Cancel</Button>
            <Button type="submit" disabled={!stripe || loading}>
              Pay now
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutForm;
