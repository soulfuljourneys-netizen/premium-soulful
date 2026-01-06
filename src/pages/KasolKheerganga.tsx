import React, { useState } from "react";
import HeroBlock from "../components/HeroBlock";
import thumb1 from "../assets/Hero Sections/Kasol Kheerganga/Kasol Himanchal Pradesh.jpg";
import thumb2 from "../assets/Hero Sections/Kasol Kheerganga/Maggie at Kasol.jpg";
import thumb3 from "../assets/Hero Sections/Kasol Kheerganga/Manikaran sahib.jpg";
import thumb4 from "../assets/Hero Sections/Kasol Kheerganga/Parvati valley treks.jpg";
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
import VideoScroller from "../components/VideoScroller";
import LeadFormCard from "../components/LeadFormCard";
import VideoModal from "../components/VideoModal";
import MobileActionBar from "../components/MobileActionBar";
import PageVisuals from "../components/PageVisuals";
import TripStaySection from "../components/TripStaySection";
import kasol1 from "../assets/Kasol Stays/Kasol Camp 1.jpeg";
import kasol2 from "../assets/Kasol Stays/Kasol Camp 2.jpeg";
import kasol3 from "../assets/Kasol Stays/Kasol Camp 3.jpeg";
import kasol4 from "../assets/Kasol Stays/Kasol Camp 4.jpeg";
import kasol5 from "../assets/Kasol Stays/Kasol Camp 5.jpeg";
import kasol6 from "../assets/Kasol Stays/Kasol Camp 6.jpeg";
import kasol7 from "../assets/Kasol Stays/Kasol Camp 7.jpeg";
import kasol8 from "../assets/Kasol Stays/Kasol Camp 8.jpeg";
import kasol9 from "../assets/Kasol Stays/Kasol Camp 9.jpeg";

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
          heroImage={thumb1}
          thumbnails={[thumb1, thumb2, thumb3, thumb4]}
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

      {/* Stays We Provide Carousel Section */}
      <TripStaySection
        carousels={[
          {
            title: "Stays We Provide",
            images: [kasol1, kasol2, kasol3, kasol4, kasol5, kasol6, kasol7, kasol8, kasol9],
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

          <div className="mt-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              ₹5,499{" "}
              <span className="text-lg font-medium text-slate-600">
                / person
              </span>
            </div>
          </div>

          <div className="mt-3 text-slate-600 text-sm">
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-semibold text-slate-900">Quad:</span>{" "}
                ₹5,499
              </li>
              <li>
                <span className="font-semibold text-slate-900">Triple:</span>{" "}
                ₹5,999
              </li>
              <li>
                <span className="font-semibold text-slate-900">Double:</span>{" "}
                ₹6,499
              </li>
            </ul>
          </div>

          <p className="mt-3 text-sm text-slate-600">
            After Dec 15 add{" "}
            <span className="font-semibold text-slate-900">₹2,000</span> to
            above prices.
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <LeadFormCard
            initialTrip="Kasol Kheerganga"
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
