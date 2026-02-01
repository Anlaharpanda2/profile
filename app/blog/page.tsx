import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogList from './BlogList';

export const metadata: Metadata = {
  title: 'Blog | Anla Harpanda',
  description: 'Articles about web development, programming, and technology by Anla Harpanda',
  alternates: {
    canonical: 'https://anla.my.id/blog',
  },
  openGraph: {
    type: 'website',
    url: 'https://anla.my.id/blog',
    title: 'Blog | Anla Harpanda',
    description: 'Articles about web development, programming, and technology',
    images: ['/blog-og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Anla Harpanda',
    description: 'Articles about web development, programming, and technology',
    images: ['/blog-og-image.png'],
    creator: '@anlaharpanda',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogList posts={posts} />;
}
