// Set your API base URL here (e.g. "/api" for same server, or full URL for remote)
const API_BASE = "/api";
import React, { useState } from "react";
import QuickLeadPopup from "./QuickLeadPopup";

interface Props {
  whatsappHref?: string;
  callHref?: string;
  bookHref?: string;
}

export default function MobileActionBar({
  whatsappHref = "https://wa.me/918383021712",
  callHref = "tel:+918383021712",
  bookHref = "#book",
}: Props) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [action, setAction] = useState<"call" | "whatsapp" | null>(null);
  const [loading, setLoading] = useState(false);

  // No local round robin, use server

  const handleAction = (type: "call" | "whatsapp") => {
    setAction(type);
    setPopupOpen(true);
  };

  const handleSubmit = async (data: {
    name: string;
    phone: string;
    persons: number;
  }) => {
    setPopupOpen(false);
    setLoading(true);
    try {
      // First, submit lead to backend (ensures HubSpot is updated)
      const res = await fetch(
        `${API_BASE}/lead_owner_round_robin.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: data.phone,
            name: data.name,
            page_url: window.location.href,
          }),
        },
      );
      const owner = await res.json();

      // Send CAPI event (fire and forget)
      // Helper to get _fbp from cookies
      function getFbpCookie() {
        const match = document.cookie.match(/_fbp=([^;]+)/);
        return match ? match[1] : "";
      }
      fetch(`${API_BASE}/sendminiformcapi.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "Lead",
          email: "", // not collected in quick popup
          phone: data.phone,
          first_name: data.name,
          persons: data.persons,
          url: window.location.href,
          fbp: getFbpCookie(),
          fbclid: (new URLSearchParams(window.location.search)).get("fbclid") || "",
        }),
      });

      // Simulate a short delay for animation
      setTimeout(() => {
        setLoading(false);
        if (action === "call") {
          window.location.href = `tel:+${owner.phone}`;
        } else if (action === "whatsapp") {
          const tripMsg = owner.trip ? ` for ${owner.trip}` : "";
          const msg = encodeURIComponent(
            `Hi, I want to book a trip${tripMsg}. Name: ${data.name}, My number: ${data.phone}, Persons: ${data.persons}`,
          );
          window.open(`https://wa.me/${owner.phone}?text=${msg}`, "_blank");
        }
      }, 1200);
    } catch (e) {
      setLoading(false);
      alert("Could not assign a sales owner. Please try again.");
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-300 p-3 flex md:hidden justify-between gap-2 z-50">
        <button
          className="flex-1 text-center bg-slate-900 text-white py-3 rounded-2xl font-semibold"
          onClick={() => handleAction("call")}
          disabled={loading}
        >
          Call
        </button>
        <button
          className="flex-1 text-center bg-green-500 text-white py-3 rounded-2xl font-semibold"
          onClick={() => handleAction("whatsapp")}
          disabled={loading}
        >
          WhatsApp
        </button>
        {/* Book button removed for mobile as requested */}
      </div>
      {loading && (
        <div className="fixed bottom-16 left-0 w-full flex justify-center z-50">
          <div className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ffb347] to-[#ff4c1b] animate-loading-bar"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}
      <QuickLeadPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onSubmit={handleSubmit}
      />
      {/* Loading bar animation */}
      <style>{`
        @keyframes loading-bar {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 1.2s linear forwards;
        }
      `}</style>
    </>
  );
}
