import React, { useState } from "react";
import HeroBlock from "../components/HeroBlock";
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
import VideoScroller from "../components/VideoScroller";
import VideoModal from "../components/VideoModal";
import MobileActionBar from "../components/MobileActionBar";
import PageVisuals from "../components/PageVisuals";

export default function KasolKheerganga() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    index: number;
    sources: string[];
  } | null>(null);

  const itinerary = [
    {
      title: "DAY 1",
      subtitle: "Departure from Delhi",
      body: "Shaam ko Dilli se AC Traveller ya Volvo mein journey shuru karo.",
    },
    {
      title: "DAY 2",
      subtitle: "Kasol Arrival & Local",
      body: "Kasol phuchke, phir camps mein check-in. Manikaran Gurudwara aur Shiv Mandir ka Darshan. Kasol Local Market Mein Ghoomna. Chhalal Trek krke Riverside Baithte hai Cafe Hoping. Camps mein Dinner, DJ Night & Bonfire.",
    },
    {
      title: "DAY 3",
      subtitle: "Kheerganga Trek",
      body: "Camps mein Breakfast. Kasol Camps se checkout krke Barshaini tak jate hai. Barshaini se Kheerganga Trek Chalu (approx). Kheerganga mein Raat Bhar Camps mai stay. Dinner & Bonfire.",
    },
    {
      title: "DAY 4",
      subtitle: "Return Trek & Travel",
      body: "Kheerganga mein Breakfast. Check Out from Camps. Barshaini tak wapas Trek. Dilli ke liye sham mai Vapis.",
    },
    {
      title: "DAY 5",
      subtitle: "Arrival in Delhi",
      body: "Reach Delhi by 7-8 am.",
    },
  ];

  const inclusions = [
    "1 Night Stay in Kasol Camps",
    "1 Night Stay in Kheerganga Camps",
    "2 breakfast + 2 Dinners (Unlimited Veg Buffet)",
    "All the Transportation",
    "DJ Night + Bonfire",
    "Trip Captain",
  ];

  const exclusions = [
    "Personal expenses",
    "Adventure charges (if any)",
    "GST/taxes unless specified",
  ];

  const essentials = {
    gears: ["Rucksack + daypack", "Water bottle (1–2L)", "Sunscreen"],
    clothes: ["Warm layers", "Quick-dry trousers", "Light jacket for evenings"],
    footwear: ["Comfortable trekking shoes", "Camp slippers"],
    medication: ["Personal meds", "Basic first-aid"],
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
        <HeroBlock
          title="Kasol — Kheerganga"
          subtitle="5D • 4N | Pickup: Delhi / Rishikesh"
          description={
            "Kasol is a riverside hamlet famous for its laidback cafe culture and scenic trails. This trip blends relaxed riverside time with an invigorating trek to Kheerganga and cozy nights in camps."
          }
          heroImage={
            "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c6?q=80&w=1600&auto=format&fit=crop"
          }
          thumbnails={[
            "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c6?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
          ]}
          ctaPrimary={{ text: "Reserve Your Seat", href: "#book" }}
          ctaSecondary={{
            text: "More Info",
            href: "https://soulfuljourneystours.com/kasol-kheerganga",
          }}
          stats={[
            { label: "Duration", value: "5D • 4N" },
            { label: "Pickup", value: "Delhi / Rishikesh" },
            { label: "Price", value: "Quad: ₹5,499" },
          ]}
        />
        <PageVisuals />
      </div>
      <section
        id="overview"
        className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-2xl font-bold">Overview & Highlights</h3>
        <div className="accent-line" />
        <p className="mt-4 text-slate-600">
          Kasol is a riverside hamlet famous for its easygoing vibe and cafe
          culture. Kheerganga offers alpine meadows and hot springs after a
          scenic trek — this trip blends laidback riverside time with a
          refreshing trek and cozy nights in camps.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">☕</div>
              <div>
                <div className="font-semibold">Riverside Cafes</div>
                <div className="text-sm text-slate-600">
                  Cafe hopping by Parvati river
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🥾</div>
              <div>
                <div className="font-semibold">Kheerganga Trek</div>
                <div className="text-sm text-slate-600">
                  Trekking and hot spring soak
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🏕️</div>
              <div>
                <div className="font-semibold">Swiss-style Camps</div>
                <div className="text-sm text-slate-600">
                  Cozy camps with community dining
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ItineraryAccordion itinerary={itinerary} />

      <DetailsPanel
        inclusions={inclusions}
        exclusions={exclusions}
        essentials={essentials}
      />

      <section
        id="book"
        className="mt-12 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          <div className="text-sm text-slate-600">Prices (Before 15th Dec)</div>
          <div className="text-2xl font-semibold">
            Quad: ₹5,499 • Triple: ₹5,999 • Double: ₹6,499
          </div>
          <p className="mt-2 text-slate-600">
            After Dec 15 add ₹2,000 to above prices.
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
