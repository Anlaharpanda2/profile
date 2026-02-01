import Custom404 from "@/app/not-found";
import projects from "../../../data/projects";
import ProjectDetail from "../ProjectDetail";
import { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const title = `${project.title} - ${project.tagline}`;
  const description = `${project.tagline} Built with ${project.stack.slice(0, 3).join(", ")}. ${project.problem.slice(0, 120)}...`;
  const imageUrl = project.image ? project.image : "/pfp.webp";

  return {
    title,
    description,
    keywords: `${project.stack.join(", ")}, Anla Harpanda, project, case study, ${project.role}`,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.linkedin.com/in/anlaharpanda`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} project screenshot`,
        },
      ],
      siteName: "Anla Harpanda Portfolio",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://www.linkedin.com/in/anlaharpanda`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return <Custom404 />
  }

  return <ProjectDetail project={project} />;
}
