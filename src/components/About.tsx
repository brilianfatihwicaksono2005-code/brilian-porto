"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

export default function About({ visual }: { visual?: ReactNode }) {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-16 border-t border-line/60 py-20 md:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-12 md:gap-16">
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 24,
            scale: reduceMotion ? 1 : 0.95,
          }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="md:col-span-5"
        >
          {visual ? (
            <div className="mx-auto aspect-[3/4] w-full max-w-sm md:max-w-none">
              {visual}
            </div>
          ) : (
            <div className="group relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2rem] bg-black/[0.03] shadow-[0_25px_70px_-35px_rgba(245,158,11,0.5),0_20px_60px_-40px_rgba(244,63,94,0.45)] ring-1 ring-inset ring-black/5 transition-shadow duration-700 hover:shadow-[0_30px_85px_-30px_rgba(245,158,11,0.7),0_25px_75px_-35px_rgba(244,63,94,0.6)] md:max-w-none dark:bg-white/[0.04] dark:shadow-[0_25px_80px_-30px_rgba(245,158,11,0.4),0_20px_70px_-35px_rgba(244,63,94,0.42)] dark:ring-white/10 dark:hover:shadow-[0_30px_95px_-25px_rgba(245,158,11,0.6),0_25px_85px_-30px_rgba(244,63,94,0.6)]">
              <Image
                src="/foto.jpg"
                alt="Brilian Fatih Wicaksono"
                width={900}
                height={1200}
                sizes="(min-width: 768px) 40vw, 90vw"
                className="h-full w-full object-cover grayscale transition-[transform,filter] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
          )}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl md:col-span-7"
        >
          <motion.div variants={item}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              About
            </p>
            <h2
              id="about-heading"
              className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Engineering software with intent.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              I am Brilian Fatih Wicaksono, a Software Engineering Technology
              student at Universitas Gadjah Mada, originally from Demak, Central
              Java. I specialize in software development and am actively seeking
              opportunities to enhance my expertise and contribute to a
              technology company.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
