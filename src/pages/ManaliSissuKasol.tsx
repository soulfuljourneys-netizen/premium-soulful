import React, { useState } from "react";
import HeroBlock from "../components/HeroBlock";
import hero1 from "../assets/Hero Sections/Manali Kasol/hadimba temple.jpg";
import hero2 from "../assets/Hero Sections/Manali Kasol/Manali Honeymoon Package_.jpg";
import hero3 from "../assets/Hero Sections/Manali Kasol/manali atal tunnel road.jpg";
import hero4 from "../assets/Hero Sections/Manali Kasol/Sissu (Manali).jpg";
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
import VideoScroller from "../components/VideoScroller";
import VideoModal from "../components/VideoModal";
import MobileActionBar from "../components/MobileActionBar";
import PageVisuals from "../components/PageVisuals";
import TripStaySection from "../components/TripStaySection";
import LeadFormCard from "../components/LeadFormCard";
// Kasol stays intentionally left out here to avoid reusing the same images
// Kasol images are used on the Kasol page (`KasolKheerganga.tsx`) only.
import manali1 from "../assets/Manali Stays/Manali 1.jpeg";
import manali2 from "../assets/Manali Stays/Manali 2.jpeg";
import manali3 from "../assets/Manali Stays/Manali 3.jpeg";
import manali4 from "../assets/Manali Stays/Manali 4.jpeg";
import manali5 from "../assets/Manali Stays/Manali 5.jpeg";
import manali6 from "../assets/Manali Stays/Manali 6.jpeg";
import manali7 from "../assets/Manali Stays/Manali 7.jpeg";
import manali8 from "../assets/Manali Stays/Manali 8.jpeg";
import manali9 from "../assets/Manali Stays/Manali 9.jpeg";
import manali10 from "../assets/Manali Stays/Manali 10.jpeg";
import manali11 from "../assets/Manali Stays/Manali 11.jpeg";

export default function ManaliSissuKasol() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    index: number;
    sources: string[];
  } | null>(null);

  const itinerary = [
    {
      title: "DAY 1 — Departure",
      subtitle: "Evening departure from Delhi",
      body: "Start your evening departure towards Manali; overnight on the way.",
    },
    {
      title: "DAY 2 — Manali Arrival & Local",
      subtitle: "Check-in, Jogini Falls, Hadimba Temple, Mall Road",
      body: "Arrive Manali around 11 AM–12 PM, check-in and rest. Explore Jogini Waterfall, Hadimba Temple, Mall Road and Van Vihar. Evening back to hotel for dinner and overnight stay.",
    },
    {
      title: "DAY 3 — Solang Valley & Sissu/Atal Tunnel (if open)",
      subtitle: "Snow activities / Solang valley visit",
      body: "After breakfast head to Solang Valley for snow activities (rentals and activity charges extra). If accessible, visit Atal Tunnel and Sissu for snow views. Return to Manali for dinner and stay.",
    },
    {
      title: "DAY 4 — Kullu to Kasol",
      subtitle: "Rafting / adventure options then Kasol Riverside Camps",
      body: "Checkout from Manali and head towards Kullu for optional rafting or paragliding (extra). Continue to Kasol and check in to riverside camps. Evening DJ night, bonfire and dinner at the camps.",
    },
    {
      title: "DAY 5 — Kasol & Local Treks",
      subtitle: "Manikaran, Chhalal trek & market",
      body: "Breakfast in camps. Visit Manikaran Gurudwara, explore Kasol market and do a short Chhalal riverside walk/trek. Depart Kasol late afternoon towards Delhi.",
    },
    {
      title: "DAY 6 — Return",
      subtitle: "Arrival in Delhi",
      body: "Arrive back in Delhi between 06:00–08:00 AM depending on traffic and stops en route.",
    },
  ];

  const inclusions = [
    "2 Nights stay in 3★ hotel in Manali",
    "1 Night stay in riverside camping (Kasol)",
    "3 breakfasts + 3 dinners",
    "All transportation as per itinerary",
    "DJ Nights + Bonfire",
    "Trip Captain",
  ];

  const exclusions = [
    "Activity charges (skiing, zipline, river crossing, rafting, paragliding)",
    "GST / applicable taxes",
    "Personal expenses",
  ];

  const prices = {
    before: { quad: "₹6,499", triple: "₹6,999", dbl: "₹7,499" },
    after: { add: "₹1,000" },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submitForm = () => {
    console.log("Booking request", form);
    alert("Request received. We'll contact you shortly.");
    setForm({ name: "", phone: "", email: "" });
  };

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 pb-36 pt-6">
      <div className="relative">
        <HeroBlock
          title="Manali — Sissu — Kasol"
          subtitle="6 Days / 5 Nights — Every Friday Evening from Delhi & Chandigarh"
          description={
            "A combined itinerary covering Manali’s highlights, the snow-accessible Sissu/Atal Tunnel region (seasonal), and riverside camping at Kasol — ideal for adventure and relaxed evenings around the bonfire."
          }
          heroImage={hero1}
          thumbnails={[hero2, hero3, hero4]}
          ctaPrimary={{ text: "Reserve Your Seat", href: "#book" }}
          ctaSecondary={{
            text: "More Info",
            href: "https://soulfuljourneystours.com/manali-kasol-chills",
          }}
          stats={[
            { label: "Duration", value: "6D • 5N" },
            { label: "Pickup", value: "Delhi / Chandigarh" },
            { label: "Price", value: `Quad: ${prices.before.quad}` },
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
          Multi-day itinerary combining Manali’s scenic valleys, snow activities
          at Solang/Atal Tunnel region and an immersive riverside camping
          experience in Kasol — perfect balance of adventure and relaxed
          evenings.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">❄️</div>
              <div>
                <div className="font-semibold">Snow Play</div>
                <div className="text-sm text-slate-600">
                  Solang Valley activities & Sissu/Atal Tunnel views (seasonal)
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🏕️</div>
              <div>
                <div className="font-semibold">Riverside Camping</div>
                <div className="text-sm text-slate-600">
                  Kasol camps with DJ, bonfire & community dinners
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🍵</div>
              <div>
                <div className="font-semibold">Local Culture</div>
                <div className="text-sm text-slate-600">
                  Manikaran, Mall Road & local cafés
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
            images: [manali1, manali2, manali3, manali4, manali5, manali6, manali7, manali8, manali9, manali10, manali11],
          },
        ]}
      />

      <DetailsPanel inclusions={inclusions} exclusions={exclusions} />

      <section
        id="book"
        className="mt-12 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          <div className="text-sm text-slate-600">Prices (Before 15th Dec)</div>
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
          <p className="mt-3 text-sm text-slate-600">
            After Dec 15 add{" "}
            <span className="font-semibold text-slate-900">
              {prices.after.add}
            </span>{" "}
            to above prices.
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <LeadFormCard
            initialTrip="Manali Sissu Kasol"
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
