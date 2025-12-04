import React from "react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#2f343c]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-xl bg-white shadow-lg py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0">
          <div className="flex-1 mb-8 md:mb-0">
            <h3 className="text-xl font-bold tracking-wide text-[#2f343c] flex items-center gap-2">
              <span className="inline-block w-8 h-8 rounded-full bg-[#2f343c] flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" fill="#fff" />
                  <text
                    x="12"
                    y="16"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#2f343c"
                    fontFamily="sans-serif"
                  >
                    SJ
                  </text>
                </svg>
              </span>
              soulfuljourneys.com
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Curated soulful travel experiences
            </p>
            <p className="text-sm text-slate-600 mt-1">+91 90904 03075</p>
          </div>
          <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            <div>
              <h4 className="font-semibold text-[#2f343c] mb-3">
                ABOUT SOULFUL
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/about" className="hover:underline text-slate-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/reviews" className="hover:underline text-slate-600">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline text-slate-600">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:underline text-slate-600">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:underline text-slate-600">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2f343c] mb-3">FOR BRANDS</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/partner" className="hover:underline text-slate-600">
                    Partner With Us
                  </a>
                </li>
                <li>
                  <a
                    href="/marketing"
                    className="hover:underline text-slate-600"
                  >
                    Destination Marketing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2f343c] mb-3">
                FOR TRAVELLERS
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/gift" className="hover:underline text-slate-600">
                    Gift an Experience
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2f343c] mb-3">SOCIALS</h4>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://facebook.com/soulfuljourneysindia"
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                  className="text-[#2f343c] hover:text-blue-600"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/soulfuljourneysindia"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="text-[#2f343c] hover:text-pink-500"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.354 3.678 1.335c-.981.981-1.204 2.093-1.263 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.282 2.393 1.263 3.374.981.981 2.093 1.204 3.374 1.263C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.282 3.374-1.263.981-.981 1.204-2.093 1.263-3.374.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.282-2.393-1.263-3.374-.981-.981-2.093-1.204-3.374-1.263C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/soulfuljourneys"
                  target="_blank"
                  rel="noopener"
                  aria-label="Twitter"
                  className="text-[#2f343c] hover:text-blue-400"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184A4.916 4.916 0 0 0 16.616 3c-2.717 0-4.92 2.206-4.92 4.917 0 .386.044.762.127 1.124C7.691 8.77 4.066 6.797 1.64 3.94c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/soulfuljourneys"
                  target="_blank"
                  rel="noopener"
                  aria-label="LinkedIn"
                  className="text-[#2f343c] hover:text-blue-700"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.002 3.6 4.604v5.592z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-10 pt-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-2">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <span className="inline-block w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#2f343c" />
                  <text
                    x="12"
                    y="16"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#fff"
                    fontFamily="sans-serif"
                  >
                    SJ
                  </text>
                </svg>
              </span>
              <span className="text-white font-bold tracking-wide">
                soulfuljourneys.com
              </span>
            </div>
            <div className="text-xs text-slate-400">
              © {new Date().getFullYear()} Soulful Journeys. All rights
              reserved.
            </div>
          </div>
          <div className="text-xs text-slate-400 mt-2 max-w-3xl mx-auto">
            The content and images used on this site are copyright protected and
            copyrights vest with the respective owners. The usage of the content
            and images on this website is intended to promote the works and no
            endorsement of the artist shall be implied. Unauthorized use is
            prohibited and punishable by law.
          </div>
        </div>
      </div>
    </footer>
  );
}
