import React, { useState } from "react";
import qrAsset from "../assets/Misc/QR code.jpeg";

type Props = {
  upiId: string;
  name?: string;
  amount?: string; // optional amount in rupees without symbol, e.g. "1499"
  note?: string;
};

const MOBILE_UPI_APPS = [
  { id: "googlepay", label: "Google Pay", scheme: "tez://upi/payment" },
  { id: "phonepe", label: "PhonePe", scheme: "phonepe://pay" },
  { id: "paytm", label: "Paytm", scheme: "paytmmp://" },
  { id: "bhim", label: "BHIM", scheme: "upi://pay" },
];

export default function UPIPayment({
  upiId,
  name = "Soulful Journeys",
  amount,
  note = "",
}: Props) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showApps, setShowApps] = useState(false);

  const upiUri = (() => {
    // build a canonical UPI deep link
    // Example: upi://pay?pa=merchant@upi&pn=Payee&am=10&tn=note
    const params: Record<string, string> = {
      pa: upiId,
      pn: name,
    };
    if (amount) params.am = amount;
    if (note) params.tn = note;
    const qs = Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");
    return `upi://pay?${qs}`;
  })();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      console.error("copy failed", err);
      // fallback
      const el = document.createElement("textarea");
      el.value = upiId;
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } finally {
        document.body.removeChild(el);
      }
    }
  };

  const isMobile =
    typeof navigator !== "undefined" &&
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  function openUpiApp(appScheme?: string) {
    // If the app supports a custom scheme, try to open constructed UPI uri using that scheme if needed.
    // Many UPI apps support the standard upi://pay link which will be handled by the system chooser.
    // We'll attempt to open the upiUri directly.
    try {
      window.location.href = upiUri;
    } catch (err) {
      console.error("failed to open upi link", err);
    }
  }

  // Use static QR image from assets (provided in repo)
  const qrImageUrl = qrAsset;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-md">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Pay via UPI</h3>
        <p className="text-sm text-slate-600 mt-1">
          Send payment to the UPI ID below
        </p>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg px-4 py-3">
          <div>
            <div className="text-xs text-slate-500">UPI ID</div>
            <div className="font-mono font-semibold text-slate-900">
              {upiId}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              onClick={() => {
                if (isMobile) setShowApps(true);
                else setShowQR(true);
              }}
              className="px-3 py-1 rounded-lg bg-amber-500 text-white text-sm hover:bg-amber-600"
            >
              Pay
            </button>
          </div>
        </div>

        {amount && (
          <div className="mt-3 text-sm text-slate-600">
            Amount: <span className="font-semibold">₹{amount}</span>
          </div>
        )}

        <div className="mt-4 text-sm text-slate-500">
          Tip: you can copy the UPI id or click Pay — on desktop you'll see a QR
          code, on mobile you'll be offered app options.
        </div>
      </div>

      {/* QR modal for desktop */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Scan QR to pay</h4>
              <button
                onClick={() => setShowQR(false)}
                className="text-sm text-slate-500"
              >
                Close
              </button>
            </div>
            <div className="mt-4 flex flex-col items-center gap-4">
              <img
                src={qrImageUrl}
                alt="UPI QR"
                className="w-60 h-60 object-contain bg-white p-2"
              />
              <div className="w-full">
                <div className="text-xs text-slate-500">UPI Link</div>
                <div className="font-mono text-sm break-all">{upiUri}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apps list for mobile */}
      {showApps && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="bg-white rounded-t-xl p-4 w-full max-w-md">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Open in UPI App</h4>
              <button
                onClick={() => setShowApps(false)}
                className="text-sm text-slate-500"
              >
                Close
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {MOBILE_UPI_APPS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => openUpiApp(a.scheme)}
                  className="py-3 rounded-lg border text-sm text-slate-700"
                >
                  {a.label}
                </button>
              ))}
            </div>
            <div className="mt-4 text-sm text-slate-600">
              If your app is not listed, choose 'UPI' or 'Browser' option and
              paste the UPI id.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
