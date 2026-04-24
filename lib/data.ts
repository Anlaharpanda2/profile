import projectsJson from "@/data/projects.json";
import blogJson from "@/data/blog.json";
import type { Project, BlogPost } from "./types";

export function getAllProjects(): Project[] {
  return projectsJson as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projectsJson as Project[]).find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...(blogJson as BlogPost[])].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return (blogJson as BlogPost[]).find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
