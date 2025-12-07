import soulfulLogo from "../assets/Thumbnails/Soulful Logo.jpg";

export default function Footer() {
  return (
    <footer
      className="w-full pt-10 pb-4 px-4 md:px-0 text-white relative"
      style={{
        background:
          "linear-gradient(120deg, #0f002e 0%, #1a093f 60%, #000 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-0">
        {/* Logo & Contact */}
        <div className="flex flex-col items-center md:items-start gap-3 mb-6 md:mb-0">
          <img
            src={soulfulLogo}
            alt="Soulful Journeys Logo"
            className="w-16 h-16 rounded-full shadow-lg mb-2"
          />
          <div className="text-lg font-bold tracking-wide">
            soulfuljourneys.com
          </div>
          <div className="text-sm text-white/80">
            Curated soulful travel experiences
          </div>
          <div className="text-sm text-white/80">+91 90904 03075</div>
        </div>
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* About */}
            <div>
              <div className="font-semibold mb-2">About</div>
              <ul className="space-y-1 text-sm text-white/80">
                <li>
                  <a href="/aboutus" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/reviews" className="hover:text-white">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            {/* Trips */}
            <div>
              <div className="font-semibold mb-2">Trips</div>
              <ul className="space-y-1 text-sm text-white/80">
                <li>
                  <a href="/manalisissukasol" className="hover:text-white">
                    Manali Kasol Chills
                  </a>
                </li>
                <li>
                  <a href="/kasolkheerganga" className="hover:text-white">
                    Kasol Kheerganga
                  </a>
                </li>
                <li>
                  <a href="/choptatungnath" className="hover:text-white">
                    Chopta Tungnath
                  </a>
                </li>
                <li>
                  <a href="/jibhitirthan" className="hover:text-white">
                    Jibhi Tirthan
                  </a>
                </li>
                <li>
                  <a href="/udaipurmountabu" className="hover:text-white">
                    Udaipur Mount Abu
                  </a>
                </li>
              </ul>
            </div>
            {/* For Brands and Creators */}
            <div>
              <div className="font-semibold mb-2">For Brands & Creators</div>
              <ul className="space-y-1 text-sm text-white/80">
                <li>
                  <a href="/partner" className="hover:text-white">
                    Partner With Us
                  </a>
                </li>
                <li>
                  <a href="/gethired" className="hover:text-white">
                    Get Hired
                  </a>
                </li>
                <li>
                  <a href="/collaborations" className="hover:text-white">
                    Collaborations
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Socials - same size icons, centered beneath menus */}
          <div className="flex justify-center md:justify-start gap-6 mt-2">
            <a
              href="https://facebook.com/soulfuljourneysindia"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              className="text-white hover:text-blue-500"
            >
              <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
                <path d="M29 0h-26c-1.7 0-3 1.3-3 3v26c0 1.7 1.3 3 3 3h13v-12h-4v-5h4v-4c0-4.1 2.5-6.3 6.1-6.3 1.8 0 3.6.3 3.6.3v4h-2c-2 0-2.6 1-2.6 2.5v3.5h5l-1 5h-4v12h7c1.7 0 3-1.3 3-3v-26c0-1.7-1.3-3-3-3z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/soulfuljourneysindia"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="text-white hover:text-pink-500"
            >
              <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 7c2.2 0 2.5 0 3.4.1.9.1 1.4.2 1.7.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.2.8.3 1.7.1.9.1 1.2.1 3.4s0 2.5-.1 3.4c-.1.9-.2 1.4-.3 1.7-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.8.2-1.7.3-.9.1-1.2.1-3.4.1s-2.5 0-3.4-.1c-.9-.1-1.4-.2-1.7-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.2-.8-.3-1.7-.1-.9-.1-1.2-.1-3.4s0-2.5.1-3.4c.1-.9.2-1.4.3-1.7.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.8-.2 1.7-.3.9-.1 1.2-.1 3.4-.1zm0-2c-2.3 0-2.6 0-3.5.1-1 .1-1.7.2-2.3.4-.6.2-1.1.5-1.6 1-.5.5-.8 1-1 1.6-.2.6-.3 1.3-.4 2.3-.1.9-.1 1.2-.1 3.5s0 2.6.1 3.5c.1 1 .2 1.7.4 2.3.2.6.5 1.1 1 1.6.5.5 1 .8 1.6 1 .6.2 1.3.3 2.3.4.9.1 1.2.1 3.5.1s2.6 0 3.5-.1c1-.1 1.7-.2 2.3-.4.6-.2 1.1-.5 1.6-1 .5-.5.8-1 1-1.6.2-.6.3-1.3.4-2.3.1-.9.1-1.2.1-3.5s0-2.6-.1-3.5c-.1-1-.2-1.7-.4-2.3-.2-.6-.5-1.1-1-1.6-.5-.5-1-.8-1.6-1-.6-.2-1.3-.3-2.3-.4-.9-.1-1.2-.1-3.5-.1zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm6.5-7.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/soulfuljourneys"
              target="_blank"
              rel="noopener"
              aria-label="Twitter"
              className="text-white hover:text-blue-400"
            >
              <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
                <path d="M32 6.1a13.1 13.1 0 0 1-3.8 1 6.6 6.6 0 0 0 2.9-3.6c-1.2.7-2.5 1.2-3.9 1.5a6.5 6.5 0 0 0-11.1 5.9c-5.4-.3-10.2-2.9-13.4-6.8a6.5 6.5 0 0 0 2 8.7c-1.1 0-2.1-.3-3-.8v.1a6.5 6.5 0 0 0 5.2 6.4c-.5.1-1.1.2-1.6.2-.4 0-.8 0-1.2-.1a6.5 6.5 0 0 0 6.1 4.5A13.1 13.1 0 0 1 0 28.1a18.5 18.5 0 0 0 10 2.9c12 0 18.6-10 18.6-18.6 0-.3 0-.5 0-.8A13.2 13.2 0 0 0 32 6.1z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/soulfuljourneys"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="text-white hover:text-blue-700"
            >
              <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
                <path d="M29 0h-26c-1.7 0-3 1.3-3 3v26c0 1.7 1.3 3 3 3h26c1.7 0 3-1.3 3-3v-26c0-1.7-1.3-3-3-3zm-19 27h-5v-14h5v14zm-2.5-16c-1.6 0-2.5-1.1-2.5-2.5s.9-2.5 2.5-2.5 2.5 1.1 2.5 2.5-.9 2.5-2.5 2.5zm19.5 16h-5v-7c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.7.7-2 1.4-.1.2-.1.5-.1.8v7.6h-5s.1-12.3 0-14h5v2c.7-1.1 2-2.7 4.8-2.7 3.5 0 6.1 2.3 6.1 7.2v7.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-xs text-white/60">
        <div className="mb-1">
          © {new Date().getFullYear()} Soulful Journeys. All rights reserved.
        </div>
        <div className="max-w-3xl mx-auto">
          The content and images used on this site are copyright protected and
          copyrights vest with the respective owners. Unauthorized use is
          prohibited and punishable by law.
        </div>
      </div>
    </footer>
  );
}
