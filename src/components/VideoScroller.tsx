import React, { useRef, useEffect } from "react";
import assetVideos from "../assets/videoList";

interface Props {
  videoIds?: number[];
  videoUrls?: string[];
  onOpen: (payload: { src: string; index: number; sources: string[] }) => void;
}

export default function VideoScroller({ videoIds, videoUrls, onOpen }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      dragStartX.current = (e as any).clientX ?? 0;
      dragStartScroll.current = el.scrollLeft;
      el.style.scrollBehavior = "auto";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const x = (e as any).clientX ?? 0;
      const delta = x - dragStartX.current;
      el.scrollLeft = dragStartScroll.current - delta;
    };
    const onPointerUp = () => {
      isDragging.current = false;
      el.style.scrollBehavior = "smooth";
    };
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const sources: string[] =
    videoUrls && videoUrls.length > 0
      ? videoUrls
      : videoIds && videoIds.length > 0
      ? videoIds.map((v) => `/videos/review${v}.mp4`)
      : assetVideos;

  // duplicate the list for an infinite-scrolling feeling
  const looped = sources.concat(sources);

  return (
    <div
      ref={scrollerRef}
      className="mt-4 relative overflow-x-scroll no-scrollbar cursor-grab active:cursor-grabbing"
    >
      <div className="flex gap-3 animate-scrollVideos select-none">
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
  );
}
