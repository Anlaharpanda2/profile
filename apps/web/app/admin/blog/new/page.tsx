"use client";
import Link from "next/link";
import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
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
          New article
        </h1>
      </div>
      <BlogForm mode="create" />
    </>
  );
}
