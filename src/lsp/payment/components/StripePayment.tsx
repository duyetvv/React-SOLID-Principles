import type { PaymentMethodProps } from "../types/payment.types";

export const StripePayment: React.FC<PaymentMethodProps> = ({
  amount,
  onSuccess,
}) => {
  const handlePay = () => {
    console.log(`Paid $${amount} with Stripe`);
    onSuccess();
  };

  return <button onClick={handlePay}>Pay with Stripe</button>;
};