"use client";

import type { MouseEvent } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, ExternalLink, Github } from "lucide-react";

export type Project = {
  title: string;
  role: string;
  description: string;
  stack: string[];
  features: string[];
  figma?: string;
  demo?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Enterprise Java Swing Online Shop",
    role: "Software Engineer",
    description:
      "Architected an enterprise-level Point-of-Sale (POS) system ensuring zero data loss during operations by implementing strict ACID principles and DAO patterns.",
    stack: ["Java", "MySQL", "JDBC", "HikariCP"],
    features: [
      "ACID transactions for checkout integrity",
      "DAO pattern for persistence isolation",
      "Singleton pattern for shared resources",
      "Audit trail logging for admin activity",
    ],
  },
  {
    title: "Smartfarm Broiler IoT & Web Dashboard",
    role: "UI/UX Designer & Frontend Developer",
    description:
      "Developed a low-latency, real-time monitoring platform for multi-coop temperature and ammonia data visualization to optimize farming operations.",
    stack: ["Next.js", "REST API", "IoT"],
    features: [
      "Multi-kandang switcher",
      "Real-time temperature monitoring",
      "Real-time ammonia monitoring",
    ],
    demo: "https://smartbroiler.duckdns.org",
    figma:
      "https://www.figma.com/design/OkBDomOaNYC26j3JVTUFjG/smartfarm-broiler?node-id=0-1&p=f&t=2tVi4CzGsRnrDcB5-0",
  },
  {
    title: "Borneo Alat Berat Mobile App",
    role: "Frontend Developer Mobile",
    description:
      "Built a cross-platform heavy equipment management application focusing on scalable architecture and efficient state management.",
    stack: ["Flutter", "Dart"],
    features: [
      "Responsive UI",
      "State management",
      "Scalable architecture",
    ],
  },
  {
    title: "Sistem Penjadwalan Pendadaran DTEDI",
    role: "UI/UX Designer",
    description:
      "Designed an interactive academic scheduling prototype with a strong emphasis on user flow mapping, usability, and intuitive navigation.",
    stack: ["Figma", "UI/UX"],
    features: [
      "User flow mapping",
      "Intuitive navigation",
      "Usability focused",
    ],
    figma:
      "https://www.figma.com/design/fPvprATrKl8NbCSGvSxeUY/SISTEM-PENJADWALAN-PENDADARAN-UGM?node-id=0-1&p=f&t=2tVi4CzGsRnrDcB5-0",
  },
  {
    title: "Aplikasi Android Online Shop",
    role: "Android Developer",
    description:
      "Developed a native Android e-commerce application featuring seamless product catalog browsing and structured lifecycle management.",
    stack: ["Java", "Android"],
    features: [
      "Product catalog",
      "Basic transaction flow",
      "Lifecycle management",
    ],
  },
  {
    title: "B’OLSHOP – Platform E-commerce",
    role: "Frontend Developer",
    description:
      "Built a full-featured fashion e-commerce platform with product catalog, authentication, shopping cart, checkout, and a role-based admin dashboard.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"],
    features: [
      "Product catalog with search and category filters",
      "Authentication with customer & admin roles",
      "Shopping cart and checkout flow",
      "Admin CRUD and inventory dashboard",
    ],
    demo: "https://bolshop.vercel.app/",
    repo: "https://github.com/brilianfatihwicaksono2005-code/BOLSHOP",
  },
];

export function ProjectCard({
  project,
  index,
  variants,
}: {
  project: Project;
  index: number;
  variants?: Variants;
}) {
  const reduceMotion = useReducedMotion();

  function handleSpotlight(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spotlight-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--spotlight-y",
      `${event.clientY - rect.top}px`,
    );
  }

  const isOffset = index % 2 === 1;

  return (
    <motion.article
      custom={isOffset}
      variants={variants}
      whileHover={
        reduceMotion
          ? undefined
          : {
            y: -6,
            scale: 1.01,
            transition: { type: "spring", damping: 20, stiffness: 200 },
          }
      }
      onMouseMove={handleSpotlight}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-muted/40 hover:bg-elevated/40 hover:shadow-[0_0_45px_-12px_rgba(0,0,0,0.35)] md:p-8 dark:hover:shadow-[0_0_45px_-12px_rgba(255,255,255,0.18)]"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <span className="font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mb-6 text-sm leading-relaxed text-muted">
        <span className="font-semibold text-foreground">
          Role: {project.role}
        </span>
        <br />
        {project.description}
      </p>

      <ul className="mb-8 space-y-2.5">
        {project.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-muted"
          >
            <Check
              aria-hidden="true"
              size={15}
              className="mt-0.5 shrink-0 text-foreground/70"
            />
            {feature}
          </li>
        ))}
      </ul>

      <ul className="mt-auto flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-line bg-canvas/60 px-2.5 py-1 font-mono text-[11px] text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            <ExternalLink aria-hidden="true" size={14} />
            Live Demo
          </a>
        ) : null}

        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            <Github aria-hidden="true" size={14} />
            Source Code
          </a>
        ) : null}

        {project.figma ? (
          <a
            href={project.figma}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            <ExternalLink aria-hidden="true" size={14} />
            View Figma
          </a>
        ) : null}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(440px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(245, 245, 245, 0.07), transparent 45%)",
        }}
      />
    </motion.article>
  );
}
