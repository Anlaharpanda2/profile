import type { Project, BlogPost } from "./types";
import projectsFallback from "@/data/projects.json";
import blogFallback from "@/data/blog.json";

function apiBase(): string {
  return (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
}

async function fetchApi<T>(path: string): Promise<T | null> {
  const base = apiBase();
  if (!base) return null;
  try {
    const res = await fetch(`${base}${path}`, { cache: "force-cache" });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const result = await fetchApi<{ data: Project[] }>("/api/projects");
  return result?.data ?? (projectsFallback as Project[]);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const result = await fetchApi<{ data: Project }>(`/api/projects/${slug}`);
  if (result?.data) return result.data;
  return (projectsFallback as Project[]).find((p) => p.slug === slug);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const result = await fetchApi<{ data: BlogPost[] }>("/api/blog");
  if (result?.data) return result.data;
  return [...(blogFallback as BlogPost[])].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const result = await fetchApi<{ data: BlogPost }>(`/api/blog/${slug}`);
  if (result?.data) return result.data;
  return (blogFallback as BlogPost[]).find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
