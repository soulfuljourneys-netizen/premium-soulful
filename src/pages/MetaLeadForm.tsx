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
      (window as any).pysOptions?.dynamicEvents?.automatic_event_form?.facebook
        ?.eventID || "LEAD_" + Date.now();
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
        { name: "firstname", value: form.firstname },
        { name: "lastname", value: form.lastname },
        { name: "email", value: form.email },
        { name: "phone", value: formattedPhone },
        { name: "trip", value: form.trip },
        { name: "trip_month", value: form.trip_month },
        { name: "persons", value: form.persons },
        {
          name: "how_soon_you_want_to_book",
          value: form.how_soon_you_want_to_book,
        },
        { name: "twitterhandle", value: fbc },
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
        window.location.href = "https://soulfuljourneystours.com/group-trips";
      }, 500);
    } catch (err) {
      setOverlayText("Error submitting. Please try again.");
      console.error("❌ Submission error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white border border-slate-200 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-purple-700 mb-2 text-center">
          Soulful Journeys Lead Form
        </h2>
        <p className="text-slate-600 mb-6 text-center">
          Fill your details to get a callback and exclusive offers for Meta ads
          leads.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="p-3 border rounded-2xl"
            />
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="p-3 border rounded-2xl"
            />
          </div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="p-3 border rounded-2xl w-full"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="p-3 border rounded-2xl w-full"
          />
          <select
            name="trip"
            value={form.trip}
            onChange={handleChange}
            required
            className="p-3 border rounded-2xl w-full"
          >
            <option value="">Select Trip</option>
            {trips.map((trip) => (
              <option key={trip} value={trip}>
                {trip}
              </option>
            ))}
          </select>
          <select
            name="trip_month"
            value={form.trip_month}
            onChange={handleChange}
            required
            className="p-3 border rounded-2xl w-full"
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
            className="p-3 border rounded-2xl w-full"
          />
          <select
            name="how_soon_you_want_to_book"
            value={form.how_soon_you_want_to_book}
            onChange={handleChange}
            required
            className="p-3 border rounded-2xl w-full"
          >
            <option value="">How soon do you want to book?</option>
            <option value="Immediately">Immediately</option>
            <option value="Within a week">Within a week</option>
            <option value="Within a month">Within a month</option>
            <option value="Just exploring">Just exploring</option>
          </select>
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition"
          >
            Submit
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
