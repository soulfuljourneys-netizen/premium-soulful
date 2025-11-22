import React from "react";
import { motion } from "framer-motion";

type TripCardProps = {
  title: string;
  subtitle?: string;
  href: string;
  image: string;
  thumbnails?: string[];
  cta?: string;
};

export default function TripCard({
  title,
  subtitle,
  href,
  image,
  thumbnails,
  cta = "View Details",
}: TripCardProps) {
  return (
    <a href={href} className="no-underline">
      <motion.div className="trip-card" whileHover={{ scale: 1.02 }}>
        {/* Show a single square thumbnail when provided; fallback to main image */}
        {thumbnails && thumbnails.length > 0 ? (
          <div className="trip-img-box aspect-square w-full rounded-lg overflow-hidden bg-slate-100">
            <img
              src={thumbnails[0]}
              alt={`${title} thumbnail`}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="trip-img-box">
            <img src={image} className="trip-img" alt={title} />
          </div>
        )}
        <div className="trip-info">
          <h3 className="trip-name">{title}</h3>
          {subtitle && <p className="trip-sub">{subtitle}</p>}
          <button className="primary-btn">{cta}</button>
        </div>
      </motion.div>
    </a>
  );
}
