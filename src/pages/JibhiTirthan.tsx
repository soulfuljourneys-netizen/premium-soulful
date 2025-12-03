import React, { useState } from "react";
import HeroBlock from "../components/HeroBlock";
import thumb1 from "../assets/Hero Sections/Jibhi Tirthan/Jalori Pass.jpg";
import thumb2 from "../assets/Hero Sections/Jibhi Tirthan/Jibhi Himachal Pradesh.jpg";
import thumb3 from "../assets/Hero Sections/Jibhi Tirthan/Jibhi waterfall.jpg";
import thumb4 from "../assets/Hero Sections/Jibhi Tirthan/Mini Thailand, Jibhi, Himachal Pradesh.jpg";
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
import VideoScroller from "../components/VideoScroller";
import VideoModal from "../components/VideoModal";
import StayCarousel from "../components/StayCarousel";
import TripStaySection from "../components/TripStaySection";
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

  const prices = {
    before: { quad: "₹6,499", triple: "₹6,999", dbl: "₹7,499" },
    after: { add: "₹1,000" },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submitForm = () => {
    console.log("Booking request", form);
    alert("Request received. We'll contact you shortly.");
    setForm({ name: "", phone: "", email: "" });
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    submitForm();
  };

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

  const toggle = (i: number) => setExpanded((prev) => (prev === i ? null : i));

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 pb-36 pt-6">
      <div className="relative">
        <PageVisuals />
        <HeroBlock
          title="Jibhi — Tirthan Valley"
          subtitle="5 Days / 4 Nights — Every Friday Evening from Delhi & Chandigarh"
          description={
            "A calm valley escape into Jibhi & Tirthan — waterfalls, forest treks, and evenings around the bonfire. Ideal for groups and travellers seeking nature with cozy hotel stays."
          }
          heroImage={thumb1}
          thumbnails={[thumb1, thumb2, thumb3, thumb4]}
          ctaPrimary={{ text: "Reserve Your Seat", href: "#book" }}
          ctaSecondary={{
            text: "More Info",
            href: "https://soulfuljourneystours.com/jibhi-tirthan",
          }}
          stats={[
            { label: "Duration", value: "5D • 4N" },
            { label: "Pickup", value: "Delhi / Chandigarh" },
            {
              label: "Price",
              value: `Quad: ${prices.before.quad} • Triple: ${prices.before.triple} • Double: ${prices.before.dbl}`,
            },
          ]}
        />
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

      <ItineraryAccordion itinerary={itinerary} />

      <TripStaySection
        carousels={[
          {
            title: "Stays We Provide",
            images: [thumb1, thumb2, thumb3, thumb4],
          },
        ]}
      />

      <DetailsPanel
        inclusions={inclusions}
        exclusions={exclusions}
        dates={[
          "12th–16th Dec",
          "19th–23rd Dec",
          "21st–31st Dec (Everyday Departure)",
          "2nd–6th Jan",
          "9th–13th Jan",
          "16th–20th Jan",
        ]}
      />

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

      <section className="mt-10">
        <h4 className="text-2xl font-bold">Traveller Video Stories</h4>
        <VideoScroller onOpen={(payload) => setOpenVideo(payload)} />
      </section>

      <MobileActionBar />

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
