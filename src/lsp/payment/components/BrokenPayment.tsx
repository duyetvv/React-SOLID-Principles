import type { PaymentMethodProps } from "../types/payment.types";

export const BrokenPayment: React.FC<PaymentMethodProps> = ({
  amount,
}) => {
  return <div>Crypto disabled {amount}</div>;
};