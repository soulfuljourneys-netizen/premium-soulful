import React from "react";
import "../styles/common.css";

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] px-4 py-8">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#0f002e] mb-2">About Us</h1>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="About Us"
          className="w-32 h-32 object-cover rounded-full shadow mb-4 border-4 border-[#ff4c1b]"
        />
        <p className="text-lg text-slate-700 mb-6 text-center">
          <span className="font-semibold">Soulful Journeys</span> is dedicated
          to curating memorable travel experiences across India’s most
          breathtaking destinations.
          <br />
          Our passionate team ensures every trip is unique, safe, and full of
          adventure.
          <br />
          Join us to explore, connect, and create lifelong memories with fellow
          travelers.
        </p>
        <div className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f9?auto=format&fit=crop&w=800&q=80"
            alt="Team Soulful Journeys"
            className="w-full h-40 object-cover rounded-xl shadow border"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
