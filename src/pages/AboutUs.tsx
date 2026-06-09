import React from "react";
import { Link } from "react-router-dom";
import "../styles/common.css";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <img
              src="/src/assets/Thumbnails/Soulful Logo.jpg"
              alt="Soulful Journeys"
              className="w-36 h-36 object-cover rounded-full shadow mb-4 border-4 border-[#ff4c1b]"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#0f002e]">Soulful Journeys</h1>
              <p className="text-sm text-slate-500">Curated soulful travel experiences</p>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-extrabold text-[#0f002e] mb-3">About Us</h2>
            <p className="text-slate-700 mb-4">
              We create small-group travel experiences across India that blend
              culture, nature and comfortable stays. Every itinerary is crafted
              with safety, local insight and community-first experiences in mind.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <h4 className="font-semibold">Our Mission</h4>
                <p className="text-sm text-slate-600">Design soulful trips that connect people with places.</p>
              </div>
              <div>
                <h4 className="font-semibold">Our Values</h4>
                <ul className="text-sm text-slate-600 list-disc list-inside">
                  <li>Responsible travel</li>
                  <li>Local engagement</li>
                  <li>Memorable moments</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Why Travel With Us</h4>
                <p className="text-sm text-slate-600">Experienced leaders, vetted stays and a friendly traveler community.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <Link to="/" className="inline-block px-4 py-2 rounded-2xl bg-[#ff4c1b] text-white font-semibold">Explore Trips</Link>
              <Link to="/contact" className="inline-block px-4 py-2 rounded-2xl border border-slate-200 text-slate-700">Contact Us</Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-2">Our Story</h3>
            <p className="text-sm text-slate-600">Started by travelers, for travelers — we believe in meaningful journeys that last beyond the trip. From intimate camps to curated hotel stays, we focus on the details that matter.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-2">Office</h3>
            <p className="text-sm text-slate-600 mb-3">Visit or find us on the map:</p>
            <a href="https://maps.app.goo.gl/NDD2ckViXY65jz158" target="_blank" rel="noopener noreferrer" className="text-sm text-[#0f002e] hover:underline">Office Address (Map)</a>
            <div className="mt-3 text-sm text-slate-600">Phone: <a href="tel:+918383021712" className="text-[#0f002e] hover:underline">+91 83830 21712</a></div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-2">Connect</h3>
            <p className="text-sm text-slate-600 mb-3">Follow and reach out on our social channels:</p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/soulfuljourneystours" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-pink-50 rounded-md hover:bg-pink-100">
                <svg className="w-5 h-5 text-pink-600" viewBox="0 0 32 32" fill="currentColor"><path d="M16 7c2.2 0 2.5 0 3.4.1.9.1 1.4.2 1.7.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.2.8.3 1.7.1.9.1 1.2.1 3.4s0 2.5-.1 3.4c-.1.9-.2 1.4-.3 1.7-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.8.2-1.7.3-.9.1-1.2.1-3.4.1s-2.5 0-3.4-.1c-.9-.1-1.4-.2-1.7-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.2-.8-.3-1.7-.1-.9-.1-1.2-.1-3.4s0-2.5.1-3.4c.1-.9.2-1.4.3-1.7.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.8-.2 1.7-.3.9-.1 1.2-.1 3.4-.1zm0-2c-2.3 0-2.6 0-3.5.1-1 .1-1.7.2-2.3.4-.6.2-1.1.5-1.6 1-.5.5-.8 1-1 1.6-.2.6-.3 1.3-.4 2.3-.1.9-.1 1.2-.1 3.5s0 2.6.1 3.5c.1 1 .2 1.7.4 2.3.2.6.5 1.1 1 1.6.5.5 1 .8 1.6 1 .6.2 1.3.3 2.3.4.9.1 1.2.1 3.5.1s2.6 0 3.5-.1c1-.1 1.7-.2 2.3-.4.6-.2 1.1-.5 1.6-1 .5-.5.8-1 1-1.6.2-.6.3-1.3.4-2.3.1-.9.1-1.2.1-3.5s0-2.6-.1-3.5c-.1-1-.2-1.7-.4-2.3-.2-.6-.5-1.1-1-1.6-.5-.5-1-.8-1.6-1-.6-.2-1.3-.3-2.3-.4-.9-.1-1.2-.1-3.5-.1zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm6.5-7.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>
                <span className="text-sm">Instagram</span>
              </a>

              <a href="https://in.linkedin.com/company/soulful-journeys-tours" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-md hover:bg-blue-100">
                <svg className="w-5 h-5 text-blue-700" viewBox="0 0 32 32" fill="currentColor"><path d="M29 0h-26c-1.7 0-3 1.3-3 3v26c0 1.7 1.3 3 3 3h26c1.7 0 3-1.3 3-3v-26c0-1.7-1.3-3-3-3zm-19 27h-5v-14h5v14zm-2.5-16c-1.6 0-2.5-1.1-2.5-2.5s.9-2.5 2.5-2.5 2.5 1.1 2.5 2.5-.9 2.5-2.5 2.5zm19.5 16h-5v-7c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.7.7-2 1.4-.1.2-.1.5-.1.8v7.6h-5s.1-12.3 0-14h5v2c.7-1.1 2-2.7 4.8-2.7 3.5 0 6.1 2.3 6.1 7.2v7.5z"/></svg>
                <span className="text-sm">LinkedIn</span>
              </a>

              <a href="https://www.youtube.com/@SoulfulJourneysTours" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 rounded-md hover:bg-red-100">
                <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1C16.6 2.2 12 2.2 12 2.2h-.1s-4.6 0-8.6.6c-.5.1-1.4.1-2.2 1C.3 4.5.1 6.2.1 6.2S0 8 0 9.9v4.2C0 16 0.1 17.8.1 17.8s.2 1.7.8 2.4c.8.9 1.9.9 2.4 1 1.8.2 7 .7 8.7.7 0 0 4.6 0 8.6-.6.5-.1 1.4-.1 2.2-1 .6-.7.8-2.4.8-2.4s.1-1.9.1-3.7V9.9c0-1.9-.1-3.7-.1-3.7zM9.8 15.6V8.3l6.1 3.6-6.1 3.7z"/></svg>
                <span className="text-sm">YouTube</span>
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl p-6 shadow">
          <h3 className="font-semibold mb-4">Meet the Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border flex items-start gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-lg font-semibold text-slate-700">V</div>
              <div className="flex-1">
                <div className="font-semibold">Vaibhav Gahlot</div>
                <div className="text-sm text-slate-600">Founder</div>
                <div className="mt-2 text-sm">
                  <a href="https://www.instagram.com/hercules_vaibhav" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">@hercules_vaibhav</a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border flex items-start gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-lg font-semibold text-slate-700">P</div>
              <div className="flex-1">
                <div className="font-semibold">Pranshu</div>
                <div className="text-sm text-slate-600">Marketing Head & Editing</div>
                <div className="mt-2 text-sm">
                  <a href="https://www.instagram.com/p__chilll" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">@p__chilll</a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border flex items-start gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-lg font-semibold text-slate-700">Y</div>
              <div className="flex-1">
                <div className="font-semibold">Yugank Pratap</div>
                <div className="text-sm text-slate-600">Sales</div>
                <div className="mt-2 text-sm">
                  <a href="tel:+919214005537" className="text-slate-700 hover:underline">+91 92140 05537</a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border flex items-start gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-lg font-semibold text-slate-700">S</div>
              <div className="flex-1">
                <div className="font-semibold">Saurabh</div>
                <div className="text-sm text-slate-600">Sales</div>
                <div className="mt-2 text-sm">
                  <a href="tel:+919307060652" className="text-slate-700 hover:underline">+91 93070 60652</a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border flex items-start gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-lg font-semibold text-slate-700">Yv</div>
              <div className="flex-1">
                <div className="font-semibold">Yuvraaj</div>
                <div className="text-sm text-slate-600">Sales</div>
                <div className="mt-2 text-sm">
                  <a href="tel:+919318328692" className="text-slate-700 hover:underline">+91 93183 28692</a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border flex items-start gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-lg font-semibold text-slate-700">M</div>
              <div className="flex-1">
                <div className="font-semibold">Mammun</div>
                <div className="text-sm text-slate-600">Sales</div>
                <div className="mt-2 text-sm">
                  <a href="tel:+918826323097" className="text-slate-700 hover:underline">+91 88263 23097</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
