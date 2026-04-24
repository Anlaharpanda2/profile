import type { Metadata } from "next";
import Cursor from "@/components/ui/Cursor";
import InnerNav from "@/components/ui/InnerNav";
import MobileDock, { PAGE_ITEMS } from "@/components/ui/MobileDock";
import Footer from "@/components/ui/Footer";
import RevealEffects from "@/components/ui/RevealEffects";
import PageEffects from "@/components/ui/PageEffects";
import BlogList from "@/components/ui/BlogList";
import { getAllPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on AI, web development, and the tech industry.",
  alternates: { canonical: "https://anla.my.id/blog" },
  openGraph: {
    type: "website",
    url: "https://anla.my.id/blog",
    title: "Blog | Anla Harpanda",
    description: "Thoughts on AI, web development, and the tech industry.",
    siteName: "Anla Harpanda",
    images: [{ url: "https://anla.my.id/profile.webp", width: 1200, height: 630, alt: "Anla Harpanda Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Anla Harpanda",
    description: "Thoughts on AI, web development, and the tech industry.",
    images: ["https://anla.my.id/profile.webp"],
    creator: "@itsanla",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tagCount = new Set(posts.flatMap((p) => p.tags)).size;

  return (
    <>
      <Cursor />
      <InnerNav active="blog" />
      <MobileDock items={PAGE_ITEMS} active="blog" />

      <section id="hero" className="compact">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-inner single">
          <div className="h-label">Writing</div>
          <h1 className="h-title">
            Notes from
            <br />
            <em>the field.</em>
          </h1>
          <p className="h-sub">
            Sharp takes on AI, web development, and the tech industry —
            written when the news hits, not when the trends fade.
          </p>
          <div className="h-stats">
            <div className="h-st">
              <span className="h-st-n">{posts.length}</span>
              <span className="h-st-l">Articles</span>
            </div>
            <div className="h-st">
              <span className="h-st-n">{tagCount}</span>
              <span className="h-st-l">Topics</span>
            </div>
          </div>
        </div>
      </section>

      <BlogList posts={posts} />

      <Footer />

      <RevealEffects />
      <PageEffects enableMagnetic enableRipple />
    </>
  );
}
