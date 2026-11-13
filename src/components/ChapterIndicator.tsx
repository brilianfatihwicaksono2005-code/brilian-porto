"use client";

import type { MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { chapters } from "@/lib/chapters";
import { useChapter } from "./ChapterProvider";

export default function ChapterIndicator() {
  const { active } = useChapter();
  const lenis = useLenis();

  function handleClick(
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    event.preventDefault();

    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <nav
      aria-label="Chapter navigation"
      className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 2xl:flex"
    >
      {chapters.map((chapter, index) => {
        const isActive = chapter.id === active;
        const number = String(index + 1).padStart(2, "0");

        return (
          <a
            key={chapter.id}
            href={`#${chapter.sectionId}`}
            onClick={(event) => handleClick(event, chapter.sectionId)}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                isActive
                  ? "text-foreground"
                  : "text-muted/40 group-hover:text-muted"
              }`}
            >
              {chapter.label}
            </span>
            <span
              className={`font-mono text-[10px] tabular-nums transition-colors duration-300 ${
                isActive ? "text-amber-500 dark:text-amber-400" : "text-muted/40"
              }`}
            >
              {number}
            </span>
            <span
              aria-hidden="true"
              className={`h-px transition-all duration-300 ${
                isActive
                  ? "w-8 bg-amber-500 dark:bg-amber-400"
                  : "w-4 bg-line group-hover:w-6"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
