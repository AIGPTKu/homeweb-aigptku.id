// components/PaymentComponent.tsx
"use client";
import React from "react";

const PaymentComponent: React.FC = () => {
  const handlePayment = async () => {
    try {
      window.snap.pay("4fe5d5c4-3805-46de-9c98-dcd50d726643");
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handlePayment}>Pay with Midtrans</button>;
};

export default PaymentComponent;
