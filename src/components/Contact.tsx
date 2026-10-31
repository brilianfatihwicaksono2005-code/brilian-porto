"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Github, Mail } from "lucide-react";

const email = "brilianfatih7i@gmail.com";

const links = [
  {
    label: "Email",
    value: email,
    href: `mailto:${email}`,
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
  const [isCopied, setIsCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);

      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }

      resetTimer.current = window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  }

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
            const isEmail = label === "Email";

            return (
              <li key={label} className="py-5">
                <div className="flex items-center gap-2">
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="group flex min-w-0 flex-1 items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  >
                    <Icon
                      aria-hidden="true"
                      size={18}
                      className="shrink-0 text-muted transition-colors duration-200 group-hover:text-foreground"
                    />
                    <span className="flex min-w-0 flex-1 items-baseline justify-between gap-4">
                      <span
                        className={`text-sm font-medium text-foreground ${
                          isEmail ? "hidden sm:inline" : ""
                        }`}
                      >
                        {label}
                      </span>
                      <span className="break-all text-right text-sm text-muted transition-colors duration-200 group-hover:text-foreground">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={16}
                      className="shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  </a>

                  {isEmail ? (
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label={
                        isCopied ? "Email copied" : "Copy email address"
                      }
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted transition-colors hover:bg-elevated hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                    >
                      {isCopied ? (
                        <Check aria-hidden="true" size={14} />
                      ) : (
                        <Copy aria-hidden="true" size={14} />
                      )}
                      <span className="hidden sm:inline">
                        {isCopied ? "Copied!" : "Copy"}
                      </span>
                    </button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </motion.ul>

        <span role="status" aria-live="polite" className="sr-only">
          {isCopied ? "Email copied to clipboard" : ""}
        </span>
      </div>
    </section>
  );
}
