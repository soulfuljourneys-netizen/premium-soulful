import React, { useState } from "react";
import HeroBlock from "../components/HeroBlock";
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
import VideoScroller from "../components/VideoScroller";
import VideoModal from "../components/VideoModal";
import MobileActionBar from "../components/MobileActionBar";
import PageVisuals from "../components/PageVisuals";

export default function JibhiTirthan() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    index: number;
    sources: string[];
  } | null>(null);

  const toggle = (i: number) => setExpanded((prev) => (prev === i ? null : i));

  const itinerary = [
    {
      title: "Day 1 — Arrival & Local Walk",
      subtitle: "Drive to Jibhi; evening walk",
      body: "Meet at the pickup point, drive to Jibhi, check-in at the hotel and enjoy a relaxed evening around a bonfire. Short village walk depending on arrival time.",
    },
    {
      title: "Day 2 — Waterfalls & Trails",
      subtitle: "Trek to Chhoie and nearby trails",
      body: "After breakfast head out for short treks to nearby waterfalls and forest trails. Picnic lunch and an easy-paced evening.",
    },
    {
      title: "Day 3 — Tirthan Riverside",
      subtitle: "Riverside cafes & light exploration",
      body: "Leisurely day exploring the Tirthan riverbanks, visiting local cafes and optional short hikes. Evening spent at the homestay or guesthouse.",
    },
    {
      title: "Day 4 — Departure",
      subtitle: "Return to pickup city",
      body: "After breakfast, pack up and drive back to Delhi / Chandigarh with stops on the way as needed. End of trip.",
    },
  ];

  const inclusions = [
    "Transport from pickup point",
    "Accommodation (as per itinerary)",
    "Meals as specified",
    "Campfires & local guide",
  ];

  const exclusions = [
    "Personal expenses",
    "Travel insurance",
    "Optional activity fees",
  ];

  const essentials = {
    gears: ["Rucksack + daypack", "Water bottle (1–2L)", "Sunscreen"],
    clothes: ["Warm layers", "Quick-dry trousers", "Light jacket for evenings"],
    footwear: ["Comfortable trekking shoes", "Camp slippers"],
    medication: ["Personal meds", "Basic first-aid"],
  };

  const prices = {
    before: { quad: "₹6,499", triple: "₹6,999", dbl: "₹7,499" },
    after: { add: "₹1,000" },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value } as any));

  const submitForm = () => {
    console.log("Booking request", form);
    alert("Request received. We'll contact you shortly.");
    setForm({ name: "", phone: "", email: "" });
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    submitForm();
  };

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 pb-36 pt-6">
      <div className="relative">
        <PageVisuals />
        <section className="grid md:grid-cols-2 gap-8 items-start py-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Jibhi — Tirthan Valley
            </h2>
            <div className="text-sm text-slate-500 mt-2">
              5 Days / 4 Nights — Every Friday Evening from Delhi & Chandigarh
            </div>

            <p className="mt-6 text-slate-600 max-w-xl">
              A calm valley escape into Jibhi & Tirthan — waterfalls, forest
              treks, and evenings around the bonfire. Ideal for groups and
              travellers seeking nature with cozy hotel stays.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#book"
                className="px-4 py-2 rounded-lg bg-[#ff4c1b] text-white font-semibold text-sm"
              >
                Reserve Your Seat
              </a>
              <a
                href="https://soulfuljourneystours.com/jibhi-tirthan"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg border border-slate-200 text-sm"
              >
                More Info
              </a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col">
                <div className="font-semibold">Duration</div>
                <div className="text-slate-600">5D • 4N</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col">
                <div className="font-semibold">Pickup</div>
                <div className="text-slate-600">Delhi / Chandigarh</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col">
                <div className="font-semibold">Price</div>
                <div className="text-slate-600">
                  Quad: {prices.before.quad} • Triple: {prices.before.triple} •
                  Double: {prices.before.dbl}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-lg">
              <img
                alt="Jibhi landscape"
                className="object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1520975698513-9461c1b45639?q=80&w=1600&auto=format&fit=crop"
              />
            </div>
            <div className="absolute -bottom-8 left-6 right-6 flex gap-3">
              <img
                alt="Jibhi waterfall"
                className="w-1/3 rounded-xl shadow-md"
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop"
              />
              <img
                alt="Tirthan"
                className="w-1/3 rounded-xl shadow-md"
                src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=800&auto=format&fit=crop"
              />
              <img
                alt="Forest trail"
                className="w-1/3 rounded-xl shadow-md"
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop"
              />
            </div>
          </div>
        </section>
      </div>

      <section
        id="overview"
        className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-2xl font-bold">Overview & Highlights</h3>
        <div className="accent-line" />
        <p className="mt-4 text-slate-600">
          Jibhi & Tirthan Valley offer serene trails, riverside cafes and hidden
          waterfalls — perfect for a relaxed cultural and nature escape.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">💧</div>
              <div>
                <div className="font-semibold">Waterfalls</div>
                <div className="text-sm text-slate-600">
                  Chhoie & Jibhi cascades
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🌲</div>
              <div>
                <div className="font-semibold">Forest Treks</div>
                <div className="text-sm text-slate-600">
                  Jalori Pass & Serolsar
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">☕</div>
              <div>
                <div className="font-semibold">Local Vibes</div>
                <div className="text-sm text-slate-600">
                  Cafes, markets & quiet evenings
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="itinerary" className="mt-10">
        <h3 className="text-2xl font-bold">Itinerary</h3>
        <div className="mt-4 space-y-4">
          {itinerary.map((day, i) => (
            <article
              key={day.title}
              onClick={() => toggle(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggle(i);
              }}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm cursor-pointer"
            >
              <div className="w-full text-left p-2 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{day.title}</div>
                  <div className="text-sm text-slate-600">{day.subtitle}</div>
                </div>
                <div className="text-slate-600" aria-hidden>
                  {expanded === i ? "−" : "+"}
                </div>
              </div>
              <div
                className={`px-6 pb-6 transition-all duration-300 ${
                  expanded === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-slate-600">{day.body}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-4 text-slate-600 text-sm">
          Note: Itineraries may change for safety or local conditions.
        </p>
      </section>

      <section id="details" className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="font-bold">Inclusions</h4>
          <ul className="mt-3 space-y-2 text-slate-600">
            {inclusions.map((inc, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-3 h-3 mt-2 rounded-full bg-purple-500 flex-shrink-0" />{" "}
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="font-bold">Exclusions</h4>
          <ul className="mt-3 space-y-2 text-slate-600">
            {exclusions.map((exc, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-3 h-3 mt-2 rounded-full bg-slate-300 flex-shrink-0" />{" "}
                <span>{exc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h4 className="font-bold">Travel Essentials</h4>
          <div className="mt-3 text-slate-600">
            <div className="font-medium">Gears</div>
            <ul className="list-disc list-inside mt-1">
              {essentials.gears.map((g, i) => (
                <li key={"gear-" + i}>{g}</li>
              ))}
            </ul>
            <div className="font-medium mt-3">Clothes</div>
            <ul className="list-disc list-inside mt-1">
              {essentials.clothes.map((c, i) => (
                <li key={"clothes-" + i}>{c}</li>
              ))}
            </ul>
            <div className="font-medium mt-3">Footwear & Meds</div>
            <ul className="list-disc list-inside mt-1">
              {essentials.footwear.map((f, i) => (
                <li key={"foot-" + i}>{f}</li>
              ))}
              {essentials.medication.map((m, i) => (
                <li key={"med-" + i}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="book"
        className="mt-12 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          <div className="text-sm text-slate-600">Prices (Before 15th Dec)</div>
          <div className="text-3xl font-extrabold">
            {prices.before.quad}{" "}
            <span className="text-base font-medium text-slate-600">
              / person
            </span>
          </div>
          <div className="mt-2 text-slate-600">
            Quad: {prices.before.quad} • Triple: {prices.before.triple} •
            Double: {prices.before.dbl}
          </div>
          <p className="mt-2 text-slate-600">
            After Dec 15 add {prices.after.add} to above prices.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full md:w-1/2 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-3">
            <label className="sr-only" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className="p-3 border rounded-2xl"
              required
            />

            <label className="sr-only" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="p-3 border rounded-2xl"
              required
            />

            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email (optional)"
              className="p-3 border rounded-2xl"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-2 py-1 rounded-2xl bg-purple-600 text-white font-semibold text-sm"
              >
                Request Call
              </button>
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="flex-1 px-2 py-1 rounded-2xl border text-sm"
              >
                Reserve (Token)
              </button>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-800/60">
            By submitting, you agree to our terms & privacy policy.
          </p>
        </form>
      </section>

      <section className="mt-10 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <h4 className="font-bold">Other Info & Notes</h4>
        <ul className="mt-3 text-slate-600 list-disc list-inside">
          <li>
            Trip schedule may be altered due to weather, road conditions or
            participant safety.
          </li>
          <li>
            Age group recommended: 18–40 (we can customize for other age groups
            on request).
          </li>
          <li>
            Transport is operated by reliable third-party vendors; for groups
            &gt;35, arrangements may differ.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h4 className="text-2xl font-bold">Traveller Video Stories</h4>
        <VideoScroller onOpen={(payload) => setOpenVideo(payload)} />
      </section>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-300 p-3 flex md:hidden justify-between gap-2 z-50">
        <a
          href="https://wa.me/9090403075"
          className="flex-1 text-center bg-green-500 text-white py-3 rounded-2xl font-semibold"
        >
          WhatsApp
        </a>
        <a
          href="tel:9090403075"
          className="flex-1 text-center bg-slate-900 text-white py-3 rounded-2xl font-semibold"
        >
          Call
        </a>
        <a
          href="#book"
          className="flex-1 text-center bg-[#ff4c1b] text-white py-3 rounded-2xl font-semibold"
        >
          Book
        </a>
      </div>

      <VideoModal
        videoData={openVideo}
        onClose={() => setOpenVideo(null)}
        onNavigate={(newIndex: number) => {
          if (!openVideo) return;
          const sources = openVideo.sources || [];
          const idx =
            ((newIndex % sources.length) + sources.length) % sources.length;
          setOpenVideo({ src: sources[idx], index: idx, sources });
        }}
      />
    </main>
  );
}
