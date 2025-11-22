import React from "react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-300 bg-white/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h3 className="text-lg font-semibold">Soulful Journeys</h3>
          <p className="text-sm text-slate-600 mt-1">
            Curated soulful travel experiences
          </p>
          <p className="text-sm text-slate-600 mt-1">+91 90904 03075</p>
        </div>

        <div className="flex gap-10 text-sm">
          <div className="space-y-2">
            <h4 className="font-semibold">Explore</h4>
            <a href="/" className="block hover:underline">
              Home
            </a>
            <a href="#upcoming" className="block hover:underline">
              Upcoming Trips
            </a>
            <a href="#weekend" className="block hover:underline">
              Weekend Trips
            </a>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Support</h4>
            <a className="block hover:underline">Terms & Conditions</a>
            <a className="block hover:underline">Cancellation Policy</a>
            <a className="block hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 pb-6">
        © {new Date().getFullYear()} Soulful Journeys. All rights reserved.
      </div>
    </footer>
  );
}
