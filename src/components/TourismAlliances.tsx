import React from "react";

// Real tourism board logos from assets
import GoaTourism from "../assets/Tourism Boards/Goa Tourism.png";
import HimachalTourism from "../assets/Tourism Boards/Himachal Tourism Board.png";
import MinistryOfTourism from "../assets/Tourism Boards/Ministry_of_Tourism_India.png";
import MSME from "../assets/Tourism Boards/MSME.png";
import RajasthanTourism from "../assets/Tourism Boards/Rajasthan Tourism.png";
import UttarakhandTourism from "../assets/Tourism Boards/Uttarakhand Tourism Development.png";

const logos = [
  GoaTourism,
  HimachalTourism,
  MinistryOfTourism,
  MSME,
  RajasthanTourism,
  UttarakhandTourism,
];

export default function TourismAlliances() {
  // Make a longer loop by repeating the logos multiple times
  const longList = logos.concat(logos, logos);

  return (
    <section className="mt-12 py-8 bg-white/3">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h3 className="text-lg md:text-xl font-semibold text-neutral-900 text-center">
          Tourism Board Alliances
        </h3>
        <span className="block h-1 w-14 mx-auto mt-3 rounded-full bg-gradient-to-r from-[#ffb347] to-[#ff4c1b]" />

        <div className="overflow-hidden mt-6 w-full">
          <div className="relative w-full">
            <div className="flex gap-4 md:gap-6 items-center select-none animate-scrollVideos whitespace-nowrap" style={{ width: 'max-content' }}>
              {logos.concat(logos).map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center px-1 md:px-2"
                >
                  <div className="p-2 md:p-1 bg-transparent rounded-md flex items-center justify-center">
                    <img
                      src={src}
                      alt={`Tourism board ${(i % logos.length) + 1}`}
                      className="h-20 md:h-24 object-contain transition ease-linear bg-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
