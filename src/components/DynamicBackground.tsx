"use client";

import type { CSSProperties } from "react";
import { useChapter } from "./ChapterProvider";

const gridStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(25% 25% at 25% 25%, currentColor 99%, transparent 101%), radial-gradient(25% 25% at 25% 25%, currentColor 99%, transparent 101%), repeating-conic-gradient(currentColor 0 25%, transparent 0 50%)",
  backgroundPosition: "50px 50px, 0 0, 25px 0",
  backgroundSize: "100px 100px, 100px 100px, 100px 50px",
  maskImage:
    "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 78%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 78%)",
};

export default function DynamicBackground() {
  const { active } = useChapter();

  return (
    <div
      aria-hidden="true"
      data-chapter={active}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 transition-colors duration-700 ease-in-out motion-reduce:transition-none"
        style={{ backgroundColor: "var(--chapter-bg)" }}
      />
      <div
        className="absolute left-1/2 top-[-25%] h-[70vh] w-[85vw] -translate-x-1/2 rounded-full blur-[130px] transition-colors duration-1000 ease-in-out motion-reduce:transition-none"
        style={{ backgroundColor: "var(--chapter-glow)" }}
      />
      <div
        className="absolute inset-0 text-black opacity-[0.04] transition-colors duration-300 dark:text-white dark:opacity-[0.06]"
        style={gridStyle}
      />
    </div>
  );
}
