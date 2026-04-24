import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Cursor from "@/components/ui/Cursor";
import InnerNav from "@/components/ui/InnerNav";
import MobileDock, { PAGE_ITEMS } from "@/components/ui/MobileDock";
import Footer from "@/components/ui/Footer";
import RevealEffects from "@/components/ui/RevealEffects";
import PageEffects from "@/components/ui/PageEffects";
import { getAllProjects, getProjectBySlug } from "@/lib/data";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  const url = `https://anla.my.id/projects/${slug}`;
  const imageUrl = project.image?.startsWith("http")
    ? project.image
    : `https://anla.my.id${project.image}`;
  return {
    title: project.title,
    description: project.problem,
    keywords: project.stack,
    authors: [{ name: "Anla Harpanda", url: "https://anla.my.id" }],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${project.title} — ${project.tagline}`,
      description: project.problem,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: project.title }],
      siteName: "Anla Harpanda",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.tagline}`,
      description: project.problem,
      images: [imageUrl],
      creator: "@itsanla",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Cursor />
      <InnerNav active="work" />
      <MobileDock items={PAGE_ITEMS} active="work" />

      <section id="hero" className="compact">
        <div
          className="hero-mesh"
          style={{
            background: project.visual.bg,
            opacity: 0.5,
            mixBlendMode: "screen",
          }}
        />
        <div className="hero-grid" />
        <div className="hero-inner single">
          <div className="h-label">{project.visual.label}</div>
          <h1 className="h-title">{project.title}</h1>
          <p className="h-sub">{project.tagline}</p>
          <div className="h-stats">
            <div className="h-st">
              <span className="h-st-n">{project.year}</span>
              <span className="h-st-l">Year</span>
            </div>
            <div className="h-st">
              <span className="h-st-n">{project.duration}</span>
              <span className="h-st-l">Duration</span>
            </div>
            <div className="h-st">
              <span className="h-st-n">{project.metrics.performance}</span>
              <span className="h-st-l">Highlight</span>
            </div>
          </div>
        </div>
      </section>

      <div className="main">
        <div
          className="rv"
          style={{ display: "grid", gap: 28, gridTemplateColumns: "1fr" }}
        >
          <div className="admin-card" style={{ padding: 32 }}>
            <div className="sec-label">Role</div>
            <h2 className="sec-title" style={{ fontSize: 28, marginBottom: 0 }}>
              {project.role}
            </h2>
          </div>

          <div className="admin-card" style={{ padding: 32 }}>
            <div className="sec-label">The Problem</div>
            <p className="prose-body">{project.problem}</p>
          </div>

          <div className="admin-card" style={{ padding: 32 }}>
            <div className="sec-label">Impact</div>
            <ul className="prose-body" style={{ marginTop: 8 }}>
              {project.impact.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="admin-card" style={{ padding: 32 }}>
            <div className="sec-label">Tech Stack</div>
            <div
              className="proj-tech"
              style={{ marginTop: 12, marginBottom: 0 }}
            >
              {project.stack.map((s) => (
                <span key={s} className="tc">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {project.learnings.length > 0 && (
            <div className="admin-card" style={{ padding: 32 }}>
              <div className="sec-label">Learnings</div>
              <div
                className="proj-tech"
                style={{ marginTop: 12, marginBottom: 0 }}
              >
                {project.learnings.map((l) => (
                  <span key={l} className="tc">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div
            style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}
          >
            {project.demoLink && (
              <a
                className="admin-btn"
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo →
              </a>
            )}
            {project.githubLink && (
              <a
                className="admin-btn secondary"
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub →
              </a>
            )}
            <a className="admin-btn secondary" href="/projects">
              ← All Projects
            </a>
          </div>
        </div>
      </div>

      <Footer />

      <RevealEffects />
      <PageEffects enableMagnetic />
    </>
  );
}
