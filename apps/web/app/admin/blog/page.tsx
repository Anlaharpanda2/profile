"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { formatDate } from "@/lib/data";
import type { BlogPost } from "@/lib/types";

export default function AdminBlogList() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const load = () => {
    api<{ data: BlogPost[] }>("/api/blog")
      .then((r) => setPosts(r.data))
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load posts"),
      );
  };

  useEffect(load, []);

  const onDelete = async (slug: string) => {
    if (!confirm(`Delete article "${slug}"? This cannot be undone.`)) return;
    setDeletingSlug(slug);
    setError(null);
    try {
      await api(`/api/blog/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      setPosts((list) => list?.filter((p) => p.slug !== slug) || null);
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
          Blog
        </h1>
        <Link href="/admin/blog/new" className="admin-btn">
          + New article
        </Link>
      </div>

      {error && (
        <div className="admin-flash error" role="alert">
          {error}
        </div>
      )}

      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        {posts === null ? (
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
        ) : posts.length === 0 ? (
          <div
            style={{
              padding: 48,
              textAlign: "center",
              color: "var(--muted)",
              fontSize: 14,
            }}
          >
            No articles yet.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Slug</th>
                <th>Title</th>
                <th>Date</th>
                <th>Tags</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <code style={{ fontSize: 13 }}>{p.slug}</code>
                  </td>
                  <td style={{ maxWidth: 360 }}>{p.title}</td>
                  <td>{formatDate(p.date)}</td>
                  <td style={{ fontSize: 13, color: "var(--muted)" }}>
                    {p.tags.slice(0, 3).join(", ")}
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <Link
                      href={`/admin/blog/edit?slug=${encodeURIComponent(p.slug)}`}
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
