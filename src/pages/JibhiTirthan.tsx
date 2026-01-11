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
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
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
    "Accommodation as per itinerary",
    "Meals as specified",
    "Transport as per plan",
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
      title: "Day 1 - Arrival & Local Walk",
      subtitle: "Drive to Jibhi; evening walk",
      body: [
        "Meet at pickup point and drive to Jibhi.",
        "Check in and relax at the hotel.",
        "Evening: short village walk and bonfire (time permitting).",
      ],
    },
    {
      title: "Day 2 - Waterfalls & Trails",
      subtitle: "Trek to Chhoie and nearby trails",
      body: [
        "Breakfast then short treks to nearby waterfalls (Chhoie).",
        "Picnic lunch and explore forest trails.",
        "Easy-paced evening back at the homestay.",
      ],
    },
    {
      title: "Day 3 - Tirthan Riverside",
      subtitle: "Riverside cafes & light exploration",
      body: [
        "Leisurely exploration of Tirthan riverbanks and cafes.",
        "Optional short hikes and local sightseeing.",
        "Evening at homestay or guesthouse with relaxed dinner.",
      ],
    },
    {
      title: "Day 4 - Departure",
      subtitle: "Return to pickup city",
      body: [
        "Breakfast and check out.",
        "Drive back to Delhi/Chandigarh with stops en route.",
        "Trip concludes on arrival at pickup city.",
      ],
    },
  ];

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
          title="Jibhi - Tirthan Valley"
          subtitle="5 Days / 4 Nights - Every Friday Evening from Delhi & Chandigarh"
          description={
            "A calm valley escape into Jibhi & Tirthan - waterfalls, forest treks, and evenings around the bonfire. Ideal for groups and travellers seeking nature with cozy hotel stays."
          }
          heroImage={thumb1}
          thumbnails={[thumb1, thumb2, thumb3, thumb4]}
          stats={[
            { label: "Duration", value: "5D • 4N" },
            { label: "Pickup", value: "Delhi / Chandigarh" },
            {
              label: "Price",
              value: `Quad: ${prices.before.quad} • Triple: ${prices.before.triple} • Double: ${prices.before.dbl}`,
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
            title: "Day 2 - Waterfalls & Trails",
            <div className="icon-wrap">💧</div>
            <div>
              title: "Day 3 - Tirthan Riverside",
              <div className="text-sm text-slate-600">
                Chhoie & Jibhi cascades title: "Day 4 - Departure",
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
