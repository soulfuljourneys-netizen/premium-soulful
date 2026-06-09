import React, { useEffect, useState, Suspense, lazy } from "react";
import HeroBlock from "../components/HeroBlock";
import ItineraryAccordion from "../components/ItineraryAccordion";
import DetailsPanel from "../components/DetailsPanel";
const VideoScroller = lazy(() => import("../components/VideoScroller"));
const VideoModal = lazy(() => import("../components/VideoModal"));
import MobileActionBar from "../components/MobileActionBar";
import PageVisuals from "../components/PageVisuals";
const TripStaySection = lazy(() => import("../components/TripStaySection"));
import LeadFormCard from "../components/LeadFormCard";
import goaHero from "../assets/goa thumbnails/GOA.jpg";
import goaThumb1 from "../assets/goa thumbnails/Baga beach🌴.jpg";
import goaThumb2 from "../assets/goa thumbnails/Beach day.jpg";
import goaThumb3 from "../assets/goa thumbnails/Cola Beach Kayaking.jpg";
import goaThumb4 from "../assets/goa thumbnails/GOA.jpg";

const API_BASE = "/api";
const HUBSPOT_TIME_PROPERTY = "timespent";

function formatDuration(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const parts = [];
  if (hrs) parts.push(`${hrs}h`);
  if (mins || hrs) parts.push(`${mins}m`);
  parts.push(`${secs}s`);
  return parts.join(" ");
}

