import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import soulfulLogo from "../assets/Thumbnails/Soulful Logo.jpg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  // Start overHero as true so header is transparent on initial load
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tripsDropdownOpen, setTripsDropdownOpen] = useState(false);
  const location = useLocation();

  // Trip page paths and prices
  const tripPrices: Record<string, string> = {
    "/manali-kasol-chills": "6499",
    "/kasol-kheerganga": "5499",
    "/chopta-tungnath": "5999",
    "/jibhi-tirthan": "6499",
    "/udaipur-mount-abu": "6999",
  };
  const tripPath = Object.keys(tripPrices).find((p) =>
    location.pathname.startsWith(p)
  );
  const isTripPage = !!tripPath;
  const tripPrice = tripPath ? tripPrices[tripPath] : undefined;

  useEffect(() => {
    const computeStates = () => {
      setScrolled(window.scrollY > 60);
      if (location.pathname === "/") {
        const hero = document.getElementById("home-hero");
        if (hero) {
          const heroBottom = hero.offsetTop + hero.offsetHeight;
          // Header considered overlapping hero until its top passes beyond hero bottom
          setOverHero(window.scrollY < heroBottom - 60);
        } else {
          setOverHero(false);
        }
      } else {
        setOverHero(false);
      }
    };

    // Always start as overHero (transparent) on load
    setOverHero(true);
    computeStates();
    window.addEventListener("scroll", computeStates);
    window.addEventListener("resize", computeStates);
    return () => {
      window.removeEventListener("scroll", computeStates);
      window.removeEventListener("resize", computeStates);
    };
  }, [location.pathname]);

  const headerClass = overHero
    ? "fixed inset-x-0 top-0 z-50 bg-transparent"
    : "fixed inset-x-0 top-0 z-50 bg-white/90 shadow-sm";

  const logoClass = overHero
    ? "w-12 h-12 rounded-2xl flex items-center justify-center font-bold bg-[#0f002e] text-white shadow"
    : "w-12 h-12 rounded-2xl flex items-center justify-center font-bold bg-white text-[#0f002e] shadow-sm";

  return (
    <header className={headerClass}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className={logoClass} aria-label="Soulful Journeys">
          <img
            src={soulfulLogo}
            alt="Soulful Journeys logo"
            className="w-full h-full object-contain rounded-2xl"
          />
        </Link>
        <div className="flex flex-col">
          <h1
            className={`text-lg md:text-2xl font-semibold leading-none ${
              overHero ? "text-white" : "text-slate-900"
            }`}
          >
            Soulful Journeys
          </h1>
          <p
            className={`text-xs md:text-sm ${
              overHero ? "text-white/70" : "text-slate-500"
            }`}
          >
            Curated soulful travel experiences
          </p>
        </div>
        {/* Desktop Menu */}
        <nav
          className="hidden md:flex gap-6 ml-auto items-center"
          aria-label="Primary navigation"
        >
          <Link
            className={`text-sm hover:underline ${
              overHero ? "text-white" : "text-slate-900"
            }`}
            to="/"
          >
            Home
          </Link>
          <div className="relative">
            <button
              className={`text-sm hover:underline focus:outline-none flex items-center gap-1 font-normal ${
                overHero ? "text-white" : "text-slate-900"
              }`}
              onClick={() => setTripsDropdownOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={tripsDropdownOpen}
            >
              Trips
              <svg
                className={`w-4 h-4 transition-transform ${
                  tripsDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {tripsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-10">
                <Link
                  className="block px-4 py-2 text-sm hover:bg-slate-100"
                  to="/manali-kasol-chills"
                  onClick={() => setTripsDropdownOpen(false)}
                >
                  Manali Kasol
                </Link>
                <Link
                  className="block px-4 py-2 text-sm hover:bg-slate-100"
                  to="/kasol-kheerganga"
                  onClick={() => setTripsDropdownOpen(false)}
                >
                  Kasol Kheerganga
                </Link>
                <Link
                  className="block px-4 py-2 text-sm hover:bg-slate-100"
                  to="/chopta-tungnath"
                  onClick={() => setTripsDropdownOpen(false)}
                >
                  Chopta Tungnath
                </Link>
                <Link
                  className="block px-4 py-2 text-sm hover:bg-slate-100"
                  to="/jibhi-tirthan"
                  onClick={() => setTripsDropdownOpen(false)}
                >
                  Jibhi Tirthan
                </Link>
                <Link
                  className="block px-4 py-2 text-sm hover:bg-slate-100"
                  to="/udaipur-mount-abu"
                  onClick={() => setTripsDropdownOpen(false)}
                >
                  Udaipur Mount Abu
                </Link>
              </div>
            )}
          </div>
          <Link
            className={`text-sm hover:underline ${
              overHero ? "text-white" : "text-slate-900"
            }`}
            to="/contact"
          >
            Contact Us
          </Link>
          <Link
            className={`text-sm hover:underline ${
              overHero ? "text-white" : "text-slate-900"
            }`}
            to="/about"
          >
            About Us
          </Link>
          <Link
            className={`text-sm hover:underline ${
              overHero ? "text-white" : "text-slate-900"
            }`}
            to="#careers"
          >
            Careers
          </Link>
        </nav>
        {/* Trip price/book only on trip pages (desktop) */}
        {isTripPage && (
          <div className="ml-6 hidden md:flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-500">Starting from</div>
              <div className="text-lg font-semibold">₹{tripPrice}</div>
            </div>
            <a
              href="#book"
              className="inline-flex items-center px-4 py-2 rounded-2xl bg-[#ff4c1b] text-white font-semibold"
            >
              Book
            </a>
          </div>
        )}
        {/* Mobile menu button */}
        <button
          className="ml-auto md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff4c1b]"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={overHero ? "text-white" : "text-[#0f002e]"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 shadow-lg border-b border-slate-200 px-4 py-4">
          <div className="flex flex-col gap-4">
            <Link
              className="text-base font-medium"
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <div className="font-semibold text-slate-700 mb-1">Trips</div>
            <Link
              className="block px-2 py-1"
              to="/manali-kasol-chills"
              onClick={() => setMenuOpen(false)}
            >
              Manali Kasol
            </Link>
            <Link
              className="block px-2 py-1"
              to="/kasol-kheerganga"
              onClick={() => setMenuOpen(false)}
            >
              Kasol Kheerganga
            </Link>
            <Link
              className="block px-2 py-1"
              to="/chopta-tungnath"
              onClick={() => setMenuOpen(false)}
            >
              Chopta Tungnath
            </Link>
            <Link
              className="block px-2 py-1"
              to="/jibhi-tirthan"
              onClick={() => setMenuOpen(false)}
            >
              Jibhi Tirthan
            </Link>
            <Link
              className="block px-2 py-1"
              to="/udaipur-mount-abu"
              onClick={() => setMenuOpen(false)}
            >
              Udaipur Mount Abu
            </Link>
            <Link
              className="text-base font-medium mt-2"
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              className="text-base font-medium"
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              className="text-base font-medium"
              to="#careers"
              onClick={() => setMenuOpen(false)}
            >
              Careers
            </Link>
            {isTripPage && (
              <div className="mt-4 flex flex-col gap-2">
                <div className="text-xs text-slate-500">Starting from</div>
                <div className="text-lg font-semibold">₹{tripPrice}</div>
                <a
                  href="#book"
                  className="inline-flex items-center px-4 py-2 rounded-2xl bg-[#ff4c1b] text-white font-semibold mt-2"
                >
                  Book
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
