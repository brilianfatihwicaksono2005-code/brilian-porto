"use client";

import { motion, useReducedMotion } from "framer-motion";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["Next.js", "React", "Vue.js 3", "Tailwind CSS"],
  },
  {
    title: "Backend & Data",
    skills: ["Laravel", "Node.js", "REST API", "Python", "MySQL"],
  },
  {
    title: "Tools & Environment",
    skills: ["Git", "Docker", "GitHub Actions", "Vercel", "WSL2 / Linux"],
  },
] as const;

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-16 border-t border-line/60 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Skills
          </p>
          <h2
            id="skills-heading"
            className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Tools I work with.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              className="rounded-xl border border-line bg-surface p-6"
            >
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line bg-canvas/60 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors duration-200 hover:border-muted/40 hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