export default function Goa() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    index: number;
    sources: string[];
  } | null>(null);
  const [hubspotId, setHubspotId] = useState<string | null>(null);
  const [hubspotContact, setHubspotContact] = useState<any>(null);
  const [baseTimeSeconds, setBaseTimeSeconds] = useState<number | null>(null);
  const [sessionStart, setSessionStart] = useState<number>(Date.now());
  const [syncError, setSyncError] = useState<string | null>(null);
  const [timerTick, setTimerTick] = useState(0);
  const [earlyBirdSeats, setEarlyBirdSeats] = useState<{ filled: number; total: number }>({
    filled: 1,
    total: 10,
  });

  const totalTimeSeconds =
    baseTimeSeconds === null
      ? null
      : baseTimeSeconds + Math.floor((Date.now() - sessionStart) / 1000);

  const formattedTimeSpent =
    totalTimeSeconds === null ? "Loading..." : formatDuration(totalTimeSeconds);

  const goaVideos = [
    new URL('../assets/Goa Previous Batch/2024-08-09 042907.webm', import.meta.url).href,
    new URL('../assets/Goa Previous Batch/2024-08-09 052150.webm', import.meta.url).href,
    new URL('../assets/Goa Previous Batch/2024-08-09 122823.webm', import.meta.url).href,
    new URL('../assets/Goa Previous Batch/2024-08-10 181159.webm', import.meta.url).href,
    new URL('../assets/Goa Previous Batch/2024-08-10 184837.webm', import.meta.url).href,
    new URL('../assets/Goa Previous Batch/2024-08-13 115429.webm', import.meta.url).href,
    new URL('../assets/Goa Previous Batch/2024-08-13 132706.webm', import.meta.url).href,
    new URL('../assets/Goa Previous Batch/2024-08-13 152257.webm', import.meta.url).href,
    new URL('../assets/Goa Previous Batch/2024-08-13 154640.webm', import.meta.url).href,
    new URL('../assets/Goa Previous Batch/2024-08-13 155430.webm', import.meta.url).href,
  ];

  const goaStayVideos = [
    new URL('../assets/Goa Stays/2024-08-10 145432.webm', import.meta.url).href,
    new URL('../assets/Goa Stays/2024-08-10 145543.webm', import.meta.url).href,
    new URL('../assets/Goa Stays/2024-08-10 182011.webm', import.meta.url).href,
    new URL('../assets/Goa Stays/2024-08-11 093428.webm', import.meta.url).href,
  ];

  const itinerary = [
    {
      title: "DAY 1 - 18th Sep (Fri)",
      subtitle: "Departure – The Buildup",
      body: [
        "🚆 Board overnight train from Delhi (fastest available like Vasco Da Gama Express / Rajdhani options).",
        "🎵 Group bonding, games, music, and introductions throughout the journey.",
      ],
    },
    {
      title: "DAY 2 - 19th Sep (Sat)",
      subtitle: "Arrival + Beach Energy + Soft Party",
      body: [
        "🌊 Reach Goa by ~12 Noon.",
        "🏨 Check-in at hotel near Calangute Beach.",
        "☀️ Afternoon: Relax, freshen up, and head to beach for ice-breaker games (frisbee, volleyball, fun challenges).",
        "🎉 Evening: Pool Party with unlimited booze.",
        "🌙 Night: Dinner and optional exploration of Tito's Lane for first taste of Goa nightlife.",
      ],
    },
    {
      title: "DAY 3 - 20th Sep (Sun)",
      subtitle: "North Goa – Full Power Exploration",
      body: [
        "🥐 Breakfast.",
        "🛵 Rent scooty (₹400–₹500).",
        "🏰 North Goa Circuit: Fort Aguada → Chapora Fort (sunset spot) → Anjuna Beach + flea market vibes → Baga Beach (water sports optional).",
        "🎊 Night Upgrade: Club Night experience at Club Cubana (premium hilltop vibe) or Tito's Club (commercial but fun).",
      ],
    },
    {
      title: "DAY 4 - 21st Sep (Mon)",
      subtitle: "South Goa – Soulful Side",
      body: [
        "🌅 Early morning departure for the magic — Sunrise at a Hidden Beach Experience.",
        "🏖️ Palolem Beach / Colva side exploration.",

        "☕ Day Exploration: Colva Beach → Benaulim Beach → chill cafés + slow vibe.",
        "🧘 Soulful Add-on: Reflection session with quiet group circle.",
        "🍽️ Return by evening for dinner and relaxed night.",
      ],
    },
    {
      title: "DAY 5 - 22nd Sep (Tue)",
      subtitle: "Adventure + Luxury + Chaos",
      body: [
        "🥐 Breakfast.",
        "🚤 Water activities: banana ride, jet ski, parasailing.",
        "🌅 Evening: Sunset Cruise on Mandovi River.",
        "🎰 Night: Choose your path — Casino Experience at Deltin Royale Casino OR Club Night Round 2 (for non-casino crowd).",
        "⚡ Peak dopamine day!",
      ],
    },
    {
      title: "DAY 6 - 23rd Sep (Wed)",
      subtitle: "Wind Down + Exit",
      body: [
        "🥐 Breakfast.",
        "🏨 Checkout from hotel.",
        "🚆 Drop to railway station.",
        "🚂 Board overnight train for Delhi.",
      ],
    },
    {
      title: "DAY 7 - 24th Sep (Thu)",
      subtitle: "Return",
      body: [
        "🌞 Reach Delhi by afternoon.",
        "📸 Trip closure, memories sharing, and content exchange with the group.",
      ],
    },
  ];

  const inclusions = [
    "Train Tickets (Sleeper Class) – To & Fro (Delhi ⇄ Goa)",
    "4 Nights Accommodation in Premium 3★ Hotel near Calangute Beach",
    "Comfortable rooms on double/triple sharing basis",
    "4 Breakfasts (Day 3 to Day 6)",
    "4 Dinners (Day 2 to Day 5)",
    "Pickup from Goa Railway Station to Hotel (Day 2)",
    "Drop from Hotel to Railway Station (Day 6)",
    "Pool Party Access 🎶",
    "Hidden Sunrise Beach Games & Icebreaker Activities",
    "Dedicated Trip Captain throughout the journey",
  ];

  const exclusions = [
    "Water Sports Package (₹1,500 per person)",
    "Casino Entry (e.g., Deltin Royale Casino)",
    "Premium Club Cover Charges",
    "Scooty Rentals & Petrol",
    "Tickets or Parking charges in monuments",
    "Train Meals",
    "Personal expenses",
  ];

  const prices = {
    regular: { triple: "₹9,999", double: "₹11,999" },
    note: "3rd AC: Extra costing based on ticket prices",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) {
      setHubspotId(id);
    }
  }, []);

  useEffect(() => {
    if (!hubspotId) return;
    let active = true;

    const fetchHubspotContact = async () => {
      setSyncError(null);
      try {
        const response = await fetch(
          `${API_BASE}/hubspot-contact?id=${encodeURIComponent(hubspotId)}`,
        );
        if (!response.ok) {
          throw new Error(`HubSpot fetch failed: ${response.status}`);
        }
        const contact = await response.json();
        if (!active) return;
        setHubspotContact(contact);
        const timeValue = Number(
          contact?.properties?.[HUBSPOT_TIME_PROPERTY] || 0,
        );
        setBaseTimeSeconds(Number.isFinite(timeValue) ? timeValue : 0);
        setSessionStart(Date.now());
      } catch (err) {
        if (!active) return;
        setSyncError(
          err instanceof Error ? err.message : "Unable to load HubSpot contact",
        );
      }
    };

    fetchHubspotContact();
    return () => {
      active = false;
    };
  }, [hubspotId]);

  useEffect(() => {
    let active = true;
    const fetchGoaData = async () => {
      try {
        const response = await fetch("/trips/goa.json");
        if (!response.ok) return;
        const data = await response.json();
        if (!active) return;
        if (data?.earlyBirdSeats) {
          setEarlyBirdSeats({
            filled: Number(data.earlyBirdSeats.filled) || 0,
            total: Number(data.earlyBirdSeats.total) || 10,
          });
        }
      } catch {
        // ignore failures for the progress bar
      }
    };
    fetchGoaData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hubspotId || baseTimeSeconds === null) return;
    let active = true;

    const syncHubspotTime = async (flush = false) => {
      const totalSeconds =
        baseTimeSeconds + Math.floor((Date.now() - sessionStart) / 1000);
      try {
        await fetch(`${API_BASE}/hubspot-time-spent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: hubspotId,
            time_spent_seconds: totalSeconds,
          }),
        });
        if (flush && active) {
          setBaseTimeSeconds(totalSeconds);
          setSessionStart(Date.now());
        }
      } catch (err) {
        if (!active) return;
        setSyncError(
          err instanceof Error ? err.message : "Unable to sync HubSpot time",
        );
      }
    };

    const tickInterval = window.setInterval(() => {
      setTimerTick((value) => value + 1);
    }, 1000);
    const syncInterval = window.setInterval(() => {
      syncHubspotTime();
    }, 15000);

    return () => {
      active = false;
      window.clearInterval(tickInterval);
      window.clearInterval(syncInterval);
      syncHubspotTime(true).catch(() => {});
    };
  }, [hubspotId, baseTimeSeconds, sessionStart]);

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
          title="Goa Getaway"
          subtitle="7 Days / 6 Nights - Beach Paradise"
          description={
            "The ultimate Goa adventure: pristine beaches, vibrant nightlife, water sports, hidden sunrise spots, and unforgettable group bonding in paradise."
          }
          heroImage={goaHero}
          thumbnails={[goaThumb1, goaThumb2, goaThumb3, goaThumb4]}
          stats={[
            { label: "Duration", value: "7D • 6N" },
            { label: "Pickup", value: "Delhi & Gujarat" },
            { label: "Price", value: "Starting ₹9,999" },
          ]}
        />
        <PageVisuals />
      </div>

      {hubspotId && (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-700">
          <div className="font-semibold text-slate-900">HubSpot lead tracking</div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">
                HubSpot ID
              </div>
              <div>{hubspotId}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Time spent
              </div>
              <div>{formattedTimeSpent}</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-slate-600">
            {hubspotContact?.properties?.firstname || hubspotContact?.properties?.email
              ? `Contact: ${hubspotContact?.properties?.firstname || ""} ${hubspotContact?.properties?.lastname || ""}`.trim()
              : "HubSpot contact loaded."}
          </div>
          {syncError && (
            <div className="mt-3 rounded-lg bg-rose-100 p-3 text-sm text-rose-800">
              {syncError}
            </div>
          )}
        </section>
      )}

      <section
        id="overview"
        className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-2xl font-bold">Highlights</h3>
        <div className="accent-line" />

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🏖</div>
              <div>
                <div className="font-semibold">Beach Paradise</div>
                <div className="text-sm text-slate-600">
                  North & South Goa beaches
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🎉</div>
              <div>
                <div className="font-semibold">Vibrant Nightlife</div>
                <div className="text-sm text-slate-600">
                  Pool parties & premium clubs
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🌅</div>
              <div>
                <div className="font-semibold">Sunrise Experience</div>
                <div className="text-sm text-slate-600">
                  Hidden beach reflections
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🚤</div>
              <div>
                <div className="font-semibold">Water Sports</div>
                <div className="text-sm text-slate-600">
                  Jet ski, parasailing, banana rides
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🎰</div>
              <div>
                <div className="font-semibold">Casino & Luxury</div>
                <div className="text-sm text-slate-600">
                  Sunset cruises & premium experiences
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border highlight-card">
            <div className="flex items-start gap-3">
              <div className="icon-wrap">🧘</div>
              <div>
                <div className="font-semibold">Soulful Moments</div>
                <div className="text-sm text-slate-600">
                  Reflection & group bonding
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ItineraryAccordion itinerary={itinerary} />

      <Suspense fallback={<div>Loading stays...</div>}>
        <TripStaySection
          carousels={[
            {
              title: "Stays We Provide",
              videos: goaStayVideos,
            },
          ]}
        />
      </Suspense>

      <DetailsPanel
        inclusions={inclusions}
        exclusions={exclusions}
        dateTitle="Train Info & Pickups"
        rawDates={true}
        dates={[
          "🚆 22656 Nzm Ers Sf Exp",
          "📅 Date: 18th September • 5:00 AM",
          "🕐 Duration: 29 h 10 min",
          "🚪 Departs From: Delhi (H Nizamuddin)",
          "🎯 Arrives At: 10:10 AM • Madgaon (MAO)",
          "Delhi | Pickup: H. Nizammuddin",
          "Rajasthan | Pickups: Bharatpur, Kota",
          "Madhya Pradesh | Pickup: Ratlam",
          "Gujarat | Pickups: Surat, Vadodara",
          "Maharashtra | Pickups: Vasai Road, Panvel, Ratnagiri",
        ]}
      />

      <section
        id="book"
        className="mt-12 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="w-full md:w-1/2">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm mb-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Early Bird offer
                </div>
                <div className="text-xs text-slate-500">
                  Hurry, only {Math.max(0, earlyBirdSeats.total - earlyBirdSeats.filled)} seats remain
                </div>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {`${earlyBirdSeats.filled}/${earlyBirdSeats.total}`} booked
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ffb347] to-[#ff4c1b] transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    earlyBirdSeats.total > 0
                      ? (earlyBirdSeats.filled / earlyBirdSeats.total) * 100
                      : 0,
                  )}%`,
                }}
              />
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Save ₹1,000 on the first 10 bookings
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-600">Prices (Regular)</div>

            <div className="mt-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {prices.regular.triple}{" "}
                <span className="text-lg font-medium text-slate-600">
                  / person
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 text-slate-600 text-sm">
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-semibold text-slate-900">Triple:</span>{" "}
                {prices.regular.triple}
              </li>
              <li>
                <span className="font-semibold text-slate-900">Double:</span>{" "}
                {prices.regular.double}
              </li>
              <li className="text-xs italic mt-2">{prices.note}</li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <LeadFormCard
            initialTrip="Goa Getaway"
            step1Label="Get Callback"
            submitLabel="Submit"
          />
        </div>
      </section>

      <section className="mt-10">
        <h4 className="text-2xl font-bold">Traveller Video Stories</h4>
        <Suspense fallback={<div>Loading videos...</div>}>
          <VideoScroller videoUrls={goaVideos} onOpen={(payload) => setOpenVideo(payload)} />
        </Suspense>
      </section>

      <MobileActionBar whatsappHref="https://wa.me/918377872694?text=Hey%20Soulful%20Journeys%2C%20Send%20me%20Goa%20Details" />

      <Suspense fallback={<div>Loading modal...</div>}>
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
      </Suspense>
    </main>
  );
}
