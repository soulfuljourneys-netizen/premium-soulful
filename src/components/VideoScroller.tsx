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
        <div className="flex gap-3 animate-scrollVideos select-none whitespace-nowrap" style={{ width: 'max-content' }}>
          {looped.map((src, i) => {
            const idx = i % sources.length;
            return (
              <button
                key={"vid-" + i}
                onClick={() => onOpen({ src, index: idx, sources })}
                className="w-44 md:w-64 lg:w-72 h-[14rem] md:h-[20rem] rounded-2xl overflow-hidden flex-shrink-0 p-0 bg-black"
              >
                <video
                  className="object-cover w-full h-full"
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
