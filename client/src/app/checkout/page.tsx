"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CheckoutSuspense from "./checkoutSkeleton";

function CheckoutPage() {
  const options = {
    clientId:
      "Ab6Ros0lrHE10qHcgiwKqUgDclwaIE2mtTnIkfvczCTd0JTeHblotqnvfHAF5iZ5_Cv8GbJ-jpUfTimK",
  };

  return (
    <PayPalScriptProvider options={options}>
      <CheckoutSuspense />
    </PayPalScriptProvider>
  );
}

export default CheckoutPage;