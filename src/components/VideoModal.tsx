import React, { useRef, useEffect, useState } from "react";

interface VideoData {
  src: string;
  index: number;
  sources: string[];
}

interface Props {
  videoData?: VideoData | null;
  videoUrl?: string | null; // backward compatibility
  onClose: () => void;
  onNavigate?: (newIndex: number) => void;
}

export default function VideoModal({
  videoData,
  videoUrl,
  onClose,
  onNavigate,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playCount, setPlayCount] = useState(0);

  useEffect(() => {
    // reset counter when a new video opens
    setPlayCount(0);
    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } catch (e) {}
    }
  }, [videoData?.src]);

  // support old usage (videoUrl) — convert to a minimal VideoData
  const effective: VideoData | null =
    videoData ??
    (videoUrl ? { src: videoUrl, index: 0, sources: [videoUrl] } : null);

  if (!effective) return null;

  const { src, index, sources } = effective;

  const handleEnded = () => {
    setPlayCount((c) => {
      const next = c + 1;
      // loop until we've played 5 times total
      if (next < 5) {
        try {
          videoRef.current?.play().catch(() => {});
        } catch (e) {}
      }
      return next;
    });
  };

  const prev = () => {
    const len = sources.length || 1;
    const nextIndex = (index - 1 + len) % len;
    if (onNavigate) onNavigate(nextIndex);
  };

  const next = () => {
    const len = sources.length || 1;
    const nextIndex = (index + 1) % len;
    if (onNavigate) onNavigate(nextIndex);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      onClick={() => onClose()}
    >
      <div
        className="w-[80vw] max-w-5xl rounded-2xl overflow-hidden bg-black relative"
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Previous video"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-40 bg-black/40 text-white rounded-full p-2 hover:bg-black/60"
        >
          ◀
        </button>

        <button
          aria-label="Next video"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-40 bg-black/40 text-white rounded-full p-2 hover:bg-black/60"
        >
          ▶
        </button>

        <video
          key={src}
          ref={videoRef}
          src={src}
          controls
          autoPlay
          onEnded={handleEnded}
          playsInline
          muted={false}
          style={{
            width: "80vw",
            height: "auto",
            maxHeight: "80vh",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
