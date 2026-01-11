import React from "react";
import { useLocation } from "react-router-dom";
import UPIPayment from "../components/UPIPayment";
import PageVisuals from "../components/PageVisuals";

export default function Payment() {
  const location = useLocation();
  const state = location.state as {
    amount?: number;
    name?: string;
    email?: string;
    phone?: string;
    city?: string;
    trip?: string;
    seats?: number;
    room?: string;
    date?: string;
  } | undefined;

  const amount = state?.amount ? String(state.amount) : "1499";
  const name = state?.name || "Premium Soulful";
  const note = state
    ? `Trip: ${state.trip || "-"}, Name: ${state.name || "-"}, Seats: ${state.seats || 1}`
    : "Trip booking";

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
            name={name}
            amount={amount}
            note={note}
          />
        </div>
        {state && (
          <>
            <div className="mt-8 bg-white rounded-xl shadow p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-primary">Booking Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                <div><span className="font-medium">Trip:</span> {state.trip}</div>
                <div><span className="font-medium">Name:</span> {state.name}</div>
                <div><span className="font-medium">Email:</span> {state.email}</div>
                <div><span className="font-medium">Phone:</span> {state.phone}</div>
                <div><span className="font-medium">City:</span> {state.city}</div>
                <div><span className="font-medium">Room:</span> {state.room}</div>
                <div><span className="font-medium">Date:</span> {state.date}</div>
                <div><span className="font-medium">Seats:</span> {state.seats}</div>
                <div><span className="font-medium">Amount:</span> ₹{amount}</div>
              </div>
            </div>

            {/* Bank Details Section */}
            <div className="mt-8 bg-white rounded-xl shadow p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-primary">Bank Transfer Details</h2>
              <div className="text-gray-800 space-y-2">
                <div><span className="font-medium">Bank Name:</span> HDFC Bank</div>
                <div><span className="font-medium">Account Name:</span> Soulful Journeys</div>
                <div><span className="font-medium">Account Number:</span> 50200012345678</div>
                <div><span className="font-medium">IFSC Code:</span> HDFC0001234</div>
                <div><span className="font-medium">Branch:</span> Connaught Place, New Delhi</div>
              </div>
              <div className="text-xs text-gray-500 mt-2">(You can pay via UPI or direct bank transfer. After payment, upload your screenshot and transaction number below.)</div>
            </div>

            {/* Upload Screenshot and Transaction Number */}
            <div className="mt-8 bg-white rounded-xl shadow p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-primary">Upload Payment Proof</h2>
              <form className="flex flex-col gap-4">
                <label className="font-medium">Transaction Number</label>
                <input
                  type="text"
                  name="transactionNumber"
                  placeholder="Enter transaction/reference number"
                  className="border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff4c1b]"
                  required
                />
                <label className="font-medium">Upload Screenshot</label>
                <input
                  type="file"
                  name="paymentScreenshot"
                  accept="image/*"
                  className="border border-slate-300 rounded-xl px-4 py-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#ff4c1b] text-white font-semibold rounded-xl px-6 py-2 mt-2 shadow hover:bg-[#e03e12] transition"
                >
                  Submit Payment Proof
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
