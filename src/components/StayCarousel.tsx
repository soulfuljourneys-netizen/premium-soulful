import React, { useState } from "react";

interface StayCarouselProps {
  title: string;
  images: string[];
}

export default function StayCarousel({ title, images }: StayCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [popup, setPopup] = useState<number | null>(null);

  // Show 3 images in a row on desktop, 1 on mobile
  const getVisibleImages = () => {
    if (window.innerWidth < 768) {
      return [images[current]];
    }
    // Desktop: 3 images
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(images[(current + i) % images.length]);
    }
    return arr;
  };

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  // Listen for resize to update visible images
  const [, setRerender] = useState(false);
  React.useEffect(() => {
    const handleResize = () => setRerender((r) => !r);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="my-10">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="flex gap-4 overflow-hidden rounded-2xl shadow-lg justify-center">
          {getVisibleImages().map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={title + " stay " + idx}
              className="w-full h-64 object-cover cursor-pointer max-w-xs"
              onClick={() => setPopup((current + idx) % images.length)}
            />
          ))}
        </div>
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
          onClick={prev}
          aria-label="Previous"
        >
          &#8592;
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
          onClick={next}
          aria-label="Next"
        >
          &#8594;
        </button>
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-3 h-3 rounded-full ${
                i === current ? "bg-purple-600" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Popup for enlarged image with navigation */}
      {popup !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-4 max-w-lg w-full flex flex-col items-center relative">
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
              onClick={(e) => {
                e.stopPropagation();
                setPopup((popup - 1 + images.length) % images.length);
              }}
              aria-label="Previous"
            >
              &#8592;
            </button>
            <img
              src={images[popup]}
              alt={title + " enlarged " + popup}
              className="w-full h-96 object-contain mb-4"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow"
              onClick={(e) => {
                e.stopPropagation();
                setPopup((popup + 1) % images.length);
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
