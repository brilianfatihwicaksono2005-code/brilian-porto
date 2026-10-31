"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Mail } from "lucide-react";

const links = [
  {
    label: "Email",
    value: "brilianfatih7i@gmail.com",
    href: "mailto:brilianfatih7i@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/brilianfatihwicaksono2005-code",
    href: "https://github.com/brilianfatihwicaksono2005-code",
    icon: Github,
  },
] as const;

export default function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-16 border-t border-line/60 py-20 md:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Let&apos;s build something reliable.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
            Open to software engineering roles, full-stack work, and system
            architecture challenges. The fastest way to reach me is email.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          className="divide-y divide-line/60 border-y border-line/60"
        >
          {links.map(({ label, value, href, icon: Icon }) => {
            const external = href.startsWith("http");

            return (
              <li key={label}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                >
                  <Icon
                    aria-hidden="true"
                    size={18}
                    className="shrink-0 text-muted transition-colors duration-200 group-hover:text-foreground"
                  />
                  <span className="flex flex-1 items-baseline justify-between gap-4">
                    <span className="text-sm font-medium text-foreground">
                      {label}
                    </span>
                    <span className="text-right text-sm text-muted transition-colors duration-200 group-hover:text-foreground">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    className="shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </a>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
