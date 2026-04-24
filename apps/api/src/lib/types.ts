export interface Project {
  slug: string;
  num: string;
  title: string;
  tagline: string;
  year: number;
  image: string;
  role: string;
  tags: string[];
  categories: string[];
  stack: string[];
  problem: string;
  impact: string[];
  demoLink: string;
  githubLink: string;
  featured: boolean;
  duration: string;
  metrics: { performance: string; users: number };
  learnings: string[];
  visual: { bg: string; label: string };
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  thumbnail: string;
  content: string;
}

export type Bindings = {
  DB: D1Database;
  BUCKET: R2Bucket;
  SESSION_SECRET: string;
  FRONTEND_URL: string;
  R2_PUBLIC_URL: string;
};
