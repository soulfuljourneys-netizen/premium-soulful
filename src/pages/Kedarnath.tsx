import React, { useState } from "react";
import HeroBlock from "../components/HeroBlock";
import thumb1 from "../assets/Hero Sections/Chopta Tungnath/Chandrashila Peak.jpg"; // Placeholder, replace with Kedarnath images
import thumb2 from "../assets/Hero Sections/Chopta Tungnath/Chopta tungnath Camp.jpg"; // Placeholder
import thumb3 from "../assets/Hero Sections/Chopta Tungnath/Tungnath Tempe View.jpg"; // Placeholder
import thumb4 from "../assets/Hero Sections/Chopta Tungnath/Tungnath Temple.jpg"; // Placeholder
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
import VideoScroller from "../components/VideoScroller";
import VideoModal from "../components/VideoModal";
import MobileActionBar from "../components/MobileActionBar";
import PageVisuals from "../components/PageVisuals";
import TripStaySection from "../components/TripStaySection";
import chop1 from "../assets/Chopta Stays/Chopta1.jpeg"; // Placeholder stays
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

export default function Kedarnath() {
  const { meta: metaKedar } = useTripMeta("kedarnath");
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
      body: [
        "🚌 Depart from Delhi to Sonprayag by AC Tempo Traveller at 10:00 PM.",
        "🌙 Overnight drive towards Guptkashi/Phata.",
      ],
    },
    {
      title: "DAY 2",
      subtitle: "Haridwar-Guptkashi",
      body: [
        "🌊 Explore Devprayag en route to Guptkashi.",
        "🚗 Travel to Guptkashi.",
        "🌆 Evening arrival in Guptkashi.",
        "🍽️🛏️ Enjoy dinner and overnight stay.",
      ],
    },
    {
      title: "DAY 3",
      subtitle: "Gaurikund - Kedarnath",
      body: [
        "🍽️ Breakfast in hotel",
        "🚁 Choose between trekking or helicopter to Kedarnath.",
        "🥾 Trek from Gaurikund to Kedarnath (16 km).",
        "🛕 Visit Kedarnath Temple.",
        "🏨 Check-in to Hotel/Ashram for overnight stay.",
      ],
    },
    {
      title: "DAY 4",
      subtitle: "Kedarnath - Guptkashi",
      body: [
        "🌄 Morning exploration in Kedarnath.",
        "🚁 Return to Guptkashi by trekking or helicopter.",
        "🛺 Arrange local jeep from Gaurikund to Guptkashi.",
        "🍽️ Pick up packed breakfast for early start.",
        "🐎 Option for trekking in Gaurikund (at own cost).",
        "🏨 Check in at hotel in Guptkashi.",
      ],
    },
    {
      title: "DAY 5",
      subtitle: "Departure and Ganga Aarti",
      body: [
        "🏨 Check-out after breakfast.",
        "🚗 Journey from Phata/Guptkashi to Delhi.",
        "🕉️ Experience Ganga Arti in Rishikesh or Haridwar.",
      ],
    },
    {
      title: "DAY 6",
      subtitle: "Delhi Bound",
      body: [
        "🏙️ Arrive in Delhi the following morning.",
      ],
    },
  ];

  const inclusions = [
    "🚍 Travel arrangements from Delhi and Rishikesh",
    "🍽️ Delicious 3 Breakfast and 3 Dinner",
    "🏨 2 Nights Stays in a 3-star hotel in Phata/Guptakashi",
    "⛺ 1 Night Dormitory Stay in Kedarnath",
    "👩‍🏫 Experienced Tour Host",
    "📃 Registrations and Medicals",
    "🤹‍♂️ Group Interaction and Fun Activities",
  ];

  const exclusions = [
    "Personal expenses",
    "Adventure charges (helicopter, etc.)",
    "GST/taxes",
    "Any additional meals not mentioned",
    "Travel insurance",
  ];

  const prices = {
    quad: "₹8,999",
    triple: "₹9,499",
    dbl: "₹9,999",
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
          title="Kedarnath Temple"
          subtitle="6 Days / 5 Nights - Spiritual Journey"
          description={
            "Embark on a sacred pilgrimage to Kedarnath Temple, one of the twelve Jyotirlingas, amidst the majestic Himalayas."
          }
          heroImage={thumb1}
          thumbnails={[thumb1, thumb2, thumb3, thumb4]}
          stats={[
            { label: "Duration", value: "6D • 5N" },
            { label: "Pickup", value: "Delhi" },
            { label: "Price", value: "Starting ₹8,999" },
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
              <div className="icon-wrap">🛕</div>
              <div>
                <div className="font-semibold">Kedarnath Temple</div>
                <div className="text-sm text-slate-600">
                  Visit the sacred Jyotirlinga
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🚁</div>
              <div>
                <div className="font-semibold">Trek or Helicopter</div>
                <div className="text-sm text-slate-600">
                  Choose your way to Kedarnath
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🕉️</div>
              <div>
                <div className="font-semibold">Ganga Aarti</div>
                <div className="text-sm text-slate-600">
                  Experience divine rituals
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
            images: [chop1, chop2, chop3, chop4, chop5, chop6, chop7, chop8], // Placeholder images
          },
        ]}
      />

      <DetailsPanel
        inclusions={inclusions}
        exclusions={exclusions}
        pickup={"Delhi & Rishikesh"}
        dates={metaKedar?.dates ?? [
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
          {metaKedar && metaKedar.usePricePhases ? (
            <PhasePricing endpoint={metaKedar.pricePhasesEndpoint || "/price-phases.json"} />
          ) : (
            <>
              <div className="text-sm text-slate-600">Prices</div>

              <div className="mt-2">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  {metaKedar?.prices?.quad ? `₹${Number(metaKedar.prices.quad).toLocaleString()}` : prices.quad}
                  <span className="text-lg font-medium text-slate-600"> / person</span>
                </div>
              </div>

              <div className="mt-3 text-slate-600 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  {metaKedar?.prices?.quad && (
                    <li>
                      <span className="font-semibold text-slate-900">Quad:</span> ₹{Number(metaKedar.prices.quad).toLocaleString()}
                    </li>
                  )}
                  {metaKedar?.prices?.triple && (
                    <li>
                      <span className="font-semibold text-slate-900">Triple:</span> ₹{Number(metaKedar.prices.triple).toLocaleString()}
                    </li>
                  )}
                  {metaKedar?.prices?.double && (
                    <li>
                      <span className="font-semibold text-slate-900">Double:</span> ₹{Number(metaKedar.prices.double).toLocaleString()}
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="w-full md:w-1/2">
          <LeadFormCard
            initialTrip="Kedarnath Temple"
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