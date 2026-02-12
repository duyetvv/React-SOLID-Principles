// PaypalPayment.tsx
import type { PaymentMethodProps } from '../types/payment.types';

export const PaypalPayment: React.FC<PaymentMethodProps> = ({
  amount,
  onSuccess,
}) => {
  const handlePay = () => {
    console.log(`Paid $${amount} with PayPal`);
    onSuccess();
  };

  return <button onClick={handlePay}>Pay with PayPal</button>;
};