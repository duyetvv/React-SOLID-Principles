import React from "react";

import { Checkout } from "./components/Checkout";

import { BrokenPayment } from "./components/BrokenPayment";
import { CreditCardPayment } from "./components/CreditCardPayment";
import { PaypalPayment } from "./components/PaypalPayment";
import { StripePayment } from "./components/StripePayment";

const OrchestratorPayment: React.FC = () => (
  <div>
    <Checkout PaymentComponent={CreditCardPayment} />
    <Checkout PaymentComponent={PaypalPayment} />
    <Checkout PaymentComponent={StripePayment} />
    <Checkout PaymentComponent={BrokenPayment} />
  </div>
);

export default OrchestratorPayment;
