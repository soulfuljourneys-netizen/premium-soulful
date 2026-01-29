import React, { useState } from "react";

interface QuickLeadPopupProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; phone: string; persons: number }) => void;
}

export default function QuickLeadPopup({
  open,
  onClose,
  onSubmit,
}: QuickLeadPopupProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [persons, setPersons] = useState(1);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !persons) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    onSubmit({ name, phone, persons });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-md bg-white rounded-t-2xl p-6 shadow-lg animate-slide-up relative">
        <button
          className="absolute top-2 right-4 text-xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Enquiry</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Your phone number"
            className="w-full border rounded px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Persons:</span>
            <button
              type="button"
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => setPersons((p) => Math.max(1, p - 1))}
              aria-label="Decrease persons"
            >
              -
            </button>
            <span className="w-8 text-center">{persons}</span>
            <button
              type="button"
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => setPersons((p) => p + 1)}
              aria-label="Increase persons"
            >
              +
            </button>
          </div>
          {/* Removed 'how soon do you want to book' field */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ffb347] to-[#ff4c1b] text-white py-2 rounded font-semibold mt-2"
          >
            Submit & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
