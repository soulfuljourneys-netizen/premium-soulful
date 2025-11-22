import React from "react";

export default function PhotoMosaic() {
  const images = [
    "travel,landscape",
    "travel,adventure",
    "travel,mountains",
    "travel,beach",
    "travel,forest",
    "travel,city",
  ];

  return (
    <div className="photo-mosaic" aria-hidden>
      {images.map((q, i) => (
        <div key={i} className={`mosaic-item mosaic-${i + 1}`}>
          <img
            src={`https://source.unsplash.com/random/1000x800?${q},${i}`}
            alt=""
            loading="lazy"
            className="mosaic-img"
          />
        </div>
      ))}
    </div>
  );
}
