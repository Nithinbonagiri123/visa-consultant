"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

// Animates a number from 0 → target the first time it scrolls into view.
// The animation feel is tuned by the spring config below; pass a custom
// spring if you need to override.
export function useCountUp(
  target: number,
  spring: { stiffness?: number; damping?: number; mass?: number } = {},
) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const animated = useSpring(mv, {
    stiffness: spring.stiffness ?? 80,
    damping: spring.damping ?? 22,
    mass: spring.mass ?? 0.6,
  });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, mv, target]);

  useEffect(() => {
    const unsub = animated.on("change", (v) => setValue(v));
    return () => unsub();
  }, [animated]);

  return { ref, value: Math.round(value) };
}
