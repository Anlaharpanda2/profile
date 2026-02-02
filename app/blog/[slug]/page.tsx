import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { getAuthor, isValidAuthor } from '@/lib/authors';
import { mdxComponents } from '@/components/mdx-components';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const author = isValidAuthor(post.author) ? getAuthor(post.author) : null;
  const url = `https://anla.my.id/blog/${slug}`;

  return {
    title: `${post.title} | Anla Harpanda Blog`,
    description: post.description,
    authors: author ? [{ name: author.name }] : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [{
        url: post.thumbnail,
        width: 1200,
        height: 630,
        alt: post.title,
      }] : [],
      publishedTime: post.date,
      authors: author ? [author.name] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [post.thumbnail] : [],
      creator: '@anlaharpanda',
    },
  };
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  const author = isValidAuthor(post.author) ? getAuthor(post.author) : null;
  const formattedDate = formatDate(post.date);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.thumbnail,
    datePublished: post.date,
    dateModified: post.date,
    author: author ? {
      '@type': 'Person',
      name: author.name,
      url: 'https://anla.my.id',
    } : undefined,
    publisher: {
      '@type': 'Person',
      name: 'Anla Harpanda',
      url: 'https://anla.my.id',
      logo: {
        '@type': 'ImageObject',
        url: 'https://anla.my.id/itsanla-logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://anla.my.id/blog/${slug}`,
    },
    keywords: post.tags.join(', '),
    wordCount: post.content.split(/\s+/).length,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://anla.my.id',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://anla.my.id/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://anla.my.id/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-white relative">
        <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
          <FlickeringGrid
            className="absolute top-0 left-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.2}
            flickerChance={0.05}
          />
        </div>

        <div className="space-y-4 border-b border-gray-200 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
            <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-gray-600">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center h-6 w-6 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Kembali ke semua artikel</span>
              </Link>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 text-gray-600">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="h-6 w-fit px-3 text-sm font-medium bg-gray-100 text-gray-700 rounded-md border border-gray-200 flex items-center justify-center"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <time dateTime={post.date} className="font-medium text-gray-600">
                {formattedDate}
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance text-gray-900">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-gray-600 max-w-4xl md:text-lg md:text-balance">
                {post.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex divide-x divide-gray-200 relative max-w-7xl mx-auto px-4 md:px-0 z-10">
          <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-gray-200 pointer-events-none" />

          <main className="w-full p-0 overflow-hidden">
            {post.thumbnail && (
              <>
                <div className="relative w-full h-[250px] md:h-[500px] overflow-hidden object-cover border border-transparent">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                </div>
                <div className="text-center py-3 text-xs text-gray-500">
                  {formatDateTime(post.date)}
                </div>
              </>
            )}
            <div className="p-6 lg:p-10">
              <article className="prose prose-lg max-w-none [&_h1]:text-gray-900 [&_h2]:text-gray-900 [&_h3]:text-gray-900 [&_h4]:text-gray-900 [&_p]:text-gray-700 [&_p]:mb-6 [&_li]:text-gray-700 [&_a]:text-blue-600 [&_strong]:text-gray-900">
                <MDXRemote source={post.content} components={mdxComponents} />
              </article>
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-10 p-6 lg:p-10 border-t border-gray-200">
                <h2 className="text-2xl font-semibold tracking-tight mb-6 text-gray-900">Baca Juga</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group block border border-gray-200 rounded-lg overflow-hidden hover:border-blue-600 transition-colors"
                    >
                      {related.thumbnail && (
                        <div className="relative w-full h-40 overflow-hidden">
                          <Image
                            src={related.thumbnail}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-2">{related.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>

          <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-gray-50">
            <div className="sticky top-20 space-y-8">
              {author && (
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <h3 className="font-semibold mb-4 text-gray-900">Tentang Penulis</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{author.name}</div>
                      <div className="text-sm text-gray-600">{author.position}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <Link href="https://github.com/itsanla" className="text-blue-600 hover:underline">
                      GitHub
                    </Link>
                    <span>•</span>
                    <Link href="https://linkedin.com/in/anlaharpanda" className="text-blue-600 hover:underline">
                      LinkedIn
                    </Link>
                  </div>
                </div>
              )}

              {relatedPosts.length > 0 && (
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <h3 className="font-semibold mb-4 text-gray-900">Artikel Terkait</h3>
                  <div className="space-y-4">
                    {relatedPosts.slice(0, 2).map((related) => (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="block group"
                      >
                        {related.thumbnail && (
                          <div className="relative w-full h-24 mb-2 rounded overflow-hidden">
                            <Image
                              src={related.thumbnail}
                              alt={related.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              sizes="350px"
                            />
                          </div>
                        )}
                        <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{related.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <h3 className="font-semibold mb-4 text-gray-900">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="border-t border-gray-200 bg-gray-50 relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Anla Harpanda. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
