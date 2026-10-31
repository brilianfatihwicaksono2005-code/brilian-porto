"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-6xl items-center px-6 py-24"
    >
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            Software Engineer — Full-Stack Developer
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-6xl xl:text-7xl"
          >
            I build clean, reliable software that ships.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Full-stack developer focused on system architecture, clean code, and
            production-ready products. I turn complex problems into simple,
            maintainable systems.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-canvas transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              View Projects
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>

            <a
              href="/resume.pdf"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-5 text-sm font-medium text-foreground transition-colors hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <FileText aria-hidden="true" size={16} />
              Resume
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reduceMotion ? 0 : 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="relative w-full"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full overflow-hidden rounded-xl border border-zinc-800 bg-[#111] p-6 shadow-2xl shadow-black/40"
          >
            <div className="mb-4 flex items-center gap-2 border-b border-zinc-800 pb-4">
              <span
                aria-hidden="true"
                className="size-3 rounded-full bg-red-500/50"
              />
              <span
                aria-hidden="true"
                className="size-3 rounded-full bg-yellow-500/50"
              />
              <span
                aria-hidden="true"
                className="size-3 rounded-full bg-emerald-500/50"
              />
              <span className="ml-auto font-mono text-[11px] text-zinc-500">
                engineer.ts
              </span>
            </div>

            <pre className="overflow-x-auto font-mono text-[13px] leading-6 text-zinc-300 sm:text-sm">
              <code>
                <div>
                  <span className="text-blue-400/80">type</span>{" "}
                  <span className="text-violet-400/80">Engineer</span>{" "}
                  <span className="text-zinc-500">=</span> {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-sky-300/80">name</span>
                  <span className="text-zinc-500">:</span>{" "}
                  <span className="text-blue-400/80">string</span>
                  <span className="text-zinc-500">;</span>
                </div>
                <div className="pl-4">
                  <span className="text-sky-300/80">role</span>
                  <span className="text-zinc-500">:</span>{" "}
                  <span className="text-blue-400/80">string</span>
                  <span className="text-zinc-500">;</span>
                </div>
                <div className="pl-4">
                  <span className="text-sky-300/80">stack</span>
                  <span className="text-zinc-500">:</span>{" "}
                  <span className="text-blue-400/80">string</span>
                  <span className="text-zinc-500">[];</span>
                </div>
                <div className="pl-4">
                  <span className="text-sky-300/80">focus</span>
                  <span className="text-zinc-500">:</span>{" "}
                  <span className="text-blue-400/80">string</span>
                  <span className="text-zinc-500">;</span>
                </div>
                <div>{"}"}</div>
                <div className="h-3" />
                <div>
                  <span className="text-blue-400/80">const</span>{" "}
                  <span className="text-zinc-300">brilian</span>
                  <span className="text-zinc-500">:</span>{" "}
                  <span className="text-violet-400/80">Engineer</span>{" "}
                  <span className="text-zinc-500">=</span> {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-sky-300/80">name</span>
                  <span className="text-zinc-500">:</span>{" "}
                  <span className="text-emerald-400/70">
                    &quot;Brilian Fatih Wicaksono&quot;
                  </span>
                  <span className="text-zinc-500">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-sky-300/80">role</span>
                  <span className="text-zinc-500">:</span>{" "}
                  <span className="text-emerald-400/70">
                    &quot;Full-Stack Developer&quot;
                  </span>
                  <span className="text-zinc-500">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-sky-300/80">stack</span>
                  <span className="text-zinc-500">:</span> [
                  <span className="text-emerald-400/70">
                    &quot;Next.js&quot;
                  </span>
                  <span className="text-zinc-500">,</span>{" "}
                  <span className="text-emerald-400/70">
                    &quot;React&quot;
                  </span>
                  <span className="text-zinc-500">,</span>{" "}
                  <span className="text-emerald-400/70">
                    &quot;Java&quot;
                  </span>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-sky-300/80">focus</span>
                  <span className="text-zinc-500">:</span>{" "}
                  <span className="text-emerald-400/70">
                    &quot;clean architecture&quot;
                  </span>
                  <span className="text-zinc-500">,</span>
                </div>
                <div>{"};"}</div>
                <div className="h-3" />
                <div>
                  <span className="text-blue-400/80">export</span>{" "}
                  <span className="text-blue-400/80">const</span>{" "}
                  <span className="text-yellow-300/80">ship</span>{" "}
                  <span className="text-zinc-500">=</span>{" "}
                  <span className="text-zinc-400">(</span>
                  <span className="text-zinc-300">problem</span>
                  <span className="text-zinc-500">:</span>{" "}
                  <span className="text-blue-400/80">string</span>
                  <span className="text-zinc-400">)</span>{" "}
                  <span className="text-blue-400/80">=&gt;</span>
                </div>
                <div className="pl-4">
                  <span className="text-zinc-300">solve</span>
                  <span className="text-zinc-400">(</span>
                  <span className="text-zinc-300">problem</span>
                  <span className="text-zinc-400">)</span>
                  <span className="text-zinc-500">.</span>
                  <span className="text-yellow-300/80">refactor</span>
                  <span className="text-zinc-400">()</span>
                  <span className="text-zinc-500">.</span>
                  <span className="text-yellow-300/80">test</span>
                  <span className="text-zinc-400">();</span>
                </div>
              </code>
            </pre>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
