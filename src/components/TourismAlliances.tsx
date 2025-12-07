import React from "react";

// Temporary stock placeholders for tourism board logos (replace with real PNGs when available)
const logos = [
  "https://via.placeholder.com/200x80.png?text=Tourism+Board+1",
  "https://via.placeholder.com/200x80.png?text=Tourism+Board+2",
  "https://via.placeholder.com/200x80.png?text=Tourism+Board+3",
  "https://via.placeholder.com/200x80.png?text=Tourism+Board+4",
  "https://via.placeholder.com/200x80.png?text=Tourism+Board+5",
  "https://via.placeholder.com/200x80.png?text=Tourism+Board+6",
  "https://via.placeholder.com/200x80.png?text=Tourism+Board+7",
  "https://via.placeholder.com/200x80.png?text=Tourism+Board+8",
  "https://via.placeholder.com/200x80.png?text=Tourism+Board+9",
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

        <div className="overflow-hidden mt-6">
          {/* Inline animation override to increase duration for a slower, longer loop */}
          <div
            className="flex gap-8 items-center select-none"
            style={{ animation: "scrollVideos 60s linear infinite" }}
          >
            {longList.map((src, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-center px-2">
                <div className="p-2 bg-white rounded-md shadow-sm flex items-center justify-center">
                  <img
                    src={src}
                    alt={`Tourism board ${((i % logos.length) + 1)}`}
                    className="h-14 md:h-24 object-contain transition ease-linear"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
