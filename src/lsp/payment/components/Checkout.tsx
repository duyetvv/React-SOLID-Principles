// Checkout.tsx
import type { PaymentMethodProps } from "../types/payment.types";

interface CheckoutProps {
  PaymentComponent: React.FC<PaymentMethodProps>;
}

export const Checkout: React.FC<CheckoutProps> = ({ PaymentComponent }) => {
  const handleSuccess = () => {
    alert("Payment successful!");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <PaymentComponent amount={100} onSuccess={handleSuccess} />
    </div>
  );
};
