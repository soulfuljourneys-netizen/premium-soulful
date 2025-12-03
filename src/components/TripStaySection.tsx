import React from "react";
import StayCarousel from "./StayCarousel";

interface CarouselConfig {
  title: string;
  images: string[];
}

interface TripStaySectionProps {
  carousels: CarouselConfig[];
}

export default function TripStaySection({ carousels }: TripStaySectionProps) {
  return (
    <div className="my-10">
      {carousels.map((carousel, idx) => (
        <StayCarousel
          key={idx}
          title={carousel.title}
          images={carousel.images}
        />
      ))}
    </div>
  );
}
