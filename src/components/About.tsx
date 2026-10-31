"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

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
            scale: reduceMotion ? 1 : 0.97,
          }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="md:col-span-5"
        >
          {visual ? (
            <div className="mx-auto aspect-[3/4] w-full max-w-sm md:max-w-none">
              {visual}
            </div>
          ) : (
            <div className="group mx-auto max-w-sm rounded-2xl border border-line bg-surface p-2.5 transition-[transform,border-color] duration-500 hover:-rotate-1 hover:border-muted/40 md:max-w-none">
              <Image
                src="/foto.jpg"
                alt="Brilian Fatih Wicaksono"
                width={900}
                height={1200}
                sizes="(min-width: 768px) 40vw, 90vw"
                className="aspect-[3/4] w-full rounded-xl object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
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

          <motion.div variants={item} className="mt-12">
            <h3 className="text-xl font-semibold text-foreground">Education</h3>
            <div className="mt-6 flex flex-col gap-6">
              <div>
                <p className="text-sm text-muted">2024 – Present</p>
                <div className="mt-1 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="text-base font-medium text-foreground">
                    Universitas Gadjah Mada
                  </h4>
                  <p className="text-sm text-muted">
                    Software Engineering Technology
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted">
                  <span className="font-medium text-foreground">IPK 3.70</span>{" "}
                  / 4.00 — Semester 5
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Focused on Computer Programming, Web Development, Data Science,
                  and Databases, aimed at building a professional career in
                  software engineering.
                </p>
              </div>

              <div>
                <p className="text-sm text-muted">2021 – 2024</p>
                <div className="mt-1 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="text-base font-medium text-foreground">
                    SMA Negeri 1 Demak
                  </h4>
                  <p className="text-sm text-muted">
                    Mathematics and Natural Sciences (MIPA)
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Focused on analytical and calculation-based subjects such as
                  Mathematics, Physics, and Chemistry.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-12">
            <h3 className="text-xl font-semibold text-foreground">
              Organization Experience
            </h3>
            <div className="mt-6 flex flex-col gap-6">
              <div>
                <p className="text-sm text-muted">2024 – Present</p>
                <h4 className="mt-1 text-base font-medium text-foreground">
                  Imagamade (Ikatan Mahasiswa Gadjah Mada Demak)
                </h4>
                <p className="mt-1 text-sm font-medium text-foreground/90">
                  Head of Interests and Talents Division
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Responsible for designing and organizing various activities to
                  facilitate and develop the interests and talents of UGM
                  students from Demak.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
