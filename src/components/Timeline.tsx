"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

type TimelineItem = {
  period: string;
  title: string;
  subtitle: string;
  highlights?: string[];
};

const timeline: TimelineItem[] = [
  {
    period: "2021 – 2024",
    title: "SMA Negeri 1 Demak",
    subtitle: "Mathematics and Natural Sciences (MIPA)",
  },
  {
    period: "2024 – Present",
    title: "Universitas Gadjah Mada",
    subtitle: "Software Engineering Technology (D-IV TRPL) — IPK 3.70 / 4.00",
  },
  {
    period: "2024 – Present",
    title: "Imagamade (Ikatan Mahasiswa Gadjah Mada Demak)",
    subtitle: "Head of Interests and Talents Division",
  },
  {
    period: "Sep 2025 – Nov 2025",
    title: "Computer Vision Data Annotator",
    subtitle:
      "Wind Turbine Blade Defect Detection Project (CVAT) • 3-Month Contract",
    highlights: [
      "Executed high-precision polygonal segmentation in CVAT across 14 wind turbine blade defect classes (Contamination, Paint/Laminate Damage, Structural Cracks, Bond Open, Rain Collar, and Lightning Receptor Damage) at a target throughput of 25 frames per hour.",
      "Performed multi-angle visual verification across Suction Side (SS), Pressure Side (PS), Leading Edge (LE), and Trailing Edge (TE) views to maintain cross-frame labeling consistency.",
      "Utilized AI-assisted tools (Segment Anything Model / SAM anchors and OpenCV) to refine coarse pre-annotations and filter edge cases involving shadows, backlighting, and repair coatings.",
      "Collaborated with project maintainers on quality validation and documented ambiguous defect cases for model training readiness.",
    ],
  },
];

export default function Timeline() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className="scroll-mt-16 border-t border-line/60 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 text-center md:mb-24"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-amber-500 dark:text-amber-400">
            Timeline
          </p>
          <h2
            id="timeline-heading"
            className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
          >
            How I got here
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-line"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : scaleY }}
            className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 bg-foreground"
          />

          <div className="flex flex-col gap-y-14 md:gap-y-16">
            {timeline.map((item) => {
              const active = item.period.includes("Present");

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="grid grid-cols-[1fr_auto_1fr] items-start"
                >
                  <div
                    className={`text-right pr-6 text-sm tabular-nums md:pr-10 md:text-base ${
                      active ? "font-medium text-foreground" : "text-muted"
                    }`}
                  >
                    {item.period}
                  </div>

                  <div className="relative z-10 mt-1 flex justify-center md:mt-1.5">
                    <span className="flex h-3 w-3 items-center justify-center rounded-full border border-muted/60 bg-canvas">
                      <span className="h-1 w-1 rounded-full bg-foreground" />
                    </span>
                  </div>

                  <div className="pl-6 md:pl-10">
                    <h3 className="text-base font-medium text-foreground md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted md:text-sm">
                      {item.subtitle}
                    </p>
                    {item.highlights ? (
                      <ul className="mt-2.5 max-w-md list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-muted marker:text-muted/50 md:text-sm">
                        {item.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
