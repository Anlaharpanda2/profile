"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Field from "./Field";
import { api } from "@/lib/api-client";
import type { Project } from "@/lib/types";

interface Props {
  initial?: Project;
  mode: "create" | "edit";
}

const EMPTY: Project = {
  slug: "",
  num: "01",
  title: "",
  tagline: "",
  year: new Date().getFullYear(),
  image: "",
  role: "",
  tags: [],
  categories: [],
  stack: [],
  problem: "",
  impact: [],
  demoLink: "",
  githubLink: "",
  featured: false,
  duration: "",
  metrics: { performance: "", users: 0 },
  learnings: [],
  visual: {
    bg: "linear-gradient(135deg,oklch(0.42 0.24 268) 0%,oklch(0.35 0.18 300) 100%)",
    label: "",
  },
};

const csv = (arr: string[]) => arr.join(", ");
const fromCsv = (s: string) =>
  s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

const lines = (arr: string[]) => arr.join("\n");
const fromLines = (s: string) =>
  s
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

export default function ProjectForm({ initial, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Project>(initial || EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const set = <K extends keyof Project>(k: K, v: Project[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (mode === "create") {
        await api("/api/projects", {
          method: "POST",
          body: JSON.stringify(form),
        });
      } else {
        await api(`/api/projects/${encodeURIComponent(initial!.slug)}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      }
      router.push("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  };

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
        <Field
          label="Slug"
          htmlFor="slug"
          help="Lowercase, dashes only. Used in URL."
        >
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
        <Field label="Order number" htmlFor="num" help="e.g. 01, 02">
          <input
            id="num"
            className="admin-input"
            value={form.num}
            onChange={(e) => set("num", e.target.value)}
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

      <Field label="Tagline" htmlFor="tagline">
        <input
          id="tagline"
          className="admin-input"
          value={form.tagline}
          onChange={(e) => set("tagline", e.target.value)}
        />
      </Field>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
      >
        <Field label="Year" htmlFor="year">
          <input
            id="year"
            type="number"
            className="admin-input"
            value={form.year}
            onChange={(e) => set("year", Number(e.target.value))}
          />
        </Field>
        <Field label="Duration" htmlFor="duration">
          <input
            id="duration"
            className="admin-input"
            value={form.duration}
            onChange={(e) => set("duration", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Role" htmlFor="role">
        <input
          id="role"
          className="admin-input"
          value={form.role}
          onChange={(e) => set("role", e.target.value)}
        />
      </Field>

      <Field
        label="Tags"
        htmlFor="tags"
        help="Comma-separated. Used for the colored chips."
      >
        <input
          id="tags"
          className="admin-input"
          value={csv(form.tags)}
          onChange={(e) => set("tags", fromCsv(e.target.value))}
        />
      </Field>

      <Field
        label="Categories"
        htmlFor="categories"
        help="Comma-separated filter keys: fullstack, backend, devops, ai, design."
      >
        <input
          id="categories"
          className="admin-input"
          value={csv(form.categories)}
          onChange={(e) => set("categories", fromCsv(e.target.value))}
        />
      </Field>

      <Field label="Stack" htmlFor="stack" help="Comma-separated technologies.">
        <input
          id="stack"
          className="admin-input"
          value={csv(form.stack)}
          onChange={(e) => set("stack", fromCsv(e.target.value))}
        />
      </Field>

      <Field label="Problem" htmlFor="problem">
        <textarea
          id="problem"
          className="admin-textarea"
          value={form.problem}
          onChange={(e) => set("problem", e.target.value)}
        />
      </Field>

      <Field
        label="Impact"
        htmlFor="impact"
        help="One bullet per line."
      >
        <textarea
          id="impact"
          className="admin-textarea"
          value={lines(form.impact)}
          onChange={(e) => set("impact", fromLines(e.target.value))}
        />
      </Field>

      <Field
        label="Learnings"
        htmlFor="learnings"
        help="Comma-separated."
      >
        <input
          id="learnings"
          className="admin-input"
          value={csv(form.learnings)}
          onChange={(e) => set("learnings", fromCsv(e.target.value))}
        />
      </Field>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
      >
        <Field label="Demo link" htmlFor="demoLink">
          <input
            id="demoLink"
            className="admin-input"
            value={form.demoLink}
            onChange={(e) => set("demoLink", e.target.value)}
          />
        </Field>
        <Field label="GitHub link" htmlFor="githubLink">
          <input
            id="githubLink"
            className="admin-input"
            value={form.githubLink}
            onChange={(e) => set("githubLink", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Image" htmlFor="image" help="Path under /public, e.g. /sita-bi.webp">
        <input
          id="image"
          className="admin-input"
          value={form.image}
          onChange={(e) => set("image", e.target.value)}
        />
      </Field>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
      >
        <Field label="Performance metric" htmlFor="metric-perf">
          <input
            id="metric-perf"
            className="admin-input"
            value={form.metrics.performance}
            onChange={(e) =>
              set("metrics", { ...form.metrics, performance: e.target.value })
            }
          />
        </Field>
        <Field label="Users metric" htmlFor="metric-users">
          <input
            id="metric-users"
            type="number"
            className="admin-input"
            value={form.metrics.users}
            onChange={(e) =>
              set("metrics", {
                ...form.metrics,
                users: Number(e.target.value),
              })
            }
          />
        </Field>
      </div>

      <Field
        label="Visual: background"
        htmlFor="visual-bg"
        help="Any CSS background value. Default is a violet gradient."
      >
        <input
          id="visual-bg"
          className="admin-input"
          value={form.visual.bg}
          onChange={(e) =>
            set("visual", { ...form.visual, bg: e.target.value })
          }
        />
      </Field>

      <Field
        label="Visual: label"
        htmlFor="visual-label"
        help="Short tag shown on the card visual."
      >
        <input
          id="visual-label"
          className="admin-input"
          value={form.visual.label}
          onChange={(e) =>
            set("visual", { ...form.visual, label: e.target.value })
          }
        />
      </Field>

      <Field label="Featured" htmlFor="featured">
        <label
          style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14 }}
        >
          <input
            id="featured"
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
          />
          Show on the homepage
        </label>
      </Field>

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button type="submit" className="admin-btn" disabled={saving}>
          {saving
            ? "Saving…"
            : mode === "create"
              ? "Create project"
              : "Save changes"}
        </button>
        <button
          type="button"
          className="admin-btn secondary"
          onClick={() => router.push("/admin/projects")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
