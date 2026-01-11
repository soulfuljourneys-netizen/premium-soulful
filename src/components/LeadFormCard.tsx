import React, { useState, useRef } from "react";

type Props = {
  initialTrip?: string;
  className?: string;
  step1Label?: string;
  submitLabel?: string;
};

const trips = [
  "Kasol Kheerganga",
  "Jibhi Tirthan",
  "Chopta Tungnath",
  "Udaipur MountAbu",
  "Manali Sissu Kasol",
];
const months = ["December 2025", "January 2026", "February 2026"];

function formatPhoneNumberForIndia(number: string) {
  number = number.replace(/\D/g, "");
  if (number.length === 10) return "+91" + number;
  if (number.length === 11 && number.startsWith("0"))
    return "+91" + number.slice(1);
  if (number.length === 12 && number.startsWith("91")) return "+" + number;
  return "";
}

export default function LeadFormCard({
  initialTrip = "",
  className = "",
  step1Label = "Continue",
  submitLabel = "PASS THE VIBE CHECK",
}: Props) {
  const [overlay, setOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState("");
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    trip: initialTrip || "",
    trip_month: "",
    persons: "",
    how_soon_you_want_to_book: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePart1 = () => {
    const next: { [k: string]: string } = {};
    if (!form.firstname.trim()) next.firstname = "First name is required";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email";
    const digits = form.phone.replace(/\D/g, "");
    if (!digits || digits.length < 10)
      next.phone = "Enter a valid phone number";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validatePart2 = () => {
    const next: { [k: string]: string } = {};
    if (!form.trip) next.trip = "Please choose a trip";
    if (!form.trip_month) next.trip_month = "Please choose a month";
    if (
      !form.persons ||
      Number.isNaN(Number(form.persons)) ||
      Number(form.persons) <= 0
    )
      next.persons = "Enter number of persons";
    if (!form.how_soon_you_want_to_book)
      next.how_soon_you_want_to_book = "Please select a booking timeframe";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    setOverlay(true);
    setOverlayText("Submitting your details…");

    const formattedPhone = formatPhoneNumberForIndia(form.phone);

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
      ],
    };

    try {
      await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/44702223/19022646-1178-421d-979b-10293febc2a4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hubspotData),
        }
      );
    } catch (err) {
      console.error(err);
    }

    try {
      const capiPayload = {
        event_name: "urgentBookings",
        event_time: Math.floor(Date.now() / 1000),
        url: window.location.href,
        user_data: {
          first_name: form.firstname,
          last_name: form.lastname,
          email: form.email,
          phone: formattedPhone,
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
    } catch (err) {
      console.error(err);
    }

    setOverlayText("Redirecting…");
    setTimeout(() => {
      window.location.href = "https://premiumsoulful.com/thank-you-meta/";
    }, 600);
  };

  // Partial submit used when user completes step 1 (Get Callback)
  const rootRef = useRef<HTMLDivElement | null>(null);

  const submitPartial = async () => {
    setOverlay(true);
    setOverlayText("Sending callback request…");
    const formattedPhone = formatPhoneNumberForIndia(form.phone);
    const hubspotData = {
      fields: [
        { name: "firstname", value: form.firstname || "N/A" },
        { name: "lastname", value: form.lastname || "N/A" },
        { name: "email", value: form.email || "N/A" },
        { name: "phone", value: formattedPhone || "N/A" },
        // include trip if present so lead is attributed
        { name: "trip", value: form.trip || "N/A" },
      ],
    };

    try {
      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/44702223/19022646-1178-421d-979b-10293febc2a4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hubspotData),
        }
      );
      if (!res.ok) throw new Error("HubSpot partial submit failed");
      setOverlayText("Callback requested - we will reach out soon.");
      // small delay so user sees confirmation, then show step 2 and keep form in view
      setTimeout(() => {
        setOverlay(false);
        setOverlayText("");
        setStep(2);
        // scroll the form card into view instead of jumping to page top
        if (rootRef.current)
          rootRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 900);
    } catch (err) {
      console.error("Partial submit error:", err);
      setOverlayText("Couldn't send callback right now - continuing…");
      setTimeout(() => {
        setOverlay(false);
        setOverlayText("");
        setStep(2);
        if (rootRef.current)
          rootRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 900);
    }
  };

  return (
    <div
      ref={rootRef}
      className={
        className +
        " relative w-full max-w-full sm:max-w-md md:max-w-lg mx-auto p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl bg-[rgba(10,6,18,0.6)] border border-[rgba(255,255,255,0.06)] backdrop-blur-sm flex flex-col items-center z-20 fade-up"
      }
    >
      <form
        className="w-full space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="w-full flex justify-between items-center text-sm text-white/70 mb-1">
          <div>Step {step} of 2</div>
          <div>{step === 1 ? "Basic details" : "Trip details"}</div>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-transparent text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-base sm:text-lg border border-white/6 w-full"
              />
              <input
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-transparent text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-base sm:text-lg border border-white/6 w-full"
              />
            </div>

            <div>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-transparent text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-base sm:text-lg border border-white/6 w-full"
              />
            </div>

            <div>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="WhatsApp number"
                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-transparent text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-base sm:text-lg border border-white/6 w-full"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!validatePart1()) return;
                  void submitPartial();
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#ffb347] to-[#ff4c1b] text-white font-bold text-sm sm:text-base md:text-lg shadow-lg transition-all duration-200 tracking-wider disabled:opacity-60"
                disabled={overlay}
              >
                {step1Label}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mt-2">
              <div className="text-white font-semibold mb-2">
                Which Trip you're looking?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    />
                    <span className="text-sm font-medium">{option}</span>
                  </label>
                ))}
              </div>
              {errors.trip && (
                <div className="text-xs text-pink-400 mt-1">{errors.trip}</div>
              )}
            </div>

            <select
              name="trip_month"
              value={form.trip_month}
              onChange={handleChange}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-base sm:text-lg border border-white/6 shadow-none w-full"
            >
              <option
                value=""
                className="text-slate-400"
                style={{ color: "#94a3b8" }}
              >
                Select Month
              </option>
              {months.map((month) => (
                <option
                  key={month}
                  value={month}
                  className="text-slate-900"
                  style={{ color: "#0f172a" }}
                >
                  {month}
                </option>
              ))}
            </select>

            <input
              name="persons"
              value={form.persons}
              onChange={handleChange}
              placeholder="Number of Persons"
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-transparent text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-base sm:text-lg border border-white/6 w-full"
            />

            <select
              name="how_soon_you_want_to_book"
              value={form.how_soon_you_want_to_book}
              onChange={handleChange}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-base sm:text-lg border border-white/6 shadow-none w-full"
            >
              <option
                value=""
                className="text-slate-400"
                style={{ color: "#94a3b8" }}
              >
                How soon do you want to book?
              </option>
              <option
                value="Immediately"
                className="text-slate-900"
                style={{ color: "#0f172a" }}
              >
                Immediately
              </option>
              <option
                value="Within a week"
                className="text-slate-900"
                style={{ color: "#0f172a" }}
              >
                Within a week
              </option>
              <option
                value="Within a month"
                className="text-slate-900"
                style={{ color: "#0f172a" }}
              >
                Within a month
              </option>
              <option
                value="Just exploring"
                className="text-slate-900"
                style={{ color: "#0f172a" }}
              >
                Just exploring
              </option>
            </select>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl bg-white/8 text-white font-semibold text-sm sm:text-base md:text-lg shadow-sm transition-all duration-200 tracking-wider"
                disabled={overlay}
              >
                Back
              </button>
              <button
                type="button"
                onClick={(e) => {
                  if (!validatePart2()) return;
                  handleSubmit(e as unknown as React.FormEvent);
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#ffb347] to-[#ff4c1b] text-white font-bold text-sm sm:text-base md:text-lg shadow-lg transition-all duration-200 tracking-wider disabled:opacity-60"
                disabled={overlay}
              >
                {overlay ? "Submitting..." : submitLabel}
              </button>
            </div>
          </div>
        )}
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
  );
}
