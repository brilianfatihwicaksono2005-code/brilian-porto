"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { chapters, type ChapterId } from "@/lib/chapters";

type ChapterContextValue = {
  active: ChapterId;
};

const ChapterContext = createContext<ChapterContextValue>({ active: "intro" });

export function useChapter() {
  return useContext(ChapterContext);
}

export default function ChapterProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ChapterId>("intro");

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const observed = new Set<string>();

    const handleEntries: IntersectionObserverCallback = (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const chapter = chapters.find(
        (item) => item.sectionId === visible.target.id,
      );
      if (chapter) setActive(chapter.id);
    };

    const attach = () => {
      const sections = chapters
        .map((chapter) => document.getElementById(chapter.sectionId))
        .filter((element): element is HTMLElement => element !== null);

      if (sections.length === 0) return false;

      if (!observer) {
        observer = new IntersectionObserver(handleEntries, {
          rootMargin: "-40% 0px -55% 0px",
          threshold: [0, 0.25, 0.5, 1],
        });
      }

      sections.forEach((section) => {
        if (observed.has(section.id)) return;
        observer?.observe(section);
        observed.add(section.id);
      });

      return observed.size >= chapters.length;
    };

    if (attach()) {
      return () => observer?.disconnect();
    }

    const mutationObserver = new MutationObserver(() => {
      if (attach()) mutationObserver.disconnect();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, []);

  return (
    <ChapterContext.Provider value={{ active }}>
      {children}
    </ChapterContext.Provider>
  );
}
