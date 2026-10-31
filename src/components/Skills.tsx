"use client";

import type { ComponentType, CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Webhook } from "lucide-react";
import {
  SiDocker,
  SiGit,
  SiGithubactions,
  SiLaravel,
  SiLinux,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";

type SkillIcon = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
  style?: CSSProperties;
}>;

type Skill = {
  name: string;
  icon: SkillIcon;
  color: string;
};

const allSkills: Skill[] = [
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Vue.js 3", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "REST API", icon: Webhook, color: "#38BDF8" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
  { name: "WSL2 / Linux", icon: SiLinux, color: "#FCC624" },
];

const duplicatedSkills = [...allSkills, ...allSkills, ...allSkills];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function SkillCard({ skill, hidden }: { skill: Skill; hidden: boolean }) {
  const Icon = skill.icon;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      aria-hidden={hidden || undefined}
      className="flex h-32 w-32 shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10 md:h-40 md:w-40"
    >
      <Icon
        aria-hidden
        className="size-12 md:size-16"
        style={{ color: skill.color }}
      />
      <span className="text-sm font-medium text-muted-foreground">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const nextSet = track.children[allSkills.length] as HTMLElement | undefined;

      if (first && nextSet) {
        loopWidthRef.current = nextSet.offsetLeft - first.offsetLeft;
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || isHovering) return;

    const loopWidth = loopWidthRef.current;
    if (!loopWidth) return;

    const elapsed = Math.min(delta, 50);
    let next = x.get() - (elapsed / 1000) * 80;

    if (next <= -loopWidth) {
      next %= loopWidth;
    }

    x.set(next);
  });

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-16 overflow-hidden border-t border-line/60 py-20 md:py-28"
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
      </div>

      <div
        className={`relative mt-4 flex w-full flex-col items-center justify-center py-10 ${
          reduceMotion ? "overflow-x-auto" : "overflow-hidden"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-canvas to-transparent md:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-canvas to-transparent md:w-40"
        />

        <motion.div
          ref={trackRef}
          style={{ x }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          onFocusCapture={() => setIsHovering(true)}
          onBlurCapture={() => setIsHovering(false)}
          className="flex w-max gap-6 self-start will-change-transform md:gap-8"
        >
          {duplicatedSkills.map((skill, index) => (
            <SkillCard
              key={`${skill.name}-${index}`}
              skill={skill}
              hidden={index >= allSkills.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
