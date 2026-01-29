// Set your API base URL here (e.g. "/api" for same server, or full URL for remote)
const API_BASE = "/api";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ghostPic from "../assets/Misc/ghost-picture.jpg";
// Typewriter component (tuned for the meta form hero)
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = React.useState(0);
  const [display, setDisplay] = React.useState("");
  const [typing, setTyping] = React.useState(true);

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const word = words[index];

    if (typing) {
      timeout = setTimeout(() => {
        setDisplay((prev) => word.slice(0, prev.length + 1));
        if (display.length + 1 === word.length) setTyping(false);
      }, 70);
    } else {
      timeout = setTimeout(() => {
        setDisplay("");
        setTyping(true);
        setIndex((i) => (i + 1) % words.length);
      }, 900);
    }

    return () => clearTimeout(timeout);
  }, [display, typing, index, words]);

  return (
    <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
      {display}
      <span className="inline-block w-1 h-6 align-middle bg-white ml-2 animate-pulse" />
    </span>
  );
}
import brandingLogo from "../assets/Misc/Branding-2.png";

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
const months = ["January 2026", "February 2026", "March 2026"];

export default function MetaLeadForm() {
  const navigate = useNavigate();
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

    // Safely access nested `pysOptions` without using `any` by runtime-checking shapes
    const pysRoot = (window as unknown as { pysOptions?: unknown }).pysOptions;
    let pysEventId = "LEAD_" + Date.now();
    if (pysRoot && typeof pysRoot === "object") {
      const dyn = (pysRoot as { dynamicEvents?: unknown }).dynamicEvents;
      if (dyn && typeof dyn === "object") {
        const auto = (dyn as { automatic_event_form?: unknown })
          .automatic_event_form;
        if (auto && typeof auto === "object") {
          const fb = (auto as { facebook?: unknown }).facebook;
          if (fb && typeof fb === "object" && "eventID" in fb) {
            const evt = (fb as { eventID?: unknown }).eventID;
            if (typeof evt === "string") pysEventId = evt;
          }
        }
      }
    }
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

    // 1. Get round robin owner from backend
    let ownerId = null;
    try {
      const ownerRes = await fetch(`${API_BASE}/lead_owner_round_robin.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formattedPhone, name: form.firstname, page_url: window.location.href })
      });
      const ownerData = await ownerRes.json();
      ownerId = ownerData.owner_id;
    } catch (err) {
      // fallback: no owner assigned
      ownerId = null;
    }

    // 2. Log lead to backend (CSV)
    try {
      const leadData = {
        ...form,
        phone: formattedPhone,
        submitted_at: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        hubspot_owner_id: ownerId || undefined,
      };
      await fetch("/api/lead_forms.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
    } catch (err) {
      // Logging error is non-blocking
      console.error("Lead log error", err);
    }

    // 3. Send to backend to create HubSpot contact (with owner)
    try {
      const contactPayload = {
        firstname: form.firstname || "N/A",
        lastname: form.lastname || "N/A",
        email: form.email || "N/A",
        phone: formattedPhone || "N/A",
        trip: form.trip || "N/A",
        trip_month: form.trip_month || "N/A",
        persons: form.persons || "N/A",
        how_soon_you_want_to_book: form.how_soon_you_want_to_book || "N/A",
        page_url: window.location.href,
      };
      const hsRes = await fetch(
        `${API_BASE}/create_hubspot_contact.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactPayload),
        }
      );
      const hsResult = await hsRes.json();
      if (!hsResult.success) throw new Error("HubSpot contact creation failed");
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
        navigate("/");
      }, 500);
    } catch (err) {
      setOverlayText("Error submitting. Please try again.");
      console.error("❌ Submission error:", err);
    }
  };

  // Basic client-side validation
  const [errors, setErrors] = React.useState<{ [k: string]: string }>({});
  const [step, setStep] = useState<number>(1);

  const validate = () => {
    const next: { [k: string]: string } = {};
    if (!form.firstname.trim()) next.firstname = "First name is required";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email";
    const digits = form.phone.replace(/\D/g, "");
    if (!digits || digits.length < 10)
      next.phone = "Enter a valid phone number";
    if (!form.trip) next.trip = "Please choose a trip";
    setErrors(next);
    return Object.keys(next).length === 0;
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

  const formIsValid = React.useMemo(() => {
    // quick validation for disabling the submit until fields look valid
    if (!form.firstname.trim()) return false;
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return false;
    const digits = form.phone.replace(/\D/g, "");
    if (!digits || digits.length < 10) return false;
    if (!form.trip) return false;
    return true;
  }, [form]);

  // Hide site chrome (Header/Footer) while this page is mounted
  useEffect(() => {
    try {
      document.body.classList.add("hide-chrome");
    } catch (err) {
      // ignore in non-DOM contexts
    }
    return () => {
      try {
        document.body.classList.remove("hide-chrome");
      } catch (err) {
        // ignore
      }
    };
  }, []);

  return (
    <section
      id="lead-hero"
      className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-6 relative overflow-hidden pt-12 sm:pt-16 md:pt-36 pb-20 md:pb-36"
      style={{
        background:
          "linear-gradient(120deg, #0f002e 0%, #3a1c71 50%, #1a093f 80%, #000 100%)",
      }}
    >
      {/* Radial overlay for extra depth (same as Home hero) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 60% 40%, rgba(58,28,113,0.25) 0%, rgba(0,0,0,0.0) 70%)",
        }}
      />

      {/* Ghost background image (subtle, full-bleed under the overlay) */}
      <img
        src={ghostPic}
        alt="ghost background"
        className="ghost-bg pointer-events-none select-none absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Page heading - branding image above the title, with hero-style subheading */}
      <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg mx-auto z-20 text-center mb-4 md:mb-0 md:mr-10 px-4 sm:px-0 fade-up">
        <img
          src={brandingLogo}
          alt="Soulful Journeys branding"
          className="mx-auto w-24 h-auto sm:w-28 md:w-32 lg:w-40 mb-4 drop-shadow-lg"
        />

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center mb-3 tracking-tight drop-shadow-lg leading-tight">
          Vibe Check, are you the one?
        </h1>

        <div className="text-center text-xl sm:text-2xl md:text-3xl font-medium text-white/90 mb-2 tracking-wide">
          <Typewriter
            words={["Travel.", "Party.", "Socialize.", "Experience."]}
          />
        </div>
      </div>

      <div className="relative w-full max-w-full sm:max-w-md md:max-w-lg mx-auto p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl bg-[rgba(10,6,18,0.6)] border border-[rgba(255,255,255,0.06)] backdrop-blur-sm flex flex-col items-center z-20 fade-up">
        <form
          className="w-full space-y-5"
          onSubmit={(e) => {
            e.preventDefault(); /* handled below */
          }}
        >
          {/* Step indicator */}
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
                {errors.firstname && (
                  <div className="text-xs text-pink-400 mt-1">
                    {errors.firstname}
                  </div>
                )}
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
                {errors.email && (
                  <div className="text-xs text-pink-400 mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="WhatsApp number"
                  className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-transparent text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-base sm:text-lg border border-white/6 w-full"
                />
                {errors.phone && (
                  <div className="text-xs text-pink-400 mt-1">
                    {errors.phone}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!validatePart1()) return;
                    setStep(2);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#ffb347] to-[#ff4c1b] text-white font-bold text-sm sm:text-base md:text-lg shadow-lg transition-all duration-200 tracking-wider disabled:opacity-60"
                  disabled={overlay}
                >
                  Continue
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
                  <label className="flex items-center space-x-2 cursor-pointer text-white">
                    <input
                      type="radio"
                      name="trip"
                      value="Something else"
                      checked={form.trip === "Something else"}
                      onChange={handleChange}
                      className="h-4 w-4 accent-pink-500 border-2 border-white focus:ring-2 focus:ring-pink-500"
                    />
                    <span className="text-sm font-medium">Something else</span>
                  </label>
                </div>
                {errors.trip && (
                  <div className="text-xs text-pink-400 mt-1">
                    {errors.trip}
                  </div>
                )}
              </div>

              <select
                name="trip_month"
                value={form.trip_month}
                onChange={handleChange}
                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-base sm:text-lg border border-white/6 shadow-none w-full"
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              {errors.trip_month && (
                <div className="text-xs text-pink-400 mt-1">
                  {errors.trip_month}
                </div>
              )}

              <input
                name="persons"
                type="number"
                min="1"
                max="20"
                value={form.persons}
                onChange={handleChange}
                placeholder="Number of Persons (use digits)"
                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-transparent text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-base sm:text-lg border border-white/6 w-full"
              />
              {errors.persons && (
                <div className="text-xs text-pink-400 mt-1">
                  {errors.persons}
                </div>
              )}

              <select
                name="how_soon_you_want_to_book"
                value={form.how_soon_you_want_to_book}
                onChange={handleChange}
                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-base sm:text-lg border border-white/6 shadow-none w-full"
              >
                <option value="">How soon do you want to book?</option>
                <option value="now">Now</option>
                <option value="in 3 days">In 3 days</option>
                <option value="in a week">In a week</option>
                <option value="in a month">In a month</option>
                <option value="just exploring">Just exploring</option>
              </select>
              {errors.how_soon_you_want_to_book && (
                <div className="text-xs text-pink-400 mt-1">
                  {errors.how_soon_you_want_to_book}
                </div>
              )}

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
                    // perform final submit
                    handleSubmit(e as unknown as React.FormEvent);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#ffb347] to-[#ff4c1b] text-white font-bold text-sm sm:text-base md:text-lg shadow-lg transition-all duration-200 tracking-wider disabled:opacity-60"
                  disabled={overlay}
                >
                  {overlay ? "Submitting..." : "PASS THE VIBE CHECK"}
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
    </section>
  );
}
