import React from "react";

const items = [
  { title: "Best Youth Travel 2023", src: "https://via.placeholder.com/220x80.png?text=Best+Youth+Travel+2023" },
  { title: "Community Choice 2024", src: "https://via.placeholder.com/220x80.png?text=Community+Choice+2024" },
  { title: "Startup Award 2022", src: "https://via.placeholder.com/220x80.png?text=Startup+Award+2022" },
  { title: "Travel Influencer 2024", src: "https://via.placeholder.com/220x80.png?text=Travel+Influencer+2024" },
  { title: "NDTV Feature", src: "https://via.placeholder.com/220x80.png?text=NDTV" },
  { title: "Times of India", src: "https://via.placeholder.com/220x80.png?text=Times+of+India" },
  { title: "India Today", src: "https://via.placeholder.com/220x80.png?text=India+Today" },
  { title: "Zee News", src: "https://via.placeholder.com/220x80.png?text=Zee+News" },
  { title: "Aaj Tak", src: "https://via.placeholder.com/220x80.png?text=Aaj+Tak" },
  { title: "Hindustan Times", src: "https://via.placeholder.com/220x80.png?text=Hindustan+Times" },
  { title: "Entrepreneur India", src: "https://via.placeholder.com/220x80.png?text=Entrepreneur+India" },
  { title: "Regional Tourism Award", src: "https://via.placeholder.com/220x80.png?text=Regional+Tourism+Award" },
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

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {items.map((it, i) => (
            <div key={i} className="flex flex-col items-center text-center p-3 bg-white/4 rounded-lg border border-white/6">
              <img
                src={it.src}
                alt={it.title}
                className="h-12 md:h-14 object-contain mb-2 grayscale opacity-95"
              />
              <div className="text-xs text-neutral-800/90">{it.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
