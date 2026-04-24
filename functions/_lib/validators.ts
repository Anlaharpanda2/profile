import type { BlogPost, Project } from "../../lib/types";

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}
function num(v: unknown, fallback = 0): number {
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : fallback;
}
function strArr(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => String(x)).filter(Boolean);
}
function bool(v: unknown): boolean {
  return v === true || v === "true";
}

export function validateProject(
  input: Partial<Project>,
  mode: "create" | "update",
): Project | string {
  const slug = str(input.slug).trim();
  if (!slug && mode === "create") return "slug is required";
  const title = str(input.title).trim();
  if (!title) return "title is required";

  const visual = input.visual || {};
  const metrics = input.metrics || {};

  const project: Project = {
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
    featured: bool(input.featured),
    duration: str(input.duration),
    metrics: {
      performance: str((metrics as { performance?: unknown }).performance),
      users: num((metrics as { users?: unknown }).users, 0),
    },
    learnings: strArr(input.learnings),
    visual: {
      bg: str(
        (visual as { bg?: unknown }).bg,
        "linear-gradient(135deg,oklch(0.42 0.24 268) 0%,oklch(0.35 0.18 300) 100%)",
      ),
      label: str((visual as { label?: unknown }).label),
    },
  };
  return project;
}

export function validateBlogPost(
  input: Partial<BlogPost>,
  mode: "create" | "update",
): BlogPost | string {
  const slug = str(input.slug).trim();
  if (!slug && mode === "create") return "slug is required";
  const title = str(input.title).trim();
  if (!title) return "title is required";

  const dateIn = str(input.date).trim();
  const dateIso = dateIn
    ? (() => {
        const d = new Date(dateIn);
        return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
      })()
    : new Date().toISOString();

  const post: BlogPost = {
    slug,
    title,
    description: str(input.description),
    date: dateIso,
    tags: strArr(input.tags),
    author: str(input.author, "anla"),
    thumbnail: str(input.thumbnail),
    content: str(input.content),
  };
  return post;
}
