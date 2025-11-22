import React from "react";
import "../styles/common.css";

const ContactUs: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff] px-4 py-8">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#0f002e] mb-2">Contact Us</h1>
        <img
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
          alt="Contact Us"
          className="w-32 h-32 object-cover rounded-full shadow mb-4 border-4 border-[#ff4c1b]"
        />
        <p className="text-lg text-slate-700 mb-6 text-center">
          We’d love to hear from you! Whether you have questions about our
          trips, want to collaborate, or just want to say hello, reach out to us
          anytime.
        </p>
        <form className="w-full flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff4c1b]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff4c1b]"
          />
          <textarea
            name="message"
            rows={4}
            placeholder="Your Message"
            required
            className="border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff4c1b]"
          />
          <button
            type="submit"
            className="bg-[#ff4c1b] text-white font-semibold rounded-xl px-6 py-2 mt-2 shadow hover:bg-[#e03e12] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
