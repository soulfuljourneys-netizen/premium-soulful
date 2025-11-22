import React, { useState } from "react";
import HeroBlock from "../components/HeroBlock";
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
import VideoScroller from "../components/VideoScroller";
import VideoModal from "../components/VideoModal";
import MobileActionBar from "../components/MobileActionBar";
import PageVisuals from "../components/PageVisuals";

export default function UdaipurMountAbu() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    index: number;
    sources: string[];
  } | null>(null);

  const itinerary = [
    {
      title: "DAY 1 — Departure",
      subtitle: "Evening departure from Delhi / Gurgaon",
      body: "Delhi se 8 bje nikl jayenge — Overnight drive to Udaipur (approx 14 hours) with a Jaipur pickup en route. Midnight dinner stop during the journey.",
    },
    {
      title: "DAY 2 — Udaipur Arrival & Local Sightseeing",
      subtitle: "Check-in, City Palace & lakeside",
      body: "Arrive in Udaipur, check-in around noon and freshen up. Local sightseeing: City Palace (entry approx ₹450-500), Jagdish Temple, Bagore Ki Haveli (optional cultural show, extra ₹125), Ghanta Ghar / Gangaur Ghat. Evening: dinner, DJ night & pool party. Overnight in Udaipur.",
    },
    {
      title: "DAY 3 — Hills & Palaces",
      subtitle: "Bahubali Hills, Karni Mata cable car, Monsoon Palace",
      body: "Morning hotel breakfast. Short trek to Bahubali Hills (1–1.5km). Visit Karni Mata Temple (cable car available — approx ₹125 one side), Monsoon Palace / Sajjangarh Fort, Saheliyon ki Bari and Fateh Sagar Lake. Return for pool party & dinner at the hotel.",
    },
    {
      title: "DAY 4 — Mount Abu Excursion",
      subtitle: "Checkout and transfer to Mount Abu",
      body: "After breakfast checkout, drive to Mount Abu. Visit Dilwara Temples, Nakki Lake, Toad Rock and Brahmakumaris Bhawan. Spend the available time sightseeing and depart Mount Abu in the evening for the return journey to Delhi.",
    },
    {
      title: "DAY 5 — Arrival",
      subtitle: "Return to Delhi",
      body: "Arrival in Delhi expected between 06:00–10:00 AM depending on traffic and stops en route.",
    },
  ];

  const inclusions = [
    "All transportation Delhi to Delhi (with Jaipur pickup 3am–4am)",
    "2 Nights stay in a 3★ hotel in Udaipur",
    "2 breakfasts + 2 dinners",
    "DJ Night + Bonfire",
    "Trip Captain",
  ];

  const exclusions = [
    "GST (and applicable taxes)",
    "Meals not mentioned in inclusions",
    "Adventure charges & personal expenses",
  ];

  const essentials = {
    gears: ["Small daypack", "Water bottle", "Comfortable walking shoes"],
    clothes: [
      "Light layers",
      "Comfortable daytime clothes",
      "Swimwear (optional)",
    ],
    footwear: ["Walking shoes", "Sandals"],
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
        <PageVisuals />

        <HeroBlock
          title="Udaipur — Mount Abu"
          subtitle="5Days / 4N (including travel days)"
          description={
            "A soulful combo of Udaipur’s palaces and lakes with the green hill station charm of Mount Abu — culture, pools, and evening bonfires. Every Friday evening departure from Delhi / Gurgaon."
          }
          heroImage={
            "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1600&auto=format&fit=crop"
          }
          thumbnails={[
            "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800&auto=format&fit=crop",
          ]}
          ctaPrimary={{ text: "Reserve Your Seat", href: "#book" }}
          ctaSecondary={{
            text: "More Info",
            href: "https://soulfuljourneystours.com/udaipur-mount-abu",
          }}
          stats={[
            { label: "Duration", value: "5D • 4N" },
            { label: "Pickup", value: "Delhi / Gurgaon (Jaipur pickup)" },
            { label: "Price", value: "Quad: ₹6,999" },
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
          Udaipur’s palaces and Mount Abu’s hill station charm make for a
          balanced getaway — lakeside walks, palace views and a refreshing hill
          excursion with cultural stops and relaxed evenings.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🏰</div>
              <div>
                <div className="font-semibold">City Palaces</div>
                <div className="text-sm text-slate-600">
                  City Palace, Jagdish Mandir
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🎉</div>
              <div>
                <div className="font-semibold">Pool & Parties</div>
                <div className="text-sm text-slate-600">
                  DJ Night, Bonfire & Pool Party
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🗺️</div>
              <div>
                <div className="font-semibold">Mount Abu Excursion</div>
                <div className="text-sm text-slate-600">
                  Dilwara, Nakki Lake & Scenic Views
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
            Quad: ₹6,999 • Triple: ₹7,499 • Double: ₹7,999
          </div>
          <p className="mt-2 text-slate-600">
            After Dec 15 add ₹1,000 to above prices.
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
