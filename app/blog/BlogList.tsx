'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Fuse from 'fuse.js';
import { Search } from 'lucide-react';
import { BlogPost } from '@/lib/blog';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';

interface BlogListProps {
  posts: BlogPost[];
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function BlogList({ posts }: BlogListProps) {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return ['All', ...Array.from(tags).sort()];
  }, [posts]);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.3,
      }),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    let result = search ? fuse.search(search).map((r) => r.item) : posts;
    if (selectedTag !== 'All') {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }
    return result.sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });
  }, [search, selectedTag, sortOrder, posts, fuse]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    allTags.forEach((tag) => {
      if (tag !== 'All') {
        counts[tag] = posts.filter((p) => p.tags.includes(tag)).length;
      }
    });
    return counts;
  }, [posts, allTags]);

  return (
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

      <div className="p-6 border-b border-gray-200 flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block">
            ← Kembali ke Home
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter text-gray-900">
              Blog
            </h1>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg">
              Artikel tentang web development, programming, dan teknologi
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="px-3 py-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
              aria-label={sortOrder === 'newest' ? 'Sort by oldest first' : 'Sort by newest first'}
            >
              {sortOrder === 'newest' ? '↓' : '↑'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-sm font-medium rounded-md border transition-colors ${selectedTag === tag
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
              >
                {tag} ({tagCounts[tag] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-gray-200">
          {filteredPosts.map((post, index) => {
            const showRightBorder = (index + 1) % 3 !== 0;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group block p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors ${showRightBorder ? 'md:border-r border-gray-200' : ''
                  }`}
              >
                {post.thumbnail && (
                  <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <time className="text-xs text-gray-500">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
