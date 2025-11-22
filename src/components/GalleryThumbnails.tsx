import React from "react";

interface Props {
  images: string[];
}

export default function GalleryThumbnails({ images }: Props) {
  const thumbs = images.slice(0, 3);
  return (
    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)]">
      {thumbs.map((src, i) => (
        <img
          key={i}
          alt={`thumb-${i}`}
          className="w-1/3 h-36 md:h-44 rounded-xl shadow-md object-cover"
          src={src}
        />
      ))}
    </div>
  );
}
