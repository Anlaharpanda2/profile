"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import type { BlogPost, Project } from "@/lib/types";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api<{ data: Project[] }>("/api/projects"),
      api<{ data: BlogPost[] }>("/api/blog"),
    ])
      .then(([p, b]) => {
        setProjects(p.data);
        setPosts(b.data);
      })
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load"),
      );
  }, []);

  return (
    <>
      {error && (
        <div className="admin-flash error" role="alert">
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 28,
        }}
      >
        <div className="admin-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 14,
            }}
          >
            <h2
              className="font-serif-display"
              style={{ fontSize: 22, letterSpacing: -0.5 }}
            >
              Projects
            </h2>
            <span style={{ color: "var(--muted)", fontSize: 13 }}>
              {projects?.length ?? "—"} entries
            </span>
          </div>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16 }}>
            Add, edit, or remove the case studies shown on the public site.
          </p>
          <Link href="/admin/projects" className="admin-btn">
            Manage projects →
          </Link>
        </div>

        <div className="admin-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 14,
            }}
          >
            <h2
              className="font-serif-display"
              style={{ fontSize: 22, letterSpacing: -0.5 }}
            >
              Blog
            </h2>
            <span style={{ color: "var(--muted)", fontSize: 13 }}>
              {posts?.length ?? "—"} articles
            </span>
          </div>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16 }}>
            Write and publish articles. Saved posts trigger a site rebuild.
          </p>
          <Link href="/admin/blog" className="admin-btn">
            Manage blog →
          </Link>
        </div>
      </div>

      <div className="admin-card">
        <h2
          className="font-serif-display"
          style={{ fontSize: 18, letterSpacing: -0.3, marginBottom: 8 }}
        >
          How it works
        </h2>
        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>
          Changes are saved to the Cloudflare D1 database via the backend API.
          Images are stored in Cloudflare R2. Trigger a Cloudflare Pages
          rebuild to update the public site with newly added content.
        </p>
      </div>
    </>
  );
}
