import { useEffect, useRef } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

const FADE_DURATION = 0.5;
const RESTART_DELAY_MS = 100;

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const restartTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      const v = videoRef.current;
      if (!v) return;

      const duration = v.duration;
      const time = v.currentTime;

      if (!Number.isNaN(duration) && duration > 0) {
        let opacity = 1;

        if (time < FADE_DURATION) {
          // Fade in over the first 0.5s
          opacity = time / FADE_DURATION;
        } else if (time > duration - FADE_DURATION) {
          // Fade out over the last 0.5s
          opacity = Math.max(0, (duration - time) / FADE_DURATION);
        }

        v.style.opacity = String(opacity);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      const v = videoRef.current;
      if (!v) return;
      v.style.opacity = "0";
      restartTimerRef.current = window.setTimeout(() => {
        v.currentTime = 0;
        void v.play();
      }, RESTART_DELAY_MS);
    };

    video.addEventListener("ended", handleEnded);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (restartTimerRef.current !== null) clearTimeout(restartTimerRef.current);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div
      className="absolute z-0 overflow-hidden"
      style={{ top: "300px", inset: "auto 0 0 0" }}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="block w-full h-full object-cover"
        style={{ opacity: 0 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
    </div>
  );
}
