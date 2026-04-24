"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Field from "./Field";
import { api } from "@/lib/api-client";
import type { BlogPost } from "@/lib/types";

interface Props {
  initial?: BlogPost;
  mode: "create" | "edit";
}

const EMPTY: BlogPost = {
  slug: "",
  title: "",
  description: "",
  date: new Date().toISOString(),
  tags: [],
  author: "anla",
  thumbnail: "",
  content: "",
};

const csv = (arr: string[]) => arr.join(", ");
const fromCsv = (s: string) =>
  s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

export default function BlogForm({ initial, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<BlogPost>(initial || EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const set = <K extends keyof BlogPost>(k: K, v: BlogPost[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (mode === "create") {
        await api("/api/blog", {
          method: "POST",
          body: JSON.stringify(form),
        });
      } else {
        await api(`/api/blog/${encodeURIComponent(initial!.slug)}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      }
      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  };

  // Format date for the datetime-local input
  const dateForInput = (() => {
    if (!form.date) return "";
    const d = new Date(form.date);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  })();

  return (
    <form onSubmit={onSubmit} className="admin-card">
      {error && (
        <div className="admin-flash error" role="alert">
          {error}
        </div>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
      >
        <Field label="Slug" htmlFor="slug" help="Used in URL. Lowercase + dashes.">
          <input
            id="slug"
            className="admin-input"
            required
            disabled={mode === "edit"}
            value={form.slug}
            onChange={(e) =>
              set(
                "slug",
                e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
              )
            }
          />
        </Field>
        <Field label="Author" htmlFor="author">
          <input
            id="author"
            className="admin-input"
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Title" htmlFor="title">
        <input
          id="title"
          className="admin-input"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
        />
      </Field>

      <Field label="Description" htmlFor="description">
        <textarea
          id="description"
          className="admin-textarea"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </Field>

      <Field label="Tags" htmlFor="tags" help="Comma-separated.">
        <input
          id="tags"
          className="admin-input"
          value={csv(form.tags)}
          onChange={(e) => set("tags", fromCsv(e.target.value))}
        />
      </Field>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
      >
        <Field label="Published date" htmlFor="date">
          <input
            id="date"
            type="datetime-local"
            className="admin-input"
            value={dateForInput}
            onChange={(e) => {
              const v = e.target.value;
              if (v) set("date", new Date(v).toISOString());
            }}
          />
        </Field>
        <Field label="Thumbnail URL" htmlFor="thumbnail">
          <input
            id="thumbnail"
            className="admin-input"
            value={form.thumbnail}
            onChange={(e) => set("thumbnail", e.target.value)}
          />
        </Field>
      </div>

      <Field
        label="Content"
        htmlFor="content"
        help="Markdown. Supports headings, lists, code blocks, bold, italics, links."
      >
        <textarea
          id="content"
          className="admin-textarea"
          style={{ minHeight: 380, fontFamily: "ui-monospace, monospace" }}
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
        />
      </Field>

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button type="submit" className="admin-btn" disabled={saving}>
          {saving
            ? "Saving…"
            : mode === "create"
              ? "Publish article"
              : "Save changes"}
        </button>
        <button
          type="button"
          className="admin-btn secondary"
          onClick={() => router.push("/admin/blog")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
