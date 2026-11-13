"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const title = "I build clean, reliable software that ships.";

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100dvh-4rem)] w-full items-center overflow-hidden px-6 py-24"
    >
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="mb-6 inline-block rounded-full border border-black/5 bg-white/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted backdrop-blur-md dark:border-white/10 dark:bg-black/30"
          >
            Brilian Fatih Wicaksono — Software Engineer
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="flex flex-wrap text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white mix-blend-difference sm:text-6xl lg:text-6xl xl:text-7xl"
          >
            {title.split(" ").map((word, i) => (
              <span key={i} className="relative inline-block overflow-hidden pb-1 mr-[0.2em]">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ 
                    type: "spring", 
                    damping: 20, 
                    stiffness: 100,
                    delay: i * 0.03
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-8 max-w-xl rounded-2xl border border-black/5 bg-white/40 p-5 backdrop-blur-md dark:border-white/10 dark:bg-black/30"
          >
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Full-stack developer focused on system architecture, clean code, and
              production-ready products. I turn complex problems into simple,
              maintainable systems.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#projects" className="group inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-canvas transition-opacity hover:opacity-90">
                View Projects
                <ArrowRight size={16} />
              </a>
              <a href="/resume.pdf" className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-5 text-sm font-medium text-foreground hover:bg-elevated">
                <FileText size={16} />
                Resume
              </a>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div variants={item} className="relative w-full rounded-xl border border-zinc-800 bg-[#111] p-6 shadow-2xl">
           <span className="font-mono text-[11px] text-zinc-500">engineer.ts</span>
           <pre className="mt-4 text-[13px] leading-6 text-zinc-300">
             <code>{"// Software engineered with precision"}</code>
           </pre>
        </motion.div>
      </div>
    </section>
  );
}
