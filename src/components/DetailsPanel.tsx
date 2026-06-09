import React from "react";

interface Props {
  inclusions: string[];
  exclusions?: string[];
  dates?: string[];
  dateTitle?: string;
  rawDates?: boolean;
  kashmir?: boolean;
  pickup?: string | string[];
}

export default function DetailsPanel({
  inclusions,
  exclusions = [],
  dates = [],
  dateTitle,
  rawDates = false,
  kashmir = false,
  pickup,
}: Props) {
  const pickupLabel = pickup
    ? Array.isArray(pickup)
      ? pickup.join(" & ")
      : pickup
    : kashmir
    ? "Delhi"
    : undefined;
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

      <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col items-start text-slate-700">
        <h4 className="font-bold mb-1">{dateTitle ?? "Dates"}</h4>
        {pickupLabel && (
          <div className="text-sm text-slate-600 mb-3">{`Pickup: ${pickupLabel}`}</div>
        )}
        {dates && dates.length > 0 ? (
          rawDates ? (
            <div className="w-full text-left text-sm space-y-2">
              {dates.map((date, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-50 px-3 py-2 text-slate-700"
                >
                  {date}
                </div>
              ))}
            </div>
          ) : kashmir ? (
            <div className="w-full text-left text-sm">
              {(() => {
                // Helper to parse strings like "26th June" -> Date (assume current year)
                const monthMap: { [k: string]: number } = {
                  jan: 0,
                  feb: 1,
                  mar: 2,
                  apr: 3,
                  may: 4,
                  jun: 5,
                  jul: 6,
                  aug: 7,
                  sep: 8,
                  oct: 9,
                  nov: 10,
                  dec: 11,
                };

                const parseDateStr = (s: string): Date | null => {
                  if (!s) return null;
                  const parts = s.trim().split(/\s+/);
                  if (parts.length < 2) return null;
                  const dayMatch = parts[0].match(/(\d{1,2})/);
                  const monthPart = parts.slice(1).join(" ").toLowerCase();
                  if (!dayMatch) return null;
                  const day = parseInt(dayMatch[1], 10);
                  const monKey = Object.keys(monthMap).find((m) =>
                    monthPart.startsWith(m),
                  );
                  const year = new Date().getFullYear();
                  if (!monKey) return null;
                  return new Date(year, monthMap[monKey], day);
                };

                const addDays = (d: Date, days: number) => {
                  const nd = new Date(d);
                  nd.setDate(nd.getDate() + days);
                  return nd;
                };

                const getOrdinal = (n: number) => {
                  const s = ["th", "st", "nd", "rd"];
                  const v = n % 100;
                  return n + (s[(v - 20) % 10] || s[v] || s[0]);
                };

                const formatDate = (d: Date) => {
                  const day = d.getDate();
                  const month = d.toLocaleString(undefined, { month: "long" });
                  return `${getOrdinal(day)} ${month}`;
                };

                // parse and sort
                const parsed = dates
                  .map((s) => ({ raw: s, date: parseDateStr(s) }))
                  .filter((p) => p.date !== null)
                  .sort((a, b) => (a.date as Date).getTime() - (b.date as Date).getTime());

                return parsed.map((p) => {
                  const start = p.date as Date;
                  const end = addDays(start, 6); // trip length: 6 days window
                  return (
                    <div key={p.raw} className="mb-3">
                      <div className="font-semibold text-purple-700">
                        {formatDate(start)} - {formatDate(end)}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        {`Pickup: ${formatDate(start)} Evening - Drop: ${formatDate(end)} Afternoon`}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          ) : (
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
            </div>
          )
        ) : (
          <div className="w-full text-center text-sm mb-2">No dates available</div>
        )}
      </div>
    </section>
  );
}
