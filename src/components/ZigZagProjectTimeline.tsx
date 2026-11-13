"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ProjectCard, projects } from "./ProjectCard";

type Point = { x: number; y: number };

function offsetWithin(
  element: HTMLElement,
  ancestor: HTMLElement,
): { x: number; y: number } {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;

  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }

  return { x, y };
}

function buildPath(points: Point[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    const midY = (a.y + b.y) / 2;
    d += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
  }

  return d;
}

function round(points: Point[]): Point[] {
  return points.map((point) => ({
    x: Math.round(point.x * 100) / 100,
    y: Math.round(point.y * 100) / 100,
  }));
}

export default function ZigZagProjectTimeline() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [points, setPoints] = useState<Point[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const dashOffset = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const measure = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      if (width === 0 || height === 0) return;

      const next = projects.map((_, index) => {
        const element = cardRefs.current[index];
        if (!element) return { x: width / 2, y: 0 };

        const offset = offsetWithin(element, container);
        const isLeft = index % 2 === 0;
        const x = isLeft ? offset.x + element.offsetWidth : offset.x;
        const y = offset.y + element.offsetHeight / 2;
        return { x, y };
      });

      setSize({ width, height });
      setPoints(round(next));
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    cardRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const path = useMemo(() => buildPath(points), [points]);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-5xl">
      {size.width > 0 && size.height > 0 ? (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
          viewBox={`0 0 ${size.width} ${size.height}`}
          fill="none"
        >
          <defs>
            <linearGradient
              id="zigzag-project-path"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2={size.height}
            >
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="25%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="75%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>

          {path ? (
            <motion.path
              d={path}
              stroke="url(#zigzag-project-path)"
              strokeWidth={2.5}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              style={{
                strokeDashoffset: reduceMotion ? 0 : dashOffset,
                filter: "drop-shadow(0 0 5px rgba(139, 92, 246, 0.35))",
              }}
            />
          ) : null}
        </svg>
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-8 left-0 z-0 w-px bg-gradient-to-b from-transparent via-line to-transparent md:hidden"
      />

      <div className="flex flex-col gap-y-24 pl-8 md:gap-y-32 md:pl-0">
        {projects.map((project, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={project.title}
              className="relative grid grid-cols-1 md:grid-cols-2 md:gap-x-32"
            >
              <motion.div
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: isLeft ? -48 : 48 }
                }
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={
                  reduceMotion
                    ? { duration: 0.4, ease: "easeOut" }
                    : { type: "spring", damping: 26, stiffness: 90 }
                }
                className={isLeft ? "md:col-start-1" : "md:col-start-2"}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            </div>
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 hidden md:block"
      >
        {points.map((point) => (
          <span
            key={`${point.x}-${point.y}`}
            style={{ left: point.x, top: point.y }}
            className="absolute flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-400 bg-canvas dark:border-zinc-600"
          >
            <span className="h-1 w-1 rounded-full bg-foreground" />
          </span>
        ))}
      </div>
    </div>
  );
}
