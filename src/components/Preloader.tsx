"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 25);
    if (progress === 100) clearInterval(timer);
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {progress < 100 && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas"
        >
          <span className="font-mono text-sm text-foreground">{progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
