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

export default function ChoptaTungnath() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    index: number;
    sources: string[];
  } | null>(null);

  const itinerary = [
    {
      title: "Day 0 - Depart",
      subtitle: "Evening departure from Delhi",
      body: [
        "Evening departure from Delhi towards Uttarakhand.",
        "Overnight travel en route to Chopta.",
      ],
    },
    {
      title: "Day 1 - Chopta Arrival",
      subtitle: "Short treks & local exploration",
      body: [
        "Arrive Chopta and check in to the campsite.",
        "Short local treks and sunset viewpoints.",
        "Evening campfire and dinner.",
      ],
    },
    {
      title: "Day 2 - Tungnath Trek",
      subtitle: "Trek to Tungnath & Chandrashila",
      body: [
        "Early morning trek to Tungnath temple.",
        "Optional ascent to Chandrashila summit for panoramic views.",
      ],
    },
    {
      title: "Day 3 - Return",
      subtitle: "Drive back to city",
      body: [
        "Breakfast and checkout from campsite.",
        "Drive back to Delhi; arrival timing depends on schedule.",
      ],
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
