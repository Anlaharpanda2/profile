"use client";
import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
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
          New project
        </h1>
      </div>
      <ProjectForm mode="create" />
    </>
  );
}
