import React from "react";
import img1 from "../assets/Hero Sections/Home/banana ride.jpg";
import img2 from "../assets/Hero Sections/Home/beachhidden.jpg";
import img3 from "../assets/Hero Sections/Home/camps.jpg";
import img4 from "../assets/Hero Sections/Home/scooty.jpg";
import img5 from "../assets/Hero Sections/Home/templerun.jpg";

const images = [img1, img2, img3, img4, img5];

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = React.useState(0);
  const [display, setDisplay] = React.useState("");
  const [typing, setTyping] = React.useState(true);

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const word = words[index];

    if (typing) {
      timeout = setTimeout(() => {
        setDisplay((prev) => word.slice(0, prev.length + 1));
        if (display.length + 1 === word.length) setTyping(false);
      }, 80);
    } else {
      timeout = setTimeout(() => {
        setDisplay("");
        setTyping(true);
        setIndex((i) => (i + 1) % words.length);
      }, 1200);
    }

    return () => clearTimeout(timeout);
  }, [display, typing, index, words]);

  return (
    <span className="text-4xl md:text-6xl font-extrabold text-white">
      {display}
      <span className="border-r-4 border-white ml-1 animate-pulse" />
    </span>
  );
}

function Card({ src, className }: { src: string; className?: string }) {
  // Fixed aspect ratio container to avoid layout jitter with mixed image dimensions
  return (
    <div
      className={`rounded-3xl overflow-hidden shadow-xl ${className || ""}`}
      style={{ aspectRatio: "4 / 5" }}
    >
      <div className="w-full h-full relative">
        <img
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          alt="hero"
        />
      </div>
    </div>
  );
}

export default function HomeHero() {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIdx((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Use 3 cards; center is larger and fixed size; left/right slightly smaller.
  const left = images[(idx + 0) % images.length];
  const center = images[(idx + 1) % images.length];
  const right = images[(idx + 2) % images.length];

  return (
    <section
      id="home-hero"
      className="w-full min-h-[88vh] md:min-h-[92vh] text-white flex flex-col items-center justify-center px-6 md:px-8 pt-0 md:pt-0 pb-8 md:pb-0 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(120deg, #0f002e 0%, #3a1c71 50%, #1a093f 80%, #000 100%)",
      }}
    >
      {/* Radial overlay for extra depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 60% 40%, rgba(58,28,113,0.25) 0%, rgba(0,0,0,0.0) 70%)",
        }}
      />
      {/* inner wrapper: add mobile top padding so header overlays but content has breathing room */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center pt-20 md:pt-0">
        {/* LEFT — Collage */}
        <div className="w-full md:w-1/2 flex items-center justify-center pl-4 md:pl-12 lg:pl-20">
          <div className="flex items-end justify-center gap-2 md:gap-3 translate-x-0 md:translate-x-6 px-2">
            {/* Left card (slightly smaller) */}
            <div className="w-28 md:w-64 transform -rotate-6 transition-transform duration-700 ease-out">
              <Card src={left} />
            </div>
            {/* Center card (larger, fixed) */}
            <div className="w-40 md:w-80 z-10 transition-transform duration-700 ease-out">
              <Card src={center} />
            </div>
            {/* Right card (slightly smaller) */}
            <div className="w-28 md:w-64 transform rotate-6 transition-transform duration-700 ease-out">
              <Card src={right} />
            </div>
          </div>
        </div>

        {/* RIGHT — Typewriter + Counters + CTAs */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-end text-center md:text-right space-y-6 sm:space-y-8 mt-8 md:mt-0 px-2 sm:px-4 md:pr-12 lg:pr-28">
          <Typewriter
            words={["Travel.", "Party.", "Socialise.", "Experience."]}
          />
          <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md">
            India’s Coolest Youth Travel Community
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mt-2">
            <div className="text-white text-center">
              <div className="text-lg sm:text-2xl md:text-4xl font-bold">
                1000+
              </div>
              <div className="text-white/70 text-xs sm:text-sm md:text-base">
                Travellers
              </div>
            </div>
            <div className="text-white text-center">
              <div className="text-lg sm:text-2xl md:text-4xl font-bold">
                100+
              </div>
              <div className="text-white/70 text-xs sm:text-sm md:text-base">
                Trips Hosted
              </div>
            </div>
            <div className="text-white text-center">
              <div className="text-lg sm:text-2xl md:text-4xl font-bold">
                4.9+
              </div>
              <div className="text-white/70 text-xs sm:text-sm md:text-base">
                Avg Rating
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-center sm:justify-start gap-3 sm:gap-4 mb-10 md:mb-0">
            <a
              href="#trips"
              className="px-5 py-3 sm:px-6 sm:py-3 bg-gradient-to-r from-[#ffb347] via-[#ff4c1b] to-[#ffb347] text-white font-semibold rounded-2xl shadow-lg hover:brightness-110 transition text-base sm:text-lg"
            >
              Explore Trips
            </a>
            <a
              href="#contact"
              className="px-5 py-3 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition text-base sm:text-lg"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
