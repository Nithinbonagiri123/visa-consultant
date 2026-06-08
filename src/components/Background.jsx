"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4";

export default function Background() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) setVideoReady(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 aura-fallback" />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-out ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        src={VIDEO_SRC}
      />
      {/* Contrast & cinematic overlays */}
      <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/65" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0 aura-noise" />
    </div>
  );
}
