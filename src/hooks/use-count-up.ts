"use client";

import { useEffect, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function useCountUp(target: number, duration = 1.6) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 22, mass: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, mv, target]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setValue(v));
    return () => unsub();
  }, [spring]);

  useEffect(() => {
    void duration;
  }, [duration]);

  return { ref, value: Math.round(value) };
}
