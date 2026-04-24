"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BlogForm from "@/components/admin/BlogForm";
import { api } from "@/lib/api-client";
import type { BlogPost } from "@/lib/types";

function EditBlogInner() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Missing slug in URL");
      return;
    }
    api<{ data: BlogPost }>(`/api/blog/${encodeURIComponent(slug)}`)
      .then((r) => setPost(r.data))
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load article"),
      );
  }, [slug]);

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/admin/blog"
          className="admin-link"
          style={{ paddingLeft: 0 }}
        >
          ← Back to blog
        </Link>
        <h1
          className="font-serif-display"
          style={{ fontSize: 30, letterSpacing: -1, marginTop: 8 }}
        >
          Edit article
        </h1>
        {slug && (
          <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>
            <code>{slug}</code>
          </div>
        )}
      </div>

      {error && (
        <div className="admin-flash error" role="alert">
          {error}
        </div>
      )}

      {post ? (
        <BlogForm mode="edit" initial={post} />
      ) : !error ? (
        <div className="admin-card" style={{ textAlign: "center" }}>
          Loading article…
        </div>
      ) : null}
    </>
  );
}

export default function EditBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="admin-card" style={{ textAlign: "center" }}>
          Loading…
        </div>
      }
    >
      <EditBlogInner />
    </Suspense>
  );
}
