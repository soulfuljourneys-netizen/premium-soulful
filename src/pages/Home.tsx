import TripCard from "../components/TripCard";
import manaliThumb from "../assets/Thumbnails/manali kasol.png";
import kasolThumb from "../assets/Thumbnails/Kasol Kheerganga.png";
import jibhiThumb from "../assets/Thumbnails/Jibhi Tirthan Valley.png";
import choptaThumb from "../assets/Thumbnails/Chopta tungnath.png";
import udaipurThumb from "../assets/Thumbnails/Udaiur Mount Abu.png";

import HomeHero from "../components/HomeHero";
import VideoScroller from "../components/VideoScroller";
import VideoModal from "../components/VideoModal";
import TourismAlliances from "../components/TourismAlliances";
import RecognitionAwards from "../components/RecognitionAwards";
import React from "react";

export default function Home() {
  const [videoData, setVideoData] = React.useState<{
    src: string;
    index: number;
    sources: string[];
  } | null>(null);

  const handleOpen = (payload: {
    src: string;
    index: number;
    sources: string[];
  }) => {
    setVideoData(payload);
  };

  const handleClose = () => setVideoData(null);

  const handleNavigate = (newIndex: number) => {
    if (!videoData) return;
    const src = videoData.sources[newIndex];
    setVideoData({ src, index: newIndex, sources: videoData.sources });
  };

  return (
    <>
      {/* Full-width hero attached to header */}
      <div className="w-full">
        <HomeHero />
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
          {/* Trip cards - kept simple and boxed */}
        <section
          id="trips"
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <TripCard
            title="Kasol - Kheerganga"
            duration="5D • 4N"
            pickup="Pickup: Delhi & Chandigarh"
            href="/kasol-kheerganga"
            image={kasolThumb}
            thumbnails={[kasolThumb]}
          />

          <TripCard
            title="Jibhi - Tirthan"
            duration="5D • 4N"
            pickup="Pickup: Delhi & Chandigarh"
            href="/jibhi-tirthan"
            image={jibhiThumb}
            thumbnails={[jibhiThumb]}
          />

          <TripCard
            title="Chopta - Tungnath"
            duration="5D • 4N"
            pickup="Pickup: Delhi & Rishikesh"
            href="/chopta-tungnath"
            image={choptaThumb}
            thumbnails={[choptaThumb]}
          />

          <TripCard
            title="Udaipur - Mount Abu"
            duration="5D • 4N"
            pickup="Pickup: Delhi & Jaipur"
            href="/udaipur-mount-abu"
            image={udaipurThumb}
            thumbnails={[udaipurThumb]}
          />

          <TripCard
            title="Manali - Sissu - Kasol"
            duration="6D • 5N"
            pickup="Pickup: Delhi & Chandigarh"
            href="/manali-kasol-chills"
            image={manaliThumb}
            thumbnails={[manaliThumb]}
          />

          {/* optional extras kept minimal - you can add more TripCard instances here */}
        </section>

        {/* Reviews will appear after Why Choose Us (moved further down) */}
        {/* Why Choose Us section */}
        <section id="why-choose-us" className="mt-12">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl p-6 md:p-8 bg-white/6 border border-neutral-200/6">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
                  Why Choose Us
                </h2>
                <span className="block h-1 w-14 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#ffb347] to-[#ff4c1b]" />
                <p className="text-neutral-700 mt-2 max-w-2xl mx-auto">
                  We make trips energetic, social and unforgettable - tailored
                  for young travellers who want more than the usual sightseeing.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[rgba(255,255,255,0.04)] border border-white/6 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffb347] to-[#ff4c1b] flex items-center justify-center mb-3">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3zM8 13c-2.667 0-8 1.333-8 4v2h16v-2c0-2.667-5.333-4-8-4zm8 0c-.333 0-1.333.167-2 .333 1.333.667 2 1.667 2 3.667V19h6v-2c0-2.667-5.333-4-6-4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Young Tribe
                  </h3>
                  <p className="text-neutral-700 mt-2 text-sm">
                    A community of like-minded young travellers - make friends
                    on every trip.
                  </p>
                </div>

                <div className="bg-[rgba(255,255,255,0.04)] border border-white/6 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffb347] to-[#ff4c1b] flex items-center justify-center mb-3">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path d="M12 2l2.1 4.3L18.5 7l-3.2 2.8.8 4.5L12 12.9 8.9 14.3l.8-4.5L6.5 7l4.4-.7L12 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    We don't do Boring
                  </h3>
                  <p className="text-neutral-700 mt-2 text-sm">
                    High-energy activities, curated nights and experiences that
                    spark stories.
                  </p>
                </div>

                <div className="bg-[rgba(255,255,255,0.04)] border border-white/6 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffb347] to-[#ff4c1b] flex items-center justify-center mb-3">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        d="M12 2v6M6 14l6-4 6 4M6 20h12"
                        stroke="white"
                        strokeWidth="0"
                      />
                      <path d="M12 2v6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Energetic Trip Captains
                  </h3>
                  <p className="text-neutral-700 mt-2 text-sm">
                    Experienced, fun leaders who keep the group safe and the
                    vibes high.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tourism Board Alliances conveyor (moved above reviews) */}
        <TourismAlliances />

        {/* Reviews / Reels section */}
        <section id="reviews" className="mt-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 font-sans">
              What Our Previous Soulful Has To Say?
            </h2>
            <span className="block h-1 w-14 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#ffb347] to-[#ff4c1b]" />
            <p className="text-neutral-700 mt-2">
              Short clips from our travellers - real reactions, real moments.
            </p>

            <div className="mt-6">
              <VideoScroller onOpen={handleOpen} />
            </div>
          </div>
        </section>

        {videoData && (
          <VideoModal
            videoData={videoData}
            onClose={handleClose}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Recognition & Awards section (national media, awards) */}
      <RecognitionAwards />
    </>
  );
}
