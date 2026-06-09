import React, { useState } from "react";

interface StayCarouselProps {
  title: string;
  items: string[];
}

const isVideoFile = (src: string) => /\.(mp4|mov|webm)$/i.test(src);

export default function StayCarousel({ title, items }: StayCarouselProps) {
  const [popup, setPopup] = useState<number | null>(null);

  return (
    <section className="my-10">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="flex gap-4 overflow-x-auto rounded-2xl shadow-lg pb-4">
          {items.map((item, idx) => {
            const isVideo = isVideoFile(item);
            return (
              <div key={idx} className="flex-shrink-0 w-80">
                <div
                  className="relative w-full h-64 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setPopup(idx)}
                >
                  {isVideo ? (
                    <video
                      src={item}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="auto"
                      crossOrigin="anonymous"
                      onPlay={(e) => {
                        const video = e.currentTarget;
                        setTimeout(() => {
                          video.pause();
                        }, 100);
                      }}
                    />
                  ) : (
                    <img
                      loading="lazy"
                      src={item}
                      alt={title + " stay " + idx}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {isVideo && (
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-8 w-8"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popup for enlarged image/video with navigation */}
      {popup !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-4 max-w-lg w-full flex flex-col items-center relative">
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
              onClick={(e) => {
                e.stopPropagation();
                setPopup((popup - 1 + items.length) % items.length);
              }}
              aria-label="Previous"
            >
              &#8592;
            </button>
            {isVideoFile(items[popup]) ? (
              <video
                key={items[popup]}
                controls
                src={items[popup]}
                className="w-full h-96 object-contain mb-4"
                playsInline
              />
            ) : (
              <img
                loading="lazy"
                src={items[popup]}
                alt={title + " enlarged " + popup}
                className="w-full h-96 object-contain mb-4"
              />
            )}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
              onClick={(e) => {
                e.stopPropagation();
                setPopup((popup + 1) % items.length);
              }}
              aria-label="Next"
            >
              &#8594;
            </button>
            <button
              className="mt-4 px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold"
              onClick={() => setPopup(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
