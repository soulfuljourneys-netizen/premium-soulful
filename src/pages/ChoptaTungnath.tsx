import React, { useState } from "react";
import HeroBlock from "../components/HeroBlock";
import thumb1 from "../assets/Hero Sections/Chopta Tungnath/Chandrashila Peak.jpg";
import thumb2 from "../assets/Hero Sections/Chopta Tungnath/Chopta tungnath Camp.jpg";
import thumb3 from "../assets/Hero Sections/Chopta Tungnath/Tungnath Tempe View.jpg";
import thumb4 from "../assets/Hero Sections/Chopta Tungnath/Tungnath Temple.jpg";
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
import VideoScroller from "../components/VideoScroller";
import VideoModal from "../components/VideoModal";
import MobileActionBar from "../components/MobileActionBar";
import PageVisuals from "../components/PageVisuals";
import TripStaySection from "../components/TripStaySection";
import chop1 from "../assets/Chopta Stays/Chopta1.jpeg";
import chop2 from "../assets/Chopta Stays/Chopta2.jpeg";
import chop3 from "../assets/Chopta Stays/Chopta3.jpeg";
import chop4 from "../assets/Chopta Stays/Chopta4.jpeg";
import chop5 from "../assets/Chopta Stays/Chopta5.jpeg";
import chop6 from "../assets/Chopta Stays/Chopta6.jpeg";
import chop7 from "../assets/Chopta Stays/Chopta7.jpeg";
import chop8 from "../assets/Chopta Stays/Chopta8.jpeg";
import LeadFormCard from "../components/LeadFormCard";
import useTripMeta from "../hooks/useTripMeta";
import PhasePricing from "../components/PhasePricing";

export default function ChoptaTungnath() {
  const { meta: metaChopta } = useTripMeta("chopta-tungnath");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    index: number;
    sources: string[];
  } | null>(null);

  const itinerary = [
    {
      title: "DAY 1",
      subtitle: "Delhi to Chopta",
      body: [
        "📍 Pick-up from Preet Vihar Metro Station (Gate No. 3) at 8:30 PM.",
        "🚌 Overnight journey from Delhi to Chopta & connect with your co-travellers.",
      ],
    },
    {
      title: "DAY 2",
      subtitle: "Devprayag & Chopta Arrival",
      body: [
        "🌄 Reach Devprayag in the morning, freshen up, and have breakfast (on your own expense).",
        "🌊 Witness the Sangam of Bhagirathi and Alaknanda.",
        "🛣️ Continue to Chopta with a stop at Dhari Devi Temple.",
        "🏕️ Arrive and check in at a campsite in Chopta",
        "☕ Enjoy evening snacks.",
        "🔥 Bond with your group around a bonfire and light music.",
        "🍽️ Have dinner and rest",
      ],
    },
    {
      title: "DAY 3",
      subtitle: "Tungnath & Chandrashila Trek",
      body: [
        "🌅 Start with breakfast.",
        "🚗 Drive to the base and trek 4.5 km to Tungnath.",
        "🏔️ Continue to Chandrashila for 360° views. (1Km approx)",
        "🏕️ Return by evening for snacks, bonfire, dinner, and rest.",
      ],
    },
    {
      title: "DAY 4",
      subtitle: "Deoria Tal & Departure",
      body: [
        "🌅 Wake up early, have breakfast, and check out from the campsite.",
        "🚗 Drive to Sari Village (about 30 minutes away).",
        "🥾 Trek to Deoria Tal and depart for Delhi after lunch.",
      ],
    },
    {
      title: "DAY 5",
      subtitle: "Delhi Arrival",
      body: ["🌞 Arrival in Delhi expected between 6:00 AM and 8:00 AM"],
    },
  ];

  const inclusions = [
    "Transport as per itinerary",
    "Accommodation (as per plan)",
    "Meals as specified",
    "Local guide & permits",
  ];

  const exclusions = [
    "Personal expenses",
    "Adventure charges",
    "GST/taxes",
    "Room Heater",
    "Travel Time Meals",
    "Lunch",
  ];

  const prices = {
    before: { quad: "₹5,999", triple: "₹6,499", dbl: "₹6,999" },
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

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 pb-36 pt-6">
      <div className="relative">
        <HeroBlock
          title="Chopta - Tungnath"
          subtitle="3 Days / 2 Nights - Weekend getaway"
          description={
            "Alpine meadows of Chopta and the spiritual trail to Tungnath - ideal for short trekking groups and nature lovers."
          }
          heroImage={thumb1}
          thumbnails={[thumb1, thumb2, thumb3, thumb4]}
          stats={[
            { label: "Duration", value: "3D • 2N" },
            { label: "Pickup", value: "Delhi" },
            { label: "Price", value: "Starting ₹5,999" },
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
              <div className="icon-wrap">🏔</div>
              <div>
                <div className="font-semibold">Short Treks</div>
                <div className="text-sm text-slate-600">
                  Short, scenic treks
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🔥</div>
              <div>
                <div className="font-semibold">Camp Evenings</div>
                <div className="text-sm text-slate-600">
                  Bonfires & local dinners
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🌄</div>
              <div>
                <div className="font-semibold">Summit Views</div>
                <div className="text-sm text-slate-600">
                  Panoramic Himalayan vistas
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
            images: [chop1, chop2, chop3, chop4, chop5, chop6, chop7, chop8],
          },
        ]}
      />

      <DetailsPanel
        inclusions={inclusions}
        exclusions={exclusions}
        pickup={"Delhi & Rishikesh"}
        dates={metaChopta?.dates ?? [
          "5th June",
          "12th June",
          "19th June",
          "26th June",
          "3rd July",
          "10th July",
          "17th July",
        ]}
      />

      <section
        id="book"
        className="mt-12 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          {metaChopta && metaChopta.usePricePhases ? (
            <PhasePricing endpoint={metaChopta.pricePhasesEndpoint || "/price-phases.json"} />
          ) : (
            <>
              <div className="mt-2">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  {metaChopta?.prices?.quad ? `₹${Number(metaChopta.prices.quad).toLocaleString()}` : prices.before.quad}
                  <span className="text-lg font-medium text-slate-600"> / person</span>
                </div>
              </div>

              <div className="mt-3 text-slate-600 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  {metaChopta?.prices?.quad && (
                    <li>
                      <span className="font-semibold text-slate-900">Quad:</span> ₹{Number(metaChopta.prices.quad).toLocaleString()}
                    </li>
                  )}
                  {metaChopta?.prices?.triple && (
                    <li>
                      <span className="font-semibold text-slate-900">Triple:</span> ₹{Number(metaChopta.prices.triple).toLocaleString()}
                    </li>
                  )}
                  {metaChopta?.prices?.double && (
                    <li>
                      <span className="font-semibold text-slate-900">Double:</span> ₹{Number(metaChopta.prices.double).toLocaleString()}
                    </li>
                  )}
                  {metaChopta?.prices?.note && <li className="text-xs italic mt-2">{metaChopta.prices.note}</li>}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="w-full md:w-1/2">
          <LeadFormCard
            initialTrip="Chopta Tungnath"
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
