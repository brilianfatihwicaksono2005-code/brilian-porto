"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const scaleX = reduceMotion ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-1"
      style={{
        scaleX,
        transformOrigin: "left",
        backgroundImage:
          "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 25%, #10b981 50%, #f59e0b 75%, #f43f5e 100%)",
      }}
    />
  );
}
