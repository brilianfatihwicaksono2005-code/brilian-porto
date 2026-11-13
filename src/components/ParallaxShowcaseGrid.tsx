"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FadeUpScale } from "@/components/animations/ScrollReveal";
import DeviceMockup from "./DeviceMockup";

export type ShowcaseItem = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  video?: boolean;
};

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <FadeUpScale className="mx-auto w-full max-w-[17rem]">
      <DeviceMockup src={item.src} alt={item.alt} video={item.video} />
      {item.title ? (
        <div className="mt-6 text-center">
          <h3 className="text-base font-medium text-foreground">
            {item.title}
          </h3>
          {item.subtitle ? (
            <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
          ) : null}
        </div>
      ) : null}
    </FadeUpScale>
  );
}

export default function ParallaxShowcaseGrid({
  items,
}: {
  items: ShowcaseItem[];
}) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const leftColumn = items.filter((_, index) => index % 2 === 0);
  const rightColumn = items.filter((_, index) => index % 2 === 1);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-5xl overflow-x-clip px-6"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
        <motion.div
          style={{ y: reduceMotion ? 0 : ySlow }}
          className="flex flex-col gap-16 md:mt-24"
        >
          {leftColumn.map((item) => (
            <ShowcaseCard key={item.src} item={item} />
          ))}
        </motion.div>

        <motion.div
          style={{ y: reduceMotion ? 0 : yFast }}
          className="flex flex-col gap-16"
        >
          {rightColumn.map((item) => (
            <ShowcaseCard key={item.src} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
