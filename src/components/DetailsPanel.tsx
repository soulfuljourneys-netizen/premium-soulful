import React from "react";

interface Props {
  inclusions: string[];
  exclusions?: string[];
  dates?: string[];
}

export default function DetailsPanel({
  inclusions,
  exclusions = [],
  dates = [],
}: Props) {
  return (
    <section id="details" className="mt-10 grid md:grid-cols-3 gap-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <h4 className="font-bold">Inclusions</h4>
        <ul className="mt-3 space-y-2 text-slate-600">
          {inclusions.map((inc, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-3 h-3 mt-2 rounded-full bg-purple-500 flex-shrink-0" />{" "}
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <h4 className="font-bold">Exclusions</h4>
        <ul className="mt-3 space-y-2 text-slate-600">
          {exclusions.map((exc, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-3 h-3 mt-2 rounded-full bg-slate-300 flex-shrink-0" />{" "}
              <span>{exc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between text-slate-700">
        <h4 className="font-bold mb-2">Upcoming Dates</h4>
        {dates && dates.length > 0 ? (
          <div className="w-full text-center text-sm mb-2">
            {/* Group dates by month */}
            {(() => {
              const monthGroups: { [key: string]: string[] } = {};
              dates.forEach((date) => {
                let month = "Other";
                if (
                  date.toLowerCase().includes("dec") ||
                  date.includes("Everyday Departure")
                )
                  month = "December 2025";
                else if (date.toLowerCase().includes("jan"))
                  month = "January 2026";
                monthGroups[month] = monthGroups[month] || [];
                monthGroups[month].push(date);
              });
              return Object.entries(monthGroups).map(([month, monthDates]) => (
                <div key={month} className="mb-1">
                  <div className="font-semibold text-purple-700 mb-0.5">
                    {month}
                  </div>
                  <div className="flex flex-wrap justify-center gap-1">
                    {monthDates.map((date, idx) => (
                      <span
                        key={date + idx}
                        className="inline-block bg-purple-50 rounded px-2 py-0.5 m-0.5"
                      >
                        {date}
                      </span>
                    ))}
                  </div>
                </div>
              ));
            })()}
            <div className="mt-2 text-xs text-slate-500">
              Pickup: <span className="font-semibold">8pm</span> &nbsp; | &nbsp;
              Drop: <span className="font-semibold">6–8am</span>
            </div>
          </div>
        ) : (
          <div className="w-full text-center text-sm mb-2">
            No dates available
          </div>
        )}
        <button
          className="mt-auto px-4 py-2 rounded-2xl bg-purple-100 text-purple-700 font-semibold text-sm border border-purple-300 hover:bg-purple-200 transition"
          type="button"
          onClick={() =>
            window.open(
              "https://wa.me/9090403075?text=I want a custom trip date",
              "_blank"
            )
          }
        >
          Can't find your desired date?
        </button>
      </div>
    </section>
  );
}
