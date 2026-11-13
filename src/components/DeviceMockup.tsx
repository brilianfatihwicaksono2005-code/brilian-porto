"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type DeviceMockupProps = {
  src: string;
  alt?: string;
  video?: boolean;
  floating?: boolean;
  priority?: boolean;
  className?: string;
};

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export default function DeviceMockup({
  src,
  alt = "",
  video = false,
  floating = true,
  priority = false,
  className,
}: DeviceMockupProps) {
  const reduceMotion = useReducedMotion();
  const shouldFloat = floating && !reduceMotion;

  return (
    <motion.div
      animate={shouldFloat ? { y: [0, -12, 0] } : undefined}
      transition={
        shouldFloat
          ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
      className={cx("relative aspect-[9/19.5] w-full", className)}
    >
      <span
        aria-hidden="true"
        className="absolute -left-[7px] top-[18%] h-9 w-[3px] rounded-l-full bg-zinc-400 dark:bg-zinc-600"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[7px] top-[28%] h-14 w-[3px] rounded-l-full bg-zinc-400 dark:bg-zinc-600"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[7px] top-[24%] h-16 w-[3px] rounded-r-full bg-zinc-400 dark:bg-zinc-600"
      />

      <div className="relative h-full w-full rounded-[3rem] border-[6px] border-zinc-900 bg-zinc-900 p-[3px] shadow-2xl shadow-zinc-900/30 dark:border-zinc-700 dark:bg-gradient-to-b dark:from-zinc-500 dark:via-zinc-800 dark:to-zinc-900 dark:shadow-black/60">
        <div className="relative h-full w-full overflow-hidden rounded-[2.6rem] bg-black">
          {video ? (
            <video
              className="h-full w-full object-cover"
              src={src}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(min-width: 768px) 30vw, 70vw"
              className="object-cover"
            />
          )}

          <div className="absolute left-1/2 top-3 z-10 flex h-6 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-black">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 ring-1 ring-zinc-700/80" />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[2.6rem] bg-gradient-to-tr from-white/0 via-white/0 to-white/10"
          />
        </div>
      </div>
    </motion.div>
  );
}
