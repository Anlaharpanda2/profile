import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import Cursor from "@/components/ui/Cursor";
import InnerNav from "@/components/ui/InnerNav";
import MobileDock, { PAGE_ITEMS } from "@/components/ui/MobileDock";
import Footer from "@/components/ui/Footer";
import RevealEffects from "@/components/ui/RevealEffects";
import PageEffects from "@/components/ui/PageEffects";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/data";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  const url = `https://anla.my.id/blog/${slug}`;
  const images = post.thumbnail
    ? [{ url: post.thumbnail, width: 1200, height: 630, alt: post.title }]
    : [{ url: "https://anla.my.id/profile.webp", width: 1200, height: 630, alt: post.title }];
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: "Anla Harpanda", url: "https://anla.my.id" }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      images,
      publishedTime: post.date,
      authors: ["Anla Harpanda"],
      tags: post.tags,
      siteName: "Anla Harpanda",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [images[0].url],
      creator: "@itsanla",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = marked.parse(post.content, { async: false }) as string;
  const wordCount = post.content.trim().split(/\s+/).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 220));

  return (
    <>
      <Cursor />
      <InnerNav active="blog" />
      <MobileDock items={PAGE_ITEMS} active="blog" />

      <section id="hero" className="compact">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-inner single">
          <div className="h-label">{post.tags[0] || "Article"}</div>
          <h1 className="h-title">{post.title}</h1>
          <p className="h-sub">{post.description}</p>
          <div className="h-stats">
            <div className="h-st">
              <span className="h-st-n" style={{ fontSize: 18 }}>
                {formatDate(post.date)}
              </span>
              <span className="h-st-l">Published</span>
            </div>
            <div className="h-st">
              <span className="h-st-n">{readMinutes}m</span>
              <span className="h-st-l">Read</span>
            </div>
            <div className="h-st">
              <span className="h-st-n" style={{ fontSize: 18 }}>
                {post.author}
              </span>
              <span className="h-st-l">Author</span>
            </div>
          </div>
        </div>
      </section>

      <article className="main">
        {post.thumbnail && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={post.thumbnail}
            alt={post.title}
            style={{
              width: "100%",
              borderRadius: 22,
              marginBottom: 36,
              aspectRatio: "16/9",
              objectFit: "cover",
            }}
          />
        )}
        <div
          className="prose-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 48,
            paddingTop: 28,
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <a className="admin-btn secondary" href="/blog">
            ← All Articles
          </a>
          <a className="admin-btn" href="/#contact">
            Get in Touch →
          </a>
        </div>
      </article>

      <Footer />

      <RevealEffects />
      <PageEffects enableMagnetic />
    </>
  );
}
