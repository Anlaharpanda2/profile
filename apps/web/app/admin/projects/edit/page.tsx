"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ProjectForm from "@/components/admin/ProjectForm";
import { api } from "@/lib/api-client";
import type { Project } from "@/lib/types";

function EditProjectInner() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Missing slug in URL");
      return;
    }
    api<{ data: Project }>(`/api/projects/${encodeURIComponent(slug)}`)
      .then((r) => setProject(r.data))
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load project"),
      );
  }, [slug]);

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/admin/projects"
          className="admin-link"
          style={{ paddingLeft: 0 }}
        >
          ← Back to projects
        </Link>
        <h1
          className="font-serif-display"
          style={{ fontSize: 30, letterSpacing: -1, marginTop: 8 }}
        >
          Edit project
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

      {project ? (
        <ProjectForm mode="edit" initial={project} />
      ) : !error ? (
        <div className="admin-card" style={{ textAlign: "center" }}>
          Loading project…
        </div>
      ) : null}
    </>
  );
}

export default function EditProjectPage() {
  return (
    <Suspense
      fallback={
        <div className="admin-card" style={{ textAlign: "center" }}>
          Loading…
        </div>
      }
    >
      <EditProjectInner />
    </Suspense>
  );
}
