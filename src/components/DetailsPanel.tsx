import React from "react";

interface Essentials {
  gears: string[];
  clothes: string[];
  footwear: string[];
  medication: string[];
}
interface Props {
  inclusions: string[];
  exclusions?: string[];
  essentials?: Essentials;
}

export default function DetailsPanel({
  inclusions,
  exclusions = [],
  essentials,
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

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <h4 className="font-bold">Travel Essentials</h4>
        <div className="mt-3 text-slate-600">
          {essentials ? (
            <>
              <div className="font-medium">Gears</div>
              <ul className="list-disc list-inside mt-1">
                {essentials.gears.map((g, i) => (
                  <li key={"gear-" + i}>{g}</li>
                ))}
              </ul>
              <div className="font-medium mt-3">Clothes</div>
              <ul className="list-disc list-inside mt-1">
                {essentials.clothes.map((c, i) => (
                  <li key={"clothes-" + i}>{c}</li>
                ))}
              </ul>
              <div className="font-medium mt-3">Footwear & Meds</div>
              <ul className="list-disc list-inside mt-1">
                {essentials.footwear.map((f, i) => (
                  <li key={"foot-" + i}>{f}</li>
                ))}
                {essentials.medication.map((m, i) => (
                  <li key={"med-" + i}>{m}</li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-sm text-slate-600">
              Bring your essentials and personal medications.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
