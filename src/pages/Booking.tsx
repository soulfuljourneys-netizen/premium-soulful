import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import manaliThumb from "../assets/Thumbnails/manali kasol.png";
import kasolThumb from "../assets/Thumbnails/Kasol Kheerganga.png";
import jibhiThumb from "../assets/Thumbnails/Jibhi Tirthan Valley.png";
import choptaThumb from "../assets/Thumbnails/Chopta tungnath.png";
import udaipurThumb from "../assets/Thumbnails/Udaiur Mount Abu.png";

const trips = [
  { id: 1, name: "Chopta Tungnath", price: 3000, image: choptaThumb },
  { id: 2, name: "Jibhi Tirthan", price: 3000, image: jibhiThumb },
  { id: 3, name: "Kasol Kheerganga", price: 3000, image: kasolThumb },
  { id: 4, name: "Manali Sissu Kasol", price: 3000, image: manaliThumb },
  { id: 5, name: "Udaipur Mount Abu", price: 3000, image: udaipurThumb },
];
const roomOptions = ["Quad", "Triple", "Double"];

const steps = ["Select Trip", "Your Details", "Review & Pay"];

const Booking: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selectedTrip, setSelectedTrip] = useState<number | null>(null);
  const [seats, setSeats] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    room: roomOptions[0],
    date: "",
    terms: false,
  });
  const navigate = useNavigate();

  const trip = trips.find((t) => t.id === selectedTrip);
  const total = trip ? trip.price * seats : 0;

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<"upi" | "bank" | null>(null);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

  // Static payment details (customize as needed)
  const PAYMENT = {
    upiId: "soulful@upi",
    payeeName: "Soulful Journeys",
    bank: {
      name: "Axis Bank",
      accountName: "Soulful Journeys Pvt Ltd",
      accountNumber: "12345678901234",
      ifsc: "UTIB0000123",
      branch: "Mumbai",
    },
  };

  const isMobile = () => /Mobi|Android/i.test(navigator.userAgent || "");

  const generateUpiLink = (amount: number, orderId: string) => {
    const pa = encodeURIComponent(PAYMENT.upiId);
    const pn = encodeURIComponent(PAYMENT.payeeName);
    const tn = encodeURIComponent(`Order:${orderId}`);
    const am = encodeURIComponent(String(amount));
    return `upi://pay?pa=${pa}&pn=${pn}&tn=${tn}&am=${am}&cu=INR`;
  };

  const generateQrUrl = (data: string) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      data
    )}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch (err) {
      console.error("Copy failed", err);
      alert("Copy failed - please copy manually");
    }
  };

  const sendEmailAndProceed = async (order_id: string) => {
    const orders = [
      {
        name: trip?.name || "",
        units: seats,
        price: trip?.price || 0,
        image_url: trip?.image || "",
      },
    ];
    const tax = 0;
    const cost = { tax, total };
    const payment_link = window.location.origin + "/payment";
    try {
      await emailjs.send(
        "service_xn7xmhb",
        "template_eovthnd",
        {
          name: form.firstName + " " + form.lastName,
          email: form.email,
          order_id,
          orders,
          cost,
          payment_link,
        },
        "aiaao88iwSZUktsm-"
      );
    } catch (err) {
      console.error("EmailJS error:", err);
    }
    navigate("/payment", {
      state: {
        amount: total,
        name: form.firstName + " " + form.lastName,
        email: form.email,
        phone: form.phone,
        city: form.city,
        trip: trip?.name,
        seats,
        room: form.room,
        date: form.date,
        order_id,
      },
    });
  };

  // Stepper component must be outside Booking to avoid state reset error
  type StepperProps = { step: number; steps: string[] };
  const Stepper: React.FC<StepperProps> = ({ step, steps }) => (
    <div className="flex justify-center items-center gap-4 py-8">
      {steps.map((label, idx) => (
        <div key={label} className="flex items-center">
          <div
            className={`rounded-full w-10 h-10 flex items-center justify-center font-bold text-white shadow-lg border-2 ${
              step === idx
                ? "bg-[#ff4c1b] border-[#0f002e] scale-110"
                : "bg-gray-200 border-gray-300"
            }`}
          >
            {idx + 1}
          </div>
          <span
            className={`ml-3 font-semibold tracking-wide ${
              step === idx ? "text-[#0f002e]" : "text-gray-500"
            }`}
          >
            {label}
          </span>
          {idx < steps.length - 1 && (
            <div className="mx-4 w-10 h-1 bg-gradient-to-r from-[#ff4c1b] to-[#0f002e] rounded" />
          )}
        </div>
      ))}
    </div>
  );

  // Cart/Trip selection
  const renderTripSelection = () => (
    <div className="relative min-h-[220px] bg-gradient-to-br from-[#fff7f3] via-[#f8fafc] to-[#e0e7ff] rounded-b-3xl shadow-inner mb-8">
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f002e] mb-2 tracking-tight drop-shadow">
          Book Your Soulful Journey
        </h1>
        <p className="text-lg text-slate-700 mb-8">
          Select your trip and seats to begin your premium experience.
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-[#ff4c1b] mb-4">
              Choose Your Trip
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className={`flex items-center border-2 rounded-2xl p-4 cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl ${
                    selectedTrip === trip.id
                      ? "border-[#ff4c1b] bg-[#fff7f3] scale-[1.02]"
                      : "border-gray-200 bg-white"
                  }`}
                  onClick={() => setSelectedTrip(trip.id)}
                >
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-16 h-16 object-cover rounded-xl mr-4 shadow"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-lg text-[#0f002e]">
                      {trip.name}
                    </div>
                    <div className="text-sm text-slate-600">
                      From{" "}
                      <span className="font-bold text-[#ff4c1b]">
                        ₹{trip.price}
                      </span>{" "}
                      per person
                    </div>
                  </div>
                  {selectedTrip === trip.id && (
                    <span className="ml-2 text-[#ff4c1b] font-bold text-lg">
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-80 bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
            <h3 className="font-bold text-[#ff4c1b] mb-2">Seats</h3>
            <div className="flex items-center mb-4">
              <button
                className="px-4 py-2 border-2 rounded-l-xl bg-[#fff7f3] text-lg font-bold text-[#ff4c1b] border-[#ff4c1b] hover:bg-[#ffe3d6] transition"
                onClick={() => setSeats((s) => Math.max(1, s - 1))}
                disabled={seats === 1}
              >
                -
              </button>
              <span className="px-8 text-2xl font-bold text-[#ff4c1b]">
                {seats}
              </span>
              <button
                className="px-4 py-2 border-2 rounded-r-xl bg-[#fff7f3] text-lg font-bold text-[#ff4c1b] border-[#ff4c1b] hover:bg-[#ffe3d6] transition"
                onClick={() => setSeats((s) => s + 1)}
              >
                +
              </button>
            </div>
            <div className="mb-2 text-slate-700">
              {trip ? `₹${trip.price} x ${seats} =` : ""}
            </div>
            <div className="text-2xl font-extrabold mb-4 text-[#ff4c1b]">
              ₹{total}
            </div>
            <button
              className="w-full bg-[#ff4c1b] text-white font-semibold rounded-xl px-6 py-2 mt-2 shadow hover:bg-[#e03e12] transition disabled:opacity-50"
              disabled={selectedTrip === null}
              onClick={() => setStep(1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Details form with summary sidebar
  const renderDetailsForm = () => (
    <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto mt-8">
      <form
        className="flex-1 bg-white rounded-3xl shadow-xl p-8"
        onSubmit={(e) => {
          e.preventDefault();
          setStep(2);
        }}
      >
        <h2 className="text-2xl font-extrabold text-[#ff4c1b] mb-6">
          Your Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            className="border-2 border-orange-200 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition w-full text-lg"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
          />
          <input
            className="border-2 border-orange-200 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition w-full text-lg"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            required
          />
        </div>
        <input
          className="border-2 border-orange-200 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition w-full text-lg mb-6"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <input
          className="border-2 border-orange-200 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition w-full text-lg mb-6"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="border-2 border-orange-200 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition w-full text-lg mb-6"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-orange-700">
            Room Sharing
          </label>
          <select
            className="border-2 border-orange-200 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition w-full text-lg"
            value={form.room}
            onChange={(e) => setForm({ ...form, room: e.target.value })}
          >
            {roomOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-orange-700">
            Trip Date
          </label>
          <input
            className="border-2 border-orange-200 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition w-full text-lg"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={form.terms}
            onChange={(e) => setForm({ ...form, terms: e.target.checked })}
            required
            className="accent-orange-600 w-5 h-5"
          />
          <span className="ml-3 text-base text-gray-700">
            I agree to the terms and conditions (lorem ipsum)
          </span>
        </div>
        <button
          className="w-full bg-[#ff4c1b] text-white font-semibold rounded-xl px-6 py-3 mt-2 shadow hover:bg-[#e03e12] transition disabled:opacity-50 text-lg"
          disabled={!form.terms}
          type="submit"
        >
          Next
        </button>
      </form>
      <div className="w-full md:w-80 bg-white rounded-3xl shadow-xl p-6">
        <h3 className="font-bold text-[#ff4c1b] mb-2">Booking Summary</h3>
        <div className="mb-2 text-[#0f002e]">{trip?.name}</div>
        <div className="mb-2 text-slate-700">Seats: {seats}</div>
        <div className="mb-2 text-slate-700">Room: {form.room}</div>
        <div className="mb-2 text-slate-700">Date: {form.date || "-"}</div>
        <div className="font-bold text-xl mt-4 text-[#ff4c1b]">
          Total: ₹{total}
        </div>
      </div>
    </div>
  );

  // Review & payment step
  const renderSummary = () => (
    <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto mt-8">
      <div className="flex-1 bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-extrabold text-[#ff4c1b] mb-6">
          Review & Pay
        </h2>
        <div className="mb-6">
          <div className="mb-2 text-gray-800">
            <span className="font-semibold text-orange-700">Trip:</span>{" "}
            {trip?.name}
          </div>
          <div className="mb-2 text-gray-800">
            <span className="font-semibold text-orange-700">Seats:</span>{" "}
            {seats}
          </div>
          <div className="mb-2 text-gray-800">
            <span className="font-semibold text-orange-700">Name:</span>{" "}
            {form.firstName} {form.lastName}
          </div>
          <div className="mb-2 text-gray-800">
            <span className="font-semibold text-orange-700">Phone:</span>{" "}
            {form.phone}
          </div>
          <div className="mb-2 text-gray-800">
            <span className="font-semibold text-orange-700">Email:</span>{" "}
            {form.email}
          </div>
          <div className="mb-2 text-gray-800">
            <span className="font-semibold text-orange-700">City:</span>{" "}
            {form.city}
          </div>
          <div className="mb-2 text-gray-800">
            <span className="font-semibold text-orange-700">Room Sharing:</span>{" "}
            {form.room}
          </div>
          <div className="mb-2 text-gray-800">
            <span className="font-semibold text-orange-700">Trip Date:</span>{" "}
            {form.date}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="w-full bg-gradient-to-r from-[#ff4c1b] to-[#e03e12] text-white font-semibold rounded-xl px-6 py-3 mt-2 shadow hover:opacity-95 transition text-lg"
            onClick={() => {
              const order_id = "SJ-" + Date.now();
              setCurrentOrderId(order_id);
              setPaymentType("upi");
              setShowPaymentModal(true);
            }}
          >
            Pay via UPI
          </button>
          <button
            className="w-full bg-white border-2 border-slate-200 text-[#0f002e] font-semibold rounded-xl px-6 py-3 mt-2 shadow hover:shadow-lg transition text-lg"
            onClick={() => {
              const order_id = "SJ-" + Date.now();
              setCurrentOrderId(order_id);
              setPaymentType("bank");
              setShowPaymentModal(true);
            }}
          >
            Bank Transfer
          </button>
        </div>

        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowPaymentModal(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6">
              <button
                className="absolute top-4 right-4 text-slate-500"
                onClick={() => setShowPaymentModal(false)}
              >
                ✕
              </button>
              <h3 className="text-xl font-bold text-[#0f002e] mb-4">
                {paymentType === "upi" ? "Pay with UPI" : "Bank Transfer"}
              </h3>
              {paymentType === "upi" && currentOrderId && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                    <div>
                      <div className="text-sm text-slate-600">UPI ID</div>
                      <div className="font-semibold text-lg text-[#0f002e]">
                        {PAYMENT.upiId}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-sm text-[#ff4c1b] font-semibold"
                        onClick={() => copyToClipboard(PAYMENT.upiId)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  {isMobile() ? (
                    <div className="space-y-2">
                      <div className="text-sm text-slate-600">
                        Open in your UPI app to pay ₹{total}
                      </div>
                      <button
                        className="w-full bg-[#ff4c1b] text-white font-semibold rounded-xl px-6 py-3 shadow"
                        onClick={() => {
                          const upiLink = generateUpiLink(
                            total,
                            currentOrderId
                          );
                          // attempt to open UPI app
                          window.location.href = upiLink;
                        }}
                      >
                        Pay via UPI app
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-sm text-slate-600">
                        Scan QR with your UPI app or download
                      </div>
                      <img
                        src={generateQrUrl(
                          generateUpiLink(total, currentOrderId)
                        )}
                        alt="UPI QR"
                        className="w-48 h-48 mx-auto"
                      />
                      <div className="flex justify-center gap-4">
                        <a
                          href={generateQrUrl(
                            generateUpiLink(total, currentOrderId)
                          )}
                          download={`upi-qr-${currentOrderId}.png`}
                          className="text-[#ff4c1b] font-semibold"
                        >
                          Download QR
                        </a>
                        <button
                          className="text-sm text-[#ff4c1b] font-semibold"
                          onClick={() =>
                            copyToClipboard(
                              generateUpiLink(total, currentOrderId)
                            )
                          }
                        >
                          Copy UPI Link
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="pt-4 border-t" />
                  <div className="flex gap-3">
                    <button
                      className="flex-1 bg-[#ff4c1b] text-white rounded-lg py-2 font-semibold"
                      onClick={() => {
                        if (currentOrderId) sendEmailAndProceed(currentOrderId);
                      }}
                    >
                      I've paid - Confirm
                    </button>
                    <button
                      className="flex-1 bg-slate-100 rounded-lg py-2"
                      onClick={() => setShowPaymentModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {paymentType === "bank" && currentOrderId && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-600">Bank</div>
                    <div className="font-semibold text-[#0f002e]">
                      {PAYMENT.bank.name} - {PAYMENT.bank.branch}
                    </div>
                    <div className="text-sm text-slate-700 mt-2">
                      Account:{" "}
                      <span className="font-mono">
                        {PAYMENT.bank.accountNumber}
                      </span>
                    </div>
                    <div className="text-sm text-slate-700">
                      Name: {PAYMENT.bank.accountName}
                    </div>
                    <div className="text-sm text-slate-700">
                      IFSC: {PAYMENT.bank.ifsc}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-white border rounded-lg py-2"
                      onClick={() =>
                        copyToClipboard(PAYMENT.bank.accountNumber)
                      }
                    >
                      Copy Account
                    </button>
                    <button
                      className="flex-1 bg-white border rounded-lg py-2"
                      onClick={() => copyToClipboard(PAYMENT.bank.ifsc)}
                    >
                      Copy IFSC
                    </button>
                  </div>
                  <div className="text-sm text-slate-600">
                    Please transfer ₹{total} and note Order ID{" "}
                    <span className="font-mono">{currentOrderId}</span> in the
                    transaction remark.
                  </div>
                  <div className="pt-4 border-t" />
                  <div className="flex gap-3">
                    <button
                      className="flex-1 bg-[#ff4c1b] text-white rounded-lg py-2 font-semibold"
                      onClick={() => {
                        if (currentOrderId) sendEmailAndProceed(currentOrderId);
                      }}
                    >
                      I've paid - Confirm
                    </button>
                    <button
                      className="flex-1 bg-slate-100 rounded-lg py-2"
                      onClick={() => setShowPaymentModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-full md:w-80 bg-white rounded-3xl shadow-xl p-6">
        <h3 className="font-bold text-[#ff4c1b] mb-2">Order Summary</h3>
        <div className="mb-2 text-[#0f002e]">{trip?.name}</div>
        <div className="mb-2 text-slate-700">Seats: {seats}</div>
        <div className="mb-2 text-slate-700">Room: {form.room}</div>
        <div className="mb-2 text-slate-700">Date: {form.date}</div>
        <div className="font-bold text-xl mt-4 text-[#ff4c1b]">
          Total: ₹{total}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Stepper step={step} steps={steps} />
      {step === 0 && renderTripSelection()}
      {step === 1 && renderDetailsForm()}
      {step === 2 && renderSummary()}
    </div>
  );
};

export default Booking;
