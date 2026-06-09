import React, { useRef, useEffect } from "react";
import assetVideos from "../assets/videoList";

interface Props {
  videoIds?: number[];
  videoUrls?: string[];
  onOpen: (payload: { src: string; index: number; sources: string[] }) => void;
}

export default function VideoScroller({ videoIds, videoUrls, onOpen }: Props) {
  const sources: string[] =
    videoUrls && videoUrls.length > 0
      ? videoUrls
      : videoIds && videoIds.length > 0
        ? videoIds.map((v) => `/videos/review${v}.mp4`)
        : assetVideos;

  // duplicate the list for an infinite-scrolling feeling
  const looped = sources.concat(sources);

  return (
    <div className="mt-4 overflow-hidden w-full">
      <div className="relative w-full">
        <div
          className="flex gap-3 animate-scrollVideos select-none whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {looped.map((src, i) => {
            const idx = i % sources.length;
            return (
              <button
                key={"vid-" + i}
                onClick={() => onOpen({ src, index: idx, sources })}
                className="relative w-44 md:w-64 lg:w-72 h-[14rem] md:h-[20rem] rounded-2xl overflow-hidden flex-shrink-0 p-0 bg-black"
              >
                <video
                  className="object-cover w-full h-full"
                  src={src}
                  loop
                  muted
                  autoPlay
                  playsInline
                  preload="auto"
                  crossOrigin="anonymous"
                  onPlay={(e) => {
                    const video = e.currentTarget;
                    setTimeout(() => {
                      video.pause();
                    }, 100);
                  }}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-white/20 backdrop-blur-sm text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-8 w-8"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
