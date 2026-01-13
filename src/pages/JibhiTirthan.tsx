import React, { useState } from "react";
import HeroBlock from "../components/HeroBlock";
import thumb1 from "../assets/Hero Sections/Jibhi Tirthan/Jalori Pass.jpg";
import thumb2 from "../assets/Hero Sections/Jibhi Tirthan/Jibhi Himachal Pradesh.jpg";
import thumb3 from "../assets/Hero Sections/Jibhi Tirthan/Jibhi waterfall.jpg";
import thumb4 from "../assets/Hero Sections/Jibhi Tirthan/Mini Thailand, Jibhi, Himachal Pradesh.jpg";
import jibhi1 from "../assets/Jibhi Stay/Cottage 1.jpeg";
import jibhi2 from "../assets/Jibhi Stay/Cottage 2.jpeg";
import jibhi3 from "../assets/Jibhi Stay/Cottage 3.jpeg";
import jibhi4 from "../assets/Jibhi Stay/Cottage 4.jpeg";
import jibhi5 from "../assets/Jibhi Stay/Cottage 5.jpeg";
import jibhi6 from "../assets/Jibhi Stay/Cottage 6.jpeg";
import jibhi7 from "../assets/Jibhi Stay/Cottage 7.jpeg";
import jibhi8 from "../assets/Jibhi Stay/Cottage 8.jpeg";
import jibhi9 from "../assets/Jibhi Stay/Cottage 9.jpeg";
import jibhi10 from "../assets/Jibhi Stay/Cottage 10.jpeg";
import jibhi11 from "../assets/Jibhi Stay/Cottage 11.jpeg";
import jibhi12 from "../assets/Jibhi Stay/Cottage 12.jpeg";
import jibhi13 from "../assets/Jibhi Stay/Cottage 13.jpeg";
import jibhi14 from "../assets/Jibhi Stay/Cottage 14.jpeg";
import jibhi15 from "../assets/Jibhi Stay/Cottage 15.jpeg";
import jibhi16 from "../assets/Jibhi Stay/Cottage 16.jpeg";
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
import VideoScroller from "../components/VideoScroller";
import VideoModal from "../components/VideoModal";
import TripStaySection from "../components/TripStaySection";
import MobileActionBar from "../components/MobileActionBar";
import PageVisuals from "../components/PageVisuals";
import LeadFormCard from "../components/LeadFormCard";

export default function JibhiTirthan() {
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    index: number;
    sources: string[];
  } | null>(null);

  const prices = {
    before: { quad: "₹6,499", triple: "₹6,999", dbl: "₹7,499" },
    after: { add: "₹1,000" },
  };

  const inclusions = [
    "All the Transportation from Delhi (Another Pickup at Chandigarh)",
    "2 Nights Stay in 3 Star hotel in Jibhi/Tirthan.",
    "2 Breakfast + 2 Dinners (Unlimited Veg Buffet)",
    "Dj Night + Bonfire",
    "Trip Captain",
  ];

  const exclusions = [
    "Personal expenses",
    "Travel insurance",
    "Optional activity fees",
    "GST/taxes unless specified",
    "Room Heater",
    "Travel Time Meals",
    "Lunch",
  ];

  const itinerary = [
    {
      title: "DAY 1",
      subtitle: "Evening Departure",
      body: [
        "🕔 7:00 PM: Gather in Delhi, Jibhi Volvo /Traveller hit the road by 9:30 PM.",
        "🚗 Chandigarh pickups from 2:00 AM to 4:00 AM.",
      ],
    },
    {
      title: "DAY 2",
      subtitle: "Jibhi Arrival & Waterfall",
      body: [
        "🚌 Reach Jibhi by 10:00 AM (approx).",
        "🛏️ Check in and relax.",
        "🍽️ Visit Chhoie Waterfall.",
        "🌄 Return by sunset.",
        "🔥 Enjoy bonfire, DJ night, and dinner.",
      ],
    },
    {
      title: "DAY 3",
      subtitle: "Jalori Pass & Serolsar Lake Trek",
      body: [
        "🌅 Breakfast & head towards Jalori Pass",
        "🥾 Begin the trek to Serolsar Lake through scenic forest trails.",
        "⏱️ Moderate trek 5–6 hours depending on weather.",
        "🏡 Return to your hotel by evening.",
        "Dinner in Hotel",
      ],
    },
    {
      title: "DAY 4",
      subtitle: "Jibhi Waterfall, Mini Thailand & Market",
      body: [
        "🍳 Have breakfast in the morning.",
        "💦 Visit Jibhi Waterfall and then Mini Thailand hidden in the forest.",
        "🛍️ Explore Jibhi Market and cafes.",
        "🚌 Depart for Delhi/Chandigarh in the evening.",
      ],
    },
    {
      title: "DAY 5",
      subtitle: "Delhi Arrival",
      body: [
        "🌞 Arrival in Delhi 8:00 AM and 10:00 AM🎉",
      ],
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 pb-36 pt-6">
      <div className="relative">
        <HeroBlock
          title="Jibhi - Tirthan Valley"
          subtitle="5 Days / 4 Nights - Every Friday Evening from Delhi & Chandigarh"
          description={
            "A calm valley escape into Jibhi & Tirthan - waterfalls, forest treks, and evenings around the bonfire. Ideal for groups and travellers seeking nature with cozy hotel stays."
          }
          heroImage={thumb1}
          thumbnails={[thumb2, thumb3, thumb4]}
          stats={[
            { label: "Duration", value: "5D • 4N" },
            { label: "Pickup", value: "Delhi / Chandigarh" },
            {
              label: "Price",
              value: `Quad: ₹6,499`,
            },
          ]}
        />
        <PageVisuals />
      </div>

      <section
        id="overview"
        className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-2xl font-bold">Highlights</h3>
        <div className="accent-line" />

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">💧</div>
              <div>
                <div className="font-semibold">Waterfalls & Trails</div>
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
            images: [
              jibhi1,
              jibhi2,
              jibhi3,
              jibhi4,
              jibhi5,
              jibhi6,
              jibhi7,
              jibhi8,
              jibhi9,
              jibhi10,
              jibhi11,
              jibhi12,
              jibhi13,
              jibhi14,
              jibhi15,
              jibhi16,
            ],
          },
        ]}
      />

      <DetailsPanel
        inclusions={inclusions}
        exclusions={exclusions}
        dates={[
          "9 Jan 2026",
          "16 Jan 2026",
          "23 Jan 2026",
          "30 Jan 2026",
          "6 Feb 2026",
          "13 Feb 2026",
          "20 Feb 2026",
          "27 Feb 2026",
        ]}
      />

      <section
        id="book"
        className="mt-12 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          <div className="text-sm text-slate-600">Prices (Regular)</div>

          <div className="mt-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {prices.before.quad}{" "}
              <span className="text-lg font-medium text-slate-600">
                / person
              </span>
            </div>
          </div>

          <div className="mt-3 text-slate-600 text-sm">
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-semibold text-slate-900">Quad:</span>{" "}
                {prices.before.quad}
              </li>
              <li>
                <span className="font-semibold text-slate-900">Triple:</span>{" "}
                {prices.before.triple}
              </li>
              <li>
                <span className="font-semibold text-slate-900">Double:</span>{" "}
                {prices.before.dbl}
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <LeadFormCard
            initialTrip="Jibhi Tirthan"
            step1Label="Get Callback"
            submitLabel="Submit"
          />
        </div>
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
