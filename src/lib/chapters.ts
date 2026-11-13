export type ChapterId =
  | "intro"
  | "about"
  | "experience"
  | "stack"
  | "works"
  | "contact";

export type Chapter = {
  id: ChapterId;
  label: string;
  sectionId: string;
};

export const chapters: Chapter[] = [
  { id: "intro", label: "Intro", sectionId: "top" },
  { id: "about", label: "About", sectionId: "about" },
  { id: "experience", label: "Experience", sectionId: "timeline" },
  { id: "stack", label: "Stack", sectionId: "skills" },
  { id: "works", label: "Works", sectionId: "projects" },
  { id: "contact", label: "Contact", sectionId: "contact" },
];
