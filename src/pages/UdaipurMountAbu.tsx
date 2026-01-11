import React, { useState } from "react";
import HeroBlock from "../components/HeroBlock";
import thumb1 from "../assets/Hero Sections/Udaipur Mount Abu/Jagat Niwas Palace, Udaipur.jpg";
import thumb2 from "../assets/Hero Sections/Udaipur Mount Abu/Sajjangarh palace, udaipur.jpg";
import thumb3 from "../assets/Hero Sections/Udaipur Mount Abu/Udaipur City Palace.jpg";
import thumb4 from "../assets/Hero Sections/Udaipur Mount Abu/Udaipur Ghat.jpg";
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
import VideoScroller from "../components/VideoScroller";
import VideoModal from "../components/VideoModal";
import MobileActionBar from "../components/MobileActionBar";
import PageVisuals from "../components/PageVisuals";
import TripStaySection from "../components/TripStaySection";
import LeadFormCard from "../components/LeadFormCard";
import udaipur1 from "../assets/Udaipur Stays/Udaipur 1.jpeg";
import udaipur2 from "../assets/Udaipur Stays/Udaipur 2.jpeg";
import udaipur3 from "../assets/Udaipur Stays/Udaipur 3.jpeg";
import udaipur4 from "../assets/Udaipur Stays/Udaipur 4.jpeg";
import udaipur5 from "../assets/Udaipur Stays/Udaipur 5.jpeg";
import udaipur6 from "../assets/Udaipur Stays/Udaipur 6.jpeg";
import udaipur7 from "../assets/Udaipur Stays/Udaipur 7.jpeg";
import udaipur8 from "../assets/Udaipur Stays/Udaipur 8.jpeg";

export default function UdaipurMountAbu() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    index: number;
    sources: string[];
  } | null>(null);

  const itinerary = [
    {
      title: "DAY 1 - Departure",
      subtitle: "Evening departure from Delhi / Gurgaon",
      body: [
        "Evening departure from Delhi/Gurgaon (approx 8 PM).",
        "Overnight drive to Udaipur (approx 14 hours) with a Jakarta/Jaipur pickup en route and dinner stop.",
      ],
    },
    {
      title: "DAY 2 - Udaipur Arrival & Local Sightseeing",
      subtitle: "Check-in, City Palace & lakeside",
      body: [
        "Arrive in Udaipur, check in and freshen up around noon.",
        "City Palace, Jagdish Temple and Bagore Ki Haveli (cultural show optional).",
        "Evening: lakeside walk, dinner, DJ night and pool party.",
      ],
    },
    {
      title: "DAY 3 - Hills & Palaces",
      subtitle: "Bahubali Hills, Karni Mata cable car, Monsoon Palace",
      body: [
        "Morning breakfast followed by short trek to Bahubali Hills.",
        "Visit Karni Mata temple (cable car available), Monsoon Palace and Saheliyon ki Bari.",
        "Late afternoon at Fateh Sagar Lake; evening pool party and dinner.",
      ],
    },
    {
      title: "DAY 4 - Mount Abu Excursion",
      subtitle: "Checkout and transfer to Mount Abu",
      body: [
        "Checkout after breakfast and drive to Mount Abu.",
        "Visit Dilwara temples, Nakki Lake, Toad Rock and local viewpoints.",
        "Evening departure from Mount Abu towards Delhi return journey.",
      ],
    },
    {
      title: "DAY 5 - Arrival",
      subtitle: "Return to Delhi",
      body: [
        "Arrive in Delhi early morning (approx 6–10 AM depending on traffic).",
      ],
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

  const prices = {
    before: { quad: "₹6,999", triple: "₹7,499", dbl: "₹7,999" },
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
        <HeroBlock
          title="Udaipur - Mount Abu"
          subtitle="5Days / 4N (including travel days)"
          description={
            "A soulful combo of Udaipur’s palaces and lakes with the green hill station charm of Mount Abu - culture, pools, and evening bonfires. Every Friday evening departure from Delhi / Gurgaon."
          {
            title: "DAY 1 - Departure",
          thumbnails={[thumb1, thumb2, thumb3, thumb4]}
          stats={[
            { label: "Duration", value: "5D • 4N" },
            { label: "Pickup", value: "Delhi / Gurgaon (Jaipur pickup)" },
            { label: "Price", value: `Quad: ${prices.before.quad}` },
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
                <div className="text-sm text-slate-600">City Palace & cultural shows</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🏊</div>
              <div>
                <div className="font-semibold">Pool & Parties</div>
                <div className="text-sm text-slate-600">DJ nights, pool parties and lakeside dining</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🗺️</div>
              <div>
                <div className="font-semibold">Mount Abu Excursion</div>
                <div className="text-sm text-slate-600">Dilwara temples, Nakki Lake and scenic viewpoints</div>
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
              udaipur1,
              udaipur2,
              udaipur3,
              udaipur4,
              udaipur5,
              udaipur6,
              udaipur7,
              udaipur8,
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
            initialTrip="Udaipur MountAbu"
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
