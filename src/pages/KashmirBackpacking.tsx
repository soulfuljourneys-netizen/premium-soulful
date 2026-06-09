import React, { useState } from "react";
import HeroBlock from "../components/HeroBlock";
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
import VideoScroller from "../components/VideoScroller";
import VideoModal from "../components/VideoModal";
import MobileActionBar from "../components/MobileActionBar";
import PageVisuals from "../components/PageVisuals";
import TripStaySection from "../components/TripStaySection";
import LeadFormCard from "../components/LeadFormCard";
import PhasePricing from "../components/PhasePricing";
import useTripMeta from "../hooks/useTripMeta";
import hero1 from "../assets/Hero Sections/Kashmir/Gondola.jpg";
import hero2 from "../assets/Hero Sections/Kashmir/Jammu and Kashmir.jpg";
import hero3 from "../assets/Hero Sections/Kashmir/Shikara RIde.jpg";
import hero4 from "../assets/Hero Sections/Kashmir/Sonmarg Tunnel.jpg";
import ks1 from "../assets/Kashmir Stays/WhatsApp Image 2026-06-02 at 3.34.40 PM.jpeg";
import ks2 from "../assets/Kashmir Stays/WhatsApp Image 2026-06-02 at 3.34.41 PM (1).jpeg";
import ks3 from "../assets/Kashmir Stays/WhatsApp Image 2026-06-02 at 3.34.41 PM (2).jpeg";
import ks5 from "../assets/Kashmir Stays/WhatsApp Image 2026-06-02 at 3.34.41 PM.jpeg";
import ks6 from "../assets/Kashmir Stays/WhatsApp Image 2026-06-02 at 3.34.42 PM (1).jpeg";
import ks7 from "../assets/Kashmir Stays/WhatsApp Image 2026-06-02 at 3.34.42 PM.jpeg";
import ks8 from "../assets/Kashmir Stays/WhatsApp Image 2026-06-02 at 3.34.43 PM.jpeg";
import hb1 from "../assets/House Boat/WhatsApp Image 2026-06-02 at 3.45.44 PM (1).jpeg";
import hb2 from "../assets/House Boat/WhatsApp Image 2026-06-02 at 3.45.44 PM.jpeg";
import hb3 from "../assets/House Boat/WhatsApp Image 2026-06-02 at 3.45.45 PM (1).jpeg";
import hb4 from "../assets/House Boat/WhatsApp Image 2026-06-02 at 3.45.45 PM (2).jpeg";
import hb5 from "../assets/House Boat/WhatsApp Image 2026-06-02 at 3.45.45 PM.jpeg";
import hb6 from "../assets/House Boat/WhatsApp Image 2026-06-02 at 3.45.46 PM (1).jpeg";
import hb7 from "../assets/House Boat/WhatsApp Image 2026-06-02 at 3.45.46 PM (2).jpeg";
import hb8 from "../assets/House Boat/WhatsApp Image 2026-06-02 at 3.45.46 PM.jpeg";

