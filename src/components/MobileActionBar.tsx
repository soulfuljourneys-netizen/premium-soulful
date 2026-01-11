import React from "react";

interface Props {
  whatsappHref?: string;
  callHref?: string;
  bookHref?: string;
}

export default function MobileActionBar({
  whatsappHref = "https://wa.me/918383021712",
  callHref = "tel:+918383021712",
  bookHref = "#book",
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-300 p-3 flex md:hidden justify-between gap-2 z-50">
      <a
        href={callHref}
        className="flex-1 text-center bg-slate-900 text-white py-3 rounded-2xl font-semibold"
      >
        Call
      </a>
      <a
        href={whatsappHref}
        className="flex-1 text-center bg-green-500 text-white py-3 rounded-2xl font-semibold"
      >
        WhatsApp
      </a>
      {/* Book button removed for mobile as requested */}
    </div>
  );
}
