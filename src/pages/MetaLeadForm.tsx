import React, { useState } from "react";

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function formatPhoneNumberForIndia(number: string) {
  number = number.replace(/\D/g, "");
  if (number.length === 10) return "+91" + number;
  if (number.length === 11 && number.startsWith("0"))
    return "+91" + number.slice(1);
  if (number.length === 12 && number.startsWith("91")) return "+" + number;
  return "";
}

const trips = [
  "Kasol Kheerganga",
  "Jibhi Tirthan",
  "Chopta Tungnath",
  "Udaipur MountAbu",
  "Manali Sissu Kasol",
];
const months = ["December 2025", "January 2026", "February 2026"];

export default function MetaLeadForm() {
  const [overlay, setOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState("");
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    trip: "",
    trip_month: "",
    persons: "",
    how_soon_you_want_to_book: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOverlay(true);
    setOverlayText("Submitting your details…");

    const pysEventId =
      ((window as any).pysOptions?.dynamicEvents?.automatic_event_form
        ?.facebook &&
      typeof (window as any).pysOptions.dynamicEvents.automatic_event_form
        .facebook === "object" &&
      "eventID" in
        (window as any).pysOptions.dynamicEvents.automatic_event_form.facebook
        ? (window as any).pysOptions.dynamicEvents.automatic_event_form.facebook
            .eventID
        : undefined) || "LEAD_" + Date.now();
    const fbcCookie = getCookie("_fbc");
    const fbpCookie = getCookie("_fbp");
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    let fbc = fbcCookie;
    if (!fbc && fbclid) {
      const creation_time_ms = Date.now();
      fbc = `fb.1.${creation_time_ms}.${fbclid}`;
    }
    const fbp = fbpCookie || "";
    const formattedPhone = formatPhoneNumberForIndia(form.phone);

    // HubSpot payload
    const hubspotData = {
      fields: [
        { name: "firstname", value: form.firstname || "N/A" },
        { name: "lastname", value: form.lastname || "N/A" },
        { name: "email", value: form.email || "N/A" },
        { name: "phone", value: formattedPhone || "N/A" },
        { name: "trip", value: form.trip || "N/A" },
        { name: "trip_month", value: form.trip_month || "N/A" },
        { name: "persons", value: form.persons || "N/A" },
        {
          name: "how_soon_you_want_to_book",
          value: form.how_soon_you_want_to_book || "N/A",
        },
        { name: "twitterhandle", value: fbc || "N/A" },
      ],
    };

    try {
      // Send to HubSpot
      const hsRes = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/44702223/19022646-1178-421d-979b-10293febc2a4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hubspotData),
        }
      );
      if (!hsRes.ok) throw new Error("HubSpot submission failed");
      setOverlayText("Processing details…");

      // Send to CAPI
      const capiPayload = {
        event_name: "urgentBookings",
        event_id: pysEventId,
        event_time: Math.floor(Date.now() / 1000),
        url: window.location.href,
        user_data: {
          first_name: form.firstname,
          last_name: form.lastname,
          email: form.email,
          phone: formattedPhone,
          fbc: fbc || "",
          fbp: fbp || "",
          client_user_agent: navigator.userAgent,
        },
        custom_data: {
          booking_time: form.how_soon_you_want_to_book,
          trip_month: form.trip_month,
          persons: form.persons,
        },
      };
      await fetch("/api/sendCapi.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(capiPayload),
      });

      setOverlayText("Redirecting…");
      setTimeout(() => {
        window.location.href = "https://premiumsoulful.com/thank-you-meta/";
      }, 500);
    } catch (err) {
      setOverlayText("Error submitting. Please try again.");
      console.error("❌ Submission error:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#18121e] bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "none" }}
    >
      {/* Ghost friends group chilling image as background */}
      <img
        src="/assets/ghost-friends-chilling.png"
        alt="Ghost friends group chilling"
        className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] max-w-[90vw] opacity-80 z-0"
        style={{ filter: "drop-shadow(0 8px 32px #0008)" }}
      />
      {/* Subtle overlay for modern minimal look */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#18121e]/80 to-[#18121e]/95 backdrop-blur-sm z-10"
        aria-hidden="true"
      ></div>
      <div className="relative w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl bg-[#20162b]/90 border border-[#3a234a] flex flex-col items-center z-20">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-2 tracking-tight drop-shadow-lg">
          Vibe Check, are you the one?
        </h1>
        <div className="text-center text-lg font-extrabold text-white mb-6 tracking-widest drop-shadow">
          PΛΛVE!
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="px-5 py-3 rounded-2xl bg-[#2a1536] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg border border-[#3a234a] shadow-inner"
            />
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="px-5 py-3 rounded-2xl bg-[#2a1536] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg border border-[#3a234a] shadow-inner"
            />
          </div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="px-5 py-3 rounded-2xl bg-[#2a1536] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg border border-[#3a234a] shadow-inner w-full"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="whatsapp number"
            required
            className="px-5 py-3 rounded-2xl bg-[#2a1536] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg border border-[#3a234a] shadow-inner w-full"
          />
          <div className="mt-2">
            <div className="text-white font-semibold mb-2">
              Which Trip you're looking?
            </div>
            <div className="grid grid-cols-2 gap-3">
              {trips.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer text-white"
                >
                  <input
                    type="radio"
                    name="trip"
                    value={option}
                    checked={form.trip === option}
                    onChange={handleChange}
                    className="h-4 w-4 accent-pink-500 border-2 border-white focus:ring-2 focus:ring-pink-500"
                    required
                  />
                  <span className="text-sm font-medium">{option}</span>
                </label>
              ))}
              <label className="flex items-center space-x-2 cursor-pointer text-white">
                <input
                  type="radio"
                  name="trip"
                  value="Something else"
                  checked={form.trip === "Something else"}
                  onChange={handleChange}
                  className="h-4 w-4 accent-pink-500 border-2 border-white focus:ring-2 focus:ring-pink-500"
                  required
                />
                <span className="text-sm font-medium">Something else</span>
              </label>
            </div>
          </div>
          <select
            name="trip_month"
            value={form.trip_month}
            onChange={handleChange}
            required
            className="px-5 py-3 rounded-2xl bg-[#2a1536] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg border border-[#3a234a] shadow-inner w-full"
          >
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <input
            name="persons"
            value={form.persons}
            onChange={handleChange}
            placeholder="Number of Persons"
            required
            className="px-5 py-3 rounded-2xl bg-[#2a1536] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg border border-[#3a234a] shadow-inner w-full"
          />
          <select
            name="how_soon_you_want_to_book"
            value={form.how_soon_you_want_to_book}
            onChange={handleChange}
            required
            className="px-5 py-3 rounded-2xl bg-[#2a1536] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg border border-[#3a234a] shadow-inner w-full"
          >
            <option value="">How soon do you want to book?</option>
            <option value="Immediately">Immediately</option>
            <option value="Within a week">Within a week</option>
            <option value="Within a month">Within a month</option>
            <option value="Just exploring">Just exploring</option>
          </select>
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg shadow-lg transition-all duration-200 tracking-wider"
            disabled={overlay}
          >
            {overlay ? "Submitting..." : "PASS THE VIBE CHECK"}
          </button>
        </form>
        {overlay && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-xl font-bold text-purple-700 mb-2">
                {overlayText}
              </div>
              <div className="text-slate-600">
                Please wait while we process your request…
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
