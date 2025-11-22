import React, { useState } from "react";

interface Day {
  title: string;
  subtitle?: string;
  body: string;
}
interface Props {
  itinerary: Day[];
}

export default function ItineraryAccordion({ itinerary }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const toggle = (i: number) => setExpanded((prev) => (prev === i ? null : i));

  return (
    <section id="itinerary" className="mt-10">
      <h3 className="text-2xl font-bold">Itinerary</h3>
      <div className="mt-4 space-y-4">
        {itinerary.map((day, i) => (
          <article
            key={day.title}
            onClick={() => toggle(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggle(i);
            }}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm cursor-pointer"
          >
            <div className="w-full text-left p-2 flex items-center justify-between">
              <div>
                <div className="font-semibold">{day.title}</div>
                {day.subtitle && (
                  <div className="text-sm text-slate-600">{day.subtitle}</div>
                )}
              </div>
              <div className="text-slate-600" aria-hidden>
                {expanded === i ? "−" : "+"}
              </div>
            </div>
            <div
              className={`px-6 pb-6 transition-all duration-300 ${
                expanded === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-slate-600">{day.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
