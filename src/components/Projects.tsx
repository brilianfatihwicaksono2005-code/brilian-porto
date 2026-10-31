"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";

type Project = {
  title: string;
  role: string;
  description: string;
  stack: string[];
  features: string[];
  figma?: string;
};

const projects: Project[] = [
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
    figma:
      "https://www.figma.com/design/OkBDomOaNYC26j3JVTUFjG/smartfarm-broiler?node-id=0-1&p=f&t=2tVi4CzGsRnrDcB5-0",
  },
  {
    title: "Borneo Alat Berat Mobile App",
    role: "Mobile Developer",
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
    role: "Full-Stack Developer",
    description:
      "Built a functional online store platform handling end-to-end product management, shopping cart operations, and secure CRUD functionalities.",
    stack: ["HTML", "CSS", "PHP"],
    features: [
      "Product management",
      "Shopping cart",
      "CRUD operations",
    ],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-muted/40 md:p-8"
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

      {project.figma ? (
        <a
          href={project.figma}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 self-start rounded-sm text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
          <ExternalLink aria-hidden="true" size={14} />
          View Figma
        </a>
      ) : null}
    </motion.article>
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-16 border-t border-line/60 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Selected Work
            </p>
            <h2
              id="projects-heading"
              className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Systems built for the real world.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-right">
            A selection of projects focused on architecture, data integrity, and
            operational reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
