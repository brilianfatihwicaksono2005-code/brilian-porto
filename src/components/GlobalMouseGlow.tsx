"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const SIZE = 400;
const OFFSET = SIZE / 2;
const SPRING = { stiffness: 50, damping: 20, mass: 0.6 };

export default function GlobalMouseGlow() {
  const reduceMotion = useReducedMotion();

  const cursorX = useMotionValue(-SIZE);
  const cursorY = useMotionValue(-SIZE);

  const x = useSpring(cursorX, SPRING);
  const y = useSpring(cursorY, SPRING);

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX - OFFSET);
      cursorY.set(event.clientY - OFFSET);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [cursorX, cursorY, reduceMotion]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 rounded-full opacity-30 mix-blend-normal blur-[120px] will-change-transform dark:opacity-50 dark:mix-blend-screen"
      style={{
        x,
        y,
        width: SIZE,
        height: SIZE,
        backgroundImage:
          "linear-gradient(135deg, #8b5cf6, #3b82f6, #10b981, #f59e0b, #f43f5e)",
      }}
    />
  );
}
