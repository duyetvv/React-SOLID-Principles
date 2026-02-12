// payment.types.ts
export interface PaymentMethodProps {
  amount: number;
  onSuccess: () => void;
}