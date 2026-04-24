import type { Metadata } from "next";
import Cursor from "@/components/ui/Cursor";
import InnerNav from "@/components/ui/InnerNav";
import MobileDock, { PAGE_ITEMS } from "@/components/ui/MobileDock";
import Footer from "@/components/ui/Footer";
import RevealEffects from "@/components/ui/RevealEffects";
import PageEffects from "@/components/ui/PageEffects";
import ProjectList from "@/components/ui/ProjectList";
import { getAllProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies of projects across full-stack, backend, DevOps, and AI development.",
  alternates: { canonical: "https://anla.my.id/projects" },
  openGraph: {
    type: "website",
    url: "https://anla.my.id/projects",
    title: "Projects | Anla Harpanda",
    description:
      "Case studies of projects across full-stack, backend, DevOps, and AI development.",
    siteName: "Anla Harpanda",
    images: [{ url: "https://anla.my.id/profile.webp", width: 1200, height: 630, alt: "Anla Harpanda Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Anla Harpanda",
    description:
      "Case studies of projects across full-stack, backend, DevOps, and AI development.",
    images: ["https://anla.my.id/profile.webp"],
    creator: "@itsanla",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const techCount = new Set(projects.flatMap((p) => p.stack)).size;
  const usersServed = projects.reduce(
    (s, p) => s + (p.metrics?.users || 0),
    0,
  );
  const usersLabel =
    usersServed >= 1000 ? `${Math.round(usersServed / 1000)}K+` : `${usersServed}+`;

  return (
    <>
      <Cursor />
      <InnerNav active="work" />
      <MobileDock items={PAGE_ITEMS} active="work" />

      <section id="hero" className="compact">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-inner single">
          <div className="h-label">Case Studies</div>
          <h1 className="h-title">
            Every project,
            <br />
            <em>a problem solved.</em>
          </h1>
          <p className="h-sub">
            Here are my projects across full-stack, backend, and AI development —
            each one crafted with care, clean code, and a focus on tools people
            actually use.
          </p>
          <div className="h-stats">
            <div className="h-st">
              <span className="h-st-n">{projects.length}</span>
              <span className="h-st-l">Projects</span>
            </div>
            <div className="h-st">
              <span className="h-st-n">{techCount}+</span>
              <span className="h-st-l">Technologies</span>
            </div>
            <div className="h-st">
              <span className="h-st-n">{usersLabel}</span>
              <span className="h-st-l">Users Served</span>
            </div>
          </div>
        </div>
      </section>

      <ProjectList projects={projects} />

      <Footer />

      <RevealEffects />
      <PageEffects enableMagnetic enableRipple />
    </>
  );
}
