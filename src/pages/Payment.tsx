import React from "react";
import UPIPayment from "../components/UPIPayment";
import PageVisuals from "../components/PageVisuals";

export default function Payment() {
  return (
    <main className="max-w-4xl mx-auto px-4 md:px-6 pb-24 pt-8">
      <div className="relative">
        <PageVisuals />
        <div className="mt-6">
          <h1 className="text-3xl font-bold">Secure Payment</h1>
          <p className="mt-2 text-slate-600">
            Pay securely via UPI. Copy the UPI id or click Pay to open your UPI
            app.
          </p>
        </div>

        <div className="mt-8">
          <UPIPayment
            upiId="9899435374@okbizaxis"
            name="Premium Soulful"
            amount={"1499"}
            note={"Trip booking"}
          />
        </div>
      </div>
    </main>
  );
}