export default function KashmirBackpacking() {
  const { meta: metaKashmir } = useTripMeta("kashmir-backpacking");
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    index: number;
    sources: string[];
  } | null>(null);

  const itinerary = [
    {
      title: "DAY 1 | Departure from Delhi",
      subtitle: "Evening departure in sleeper Volvo",
      body: [
        "Board the sleeper Volvo from Delhi in the evening.",
        "Meet fellow travellers and settle in for the overnight journey to Srinagar.",
      ],
    },
    {
      title: "DAY 2 | Arrival in Srinagar",
      subtitle: "Houseboat stay & Shikara ride",
      body: [
        "Reach Srinagar by afternoon (approx. 3:00 PM – 4:00 PM).",
        "Check into your traditional Kashmiri houseboat on Dal Lake.",
        "Relax in the houseboat and enjoy a 1-hour Shikara ride through floating markets and nearby houseboats.",
      ],
    },
    {
      title: "DAY 3 | Gulmarg Excursion",
      subtitle: "Alpine meadows, mountain views & optional activities",
      body: [
        "After breakfast, checkout from the houseboat and drive to Gulmarg.",
        "Soak in panoramic mountain views and lush meadows.",
        "Optional Gondola ride to Kongdori and Apharwat Peak.",
        "Visit Maharani Temple and St. Mary’s Church.",
      ],
    },
    {
      title: "DAY 4 | Sonmarg Excursion",
      subtitle: "Meadow of Gold & river landscapes",
      body: [
        "Proceed to Sonmarg after breakfast.",
        "Experience Himalayan landscapes along the Sindh River.",
        "Explore glaciers, valleys and optional pony rides.",
      ],
    },
    {
      title: "DAY 5 | Pahalgam Excursion",
      subtitle: "Lidder Valley, Aru Valley & Betaab Valley",
      body: [
        "Drive through Pampore, Avantipora and Anantnag towards Pahalgam.",
        "Enjoy the scenic Lidder River Valley.",
        "Optional visits to Aru Valley and Betaab Valley via local union cabs.",
      ],
    },
    {
      title: "DAY 6 | Srinagar Sightseeing & Departure",
      subtitle: "Heritage gardens, temples & local markets",
      body: [
        "Enjoy breakfast and checkout from the hotel.",
        "Visit Nishat Bagh, Shalimar Bagh, Chashme Shahi, Shankaracharya Temple, Hazratbal Shrine and old Srinagar market.",
        "Depart for Delhi via sleeper Volvo or airport transfer.",
      ],
    },
    {
      title: "DAY 7 | Arrival in Delhi",
      subtitle: "Trip conclusion",
      body: [
        "Arrive in Delhi and conclude the trip.",
        "Thank you for travelling with Soulful Journeys.",
      ],
    },
  ];

  const inclusions = [
    "Delhi–Srinagar transportation in AC Sleeper Volvo",
    "1 Night houseboat stay on Dal Lake",
    "3 Nights hotel stay in Srinagar",
    "Daily breakfast and dinner",
    "1-hour Shikara ride",
    "Gulmarg, Sonmarg, Pahalgam and Srinagar sightseeing",
    "Private transfers and sightseeing",
    "GST included",
  ];

  const exclusions = [
    
    "Gondola tickets",
    "Pony and ATV rides",
    "Union cabs in Gulmarg, Sonmarg and Pahalgam",
    "Personal expenses",
    "Adventure activities",
    "Anything not mentioned in inclusions",
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 pb-36 pt-6">
      <div className="relative">
        <HeroBlock
          title="Kashmir Backpacking Trip"
          subtitle="6 Days / 5 Nights - Delhi Departure"
          description={
            "A scenic Kashmir backpacking trip featuring Dal Lake houseboat stay, Gulmarg, Sonmarg, Pahalgam and Srinagar city highlights."
          }
          heroImage={hero1}
          thumbnails={[hero2, hero3, hero4]}
          stats={[
            { label: "Duration", value: "6D • 5N" },
            { label: "Pickup", value: "Delhi" },
            { label: "Price", value: "From ₹15,999" },
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
              <div className="icon-wrap">🏡</div>
              <div>
                <div className="font-semibold">Houseboat Stay</div>
                <div className="text-sm text-slate-600">
                  Traditional Dal Lake houseboat experience.
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🛶</div>
              <div>
                <div className="font-semibold">Shikara Ride</div>
                <div className="text-sm text-slate-600">
                  Explore floating markets and lakeside views.
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🏔️</div>
              <div>
                <div className="font-semibold">Alpine Excursions</div>
                <div className="text-sm text-slate-600">
                  Gulmarg, Sonmarg, Pahalgam and Srinagar sightseeing.
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
            title: "Our Stays in Srinagar",
            images: [ks1, ks2, ks3, ks5, ks6, ks7, ks8],
          },
          {
            title: "Houseboat Stay",
            images: [hb1, hb2, hb3, hb4, hb5, hb6, hb7, hb8],
          },
        ]}
      />

      <DetailsPanel
        inclusions={inclusions}
        exclusions={exclusions}
        dates={metaKashmir?.dates ?? ["26th June","17th July","31st July"]}
        kashmir
      />

      <section
        id="book"
        className="mt-12 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          {metaKashmir && metaKashmir.usePricePhases ? (
            <PhasePricing endpoint={metaKashmir.pricePhasesEndpoint || "/price-phases.json"} />
          ) : (
            <div className="text-slate-600">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {metaKashmir?.prices?.triple ? `₹${Number(metaKashmir.prices.triple).toLocaleString()}` : "₹15,999"}
                <span className="text-lg font-medium text-slate-600"> / person</span>
              </div>
              <div className="mt-3 text-slate-600 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  {metaKashmir?.prices?.triple && (
                    <li>
                      <span className="font-semibold text-slate-900">Triple:</span> ₹{Number(metaKashmir.prices.triple).toLocaleString()}
                    </li>
                  )}
                  {metaKashmir?.prices?.double && (
                    <li>
                      <span className="font-semibold text-slate-900">Double:</span> ₹{Number(metaKashmir.prices.double).toLocaleString()}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2">
          <LeadFormCard
            initialTrip="Kashmir Backpacking"
            step1Label="Get Callback"
            submitLabel="Submit"
          />
        </div>
      </section>

      <section className="mt-10">
        <h4 className="text-2xl font-bold">Traveller Video Stories</h4>
        <VideoScroller onOpen={(payload) => setOpenVideo(payload)} />
      </section>

      <MobileActionBar whatsappHref="https://wa.me/918377872694?text=Hey%20Soulful%20Journeys%2C%20I%27m%20interested%20in%20Kashmir%27s%20Strangers%20Trip" />

      <VideoModal
        videoData={openVideo}
        onClose={() => setOpenVideo(null)}
        onNavigate={(newIndex: number) => {
          if (!openVideo) return;
          const sources = openVideo.sources || [];
          const idx = ((newIndex % sources.length) + sources.length) % sources.length;
          setOpenVideo({ src: sources[idx], index: idx, sources });
        }}
      />
    </main>
  );
}
