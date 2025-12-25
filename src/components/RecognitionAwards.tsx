import React from "react";

import CNBC from "../assets/Recognition and Awards/CNBC TV.png";
import DNA from "../assets/Recognition and Awards/DNA_Newspaper_Logo.svg.png";
import Livemint from "../assets/Recognition and Awards/Livemint Logo Vector.svg .png";
import MidDay from "../assets/Recognition and Awards/Mid Day.png";
import StartupIndia from "../assets/Recognition and Awards/Startup India.png";

const items = [
  {
    title: "CNBC TV",
    src: CNBC,
  },
  {
    title: "DNA Newspaper",
    src: DNA,
  },
  {
    title: "Livemint",
    src: Livemint,
  },
  {
    title: "Mid Day",
    src: MidDay,
  },
  {
    title: "Startup India",
    src: StartupIndia,
  },
];

export default function RecognitionAwards() {
  return (
    <section className="mt-6 py-8 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h3 className="text-lg md:text-xl font-semibold text-neutral-900 text-center">
          Recognition & Awards
        </h3>
        <span className="block h-1 w-14 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#ffb347] to-[#ff4c1b]" />

        <p className="text-center text-neutral-700 mt-2 max-w-2xl mx-auto">
          Featured in national media and recognised across the travel industry.
        </p>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center items-center">
          {items.map((it, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-2 bg-transparent rounded-lg"
            >
              <img
                src={it.src}
                alt={it.title}
                className="h-10 sm:h-12 md:h-14 object-contain mb-1 max-w-[140px]"
              />
              <div className="text-xs text-neutral-800/90 mt-1">{it.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
