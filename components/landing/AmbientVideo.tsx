"use client";

import { useEffect, useRef } from "react";

export function AmbientVideo({
  className,
  poster,
  src,
}: {
  className?: string;
  poster: string;
  src: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!video) return;

    const syncPlayback = () => {
      if (motionPreference.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        void video.play().catch(() => undefined);
      }
    };

    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);

    return () => motionPreference.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}