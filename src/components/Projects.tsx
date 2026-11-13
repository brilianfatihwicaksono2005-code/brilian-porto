"use client";

import { motion, useReducedMotion } from "framer-motion";
import ZigZagProjectTimeline from "./ZigZagProjectTimeline";

export default function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-16 overflow-hidden border-t border-line/60 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-24"
        >
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Selected Work
            </p>
            <h2
              id="projects-heading"
              className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Systems built for the real world.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-right">
            A selection of projects focused on architecture, data integrity, and
            operational reliability.
          </p>
        </motion.div>

        <ZigZagProjectTimeline />
      </div>
    </section>
  );
}
