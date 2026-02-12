// CreditCardPayment.tsx
import type { PaymentMethodProps } from "../types/payment.types";

export const CreditCardPayment: React.FC<PaymentMethodProps> = ({
  amount,
  onSuccess,
}) => {
  const handlePay = () => {
    console.log(`Paid $${amount} with Credit Card`);
    onSuccess();
  };

  return <button onClick={handlePay}>Pay with Credit Card</button>;
};
