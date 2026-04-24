"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import type { Project } from "@/lib/types";

export default function AdminProjectsList() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const load = () => {
    api<{ data: Project[] }>("/api/projects")
      .then((r) => setProjects(r.data))
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load projects"),
      );
  };

  useEffect(load, []);

  const onDelete = async (slug: string) => {
    if (!confirm(`Delete project "${slug}"? This cannot be undone.`)) return;
    setDeletingSlug(slug);
    setError(null);
    try {
      await api(`/api/projects/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      setProjects((list) => list?.filter((p) => p.slug !== slug) || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingSlug(null);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1
          className="font-serif-display"
          style={{ fontSize: 30, letterSpacing: -1 }}
        >
          Projects
        </h1>
        <Link href="/admin/projects/new" className="admin-btn">
          + New project
        </Link>
      </div>

      {error && (
        <div className="admin-flash error" role="alert">
          {error}
        </div>
      )}

      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        {projects === null ? (
          <div
            style={{
              padding: 48,
              textAlign: "center",
              color: "var(--muted)",
              fontSize: 14,
            }}
          >
            Loading…
          </div>
        ) : projects.length === 0 ? (
          <div
            style={{
              padding: 48,
              textAlign: "center",
              color: "var(--muted)",
              fontSize: 14,
            }}
          >
            No projects yet.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Slug</th>
                <th>Title</th>
                <th>Year</th>
                <th>Featured</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <code style={{ fontSize: 13 }}>{p.slug}</code>
                  </td>
                  <td>{p.title}</td>
                  <td>{p.year}</td>
                  <td>
                    {p.featured ? (
                      <span style={{ color: "var(--accent)" }}>★</span>
                    ) : (
                      <span style={{ color: "var(--muted)" }}>—</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <Link
                      href={`/admin/projects/edit?slug=${encodeURIComponent(p.slug)}`}
                      className="admin-link"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="admin-link"
                      style={{ color: "#c11d1d" }}
                      onClick={() => onDelete(p.slug)}
                      disabled={deletingSlug === p.slug}
                    >
                      {deletingSlug === p.slug ? "Deleting…" : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
