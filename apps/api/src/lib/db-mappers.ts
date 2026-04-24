import type { projectsTable, blogPostsTable } from "../db/schema";
import type { Project, BlogPost } from "./types";

type ProjectRow = typeof projectsTable.$inferSelect;
type BlogRow = typeof blogPostsTable.$inferSelect;

function j<T>(s: string, fallback: T): T {
  try { return JSON.parse(s) as T; } catch { return fallback; }
}

export function rowToProject(r: ProjectRow): Project {
  return {
    slug: r.slug,
    num: r.num,
    title: r.title,
    tagline: r.tagline,
    year: r.year,
    image: r.image,
    role: r.role,
    tags: j(r.tags, []),
    categories: j(r.categories, []),
    stack: j(r.stack, []),
    problem: r.problem,
    impact: j(r.impact, []),
    demoLink: r.demoLink,
    githubLink: r.githubLink,
    featured: Boolean(r.featured),
    duration: r.duration,
    metrics: { performance: r.metricsPerformance, users: r.metricsUsers },
    learnings: j(r.learnings, []),
    visual: { bg: r.visualBg, label: r.visualLabel },
  };
}

export function rowToBlog(r: BlogRow): BlogPost {
  return {
    slug: r.slug,
    title: r.title,
    description: r.description,
    date: r.date,
    tags: j(r.tags, []),
    author: r.author,
    thumbnail: r.thumbnail,
    content: r.content,
  };
}

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v.trim() : fallback;
}
function num(v: unknown, fallback = 0): number {
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : fallback;
}
function strArr(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return (v as unknown[]).map(String).filter(Boolean);
}

export function validateProject(input: Partial<Project>, mode: "create" | "update"): Project | string {
  const slug = str(input.slug);
  if (!slug && mode === "create") return "slug is required";
  if (slug && !/^[a-z0-9][a-z0-9-]{0,79}$/.test(slug)) return "invalid slug format";
  const title = str(input.title);
  if (!title) return "title is required";
  const v = (input.visual ?? {}) as { bg?: unknown; label?: unknown };
  const m = (input.metrics ?? {}) as { performance?: unknown; users?: unknown };
  return {
    slug,
    num: str(input.num, "01"),
    title,
    tagline: str(input.tagline),
    year: num(input.year, new Date().getFullYear()),
    image: str(input.image),
    role: str(input.role),
    tags: strArr(input.tags),
    categories: strArr(input.categories),
    stack: strArr(input.stack),
    problem: str(input.problem),
    impact: strArr(input.impact),
    demoLink: str(input.demoLink),
    githubLink: str(input.githubLink),
    featured: input.featured === true || String(input.featured) === "true",
    duration: str(input.duration),
    metrics: { performance: str(m.performance), users: num(m.users, 0) },
    learnings: strArr(input.learnings),
    visual: {
      bg: str(v.bg, "linear-gradient(135deg,oklch(0.42 0.24 268) 0%,oklch(0.35 0.18 300) 100%)"),
      label: str(v.label),
    },
  };
}

export function validateBlog(input: Partial<BlogPost>, mode: "create" | "update"): BlogPost | string {
  const slug = str(input.slug);
  if (!slug && mode === "create") return "slug is required";
  if (slug && !/^[a-z0-9][a-z0-9-]{0,79}$/.test(slug)) return "invalid slug format";
  const title = str(input.title);
  if (!title) return "title is required";
  const dateIn = str(input.date);
  const date = dateIn
    ? (() => { const d = new Date(dateIn); return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString(); })()
    : new Date().toISOString();
  return {
    slug,
    title,
    description: str(input.description),
    date,
    tags: strArr(input.tags),
    author: str(input.author, "anla"),
    thumbnail: str(input.thumbnail),
    content: str(input.content),
  };
}
