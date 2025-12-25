import React from "react";
import { motion } from "framer-motion";

type TripCardProps = {
  title: string;
  subtitle?: string;
  href: string;
  image: string;
  thumbnails?: string[];
  cta?: string;
  heading?: string;
  duration?: string;
  pickup?: string;
};

export default function TripCard({
  title,
  subtitle,
  href,
  image,
  thumbnails,
  cta = "View Details",
  heading,
  duration,
  pickup,
}: TripCardProps) {
  // If explicit duration/pickup props aren't provided, try to parse from `subtitle` (format: "5D • 4N | Pickup: Delhi")
  const parsedDuration =
    duration ?? (subtitle ? subtitle.split("|")[0].trim() : undefined);
  const parsedPickup =
    pickup ??
    (subtitle && subtitle.includes("|")
      ? subtitle.split("|")[1].trim()
      : undefined);

  return (
    <a href={href} className="no-underline">
      <motion.div
        className="trip-card shadow-md hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.04 }}
      >
        {/* Show a single square thumbnail when provided; fallback to main image */}
        {thumbnails && thumbnails.length > 0 ? (
          <div className="trip-img-box aspect-square w-full rounded-lg overflow-hidden bg-slate-100">
            <img
              src={thumbnails[0]}
              alt={`${title} thumbnail`}
              className="w-full h-full object-contain saturate-110 contrast-105"
            />
          </div>
        ) : (
          <div className="trip-img-box">
            <img
              src={image}
              className="trip-img saturate-110 contrast-105"
              alt={title}
            />
          </div>
        )}
        <div className="trip-info flex flex-col items-center text-center px-3">
          {heading && (
            <div className="text-xs font-semibold text-neutral-500 uppercase mb-1">
              {heading}
            </div>
          )}

          {/* Normalize dashes: replace em-dash or double-hyphen with a single hyphen with spaces */}
          {(() => {
            const t = title || "";
            let displayTitle = t.replace(/-{2,}|—|–/g, "-");
            displayTitle = displayTitle.replace(/\s*-\s*/g, " - ");
            return <h3 className="trip-name">{displayTitle}</h3>;
          })()}

          <div className="trip-meta mt-2 text-sm text-neutral-600">
            {parsedDuration && <div className="">{parsedDuration}</div>}
            {parsedPickup && <div className="mt-1">{parsedPickup}</div>}
          </div>

          <button className="primary-btn mt-4">{cta}</button>
        </div>
      </motion.div>
    </a>
  );
}
