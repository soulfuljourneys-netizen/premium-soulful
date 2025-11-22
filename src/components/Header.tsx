import { useEffect, useState } from "react";
import soulfulLogo from "../assets/Thumbnails/Soulful Logo.jpg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClass = scrolled
    ? "fixed inset-x-0 top-0 z-50 bg-white/90 shadow-sm"
    : "fixed inset-x-0 top-0 z-50 bg-transparent";

  const logoClass = scrolled
    ? "w-12 h-12 rounded-2xl flex items-center justify-center font-bold bg-white text-[#0f002e] shadow-sm"
    : "w-12 h-12 rounded-2xl flex items-center justify-center font-bold bg-[#0f002e] text-white shadow";

  return (
    <header className={headerClass}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <a href="#" className={logoClass} aria-label="Soulful Journeys">
          <img
            src={soulfulLogo}
            alt="Soulful Journeys logo"
            className="w-full h-full object-contain rounded-2xl"
          />
        </a>

        <div className="flex flex-col">
          <h1 className="text-lg md:text-2xl font-semibold leading-none">
            Soulful Journeys
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Curated soulful travel experiences
          </p>
        </div>

        <nav
          className="hidden md:flex gap-6 ml-8 items-center"
          aria-label="Primary navigation"
        >
          <div className="relative group">
            <button className="text-sm font-semibold hover:underline focus:outline-none">
              Trips
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity z-10">
              <a
                className="block px-4 py-2 text-sm hover:bg-slate-100"
                href="/manali-kasol-chills"
              >
                Manali Kasol
              </a>
              <a
                className="block px-4 py-2 text-sm hover:bg-slate-100"
                href="/kasol-kheerganga"
              >
                Kasol Kheerganga
              </a>
              <a
                className="block px-4 py-2 text-sm hover:bg-slate-100"
                href="/chopta-tungnath"
              >
                Chopta Tungnath
              </a>
              <a
                className="block px-4 py-2 text-sm hover:bg-slate-100"
                href="/jibhi-tirthan"
              >
                Jibhi Tirthan
              </a>
              <a
                className="block px-4 py-2 text-sm hover:bg-slate-100"
                href="/udaipur-mount-abu"
              >
                Udaipur Mount Abu
              </a>
            </div>
          </div>
          <a className="text-sm hover:underline" href="/about">
            About Us
          </a>
          <a className="text-sm hover:underline" href="/contact">
            Contact Us
          </a>
          <a className="text-sm hover:underline" href="#careers">
            Careers
          </a>
        </nav>

        <div className="ml-auto hidden md:flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-500">Starting from</div>
            <div className="text-lg font-semibold">₹8,499</div>
          </div>
          <a
            href="#book"
            className="inline-flex items-center px-4 py-2 rounded-2xl bg-[#ff4c1b] text-white font-semibold"
          >
            Book
          </a>
        </div>
      </div>
    </header>
  );
}
