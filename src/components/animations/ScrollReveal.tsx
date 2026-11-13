"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

type StaggerContainerProps = RevealProps & {
  stagger?: number;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

export function MaskedTextReveal({
  children,
  className,
  delay = 0,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span
      className={cx(
        "-mb-[0.15em] block overflow-hidden pb-[0.15em]",
        className,
      )}
    >
      <motion.span
        className="block will-change-transform"
        initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
        whileInView={reduceMotion ? { opacity: 1 } : { y: "0%" }}
        viewport={{ once, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function FadeUpScale({
  children,
  className,
  delay = 0,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }
      }
      whileInView={
        reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once, amount: 0.2 }}
      transition={
        reduceMotion
          ? { duration: 0.4, ease: "easeOut", delay }
          : {
              type: "spring",
              damping: 30,
              stiffness: 100,
              mass: 1,
              delay,
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  stagger = 0.12,
  once = true,
}: StaggerContainerProps) {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, y = 24 }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
